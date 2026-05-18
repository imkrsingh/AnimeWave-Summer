"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Flame, Shield, Sun, Sparkles, MapPin, Users, Activity, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";

const CHRONICLES_DATA = [
  {
    id: 1,
    phase: "Milestone 1: Doraemon's Future Century",
    episodes: "Year 1979",
    theme: "Futuristic Gadgets & Childhood Nostalgia",
    icon: Compass,
    image: "https://cdn.myanimelist.net/images/anime/11/11059.jpg",
    description: "The iconic blue robotic cat from the 22nd century arrives in Nobita's life, unlocking the Anywhere Door, Bamboo Copter, and a magical 4D pocket that defined our early school mornings.",
    cast: "Doraemon, Nobita",
    vibe: "Anywhere Door, Dorayaki",
    location: "Tokyo Suburbs",
    shadow: "hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] neon:hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]",
    glowBorder: "border-sky-400 dark:border-sky-500 neon:border-cyan-400",
    glowText: "text-sky-550 dark:text-sky-400 neon:text-cyan-400"
  },
  {
    id: 2,
    phase: "Milestone 2: Pokémon Journey Beginnings",
    episodes: "Year 1997",
    theme: "Gotta Catch 'Em All Adventure",
    icon: Flame,
    image: "https://cdn.myanimelist.net/images/anime/11/53927.jpg",
    description: "Ash Ketchum sets out from Pallet Town with his stubborn partner Pikachu. A timeless journey of gym battles, unbreakable bonds, and the legendary dream to become a Pokémon Master.",
    cast: "Ash, Pikachu, Misty",
    vibe: "Pokéballs, Gym Badges",
    location: "Kanto Region",
    shadow: "hover:shadow-[0_0_25px_rgba(234,179,8,0.2)] neon:hover:shadow-[0_0_25px_rgba(251,146,60,0.3)]",
    glowBorder: "border-yellow-400 dark:border-orange-500 neon:border-amber-400",
    glowText: "text-yellow-500 dark:text-yellow-400 neon:text-amber-300"
  },
  {
    id: 3,
    phase: "Milestone 3: Shin Chan's Kasukabe Antics",
    episodes: "Year 1992",
    theme: "Hilarious Mischief & Slapstick Comedy",
    icon: Shield,
    image: "https://cdn.myanimelist.net/images/anime/3/26071.jpg",
    description: "The daily hilarious antics of 5-year-old Shinnosuke Nohara, Shiro, and the Kasukabe Defense Force, filling our childhood afternoons with absolute laughter and retro comedy.",
    cast: "Shin Chan, Misae, Shiro",
    vibe: "Mischief, Action Kamen",
    location: "Kasukabe Town",
    shadow: "hover:shadow-[0_0_25px_rgba(236,72,153,0.2)] neon:hover:shadow-[0_0_25px_rgba(244,63,94,0.3)]",
    glowBorder: "border-red-400 dark:border-red-500 neon:border-rose-500",
    glowText: "text-red-500 dark:text-red-455 neon:text-rose-455"
  },
  {
    id: 4,
    phase: "Milestone 4: Beyblade's Bit-Beast Arena",
    episodes: "Year 2001",
    theme: "High-Speed Spinning Tops & Spirit Beasts",
    icon: Sun,
    image: "https://cdn.myanimelist.net/images/anime/13/75429.jpg",
    description: "Tyson Granger and the Bladebreakers take on arenas worldwide, summoning Dragoon, Dranzer, and Driger with the ultimate iconic playground battle cry: Let it Rip!",
    cast: "Tyson, Kai, Ray, Max",
    vibe: "Spinning Tops, Bit-Beasts",
    location: "World Arena",
    shadow: "hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] neon:hover:shadow-[0_0_25px_rgba(192,132,252,0.3)]",
    glowBorder: "border-purple-400 dark:border-purple-500 neon:border-purple-500",
    glowText: "text-purple-550 dark:text-purple-400 neon:text-purple-400"
  }
];

