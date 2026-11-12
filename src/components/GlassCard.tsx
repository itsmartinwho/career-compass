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
        "rounded-xl p-6",
        variant === "default" ? "glass" : "glass-strong",
        glow && "ring-1 ring-primary/20",
        "transition-colors duration-200",
        onClick && "cursor-pointer hover:border-primary/40",
        className
      )}
    >
      {children}
    </div>
  );
};
