import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, Zap } from "lucide-react";
import { useSession } from "@/context/SessionContext";

const Paths = () => {
  const navigate = useNavigate();
  const { careerPaths } = useSession();

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-emerald-900/10 text-emerald-900 border-emerald-800/30";
      case "Medium":
        return "bg-amber-900/10 text-amber-900 border-amber-800/30";
      case "High":
        return "bg-red-900/10 text-red-900 border-red-800/30";
      default:
        return "bg-muted text-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="max-w-2xl mx-auto p-6 space-y-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/diagnosis")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-xl font-editorial">UNSTUCK</h1>
          <div className="w-16" />
        </div>
        <ProgressIndicator currentStep={3} totalSteps={4} />
      </header>

      {/* Main content */}
      <main className="p-6 pb-32">
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
          <div className="space-y-2">
            <h2 className="text-3xl font-editorial font-normal">Three paths worth weighing</h2>
            <p className="text-sm text-muted-foreground">
              Each option trades off risk, energy, and time horizon differently. Select one to inspect the full roadmap and outreach scripts.
            </p>
          </div>

          {/* Path cards */}
          <div className="space-y-4">
            {careerPaths.length > 0 ? (
              careerPaths.map((path) => (
                <GlassCard
                  key={path.id}
                  className="transition-all cursor-pointer"
                  onClick={() => navigate(`/path/${path.id}`)}
                >
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-editorial text-2xl font-normal">{path.name}</h3>
                        <span className="text-xs font-mono text-primary shrink-0">View plan →</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{path.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="gap-1 font-mono text-xs">
                        <Clock className="w-3 h-3" />
                        {path.timeHorizon}
                      </Badge>
                      <Badge variant="outline" className={`gap-1 font-mono text-xs ${getRiskColor(path.risk)}`}>
                        <TrendingUp className="w-3 h-3" />
                        {path.risk} risk
                      </Badge>
                      <Badge variant="outline" className="gap-1 font-mono text-xs">
                        <Zap className="w-3 h-3" />
                        {path.energy} energy
                      </Badge>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-border/70">
                      <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">First moves</p>
                      <ul className="space-y-1">
                        {path.firstMoves.map((move, index) => (
                          <li key={index} className="text-sm text-foreground/90 flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>{move}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlassCard>
              ))
            ) : (
              <GlassCard className="space-y-4">
                <p className="text-muted-foreground">No paths generated yet. Start from a scenario or write your brain dump.</p>
                <Button onClick={() => navigate("/")}>Return to start</Button>
              </GlassCard>
            )}
          </div>
        </div>
      </main>

      {/* Fixed bottom info */}
      <div className="fixed bottom-0 left-0 right-0 p-6 glass-strong border-t border-border">
        <div className="max-w-2xl mx-auto text-center text-xs font-mono text-muted-foreground">
          Select any path to open its checklist, LinkedIn search queries, and Markdown export
        </div>
      </div>
    </div>
  );
};

export default Paths;
