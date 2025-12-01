import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { brainDump, cvText, linkedinUrl } = await req.json();
    const apiKey = Deno.env.get('GEMINI_API_KEY');

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Use gemini-2.0-flash-exp for speed and quality, or gemini-1.5-pro
    // Note: Verify if "gemini-3-pro-preview" is available in the project. 
    // Fallback to "gemini-1.5-pro" if 2.0/3.0 are not enabled.
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

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

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up markdown code blocks if present (e.g. ```json ... ```)
    const cleanedText = text.replace(/```json\n?|```/g, '').trim();
    const jsonResponse = JSON.parse(cleanedText);

    return new Response(JSON.stringify(jsonResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

