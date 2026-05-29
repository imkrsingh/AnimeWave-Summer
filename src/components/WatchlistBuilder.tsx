"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, BookmarkCheck, Star, Play, Trash2, ListVideo, Plus } from "lucide-react";

interface AnimeEntry {
  id: number;
  title: string;
  genre: string;
  rating: number;
  episodes: number;
  status: "Airing" | "Finished" | "Upcoming";
  image: string;
  statusColor: string;
}

const ANIME_CATALOG: AnimeEntry[] = [
  {
    id: 1,
    title: "Summer Days with You",
    genre: "Romance / Slice of Life",
    rating: 4.9,
    episodes: 12,
    status: "Airing",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=70&w=400&auto=format&fit=crop&fm=webp",
    statusColor: "bg-emerald-100 dark:bg-emerald-950/40 neon:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 neon:text-emerald-400 border-emerald-200 dark:border-emerald-500/30 neon:border-emerald-500/30",
  },
  {
    id: 2,
    title: "Neon Cyber Pulse",
    genre: "Sci-Fi / Action",
    rating: 4.8,
    episodes: 24,
    status: "Airing",
    image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=70&w=400&auto=format&fit=crop&fm=webp",
    statusColor: "bg-emerald-100 dark:bg-emerald-950/40 neon:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 neon:text-emerald-400 border-emerald-200 dark:border-emerald-500/30 neon:border-emerald-500/30",
  },
  {
    id: 3,
    title: "Spirits of Kyoto Festival",
    genre: "Supernatural / Mystery",
    rating: 4.7,
    episodes: 13,
    status: "Airing",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=70&w=400&auto=format&fit=crop&fm=webp",
    statusColor: "bg-emerald-100 dark:bg-emerald-950/40 neon:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 neon:text-emerald-400 border-emerald-200 dark:border-emerald-500/30 neon:border-emerald-500/30",
  },
  {
    id: 4,
    title: "Blade of the Fallen Sun",
    genre: "Action / Historical",
    rating: 4.9,
    episodes: 26,
    status: "Airing",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=70&w=400&auto=format&fit=crop&fm=webp",
    statusColor: "bg-emerald-100 dark:bg-emerald-950/40 neon:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 neon:text-emerald-400 border-emerald-200 dark:border-emerald-500/30 neon:border-emerald-500/30",
  },
  {
    id: 5,
    title: "Ocean Breeze Academy",
    genre: "Comedy / School",
    rating: 4.5,
    episodes: 12,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=70&w=400&auto=format&fit=crop&fm=webp",
    statusColor: "bg-orange-100 dark:bg-orange-950/40 neon:bg-orange-950/40 text-orange-600 dark:text-orange-400 neon:text-orange-400 border-orange-200 dark:border-orange-500/30 neon:border-orange-500/30",
  },
  {
    id: 6,
    title: "Starfall Chronicles",
    genre: "Fantasy / Adventure",
    rating: 4.6,
    episodes: 24,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?q=70&w=400&auto=format&fit=crop&fm=webp",
    statusColor: "bg-orange-100 dark:bg-orange-950/40 neon:bg-orange-950/40 text-orange-600 dark:text-orange-400 neon:text-orange-400 border-orange-200 dark:border-orange-500/30 neon:border-orange-500/30",
  },
];

