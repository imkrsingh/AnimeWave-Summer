"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Shield, Swords, Heart, X, BookOpen, Sparkles, Wand2, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";

interface Character {
  id: string;
  name: string;
  codename: string;
  title: string;
  image: string;
  badgeColor: string;
  gradientText: string;
  ambientGlow: string;
  description: string;
  stats: {
    label: string;
    value: number;
    icon: any;
    color: string;
  }[];
  lore: {
    sectionTitle: string;
    icon: any;
    content: string;
  }[];
}

const CHARACTERS: Character[] = [
  {
    id: "aiko",
    name: "Aiko Tanaka",
    codename: "The Sunfire Blade",
    title: "Meet the hero of Summer Skies",
    image: "/aiko.png",
    badgeColor: "bg-orange-100 dark:bg-orange-500/20 neon:bg-orange-950/30 text-orange-600 dark:text-orange-400 neon:text-orange-400 border-orange-200 dark:border-orange-500/30 neon:border-orange-500/45",
    gradientText: "from-orange-500 to-yellow-500 dark:from-orange-400 dark:to-pink-500 neon:from-orange-400 neon:to-amber-500",
    ambientGlow: "from-orange-500 to-yellow-500 dark:from-pink-500 dark:to-orange-500 neon:from-orange-500 neon:to-yellow-600",
    description: "Born from the ashes of a fallen star, Aiko wields the Sunfire Blade, a plasma-energy katana capable of altering gravity and heat fields. Her journey begins as she seeks to uncover the truth behind her origins and protect her shoreline sanctuary during the endless summer.",
    stats: [
      { label: "Power", value: 95, icon: Zap, color: "bg-gradient-to-r from-orange-500 to-yellow-400 shadow-[0_0_12px_rgba(249,115,22,0.3)]" },
      { label: "Defense", value: 75, icon: Shield, color: "bg-gradient-to-r from-amber-400 to-yellow-300 shadow-[0_0_12px_rgba(234,179,8,0.3)]" },
      { label: "Agility", value: 88, icon: Swords, color: "bg-gradient-to-r from-red-500 to-orange-400 shadow-[0_0_12px_rgba(239,68,68,0.3)]" },
      { label: "Spirit", value: 100, icon: Heart, color: "bg-gradient-to-r from-rose-500 to-pink-400 shadow-[0_0_12px_rgba(244,63,94,0.3)]" },
    ],
    lore: [
      {
        sectionTitle: "1. Celestial Beginnings",
        icon: BookOpen,
        content: "Aiko was discovered as an infant inside a glowing meteoroid that impacted the shore of Kyoto during the Summer Eclipse of 2008. Reared by the silent priests of the Solar Shrine, she exhibited high affinity to ambient heat and solar waves, allowing her to mold plasma from a young age.",
      },
      {
        sectionTitle: "2. The Forging of Sunfire",
        icon: Sparkles,
        content: "The Sunfire Blade was not created by mortal blacksmiths. Woven from solar wind particles and forged inside the earth's mantle, the weapon chose Aiko on her fourteenth birthday. It is capable of radiating thermal energy up to 6,000°C—equivalent to the photosphere of the Sun!",
      },
      {
        sectionTitle: "3. Current Quest: Summer Eternal",
        icon: Wand2,
        content: "Aiko currently travels the ocean shorelines, containing spatial fractures created by the 'Frozen Eclipse' sect. Her mission is to gather the scattered shards of the core solar reactor, ensuring that the beautiful summer sky remains warm and active for all eternity.",
      },
    ]
  },
  {
    id: "kai",
    name: "Kai (Hacker 0x1)",
    codename: "Neon Cyber Pulse",
    title: "Hack the summer grid core",
    image: "/kai.png",
    badgeColor: "bg-fuchsia-100 dark:bg-fuchsia-500/20 neon:bg-cyan-950/30 text-fuchsia-600 dark:text-fuchsia-400 neon:text-cyan-400 border-fuchsia-200 dark:border-fuchsia-500/30 neon:border-cyan-500/45",
    gradientText: "from-fuchsia-500 to-cyan-500 dark:from-pink-400 dark:to-cyan-400 neon:from-cyan-400 neon:to-fuchsia-500",
    ambientGlow: "from-fuchsia-500 to-cyan-500 dark:from-pink-500 dark:to-cyan-500 neon:from-cyan-500 neon:to-fuchsia-600",
    description: "A brilliant cybernetic renegade operating in the neon shadows of Neo-Tokyo. Kai manipulates electromagnetic waves and digital firewalls using his custom-designed holo-haptic rig. His goal is to intercept a highly classified summer solar satellite mainframe.",
    stats: [
      { label: "Intellect", value: 98, icon: Zap, color: "bg-gradient-to-r from-cyan-400 to-blue-400 shadow-[0_0_12px_rgba(34,211,238,0.3)]" },
      { label: "Stealth", value: 85, icon: Shield, color: "bg-gradient-to-r from-purple-500 to-indigo-500 shadow-[0_0_12px_rgba(168,85,247,0.3)]" },
      { label: "Hacking Speed", value: 94, icon: Swords, color: "bg-gradient-to-r from-fuchsia-500 to-pink-500 shadow-[0_0_12px_rgba(217,70,239,0.3)]" },
      { label: "Net Defense", value: 90, icon: Heart, color: "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]" },
    ],
    lore: [
      {
        sectionTitle: "1. Neon Underground Legacy",
        icon: BookOpen,
        content: "Born in the lower sectors of Neo-Tokyo, Kai survived by hot-wiring neural nets and decoding encrypted databanks before he could read. At age twelve, he single-handedly crashed the security grid of a corrupt mega-corporation, becoming a local legend of the cyber underground.",
      },
      {
        sectionTitle: "2. The Holo-Haptic Rig",
        icon: Sparkles,
        content: "Kai's signature equipment is a custom-forged holo-haptic terminal that interfaces directly with his cognitive cortex. This interface allows him to perceive lines of raw code as floating physical structures in 3D space, which he can modify, sever, or duplicate at near light speed.",
      },
      {
        sectionTitle: "3. Operation: Solar Eclipse",
        icon: Wand2,
        content: "During this endless summer, Kai intercepted a faint signal indicating that a weaponized climate satellite is slowly locking onto the coastal coordinates. He must break into the high-security core database of the orbiting mainframe before the system initiates the lockdown.",
      },
    ]
  },
  {
    id: "rei",
    name: "Kagura Rei",
    codename: "The Kyoto Fox Spirit",
    title: "Command the magical lanterns",
    image: "/rei.png",
    badgeColor: "bg-emerald-100 dark:bg-emerald-500/20 neon:bg-fuchsia-950/30 text-emerald-600 dark:text-emerald-400 neon:text-fuchsia-400 border-emerald-200 dark:border-emerald-500/30 neon:border-fuchsia-500/45",
    gradientText: "from-green-500 to-emerald-500 dark:from-emerald-400 dark:to-pink-400 neon:from-emerald-400 neon:to-teal-500",
    ambientGlow: "from-green-500 to-emerald-500 dark:from-emerald-500 dark:to-pink-500 neon:from-emerald-500 neon:to-fuchsia-600",
    description: "A mysterious shrine maiden priestess from Kyoto forest, gifted with the fox-spirit bloodline. Rei controls nature spirits and spatial barriers using magical glowing paper talismans. She keeps vigil over the boundaries of the ancient Kyoto summer festivals.",
    stats: [
      { label: "Sorcery", value: 100, icon: Zap, color: "bg-gradient-to-r from-emerald-400 to-green-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]" },
      { label: "Barrier Defense", value: 92, icon: Shield, color: "bg-gradient-to-r from-teal-400 to-cyan-400 shadow-[0_0_12px_rgba(20,184,166,0.3)]" },
      { label: "Spirit Agility", value: 80, icon: Swords, color: "bg-gradient-to-r from-pink-400 to-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.3)]" },
      { label: "Sanctity Force", value: 96, icon: Heart, color: "bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-[0_0_12px_rgba(168,85,247,0.3)]" },
    ],
    lore: [
      {
        sectionTitle: "1. The Sacred Fox Heritage",
        icon: BookOpen,
        content: "Rei belongs to the ancient Shinto bloodline of the Celestial Nine-Tailed Fox spirits. Raised in the secluded deep forests of Mount Kurama, she can commune with wood dryads and fire wisps, acting as a portal-bridge between the human world and the hidden astral realms.",
      },
      {
        sectionTitle: "2. Astral Paper Talismans",
        icon: Sparkles,
        content: "She battles utilizing glowing emerald amulets called 'Ofuda'. Each paper strip is inscribed with ancient celestial runes using spirit brush-ink. When cast, they create absolute defensive mirror shields, purge corrupted energy, or summon dynamic white fox fire chains.",
      },
      {
        sectionTitle: "3. Guardianship of Kyoto Nights",
        icon: Wand2,
        content: "As Kyoto prepares for the grand summer lantern parade, thin spatial tears are appearing in the sacred mountain boundaries. Rei is tracking a mysterious dimensional shadow entity that feeds on the happiness and light of festival-goers.",
      },
    ]
  }
];

