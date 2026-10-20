import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { useNavigate } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";
import { Info } from "lucide-react";
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

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gradient">UNSTUCK</h1>
          <Dialog>
            <DialogTrigger asChild>
              <button className="p-2 rounded-full glass hover:glass-strong transition-all">
                <Info className="w-5 h-5" />
              </button>
            </DialogTrigger>
            <DialogContent className="glass-strong border-border">
              <DialogHeader>
                <DialogTitle>How it works</DialogTitle>
                <DialogDescription className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">1</div>
                      <span>Share what's on your mind</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">2</div>
                      <span>Get a clear diagnosis</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">3</div>
                      <span>Receive concrete action plans</span>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center p-6">
          <GlassCard className="max-w-lg w-full animate-fade-in" glow>
            <div className="text-center space-y-6">
              <div className="space-y-3">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Feeling stuck in your career?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Tell me what's going on. I'll help you understand it and suggest concrete next moves.
                </p>
              </div>

              <div className="space-y-4 py-4">
                <div className="flex items-start gap-3 text-left">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Private:</strong> your inputs are used only to generate your plan
                  </p>
                </div>
                <div className="flex items-start gap-3 text-left">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Takes ~5–7 minutes</strong> to complete
                  </p>
                </div>
              </div>

              <Button
                onClick={() => navigate("/brain-dump")}
                size="lg"
                className="w-full text-lg h-14 neon-glow hover:scale-105 transition-transform"
              >
                Get started
              </Button>
            </div>
          </GlassCard>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center text-xs text-muted-foreground">
          Nothing is stored. Your answers are sent to Gemini to write your plan.
        </footer>
      </div>
    </div>
  );
};

export default Welcome;
