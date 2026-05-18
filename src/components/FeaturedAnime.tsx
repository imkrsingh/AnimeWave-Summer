"use client";

import { motion } from "framer-motion";
import { Star, PlayCircle, Sun } from "lucide-react";

const ANIME_LIST = [
  {
    id: 1,
    title: "Summer Days with You",
    genre: "Romance / Slice of Life",
    rating: 4.9,
    description: "A breathtaking summer romance unfolding by the ocean side.",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2939&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Neon Cyber Pulse",
    genre: "Sci-Fi / Action",
    rating: 4.8,
    description: "In a world ruled by megacorporations, one hacker seeks the ultimate truth.",
    image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=2574&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Spirits of Kyoto Festival",
    genre: "Supernatural / Mystery",
    rating: 4.7,
    description: "A heartwarming tale of a boy who can see the spirits lingering during the summer festival.",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=2874&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Blade of the Fallen Sun",
    genre: "Action / Historical",
    rating: 4.9,
    description: "A disgraced samurai seeks redemption in an era of chaos under the scorching summer sun.",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=2787&auto=format&fit=crop",
  }
];

export default function FeaturedAnime() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 neon:bg-[#090014] relative overflow-hidden transition-colors duration-300">
      {/* Decorative background elements - optimized with transform-gpu and smaller blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300/30 dark:bg-pink-600/10 neon:bg-fuchsia-600/20 rounded-full blur-[80px] pointer-events-none transform-gpu translate-z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-300/30 dark:bg-blue-600/10 neon:bg-cyan-600/20 rounded-full blur-[80px] pointer-events-none transform-gpu translate-z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 transform-gpu"
        >
          <div>
            <div className="flex items-center gap-2 mb-2 text-orange-500 neon:text-cyan-400 font-bold uppercase tracking-wider text-sm">
              <Sun className="w-5 h-5" /> Hot Releases
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white neon:text-cyan-50 mb-4">
              Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-orange-400 dark:to-pink-500 neon:from-cyan-400 neon:to-fuchsia-500">This Summer</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 neon:text-cyan-100/70 max-w-2xl text-lg font-medium">
              Check out the most anticipated shows dropping this sunny season. Grab an ice cream and dive in!
            </p>
          </div>
          <button className="text-blue-600 dark:text-pink-400 neon:text-cyan-400 hover:text-blue-500 dark:hover:text-pink-300 neon:hover:text-cyan-300 font-bold flex items-center gap-2 transition-colors">
            View full lineup <PlayCircle className="w-5 h-5" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ANIME_LIST.map((anime, index) => (
            <motion.div
              key={anime.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="group relative rounded-3xl overflow-hidden bg-sky-50 dark:bg-slate-900 neon:bg-[#12002b] border-2 border-sky-100 dark:border-slate-800 neon:border-fuchsia-900 hover:border-orange-400 dark:hover:border-pink-500/50 neon:hover:border-cyan-400 transition-colors duration-300 shadow-lg transform-gpu"
            >
              <div className="relative h-[400px] w-full overflow-hidden transform-gpu">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 neon:from-[#090014] via-slate-900/40 neon:via-[#090014]/40 to-transparent z-10"></div>
                <img
                  src={anime.image}
                  alt={anime.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform-gpu group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform"
                />
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-white/90 dark:bg-black/60 neon:bg-fuchsia-900/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-yellow-400/30 dark:border-white/10 neon:border-cyan-400/50 shadow-sm">
                  <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400 neon:text-cyan-400 fill-yellow-500 dark:fill-yellow-400 neon:fill-cyan-400" />
                  <span className="text-slate-900 dark:text-white neon:text-cyan-100 font-bold text-sm">{anime.rating}</span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-6 z-20 transform-gpu translate-y-4 group-hover:translate-y-0 transition-transform duration-300 will-change-transform">
                <p className="text-orange-500 dark:text-pink-400 neon:text-fuchsia-400 text-xs font-black uppercase tracking-widest mb-2">
                  {anime.genre}
                </p>
                <h3 className="text-2xl font-black text-white mb-2 leading-tight">
                  {anime.title}
                </h3>
                <p className="text-sky-100 dark:text-slate-300 neon:text-cyan-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2 font-medium">
                  {anime.description}
                </p>
                
                <button className="mt-4 w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 dark:bg-white/10 dark:hover:bg-pink-500 neon:bg-[#090014] neon:border neon:border-cyan-400 neon:hover:bg-cyan-400 neon:text-cyan-400 neon:hover:text-[#090014] text-white dark:text-pink-400 dark:hover:text-white font-bold transition-colors duration-300 opacity-0 group-hover:opacity-100">
                  Watch Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
