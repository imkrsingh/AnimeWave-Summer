"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Sun, Moon, Zap, Waves, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";

const NAV_ITEMS = [
  { label: "Trending", href: "#trending" },
  { label: "Archive", href: "#archive" },
  { label: "Spotlight", href: "#spotlight" },
  { label: "Radio", href: "#radio" },
  { label: "Wallpapers", href: "#wallpapers" }
];

export default function FloatingNavbar() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // Track scroll progress for the top thin indicator
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      // Detect active section dynamically
      for (const item of NAV_ITEMS) {
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
    handleScroll(); // Trigger initially

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme || "dark";

  const toggleTheme = () => {
    if (currentTheme === "light") setTheme("dark");
    else if (currentTheme === "dark") setTheme("neon");
    else setTheme("light");
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* 1. Thin Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 dark:from-pink-500 dark:via-orange-400 dark:to-yellow-300 neon:from-cyan-400 neon:via-fuchsia-500 neon:to-purple-500 z-[999] origin-left transform-gpu"
        style={{ scaleX: scrollYProgress }}
      />

      {/* 2. Floating Navbar Frame */}
      <header className="fixed top-5 left-0 right-0 z-50 px-4 flex items-center justify-center transform-gpu">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-5xl bg-white/40 dark:bg-slate-950/40 neon:bg-[#090014]/40 backdrop-blur-md border border-white/20 dark:border-slate-800/80 neon:border-cyan-500/30 rounded-full py-2.5 px-6 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] neon:shadow-[0_0_15px_rgba(34,211,238,0.15)] transform-gpu"
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 cursor-pointer group">
            <Waves className="w-6 h-6 text-orange-500 dark:text-pink-400 neon:text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-black text-lg md:text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 neon:from-cyan-400 neon:to-fuchsia-400">
              AnimeWave<span className="text-orange-500 dark:text-pink-400 neon:text-cyan-300 text-sm font-black align-super">.</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className={`relative px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "text-slate-950 dark:text-white neon:text-cyan-300"
                      : "text-slate-700 dark:text-slate-400 neon:text-cyan-400/60 hover:text-slate-950 dark:hover:text-white neon:hover:text-cyan-300"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeTabOutline"
                      className="absolute inset-0 bg-slate-200/50 dark:bg-slate-800/50 neon:bg-cyan-950/30 rounded-full border border-slate-350 dark:border-slate-700/50 neon:border-cyan-500/30 -z-10 transform-gpu"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Controls Right */}
          <div className="flex items-center gap-3">
            {/* Multi-Theme Cycle Selector Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 neon:bg-cyan-950/20 text-slate-800 dark:text-slate-200 neon:text-cyan-400 border border-slate-300/40 dark:border-slate-800 neon:border-cyan-500/30 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
              title="Cycle Theme (Light -> Dark -> Neon)"
            >
              {currentTheme === "light" ? (
                <Sun className="w-4 h-4 text-orange-500 animate-spin [animation-duration:15s]" />
              ) : currentTheme === "dark" ? (
                <Moon className="w-4 h-4 text-pink-400" />
              ) : (
                <Zap className="w-4 h-4 text-cyan-400 neon:animate-pulse" />
              )}
              <span className="hidden sm:inline text-[9px] font-black uppercase tracking-widest leading-none">
                {currentTheme}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 neon:hover:bg-cyan-950/20 text-slate-800 dark:text-white neon:text-cyan-400 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-4 right-4 bg-white/95 dark:bg-slate-950/95 neon:bg-[#090014]/95 backdrop-blur-lg border border-slate-200 dark:border-slate-800 neon:border-cyan-500/40 p-5 rounded-3xl shadow-xl flex flex-col gap-3 md:hidden z-40 transform-gpu"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className={`px-4 py-3 rounded-2xl text-sm font-black uppercase tracking-wider transition-colors ${
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
