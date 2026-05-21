"use client";

import { motion } from "framer-motion";

const STUDIOS = [
  "MAPPA",
  "ufotable",
  "WIT Studio",
  "Bones",
  "Kyoto Animation",
  "A-1 Pictures",
  "Madhouse",
  "Studio Ghibli",
  "Trigger",
  "Pierrot",
];

export default function StudioAllies() {
  const items = [...STUDIOS, ...STUDIOS];

  return (
    <section
      aria-label="Partner studios"
      className="py-12 border-y border-sky-200/60 dark:border-slate-800/80 neon:border-cyan-500/20 bg-white/50 dark:bg-slate-950/50 neon:bg-[#090014]/50 backdrop-blur-sm transition-colors duration-300"
    >
      <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 neon:text-cyan-500/50 mb-6">
        Powered by legendary studios
      </p>
      <div className="overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white dark:from-slate-950 neon:from-[#090014] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white dark:from-slate-950 neon:from-[#090014] to-transparent z-10" />
        <motion.div
          className="flex items-center gap-12 md:gap-20"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 font-display text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-300 dark:from-slate-600 dark:to-slate-500 neon:from-cyan-600/60 neon:to-fuchsia-600/60 hover:from-orange-500 hover:to-pink-500 dark:hover:from-pink-400 dark:hover:to-orange-400 neon:hover:from-cyan-400 neon:hover:to-fuchsia-400 transition-all cursor-default whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
