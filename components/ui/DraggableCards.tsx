"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useState } from "react";

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
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {cards.map((card, index) => (
        <DraggableCard
          key={card.id}
          card={card}
          index={index}
          total={cards.length}
          onRemove={() => {
            setCards((prev) => prev.filter((c) => c.id !== card.id));
          }}
        />
      ))}
    </div>
  );
};

const DraggableCard = ({
  card,
  index,
  total,
  onRemove,
}: {
  card: {
    id: number;
    image: string;
    title: string;
    location: string;
    owner: string;
    price: string;
  };
  index: number;
  total: number;
  onRemove: () => void;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]));
  const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]));

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100 || Math.abs(y.get()) > 100) {
      onRemove();
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
        zIndex: total - index,
      }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: "grabbing" }}
      className="absolute w-72 sm:w-80 md:w-96 h-96 sm:h-[420px] md:h-[450px] cursor-grab"
      initial={{
        scale: 1 - index * 0.05,
        y: -index * 20,
      }}
      animate={{
        scale: 1 - index * 0.05,
        y: -index * 20,
      }}
    >
      <div className="w-full h-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-cyan-500/20">
        <div className="relative h-2/3">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        </div>
        <div className="p-6 space-y-3">
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
    </motion.div>
  );
};
