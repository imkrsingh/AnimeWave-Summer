"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Yuki_M",
    avatar: "🌸",
    show: "Summer Days with You",
    rating: 5,
    text: "The beach episode made me cry. Pure summer magic — best romance of the season!",
    color: "from-orange-400 to-pink-500",
  },
  {
    id: 2,
    name: "CyberOtaku99",
    avatar: "⚡",
    show: "Neon Cyber Pulse",
    rating: 5,
    text: "Episode 5 fight scene is INSANE. Studio went all out on the sakuga this week.",
    color: "from-fuchsia-500 to-cyan-500",
  },
  {
    id: 3,
    name: "SamuraiSoul",
    avatar: "🗡️",
    show: "Blade of the Fallen Sun",
    rating: 4,
    text: "Historical vibes + summer heat = chef's kiss. Can't wait for the festival arc.",
    color: "from-amber-500 to-red-500",
  },
  {
    id: 4,
    name: "SpiritWalker",
    avatar: "👻",
    show: "Spirits of Kyoto Festival",
    rating: 5,
    text: "The lantern scene at night… absolutely stunning. Wallpaper material!",
    color: "from-violet-500 to-indigo-500",
  },
];

export default function FanHypeWall() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % REVIEWS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const review = REVIEWS[index];

  return (
    <section className="py-20 relative overflow-hidden bg-sky-100/80 dark:bg-slate-900/50 neon:bg-[#0a0018] border-y border-sky-200/50 dark:border-slate-800/60 neon:border-cyan-500/15 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3 text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 text-orange-500 dark:text-pink-400 neon:text-cyan-400 font-black uppercase tracking-widest text-xs mb-3">
              <Quote className="w-4 h-4" /> Fan Hype Wall
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white neon:text-cyan-50 tracking-tight mb-3">
              What the community is{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 neon:from-cyan-400 neon:to-fuchsia-500">
                saying
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 neon:text-cyan-100/60 font-medium">
              Real reactions from fans watching this summer&apos;s lineup.
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-2 mt-6">
              <button
                type="button"
                onClick={() => setIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length)}
                aria-label="Previous review"
                className="p-2.5 rounded-full border border-sky-200 dark:border-slate-700 neon:border-cyan-500/40 hover:bg-white dark:hover:bg-slate-800 neon:hover:bg-cyan-950/40 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-white neon:text-cyan-300" />
              </button>
              <div className="flex gap-1.5">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to review ${i + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      i === index
                        ? "w-8 bg-orange-500 dark:bg-pink-500 neon:bg-cyan-400"
                        : "w-2 bg-slate-300 dark:bg-slate-600 neon:bg-cyan-900"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setIndex((i) => (i + 1) % REVIEWS.length)}
                aria-label="Next review"
                className="p-2.5 rounded-full border border-sky-200 dark:border-slate-700 neon:border-cyan-500/40 hover:bg-white dark:hover:bg-slate-800 neon:hover:bg-cyan-950/40 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 text-slate-700 dark:text-white neon:text-cyan-300" />
              </button>
            </div>
          </motion.div>

          <div className="lg:w-2/3 w-full max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 24, rotateX: -8 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -24, rotateX: 8 }}
                transition={{ duration: 0.4 }}
                className="relative p-8 md:p-10 rounded-[2rem] bg-white/80 dark:bg-slate-900/80 neon:bg-[#12002b]/70 backdrop-blur-xl border-2 border-white dark:border-slate-800 neon:border-cyan-500/30 shadow-xl overflow-hidden"
              >
                <div
                  className={`absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[60px] bg-gradient-to-br ${review.color} opacity-30 pointer-events-none`}
                />
                <Quote className="absolute top-6 right-8 w-12 h-12 text-orange-200 dark:text-pink-900/50 neon:text-cyan-900/60" />

                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <span className="text-4xl w-14 h-14 flex items-center justify-center rounded-2xl bg-sky-50 dark:bg-slate-800 neon:bg-[#090014] border border-sky-100 dark:border-slate-700 neon:border-cyan-500/30 shadow-inner">
                    {review.avatar}
                  </span>
                  <div>
                    <p className="font-black text-slate-900 dark:text-white neon:text-cyan-50">
                      @{review.name}
                    </p>
                    <p className="text-sm text-orange-500 dark:text-pink-400 neon:text-fuchsia-400 font-bold">
                      watching {review.show}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-500 dark:text-yellow-400 neon:text-cyan-400 fill-yellow-500 dark:fill-yellow-400 neon:fill-cyan-400"
                      />
                    ))}
                  </div>
                </div>

                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 neon:text-cyan-100/90 font-medium leading-relaxed relative z-10">
                  &ldquo;{review.text}&rdquo;
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
