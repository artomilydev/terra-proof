"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";

import { useTheme } from "next-themes";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export default function WorldMap({
  dots = [],
  lineColor = "#06b6d4",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });

  const { theme } = useTheme();

  const svgMap = map.getSVG({
    radius: 0.22,
    color: "#FFFFFF20",
    shape: "circle",
    backgroundColor: "transparent",
  });

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="w-full aspect-[2/1] bg-slate-950 rounded-lg relative font-sans overflow-hidden">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              {/* Glow effect layer */}
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke={lineColor}
                strokeWidth="8"
                opacity="0.1"
                filter="url(#blur)"
                initial={{
                  pathLength: 0,
                }}
                whileInView={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.5 * i,
                  ease: "easeInOut",
                }}
                viewport={{ once: false, amount: 0.5 }}
              />

              {/* Main line with gradient */}
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                whileInView={{
                  pathLength: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.5 * i,
                  ease: "easeInOut",
                }}
                viewport={{ once: false, amount: 0.5 }}
              />

              {/* Animated particle traveling along the path */}
              <motion.circle
                cx={startPoint.x}
                cy={startPoint.y}
                r="2.5"
                fill={lineColor}
                initial={{ offsetDistance: "0%" }}
                whileInView={{
                  offsetDistance: "100%",
                }}
                transition={{
                  duration: 2.5,
                  delay: 0.5 * i + 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                viewport={{ once: false, amount: 0.5 }}
                style={{
                  offsetPath: `path('${createCurvedPath(
                    startPoint,
                    endPoint
                  )}')`,
                }}
              />
            </g>
          );
        })}

        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>

          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0" />
            <stop offset="15%" stopColor={lineColor} stopOpacity="0.8" />
            <stop offset="50%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="85%" stopColor={lineColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>

          <radialGradient id="glow-gradient">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              {/* Glow ring around start point */}
              <motion.circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="8"
                fill="none"
                stroke={lineColor}
                strokeWidth="1"
                opacity="0.3"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1.5, opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: 0.5 * i,
                  repeat: Infinity,
                }}
                viewport={{ once: false, amount: 0.5 }}
              />

              {/* Main start point dot */}
              <motion.circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="4"
                fill={lineColor}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + 0.5 * i,
                }}
                viewport={{ once: false, amount: 0.5 }}
              />

              {/* Pulsing aura */}
              <motion.circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="4"
                fill={lineColor}
                opacity="0.4"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.8, 1] }}
                transition={{
                  duration: 2,
                  delay: 0.5 * i,
                  repeat: Infinity,
                }}
              />
            </g>

            <g key={`end-${i}`}>
              {/* Glow ring around end point */}
              <motion.circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="8"
                fill="none"
                stroke={lineColor}
                strokeWidth="1"
                opacity="0.3"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1.5, opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: 1 + 0.5 * i,
                  repeat: Infinity,
                }}
                viewport={{ once: false, amount: 0.5 }}
              />

              {/* Main end point dot */}
              <motion.circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="4"
                fill={lineColor}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 1.2 + 0.5 * i,
                }}
                viewport={{ once: false, amount: 0.5 }}
              />

              {/* Pulsing aura */}
              <motion.circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="4"
                fill={lineColor}
                opacity="0.4"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.8, 1] }}
                transition={{
                  duration: 2,
                  delay: 1 + 0.5 * i,
                  repeat: Infinity,
                }}
              />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
