import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// gemini-3.8-flash is Google's current stable Flash model (https://ai.google.dev/gemini-api/docs/models).
// Set the GEMINI_MODEL secret to use another one.
const DEFAULT_MODEL = 'gemini-3.8-flash';

const MAX_BRAIN_DUMP_CHARS = 20_000;
const MAX_CV_CHARS = 40_000;
const MAX_URL_CHARS = 300;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const apiKey = Deno.env.get('GEMINI_API_KEY');

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    if (typeof body.brainDump !== 'string' || body.brainDump.trim() === '') {
      return new Response(JSON.stringify({ error: 'brainDump is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // The function is reachable with the public anon key, so cap what it will send on to Gemini.
    const brainDump = body.brainDump.slice(0, MAX_BRAIN_DUMP_CHARS);
    const cvText = typeof body.cvText === 'string' ? body.cvText.slice(0, MAX_CV_CHARS) : '';
    const linkedinUrl = typeof body.linkedinUrl === 'string' ? body.linkedinUrl.slice(0, MAX_URL_CHARS) : '';

    // REST API, called directly. The model is a function secret so it can change without a redeploy of the code.
    const model = Deno.env.get('GEMINI_MODEL') || DEFAULT_MODEL;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    const prompt = `
      You are an expert career strategist for burnt-out professionals. 
      Your goal is to analyze the user's situation and provide concrete, actionable career paths.

      USER INPUT:
      Brain Dump: "${brainDump}"
      ${cvText ? `CV Content: "${cvText}"` : "No CV provided."}
      ${linkedinUrl ? `LinkedIn URL: "${linkedinUrl}"` : "No LinkedIn provided."}

      TASK:
      1. Analyze the input to diagnose the core issues (burnout, mismatch, etc.).
      2. Generate a plain-language summary of their situation.
      3. Create 3 distinct career paths (e.g., "Stay & Fix", "Pivot", "Break").
      4. For each path, detail specific phases and actionable steps.

      OUTPUT FORMAT:
      Return ONLY valid JSON with this structure:
      {
        "diagnosisSummary": "A paragraph summarizing their situation in a validating tone.",
        "diagnoses": [
          { "label": "Short Label", "description": "1 sentence description", "intensity": 1-3 }
        ],
        "careerPaths": [
          {
            "id": "1",
            "name": "Path Name",
            "description": "Short description",
            "timeHorizon": "e.g. 6-12 months",
            "risk": "Low" | "Medium" | "High",
            "energy": "Low" | "Medium" | "High",
            "narrative": "Why this path fits...",
            "firstMoves": ["Move 1", "Move 2"],
            "immediateActions": ["Action 1", "Action 2"],
            "phases": [
              {
                "id": "p1",
                "title": "Phase Title",
                "actions": [
                  {
                    "id": "a1",
                    "title": "Action Title",
                    "tag": "Category",
                    "context": "Why this matters",
                    "howTo": ["Step 1", "Step 2"],
                    "targetPeople": [ { "title": "Job Title", "example": "Company Type" } ], // Optional
                    "searchPrompt": "LinkedIn search query", // Optional
                    "messageTemplate": "Outreach message..." // Optional
                  }
                ]
              }
            ]
          }
        ]
      }
    `;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
            responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', errorText);
      throw new Error(`Gemini API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('No text returned from Gemini API');
    }

    // Clean up markdown code blocks if present (e.g. ```json ... ```)
    const cleanedText = text.replace(/```json\n?|```/g, '').trim();
    const jsonResponse = JSON.parse(cleanedText);

    return new Response(JSON.stringify(jsonResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    const message = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

