"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic2, Volume2 } from "lucide-react";

const LINES = [
  {
    id: "aiko",
    character: "Aiko Tanaka",
    show: "Summer Skies",
    line: "This summer... I won't let anyone steal our horizon.",
    emoji: "🌅",
    gradient: "from-orange-500 to-amber-400",
  },
  {
    id: "kai",
    character: "Kai 0x1",
    show: "Neon Cyber Pulse",
    line: "Firewall breached. The grid belongs to us now.",
    emoji: "⚡",
    gradient: "from-fuchsia-500 to-cyan-500",
  },
  {
    id: "spirit",
    character: "Miko",
    show: "Kyoto Festival",
    line: "The lanterns remember every wish you've ever made.",
    emoji: "🏮",
    gradient: "from-violet-500 to-indigo-500",
  },
];

export default function VoiceLineSpotlight() {
  const [active, setActive] = useState(LINES[0]);
  const [pulse, setPulse] = useState(false);

  const playLine = (line: (typeof LINES)[0]) => {
    setActive(line);
    setPulse(true);
    setTimeout(() => setPulse(false), 600);
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 text-orange-500 dark:text-pink-400 neon:text-cyan-400 font-black uppercase tracking-widest text-xs mb-2">
            <Mic2 className="w-4 h-4" /> Iconic Lines
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white neon:text-cyan-50 tracking-tight">
            Voice Line Spotlight
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {LINES.map((line) => (
            <button
              key={line.id}
              type="button"
              onClick={() => playLine(line)}
              className={`px-4 py-2 rounded-full text-sm font-black transition-all cursor-pointer ${
                active.id === line.id
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 neon:from-cyan-500 neon:to-fuchsia-600 text-white shadow-lg"
                  : "bg-sky-100 dark:bg-slate-800 neon:bg-[#12002b] text-slate-600 dark:text-slate-300 neon:text-cyan-300/70 border border-sky-200 dark:border-slate-700 neon:border-fuchsia-900/40 hover:border-orange-300"
              }`}
            >
              {line.emoji} {line.character}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className={`relative p-8 md:p-12 rounded-[2rem] bg-gradient-to-br ${active.gradient} text-white text-center overflow-hidden`}
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-white"
                  style={{
                    left: `${15 + i * 14}%`,
                    top: `${20 + (i % 3) * 25}%`,
                  }}
                  animate={{ opacity: pulse ? [0.2, 1, 0.2] : 0.3, scale: pulse ? [1, 1.5, 1] : 1 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                />
              ))}
            </div>

            <motion.button
              type="button"
              onClick={() => {
                setPulse(true);
                setTimeout(() => setPulse(false), 600);
              }}
              animate={pulse ? { scale: [1, 1.15, 1] } : {}}
              className="mx-auto mb-6 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
              aria-label="Play voice line"
            >
              <Volume2 className="w-8 h-8" />
            </motion.button>

            <p className="font-display text-2xl md:text-3xl font-extrabold leading-snug mb-4 relative z-10">
              &ldquo;{active.line}&rdquo;
            </p>
            <p className="text-white/80 text-sm font-bold uppercase tracking-widest relative z-10">
              — {active.character} · {active.show}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
