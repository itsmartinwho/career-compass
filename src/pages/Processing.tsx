import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/context/SessionContext";
import { analyzeCareerPath } from "@/lib/gemini";
import { extractTextFromPdf } from "@/lib/pdf-utils";
import { useToast } from "@/hooks/use-toast";

const Processing = () => {
  const navigate = useNavigate();
  const { brainDumpText, cvFile, linkedinUrl, setAnalysisResults } = useSession();
  const { toast } = useToast();
  const [status, setStatus] = useState("Initializing...");

  useEffect(() => {
    const processData = async () => {
      try {
        if (!brainDumpText) {
          // If navigated directly, redirect back
          navigate("/brain-dump");
          return;
        }

        let cvText = "";
        if (cvFile) {
          setStatus("Reading your CV...");
          try {
            if (cvFile.type === "application/pdf" || cvFile.name.toLowerCase().endsWith(".pdf")) {
              cvText = await extractTextFromPdf(cvFile);
            } else {
               // Anything else is read as plain text (the upload accepts .pdf and .txt)
               cvText = await cvFile.text();
            }
          } catch (e) {
            console.error("Failed to read CV", e);
            toast({
              title: "Could not read CV",
              description: "Continuing without CV analysis.",
              variant: "destructive"
            });
          }
        }

        setStatus("Consulting AI Strategist...");
        
        const result = await analyzeCareerPath({
          brainDump: brainDumpText,
          cvText,
          linkedinUrl
        });

        // Validate basic structure
        if (!result.careerPaths || !Array.isArray(result.careerPaths)) {
          throw new Error("Invalid response format from AI");
        }

        setAnalysisResults(result.diagnosisSummary, result.diagnoses, result.careerPaths);
        
        // Success
        navigate("/diagnosis");

      } catch (error) {
        console.error("Processing error:", error);
        toast({
          title: "Analysis Failed",
          description: error instanceof Error && error.message ? error.message : "Something went wrong. Please try again.",
          variant: "destructive"
        });
        // Optional: Navigate back or show error state
        navigate("/brain-dump");
      }
    };

    processData();
  }, [brainDumpText, cvFile, linkedinUrl, navigate, setAnalysisResults, toast]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center space-y-8 animate-fade-in">
        {/* Animated loader */}
        <div className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
          <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-accent animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gradient">
            {status}
          </h2>
          
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Clustering themes in your story
            </li>
            <li className="flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ animationDelay: "0.2s" }} />
              Cross-checking with your experience
            </li>
            <li className="flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s" }} />
              Mapping possible paths forward
            </li>
          </ul>

          <p className="text-xs text-muted-foreground pt-4">
            This usually takes 5–15 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default Processing;
