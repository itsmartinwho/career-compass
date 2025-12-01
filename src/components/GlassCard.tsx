import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "strong";
  glow?: boolean;
  onClick?: () => void;
}

export const GlassCard = ({ children, className, variant = "default", glow = false, onClick }: GlassCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl p-6",
        variant === "default" ? "glass" : "glass-strong",
        glow && "neon-glow",
        "transition-all duration-300",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
};
