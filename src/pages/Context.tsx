import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Upload, Link2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/context/SessionContext";

const Context = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setCvFile: setContextCvFile, setLinkedinUrl: setContextLinkedinUrl } = useSession();
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      setCvFile(file);
      toast({
        title: "CV uploaded",
        description: `${file.name} ready to analyze`,
      });
    }
  };

  const handleNext = () => {
    // Store context in global session state
    if (cvFile) setContextCvFile(cvFile);
    if (linkedinUrl) setContextLinkedinUrl(linkedinUrl);
    navigate("/processing");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/brain-dump")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold text-gradient">UNSTUCK</h1>
          <div className="w-16" />
        </div>
        <ProgressIndicator currentStep={1} totalSteps={4} />
      </header>

      {/* Main content */}
      <main className="p-6 pb-32">
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">Add context (optional)</h2>
            <p className="text-muted-foreground">
              I can suggest more precise paths if I know your experience. You can skip this.
            </p>
          </div>

          <div className="space-y-4">
            {/* Upload CV Card */}
            <GlassCard>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold">Upload your CV</h3>
                    <p className="text-sm text-muted-foreground">
                      PDF or DOCX, up to 5MB
                    </p>
                    <p className="text-xs text-muted-foreground">
                      I'll read your roles, skills, and education
                    </p>
                  </div>
                </div>
                <div>
                  <input
                    type="file"
                    id="cv-upload"
                    accept=".pdf,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById("cv-upload")?.click()}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {cvFile ? cvFile.name : "Upload file"}
                  </Button>
                  {cvFile && (
                    <button
                      onClick={() => setCvFile(null)}
                      className="text-xs text-muted-foreground hover:text-foreground mt-2"
                    >
                      Replace
                    </button>
                  )}
                </div>
              </div>
            </GlassCard>

            {/* LinkedIn URL Card */}
            <GlassCard>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Link2 className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold">Link your LinkedIn</h3>
                    <p className="text-sm text-muted-foreground">
                      Paste your LinkedIn profile URL
                    </p>
                    <p className="text-xs text-muted-foreground">
                      I'll use this only to understand your professional history
                    </p>
                  </div>
                </div>
                <Input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://www.linkedin.com/in/yourname"
                  className="bg-background/50 border-border"
                />
              </div>
            </GlassCard>
          </div>
        </div>
      </main>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 glass-strong border-t border-border">
        <div className="max-w-2xl mx-auto flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate("/processing")}
            className="flex-shrink-0"
          >
            Skip this step
          </Button>
          <Button onClick={handleNext} className="flex-1 neon-glow">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Context;
