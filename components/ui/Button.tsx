import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center";

  const variants = {
    primary:
      "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-lg hover:shadow-xl",
    secondary:
      "bg-slate-800 text-cyan-400 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50",
    ghost: "text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50",
    outline: "border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10",
  };

  const sizes = {
    sm: "px-4 py-2 rounded-lg text-sm",
    md: "px-6 py-3 rounded-xl text-base",
    lg: "px-8 py-4 rounded-xl text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
