import { supabase, isSupabaseConfigured } from "./supabase";
import { SAMPLE_SCENARIOS } from "@/data/sampleScenarios";

export interface AnalysisInput {
  brainDump: string;
  cvText?: string;
  linkedinUrl?: string;
}

/**
 * Zero-spend local fallback when Supabase Edge Functions are not configured.
 * Matches the user's brain dump against the closest pre-computed archetype
 * so the full interactive flow works offline without exposing or spending API keys.
 */
function buildOfflineFallback(input: AnalysisInput) {
  const text = (input.brainDump || "").toLowerCase();
  const matched =
    text.includes("manage") || text.includes("report") || text.includes("director")
      ? SAMPLE_SCENARIOS[1]
      : text.includes("design") || text.includes("figma") || text.includes("startup")
        ? SAMPLE_SCENARIOS[2]
        : SAMPLE_SCENARIOS[0];

  return {
    diagnosisSummary: matched.diagnosisSummary,
    diagnoses: matched.diagnoses,
    careerPaths: matched.careerPaths,
    mode: "offline-demo",
  };
}

export const analyzeCareerPath = async (input: AnalysisInput) => {
  const exactScenario = SAMPLE_SCENARIOS.find(
    (s) => s.brainDump.trim() === input.brainDump.trim(),
  );
  if (exactScenario) {
    return {
      diagnosisSummary: exactScenario.diagnosisSummary,
      diagnoses: exactScenario.diagnoses,
      careerPaths: exactScenario.careerPaths,
      mode: "sample-scenario",
    };
  }

  if (!isSupabaseConfigured || !supabase) {
    return buildOfflineFallback(input);
  }

  try {
    const { data, error } = await supabase.functions.invoke("analyze-career-path", {
      body: input,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.warn("Supabase function unavailable; using local zero-spend fallback:", error);
    return buildOfflineFallback(input);
  }
};
