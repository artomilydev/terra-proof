"use client";
import React from "react";

export const GlowingStarsBackgroundCard = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 group hover:border-cyan-500/50 transition-all duration-300 ${className}`}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 3 + 1 + "px",
                height: Math.random() * 3 + 1 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                animation: `twinkle ${Math.random() * 3 + 2}s linear infinite`,
                animationDelay: Math.random() * 3 + "s",
              }}
            />
          ))}
        </div>
      </div>
      <div className="relative z-10">{children}</div>
      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export const GlowingStarsDescription = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <p className={`text-slate-400 text-sm md:text-base ${className}`}>
      {children}
    </p>
  );
};

export const GlowingStarsTitle = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <h3 className={`text-white font-bold text-xl md:text-2xl ${className}`}>
      {children}
    </h3>
  );
};
