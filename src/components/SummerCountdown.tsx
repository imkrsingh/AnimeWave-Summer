"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function SummerCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const { currentTheme } = useAppTheme();

  useEffect(() => {
    const targetDate = new Date("2026-07-15T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section id="event" className="py-24 bg-sky-200 dark:bg-slate-950 neon:bg-[#090014] relative overflow-hidden flex items-center justify-center transition-colors duration-300 transform-gpu">
      {/* Animated Gradient Background - Optimized */}
      <div className="absolute inset-0 z-0 transition-opacity duration-500 transform-gpu translate-z-0">
        <div className={`absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2946&auto=format&fit=crop')] bg-cover bg-center transition-opacity duration-500 transform-gpu ${currentTheme === 'light' ? 'opacity-30' : 'opacity-0'}`}></div>
        <div className={`absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center transition-opacity duration-500 transform-gpu ${currentTheme === 'dark' || currentTheme === 'neon' ? 'opacity-20' : 'opacity-0'}`}></div>
        
        <div className={`absolute inset-0 bg-gradient-to-b from-sky-200/80 via-yellow-100/60 to-sky-200/90 transition-opacity duration-500 transform-gpu ${currentTheme === 'light' ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/80 to-slate-950 transition-opacity duration-500 transform-gpu ${currentTheme === 'dark' ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute inset-0 bg-gradient-to-b from-[#090014] via-[#12002b]/80 to-[#090014] transition-opacity duration-500 transform-gpu ${currentTheme === 'neon' ? 'opacity-100' : 'opacity-0'}`}></div>
        
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-tr from-yellow-400/20 to-sky-400/20 dark:from-pink-600/10 dark:to-cyan-500/10 neon:from-fuchsia-600/20 neon:to-cyan-500/20 blur-[60px] pointer-events-none transform-gpu translate-z-0"
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto backdrop-blur-md bg-white/40 dark:bg-slate-900/40 neon:bg-[#12002b]/40 p-8 md:p-12 rounded-[3rem] border border-white/50 dark:border-white/10 neon:border-cyan-500/30 shadow-lg transform-gpu"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-orange-400/20 dark:bg-pink-500/20 neon:bg-cyan-500/20 rounded-full text-orange-600 dark:text-pink-400 neon:text-cyan-400">
              <Clock className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white neon:text-cyan-50 mb-4">
            The Event Begins In
          </h2>
          <p className="text-slate-700 dark:text-slate-300 neon:text-cyan-100/70 text-lg mb-10 max-w-2xl mx-auto font-medium">
            Get ready for the biggest anime beach festival of 2026. Global premieres, exclusive reveals, and live summer concerts.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {timeBlocks.map((block, i) => (
              <motion.div 
                key={block.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex flex-col items-center transform-gpu"
              >
                <div className="w-20 h-24 md:w-32 md:h-36 bg-white/70 dark:bg-slate-800/80 neon:bg-[#090014]/80 border border-white dark:border-slate-700 neon:border-fuchsia-500/50 rounded-[2rem] flex items-center justify-center mb-4 shadow-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/50 dark:from-white/5 neon:from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none transform-gpu"></div>
                  <span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-yellow-500 dark:from-white dark:to-slate-400 neon:from-cyan-400 neon:to-blue-500">
                    {block.value.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="text-orange-600 dark:text-pink-400 neon:text-fuchsia-400 font-black uppercase tracking-widest text-xs md:text-sm">
                  {block.label}
                </span>
              </motion.div>
            ))}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => document.querySelector("#schedule")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-12 px-10 py-5 bg-gradient-to-r from-cyan-400 to-blue-500 dark:from-cyan-500 dark:to-blue-500 neon:from-fuchsia-500 neon:to-purple-600 rounded-full font-black text-white shadow-md hover:shadow-lg transition-transform uppercase tracking-wider text-sm transform-gpu will-change-transform cursor-pointer"
          >
            View Broadcast Schedule
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
