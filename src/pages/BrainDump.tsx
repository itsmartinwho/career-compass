import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/context/SessionContext";
import { SAMPLE_SCENARIOS } from "@/data/sampleScenarios";

const BrainDump = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { brainDumpText, setBrainDumpText } = useSession();
  const [text, setText] = useState(brainDumpText || "");
  const minChars = 50;

  const handleNext = () => {
    if (text.length < minChars) {
      toast({
        title: "A bit more detail needed",
        description: "Adding more context will help me give better advice.",
        variant: "destructive",
      });
      return;
    }
    setBrainDumpText(text);
    navigate("/context");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="max-w-2xl mx-auto p-6 space-y-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-xl font-editorial">UNSTUCK</h1>
          <div className="w-16" />
        </div>
        <ProgressIndicator currentStep={0} totalSteps={4} />
      </header>

      {/* Main content */}
      <main className="p-6 pb-32">
        <GlassCard className="max-w-2xl mx-auto animate-fade-in">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-editorial font-normal">Tell me what's happening at work</h2>
              <p className="text-sm text-muted-foreground">
                Write freely for a few minutes—don't worry about structure or polish.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {SAMPLE_SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setText(s.brainDump)}
                  className="text-xs px-3 py-1.5 rounded-full border border-border bg-secondary/60 text-foreground hover:border-primary/50 transition-colors"
                >
                  {s.title}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Example: I've been in my role for 4 years, I'm exhausted, my manager doesn't understand my career goals, and I'm not sure if I should push for a promotion or look elsewhere..."
                className="min-h-[260px] bg-background border-border resize-none text-base leading-relaxed"
              />
              <div className="flex justify-between items-center text-xs font-mono text-muted-foreground tabular-nums">
                <span>
                  {text.length} characters {text.length < minChars && `(${minChars - text.length} more needed)`}
                </span>
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
            onClick={() => {
              if (!text.trim()) {
                setBrainDumpText(SAMPLE_SCENARIOS[0].brainDump);
              }
              navigate("/context");
            }}
            className="flex-shrink-0"
          >
            Skip with sample
          </Button>
          <Button
            onClick={handleNext}
            disabled={text.length < minChars}
            className="flex-1"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrainDump;
