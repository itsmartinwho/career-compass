import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Processing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate processing time
    const timer = setTimeout(() => {
      navigate("/diagnosis");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center space-y-8 animate-fade-in">
        {/* Animated loader */}
        <div className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
          <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-accent animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gradient">
            Analyzing what you shared…
          </h2>
          
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Clustering themes in your story
            </li>
            <li className="flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ animationDelay: "0.2s" }} />
              Cross-checking with your experience
            </li>
            <li className="flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s" }} />
              Mapping possible paths forward
            </li>
          </ul>

          <p className="text-xs text-muted-foreground pt-4">
            This usually takes 5–15 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default Processing;
