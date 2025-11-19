"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <div
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500",
          animate &&
            "bg-[radial-gradient(circle_farthest-side_at_0_100%,#06b6d4,transparent),radial-gradient(circle_farthest-side_at_100%_0,#3b82f6,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#a855f7,transparent),radial-gradient(circle_farthest-side_at_0_0,#22d3ee,#141316)]"
        )}
      />
      <div
        className={cn("relative z-10 rounded-3xl bg-slate-900 p-6", className)}
      >
        {children}
      </div>
    </div>
  );
};
