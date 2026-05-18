"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Swords, Heart } from "lucide-react";

export default function CharacterSpotlight() {
  const stats = [
    { label: "Power", value: 95, icon: Zap, color: "bg-yellow-400 neon:bg-cyan-400" },
    { label: "Defense", value: 75, icon: Shield, color: "bg-blue-400 neon:bg-fuchsia-400" },
    { label: "Agility", value: 88, icon: Swords, color: "bg-pink-400 neon:bg-purple-400" },
    { label: "Spirit", value: 100, icon: Heart, color: "bg-green-400 neon:bg-emerald-400" },
  ];

  return (
    <section className="py-24 bg-sky-100 dark:bg-slate-900 neon:bg-[#090014] relative overflow-hidden transition-colors duration-300 transform-gpu">
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
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2784&auto=format&fit=crop" 
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
              className="mt-10 px-8 py-4 bg-slate-900 dark:bg-white neon:bg-transparent neon:border-2 neon:border-fuchsia-500 text-white dark:text-slate-900 neon:text-fuchsia-400 rounded-full font-black shadow-lg hover:shadow-xl neon:hover:bg-fuchsia-500 neon:hover:text-[#090014] transition-all uppercase tracking-wider text-sm transform-gpu will-change-transform"
            >
              Read Full Lore
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
