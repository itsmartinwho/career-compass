import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { useNavigate } from "react-router-dom";
import { Info, ArrowRight } from "lucide-react";
import { useSession } from "@/context/SessionContext";
import { SAMPLE_SCENARIOS, SampleScenario } from "@/data/sampleScenarios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Welcome = () => {
  const navigate = useNavigate();
  const { setBrainDumpText, setAnalysisResults } = useSession();

  const handleLoadSample = (scenario: SampleScenario) => {
    setBrainDumpText(scenario.brainDump);
    setAnalysisResults(scenario.diagnosisSummary, scenario.diagnoses, scenario.careerPaths);
    navigate("/diagnosis");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="max-w-4xl w-full mx-auto px-6 py-6 flex justify-between items-center border-b border-border/70">
        <div className="flex items-baseline gap-3">
          <h1 className="text-2xl font-editorial tracking-tight">UNSTUCK</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <button
              aria-label="How it works"
              className="p-2 rounded-lg glass hover:glass-strong transition-colors"
            >
              <Info className="w-4 h-4" />
            </button>
          </DialogTrigger>
          <DialogContent className="glass-strong border-border">
            <DialogHeader>
              <DialogTitle className="font-editorial text-2xl font-normal">How it works</DialogTitle>
              <DialogDescription className="space-y-4 pt-4 text-foreground/80">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary font-mono text-xs font-bold">
                      1
                    </div>
                    <span>Write an unstructured brain dump of what is draining or blocking you at work</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary font-mono text-xs font-bold">
                      2
                    </div>
                    <span>Separate structural burnout drivers from intact craft motivation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary font-mono text-xs font-bold">
                      3
                    </div>
                    <span>Compare 3 concrete paths with outreach templates and a downloadable plan</span>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <GlassCard className="space-y-6 p-8" variant="strong">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-editorial font-normal leading-[1.08]">
              Feeling stuck at a career crossroads?
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Write down what is actually going on—the re-orgs, the calendar load, the role mismatch. You will get a clear diagnosis and three concrete roadmaps you can act on tonight.
            </p>
          </div>

          <div className="space-y-3 py-2 border-y border-border/70 text-sm">
            <div className="flex items-start gap-3">
              <span className="font-mono text-xs text-primary mt-0.5">01</span>
              <p className="text-muted-foreground">
                <strong className="text-foreground font-medium">No account required:</strong> start writing right away and export your action plan when you're done.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-mono text-xs text-primary mt-0.5">02</span>
              <p className="text-muted-foreground">
                <strong className="text-foreground font-medium">Takes ~5 minutes:</strong> includes concrete first moves, LinkedIn search queries, and outreach copy.
              </p>
            </div>
          </div>

          <Button
            onClick={() => navigate("/brain-dump")}
            size="lg"
            className="w-full text-base h-12 gap-2"
          >
            Start your brain dump
            <ArrowRight className="w-4 h-4" />
          </Button>
        </GlassCard>

        {/* Example situations */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Or explore an example
            </h3>
          </div>

          <div className="space-y-3">
            {SAMPLE_SCENARIOS.map((scenario) => (
              <GlassCard
                key={scenario.id}
                onClick={() => handleLoadSample(scenario)}
                className="p-4 space-y-2 hover:border-primary/50"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium text-sm text-foreground">{scenario.title}</h4>
                  <span className="text-xs font-mono text-primary shrink-0">Open →</span>
                </div>
                <p className="text-xs font-mono text-muted-foreground">{scenario.role}</p>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  “{scenario.brainDump}”
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;
