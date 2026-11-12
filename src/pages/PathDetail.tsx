import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, Zap, Check, Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CareerPath, useSession } from "@/context/SessionContext";

function formatPathMarkdown(path: CareerPath, diagnosisSummary: string, completedActions: string[]): string {
  const lines: string[] = [
    `# Career Action Plan: ${path.name}`,
    ``,
    `- **Time Horizon:** ${path.timeHorizon}`,
    `- **Risk:** ${path.risk}`,
    `- **Energy Required:** ${path.energy}`,
    ``,
    `## Diagnostic Context`,
    diagnosisSummary || path.description,
    ``,
    `## Why This Path Fits`,
    path.narrative,
    ``,
    `## Start Tonight`,
    ...path.immediateActions.map((a, i) => `${i + 1}. ${a}`),
    ``,
    `## Phased Roadmap`,
  ];

  for (const phase of path.phases) {
    lines.push(``, `### ${phase.title}`);
    for (const action of phase.actions) {
      const checked = completedActions.includes(action.id) ? "x" : " ";
      lines.push(`- [${checked}] **${action.title}** (${action.tag}) — ${action.context}`);
      for (const step of action.howTo) {
        lines.push(`  - ${step}`);
      }
      if (action.searchPrompt) {
        lines.push(`  - LinkedIn query: \`${action.searchPrompt}\``);
      }
      if (action.messageTemplate) {
        lines.push(`  - Outreach template: > ${action.messageTemplate}`);
      }
    }
  }
  return lines.join("\n") + "\n";
}

const PathDetail = () => {
  const navigate = useNavigate();
  const { pathId } = useParams();
  const { toast } = useToast();
  const { careerPaths, diagnosisSummary, completedActions, toggleCompletedAction } = useSession();

  const path = careerPaths.find((p) => p.id === pathId);

  if (!path) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p>Path not found or session expired.</p>
          <Button onClick={() => navigate("/paths")}>Back to Paths</Button>
        </div>
      </div>
    );
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `${label} copied to clipboard`,
    });
  };

  const downloadMarkdown = () => {
    const md = formatPathMarkdown(path, diagnosisSummary, completedActions);
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `career-plan-${path.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Plan downloaded",
      description: "Saved as a Markdown (.md) file",
    });
  };

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
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="p-6 sticky top-0 glass-strong z-10 border-b border-border">
        <div className="max-w-2xl mx-auto flex justify-between items-center gap-4">
          <button
            onClick={() => navigate("/paths")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to paths
          </button>
          <h1 className="text-xl font-editorial">UNSTUCK</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                copyToClipboard(
                  formatPathMarkdown(path, diagnosisSummary, completedActions),
                  "Full Markdown plan",
                )
              }
              className="gap-1.5 text-xs"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy .md
            </Button>
            <Button variant="outline" size="sm" onClick={downloadMarkdown} className="gap-1.5 text-xs">
              <Download className="w-3.5 h-3.5" />
              Export .md
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="p-6 space-y-6">
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
          {/* Path header */}
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-editorial font-normal">{path.name}</h2>
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
          </div>

          {/* Narrative */}
          <GlassCard>
            <p className="text-muted-foreground leading-relaxed">{path.narrative}</p>
          </GlassCard>

          {/* Immediate actions */}
          <GlassCard variant="strong" glow>
            <div className="space-y-4">
              <h3 className="text-xl font-editorial font-normal flex items-center gap-2">
                <span className="text-primary">→</span>
                Start tonight with these first steps
              </h3>
              <ul className="space-y-2.5">
                {path.immediateActions.map((action, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-primary font-mono font-bold">{index + 1}</span>
                    </div>
                    <span className="text-foreground text-sm leading-relaxed">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>

          {/* Phases */}
          <div className="space-y-4">
            <h3 className="text-2xl font-editorial font-normal">Full roadmap</h3>
            {path.phases.map((phase, phaseIndex) => (
              <Collapsible key={phase.id} defaultOpen={phaseIndex === 0}>
                <GlassCard>
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between text-left">
                      <h4 className="font-semibold text-base">{phase.title}</h4>
                      <span className="text-xs font-mono text-muted-foreground">Toggle ▾</span>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="space-y-4 pt-4">
                      {phase.actions.map((action) => (
                        <div key={action.id} className="space-y-3 border-t border-border/70 pt-4 first:border-0 first:pt-0">
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleCompletedAction(action.id)}
                              aria-label={`Mark ${action.title} complete`}
                              className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
                                completedActions.includes(action.id)
                                  ? "bg-primary border-primary text-primary-foreground"
                                  : "border-border hover:border-primary"
                              }`}
                            >
                              {completedActions.includes(action.id) && <Check className="w-3.5 h-3.5" />}
                            </button>
                            <div className="flex-1 space-y-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <h5 className="font-semibold text-sm">{action.title}</h5>
                                <Badge variant="secondary" className="text-xs font-mono">
                                  {action.tag}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground italic">{action.context}</p>
                              <div className="space-y-1.5">
                                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">How to do it</p>
                                <ul className="space-y-1 text-sm">
                                  {action.howTo.map((step, index) => (
                                    <li key={index} className="flex items-start gap-2 text-foreground/90">
                                      <span className="text-primary">•</span>
                                      <span>{step}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {action.targetPeople && action.targetPeople.length > 0 && (
                                <div className="space-y-1.5 pt-2 border-t border-border/50">
                                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Target people</p>
                                  {action.targetPeople.map((target, index) => (
                                    <div key={index} className="text-sm space-y-0.5">
                                      <p className="text-foreground font-medium">• {target.title}</p>
                                      <p className="text-xs text-muted-foreground pl-3">
                                        Example: {target.example}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {action.searchPrompt && (
                                <div className="space-y-1.5 pt-2">
                                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">LinkedIn search query</p>
                                  <div className="flex items-start gap-2 bg-secondary/50 p-3 rounded-lg border border-border">
                                    <code className="text-xs flex-1 text-primary font-mono">
                                      {action.searchPrompt}
                                    </code>
                                    <button
                                      onClick={() => copyToClipboard(action.searchPrompt!, "Search prompt")}
                                      className="flex-shrink-0 text-muted-foreground hover:text-foreground"
                                      aria-label="Copy search query"
                                    >
                                      <Copy className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              )}

                              {action.messageTemplate && (
                                <div className="space-y-1.5 pt-2">
                                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Suggested outreach message</p>
                                  <div className="flex items-start gap-2 bg-secondary/50 p-3 rounded-lg border border-border">
                                    <p className="text-sm text-foreground/90 flex-1 leading-relaxed">
                                      {action.messageTemplate}
                                    </p>
                                    <button
                                      onClick={() => copyToClipboard(action.messageTemplate!, "Message")}
                                      className="flex-shrink-0 text-muted-foreground hover:text-foreground"
                                      aria-label="Copy outreach message"
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
          <Button variant="outline" onClick={() => navigate("/paths")} className="flex-1">
            Compare other paths
          </Button>
          <Button onClick={downloadMarkdown} className="flex-1 gap-2">
            <Download className="w-4 h-4" />
            Download Markdown Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PathDetail;
