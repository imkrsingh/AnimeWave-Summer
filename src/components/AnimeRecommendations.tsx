"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, ChevronRight, RefreshCw } from "lucide-react";

interface RecommendedAnime {
  id: number;
  title: string;
  genre: string;
  rating: number;
  match: number;
  reason: string;
  image: string;
  episodes: number;
  tag: string;
  tagColor: string;
}

const ALL_RECOMMENDATIONS: RecommendedAnime[] = [
  {
    id: 1,
    title: "Tidal Hearts",
    genre: "Romance / Drama",
    rating: 4.8,
    match: 98,
    reason: "Because you love Summer Days with You",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=70&w=600&auto=format&fit=crop&fm=webp",
    episodes: 12,
    tag: "Romance",
    tagColor: "bg-pink-100 dark:bg-pink-950/40 neon:bg-fuchsia-950/40 text-pink-600 dark:text-pink-400 neon:text-fuchsia-400 border-pink-200 dark:border-pink-500/30 neon:border-fuchsia-500/30",
  },
  {
    id: 2,
    title: "Grid Zero",
    genre: "Sci-Fi / Thriller",
    rating: 4.9,
    match: 95,
    reason: "Fans of Neon Cyber Pulse also watched this",
    image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=70&w=600&auto=format&fit=crop&fm=webp",
    episodes: 24,
    tag: "Sci-Fi",
    tagColor: "bg-cyan-100 dark:bg-cyan-950/40 neon:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 neon:text-cyan-400 border-cyan-200 dark:border-cyan-500/30 neon:border-cyan-500/30",
  },
  {
    id: 3,
    title: "Lantern & Ash",
    genre: "Supernatural / Fantasy",
    rating: 4.7,
    match: 93,
    reason: "Similar vibe to Spirits of Kyoto Festival",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=70&w=600&auto=format&fit=crop&fm=webp",
    episodes: 13,
    tag: "Supernatural",
    tagColor: "bg-emerald-100 dark:bg-emerald-950/40 neon:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 neon:text-emerald-400 border-emerald-200 dark:border-emerald-500/30 neon:border-emerald-500/30",
  },
  {
    id: 4,
    title: "Iron Monsoon",
    genre: "Action / Historical",
    rating: 4.8,
    match: 91,
    reason: "Top pick for Blade of the Fallen Sun fans",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=70&w=600&auto=format&fit=crop&fm=webp",
    episodes: 26,
    tag: "Action",
    tagColor: "bg-orange-100 dark:bg-orange-950/40 neon:bg-orange-950/40 text-orange-600 dark:text-orange-400 neon:text-orange-400 border-orange-200 dark:border-orange-500/30 neon:border-orange-500/30",
  },
  {
    id: 5,
    title: "Starwave Academy",
    genre: "Comedy / School",
    rating: 4.6,
    match: 89,
    reason: "Trending in your region this week",
    image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?q=70&w=600&auto=format&fit=crop&fm=webp",
    episodes: 12,
    tag: "Comedy",
    tagColor: "bg-yellow-100 dark:bg-yellow-950/40 neon:bg-yellow-950/40 text-yellow-600 dark:text-yellow-500 neon:text-yellow-400 border-yellow-200 dark:border-yellow-500/30 neon:border-yellow-500/30",
  },
  {
    id: 6,
    title: "Phantom Shore",
    genre: "Mystery / Horror",
    rating: 4.7,
    match: 87,
    reason: "Hidden gem of Summer 2026",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=70&w=600&auto=format&fit=crop&fm=webp",
    episodes: 11,
    tag: "Mystery",
    tagColor: "bg-purple-100 dark:bg-purple-950/40 neon:bg-purple-950/40 text-purple-600 dark:text-purple-400 neon:text-purple-400 border-purple-200 dark:border-purple-500/30 neon:border-purple-500/30",
  },
];

