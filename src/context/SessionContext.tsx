import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types for our data structures
export interface Diagnosis {
  label: string;
  description: string;
  intensity: number;
}

export interface Action {
  id: string;
  title: string;
  tag: string;
  context: string;
  howTo: string[];
  targetPeople?: { title: string; example: string }[];
  searchPrompt?: string;
  messageTemplate?: string;
}

export interface Phase {
  id: string;
  title: string;
  actions: Action[];
}

export interface CareerPath {
  id: string;
  name: string;
  description: string;
  timeHorizon: string;
  risk: "Low" | "Medium" | "High";
  energy: "Low" | "Medium" | "High";
  narrative: string;
  firstMoves: string[]; // For the overview card
  phases: Phase[];      // For the detail view
  immediateActions: string[]; // For the "Start tonight" section
}

interface SessionContextType {
  brainDumpText: string;
  setBrainDumpText: (text: string) => void;
  cvFile: File | null;
  setCvFile: (file: File | null) => void;
  linkedinUrl: string;
  setLinkedinUrl: (url: string) => void;
  
  // Results from AI
  diagnosisSummary: string;
  diagnoses: Diagnosis[];
  careerPaths: CareerPath[];
  setAnalysisResults: (summary: string, diagnoses: Diagnosis[], paths: CareerPath[]) => void;
  
  // Reset
  resetSession: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [brainDumpText, setBrainDumpText] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  
  const [diagnosisSummary, setDiagnosisSummary] = useState("");
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);

  const setAnalysisResults = (summary: string, diagnosisList: Diagnosis[], paths: CareerPath[]) => {
    setDiagnosisSummary(summary);
    setDiagnoses(diagnosisList);
    setCareerPaths(paths);
  };

  const resetSession = () => {
    setBrainDumpText("");
    setCvFile(null);
    setLinkedinUrl("");
    setDiagnosisSummary("");
    setDiagnoses([]);
    setCareerPaths([]);
    sessionStorage.clear();
  };

  return (
    <SessionContext.Provider
      value={{
        brainDumpText,
        setBrainDumpText,
        cvFile,
        setCvFile,
        linkedinUrl,
        setLinkedinUrl,
        diagnosisSummary,
        diagnoses,
        careerPaths,
        setAnalysisResults,
        resetSession
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};


