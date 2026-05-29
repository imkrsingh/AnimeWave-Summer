"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Sun, Moon, Zap, Waves, Menu, X } from "lucide-react";
import { useAppTheme } from "@/hooks/useAppTheme";

// Primary items always visible in the navbar
const PRIMARY_NAV = [
  { label: "Trending", href: "#trending" },
  { label: "Tonight", href: "#tonight" },
  { label: "Calendar", href: "#calendar" },
  { label: "Watchlist", href: "#watchlist" },
  { label: "Moments", href: "#moments" },
];

const ALL_NAV = [...PRIMARY_NAV];

export default function FloatingNavbar() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentTheme, setTheme } = useAppTheme();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of ALL_NAV) {
        const el = document.querySelector(item.href);
        if (el) {
          const top = (el as HTMLElement).offsetTop;
          const height = (el as HTMLElement).offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.href);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    if (currentTheme === "light") setTheme("dark");
    else if (currentTheme === "dark") setTheme("neon");
    else setTheme("light");
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 dark:from-pink-500 dark:via-orange-400 dark:to-yellow-300 neon:from-cyan-400 neon:via-fuchsia-500 neon:to-purple-500 z-[999] origin-left transform-gpu"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Floating Navbar */}
      <header className="fixed top-5 left-0 right-0 z-50 px-4 flex items-center justify-center transform-gpu">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-4xl bg-white/60 dark:bg-slate-950/60 neon:bg-[#090014]/60 backdrop-blur-xl border border-white/30 dark:border-slate-700/80 neon:border-cyan-500/40 rounded-full py-2.5 px-5 flex items-center justify-between gap-3 shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.35)] neon:shadow-[0_0_25px_rgba(34,211,238,0.2)] transform-gpu"
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 cursor-pointer group shrink-0">
            <Waves className="w-5 h-5 text-orange-500 dark:text-pink-400 neon:text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-display font-extrabold text-base tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 neon:from-cyan-400 neon:to-fuchsia-400 whitespace-nowrap">
              AnimeWave<span className="text-orange-500 dark:text-pink-400 neon:text-cyan-300 text-xs font-black align-super">.</span>
            </span>
          </a>

          {/* Desktop Primary Nav */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {PRIMARY_NAV.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className={`relative px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "text-slate-950 dark:text-white neon:text-cyan-300"
                      : "text-slate-600 dark:text-slate-400 neon:text-cyan-400/60 hover:text-slate-950 dark:hover:text-white neon:hover:text-cyan-300"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeTabOutline"
                      className="absolute inset-0 bg-slate-200/60 dark:bg-slate-800/60 neon:bg-cyan-950/30 rounded-full border border-slate-300/50 dark:border-slate-700/50 neon:border-cyan-500/30 -z-10 transform-gpu"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}

          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-900 neon:bg-cyan-950/20 text-slate-800 dark:text-slate-200 neon:text-cyan-400 border border-slate-200/60 dark:border-slate-800 neon:border-cyan-500/30 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
              title="Cycle Theme"
            >
              {currentTheme === "light" ? (
                <Sun className="w-4 h-4 text-orange-500 animate-spin [animation-duration:15s]" />
              ) : currentTheme === "dark" ? (
                <Moon className="w-4 h-4 text-pink-400" />
              ) : (
                <Zap className="w-4 h-4 text-cyan-400 neon:animate-pulse" />
              )}
              <span className="hidden lg:inline text-[9px] font-black uppercase tracking-widest leading-none">
                {currentTheme}
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 neon:hover:bg-cyan-950/20 text-slate-800 dark:text-white neon:text-cyan-400 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-4 right-4 bg-white/95 dark:bg-slate-950/95 neon:bg-[#090014]/95 backdrop-blur-lg border border-slate-200 dark:border-slate-800 neon:border-cyan-500/40 p-4 rounded-3xl shadow-xl grid grid-cols-2 gap-2 md:hidden z-40 transform-gpu"
            >
              {ALL_NAV.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className={`px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-colors text-center ${
                      isActive
                        ? "bg-slate-100 dark:bg-slate-900 neon:bg-cyan-950/30 text-orange-500 dark:text-pink-400 neon:text-cyan-400 border border-slate-200 dark:border-slate-800/80 neon:border-cyan-500/30"
                        : "text-slate-700 dark:text-slate-400 neon:text-cyan-400/60 hover:bg-slate-50 dark:hover:bg-slate-900/40"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
