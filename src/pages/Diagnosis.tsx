import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Diagnosis = () => {
  const navigate = useNavigate();

  // Mock diagnosis data
  const diagnoses = [
    {
      label: "Burnout risk",
      description: "Signs of emotional exhaustion and reduced engagement with work tasks",
      intensity: 3,
    },
    {
      label: "Unclear promotion path",
      description: "Lack of clarity around advancement criteria and timeline",
      intensity: 2,
    },
    {
      label: "Skills under-utilization",
      description: "Current role doesn't fully leverage your capabilities",
      intensity: 2,
    },
  ];

  const summary =
    "You've been in your current role for several years and feel like you've stopped learning. You're experiencing signs of burnout and are unsure whether to move up internally or explore opportunities elsewhere that better align with your skills and interests.";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/context")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold text-gradient">UNSTUCK</h1>
          <div className="w-16" />
        </div>
        <ProgressIndicator currentStep={2} totalSteps={4} />
      </header>

      {/* Main content */}
      <main className="p-6 pb-32">
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Here's what I'm hearing</h2>
          </div>

          {/* Diagnosis cards */}
          <div className="space-y-3">
            {diagnoses.map((diagnosis, index) => (
              <GlassCard key={index} className="hover:glass-strong transition-all cursor-pointer">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{diagnosis.label}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {diagnosis.description}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < diagnosis.intensity ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Summary */}
          <GlassCard variant="strong" glow>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">In my own words (summary)</h3>
              <p className="text-muted-foreground leading-relaxed">{summary}</p>
            </div>
          </GlassCard>
        </div>
      </main>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 glass-strong border-t border-border">
        <div className="max-w-2xl mx-auto flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate("/brain-dump")}
            className="flex-shrink-0"
          >
            Edit my story
          </Button>
          <Button onClick={() => navigate("/paths")} className="flex-1 neon-glow">
            See possible paths
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;
