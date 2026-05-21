"use client";

import { motion } from "framer-motion";

const BADGES = [
  { emoji: "🌊", className: "top-[18%] left-[8%] md:left-[12%]", delay: 0 },
  { emoji: "☀️", className: "top-[25%] right-[10%] md:right-[14%]", delay: 0.5 },
  { emoji: "🎌", className: "bottom-[28%] left-[12%] md:left-[18%]", delay: 1 },
  { emoji: "🍧", className: "bottom-[22%] right-[8%] md:right-[12%]", delay: 1.5 },
  { emoji: "✨", className: "top-[42%] left-[5%] hidden md:block", delay: 2 },
  { emoji: "🏖️", className: "top-[38%] right-[6%] hidden md:block", delay: 2.5 },
];

export default function HeroFloatingBadges() {
  return (
    <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden hidden sm:block" aria-hidden>
      {BADGES.map((badge) => (
        <motion.span
          key={badge.emoji + badge.className}
          className={`absolute text-3xl md:text-4xl drop-shadow-lg select-none ${badge.className}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.6, 1, 0.6],
            y: [0, -12, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            opacity: { duration: 3, repeat: Infinity, delay: badge.delay },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: badge.delay },
            rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: badge.delay },
            scale: { duration: 0.5, delay: badge.delay },
          }}
        >
          {badge.emoji}
        </motion.span>
      ))}
    </div>
  );
}
