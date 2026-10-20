import { supabase, isSupabaseConfigured } from "./supabase";

export interface AnalysisInput {
  brainDump: string;
  cvText?: string;
  linkedinUrl?: string;
}

export const analyzeCareerPath = async (input: AnalysisInput) => {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not set up. Copy .env.example to .env and fill it in.");
  }

  try {
    const { data, error } = await supabase.functions.invoke('analyze-career-path', {
      body: input,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Analysis Error:", error);
    throw error;
  }
};
