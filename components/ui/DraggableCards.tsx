"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SmileIcon } from "lucide-react";
import React, { useState } from "react";

export interface DraggableCardContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const DraggableCardContainer = ({
  children,
  className = "",
}: DraggableCardContainerProps) => {
  return (
    <div
      className={`relative w-full h-[500px] flex items-center justify-center ${className}`}
    >
      {/* Backdrop text - behind cards */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none">
        <div className="text-center space-y-2">
          <p className="text-base sm:text-lg md:text-xl">
            <SmileIcon className="w-16 h-16 mx-auto stroke-cyan-400" />
          </p>
        </div>
      </div>
      {/* Cards container - no overflow restrictions */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {children}
      </div>
    </div>
  );
};

export interface DraggableCardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const DraggableCardBody = ({
  children,
  className = "",
}: DraggableCardBodyProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]));
  const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]));

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 250 || Math.abs(y.get()) > 250) {
      // Card is removed from DOM via parent state
    } else {
      x.set(0);
      y.set(0);
    }
  };

  return (
    <motion.div
      style={{
        x,
        y,
        rotateX,
        rotateY,
      }}
      drag
      dragConstraints={{ left: -400, right: 400, top: -400, bottom: 400 }}
      dragElastic={0.15}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: "grabbing" }}
      className={`cursor-grab ${className}`}
    >
      <div className="relative w-full h-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-cyan-500/20 transition-shadow duration-300 hover:shadow-cyan-500/40">
        {/* Guard border - always visible on top */}
        <div className="absolute inset-0 border-2 border-cyan-500/40 rounded-2xl pointer-events-none z-50" />
        {children}
      </div>
    </motion.div>
  );
};

export const DraggableCardStack = ({
  items,
}: {
  items: {
    id: number;
    image: string;
    title: string;
    location: string;
    owner: string;
    price: string;
  }[];
}) => {
  const [cards, setCards] = useState(items);

  return (
    <DraggableCardContainer>
      {cards.map((card, index) => (
        <DraggableCardBody
          key={card.id}
          className={`absolute w-72 sm:w-80 md:w-96 h-96 sm:h-[420px] md:h-[450px]`}
        >
          <div className="w-full h-full flex flex-col">
            <div className="relative h-2/3 overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/50 to-transparent" />
            </div>
            <div className="p-6 space-y-3 bg-slate-900">
              <h3 className="text-white font-bold text-xl line-clamp-1">
                {card.title}
              </h3>
              <p className="text-cyan-400 text-sm flex items-center gap-1">
                📍 {card.location}
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-400 text-sm">{card.owner}</span>
                <span className="text-cyan-400 font-bold text-lg">
                  {card.price} SUI
                </span>
              </div>
            </div>
          </div>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
};
