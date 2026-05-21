"use client";

import { motion } from "framer-motion";
import { Flame, Users, Tv, Trophy } from "lucide-react";

const STATS = [
  { icon: Tv, label: "Summer Premieres", value: "24+" },
  { icon: Users, label: "Global Viewers", value: "2.4M" },
  { icon: Flame, label: "Trending Titles", value: "12" },
  { icon: Trophy, label: "Award Nominations", value: "8" },
];

const MARQUEE_ITEMS = [
  "★ Anime Summer Special 2026",
  "★ Live beach festival July 15",
  "★ New episodes every week",
  "★ Exclusive 4K wallpapers",
  "★ Take the summer personality quiz",
];

export default function StatsMarquee() {
  const duplicated = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section className="relative border-y border-sky-200/80 dark:border-slate-800/80 neon:border-cyan-500/20 bg-white dark:bg-slate-950 neon:bg-[#090014] overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="relative flex flex-col items-center text-center p-5 rounded-2xl bg-sky-50/90 dark:bg-slate-900/70 neon:bg-[#12002b]/60 border border-sky-100 dark:border-slate-800 neon:border-fuchsia-900/40 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-orange-500/5 via-transparent to-cyan-500/5 dark:from-pink-500/10 neon:from-cyan-500/10 neon:to-fuchsia-500/10 pointer-events-none" />
              <stat.icon className="relative w-7 h-7 text-orange-500 dark:text-pink-400 neon:text-cyan-400 mb-2 drop-shadow-sm" />
              <span className="relative font-display text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500">
                {stat.value}
              </span>
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 neon:text-cyan-300/60 mt-1">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative py-4 bg-gradient-to-r from-orange-500/15 via-pink-500/15 to-yellow-500/15 dark:from-pink-600/15 dark:via-orange-500/15 dark:to-yellow-500/15 neon:from-cyan-500/15 neon:via-fuchsia-500/15 neon:to-purple-500/15 border-t border-sky-200/50 dark:border-slate-800/50 neon:border-cyan-500/20 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {duplicated.map((text, i) => (
            <span
              key={`${text}-${i}`}
              className="text-sm font-black uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-pink-500 to-yellow-500 dark:from-pink-400 dark:via-orange-400 dark:to-yellow-300 neon:from-cyan-400 neon:via-fuchsia-400 neon:to-purple-400 shrink-0"
            >
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
