"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function TrailerSection() {
  return (
    <section className="py-24 bg-sky-50 dark:bg-slate-950 neon:bg-[#090014] relative overflow-hidden transition-colors duration-300 transform-gpu">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-200/30 dark:via-blue-900/10 neon:via-fuchsia-900/10 to-transparent pointer-events-none transition-colors duration-300 transform-gpu translate-z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="transform-gpu"
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white neon:text-cyan-50 mb-4">
              Summer <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 neon:from-fuchsia-400 neon:to-cyan-400">Trailers</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 neon:text-cyan-100/70 text-lg font-medium">Sneak peeks into the upcoming sunny masterpieces.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Trailer */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="group relative rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white dark:border-slate-800 neon:border-fuchsia-500/50 transform-gpu"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent z-10 pointer-events-none transform-gpu"></div>
            <img 
              src="https://images.unsplash.com/photo-1613376023733-0a73315d9b06?q=80&w=2940&auto=format&fit=crop" 
              alt="Main Trailer" 
              loading="lazy"
              className="w-full h-[400px] md:h-[500px] object-cover transform-gpu group-hover:scale-105 transition-transform duration-500 will-change-transform"
            />
            
            <div className="absolute inset-0 z-20 flex items-center justify-center transform-gpu">
              <button className="w-24 h-24 bg-white/40 dark:bg-white/20 neon:bg-[#12002b]/60 hover:bg-cyan-400 dark:hover:bg-cyan-500 neon:hover:bg-fuchsia-500 backdrop-blur-sm rounded-full flex items-center justify-center text-white neon:text-fuchsia-400 neon:hover:text-white transition-all duration-300 hover:scale-110 shadow-lg border-2 border-white/50 dark:border-white/30 neon:border-fuchsia-400 group-hover:border-transparent transform-gpu will-change-transform">
                <Play className="w-10 h-10 ml-2" />
              </button>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform-gpu">
              <div className="inline-block px-4 py-1.5 bg-cyan-500/80 dark:bg-cyan-500/20 neon:bg-fuchsia-500/30 text-white dark:text-cyan-400 neon:text-fuchsia-300 text-xs font-black uppercase rounded-lg mb-3 border border-cyan-400 dark:border-cyan-500/30 neon:border-fuchsia-500/50 backdrop-blur-sm shadow-sm">
                Official Trailer
              </div>
              <h3 className="text-3xl font-black text-white">Echoes of Eternity - Season 1</h3>
            </div>
          </motion.div>

          {/* Side Trailers */}
          <div className="flex flex-col gap-8">
            {[1, 2].map((item, index) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="group relative rounded-[2rem] overflow-hidden h-[184px] md:h-[234px] border-4 border-white dark:border-slate-800 neon:border-cyan-500/40 flex shadow-lg transform-gpu"
              >
                <div className="w-1/2 relative overflow-hidden transform-gpu">
                  <div className="absolute inset-0 bg-sky-900/20 dark:bg-slate-900/40 neon:bg-[#090014]/60 group-hover:bg-transparent transition-colors duration-300 z-10 pointer-events-none transform-gpu"></div>
                  <img 
                    src={index === 0 ? "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=2574&auto=format&fit=crop" : "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=2874&auto=format&fit=crop"} 
                    alt={`Trailer ${item}`} 
                    loading="lazy"
                    className="w-full h-full object-cover transform-gpu group-hover:scale-105 transition-transform duration-500 will-change-transform"
                  />
                  <div className="absolute inset-0 z-20 flex items-center justify-center transform-gpu">
                    <button className="w-14 h-14 bg-white/40 dark:bg-white/20 neon:bg-[#12002b]/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white neon:text-cyan-400 neon:hover:text-[#090014] transition-all hover:bg-cyan-400 dark:hover:bg-cyan-500 neon:hover:bg-cyan-400 border-2 border-white/50 dark:border-white/30 neon:border-cyan-400 group-hover:scale-110 group-hover:border-transparent shadow-sm transform-gpu will-change-transform">
                      <Play className="w-6 h-6 ml-1.5" />
                    </button>
                  </div>
                </div>
                
                <div className="w-1/2 bg-sky-100 dark:bg-slate-900 neon:bg-[#12002b] p-6 flex flex-col justify-center transition-colors duration-300">
                  <p className="text-cyan-600 dark:text-cyan-400 neon:text-cyan-400 text-xs font-black uppercase mb-2">Teaser</p>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white neon:text-cyan-50 mb-2 leading-tight">
                    {index === 0 ? "Neon Cyber Pulse" : "Blade of the Fallen Sun"}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 neon:text-cyan-100/70 text-sm line-clamp-2 font-medium">
                    {index === 0 ? "Enter the digital underworld this July." : "A legend reborn in blood and steel during the festival."}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
