"use client";

import { motion } from "framer-motion";
import { Moon, Play, Clock } from "lucide-react";

const PICKS = [
  {
    id: 1,
    title: "Summer Days with You",
    ep: "Ep. 8 — Sunset Confession",
    time: "Tonight 9:00 PM",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=70&w=500&auto=format&fit=crop&fm=webp",
    tag: "Romance",
    hot: true,
  },
  {
    id: 2,
    title: "Neon Cyber Pulse",
    ep: "Ep. 5 — Grid Breaker",
    time: "Tonight 10:30 PM",
    image:
      "https://images.unsplash.com/photo-1541562232579-512a21360020?q=70&w=500&auto=format&fit=crop&fm=webp",
    tag: "Action",
    hot: false,
  },
  {
    id: 3,
    title: "Blade of the Fallen Sun",
    ep: "Ep. 12 — Duel at Dusk",
    time: "Tonight 8:00 PM",
    image:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=70&w=500&auto=format&fit=crop&fm=webp",
    tag: "Historical",
    hot: true,
  },
  {
    id: 4,
    title: "Spirits of Kyoto",
    ep: "Ep. 3 — Lantern Path",
    time: "Tonight 11:00 PM",
    image:
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=70&w=500&auto=format&fit=crop&fm=webp",
    tag: "Mystery",
    hot: false,
  },
  {
    id: 5,
    title: "Beach Volleyball Club",
    ep: "Ep. 1 — Premiere",
    time: "Tonight 7:00 PM",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=70&w=500&auto=format&fit=crop&fm=webp",
    tag: "Sports",
    hot: true,
  },
];

export default function TonightPicks() {
  return (
    <section
      id="tonight"
      className="py-20 relative overflow-hidden bg-sky-50 dark:bg-slate-950 neon:bg-[#090014] transition-colors duration-300"
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400/15 dark:bg-orange-500/10 neon:bg-fuchsia-500/15 rounded-full blur-[90px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-orange-500 dark:text-pink-400 neon:text-cyan-400 font-black uppercase tracking-widest text-xs mb-2">
              <Moon className="w-4 h-4" /> Watch Tonight
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white neon:text-cyan-50 tracking-tight">
              Your evening{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-orange-500 neon:from-cyan-400 neon:to-fuchsia-500">
                lineup
              </span>
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 neon:text-cyan-100/60 text-sm font-medium max-w-xs">
            Swipe through premieres airing tonight — set your reminders!
          </p>
        </motion.div>

        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scroll-smooth -mx-4 px-4 md:mx-0 md:px-0">
          {PICKS.map((pick, i) => (
            <motion.article
              key={pick.id}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ y: -6 }}
              className="snap-center shrink-0 w-[260px] md:w-[280px] group card-glow rounded-3xl overflow-hidden bg-white dark:bg-slate-900 neon:bg-[#12002b] border-2 border-sky-100 dark:border-slate-800 neon:border-fuchsia-900/50 cursor-pointer"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={pick.image}
                  alt={pick.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                {pick.hot && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-red-500 text-white text-[10px] font-black uppercase tracking-wider animate-pulse">
                    Hot
                  </span>
                )}
                <span className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-[10px] font-black uppercase text-orange-300 neon:text-cyan-300">
                  {pick.tag}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900 dark:text-white neon:text-cyan-50 text-lg leading-tight mb-1">
                  {pick.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 neon:text-cyan-300/60 font-medium mb-3 line-clamp-1">
                  {pick.ep}
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-orange-600 dark:text-pink-400 neon:text-cyan-400">
                    <Clock className="w-3.5 h-3.5" />
                    {pick.time}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      document.querySelector("#trailers")?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="p-2 rounded-full bg-orange-500 dark:bg-pink-500 neon:bg-cyan-500 text-white hover:scale-110 transition-transform cursor-pointer"
                    aria-label={`Watch ${pick.title}`}
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
