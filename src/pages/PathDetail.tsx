import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, Zap, Check, Copy } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useSession } from "@/context/SessionContext";

const PathDetail = () => {
  const navigate = useNavigate();
  const { pathId } = useParams();
  const { toast } = useToast();
  const { careerPaths } = useSession();
  const [completedActions, setCompletedActions] = useState<string[]>([]);

  const path = careerPaths.find((p) => p.id === pathId);

  if (!path) {
    // Navigate back if path not found (e.g. reload on detail page)
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center space-y-4">
                <p>Path not found or session expired.</p>
                <Button onClick={() => navigate("/paths")}>Back to Paths</Button>
            </div>
        </div>
    );
  }

  const toggleAction = (actionId: string) => {
    setCompletedActions(prev =>
      prev.includes(actionId)
        ? prev.filter(id => id !== actionId)
        : [...prev, actionId]
    );
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "bg-green-500/20 text-green-400";
      case "Medium": return "bg-yellow-500/20 text-yellow-400";
      case "High": return "bg-red-500/20 text-red-400";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="p-6 space-y-4 sticky top-0 glass-strong z-10 border-b border-border">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/paths")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to paths
          </button>
          <h1 className="text-xl font-bold text-gradient">UNSTUCK</h1>
          <div className="w-24" />
        </div>
      </header>

      {/* Main content */}
      <main className="p-6 space-y-6">
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
          {/* Path header */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{path.name}</h2>
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
          </div>

          {/* Narrative */}
          <GlassCard>
            <p className="text-muted-foreground leading-relaxed">{path.narrative}</p>
          </GlassCard>

          {/* Immediate actions */}
          <GlassCard variant="strong" glow>
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="text-primary">→</span>
                Start tonight with these first steps
              </h3>
              <ul className="space-y-2">
                {path.immediateActions.map((action, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-primary font-bold">{index + 1}</span>
                    </div>
                    <span className="text-foreground">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>

          {/* Phases */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Full roadmap</h3>
            {path.phases.map((phase, phaseIndex) => (
              <Collapsible key={phase.id} defaultOpen={phaseIndex === 0}>
                <GlassCard>
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between text-left">
                      <h4 className="font-bold text-lg">{phase.title}</h4>
                      <span className="text-muted-foreground">▼</span>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="space-y-4 pt-4">
                      {phase.actions.map((action) => (
                        <div key={action.id} className="space-y-3 border-t border-border/50 pt-4 first:border-0 first:pt-0">
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleAction(action.id)}
                              className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
                                completedActions.includes(action.id)
                                  ? "bg-primary border-primary"
                                  : "border-border hover:border-primary"
                              }`}
                            >
                              {completedActions.includes(action.id) && (
                                <Check className="w-4 h-4 text-background" />
                              )}
                            </button>
                            <div className="flex-1 space-y-2">
                              <div className="space-y-1">
                                <h5 className="font-semibold">{action.title}</h5>
                                <Badge variant="secondary" className="text-xs">
                                  {action.tag}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground italic">{action.context}</p>
                              <div className="space-y-2">
                                <p className="text-sm font-semibold">How to do it:</p>
                                <ul className="space-y-1 text-sm">
                                  {action.howTo.map((step, index) => (
                                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                                      <span className="text-primary">•</span>
                                      <span>{step}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Target people section */}
                              {action.targetPeople && action.targetPeople.length > 0 && (
                                <div className="space-y-2 pt-2 border-t border-border/30">
                                  <p className="text-sm font-semibold">Target people like:</p>
                                  {action.targetPeople.map((target, index) => (
                                    <div key={index} className="text-sm space-y-1">
                                      <p className="text-foreground">• {target.title}</p>
                                      <p className="text-xs text-muted-foreground pl-3">
                                        Example: {target.example}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Search prompt */}
                              {action.searchPrompt && (
                                <div className="space-y-2 pt-2">
                                  <p className="text-sm font-semibold">LinkedIn search prompt:</p>
                                  <div className="flex items-start gap-2 bg-background/50 p-3 rounded-lg border border-border">
                                    <code className="text-xs flex-1 text-primary font-mono">
                                      {action.searchPrompt}
                                    </code>
                                    <button
                                      onClick={() => copyToClipboard(action.searchPrompt!, "Search prompt")}
                                      className="flex-shrink-0 text-muted-foreground hover:text-foreground"
                                    >
                                      <Copy className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              )}

                              {/* Message template */}
                              {action.messageTemplate && (
                                <div className="space-y-2 pt-2">
                                  <p className="text-sm font-semibold">Suggested message:</p>
                                  <div className="flex items-start gap-2 bg-background/50 p-3 rounded-lg border border-border">
                                    <p className="text-sm text-muted-foreground flex-1">
                                      {action.messageTemplate}
                                    </p>
                                    <button
                                      onClick={() => copyToClipboard(action.messageTemplate!, "Message")}
                                      className="flex-shrink-0 text-muted-foreground hover:text-foreground"
                                    >
                                      <Copy className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </GlassCard>
              </Collapsible>
            ))}
          </div>
        </div>
      </main>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 glass-strong border-t border-border">
        <div className="max-w-2xl mx-auto flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate("/paths")}
            className="flex-1"
          >
            See other paths
          </Button>
          <Button
            onClick={() => {
              toast({
                title: "Plan saved!",
                description: "You can access this anytime",
              });
            }}
            className="flex-1 neon-glow"
          >
            Save this plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PathDetail;
