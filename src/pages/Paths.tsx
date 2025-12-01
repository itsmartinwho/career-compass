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
      case "Low": return "bg-green-500/20 text-green-400";
      case "Medium": return "bg-yellow-500/20 text-yellow-400";
      case "High": return "bg-red-500/20 text-red-400";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/diagnosis")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold text-gradient">UNSTUCK</h1>
          <div className="w-16" />
        </div>
        <ProgressIndicator currentStep={3} totalSteps={4} />
      </header>

      {/* Main content */}
      <main className="p-6 pb-32">
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Here are some paths you could explore</h2>
            <p className="text-muted-foreground">
              Each path includes a set of concrete moves. Tap one to see details.
            </p>
          </div>

          {/* Path cards */}
          <div className="space-y-4">
            {careerPaths.length > 0 ? (
              careerPaths.map((path) => (
                <GlassCard
                  key={path.id}
                  className="hover:glass-strong transition-all cursor-pointer hover:scale-[1.02]"
                  onClick={() => navigate(`/path/${path.id}`)}
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-bold text-xl">{path.name}</h3>
                      <p className="text-muted-foreground">{path.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="gap-1">
                        <Clock className="w-3 h-3" />
                        {path.timeHorizon}
                      </Badge>
                      <Badge variant="outline" className={getRiskColor(path.risk)}>
                        <TrendingUp className="w-3 h-3" />
                        {path.risk} risk
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <Zap className="w-3 h-3" />
                        {path.energy} energy
                      </Badge>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-border/50">
                      <p className="text-sm font-semibold">First moves:</p>
                      <ul className="space-y-1">
                        {path.firstMoves.map((move, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
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
              <GlassCard>
                <p className="text-muted-foreground">No paths generated. Please restart the analysis.</p>
              </GlassCard>
            )}
          </div>
        </div>
      </main>

      {/* Fixed bottom info */}
      <div className="fixed bottom-0 left-0 right-0 p-6 glass-strong border-t border-border">
        <div className="max-w-2xl mx-auto text-center text-sm text-muted-foreground">
          Tap any path to see the detailed action plan
        </div>
      </div>
    </div>
  );
};

export default Paths;
