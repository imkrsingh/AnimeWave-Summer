"use client";

import { motion } from "framer-motion";
import { Crown, Gift, ArrowRight, Check } from "lucide-react";

const PERKS = [
  "Early episode access",
  "Exclusive 4K wallpapers",
  "Beach festival VIP pass",
  "Zero ads for 30 days",
];

export default function SeasonPassPromo() {
  const handleScroll = () => {
    document.querySelector("footer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-5xl"
      >
        <div className="tilt-card relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 dark:from-pink-600 dark:via-orange-600 dark:to-fuchsia-800 neon:from-cyan-600 neon:via-fuchsia-600 neon:to-purple-800 shadow-2xl shadow-orange-500/20 dark:shadow-pink-500/25 neon:shadow-cyan-500/30">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: "24px 24px",
              }}
            />
          </div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-300/30 rounded-full blur-[80px]" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/20 rounded-full blur-[60px]" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-black uppercase tracking-widest mb-4">
                <Crown className="w-4 h-4" />
                Limited Summer Offer
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
                AnimeWave Season Pass
              </h2>
              <p className="text-white/85 font-medium max-w-md mb-6">
                Unlock the full summer experience — premieres, merch drops, and the July 15 beach festival livestream.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PERKS.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-center gap-2 text-white/90 text-sm font-bold"
                  >
                    <Check className="w-4 h-4 shrink-0 bg-white/20 rounded-full p-0.5" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>

            <div className="shrink-0 flex flex-col items-center md:items-end gap-4 p-6 rounded-3xl bg-white/15 backdrop-blur-md border border-white/25 text-center md:text-right">
              <Gift className="w-10 h-10 text-yellow-200" />
              <div>
                <p className="text-white/70 text-xs font-black uppercase tracking-widest">
                  Summer only
                </p>
                <p className="font-display text-5xl font-extrabold text-white leading-none">
                  FREE
                </p>
                <p className="text-white/70 text-sm font-medium mt-1">
                  with newsletter signup
                </p>
              </div>
              <button
                type="button"
                onClick={handleScroll}
                className="btn-pulse w-full md:w-auto px-8 py-4 bg-white text-orange-600 dark:text-pink-600 neon:text-fuchsia-700 rounded-full font-black uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:bg-yellow-50 transition-colors cursor-pointer shadow-lg"
              >
                Claim Pass <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