export default function CharacterSpotlight() {
  const [activeCharId, setActiveCharId] = useState<string>("aiko");
  const [isLoreOpen, setIsLoreOpen] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? theme : "dark";

  const activeChar = CHARACTERS.find((char) => char.id === activeCharId) || CHARACTERS[0];

  return (
    <section id="spotlight" className="py-24 bg-sky-100 dark:bg-slate-900 neon:bg-[#090014] relative overflow-hidden transition-colors duration-300 transform-gpu z-10">
      
      {/* Decorative organic background grids */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 neon:opacity-30 pointer-events-none transform-gpu" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, #475569 2px, transparent 2px)',
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Column - Portrait Picture Presentation Card */}
          <div className="w-full lg:w-1/2 relative transform-gpu">
            
            {/* Dynamic Ambient Color Glowing Sphere mapped to character's glow identity */}
            <div className={`absolute -inset-4 bg-gradient-to-tr ${activeChar.ambientGlow} rounded-[3rem] opacity-40 dark:opacity-30 neon:opacity-50 blur-[40px] transform-gpu translate-z-0 pointer-events-none transition-all duration-1000`}></div>
            
            {/* Dynamic fading card slide presentation */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeChar.id}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative h-[600px] w-full rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-white/10 neon:border-cyan-400/40 shadow-xl transform-gpu"
              >
                <img 
                  src={activeChar.image} 
                  alt={activeChar.name} 
                  loading="lazy"
                  className="w-full h-full object-cover transform-gpu hover:scale-105 transition-transform duration-700 will-change-transform"
                />
                
                {/* Visual mask bottom black gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent pointer-events-none"></div>
                
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-1.5 leading-none">{activeChar.name}</h3>
                  <p className="text-yellow-400 dark:text-orange-300 neon:text-cyan-300 font-black uppercase tracking-widest text-xs md:text-sm">{activeChar.codename}</p>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Right Column - Dynamic Hero Specifications Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-1/2 transform-gpu text-left"
          >
            {/* Character Selector Dynamic Tabs */}
            <div className="flex gap-2.5 mb-6 overflow-x-auto whitespace-nowrap pb-2 scrollbar-none max-w-full">
              {CHARACTERS.map((char) => {
                const isActive = char.id === activeCharId;
                return (
                  <button
                    key={char.id}
                    onClick={() => setActiveCharId(char.id)}
                    className={`px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                      isActive
                        ? "bg-slate-900 text-white border-transparent dark:bg-white dark:text-slate-950 neon:bg-cyan-500 neon:text-[#090014] neon:border-cyan-400 neon:shadow-[0_0_15px_rgba(34,211,238,0.35)]"
                        : "bg-white/60 border-slate-200 text-slate-700 hover:border-slate-350 dark:bg-slate-950/40 dark:border-slate-800 dark:text-slate-400 dark:hover:text-white neon:bg-[#12002b]/40 neon:border-cyan-500/10 neon:text-cyan-400/60 neon:hover:text-cyan-400"
                    }`}
                  >
                    {char.name}
                  </button>
                );
              })}
            </div>

            <div className={`inline-block px-5 py-2 rounded-full font-black text-xs mb-5 uppercase tracking-wider border transition-all duration-700 ${activeChar.badgeColor}`}>
              Character Spotlight
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white neon:text-cyan-50 mb-6 leading-tight">
              {activeChar.title.split("hero")[0]}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${activeChar.gradientText} transition-all duration-700`}>
                {activeChar.id === "aiko" ? "hero" : activeChar.id === "kai" ? "cyber core" : "spirit guide"}
              </span>
              {activeChar.title.split(activeChar.id === "aiko" ? "hero" : activeChar.id === "kai" ? "cyber core" : "spirit guide")[1] || " of Summer"}
            </h2>
            
            <p className="text-slate-700 dark:text-slate-300 neon:text-cyan-100/70 text-base md:text-lg mb-8 leading-relaxed font-semibold">
              {activeChar.description}
            </p>

            {/* Dynamic animated progress bar list */}
            <div className="space-y-5">
              {activeChar.stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label}>
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="flex items-center gap-2 text-xs md:text-sm text-slate-800 dark:text-white neon:text-cyan-100 font-black uppercase tracking-wider">
                        <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400 neon:text-cyan-400" />
                        {stat.label}
                      </div>
                      <span className="text-slate-900 dark:text-white neon:text-cyan-300 font-mono font-black text-xs md:text-sm">{stat.value}/100</span>
                    </div>
                    <div className="h-3 w-full bg-slate-200 dark:bg-slate-850 neon:bg-[#1a0b2e] rounded-full overflow-hidden border border-slate-300/40 dark:border-slate-800 neon:border-fuchsia-900/50">
                      {/* Using composite character id key to force progress growth re-renders on tabs cycle */}
                      <motion.div 
                        key={`${activeChar.id}-${stat.label}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.04, ease: "easeOut" }}
                        className={`h-full ${stat.color} transform-gpu will-change-transform`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Theme responsive CTA button */}
            <div className="mt-10">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95, y: 0 }}
                onClick={() => setIsLoreOpen(true)}
                className={`px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer relative overflow-hidden group border ${
                  currentTheme === "neon"
                    ? "bg-[#090014] border-2 border-cyan-400 text-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.45)] hover:bg-cyan-400/10"
                    : currentTheme === "light"
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-orange-400/20 shadow-[0_10px_25px_rgba(249,115,22,0.25)]"
                    : "bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white border-pink-500/20 shadow-[0_10px_25px_rgba(236,72,153,0.3)]"
                }`}
              >
                {/* Animated lightning sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span>Read Full Lore</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>

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
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 neon:bg-[#0c001f] border-4 border-slate-200 dark:border-slate-800 neon:border-cyan-400/80 rounded-[2.5rem] overflow-hidden shadow-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto custom-scrollbar text-left"
            >
              {/* Close Button X */}
              <button 
                onClick={() => setIsLoreOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 neon:bg-cyan-950/40 neon:hover:bg-cyan-400 neon:text-cyan-300 neon:hover:text-[#0c001f] text-slate-800 dark:text-white transition-all cursor-pointer z-50 active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Graphic Banner inside modal */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 border border-slate-350 dark:border-slate-855/50">
                <img 
                  src={activeChar.image} 
                  alt={`${activeChar.name} Banner`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 neon:from-[#090014] to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400 neon:text-cyan-300 bg-yellow-400/10 neon:bg-cyan-400/10 px-2.5 py-1 rounded-md border border-yellow-400/20 neon:border-cyan-400/30">LORE DATABASE</span>
                  <h4 className="text-2xl font-black text-white mt-1">{activeChar.name}: Codex</h4>
                </div>
              </div>

              {/* Main Content of Lore */}
              <div className="space-y-6 text-slate-800 dark:text-slate-200 neon:text-cyan-50/90 font-medium">
                {activeChar.lore.map((section, idx) => {
                  const SectionIcon = section.icon;
                  return (
                    <div key={idx}>
                      <h5 className="text-sm font-black text-orange-500 dark:text-pink-400 neon:text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                        <SectionIcon className="w-4 h-4" /> {section.sectionTitle}
                      </h5>
                      <p className="text-sm leading-relaxed mt-2 pl-5 border-l-2 border-slate-250 dark:border-slate-800 neon:border-cyan-500/30">
                        {section.content}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Close Button CTA */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setIsLoreOpen(false)}
                  className={`px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-colors duration-300 cursor-pointer active:scale-95 shadow-md ${
                    currentTheme === "neon"
                      ? "bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                      : "bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900"
                  }`}
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
