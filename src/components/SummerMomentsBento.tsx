"use client";

import { motion } from "framer-motion";
import { Camera, Sparkles, Heart, Zap } from "lucide-react";

const MOMENTS = [
  {
    id: "festival",
    title: "Kyoto Night Festival",
    tag: "Supernatural",
    image:
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=70&w=900&auto=format&fit=crop&fm=webp",
    span: "md:col-span-2 md:row-span-2",
    icon: Sparkles,
  },
  {
    id: "beach",
    title: "Golden Hour Beach",
    tag: "Romance",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=70&w=600&auto=format&fit=crop&fm=webp",
    span: "md:col-span-1",
    icon: Heart,
  },
  {
    id: "neon",
    title: "Neo-Tokyo Alley",
    tag: "Sci-Fi",
    image:
      "https://images.unsplash.com/photo-1541562232579-512a21360020?q=70&w=600&auto=format&fit=crop&fm=webp",
    span: "md:col-span-1",
    icon: Zap,
  },
  {
    id: "fireworks",
    title: "Summer Fireworks",
    tag: "Slice of Life",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=70&w=600&auto=format&fit=crop&fm=webp",
    span: "md:col-span-2",
    icon: Camera,
  },
];

export default function SummerMomentsBento() {
  return (
    <section
      id="moments"
      className="py-24 relative overflow-hidden bg-white dark:bg-slate-950 neon:bg-[#090014] transition-colors duration-300"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-400/10 dark:bg-pink-600/10 neon:bg-fuchsia-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-pink-950/40 neon:bg-cyan-950/40 text-orange-600 dark:text-pink-400 neon:text-cyan-400 text-xs font-black uppercase tracking-widest mb-4 border border-orange-200 dark:border-pink-500/30 neon:border-cyan-500/30">
            <Camera className="w-4 h-4" /> Summer Moments
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white neon:text-cyan-50 tracking-tight mb-3">
            Capture the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500 text-shimmer">
              Season
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 neon:text-cyan-100/60 max-w-xl mx-auto font-medium">
            Iconic scenes from this summer&apos;s hottest shows — tap to feel the vibe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[180px] md:auto-rows-[200px]">
          {MOMENTS.map((moment, i) => {
            const Icon = moment.icon;
            return (
              <motion.article
                key={moment.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                whileHover={{ scale: 1.02 }}
                className={`group relative rounded-3xl overflow-hidden card-glow cursor-pointer ${moment.span} min-h-[180px]`}
              >
                <img
                  src={moment.image}
                  alt={moment.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent z-10" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-orange-500/30 via-transparent to-cyan-500/20 z-[11] pointer-events-none" />

                <div className="absolute top-4 left-4 z-20 p-2 rounded-xl bg-white/20 dark:bg-black/30 neon:bg-[#090014]/50 backdrop-blur-md border border-white/20 neon:border-cyan-500/30">
                  <Icon className="w-5 h-5 text-white neon:text-cyan-300" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 dark:text-pink-400 neon:text-cyan-400 mb-1 block">
                    {moment.tag}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight">
                    {moment.title}
                  </h3>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
