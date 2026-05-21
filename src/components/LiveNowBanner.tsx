"use client";

import { motion } from "framer-motion";
import { Radio, Circle } from "lucide-react";

const NOW_AIRING = [
  { show: "Summer Days with You", ep: "Ep. 8", viewers: "48K" },
  { show: "Neon Cyber Pulse", ep: "Ep. 5", viewers: "92K" },
  { show: "Blade of the Fallen Sun", ep: "Ep. 12", viewers: "61K" },
  { show: "Spirits of Kyoto Festival", ep: "Ep. 3", viewers: "35K" },
  { show: "Beach Volleyball Club", ep: "Ep. 1 — Premiere!", viewers: "120K" },
];

export default function LiveNowBanner() {
  const items = [...NOW_AIRING, ...NOW_AIRING];

  return (
    <section
      aria-label="Now airing"
      className="relative z-20 overflow-hidden border-y border-sky-200/60 dark:border-slate-800/80 neon:border-cyan-500/25 bg-gradient-to-r from-orange-500/5 via-pink-500/5 to-cyan-500/5 dark:from-pink-900/10 dark:via-slate-950 dark:to-cyan-900/10 neon:from-fuchsia-900/20 neon:via-[#090014] neon:to-cyan-950/20"
    >
      <div className="flex items-stretch">
        <div className="shrink-0 flex items-center gap-2 px-4 md:px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 dark:from-pink-600 dark:to-orange-500 neon:from-fuchsia-600 neon:to-cyan-500 text-white font-black uppercase tracking-widest text-[10px] md:text-xs shadow-lg">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <Circle className="relative h-2.5 w-2.5 fill-white" />
          </span>
          <Radio className="w-4 h-4 hidden sm:block" />
          Live Now
        </div>

        <div className="flex-1 overflow-hidden py-3 relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-sky-50 dark:from-slate-950 neon:from-[#090014] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-sky-50 dark:from-slate-950 neon:from-[#090014] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex items-center gap-8 md:gap-12 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          >
            {items.map((item, i) => (
              <span
                key={`${item.show}-${i}`}
                className="inline-flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-200 neon:text-cyan-100/90 shrink-0"
              >
                <span className="text-orange-500 dark:text-pink-400 neon:text-cyan-400 font-black">
                  {item.show}
                </span>
                <span className="text-slate-400 dark:text-slate-500 neon:text-cyan-500/50">•</span>
                <span className="text-slate-600 dark:text-slate-300 neon:text-fuchsia-300/80">
                  {item.ep}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-sky-100 dark:bg-slate-800 neon:bg-cyan-950/50 text-[10px] font-black uppercase tracking-wider text-orange-600 dark:text-pink-300 neon:text-cyan-300 border border-sky-200 dark:border-slate-700 neon:border-cyan-500/30">
                  {item.viewers} watching
                </span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