export default function SummerChronicles() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? theme : "dark";

  const initialItems = CHRONICLES_DATA.slice(0, 2);
  const hiddenItems = CHRONICLES_DATA.slice(2);

  return (
    <section id="story" className="py-20 bg-sky-100 dark:bg-slate-950 neon:bg-[#090014] relative overflow-hidden transition-colors duration-300 transform-gpu z-10">
      
      {/* Decorative ambient background grid */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 neon:opacity-35 pointer-events-none transform-gpu" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, #64748b 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full bg-orange-400/10 dark:bg-pink-500/10 neon:bg-cyan-400/10 border border-orange-400/20 dark:border-pink-500/20 neon:border-cyan-400/30 text-orange-600 dark:text-pink-400 neon:text-cyan-300 font-black uppercase tracking-wider text-[10px] shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-500 neon:text-cyan-400" /> Legacy Chronicles
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white neon:text-cyan-50 leading-tight">
            Childhood <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500">Nostalgia Chronicles</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 neon:text-cyan-100/60 text-sm md:text-base mt-2 max-w-lg mx-auto font-medium">
            Explore the legendary milestones of childhood classics from our trading card archive that defined our generations.
          </p>
        </div>

        {/* Chronological Timeline Container */}
        <div className="relative max-w-4xl mx-auto pb-10">
          
          {/* Vertical central cord line - sleek and thin */}
          <div className="hidden md:block absolute left-1/2 top-2 bottom-12 w-[4px] bg-gradient-to-b from-sky-400 via-pink-500 dark:via-fuchsia-500 neon:via-cyan-400 to-orange-500 rounded-full transform -translate-x-1/2 z-10 pointer-events-none opacity-40 dark:opacity-25 neon:opacity-60 shadow-[0_0_10px_rgba(34,211,238,0.2)]"></div>

          {/* Timeline Nodes - Part 1: Initial visible items */}
          <div className="space-y-8 md:space-y-6">
            {initialItems.map((arc, index) => {
              const Icon = arc.icon;
              const isLeft = index % 2 === 0;

              return (
                <div key={arc.id} className="relative flex flex-col md:flex-row items-stretch z-10 group">
                  
                  {/* Central Node Junction Indicator - sleek and compact w-8 h-8 */}
                  <div className="hidden md:flex absolute left-1/2 top-10 w-8 h-8 rounded-full bg-slate-950 dark:bg-slate-900 neon:bg-[#060012] border-4 border-slate-350 dark:border-slate-800 neon:border-cyan-400 items-center justify-center transform -translate-x-1/2 -translate-y-1/2 shadow-md z-20 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-4 h-4 text-orange-500 dark:text-white neon:text-cyan-400" />
                  </div>

                  {/* LEFT ALIGNED ITEM */}
                  {isLeft ? (
                    <div className="w-full md:w-1/2 pr-0 md:mr-auto pl-6 md:pl-0 flex md:justify-end">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className={`w-full max-w-sm md:rounded-r-none md:border-r-4 ${arc.glowBorder} rounded-[2rem] bg-white/50 dark:bg-slate-900/40 neon:bg-[#12002b]/40 backdrop-blur-md border border-white dark:border-slate-855 neon:border-cyan-500/20 p-4 md:p-5 shadow-sm ${arc.shadow} transition-all duration-450 relative overflow-hidden`}
                      >
                        <div className="absolute right-4 bottom-4 opacity-[0.03] dark:opacity-[0.04] neon:opacity-[0.05] pointer-events-none group-hover:scale-105 transition-transform duration-500">
                          <Icon className="w-24 h-24 text-slate-900 dark:text-white neon:text-cyan-400" />
                        </div>

                        <div className="relative z-10 flex flex-col justify-between h-full">
                          <div>
                            <div className="flex items-center justify-between gap-3 mb-2.5">
                              <span className="px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-500/20 neon:bg-cyan-950/40 text-[8px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 neon:text-cyan-455 border border-orange-200 dark:border-orange-500/20 neon:border-cyan-400/30 w-fit">
                                {arc.episodes}
                              </span>
                              <span className={`text-[9px] font-black uppercase tracking-wider ${arc.glowText} flex items-center gap-1 opacity-90`}>
                                <Activity className="w-3 h-3 animate-pulse" /> Legendary Hall
                              </span>
                            </div>
                            
                            <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white neon:text-cyan-50 leading-snug mb-1">
                              {arc.phase}
                            </h3>
                            
                            <span className="text-[10px] font-black text-slate-500 dark:text-slate-455 neon:text-fuchsia-400/80 uppercase tracking-widest mb-3 block">
                              {arc.theme}
                            </span>
                            
                            <p className="text-xs md:text-sm text-slate-655 dark:text-slate-350 neon:text-cyan-100/70 leading-relaxed font-semibold mb-4">
                              {arc.description}
                            </p>
                          </div>

                          <div className="border-t border-slate-200/40 dark:border-slate-800/40 neon:border-cyan-500/10 pt-3 flex flex-wrap gap-1.5">
                            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 neon:bg-cyan-950/20 text-[9px] font-bold text-slate-600 dark:text-slate-400 neon:text-cyan-300 border border-transparent dark:border-slate-800 neon:border-cyan-500/10 flex items-center gap-1">
                              <Users className="w-3 h-3 text-slate-400 neon:text-cyan-500" /> {arc.cast}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 neon:bg-cyan-950/20 text-[9px] font-bold text-slate-600 dark:text-slate-400 neon:text-cyan-300 border border-transparent dark:border-slate-800 neon:border-cyan-500/10 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400 neon:text-cyan-500" /> {arc.location}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    <div className="hidden md:block w-1/2"></div>
                  )}

                  {/* RIGHT ALIGNED ITEM */}
                  {!isLeft ? (
                    <div className="w-full md:w-1/2 pl-8 md:pl-0 md:ml-auto flex md:justify-start">
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className={`w-full max-w-sm md:rounded-l-none md:border-l-4 ${arc.glowBorder} rounded-[2rem] bg-white/50 dark:bg-slate-900/40 neon:bg-[#12002b]/40 backdrop-blur-md border border-white dark:border-slate-855 neon:border-cyan-500/20 p-4 md:p-5 shadow-sm ${arc.shadow} transition-all duration-450 relative overflow-hidden`}
                      >
                        <div className="absolute right-4 bottom-4 opacity-[0.03] dark:opacity-[0.04] neon:opacity-[0.05] pointer-events-none group-hover:scale-105 transition-transform duration-500">
                          <Icon className="w-24 h-24 text-slate-900 dark:text-white neon:text-cyan-400" />
                        </div>

                        <div className="relative z-10 flex flex-col justify-between h-full">
                          <div>
                            <div className="flex items-center justify-between gap-3 mb-2.5">
                              <span className="px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-500/20 neon:bg-cyan-950/40 text-[8px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 neon:text-cyan-455 border border-orange-200 dark:border-orange-500/20 neon:border-cyan-400/30 w-fit">
                                {arc.episodes}
                              </span>
                              <span className={`text-[9px] font-black uppercase tracking-wider ${arc.glowText} flex items-center gap-1 opacity-90`}>
                                <Activity className="w-3 h-3 animate-pulse" /> Legendary Hall
                              </span>
                            </div>
                            
                            <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white neon:text-cyan-50 leading-snug mb-1">
                              {arc.phase}
                            </h3>
                            
                            <span className="text-[10px] font-black text-slate-500 dark:text-slate-455 neon:text-fuchsia-400/80 uppercase tracking-widest mb-3 block">
                              {arc.theme}
                            </span>
                            
                            <p className="text-xs md:text-sm text-slate-655 dark:text-slate-350 neon:text-cyan-100/70 leading-relaxed font-semibold mb-4">
                              {arc.description}
                            </p>
                          </div>

                          <div className="border-t border-slate-200/40 dark:border-slate-800/40 neon:border-cyan-500/10 pt-3 flex flex-wrap gap-1.5">
                            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 neon:bg-cyan-950/20 text-[9px] font-bold text-slate-600 dark:text-slate-400 neon:text-cyan-300 border border-transparent dark:border-slate-800 neon:border-cyan-500/10 flex items-center gap-1">
                              <Users className="w-3 h-3 text-slate-400 neon:text-cyan-500" /> {arc.cast}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 neon:bg-cyan-950/20 text-[9px] font-bold text-slate-600 dark:text-slate-400 neon:text-cyan-300 border border-transparent dark:border-slate-800 neon:border-cyan-500/10 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400 neon:text-cyan-500" /> {arc.location}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    <div className="hidden md:block w-1/2"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* DYNAMIC FADING RETRO SMOKY OVERLAY (Only visible when timeline is collapsed!) */}
          <AnimatePresence>
            {!isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-16 left-0 right-0 h-44 bg-gradient-to-t from-sky-100 via-sky-100/90 to-transparent dark:from-slate-950 dark:via-slate-950/90 neon:from-[#090014] neon:via-[#090014]/90 pointer-events-none z-20"
              />
            )}
          </AnimatePresence>

          {/* Part 2: Expandable hidden timeline nodes wrapped in clean heights auto-collapser */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="overflow-hidden space-y-8 md:space-y-6 mt-8 md:mt-6"
              >
                {hiddenItems.map((arc, index) => {
                  const actualIndex = index + 2; // Offset for hidden items
                  const Icon = arc.icon;
                  const isLeft = actualIndex % 2 === 0;

                  return (
                    <div key={arc.id} className="relative flex flex-col md:flex-row items-stretch z-10 group">
                      
                      {/* Central Junction */}
                      <div className="hidden md:flex absolute left-1/2 top-10 w-8 h-8 rounded-full bg-slate-950 dark:bg-slate-900 neon:bg-[#060012] border-4 border-slate-350 dark:border-slate-800 neon:border-cyan-400 items-center justify-center transform -translate-x-1/2 -translate-y-1/2 shadow-md z-20 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-4 h-4 text-orange-500 dark:text-white neon:text-cyan-400" />
                      </div>

                      {/* LEFT ALIGNED ITEM */}
                      {isLeft ? (
                        <div className="w-full md:w-1/2 pr-0 md:mr-auto pl-6 md:pl-0 flex md:justify-end">
                          <div className={`w-full max-w-sm md:rounded-r-none md:border-r-4 ${arc.glowBorder} rounded-[2rem] bg-white/50 dark:bg-slate-900/40 neon:bg-[#12002b]/40 backdrop-blur-md border border-white dark:border-slate-855 neon:border-cyan-500/20 p-4 md:p-5 shadow-sm ${arc.shadow} transition-all duration-450 relative overflow-hidden`}>
                            <div className="absolute right-4 bottom-4 opacity-[0.03] dark:opacity-[0.04] neon:opacity-[0.05] pointer-events-none group-hover:scale-105 transition-transform duration-500">
                              <Icon className="w-24 h-24 text-slate-900 dark:text-white neon:text-cyan-400" />
                            </div>

                            <div className="relative z-10 flex flex-col justify-between h-full">
                              <div>
                                <div className="flex items-center justify-between gap-3 mb-2.5">
                                  <span className="px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-500/20 neon:bg-cyan-950/40 text-[8px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 neon:text-cyan-455 border border-orange-200 dark:border-orange-500/20 neon:border-cyan-400/30 w-fit">
                                    {arc.episodes}
                                  </span>
                                  <span className={`text-[9px] font-black uppercase tracking-wider ${arc.glowText} flex items-center gap-1 opacity-90`}>
                                    <Activity className="w-3 h-3 animate-pulse" /> Legendary Hall
                                  </span>
                                </div>
                                
                                <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white neon:text-cyan-50 leading-snug mb-1">
                                  {arc.phase}
                                </h3>
                                
                                <span className="text-[10px] font-black text-slate-500 dark:text-slate-455 neon:text-fuchsia-400/80 uppercase tracking-widest mb-3 block">
                                  {arc.theme}
                                </span>
                                
                                <p className="text-xs md:text-sm text-slate-655 dark:text-slate-350 neon:text-cyan-100/70 leading-relaxed font-semibold mb-4">
                                  {arc.description}
                                </p>
                              </div>

                              <div className="border-t border-slate-200/40 dark:border-slate-800/40 neon:border-cyan-500/10 pt-3 flex flex-wrap gap-1.5">
                                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 neon:bg-cyan-950/20 text-[9px] font-bold text-slate-600 dark:text-slate-400 neon:text-cyan-300 border border-transparent dark:border-slate-800 neon:border-cyan-500/10 flex items-center gap-1">
                                  <Users className="w-3 h-3 text-slate-400 neon:text-cyan-500" /> {arc.cast}
                                </span>
                                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 neon:bg-cyan-950/20 text-[9px] font-bold text-slate-600 dark:text-slate-400 neon:text-cyan-300 border border-transparent dark:border-slate-800 neon:border-cyan-500/10 flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-slate-400 neon:text-cyan-500" /> {arc.location}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="hidden md:block w-1/2"></div>
                      )}

                      {/* RIGHT ALIGNED ITEM */}
                      {!isLeft ? (
                        <div className="w-full md:w-1/2 pl-8 md:pl-0 md:ml-auto flex md:justify-start">
                          <div className={`w-full max-w-sm md:rounded-l-none md:border-l-4 ${arc.glowBorder} rounded-[2rem] bg-white/50 dark:bg-slate-900/40 neon:bg-[#12002b]/40 backdrop-blur-md border border-white dark:border-slate-855 neon:border-cyan-500/20 p-4 md:p-5 shadow-sm ${arc.shadow} transition-all duration-450 relative overflow-hidden`}>
                            <div className="absolute right-4 bottom-4 opacity-[0.03] dark:opacity-[0.04] neon:opacity-[0.05] pointer-events-none group-hover:scale-105 transition-transform duration-500">
                              <Icon className="w-24 h-24 text-slate-900 dark:text-white neon:text-cyan-400" />
                            </div>

                            <div className="relative z-10 flex flex-col justify-between h-full">
                              <div>
                                <div className="flex items-center justify-between gap-3 mb-2.5">
                                  <span className="px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-500/20 neon:bg-cyan-950/40 text-[8px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 neon:text-cyan-455 border border-orange-200 dark:border-orange-500/20 neon:border-cyan-400/30 w-fit">
                                    {arc.episodes}
                                  </span>
                                  <span className={`text-[9px] font-black uppercase tracking-wider ${arc.glowText} flex items-center gap-1 opacity-90`}>
                                    <Activity className="w-3 h-3 animate-pulse" /> Legendary Hall
                                  </span>
                                </div>
                                
                                <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white neon:text-cyan-50 leading-snug mb-1">
                                  {arc.phase}
                                </h3>
                                
                                <span className="text-[10px] font-black text-slate-500 dark:text-slate-455 neon:text-fuchsia-400/80 uppercase tracking-widest mb-3 block">
                                  {arc.theme}
                                </span>
                                
                                <p className="text-xs md:text-sm text-slate-655 dark:text-slate-350 neon:text-cyan-100/70 leading-relaxed font-semibold mb-4">
                                  {arc.description}
                                </p>
                              </div>

                              <div className="border-t border-slate-200/40 dark:border-slate-800/40 neon:border-cyan-500/10 pt-3 flex flex-wrap gap-1.5">
                                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 neon:bg-cyan-950/20 text-[9px] font-bold text-slate-600 dark:text-slate-400 neon:text-cyan-300 border border-transparent dark:border-slate-800 neon:border-cyan-500/10 flex items-center gap-1">
                                  <Users className="w-3 h-3 text-slate-400 neon:text-cyan-500" /> {arc.cast}
                                </span>
                                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 neon:bg-cyan-950/20 text-[9px] font-bold text-slate-600 dark:text-slate-400 neon:text-cyan-300 border border-transparent dark:border-slate-800 neon:border-cyan-500/10 flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-slate-400 neon:text-cyan-500" /> {arc.location}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="hidden md:block w-1/2"></div>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* GORGEOUS HIGH-FIDELITY SHOW MORE / COLLAPSE INTERACTION ACTION DECK */}
          <div className="flex justify-center mt-12 relative z-30">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95, y: 0 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className={`px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer relative overflow-hidden group border ${
                currentTheme === "neon"
                  ? "bg-[#090014] border-2 border-cyan-400 text-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.45)] hover:bg-cyan-400/10"
                  : currentTheme === "light"
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-orange-400/20 shadow-[0_10px_25px_rgba(249,115,22,0.25)]"
                  : "bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white border-pink-500/20 shadow-[0_10px_25px_rgba(236,72,153,0.3)]"
              }`}
            >
              {/* Animated lightning backdrop sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              
              <span>{isExpanded ? "Collapse Chronology" : "Reveal Full Chronicles"}</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`p-1 rounded-full ${
                  currentTheme === "neon" ? "bg-cyan-400/20 text-cyan-400" : "bg-white/20 text-white"
                }`}
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </motion.div>
            </motion.button>
          </div>

        </div>

      </div>
    </section>
  );
}
