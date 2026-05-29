"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Heart, X, ZoomIn, Award, ChevronLeft, ChevronRight } from "lucide-react";

interface ArtPiece {
  id: string;
  title: string;
  artist: string;
  anime: string;
  image: string;
  likes: number;
  featured?: boolean;
  span?: string;
}

const ART_PIECES: ArtPiece[] = [
  {
    id: "a1",
    title: "Sunfire Awakening",
    artist: "ArtByMiyu",
    anime: "Blade of the Fallen Sun",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=70&w=900&auto=format&fit=crop&fm=webp",
    likes: 2841,
    featured: true,
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: "a2",
    title: "Neon Midnight",
    artist: "CyberBrush_K",
    anime: "Neon Cyber Pulse",
    image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=70&w=600&auto=format&fit=crop&fm=webp",
    likes: 1923,
    span: "md:col-span-1",
  },
  {
    id: "a3",
    title: "Lantern Dreams",
    artist: "KyotoInk",
    anime: "Spirits of Kyoto Festival",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=70&w=600&auto=format&fit=crop&fm=webp",
    likes: 1654,
    span: "md:col-span-1",
  },
  {
    id: "a4",
    title: "Golden Shore",
    artist: "WaveArtist99",
    anime: "Summer Days with You",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=70&w=600&auto=format&fit=crop&fm=webp",
    likes: 3102,
    span: "md:col-span-2",
  },
  {
    id: "a5",
    title: "Starfall Horizon",
    artist: "CosmicPen",
    anime: "Starfall Chronicles",
    image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?q=70&w=600&auto=format&fit=crop&fm=webp",
    likes: 987,
    span: "md:col-span-1",
  },
  {
    id: "a6",
    title: "Ocean Breeze",
    artist: "SummerSketch",
    anime: "Ocean Breeze Academy",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=70&w=600&auto=format&fit=crop&fm=webp",
    likes: 1245,
    span: "md:col-span-1",
  },
];

export default function ArtGallerySpotlight() {
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set(["a1"]));
  const [lightboxId, setLightboxId] = useState<string | null>(null);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const lightboxPiece = ART_PIECES.find((p) => p.id === lightboxId);
  const lightboxIndex = ART_PIECES.findIndex((p) => p.id === lightboxId);

  const goLightboxPrev = () => {
    const prev = (lightboxIndex - 1 + ART_PIECES.length) % ART_PIECES.length;
    setLightboxId(ART_PIECES[prev].id);
  };
  const goLightboxNext = () => {
    const next = (lightboxIndex + 1) % ART_PIECES.length;
    setLightboxId(ART_PIECES[next].id);
  };

  return (
    <section
      id="fanart"
      className="py-24 bg-sky-50 dark:bg-slate-900 neon:bg-[#090014] relative overflow-hidden transition-colors duration-300"
    >
      {/* Decorative orbs */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-pink-300/20 dark:bg-pink-600/10 neon:bg-fuchsia-600/15 rounded-full blur-[100px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-orange-300/20 dark:bg-orange-600/10 neon:bg-cyan-600/15 rounded-full blur-[80px] pointer-events-none transform-gpu" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-pink-950/40 neon:bg-cyan-950/40 text-orange-600 dark:text-pink-400 neon:text-cyan-400 text-xs font-black uppercase tracking-widest mb-4 border border-orange-200 dark:border-pink-500/30 neon:border-cyan-500/30">
              <Palette className="w-4 h-4" /> Fan Art Gallery
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white neon:text-cyan-50 tracking-tight mb-3">
              Community{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500 text-shimmer">
                Creations
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 neon:text-cyan-100/60 max-w-xl font-medium">
              Incredible fan art from the AnimeWave community. Click any piece to view it in full.
            </p>
          </div>
          <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 neon:bg-[#12002b] border border-sky-100 dark:border-slate-800 neon:border-fuchsia-900/40 shadow-sm shrink-0">
            <Award className="w-5 h-5 text-orange-500 dark:text-pink-400 neon:text-cyan-400" />
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white neon:text-cyan-50">
                {ART_PIECES.reduce((s, p) => s + p.likes, 0).toLocaleString()}
              </p>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 neon:text-cyan-300/50 uppercase tracking-wider">
                Total Likes
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[200px]">
          {ART_PIECES.map((piece, i) => {
            const isLiked = likedIds.has(piece.id);
            return (
              <motion.article
                key={piece.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                onClick={() => setLightboxId(piece.id)}
                className={`group relative rounded-3xl overflow-hidden card-glow cursor-pointer ${piece.span ?? ""} min-h-[200px]`}
              >
                <img
                  src={piece.image}
                  alt={piece.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent z-10" />
                {/* Hover color overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-orange-500/25 via-transparent to-cyan-500/20 dark:from-pink-500/25 neon:from-cyan-500/25 neon:to-fuchsia-500/20 z-[11] pointer-events-none" />

                {/* Featured badge */}
                {piece.featured && (
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500 dark:bg-pink-500 neon:bg-cyan-500 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                    <Award className="w-3 h-3" /> Featured
                  </div>
                )}

                {/* Zoom icon on hover */}
                <div className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/20 dark:bg-black/30 neon:bg-[#090014]/50 backdrop-blur-md border border-white/20 neon:border-cyan-500/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-4 h-4 text-white neon:text-cyan-300" />
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-20 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange-400 dark:text-pink-400 neon:text-cyan-400 mb-0.5">
                      {piece.anime}
                    </p>
                    <h3 className="font-display text-lg font-extrabold text-white leading-tight">
                      {piece.title}
                    </h3>
                    <p className="text-xs text-white/60 font-bold mt-0.5">by {piece.artist}</p>
                  </div>
                  <button
                    onClick={(e) => toggleLike(piece.id, e)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-black transition-all duration-300 cursor-pointer active:scale-90 ${
                      isLiked
                        ? "bg-pink-500 dark:bg-pink-500 neon:bg-fuchsia-500 text-white shadow-md"
                        : "bg-white/20 backdrop-blur-sm text-white hover:bg-pink-500 hover:text-white"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-white" : ""}`} />
                    {piece.likes + (isLiked ? 1 : 0)}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxPiece && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxId(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-[2rem] overflow-hidden shadow-2xl border-2 border-white/10 neon:border-cyan-400/40"
            >
              <img
                src={lightboxPiece.image}
                alt={lightboxPiece.title}
                className="w-full max-h-[70vh] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />

              {/* Close */}
              <button
                onClick={() => setLightboxId(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next */}
              <button
                onClick={goLightboxPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goLightboxNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Info bar */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between z-10">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-orange-400 dark:text-pink-400 neon:text-cyan-400 mb-1">
                    {lightboxPiece.anime}
                  </p>
                  <h3 className="font-display text-2xl font-extrabold text-white">{lightboxPiece.title}</h3>
                  <p className="text-sm text-white/60 font-bold mt-0.5">by {lightboxPiece.artist}</p>
                </div>
                <button
                  onClick={(e) => toggleLike(lightboxPiece.id, e)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full font-black text-sm transition-all duration-300 cursor-pointer active:scale-95 ${
                    likedIds.has(lightboxPiece.id)
                      ? "bg-pink-500 text-white shadow-lg"
                      : "bg-white/20 backdrop-blur-sm text-white hover:bg-pink-500"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${likedIds.has(lightboxPiece.id) ? "fill-white" : ""}`} />
                  {lightboxPiece.likes + (likedIds.has(lightboxPiece.id) ? 1 : 0)}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
