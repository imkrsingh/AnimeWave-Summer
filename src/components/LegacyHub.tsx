"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Star, Compass, Flame } from "lucide-react";
import { useTheme } from "next-themes";

interface AnimeItem {
  id: number;
  title: string;
  category: "Classics" | "Modern" | "Nostalgia";
  genre: string;
  year: string;
  rating: number;
  tagline: string;
  gradient: string;
  letter: string;
  image: string;
  statLabel: string;
  statValue: string;
  rank: string;
}

const LEGENDARY_ANIME: AnimeItem[] = [
  {
    id: 1,
    title: "Naruto",
    category: "Classics",
    genre: "Ninja Shonen",
    year: "2002",
    rating: 4.8,
    tagline: "Believe it! A legendary tale of friendship, bonds, and destiny.",
    gradient: "from-orange-500 to-yellow-500",
    letter: "N",
    image: "https://cdn.myanimelist.net/images/anime/13/75509.jpg",
    statLabel: "Chakra Level",
    statValue: "Godlike",
    rank: "S-Rank"
  },
  {
    id: 2,
    title: "Dragon Ball Z",
    category: "Classics",
    genre: "Action / Martial Arts",
    year: "1989",
    rating: 4.9,
    tagline: "Unleash the Super Saiyan within and defend the universe!",
    gradient: "from-yellow-500 to-red-500",
    letter: "D",
    image: "https://cdn.myanimelist.net/images/anime/1607/118837.jpg",
    statLabel: "Power Level",
    statValue: "9000+",
    rank: "Limitless"
  },
  {
    id: 3,
    title: "One Piece",
    category: "Classics",
    genre: "Adventure / Pirate",
    year: "1999",
    rating: 4.9,
    tagline: "Set sail for the Grand Line in search of the ultimate treasure.",
    gradient: "from-red-500 to-blue-600",
    letter: "O",
    image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
    statLabel: "Bounty",
    statValue: "3B+ Berries",
    rank: "Emperor"
  },
  {
    id: 4,
    title: "Bleach",
    category: "Classics",
    genre: "Supernatural / Action",
    year: "2004",
    rating: 4.7,
    tagline: "Protect the living world as a legendary Soul Reaper.",
    gradient: "from-purple-500 to-indigo-600",
    letter: "B",
    image: "https://cdn.myanimelist.net/images/anime/3/40451.jpg",
    statLabel: "Reiatsu Class",
    statValue: "Captain",
    rank: "Bankai"
  },
  {
    id: 5,
    title: "Hunter × Hunter",
    category: "Classics",
    genre: "Adventure / Fantasy",
    year: "2011",
    rating: 4.9,
    tagline: "Discover the endless secrets of the mysterious Hunter world.",
    gradient: "from-green-500 to-emerald-600",
    letter: "H",
    image: "https://cdn.myanimelist.net/images/anime/11/39717.jpg",
    statLabel: "Nen Category",
    statValue: "Specialist",
    rank: "Star-Hunter"
  },
  {
    id: 6,
    title: "Demon Slayer: Kimetsu no Yaiba",
    category: "Modern",
    genre: "Dark Fantasy / Action",
    year: "2019",
    rating: 4.9,
    tagline: "Slay the demons of the dark and cure a sister's curse.",
    gradient: "from-pink-500 to-rose-600",
    letter: "DS",
    image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
    statLabel: "Breathing Style",
    statValue: "Sun Breathing",
    rank: "Hashira"
  },
  {
    id: 7,
    title: "Jujutsu Kaisen",
    category: "Modern",
    genre: "Supernatural / Action",
    year: "2020",
    rating: 4.8,
    tagline: "Harness cursed energy to fight dangerous cursed spirits.",
    gradient: "from-indigo-500 to-purple-600",
    letter: "JK",
    image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
    statLabel: "Domain",
    statValue: "Unlimited Void",
    rank: "Special-Grade"
  },
  {
    id: 8,
    title: "Attack on Titan",
    category: "Modern",
    genre: "Dark Fantasy / Action",
    year: "2013",
    rating: 4.9,
    tagline: "A desperate struggle for humanity's survival inside the giant walls.",
    gradient: "from-amber-600 to-stone-800",
    letter: "A",
    image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    statLabel: "Titan Class",
    statValue: "Founding",
    rank: "Colossal"
  },
  {
    id: 9,
    title: "My Hero Academia",
    category: "Modern",
    genre: "Superheroes / School",
    year: "2016",
    rating: 4.6,
    tagline: "Become the world's greatest hero! Plus Ultra!",
    gradient: "from-cyan-500 to-teal-600",
    letter: "M",
    image: "https://cdn.myanimelist.net/images/anime/10/78745.jpg",
    statLabel: "Quirk",
    statValue: "One For All",
    rank: "Pro-Hero"
  },
  {
    id: 10,
    title: "Fullmetal Alchemist: Brotherhood",
    category: "Classics",
    genre: "Steampunk / Fantasy",
    year: "2009",
    rating: 4.9,
    tagline: "A journey of brothers seeking what they lost through alchemy.",
    gradient: "from-red-600 to-slate-800",
    letter: "F",
    image: "https://cdn.myanimelist.net/images/anime/1223/96541.jpg",
    statLabel: "Alchemy Type",
    statValue: "Transmutation",
    rank: "State-Alchemist"
  },
  {
    id: 11,
    title: "Doraemon",
    category: "Nostalgia",
    genre: "Sci-Fi / Comedy",
    year: "1979",
    rating: 4.8,
    tagline: "A futuristic robotic cat and his magical 4D pocket gadgets.",
    gradient: "from-blue-400 to-sky-600",
    letter: "DR",
    image: "https://cdn.myanimelist.net/images/anime/11/11059.jpg",
    statLabel: "Signature Tool",
    statValue: "Anywhere Door",
    rank: "Future-Cat"
  },
  {
    id: 12,
    title: "Pokémon",
    category: "Nostalgia",
    genre: "Adventure / Fantasy",
    year: "1997",
    rating: 4.7,
    tagline: "Gotta catch 'em all! Become the ultimate Pokemon Master.",
    gradient: "from-yellow-400 to-blue-500",
    letter: "P",
    image: "https://cdn.myanimelist.net/images/anime/11/53927.jpg",
    statLabel: "Partner Level",
    statValue: "Pikachu Max",
    rank: "Champion"
  },
  {
    id: 13,
    title: "Shin Chan",
    category: "Nostalgia",
    genre: "Comedy / Slice of Life",
    year: "1992",
    rating: 4.6,
    tagline: "Hilarious daily adventures of a mischievous 5-year-old.",
    gradient: "from-red-400 to-yellow-500",
    letter: "S",
    image: "https://cdn.myanimelist.net/images/anime/3/26071.jpg",
    statLabel: "Mischief Tier",
    statValue: "Ultimate",
    rank: "Troublemaker"
  },
  {
    id: 14,
    title: "Detective Conan",
    category: "Nostalgia",
    genre: "Mystery / Thriller",
    year: "1996",
    rating: 4.8,
    tagline: "One truth prevails! Solving complex crimes in a child's body.",
    gradient: "from-blue-600 to-slate-700",
    letter: "C",
    image: "https://cdn.myanimelist.net/images/anime/10/18805.jpg",
    statLabel: "IQ Rating",
    statValue: "180+",
    rank: "Mastermind"
  },
  {
    id: 15,
    title: "Yu-Gi-Oh!",
    category: "Nostalgia",
    genre: "Gaming / Shonen",
    year: "2000",
    rating: 4.5,
    tagline: "It's time to duel! Trust in the sacred Heart of the Cards.",
    gradient: "from-violet-600 to-fuchsia-700",
    letter: "Y",
    image: "https://cdn.myanimelist.net/images/anime/13/75685.jpg",
    statLabel: "Deck Power",
    statValue: "Egyptian God",
    rank: "King-Of-Games"
  },
  {
    id: 16,
    title: "Beyblade",
    category: "Nostalgia",
    genre: "Sports / Shonen",
    year: "2001",
    rating: 4.4,
    tagline: "Let it rip! Spinning tops powered by legendary bit-beasts.",
    gradient: "from-blue-500 to-orange-500",
    letter: "BY",
    image: "https://cdn.myanimelist.net/images/anime/13/75429.jpg",
    statLabel: "Bit-Beast",
    statValue: "Dragoon V2",
    rank: "Top-Blader"
  },
  {
    id: 17,
    title: "Digimon Adventure",
    category: "Nostalgia",
    genre: "Sci-Fi / Adventure",
    year: "1999",
    rating: 4.6,
    tagline: "Digital monsters, digivolve to save the fragile digital world!",
    gradient: "from-cyan-400 to-orange-600",
    letter: "DG",
    image: "https://cdn.myanimelist.net/images/anime/13/75427.jpg",
    statLabel: "Evolution",
    statValue: "Mega Level",
    rank: "Digi-Destined"
  },
  {
    id: 18,
    title: "Spy × Family",
    category: "Modern",
    genre: "Comedy / Action",
    year: "2022",
    rating: 4.8,
    tagline: "A spy, an assassin, and a telepath form a perfect fake family.",
    gradient: "from-teal-400 to-emerald-600",
    letter: "SF",
    image: "https://cdn.myanimelist.net/images/anime/1441/122795.jpg",
    statLabel: "Mission Class",
    statValue: "Strix Priority",
    rank: "Agent-S"
  },
  {
    id: 19,
    title: "Chainsaw Man",
    category: "Modern",
    genre: "Dark Fantasy / Action",
    year: "2022",
    rating: 4.7,
    tagline: "Conquer the devils of the world with the power of chainsaws.",
    gradient: "from-red-500 to-orange-600",
    letter: "CS",
    image: "https://cdn.myanimelist.net/images/anime/1806/126216.jpg",
    statLabel: "Devil Contract",
    statValue: "Chainsaw Devil",
    rank: "Hybrid"
  },
  {
    id: 20,
    title: "Tokyo Revengers",
    category: "Modern",
    genre: "Action / Sci-Fi",
    year: "2021",
    rating: 4.5,
    tagline: "Leap through time to rewrite history and save your loved ones.",
    gradient: "from-yellow-500 to-amber-600",
    letter: "TR",
    image: "https://cdn.myanimelist.net/images/anime/1832/111818.jpg",
    statLabel: "Gang Status",
    statValue: "Toman Founder",
    rank: "President"
  },
  {
    id: 21,
    title: "Blue Lock",
    category: "Modern",
    genre: "Sports / Drama",
    year: "2022",
    rating: 4.7,
    tagline: "Discard ego, score goals, and become the world's greatest striker.",
    gradient: "from-blue-500 to-sky-700",
    letter: "BL",
    image: "https://cdn.myanimelist.net/images/anime/1258/126929.jpg",
    statLabel: "Ego Level",
    statValue: "S-Tier Striker",
    rank: "World-Class"
  },
  {
    id: 22,
    title: "Solo Leveling",
    category: "Modern",
    genre: "Fantasy / Action",
    year: "2024",
    rating: 4.9,
    tagline: "From the weakest hunter to the ultimate shadow monarch. Arise!",
    gradient: "from-slate-700 to-cyan-500",
    letter: "SL",
    image: "https://cdn.myanimelist.net/images/anime/1015/138075.jpg",
    statLabel: "Shadow Monarch",
    statValue: "10M+ Shadows",
    rank: "Shadow-God"
  },
  {
    id: 23,
    title: "Death Note",
    category: "Classics",
    genre: "Psychological / Mystery",
    year: "2006",
    rating: 4.9,
    tagline: "A battle of wits between a genius with a notebook of death and a master detective.",
    gradient: "from-slate-800 to-red-950",
    letter: "DN",
    image: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
    statLabel: "Notebook Rule",
    statValue: "40 Seconds",
    rank: "Shinigami"
  },
  {
    id: 24,
    title: "One Punch Man",
    category: "Modern",
    genre: "Action / Satire",
    year: "2015",
    rating: 4.8,
    tagline: "Saitama can defeat any opponent with a single punch, but suffers from existential boredom.",
    gradient: "from-yellow-400 to-orange-600",
    letter: "OPM",
    image: "https://cdn.myanimelist.net/images/anime/12/76049.jpg",
    statLabel: "Punch Power",
    statValue: "One-Hit KO",
    rank: "S-Class Hero"
  }
];

