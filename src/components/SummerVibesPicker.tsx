"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const VIBES = [
  { id: "chill", label: "Chill sunset", emoji: "🌇", message: "Perfect for romance & slice-of-life binges.", gradient: "from-orange-300 to-pink-400" },
  { id: "hype", label: "Full hype", emoji: "🔥", message: "Action, sports, and tournament arcs — let's go!", gradient: "from-red-500 to-orange-500" },
  { id: "mystery", label: "Mystery mood", emoji: "🌙", message: "Spirits, secrets, and lantern-lit Kyoto nights.", gradient: "from-violet-500 to-indigo-600" },
  { id: "neon", label: "Neon nights", emoji: "💠", message: "Cyberpunk pulses and synth-wave openings.", gradient: "from-cyan-400 to-fuchsia-500" },
];

const RECOMMENDATIONS: Record<string, string[]> = {
  chill: ["Summer Days with You", "Ocean Drifters", "Beach Volleyball Club"],
  hype: ["Neon Cyber Pulse", "Blade of the Fallen Sun", "Beach Volleyball Club"],
  mystery: ["Spirits of Kyoto Festival", "Blade of the Fallen Sun"],
  neon: ["Neon Cyber Pulse", "Neon Cyber Pulse", "Ocean Drifters"],
};

export default function SummerVibesPicker() {
  const [selected, setSelected] = useState<string>("chill");
  const vibe = VIBES.find((v) => v.id === selected) ?? VIBES[0];
  const picks = RECOMMENDATIONS[selected] ?? RECOMMENDATIONS.chill;

  return (
    <section
      id="vibes"
      className="py-20 relative overflow-hidden bg-sky-100/80 dark:bg-slate-900/50 neon:bg-[#0a0018] border-y border-sky-200/50 dark:border-slate-800/60 neon:border-cyan-500/15 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 text-orange-500 dark:text-pink-400 neon:text-cyan-400 font-black uppercase tracking-widest text-xs mb-3">
            <Sparkles className="w-4 h-4" /> Summer Vibes
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white neon:text-cyan-50 tracking-tight">
            What&apos;s your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500 neon:from-emerald-400 neon:to-cyan-400">
              mood today?
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {VIBES.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setSelected(v.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
                selected === v.id
                  ? `bg-gradient-to-r ${v.gradient} text-white shadow-lg scale-105`
                  : "bg-white/90 dark:bg-slate-900/90 neon:bg-[#12002b]/70 text-slate-700 dark:text-slate-300 neon:text-cyan-100/80 border border-sky-200 dark:border-slate-700 neon:border-fuchsia-900/40 hover:scale-[1.02]"
              }`}
            >
              <span className="text-xl">{v.emoji}</span>
              {v.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto text-center p-8 rounded-3xl bg-white/90 dark:bg-slate-900/80 neon:bg-[#12002b]/60 border border-sky-100 dark:border-slate-800 neon:border-fuchsia-900/40 shadow-xl"
          >
            <span className="text-6xl mb-4 block">{vibe.emoji}</span>
            <p className="text-lg font-medium text-slate-700 dark:text-slate-300 neon:text-cyan-100/80 mb-6">
              {vibe.message}
            </p>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 neon:text-cyan-300/50 mb-3">
              Recommended for you
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {picks.map((title, i) => (
                <span
                  key={`${title}-${i}`}
                  className="px-4 py-2 rounded-full bg-sky-50 dark:bg-slate-800 neon:bg-slate-900/80 text-sm font-bold text-orange-600 dark:text-pink-400 neon:text-cyan-300 border border-orange-200/50 dark:border-pink-500/30 neon:border-cyan-500/30"
                >
                  {title}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
