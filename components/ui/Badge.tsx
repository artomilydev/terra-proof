import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "error" | "info";
  className?: string;
  children: ReactNode;
}

export function Badge({
  variant = "default",
  className,
  children,
}: BadgeProps) {
  const variants = {
    default: "bg-slate-700 text-slate-300",
    success: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    warning: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    error: "bg-red-500/20 text-red-400 border border-red-500/30",
    info: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
