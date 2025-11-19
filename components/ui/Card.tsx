import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  variant?: "default" | "glass" | "gradient";
  hover?: boolean;
  className?: string;
  children: ReactNode;
}

export function Card({
  variant = "default",
  hover = false,
  className,
  children,
}: CardProps) {
  const variants = {
    default: "bg-slate-800 border border-slate-700",
    glass: "bg-slate-900/60 backdrop-blur-md border border-slate-700/50",
    gradient:
      "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700",
  };

  const hoverClass = hover
    ? "transition-all duration-300 hover:scale-[1.02] hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10"
    : "";

  return (
    <div
      className={cn(
        "rounded-2xl p-6",
        variants[variant],
        hoverClass,
        className
      )}
    >
      {children}
    </div>
  );
}
