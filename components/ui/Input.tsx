import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "search";
  icon?: boolean;
}

export function Input({
  variant = "default",
  icon = false,
  className,
  ...props
}: InputProps) {
  const baseStyles =
    "w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent";

  if (variant === "search" && icon) {
    return (
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
        <input className={cn(baseStyles, "pl-12", className)} {...props} />
      </div>
    );
  }

  return <input className={cn(baseStyles, className)} {...props} />;
}
