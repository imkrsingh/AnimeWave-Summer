"use client";

import { motion } from "framer-motion";
import { Play, ChevronRight, Sun, Sparkles, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppTheme } from "@/hooks/useAppTheme";
import HeroFloatingBadges from "@/components/HeroFloatingBadges";

const Particle = ({ x, y, size, duration, delay, theme }: any) => {
  let bgClass = 'bg-yellow-400 opacity-60';
  if (theme === 'dark') bgClass = 'bg-white opacity-40';
  if (theme === 'neon') bgClass = 'bg-cyan-400 opacity-60 shadow-[0_0_10px_#22d3ee]';

  return (
    <motion.div
      className={`absolute rounded-full transform-gpu will-change-transform ${bgClass}`}
      style={{ width: size, height: size, left: x, top: y }}
      animate={{
        y: [0, -100, -200],
        opacity: [0, theme === 'dark' ? 0.4 : (theme === 'neon' ? 0.8 : 0.6), 0],
        scale: [0, 1.2, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
      }}
    />
  );
};

export default function HeroSection() {
  const [particles, setParticles] = useState<any[]>([]);
  const { currentTheme } = useAppTheme();

  useEffect(() => {
    // Reduced particle count from 40 to 20 for much better performance
    const generated = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${80 + Math.random() * 20}%`,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 5 + 4,
      delay: Math.random() * 3,
    }));
    setParticles(generated);
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-sky-100 dark:bg-slate-950 neon:bg-[#090014] transition-colors duration-300">
      {/* Background Image with Gradient Overlay - HW Accelerated */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden transform-gpu"
      >
        <div
          className="absolute inset-0 bg-cover bg-center hero-ken-burns transition-all duration-500"
          style={{ 
            backgroundImage: currentTheme === 'light'
              ? 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=70&w=1920&auto=format&fit=crop&fm=webp")' 
              : currentTheme === 'neon'
              ? 'url("https://images.unsplash.com/photo-1541562232579-512a21360020?q=70&w=1920&auto=format&fit=crop&fm=webp")'
              : 'url("https://images.unsplash.com/photo-1613376023733-0a73315d9b06?q=70&w=1920&auto=format&fit=crop&fm=webp")'
          }}
        />
        {/* Aurora mesh overlays */}
        <div className={`absolute -top-1/4 -left-1/4 w-[60%] h-[60%] rounded-full blur-[120px] transition-opacity duration-700 ${currentTheme === 'light' ? 'bg-orange-400/30 opacity-100' : 'opacity-0'}`} />
        <div className={`absolute top-1/3 -right-1/4 w-[50%] h-[50%] rounded-full blur-[100px] transition-opacity duration-700 ${currentTheme === 'light' ? 'bg-cyan-400/25 opacity-100' : 'opacity-0'}`} />
        <div className={`absolute -bottom-1/4 left-1/4 w-[55%] h-[55%] rounded-full blur-[110px] transition-opacity duration-700 ${currentTheme === 'dark' ? 'bg-pink-600/25 opacity-100' : 'opacity-0'}`} />
        <div className={`absolute top-0 right-1/4 w-[45%] h-[45%] rounded-full blur-[100px] transition-opacity duration-700 ${currentTheme === 'dark' ? 'bg-blue-600/20 opacity-100' : 'opacity-0'}`} />
        <div className={`absolute inset-0 transition-opacity duration-700 ${currentTheme === 'neon' ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute -top-20 left-1/4 w-[500px] h-[500px] bg-fuchsia-600/30 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/25 rounded-full blur-[90px]" />
        </div>
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] neon:opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Dark Mode Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-b from-blue-900/40 via-orange-900/60 to-slate-950 transition-opacity duration-500 transform-gpu ${currentTheme === 'dark' ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80 transition-opacity duration-500 transform-gpu ${currentTheme === 'dark' ? 'opacity-100' : 'opacity-0'}`}></div>
        
        {/* Neon Mode Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-b from-fuchsia-900/40 via-purple-900/60 to-[#090014] transition-opacity duration-500 transform-gpu ${currentTheme === 'neon' ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute inset-0 bg-gradient-to-r from-[#090014]/90 via-transparent to-[#090014]/90 transition-opacity duration-500 transform-gpu ${currentTheme === 'neon' ? 'opacity-100' : 'opacity-0'}`}></div>

        {/* Light Mode Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-b from-sky-400/30 via-yellow-200/40 to-sky-100 transition-opacity duration-500 transform-gpu ${currentTheme === 'light' ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute inset-0 bg-gradient-to-r from-sky-100/80 via-transparent to-sky-100/80 transition-opacity duration-500 transform-gpu ${currentTheme === 'light' ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>

      <HeroFloatingBadges />

      {/* Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transform-gpu">
        {particles.map((p) => (
          <Particle key={p.id} {...p} theme={currentTheme} />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto transform-gpu"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-4 px-6 py-2 rounded-full bg-white/50 dark:bg-white/10 neon:bg-fuchsia-900/40 backdrop-blur-md border border-sky-300/80 dark:border-white/20 neon:border-cyan-400/50 text-orange-600 dark:text-orange-300 neon:text-cyan-300 font-bold tracking-wider text-sm uppercase shadow-sm neon:shadow-[0_0_20px_rgba(34,211,238,0.35)] transform-gpu"
          >
            <Sun className="w-4 h-4 text-orange-500 neon:text-cyan-400" />
            The Ultimate Summer Season
          </motion.div>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-pink-500 to-orange-500 dark:from-sky-400 dark:via-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:via-fuchsia-500 neon:to-purple-500 text-shimmer mb-6 leading-[1.05] tracking-tight transform-gpu drop-shadow-sm">
            Anime Summer <br className="hidden md:block"/> Special 2026
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-700 dark:text-blue-100/90 neon:text-cyan-100/90 mb-8 font-medium dark:font-light max-w-2xl mx-auto transform-gpu">
            Dive into the hottest anime this summer. Catch the waves of breathtaking worlds, epic battles, and sunny slice-of-life stories.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {[
              { icon: Sparkles, text: "24+ Premieres" },
              { icon: Users, text: "2.4M Watching Live" },
              { icon: Sun, text: "July 15 Festival" },
            ].map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/10 neon:bg-fuchsia-900/30 backdrop-blur-sm border border-sky-200/80 dark:border-white/15 neon:border-cyan-500/30 text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 neon:text-cyan-200"
              >
                <Icon className="w-4 h-4 text-orange-500 dark:text-pink-400 neon:text-cyan-400" />
                {text}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScrollTo("#trending")}
              className="btn-pulse px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-500 dark:from-pink-500 dark:to-orange-500 neon:from-cyan-500 neon:to-fuchsia-600 rounded-full font-bold text-white shadow-lg shadow-orange-500/30 dark:shadow-pink-500/30 neon:shadow-cyan-500/40 flex items-center gap-2 transition-transform transform-gpu will-change-transform cursor-pointer"
            >
              Catch the Wave
              <ChevronRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScrollTo("#trailers")}
              className="px-8 py-4 bg-white/60 dark:bg-white/10 neon:bg-[#090014]/60 backdrop-blur-sm border border-sky-300 dark:border-white/30 neon:border-cyan-500/50 rounded-full font-bold text-blue-700 dark:text-white neon:text-cyan-300 flex items-center gap-2 transition-transform transform-gpu will-change-transform cursor-pointer"
            >
              <Play className="w-5 h-5 text-blue-600 dark:text-white neon:text-cyan-400" />
              Watch Trailer
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-blue-600/60 dark:text-white/50 neon:text-cyan-400/80 transform-gpu"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-xs uppercase tracking-widest font-bold">Scroll Down</span>
        <div className="w-[2px] h-10 bg-gradient-to-b from-blue-600/60 dark:from-white/50 neon:from-cyan-400 to-transparent"></div>
      </motion.div>
    </section>
  );
}
