import { supabase } from "./supabase";

export interface AnalysisInput {
  brainDump: string;
  cvText?: string;
  linkedinUrl?: string;
}

export const analyzeCareerPath = async (input: AnalysisInput) => {
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