export default function WatchlistBuilder() {
  const [watchlist, setWatchlist] = useState<Set<number>>(new Set([1, 3]));
  const [activeTab, setActiveTab] = useState<"all" | "watchlist">("all");

  const toggleWatchlist = (id: number) => {
    setWatchlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const displayList = activeTab === "watchlist"
    ? ANIME_CATALOG.filter((a) => watchlist.has(a.id))
    : ANIME_CATALOG;

  return (
    <section
      id="watchlist"
      className="py-24 bg-sky-50 dark:bg-slate-900 neon:bg-[#090014] relative overflow-hidden transition-colors duration-300"
    >
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300/20 dark:bg-pink-600/10 neon:bg-fuchsia-600/15 rounded-full blur-[100px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-300/20 dark:bg-blue-600/10 neon:bg-cyan-600/15 rounded-full blur-[80px] pointer-events-none transform-gpu" />

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
              <ListVideo className="w-4 h-4" /> My Watchlist
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white neon:text-cyan-50 tracking-tight mb-3">
              Build Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500 text-shimmer">
                Summer List
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 neon:text-cyan-100/60 max-w-xl font-medium">
              Bookmark the shows you want to watch this season. Never miss a premiere.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-slate-950 neon:bg-[#12002b] border border-sky-100 dark:border-slate-800 neon:border-fuchsia-900/40 shadow-sm shrink-0">
            {(["all", "watchlist"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === tab
                    ? "text-white"
                    : "text-slate-500 dark:text-slate-400 neon:text-cyan-400/60 hover:text-slate-800 dark:hover:text-white neon:hover:text-cyan-400"
                }`}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="watchlistTab"
                    className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 dark:from-pink-500 dark:to-orange-500 neon:from-cyan-500 neon:to-fuchsia-600 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {tab === "all" ? "All Shows" : `My List (${watchlist.size})`}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Empty watchlist state */}
        <AnimatePresence mode="wait">
          {activeTab === "watchlist" && watchlist.size === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-24 gap-4 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-sky-100 dark:bg-slate-800 neon:bg-[#12002b] border-2 border-sky-200 dark:border-slate-700 neon:border-cyan-500/30 flex items-center justify-center">
                <Bookmark className="w-8 h-8 text-slate-400 dark:text-slate-500 neon:text-cyan-400/50" />
              </div>
              <p className="font-display text-xl font-extrabold text-slate-700 dark:text-slate-300 neon:text-cyan-100">
                Your list is empty
              </p>
              <p className="text-slate-500 dark:text-slate-400 neon:text-cyan-300/60 text-sm font-medium max-w-xs">
                Browse all shows and hit the bookmark icon to add them here.
              </p>
              <button
                onClick={() => setActiveTab("all")}
                className="mt-2 flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 dark:from-pink-500 dark:to-orange-500 neon:from-cyan-500 neon:to-fuchsia-600 text-white font-black text-xs uppercase tracking-wider cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" /> Browse Shows
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              <AnimatePresence>
                {displayList.map((anime, i) => {
                  const inList = watchlist.has(anime.id);
                  return (
                    <motion.article
                      key={anime.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                      className="group card-glow relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 neon:bg-[#12002b] border-2 border-sky-100 dark:border-slate-800 neon:border-fuchsia-900/50 hover:border-orange-300 dark:hover:border-pink-500/40 neon:hover:border-cyan-400/50 transition-colors duration-300 shadow-sm"
                    >
                      {/* Image */}
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={anime.image}
                          alt={anime.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                        {/* Status badge */}
                        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${anime.statusColor}`}>
                          {anime.status}
                        </span>

                        {/* Bookmark button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleWatchlist(anime.id)}
                          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md ${
                            inList
                              ? "bg-orange-500 dark:bg-pink-500 neon:bg-cyan-500 text-white"
                              : "bg-white/80 dark:bg-slate-900/80 neon:bg-[#090014]/80 backdrop-blur-sm text-slate-600 dark:text-slate-300 neon:text-cyan-400 hover:bg-orange-500 hover:text-white dark:hover:bg-pink-500 neon:hover:bg-cyan-500"
                          }`}
                          aria-label={inList ? "Remove from watchlist" : "Add to watchlist"}
                        >
                          {inList ? (
                            <BookmarkCheck className="w-4 h-4" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </motion.button>

                        {/* Rating */}
                        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-white font-bold text-xs">{anime.rating}</span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-5">
                        <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white neon:text-cyan-50 mb-1 leading-tight">
                          {anime.title}
                        </h3>
                        <p className="text-xs font-bold text-orange-500 dark:text-pink-400 neon:text-fuchsia-400 uppercase tracking-wider mb-3">
                          {anime.genre}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500 dark:text-slate-400 neon:text-cyan-300/60 font-bold">
                            {anime.episodes} Episodes
                          </span>
                          <div className="flex items-center gap-2">
                            {inList && (
                              <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={() => toggleWatchlist(anime.id)}
                                className="p-1.5 rounded-full text-slate-400 hover:text-red-500 dark:hover:text-red-400 neon:hover:text-red-400 transition-colors cursor-pointer"
                                aria-label="Remove from watchlist"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </motion.button>
                            )}
                            <button className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 dark:from-pink-500 dark:to-orange-500 neon:from-cyan-500 neon:to-fuchsia-600 text-white font-black text-[10px] uppercase tracking-wider cursor-pointer shadow-sm hover:shadow-md transition-shadow">
                              <Play className="w-3 h-3" /> Watch
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
