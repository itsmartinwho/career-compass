import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BrainDump = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const minChars = 50;

  const handleRecording = () => {
    if (!isRecording) {
      toast({
        title: "Voice recording",
        description: "Voice recording would start here (feature coming soon)",
      });
    }
    setIsRecording(!isRecording);
  };

  const handleNext = () => {
    if (text.length < minChars) {
      toast({
        title: "A bit more detail needed",
        description: "Adding more context will help me give better advice.",
        variant: "destructive",
      });
      return;
    }
    // Store the brain dump text in session storage
    sessionStorage.setItem("brainDump", text);
    navigate("/context");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold text-gradient">UNSTUCK</h1>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
        <ProgressIndicator currentStep={0} totalSteps={4} />
      </header>

      {/* Main content */}
      <main className="p-6 pb-32">
        <GlassCard className="max-w-2xl mx-auto animate-fade-in">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Tell me what's happening at work</h2>
              <p className="text-muted-foreground">
                Speak or type for 1–3 minutes. Don't worry about structure.
              </p>
            </div>

            <div className="space-y-4">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Example: I've been in my role for 4 years, I'm exhausted, my manager doesn't understand my career goals, and I'm not sure if I should push for a promotion or look elsewhere..."
                className="min-h-[200px] bg-background/50 border-border resize-none text-base"
              />
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>
                  {text.length} characters {text.length < minChars && `(${minChars - text.length} more needed)`}
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={handleRecording}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                    isRecording
                      ? "bg-destructive neon-glow animate-pulse"
                      : "glass hover:glass-strong neon-glow"
                  }`}
                >
                  {isRecording ? (
                    <MicOff className="w-6 h-6" />
                  ) : (
                    <Mic className="w-6 h-6" />
                  )}
                </button>
                <div className="text-center space-y-1">
                  <p className="text-sm font-medium">
                    {isRecording ? "Recording..." : "Hold to record"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Your voice is converted to text and analyzed only for this session
                  </p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </main>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 glass-strong border-t border-border">
        <div className="max-w-2xl mx-auto flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate("/context")}
            className="flex-shrink-0"
          >
            Skip
          </Button>
          <Button
            onClick={handleNext}
            disabled={text.length < minChars}
            className="flex-1 neon-glow"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrainDump;
