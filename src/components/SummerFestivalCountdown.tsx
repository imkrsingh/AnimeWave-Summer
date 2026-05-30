"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Calendar, MapPin, Ticket } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const target = new Date("2026-07-15T18:00:00");
  const now = new Date();
  const diff = Math.max(0, target.getTime() - now.getTime());

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function DigitBlock({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  const [prev, setPrev] = useState(display);
  const [current, setCurrent] = useState(display);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (display !== current) {
      setPrev(current);
      setCurrent(display);
      setFlip(true);
      const t = setTimeout(() => setFlip(false), 400);
      return () => clearTimeout(t);
    }
  }, [display, current]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-20 md:w-24 md:h-28 lg:w-28 lg:h-32">
        {/* Background card */}
        <div className="absolute inset-0 rounded-2xl bg-white dark:bg-slate-900 neon:bg-[#12002b] border-2 border-sky-100 dark:border-slate-800 neon:border-cyan-500/30 shadow-lg overflow-hidden">
          {/* Top half static */}
          <div className="absolute inset-x-0 top-0 h-1/2 flex items-end justify-center pb-0.5 bg-sky-50 dark:bg-slate-800/50 neon:bg-[#1a0b2e]/50 border-b border-sky-200/50 dark:border-slate-700/50 neon:border-cyan-500/20">
            <span className="font-display font-extrabold text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 neon:from-cyan-300 neon:to-cyan-500 leading-none select-none">
              {current}
            </span>
          </div>
          {/* Bottom half static */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 flex items-start justify-center pt-0.5">
            <span className="font-display font-extrabold text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-slate-700 to-slate-500 dark:from-slate-300 dark:to-slate-500 neon:from-cyan-500 neon:to-cyan-700 leading-none select-none">
              {current}
            </span>
          </div>
          {/* Flip animation overlay */}
          <AnimatePresence>
            {flip && (
              <motion.div
                key={current}
                initial={{ rotateX: -90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: 90, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-orange-500/10 to-pink-500/10 dark:from-pink-500/10 dark:to-orange-500/10 neon:from-cyan-500/10 neon:to-fuchsia-500/10 rounded-2xl"
                style={{ transformOrigin: "center" }}
              >
                <span className="font-display font-extrabold text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500 leading-none select-none">
                  {current}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/10 to-pink-500/10 dark:from-pink-500/10 dark:to-orange-500/10 neon:from-cyan-500/15 neon:to-fuchsia-500/15 blur-md -z-10 scale-110" />
      </div>
      <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 neon:text-cyan-300/60">
        {label}
      </span>
    </div>
  );
}

export default function SummerFestivalCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <section
      id="countdown"
      className="py-24 relative overflow-hidden bg-sky-50 dark:bg-slate-900 neon:bg-[#090014] transition-colors duration-300"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-pink-500/5 to-cyan-400/10 dark:from-pink-600/10 dark:via-orange-500/5 dark:to-blue-600/10 neon:from-fuchsia-600/15 neon:via-purple-600/10 neon:to-cyan-600/15 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-400/15 dark:bg-pink-600/10 neon:bg-fuchsia-600/20 rounded-full blur-[100px] pointer-events-none transform-gpu" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-pink-950/40 neon:bg-cyan-950/40 text-orange-600 dark:text-pink-400 neon:text-cyan-400 text-xs font-black uppercase tracking-widest mb-4 border border-orange-200 dark:border-pink-500/30 neon:border-cyan-500/30">
            <Flame className="w-4 h-4" /> Festival Countdown
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white neon:text-cyan-50 tracking-tight mb-3">
            Summer Beach{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500 text-shimmer">
              Festival 2026
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 neon:text-cyan-100/60 max-w-xl mx-auto font-medium">
            The biggest anime beach festival of the year. Live performances, screenings, and exclusive merch drops.
          </p>
        </motion.div>

        {/* Countdown digits */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-4 md:gap-8 mb-12"
        >
          <DigitBlock value={timeLeft.days} label="Days" />
          <span className="font-display font-extrabold text-3xl md:text-5xl text-orange-400 dark:text-pink-400 neon:text-cyan-400 mb-6 select-none">:</span>
          <DigitBlock value={timeLeft.hours} label="Hours" />
          <span className="font-display font-extrabold text-3xl md:text-5xl text-orange-400 dark:text-pink-400 neon:text-cyan-400 mb-6 select-none">:</span>
          <DigitBlock value={timeLeft.minutes} label="Minutes" />
          <span className="font-display font-extrabold text-3xl md:text-5xl text-orange-400 dark:text-pink-400 neon:text-cyan-400 mb-6 select-none">:</span>
          <DigitBlock value={timeLeft.seconds} label="Seconds" />
        </motion.div>

        {/* Event info cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          {[
            { icon: Calendar, text: "July 15, 2026" },
            { icon: MapPin, text: "Shonan Beach, Japan" },
            { icon: Ticket, text: "Free with Season Pass" },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 neon:bg-[#12002b] border border-sky-100 dark:border-slate-800 neon:border-fuchsia-900/40 shadow-sm text-sm font-bold text-slate-700 dark:text-slate-300 neon:text-cyan-100"
            >
              <Icon className="w-4 h-4 text-orange-500 dark:text-pink-400 neon:text-cyan-400 shrink-0" />
              {text}
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-pulse px-10 py-4 bg-gradient-to-r from-orange-500 to-pink-500 dark:from-pink-500 dark:to-orange-500 neon:from-cyan-500 neon:to-fuchsia-600 rounded-full font-black text-white text-sm uppercase tracking-widest shadow-lg shadow-orange-500/25 dark:shadow-pink-500/25 neon:shadow-cyan-500/30 flex items-center gap-2 cursor-pointer"
          >
            <Ticket className="w-4 h-4" />
            Reserve Your Spot
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
