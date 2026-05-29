"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, ThumbsUp, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

interface Review {
  id: number;
  user: string;
  avatar: string;
  anime: string;
  rating: number;
  text: string;
  likes: number;
  time: string;
  tag: string;
  tagColor: string;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    user: "SakuraDreamer",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=sakura&backgroundColor=ffdfbf",
    anime: "Summer Days with You",
    rating: 5,
    text: "Absolutely breathtaking. The beach scenes hit different in summer — every frame feels like a painting. The OST alone made me cry twice. This is peak slice-of-life.",
    likes: 342,
    time: "2 hours ago",
    tag: "Romance",
    tagColor: "bg-pink-100 dark:bg-pink-950/40 neon:bg-fuchsia-950/40 text-pink-600 dark:text-pink-400 neon:text-fuchsia-400 border-pink-200 dark:border-pink-500/30 neon:border-fuchsia-500/30",
  },
  {
    id: 2,
    user: "NeonHacker_X",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=neon&backgroundColor=b6e3f4",
    anime: "Neon Cyber Pulse",
    rating: 5,
    text: "The cyberpunk aesthetic is unmatched this season. Kai's character arc in episode 7 was genuinely shocking. The animation studio went all out on the hacking sequences.",
    likes: 289,
    time: "5 hours ago",
    tag: "Sci-Fi",
    tagColor: "bg-cyan-100 dark:bg-cyan-950/40 neon:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 neon:text-cyan-400 border-cyan-200 dark:border-cyan-500/30 neon:border-cyan-500/30",
  },
  {
    id: 3,
    user: "KyotoFoxSpirit",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=kyoto&backgroundColor=d1d4f9",
    anime: "Spirits of Kyoto Festival",
    rating: 4,
    text: "Rei's character design is stunning and the festival atmosphere is immaculate. Docked one star because episode 4 pacing felt rushed, but the finale more than made up for it.",
    likes: 198,
    time: "1 day ago",
    tag: "Supernatural",
    tagColor: "bg-emerald-100 dark:bg-emerald-950/40 neon:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 neon:text-emerald-400 border-emerald-200 dark:border-emerald-500/30 neon:border-emerald-500/30",
  },
  {
    id: 4,
    user: "SamuraiWatcher",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=samurai&backgroundColor=ffd5dc",
    anime: "Blade of the Fallen Sun",
    rating: 5,
    text: "The sword choreography is on another level. Every duel feels weighty and meaningful. The historical accuracy mixed with anime flair is exactly what I needed this summer.",
    likes: 415,
    time: "2 days ago",
    tag: "Action",
    tagColor: "bg-orange-100 dark:bg-orange-950/40 neon:bg-orange-950/40 text-orange-600 dark:text-orange-400 neon:text-orange-400 border-orange-200 dark:border-orange-500/30 neon:border-orange-500/30",
  },
  {
    id: 5,
    user: "AnimeMaestro99",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=maestro&backgroundColor=c0aede",
    anime: "Summer Days with You",
    rating: 4,
    text: "A slow burn that rewards patience. The character development is some of the best I've seen in years. The summer setting makes everything feel warm and nostalgic.",
    likes: 167,
    time: "3 days ago",
    tag: "Romance",
    tagColor: "bg-pink-100 dark:bg-pink-950/40 neon:bg-fuchsia-950/40 text-pink-600 dark:text-pink-400 neon:text-fuchsia-400 border-pink-200 dark:border-pink-500/30 neon:border-fuchsia-500/30",
  },
  {
    id: 6,
    user: "WaveRider_Otaku",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=wave&backgroundColor=ffe4b5",
    anime: "Neon Cyber Pulse",
    rating: 5,
    text: "Best opening theme of the season, no contest. The world-building is dense but rewarding. Episode 9 cliffhanger had me screaming at my screen.",
    likes: 523,
    time: "4 days ago",
    tag: "Sci-Fi",
    tagColor: "bg-cyan-100 dark:bg-cyan-950/40 neon:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 neon:text-cyan-400 border-cyan-200 dark:border-cyan-500/30 neon:border-cyan-500/30",
  },
];

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const sz = size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${sz} transition-colors ${
            i < rating
              ? "text-yellow-400 fill-yellow-400 dark:text-yellow-300 dark:fill-yellow-300 neon:text-cyan-400 neon:fill-cyan-400"
              : "text-slate-300 dark:text-slate-700 neon:text-slate-700"
          }`}
        />
      ))}
    </div>
  );
}

export default function AnimeReviewWall() {
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const toggleLike = (id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const visibleReviews = showAll ? REVIEWS : REVIEWS.slice(0, 3);

  return (
    <section
      id="reviews"
      className="py-24 bg-sky-50 dark:bg-slate-900 neon:bg-[#090014] relative overflow-hidden transition-colors duration-300"
    >
      {/* Decorative orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300/20 dark:bg-pink-600/10 neon:bg-fuchsia-600/15 rounded-full blur-[100px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-300/20 dark:bg-orange-600/10 neon:bg-cyan-600/15 rounded-full blur-[80px] pointer-events-none transform-gpu" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-pink-950/40 neon:bg-cyan-950/40 text-orange-600 dark:text-pink-400 neon:text-cyan-400 text-xs font-black uppercase tracking-widest mb-4 border border-orange-200 dark:border-pink-500/30 neon:border-cyan-500/30">
            <MessageSquare className="w-4 h-4" /> Fan Reviews
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white neon:text-cyan-50 tracking-tight mb-3">
            What the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500 text-shimmer">
              Community
            </span>{" "}
            Says
          </h2>
          <p className="text-slate-600 dark:text-slate-400 neon:text-cyan-100/60 max-w-xl mx-auto font-medium">
            Real takes from real fans — no spoilers, all vibes.
          </p>
        </motion.div>

        {/* Overall rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 p-6 rounded-3xl bg-white/70 dark:bg-slate-900/60 neon:bg-[#12002b]/60 border border-sky-100 dark:border-slate-800 neon:border-cyan-500/20 backdrop-blur-sm max-w-2xl mx-auto shadow-sm"
        >
          <div className="text-center">
            <p className="font-display text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500">
              4.8
            </p>
            <StarRating rating={5} size="lg" />
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 neon:text-cyan-300/60 mt-1">
              Overall Score
            </p>
          </div>
          <div className="w-px h-16 bg-slate-200 dark:bg-slate-800 neon:bg-cyan-500/20 hidden sm:block" />
          <div className="flex flex-col gap-2 w-full max-w-xs">
            {[
              { label: "Story", pct: 96 },
              { label: "Animation", pct: 98 },
              { label: "Music", pct: 94 },
              { label: "Characters", pct: 97 },
            ].map((bar) => (
              <div key={bar.label} className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 neon:text-cyan-300/60 w-20 shrink-0">
                  {bar.label}
                </span>
                <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 neon:bg-[#1a0b2e] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${bar.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 dark:from-pink-500 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500 rounded-full"
                  />
                </div>
                <span className="text-[10px] font-black text-slate-700 dark:text-slate-300 neon:text-cyan-200 w-8 text-right">
                  {bar.pct}%
                </span>
              </div>
            ))}
          </div>
          <div className="w-px h-16 bg-slate-200 dark:bg-slate-800 neon:bg-cyan-500/20 hidden sm:block" />
          <div className="text-center">
            <p className="font-display text-4xl font-extrabold text-slate-900 dark:text-white neon:text-cyan-50">
              {REVIEWS.length}K+
            </p>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 neon:text-cyan-300/60 mt-1">
              Reviews
            </p>
          </div>
        </motion.div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {visibleReviews.map((review, i) => (
              <motion.article
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group card-glow relative flex flex-col gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 neon:bg-[#12002b] border border-sky-100 dark:border-slate-800 neon:border-fuchsia-900/50 hover:border-orange-300 dark:hover:border-pink-500/40 neon:hover:border-cyan-400/50 transition-colors duration-300 shadow-sm"
              >
                {/* Sparkle accent top-right */}
                <Sparkles className="absolute top-4 right-4 w-4 h-4 text-orange-300/40 dark:text-pink-400/30 neon:text-cyan-400/30 group-hover:text-orange-400/70 dark:group-hover:text-pink-400/60 neon:group-hover:text-cyan-400/60 transition-colors duration-300" />

                {/* User info */}
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.user}
                    className="w-10 h-10 rounded-full border-2 border-sky-200 dark:border-slate-700 neon:border-cyan-500/40 bg-sky-100 dark:bg-slate-800"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm text-slate-900 dark:text-white neon:text-cyan-50 truncate">
                      {review.user}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 neon:text-cyan-300/50 uppercase tracking-wider">
                      {review.time}
                    </p>
                  </div>
                  <StarRating rating={review.rating} />
                </div>

                {/* Anime + tag */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-black text-slate-700 dark:text-slate-300 neon:text-cyan-100 truncate">
                    {review.anime}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${review.tagColor}`}
                  >
                    {review.tag}
                  </span>
                </div>

                {/* Review text */}
                <p className="text-sm text-slate-600 dark:text-slate-400 neon:text-cyan-100/70 leading-relaxed font-medium flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Like button */}
                <button
                  onClick={() => toggleLike(review.id)}
                  className={`self-start flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border transition-all duration-300 cursor-pointer active:scale-95 ${
                    likedIds.has(review.id)
                      ? "bg-orange-500 dark:bg-pink-500 neon:bg-cyan-500 text-white border-transparent shadow-md"
                      : "bg-sky-50 dark:bg-slate-800 neon:bg-[#090014] text-slate-600 dark:text-slate-400 neon:text-cyan-400 border-sky-200 dark:border-slate-700 neon:border-cyan-500/30 hover:border-orange-300 dark:hover:border-pink-500/40 neon:hover:border-cyan-400"
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  {review.likes + (likedIds.has(review.id) ? 1 : 0)}
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Show more / less */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll((v) => !v)}
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-white dark:bg-slate-900 neon:bg-[#12002b] border-2 border-sky-200 dark:border-slate-700 neon:border-cyan-500/40 text-slate-700 dark:text-slate-300 neon:text-cyan-300 font-black text-xs uppercase tracking-widest hover:border-orange-400 dark:hover:border-pink-500 neon:hover:border-cyan-400 transition-colors duration-300 shadow-sm cursor-pointer"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Load More Reviews <ChevronDown className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
