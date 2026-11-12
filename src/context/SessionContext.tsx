import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  firstMoves: string[];
  phases: Phase[];
  immediateActions: string[];
}

interface SessionContextType {
  brainDumpText: string;
  setBrainDumpText: (text: string) => void;
  cvFile: File | null;
  setCvFile: (file: File | null) => void;
  linkedinUrl: string;
  setLinkedinUrl: (url: string) => void;

  diagnosisSummary: string;
  diagnoses: Diagnosis[];
  careerPaths: CareerPath[];
  setAnalysisResults: (summary: string, diagnoses: Diagnosis[], paths: CareerPath[]) => void;

  completedActions: string[];
  toggleCompletedAction: (actionId: string) => void;

  resetSession: () => void;
}

const STORAGE_KEY = 'career_compass_session_v2';

const readSaved = () => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const saved = typeof window !== 'undefined' ? readSaved() : null;

  const [brainDumpText, setBrainDumpText] = useState<string>(saved?.brainDumpText || "");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState<string>(saved?.linkedinUrl || "");

  const [diagnosisSummary, setDiagnosisSummary] = useState<string>(saved?.diagnosisSummary || "");
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>(saved?.diagnoses || []);
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>(saved?.careerPaths || []);
  const [completedActions, setCompletedActions] = useState<string[]>(saved?.completedActions || []);

  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          brainDumpText,
          linkedinUrl,
          diagnosisSummary,
          diagnoses,
          careerPaths,
          completedActions,
        }),
      );
    } catch {
      // ignore storage quota errors
    }
  }, [brainDumpText, linkedinUrl, diagnosisSummary, diagnoses, careerPaths, completedActions]);

  const setAnalysisResults = (summary: string, diagnosisList: Diagnosis[], paths: CareerPath[]) => {
    setDiagnosisSummary(summary);
    setDiagnoses(diagnosisList);
    setCareerPaths(paths);
  };

  const toggleCompletedAction = (actionId: string) => {
    setCompletedActions((prev) =>
      prev.includes(actionId) ? prev.filter((id) => id !== actionId) : [...prev, actionId],
    );
  };

  const resetSession = () => {
    setBrainDumpText("");
    setCvFile(null);
    setLinkedinUrl("");
    setDiagnosisSummary("");
    setDiagnoses([]);
    setCareerPaths([]);
    setCompletedActions([]);
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
        completedActions,
        toggleCompletedAction,
        resetSession,
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
