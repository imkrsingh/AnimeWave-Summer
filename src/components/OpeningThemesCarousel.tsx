"use client";

import { motion } from "framer-motion";
import { Music2, Play, Disc3 } from "lucide-react";

const OPENINGS = [
  { title: "Golden Hour Sky", show: "Summer Days with You", artist: "Aoi & The Tides", duration: "1:32", vibe: "Chill pop" },
  { title: "Neon Overdrive", show: "Neon Cyber Pulse", artist: "SYNTH//WAVE", duration: "1:28", vibe: "Cyber rock" },
  { title: "Blade at Dusk", show: "Blade of the Fallen Sun", artist: "Kenshiro Ensemble", duration: "1:45", vibe: "Epic orchestral" },
  { title: "Lantern Waltz", show: "Spirits of Kyoto", artist: "Miko Strings", duration: "1:38", vibe: "Traditional fusion" },
  { title: "Spike Serve!", show: "Beach Volleyball Club", artist: "Team Sunblock", duration: "1:22", vibe: "Sports hype" },
  { title: "Wave Rider", show: "Ocean Drifters", artist: "Coastal Kids", duration: "1:30", vibe: "Surf indie" },
];

export default function OpeningThemesCarousel() {
  const duplicated = [...OPENINGS, ...OPENINGS];

  return (
    <section
      id="openings"
      className="py-20 relative overflow-hidden bg-white dark:bg-slate-950 neon:bg-[#090014] border-y border-sky-200/60 dark:border-slate-800/60 neon:border-cyan-500/15 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 text-orange-500 dark:text-pink-400 neon:text-cyan-400 font-black uppercase tracking-widest text-xs mb-3">
            <Music2 className="w-4 h-4" /> Opening Themes
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white neon:text-cyan-50 tracking-tight">
            Summer{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 neon:from-purple-400 neon:to-cyan-400">
              OP soundtrack
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 neon:text-cyan-100/60 mt-2 font-medium">
            The songs everyone&apos;s looping this season.
          </p>
        </motion.div>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-slate-950 neon:from-[#090014] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-slate-950 neon:from-[#090014] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-5 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {duplicated.map((op, i) => (
            <div
              key={`${op.title}-${i}`}
              className="shrink-0 w-[280px] md:w-[300px] group p-5 rounded-2xl bg-sky-50/90 dark:bg-slate-900/80 neon:bg-[#12002b]/70 border border-sky-100 dark:border-slate-800 neon:border-fuchsia-900/40 hover:border-orange-300 dark:hover:border-pink-500/40 neon:hover:border-cyan-500/50 transition-all duration-300 card-glow"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 dark:from-pink-500 dark:to-violet-600 neon:from-cyan-500 neon:to-fuchsia-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <Disc3 className="w-6 h-6 text-white animate-[spin_8s_linear_infinite]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 neon:text-cyan-300/50 px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 neon:bg-slate-900/80">
                  {op.duration}
                </span>
              </div>
              <h3 className="font-display font-extrabold text-slate-900 dark:text-white neon:text-cyan-50 truncate">
                {op.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 neon:text-cyan-200/60 font-medium truncate mt-0.5">
                {op.show}
              </p>
              <p className="text-xs text-orange-600 dark:text-pink-400 neon:text-fuchsia-400 font-bold mt-2">
                {op.artist} · {op.vibe}
              </p>
              <button
                type="button"
                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 dark:bg-white neon:bg-gradient-to-r neon:from-cyan-500 neon:to-fuchsia-600 text-white dark:text-slate-900 neon:text-white text-xs font-black uppercase tracking-wider opacity-90 group-hover:opacity-100 transition-opacity"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Preview
              </button>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