const INITIAL_LIMIT = 8;

export default function LegacyHub() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Classics" | "Modern" | "Nostalgia">("All");
  const [showAll, setShowAll] = useState(false);
  const { theme } = useTheme();

  // Reset showAll when search input or active category tab changes for optimal UX
  useEffect(() => {
    setShowAll(false);
  }, [search, activeTab]);

  // Filter and search logic combined
  const filteredAnime = useMemo(() => {
    return LEGENDARY_ANIME.filter((anime) => {
      const matchesTab = activeTab === "All" || anime.category === activeTab;
      const matchesSearch = anime.title.toLowerCase().includes(search.toLowerCase()) || 
                            anime.genre.toLowerCase().includes(search.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [search, activeTab]);

  // Restrict initially visible cards to limit grid footprint on viewport mount
  const visibleAnime = useMemo(() => {
    return showAll ? filteredAnime : filteredAnime.slice(0, INITIAL_LIMIT);
  }, [filteredAnime, showAll]);

  return (
    <section id="archive" className="py-24 bg-sky-50 dark:bg-slate-950 neon:bg-[#090014] relative overflow-hidden transition-colors duration-350 transform-gpu">
      {/* Dynamic Background Overlays */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 neon:opacity-30 pointer-events-none transform-gpu" style={{
        backgroundImage: 'radial-gradient(circle at 10% 10%, #64748b 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}></div>
      
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[300px] h-[300px] bg-gradient-to-tr from-orange-400/20 to-yellow-400/20 dark:from-pink-500/10 dark:to-orange-500/10 neon:from-cyan-400/25 neon:to-fuchsia-500/25 blur-[100px] transform-gpu translate-z-0 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-orange-400/10 dark:bg-pink-500/10 neon:bg-cyan-400/10 border border-orange-400/20 dark:border-pink-500/20 neon:border-cyan-400/30 text-orange-600 dark:text-pink-400 neon:text-cyan-300 font-bold uppercase tracking-wider text-xs shadow-sm"
          >
            <Compass className="w-4 h-4" /> Legendary Archive
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white neon:text-cyan-50">
            Legendary <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500">Anime Hall of Fame</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 neon:text-cyan-100/70 text-lg mt-3 font-medium">
            Search and explore all the legendary masterpieces that defined childhoods and revolutionized modern animation.
          </p>
        </div>

        {/* Filter and Search Bar Container */}
        <div className="mb-12 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4 justify-between bg-white/40 dark:bg-slate-900/40 neon:bg-[#12002b]/40 backdrop-blur-md p-4 rounded-3xl border border-slate-200/50 dark:border-slate-855 neon:border-cyan-500/30 shadow-md transform-gpu">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {(["All", "Classics", "Modern", "Nostalgia"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-2xl text-sm font-black uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-slate-900 dark:bg-white neon:bg-cyan-400 text-white dark:text-slate-950 neon:text-[#090014] shadow-sm scale-105"
                    : "bg-transparent text-slate-700 dark:text-slate-400 neon:text-cyan-400/70 hover:bg-slate-200/50 dark:hover:bg-slate-800/40 neon:hover:bg-cyan-950/20"
                }`}
              >
                {tab === "All" ? "All Legacy" : tab === "Classics" ? "Shonen Classics" : tab === "Modern" ? "Modern Giants" : "Childhood Nostalgia"}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 neon:text-cyan-400/80">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search anime or genre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-950 neon:bg-[#090014] text-slate-800 dark:text-white neon:text-cyan-100 placeholder-slate-400 rounded-2xl border border-slate-200 dark:border-slate-850 neon:border-cyan-500/40 focus:outline-none focus:border-orange-500 dark:focus:border-pink-500 neon:focus:border-fuchsia-400 font-bold transition-all text-sm shadow-inner"
            />
          </div>
        </div>

        {/* Anime Grid list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {visibleAnime.map((anime) => (
              <motion.div
                key={anime.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-[330px] perspective-1000 group cursor-pointer"
              >
                {/* Inner Wrapper (Flips on hover) */}
                <div className="relative w-full h-full duration-700 preserve-3d group-hover:rotate-y-180 transition-transform select-none">
                  
                  {/* FRONT SIDE (HOLOGRAPHIC FOIL LIMITED EDITION POSTER WITH GLASS DETAILS) */}
                  <div className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden border-2 backface-hidden shadow-md flex flex-col justify-between transform-gpu group-hover:border-transparent transition-all duration-300
                    bg-white/90 border-slate-250
                    dark:bg-slate-900/95 dark:border-slate-855 
                    neon:bg-[#12002b]/95 neon:border-cyan-500/20`}>
                    
                    {/* Glowing outer frame halo under card */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-tr ${anime.gradient} rounded-3xl opacity-0 group-hover:opacity-45 blur-md transition-opacity duration-300 pointer-events-none transform-gpu translate-z-0`} />

                    {/* Cyber futuristic tech corner indicators ([+]) */}
                    <div className="absolute top-2 left-2 text-[9px] text-slate-400 dark:text-white/35 neon:text-white/35 font-mono pointer-events-none z-20 font-black tracking-tighter">[+]</div>
                    <div className="absolute top-2 right-2 text-[9px] text-slate-400 dark:text-white/35 neon:text-white/35 font-mono pointer-events-none z-20 font-black tracking-tighter">[+]</div>

                    {/* Background poster image (uses MyAnimeList CDN!) */}
                    <div
                      className="absolute inset-0 w-full h-full bg-cover bg-top select-none group-hover:scale-105 transition-transform duration-700 ease-out"
                      style={{ backgroundImage: `url(${anime.image})` }}
                    />
                    
                    {/* Holographic metallic sheen (simulates rare foil reflection sweep on hover) */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-20 pointer-events-none" />

                    {/* Dark gradient mask to overlay text nicely */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent z-10 pointer-events-none" />

                    {/* Top row overlays */}
                    <div className="relative z-20 p-4 flex items-center justify-between w-full">
                      {/* Futuristic Glass Card Number Tag */}
                      <div className="bg-slate-900/10 dark:bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-slate-900/10 dark:border-white/20 text-[10px] font-mono font-black tracking-widest text-slate-900 dark:text-white shadow-md">
                        #{anime.id.toString().padStart(2, "0")}
                      </div>

                      {/* Floating Rating Glass Tag */}
                      <div className="flex items-center gap-1 bg-slate-900/10 dark:bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-slate-900/10 dark:border-white/20 shadow-md text-slate-900 dark:text-white text-[10px] font-black tracking-wider">
                        <Star className="w-3 h-3 text-yellow-500 dark:text-yellow-400 fill-current" />
                        {anime.rating}
                      </div>
                    </div>

                    {/* Bottom Glass Title Console (Floating seesha panel at the bottom of the card) */}
                    <div className="relative z-20 m-3 p-3 text-left rounded-2xl bg-black/55 dark:bg-black/55 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                      <span className={`text-[8px] font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r ${anime.gradient} bg-black/60 px-2 py-0.5 rounded-md border border-white/10 shadow-sm`}>
                        {anime.category === "Classics" ? "Shonen Legend" : anime.category === "Modern" ? "Modern Giant" : "Childhood Classic"}
                      </span>
                      
                      {/* Title */}
                      <h3 className="text-base font-black text-white leading-tight mt-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        {anime.title}
                      </h3>
                      
                      {/* Interactive hint */}
                      <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-white/50 font-bold uppercase tracking-widest">
                        <span>#{anime.id.toString().padStart(2, "0")} ARCHIVE</span>
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${anime.gradient} font-black group-hover:scale-105 transition-transform flex items-center gap-1 animate-pulse`}>
                          Flip Card <Sparkles className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE (VIBRANT STYLISH GLASS SEESHA DECK PANEL) */}
                  <div className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden p-5 rotate-y-180 backface-hidden shadow-2xl flex flex-col justify-between border backdrop-blur-xl transform-gpu transition-all duration-300
                    bg-white/60 border-white/40 
                    dark:bg-slate-950/45 dark:border-white/10 
                    neon:bg-[#12002b]/40 neon:border-cyan-500/30`}>
                    
                    {/* Glowing background brand color accent bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${anime.gradient}`} />
                    
                    {/* Large Subtle Glowing Rank Watermark in background */}
                    <div className="absolute right-4 bottom-16 text-6xl font-black opacity-[0.03] dark:opacity-[0.05] neon:opacity-[0.08] select-none pointer-events-none font-mono uppercase tracking-tighter">
                      {anime.rank}
                    </div>

                    {/* Tech Corner Crosshairs on back side */}
                    <div className="absolute top-2 left-2 text-[8px] text-slate-400 dark:text-white/20 neon:text-cyan-500/20 font-mono pointer-events-none z-20 font-black">[+]</div>
                    <div className="absolute top-2 right-2 text-[8px] text-slate-400 dark:text-white/20 neon:text-cyan-500/20 font-mono pointer-events-none z-20 font-black">[+]</div>

                    {/* Backdrop decorative organic gradient glows */}
                    <div className={`absolute -right-10 -top-10 w-28 h-28 rounded-full bg-gradient-to-tr ${anime.gradient} opacity-10 dark:opacity-15 neon:opacity-20 blur-xl pointer-events-none`} />
                    <div className={`absolute -left-10 -bottom-10 w-28 h-28 rounded-full bg-gradient-to-tr ${anime.gradient} opacity-10 dark:opacity-15 neon:opacity-20 blur-xl pointer-events-none`} />

                    <div className="relative z-10 flex flex-col h-full justify-between">
                      {/* Header */}
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="flex items-center gap-1.5">
                            {/* Futuristic glowing Flame icon badge inside frosted glass bezel */}
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${anime.gradient} flex items-center justify-center text-white shadow-md border border-white/25`}>
                              <Flame className="w-4 h-4 text-white fill-current animate-pulse" />
                            </div>
                            <span className="text-[8px] font-mono font-black uppercase px-2 py-0.5 rounded bg-slate-900/10 dark:bg-black/40 neon:bg-[#090014]/50 text-slate-800 dark:text-slate-350 neon:text-cyan-300 border border-slate-900/10 dark:border-white/10 neon:border-cyan-555/20">
                              {anime.rank}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1 bg-slate-900/10 dark:bg-black/40 neon:bg-[#090014]/50 px-2 py-0.5 rounded-full border border-slate-900/10 dark:border-white/10 neon:border-cyan-500/20 text-slate-855 dark:text-slate-300 neon:text-cyan-300 text-[9px] font-black tracking-wider uppercase">
                            <Star className="w-3 h-3 text-yellow-500 dark:text-yellow-400 neon:text-cyan-400 fill-current" />
                            {anime.rating}
                          </div>
                        </div>

                        {/* Title - Glowing Brand Gradient */}
                        <h4 className={`text-base font-black leading-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r ${anime.gradient}`}>
                          {anime.title}
                        </h4>

                        {/* Metadata tags */}
                        <div className="flex items-center gap-1.5 flex-wrap mb-2.5 select-none">
                          <span className="text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-slate-900/10 dark:bg-black/40 neon:bg-[#090014]/50 text-slate-750 dark:text-slate-350 neon:text-cyan-455 border border-slate-900/10 dark:border-white/10 neon:border-cyan-550/10">
                            {anime.genre}
                          </span>
                          <span className="text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-slate-900/10 dark:bg-black/40 neon:bg-[#090014]/50 text-slate-605 dark:text-slate-450 neon:text-cyan-300/40 border border-slate-900/10 dark:border-white/10 neon:border-cyan-550/10">
                            {anime.year}
                          </span>
                        </div>

                        {/* Detailed Description Tagline */}
                        <p className="text-slate-855 dark:text-slate-200 neon:text-cyan-100/80 text-[11px] leading-relaxed font-bold mb-3">
                          {anime.tagline}
                        </p>

                        {/* 💎 FUTURISTIC CHARACTER BRAND STAT BADGE (Glass Console style) */}
                        <div className="p-2 bg-slate-900/5 dark:bg-black/35 neon:bg-[#090014]/65 rounded-xl border border-slate-900/10 dark:border-white/10 neon:border-cyan-500/10 flex items-center justify-between text-[10px] backdrop-blur-sm">
                          <span className="text-slate-750 dark:text-slate-400 neon:text-cyan-400/85 font-mono uppercase tracking-wider text-[8px] flex items-center gap-1">
                            <Flame className={`w-3.5 h-3.5 text-transparent bg-clip-text bg-gradient-to-r ${anime.gradient} fill-current`} /> {anime.statLabel}
                          </span>
                          <span className={`font-black text-transparent bg-clip-text bg-gradient-to-r ${anime.gradient} font-mono tracking-wide`}>
                            {anime.statValue}
                          </span>
                        </div>
                      </div>

                      {/* Explore Action button */}
                      <div className="mt-3 pt-2 border-t border-slate-200/45 dark:border-white/10 neon:border-cyan-950/20 flex items-center justify-between text-[9px] font-black">
                        <span className="text-slate-605 dark:text-slate-455 neon:text-cyan-350/35 uppercase tracking-widest">
                          #{anime.id.toString().padStart(2, "0")} ARCHIVE
                        </span>
                        
                        {/* EXPLORE Button - Styled with signature border glowing shadows */}
                        <div className={`px-4 py-1.5 rounded-xl bg-slate-900/90 dark:bg-white neon:bg-cyan-950/30 text-white dark:text-slate-900 neon:text-cyan-300 border border-white/25 dark:border-transparent neon:border-cyan-500/40 hover:shadow-[0_0_12px_rgba(0,0,0,0.15)] group-hover:scale-105 active:scale-95 transition-all shadow-sm flex items-center gap-1 cursor-pointer transform-gpu`}>
                          EXPLORE <Sparkles className={`w-3 h-3 text-transparent bg-clip-text bg-gradient-to-r ${anime.gradient} fill-current`} />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More / Show Less Interactive Button */}
        {filteredAnime.length > INITIAL_LIMIT && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => {
                if (showAll) {
                  setShowAll(false);
                  const el = document.getElementById("archive");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                } else {
                  setShowAll(true);
                }
              }}
              className="px-8 py-4 bg-slate-900 dark:bg-white neon:bg-cyan-950/20 text-white dark:text-slate-950 neon:text-cyan-300 font-black uppercase tracking-wider rounded-2xl border border-slate-250 dark:border-slate-800 neon:border-cyan-500/40 hover:scale-105 active:scale-95 transition-all shadow-md flex items-center gap-2 transform-gpu cursor-pointer"
            >
              {showAll ? (
                <>
                  Show Less <Sparkles className="w-4 h-4 text-orange-500 dark:text-pink-500 neon:text-cyan-400 rotate-180" />
                </>
              ) : (
                <>
                  Show More ({filteredAnime.length - INITIAL_LIMIT} Remaining) <Sparkles className="w-4 h-4 text-orange-500 dark:text-pink-500 neon:text-cyan-400" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Empty state if search has no results */}
        {filteredAnime.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white/20 dark:bg-slate-900/20 neon:bg-[#12002b]/20 border border-dashed border-slate-300 dark:border-slate-855 neon:border-cyan-500/30 rounded-3xl max-w-xl mx-auto"
          >
            <Compass className="w-12 h-12 text-slate-400 neon:text-cyan-500 mx-auto mb-4 animate-spin [animation-duration:10s]" />
            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 neon:text-cyan-100">No Anime Found</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 neon:text-cyan-300/50 mt-1">Try modifying your search or select a different legacy tab.</p>
          </motion.div>
        )}

      </div>
    </section>
  );
}
