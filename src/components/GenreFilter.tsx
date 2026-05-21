"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";

export type AnimeItem = {
  id: number;
  title: string;
  genre: string;
  rating: number;
  description: string;
  image: string;
};

const GENRES = ["All", "Romance", "Sci-Fi", "Supernatural", "Action"] as const;

type GenreFilterProps = {
  animeList: AnimeItem[];
  renderCard: (anime: AnimeItem, index: number) => ReactNode;
};

function matchesGenre(genre: string, filter: string): boolean {
  if (filter === "All") return true;
  return genre.toLowerCase().includes(filter.toLowerCase());
}

export default function GenreFilter({ animeList, renderCard }: GenreFilterProps) {
  const [activeGenre, setActiveGenre] = useState<string>("All");

  const filtered = animeList.filter((a) => matchesGenre(a.genre, activeGenre));

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-10">
        <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 neon:text-cyan-300/60 mr-2">
          <Filter className="w-4 h-4" /> Filter
        </span>
        {GENRES.map((genre) => {
          const isActive = activeGenre === genre;
          return (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`relative px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                isActive
                  ? "text-slate-950 dark:text-white neon:text-cyan-300 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 neon:text-cyan-400/50 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/50 neon:hover:bg-cyan-950/30"
              }`}
            >
              {genre}
              {isActive && (
                <motion.span
                  layoutId="genreFilterPill"
                  className="absolute inset-0 bg-orange-100 dark:bg-slate-800 neon:bg-cyan-950/40 rounded-full border border-orange-300 dark:border-pink-500/40 neon:border-cyan-400/50 neon:shadow-[0_0_12px_rgba(34,211,238,0.2)] -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeGenre}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {filtered.length > 0 ? (
          filtered.map((anime, index) => renderCard(anime, index))
        ) : (
          <p className="col-span-full text-center py-12 text-slate-500 dark:text-slate-400 neon:text-cyan-300/60 font-medium">
            No shows in this genre yet — try another filter!
          </p>
        )}
      </motion.div>
    </>
  );
}
