"use client";

import { motion } from "framer-motion";
import { Trophy, TrendingUp, Flame } from "lucide-react";

const RANKINGS = [
  { rank: 1, title: "Summer Days with You", score: 98, change: "+12%", color: "from-yellow-400 to-orange-500" },
  { rank: 2, title: "Blade of the Fallen Sun", score: 94, change: "+8%", color: "from-orange-500 to-red-500" },
  { rank: 3, title: "Neon Cyber Pulse", score: 91, change: "+15%", color: "from-fuchsia-500 to-cyan-500" },
  { rank: 4, title: "Spirits of Kyoto Festival", score: 87, change: "+5%", color: "from-violet-500 to-indigo-500" },
  { rank: 5, title: "Beach Volleyball Club", score: 82, change: "NEW", color: "from-sky-400 to-blue-500" },
];

export default function SummerLeaderboard() {
  return (
    <section
      id="leaderboard"
      className="py-24 relative overflow-hidden bg-white dark:bg-slate-950 neon:bg-[#090014] transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/30 neon:bg-yellow-950/30 text-amber-600 dark:text-amber-400 neon:text-yellow-400 text-xs font-black uppercase tracking-widest mb-4 border border-amber-200 dark:border-amber-500/30 neon:border-yellow-500/30">
            <Trophy className="w-4 h-4" /> Weekly Rankings
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white neon:text-cyan-50 tracking-tight">
            Summer{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 neon:from-yellow-400 neon:to-orange-500">
              Leaderboard
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 neon:text-cyan-100/60 mt-3 font-medium">
            Top shows by hype score — updated every Sunday.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {RANKINGS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="group flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-sky-50/80 dark:bg-slate-900/80 neon:bg-[#12002b]/60 border border-sky-100 dark:border-slate-800 neon:border-fuchsia-900/40 hover:border-orange-300 dark:hover:border-pink-500/40 neon:hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg"
            >
              <div
                className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center font-display font-extrabold text-xl text-white bg-gradient-to-br ${item.color} shadow-lg ${
                  item.rank === 1 ? "ring-2 ring-yellow-400/50 ring-offset-2 dark:ring-offset-slate-950 neon:ring-offset-[#090014]" : ""
                }`}
              >
                {item.rank}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-slate-900 dark:text-white neon:text-cyan-50 truncate">
                    {item.title}
                  </h3>
                  {item.rank <= 3 && (
                    <Flame className="w-4 h-4 text-orange-500 dark:text-pink-400 neon:text-cyan-400 shrink-0" />
                  )}
                </div>
                <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 neon:bg-slate-900 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.score}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                  />
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p className="font-display text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500">
                  {item.score}
                </p>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 neon:text-cyan-400">
                  <TrendingUp className="w-3 h-3" />
                  {item.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
