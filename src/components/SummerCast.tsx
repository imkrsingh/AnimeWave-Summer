"use client";

import { motion } from "framer-motion";
import { Mic, Award, Sparkles, Star } from "lucide-react";

const CAST_DATA = [
  {
    id: 1,
    character: "Aiko Tanaka",
    show: "Blade of the Fallen Sun",
    seiyuu: "Rie Takahashi",
    seiyuuJapanese: "高橋 李依",
    role: "Lead Protagonist",
    famousRoles: "Megumin (Konosuba), Emilia (Re:Zero)",
    studio: "Ufotable",
    charImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=70&w=300&fit=crop", // Spotlight char image
    color: "from-orange-500/20 to-red-500/20 text-orange-500 border-orange-500/30"
  },
  {
    id: 2,
    character: "Kai (Hacker 0x1)",
    show: "Neon Cyber Pulse",
    seiyuu: "Yuki Kaji",
    seiyuuJapanese: "梶 裕貴",
    role: "Lead Deuteragonist",
    famousRoles: "Eren Yeager (Attack on Titan), Todoroki (My Hero Academia)",
    studio: "Studio Trigger",
    charImage: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=70&w=300&fit=crop", // Cyber visual
    color: "from-fuchsia-500/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30"
  },
  {
    id: 3,
    character: "Rei Tanaka",
    show: "Spirits of Kyoto Festival",
    seiyuu: "Saori Hayami",
    seiyuuJapanese: "早見 沙織",
    role: "Supporting Protagonist",
    famousRoles: "Yor Forger (Spy x Family), Shinobu Kocho (Demon Slayer)",
    studio: "Kyoto Animation",
    charImage: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=70&w=300&fit=crop", // Kyoto visual
    color: "from-green-500/20 to-emerald-500/20 text-emerald-400 border-emerald-500/30"
  },
  {
    id: 4,
    character: "Haru & Yuki",
    show: "Summer Days with You",
    seiyuu: "Natsuki Hanae",
    seiyuuJapanese: "花江 夏樹",
    role: "Dual Leads",
    famousRoles: "Tanjiro Kamado (Demon Slayer), Ken Kaneki (Tokyo Ghoul)",
    studio: "Wit Studio",
    charImage: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=70&w=300&fit=crop", // Beach visual
    color: "from-blue-500/20 to-cyan-500/20 text-blue-550 border-blue-550/30"
  }
];

export default function SummerCast() {
  return (
    <section id="cast" className="py-24 bg-sky-100 dark:bg-slate-950 neon:bg-[#090014] relative overflow-hidden transition-colors duration-300 transform-gpu">
      {/* Soft passive background visual glows */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-orange-400/10 dark:bg-pink-500/5 neon:bg-fuchsia-500/10 rounded-full blur-[80px] pointer-events-none transform-gpu translate-z-0"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-blue-400/10 dark:bg-cyan-500/5 neon:bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none transform-gpu translate-z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-orange-400/10 dark:bg-pink-500/10 neon:bg-cyan-400/10 border border-orange-400/20 dark:border-pink-500/20 neon:border-cyan-400/30 text-orange-600 dark:text-pink-400 neon:text-cyan-300 font-bold uppercase tracking-wider text-xs shadow-sm"
          >
            <Mic className="w-4 h-4 text-orange-500 neon:text-cyan-400" /> Voice Cast & Crew
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white neon:text-cyan-50 leading-tight">
            Official <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500">Voice Cast & Studios</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-350 neon:text-cyan-100/70 text-lg mt-3 max-w-xl mx-auto font-medium">
            Meet the legendary Japanese voice actors (Seiyuu) and award-winning animation studios behind this summer's hottest titles.
          </p>
        </div>

        {/* Cast & Crew Static Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {CAST_DATA.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="group relative rounded-[2.5rem] bg-white/60 dark:bg-slate-900/40 neon:bg-[#12002b]/40 backdrop-blur-md border border-white dark:border-slate-850 neon:border-cyan-500/20 p-6 shadow-md overflow-hidden flex flex-col sm:flex-row gap-6 transition-all duration-300 hover:shadow-lg"
            >
              {/* Left Column: Character Thumbnail Circle */}
              <div className="flex-shrink-0 flex items-center justify-center sm:justify-start">
                <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 neon:border-cyan-400/50 shadow-inner">
                  <img
                    src={member.charImage}
                    alt={member.character}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-sky-900/10 dark:bg-slate-950/20"></div>
                </div>
              </div>

              {/* Right Column: Cast & Seiyuu Static Info */}
              <div className="flex-1 flex flex-col justify-between text-center sm:text-left">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white neon:text-cyan-50">
                      {member.character}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 neon:bg-[#090014] text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 neon:text-cyan-400/80 border border-slate-200 dark:border-slate-700/50 neon:border-cyan-500/20 w-fit mx-auto sm:mx-0">
                      {member.role}
                    </span>
                  </div>
                  
                  <p className="text-xs text-orange-500 dark:text-pink-400 neon:text-fuchsia-400 font-extrabold uppercase tracking-wider mb-3">
                    {member.show}
                  </p>

                  <div className="space-y-1.5 mb-4 text-sm font-medium">
                    <p className="text-slate-800 dark:text-slate-200 neon:text-cyan-100 flex items-center justify-center sm:justify-start gap-1.5">
                      <Mic className="w-4 h-4 text-slate-550 dark:text-slate-400 neon:text-cyan-500" />
                      Seiyuu: <span className="font-extrabold">{member.seiyuu}</span> 
                      <span className="text-xs font-bold text-slate-450 dark:text-slate-500">({member.seiyuuJapanese})</span>
                    </p>
                    <p className="text-xs text-slate-550 dark:text-slate-400 neon:text-cyan-300/70 pl-0 sm:pl-5 font-semibold">
                      Famous Roles: {member.famousRoles}
                    </p>
                  </div>
                </div>

                {/* Production Studio details bar */}
                <div className="mt-auto border-t border-slate-200/50 dark:border-slate-800/50 neon:border-cyan-500/10 pt-3 flex items-center justify-center sm:justify-between text-xs font-bold">
                  <span className="text-slate-550 dark:text-slate-400 neon:text-cyan-300/50 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> Studio Producer
                  </span>
                  <span className="text-slate-900 dark:text-white neon:text-cyan-300 font-extrabold pl-2">
                    {member.studio}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
