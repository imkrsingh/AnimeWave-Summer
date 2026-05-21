"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Tag } from "lucide-react";

const MERCH = [
  {
    id: 1,
    name: "Aiko Sunfire Hoodie",
    price: "$42",
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=70&w=500&auto=format&fit=crop&fm=webp",
  },
  {
    id: 2,
    name: "Summer Wave Poster Set",
    price: "$18",
    badge: "Limited",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=70&w=500&auto=format&fit=crop&fm=webp",
  },
  {
    id: 3,
    name: "Neon Cyber LED Cap",
    price: "$29",
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=70&w=500&auto=format&fit=crop&fm=webp",
  },
  {
    id: 4,
    name: "Beach Festival Tote",
    price: "$24",
    badge: "Eco",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac642aba85a?q=70&w=500&auto=format&fit=crop&fm=webp",
  },
];

export default function MerchDrop() {
  return (
    <section
      id="merch"
      className="py-24 relative overflow-hidden bg-sky-100 dark:bg-slate-900/80 neon:bg-[#0a0018] transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-orange-500 dark:text-pink-400 neon:text-cyan-400 font-black uppercase tracking-widest text-xs mb-2">
              <ShoppingBag className="w-4 h-4" /> Merch Drop
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white neon:text-cyan-50 tracking-tight">
              Summer{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 neon:from-cyan-400 neon:to-fuchsia-500">
                Collection
              </span>
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 neon:text-cyan-100/60 font-medium max-w-sm">
            Official AnimeWave merch — free shipping on orders over $50 this season.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {MERCH.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -8 }}
              className="group card-glow rounded-3xl overflow-hidden bg-white dark:bg-slate-900 neon:bg-[#12002b] border border-sky-100 dark:border-slate-800 neon:border-fuchsia-900/40 cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden bg-sky-50 dark:bg-slate-800">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500 dark:bg-pink-500 neon:bg-cyan-500 text-white text-[10px] font-black uppercase">
                  <Tag className="w-3 h-3" />
                  {item.badge}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900 dark:text-white neon:text-cyan-50 text-sm md:text-base leading-tight mb-2">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-extrabold text-orange-500 dark:text-pink-400 neon:text-cyan-400">
                    {item.price}
                  </span>
                  <button
                    type="button"
                    className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border-2 border-orange-400 dark:border-pink-500 neon:border-cyan-400 text-orange-600 dark:text-pink-400 neon:text-cyan-400 hover:bg-orange-500 hover:text-white dark:hover:bg-pink-500 neon:hover:bg-cyan-500 neon:hover:text-[#090014] transition-colors cursor-pointer"
                  >
                    Shop
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
