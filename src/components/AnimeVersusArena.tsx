"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, Zap } from "lucide-react";

const BATTLES = [
  {
    id: "romance-vs-action",
    left: { title: "Summer Days with You", emoji: "🌅", color: "from-orange-400 to-pink-500" },
    right: { title: "Neon Cyber Pulse", emoji: "⚡", color: "from-fuchsia-500 to-cyan-500" },
    baseLeft: 58,
  },
  {
    id: "samurai-vs-spirit",
    left: { title: "Blade of the Fallen Sun", emoji: "🗡️", color: "from-amber-500 to-red-600" },
    right: { title: "Spirits of Kyoto", emoji: "👻", color: "from-violet-500 to-indigo-500" },
    baseLeft: 52,
  },
];

export default function AnimeVersusArena() {
  const [activeBattle, setActiveBattle] = useState(0);
  const [votes, setVotes] = useState<Record<string, "left" | "right" | null>>({
    "romance-vs-action": null,
    "samurai-vs-spirit": null,
  });

  const battle = BATTLES[activeBattle];
  const userVote = votes[battle.id];
  const leftPercent = userVote === "left" ? 72 : userVote === "right" ? 28 : battle.baseLeft;

  const castVote = (side: "left" | "right") => {
    setVotes((v) => ({ ...v, [battle.id]: side }));
  };

  return (
    <section
      id="versus"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-sky-100/90 via-white to-sky-50 dark:from-slate-900/80 dark:via-slate-950 dark:to-slate-950 neon:from-[#0d0020] neon:via-[#090014] neon:to-[#090014] transition-colors duration-300"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-96 h-96 bg-orange-400/20 dark:bg-pink-500/15 neon:bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400/20 dark:bg-orange-500/15 neon:bg-fuchsia-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-orange-500 dark:text-pink-400 neon:text-cyan-400 font-black uppercase tracking-widest text-xs mb-3">
            <Swords className="w-4 h-4" /> Versus Arena
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white neon:text-cyan-50 tracking-tight">
            Pick your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 neon:from-fuchsia-400 neon:to-cyan-400">
              summer champion
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 neon:text-cyan-100/60 mt-3 font-medium max-w-lg mx-auto">
            Tap a side to vote — community bars update live (demo).
          </p>
        </motion.div>

        <div className="flex justify-center gap-2 mb-8">
          {BATTLES.map((b, i) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setActiveBattle(i)}
              className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                activeBattle === i
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg neon:from-cyan-500 neon:to-fuchsia-600"
                  : "bg-white/80 dark:bg-slate-900/80 neon:bg-[#12002b]/80 text-slate-600 dark:text-slate-400 neon:text-cyan-200/70 border border-sky-200 dark:border-slate-700 neon:border-fuchsia-900/40 hover:border-orange-300"
              }`}
            >
              Match {i + 1}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={battle.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-center">
              <button
                type="button"
                onClick={() => castVote("left")}
                className={`group relative p-6 md:p-8 rounded-3xl border-2 text-left transition-all duration-300 card-glow ${
                  userVote === "left"
                    ? "border-orange-400 dark:border-pink-500 neon:border-cyan-400 scale-[1.02] shadow-xl"
                    : "border-sky-200/80 dark:border-slate-700 neon:border-fuchsia-900/50 hover:border-orange-300"
                } bg-white/90 dark:bg-slate-900/90 neon:bg-[#12002b]/70`}
              >
                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">{battle.left.emoji}</span>
                <h3 className="font-display font-extrabold text-lg md:text-xl text-slate-900 dark:text-white neon:text-cyan-50">
                  {battle.left.title}
                </h3>
                {userVote === "left" && (
                  <span className="absolute top-4 right-4 flex items-center gap-1 text-xs font-black text-orange-500 neon:text-cyan-400">
                    <Zap className="w-3 h-3" /> Your pick
                  </span>
                )}
              </button>

              <div className="flex items-center justify-center">
                <span className="font-display text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-orange-500 neon:from-fuchsia-500 neon:to-cyan-400 drop-shadow-sm">
                  VS
                </span>
              </div>

              <button
                type="button"
                onClick={() => castVote("right")}
                className={`group relative p-6 md:p-8 rounded-3xl border-2 text-left transition-all duration-300 card-glow ${
                  userVote === "right"
                    ? "border-orange-400 dark:border-pink-500 neon:border-cyan-400 scale-[1.02] shadow-xl"
                    : "border-sky-200/80 dark:border-slate-700 neon:border-fuchsia-900/50 hover:border-orange-300"
                } bg-white/90 dark:bg-slate-900/90 neon:bg-[#12002b]/70`}
              >
                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">{battle.right.emoji}</span>
                <h3 className="font-display font-extrabold text-lg md:text-xl text-slate-900 dark:text-white neon:text-cyan-50">
                  {battle.right.title}
                </h3>
                {userVote === "right" && (
                  <span className="absolute top-4 right-4 flex items-center gap-1 text-xs font-black text-orange-500 neon:text-cyan-400">
                    <Zap className="w-3 h-3" /> Your pick
                  </span>
                )}
              </button>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-sky-50/90 dark:bg-slate-900/80 neon:bg-[#12002b]/50 border border-sky-100 dark:border-slate-800 neon:border-fuchsia-900/30">
              <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-2">
                <span className="text-orange-600 dark:text-pink-400 neon:text-cyan-400">{leftPercent}%</span>
                <span className="text-slate-500 neon:text-cyan-200/50">Community vote</span>
                <span className="text-pink-600 dark:text-orange-400 neon:text-fuchsia-400">{100 - leftPercent}%</span>
              </div>
              <div className="flex h-4 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 neon:bg-slate-900">
                <motion.div
                  className={`h-full bg-gradient-to-r ${battle.left.color}`}
                  initial={false}
                  animate={{ width: `${leftPercent}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
                <motion.div
                  className={`h-full bg-gradient-to-r ${battle.right.color}`}
                  initial={false}
                  animate={{ width: `${100 - leftPercent}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
