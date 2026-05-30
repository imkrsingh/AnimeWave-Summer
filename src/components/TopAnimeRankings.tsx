"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, TrendingUp, TrendingDown, Minus, Star, Flame, ChevronRight } from "lucide-react";

type Trend = "up" | "down" | "same" | "new";

interface RankedAnime {
  rank: number;
  prevRank: number | null;
  title: string;
  genre: string;
  rating: number;
  votes: string;
  image: string;
  trend: Trend;
  trendVal: number;
  isNew?: boolean;
  hot?: boolean;
}

const WEEKLY: RankedAnime[] = [
  { rank: 1, prevRank: 2, title: "Neon Cyber Pulse", genre: "Sci-Fi / Action", rating: 4.9, votes: "128K", image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=70&w=200&auto=format&fit=crop&fm=webp", trend: "up", trendVal: 1, hot: true },
  { rank: 2, prevRank: 1, title: "Blade of the Fallen Sun", genre: "Action / Historical", rating: 4.9, votes: "115K", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=70&w=200&auto=format&fit=crop&fm=webp", trend: "down", trendVal: 1 },
  { rank: 3, prevRank: 3, title: "Summer Days with You", genre: "Romance / Slice of Life", rating: 4.8, votes: "98K", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=70&w=200&auto=format&fit=crop&fm=webp", trend: "same", trendVal: 0 },
  { rank: 4, prevRank: 6, title: "Spirits of Kyoto Festival", genre: "Supernatural", rating: 4.7, votes: "76K", image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=70&w=200&auto=format&fit=crop&fm=webp", trend: "up", trendVal: 2 },
  { rank: 5, prevRank: null, title: "Starfall Chronicles", genre: "Fantasy / Adventure", rating: 4.6, votes: "54K", image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?q=70&w=200&auto=format&fit=crop&fm=webp", trend: "new", trendVal: 0, isNew: true },
  { rank: 6, prevRank: 4, title: "Ocean Breeze Academy", genre: "Comedy / School", rating: 4.5, votes: "47K", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=70&w=200&auto=format&fit=crop&fm=webp", trend: "down", trendVal: 2 },
  { rank: 7, prevRank: 7, title: "Iron Monsoon", genre: "Action / Drama", rating: 4.7, votes: "43K", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=70&w=200&auto=format&fit=crop&fm=webp", trend: "same", trendVal: 0 },
  { rank: 8, prevRank: 10, title: "Tidal Hearts", genre: "Romance / Drama", rating: 4.8, votes: "38K", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=70&w=200&auto=format&fit=crop&fm=webp", trend: "up", trendVal: 2 },
  { rank: 9, prevRank: 8, title: "Grid Zero", genre: "Sci-Fi / Thriller", rating: 4.6, votes: "31K", image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=70&w=200&auto=format&fit=crop&fm=webp", trend: "down", trendVal: 1 },
  { rank: 10, prevRank: null, title: "Phantom Shore", genre: "Mystery / Horror", rating: 4.7, votes: "28K", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=70&w=200&auto=format&fit=crop&fm=webp", trend: "new", trendVal: 0, isNew: true },
];

const ALLTIME: RankedAnime[] = [...WEEKLY].sort((a, b) => b.rating - a.rating).map((a, i) => ({ ...a, rank: i + 1 }));

function TrendBadge({ trend, val }: { trend: Trend; val: number }) {
  if (trend === "new") return (
    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/40 neon:bg-cyan-950/40 text-orange-600 dark:text-orange-400 neon:text-cyan-400 text-[9px] font-black uppercase tracking-wider border border-orange-200 dark:border-orange-500/30 neon:border-cyan-500/30">
      NEW
    </span>
  );
  if (trend === "up") return (
    <span className="flex items-center gap-0.5 text-emerald-500 dark:text-emerald-400 neon:text-emerald-400 text-[10px] font-black">
      <TrendingUp className="w-3.5 h-3.5" /> +{val}
    </span>
  );
  if (trend === "down") return (
    <span className="flex items-center gap-0.5 text-red-500 dark:text-red-400 neon:text-red-400 text-[10px] font-black">
      <TrendingDown className="w-3.5 h-3.5" /> -{val}
    </span>
  );
  return (
    <span className="flex items-center gap-0.5 text-slate-400 dark:text-slate-500 neon:text-cyan-300/40 text-[10px] font-black">
      <Minus className="w-3.5 h-3.5" />
    </span>
  );
}

function RankMedal({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-lg">🥇</span>;
  if (rank === 2) return <span className="text-lg">🥈</span>;
  if (rank === 3) return <span className="text-lg">🥉</span>;
  return (
    <span className="font-display font-extrabold text-sm text-slate-500 dark:text-slate-400 neon:text-cyan-300/60 w-6 text-center">
      {rank}
    </span>
  );
}

export default function TopAnimeRankings() {
  const [tab, setTab] = useState<"weekly" | "alltime">("weekly");
  const list = tab === "weekly" ? WEEKLY : ALLTIME;

  return (
    <section
      id="rankings"
      className="py-24 bg-sky-50 dark:bg-slate-900 neon:bg-[#090014] relative overflow-hidden transition-colors duration-300"
    >
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-300/20 dark:bg-yellow-600/10 neon:bg-fuchsia-600/15 rounded-full blur-[100px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-300/15 dark:bg-pink-600/10 neon:bg-cyan-600/15 rounded-full blur-[80px] pointer-events-none transform-gpu" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-pink-950/40 neon:bg-cyan-950/40 text-orange-600 dark:text-pink-400 neon:text-cyan-400 text-xs font-black uppercase tracking-widest mb-4 border border-orange-200 dark:border-pink-500/30 neon:border-cyan-500/30">
              <Trophy className="w-4 h-4" /> Top Rankings
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white neon:text-cyan-50 tracking-tight mb-3">
              Top 10{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500 text-shimmer">
                This Season
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 neon:text-cyan-100/60 max-w-xl font-medium">
              Community-voted rankings updated every week. Cast your vote to move your favourite up.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-white dark:bg-slate-950 neon:bg-[#12002b] border border-sky-100 dark:border-slate-800 neon:border-fuchsia-900/40 shadow-sm shrink-0">
            {(["weekly", "alltime"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  tab === t ? "text-white" : "text-slate-500 dark:text-slate-400 neon:text-cyan-400/60 hover:text-slate-800 dark:hover:text-white neon:hover:text-cyan-400"
                }`}
              >
                {tab === t && (
                  <motion.span
                    layoutId="rankTab"
                    className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 dark:from-pink-500 dark:to-orange-500 neon:from-cyan-500 neon:to-fuchsia-600 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {t === "weekly" ? "This Week" : "All Time"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Rankings list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-3"
          >
            {list.map((anime, i) => (
              <motion.div
                key={`${tab}-${anime.rank}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 neon:bg-[#12002b] border border-sky-100 dark:border-slate-800 neon:border-fuchsia-900/40 hover:border-orange-300 dark:hover:border-pink-500/40 neon:hover:border-cyan-400/50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                {/* Rank */}
                <div className="w-8 flex items-center justify-center shrink-0">
                  <RankMedal rank={anime.rank} />
                </div>

                {/* Thumbnail */}
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={anime.image}
                    alt={anime.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-black text-sm text-slate-900 dark:text-white neon:text-cyan-50 truncate">
                      {anime.title}
                    </h3>
                    {anime.hot && (
                      <Flame className="w-3.5 h-3.5 text-orange-500 dark:text-pink-400 neon:text-cyan-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-[10px] font-bold text-orange-500 dark:text-pink-400 neon:text-fuchsia-400 uppercase tracking-wider truncate">
                    {anime.genre}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-black text-slate-700 dark:text-slate-300 neon:text-cyan-100">
                      {anime.rating}
                    </span>
                  </div>
                  <TrendBadge trend={anime.trend} val={anime.trendVal} />
                </div>

                <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 neon:text-cyan-400/30 group-hover:text-orange-400 dark:group-hover:text-pink-400 neon:group-hover:text-cyan-400 transition-colors shrink-0" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