export default function AnimeRecommendations() {
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const displayed = ALL_RECOMMENDATIONS.slice(refreshKey % 2 === 0 ? 0 : 2, (refreshKey % 2 === 0 ? 0 : 2) + 4);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setRefreshKey((k) => k + 1);
      setIsRefreshing(false);
    }, 600);
  };

  const toggleSave = (id: number) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section
      id="recommendations"
      className="py-24 bg-white dark:bg-slate-950 neon:bg-[#090014] relative overflow-hidden transition-colors duration-300"
    >
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300/15 dark:bg-purple-600/10 neon:bg-fuchsia-600/15 rounded-full blur-[100px] pointer-events-none transform-gpu" />
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
              <Sparkles className="w-4 h-4" /> Recommended For You
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white neon:text-cyan-50 tracking-tight mb-3">
              You Might{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500 text-shimmer">
                Also Like
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 neon:text-cyan-100/60 max-w-xl font-medium">
              Handpicked based on your watch history and trending picks this season.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="flex items-center gap-2 px-5 py-3 rounded-full border-2 border-slate-200 dark:border-slate-700 neon:border-cyan-500/40 text-slate-600 dark:text-slate-300 neon:text-cyan-400 font-black text-xs uppercase tracking-wider hover:border-orange-400 dark:hover:border-pink-500 neon:hover:border-cyan-400 transition-colors cursor-pointer shrink-0 bg-white dark:bg-slate-900 neon:bg-[#12002b] shadow-sm"
          >
            <motion.span
              animate={{ rotate: isRefreshing ? 360 : 0 }}
              transition={{ duration: 0.6, ease: "linear" }}
              className="inline-flex"
            >
              <RefreshCw className="w-4 h-4" />
            </motion.span>
            Refresh picks
          </motion.button>
        </motion.div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={refreshKey}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {displayed.map((anime, i) => (
              <motion.article
                key={anime.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group card-glow relative flex flex-col rounded-3xl overflow-hidden bg-sky-50 dark:bg-slate-900 neon:bg-[#12002b] border-2 border-sky-100 dark:border-slate-800 neon:border-fuchsia-900/50 hover:border-orange-300 dark:hover:border-pink-500/40 neon:hover:border-cyan-400/50 transition-all duration-300 shadow-sm hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={anime.image}
                    alt={anime.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                  {/* Match % badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 dark:from-pink-500 dark:to-orange-500 neon:from-cyan-500 neon:to-fuchsia-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                    <Sparkles className="w-2.5 h-2.5" />
                    {anime.match}% match
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-bold text-[10px]">{anime.rating}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 p-4 gap-3">
                  <div>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border mb-2 ${anime.tagColor}`}>
                      {anime.tag}
                    </span>
                    <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white neon:text-cyan-50 leading-tight mb-1">
                      {anime.title}
                    </h3>
                    <p className="text-[10px] font-bold text-orange-500 dark:text-pink-400 neon:text-fuchsia-400 uppercase tracking-wider">
                      {anime.genre} · {anime.episodes} eps
                    </p>
                  </div>

                  {/* Reason chip */}
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 neon:text-cyan-300/60 font-medium italic leading-snug flex-1">
                    "{anime.reason}"
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-auto">
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 dark:from-pink-500 dark:to-orange-500 neon:from-cyan-500 neon:to-fuchsia-600 text-white font-black text-[10px] uppercase tracking-wider cursor-pointer shadow-sm hover:shadow-md transition-shadow">
                      Watch <ChevronRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => toggleSave(anime.id)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black border-2 transition-all duration-300 cursor-pointer ${
                        saved.has(anime.id)
                          ? "bg-orange-500 dark:bg-pink-500 neon:bg-cyan-500 border-transparent text-white"
                          : "border-slate-200 dark:border-slate-700 neon:border-cyan-500/30 text-slate-500 dark:text-slate-400 neon:text-cyan-400 hover:border-orange-400 dark:hover:border-pink-500 neon:hover:border-cyan-400"
                      }`}
                      aria-label="Save"
                    >
                      {saved.has(anime.id) ? "✓" : "+"}
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
