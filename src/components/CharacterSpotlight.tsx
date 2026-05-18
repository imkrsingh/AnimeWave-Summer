"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Zap, Shield, Swords, Heart, X, BookOpen, Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";

export default function CharacterSpotlight() {
  const [isLoreOpen, setIsLoreOpen] = useState(false);

  const stats = [
    { label: "Power", value: 95, icon: Zap, color: "bg-yellow-400 neon:bg-cyan-400" },
    { label: "Defense", value: 75, icon: Shield, color: "bg-blue-400 neon:bg-fuchsia-400" },
    { label: "Agility", value: 88, icon: Swords, color: "bg-pink-400 neon:bg-purple-400" },
    { label: "Spirit", value: 100, icon: Heart, color: "bg-green-400 neon:bg-emerald-400" },
  ];

  return (
    <section id="spotlight" className="py-24 bg-sky-100 dark:bg-slate-900 neon:bg-[#090014] relative overflow-hidden transition-colors duration-300 transform-gpu">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 neon:opacity-30 pointer-events-none transform-gpu" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, #475569 2px, transparent 2px)',
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative transform-gpu"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-yellow-400 to-orange-500 dark:from-pink-500 dark:to-orange-500 neon:from-cyan-500 neon:to-fuchsia-600 rounded-[3rem] opacity-40 dark:opacity-30 neon:opacity-50 blur-[40px] transform-gpu translate-z-0 pointer-events-none"></div>
            <div className="relative h-[600px] w-full rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-white/10 neon:border-cyan-400/40 shadow-xl transform-gpu">
              <img 
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=70&w=800&auto=format&fit=crop&fm=webp" 
                alt="Character Spotlight" 
                loading="lazy"
                className="w-full h-full object-cover transform-gpu hover:scale-105 transition-transform duration-700 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 neon:from-[#090014]/90 via-transparent to-transparent pointer-events-none"></div>
              
              <div className="absolute bottom-8 left-8">
                <h3 className="text-5xl font-black text-white mb-2">Aiko Tanaka</h3>
                <p className="text-yellow-400 dark:text-orange-300 neon:text-fuchsia-400 font-black uppercase tracking-widest">The Sunfire Blade</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="w-full lg:w-1/2 transform-gpu"
          >
            <div className="inline-block px-5 py-2 rounded-full bg-orange-100 dark:bg-orange-500/20 neon:bg-cyan-900/40 text-orange-600 dark:text-orange-400 neon:text-cyan-400 font-bold text-sm mb-6 border border-orange-200 dark:border-orange-500/30 neon:border-cyan-500/50 uppercase tracking-wider">
              Character Spotlight
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white neon:text-cyan-50 mb-6 leading-tight">
              Meet the hero of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-orange-400 dark:to-pink-500 neon:from-cyan-400 neon:to-fuchsia-500">Summer Skies</span>
            </h2>
            <p className="text-slate-700 dark:text-slate-300 neon:text-cyan-100/70 text-lg mb-8 leading-relaxed font-medium">
              Born from the ashes of a fallen star, Aiko wields the Sunfire Blade, a weapon capable of altering the fabric of reality itself. Her journey begins as she seeks to uncover the truth behind her origins and protect her world during the endless summer.
            </p>

            <div className="space-y-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2 text-slate-800 dark:text-white neon:text-cyan-100 font-bold">
                        <Icon className="w-5 h-5 text-slate-500 dark:text-slate-400 neon:text-cyan-500" />
                        {stat.label}
                      </div>
                      <span className="text-slate-900 dark:text-white neon:text-cyan-300 font-black">{stat.value}/100</span>
                    </div>
                    <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 neon:bg-[#1a0b2e] rounded-full overflow-hidden border border-slate-300 dark:border-slate-700 neon:border-fuchsia-900/50">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.value}%` }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                        className={`h-full ${stat.color} transform-gpu will-change-transform`}
                      ></motion.div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLoreOpen(true)}
              className="mt-10 px-8 py-4 bg-slate-900 dark:bg-white neon:bg-transparent neon:border-2 neon:border-fuchsia-500 text-white dark:text-slate-900 neon:text-fuchsia-400 rounded-full font-black shadow-lg hover:shadow-xl neon:hover:bg-fuchsia-500 neon:hover:text-[#090014] transition-all uppercase tracking-wider text-sm transform-gpu will-change-transform cursor-pointer"
            >
              Read Full Lore
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Premium Full Lore Framer Motion Modal Backdrop overlay */}
      <AnimatePresence>
        {isLoreOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-hidden"
          >
            {/* Modal Body container */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 neon:bg-[#0c001f] border-4 border-slate-200 dark:border-slate-800 neon:border-cyan-400/80 rounded-[2.5rem] overflow-hidden shadow-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto custom-scrollbar"
            >
              {/* Close Button X */}
              <button 
                onClick={() => setIsLoreOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 neon:bg-cyan-950/40 neon:hover:bg-cyan-400 neon:text-cyan-300 neon:hover:text-[#0c001f] text-slate-800 dark:text-white transition-all cursor-pointer z-50 active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Graphic Banner inside modal */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 border border-slate-350 dark:border-slate-850/50">
                <img 
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=70&w=800&auto=format&fit=crop" 
                  alt="Aiko Tanaka Banner" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 neon:from-[#090014] to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400 neon:text-cyan-300 bg-yellow-400/10 neon:bg-cyan-400/10 px-2.5 py-1 rounded-md border border-yellow-400/20 neon:border-cyan-400/30">LORE DATABASE</span>
                  <h4 className="text-2xl font-black text-white mt-1">Aiko Tanaka: Codex</h4>
                </div>
              </div>

              {/* Main Content of Lore */}
              <div className="space-y-6 text-slate-800 dark:text-slate-200 neon:text-cyan-50/90 font-medium">
                <div>
                  <h5 className="text-sm font-black text-orange-500 dark:text-pink-400 neon:text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" /> 1. Celestial Beginnings
                  </h5>
                  <p className="text-sm leading-relaxed mt-2 pl-5 border-l-2 border-slate-250 dark:border-slate-800 neon:border-cyan-500/30">
                    Aiko was discovered as an infant inside a glowing meteoroid that impacted the shore of Kyoto during the Summer Eclipse of 2008. Reared by the silent priests of the Solar Shrine, she exhibited high affinity to ambient heat and solar waves, allowing her to mold plasma from a young age.
                  </p>
                </div>

                <div>
                  <h5 className="text-sm font-black text-orange-500 dark:text-pink-400 neon:text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> 2. The Forging of Sunfire
                  </h5>
                  <p className="text-sm leading-relaxed mt-2 pl-5 border-l-2 border-slate-250 dark:border-slate-800 neon:border-cyan-500/30">
                    The Sunfire Blade was not created by mortal blacksmiths. Woven from solar wind particles and forged inside the earth's mantle, the weapon chose Aiko on her fourteenth birthday. It is capable of radiating thermal energy up to 6,000°C—equivalent to the photosphere of the Sun!
                  </p>
                </div>

                <div>
                  <h5 className="text-sm font-black text-orange-500 dark:text-pink-400 neon:text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Wand2 className="w-4 h-4" /> 3. Current Quest: Summer Eternal
                  </h5>
                  <p className="text-sm leading-relaxed mt-2 pl-5 border-l-2 border-slate-250 dark:border-slate-800 neon:border-cyan-500/30">
                    Aiko currently travels the ocean shorelines, containing spatial fractures created by the "Frozen Eclipse" sect. Her mission is to gather the scattered shards of the core solar reactor, ensuring that the beautiful summer sky remains warm and active for all eternity.
                  </p>
                </div>
              </div>

              {/* Close Button CTA */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setIsLoreOpen(false)}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 neon:bg-transparent neon:border neon:border-cyan-400 text-white dark:text-slate-900 neon:text-cyan-400 font-black rounded-xl text-xs uppercase tracking-wider transition-colors duration-300 cursor-pointer active:scale-95 shadow-md"
                >
                  Close Archive
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
