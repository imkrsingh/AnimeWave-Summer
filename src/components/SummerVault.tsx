"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ShoppingBag, Check, ShieldCheck, HelpCircle } from "lucide-react";
import { useState } from "react";

const MERCH_ITEMS = [
  {
    id: 1,
    name: "Aiko Tanaka: 1/7 Scale Beachside Figurine",
    category: "Premium Figurine",
    price: "$149.99",
    stock: "Only 6 Left!",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=70&w=600", // Stunning action figure display visual
    specs: ["Height: 24cm (9.4\")", "Material: Premium PVC & ABS", "Includes: Sunfire glowing display stand", "Exclusive: Summer 2026 swimsuits edition"]
  },
  {
    id: 2,
    name: "Neon Cyber Pulse: Reactive Summer Tee",
    category: "Streetwear Apparel",
    price: "$34.99",
    stock: "Limited Cyber Drop",
    image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=70&w=600", // Cyber/clothing visual
    specs: ["100% Ring-Spun Heavyweight Cotton", "Phosphorescent UV-reactive neon prints", "Over-sized futuristic boxy fit", "Pre-shrunk organic fabric texture"]
  },
  {
    id: 3,
    name: "Spirits of Kyoto: Silk Bamboo Hand-Fan",
    category: "Festival Collectible",
    price: "$19.99",
    stock: "Shrine Shop Exclusive",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=70&w=600", // Japanese art fan visual
    specs: ["Hand-crafted natural bamboo frame", "High-grade organic Kyoto silk overlay", "Traditional hand-painted fox spirit emblem", "Includes protective gold-trimmed pouch"]
  },
  {
    id: 4,
    name: "AnimeWave: Eternal Sunset Artbook",
    category: "Deluxe Art Book",
    price: "$44.99",
    stock: "First Print Run",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=70&w=600", // Hardcover art book visual
    specs: ["240 pages of ultra-high-res 4K digital prints", "Hardcover with dynamic silver-foil lettering", "Behind-the-scenes concept sketches", "Interview booklet from director & designers"]
  }
];

export default function SummerVault() {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [orderedItems, setOrderedItems] = useState<number[]>([]);

  const handleOrderClick = (id: number) => {
    if (orderedItems.includes(id)) {
      setOrderedItems(orderedItems.filter((iId) => iId !== id));
    } else {
      setOrderedItems([...orderedItems, id]);
    }
  };

  return (
    <section id="vault" className="py-24 bg-sky-100 dark:bg-slate-950 neon:bg-[#090014] relative overflow-hidden transition-colors duration-300 transform-gpu">
      {/* Dynamic colorful blur circles */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-orange-400/20 dark:bg-pink-500/10 neon:bg-fuchsia-500/15 rounded-full blur-[90px] pointer-events-none transform-gpu translate-z-0"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-400/20 dark:bg-blue-500/10 neon:bg-cyan-500/15 rounded-full blur-[90px] pointer-events-none transform-gpu translate-z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-orange-400/10 dark:bg-pink-500/10 neon:bg-cyan-400/10 border border-orange-400/20 dark:border-pink-500/20 neon:border-cyan-400/30 text-orange-600 dark:text-pink-400 neon:text-cyan-300 font-bold uppercase tracking-wider text-xs shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-orange-500 neon:text-cyan-400" /> Summer Collector's Vault
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white neon:text-cyan-50 leading-tight">
            Exclusive <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500">Summer Merchandise</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-350 neon:text-cyan-100/70 text-lg mt-3 max-w-xl mx-auto font-medium">
            Explore limited edition beach figurines, UV-reactive cyberpunk streetwear, and luxury artwork artbooks.
          </p>
        </div>

        {/* Merchandise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MERCH_ITEMS.map((item, index) => {
            const isOrdered = orderedItems.includes(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="group relative rounded-[2.5rem] bg-white/60 dark:bg-slate-900/40 neon:bg-[#12002b]/40 backdrop-blur-md border border-white dark:border-slate-850 neon:border-cyan-500/20 p-5 shadow-lg overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-orange-400 dark:hover:border-pink-500/50 neon:hover:border-cyan-400"
              >
                {/* Image Container with Hover zoom */}
                <div className="relative h-56 w-full rounded-2xl overflow-hidden mb-4 border border-slate-200 dark:border-slate-800 neon:border-cyan-500/10 bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  
                  {/* Category and Stock Badge */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-[9px] font-black uppercase text-yellow-400 neon:text-cyan-300 border border-yellow-400/20 neon:border-cyan-400/30">
                      {item.category}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-red-600/90 backdrop-blur-sm text-[9px] font-black uppercase text-white animate-pulse">
                      {item.stock}
                    </span>
                  </div>

                  {/* Quick Specs View Link Trigger */}
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="absolute bottom-3 right-3 p-2 rounded-full bg-white/80 dark:bg-black/60 neon:bg-cyan-950/80 text-slate-800 dark:text-white neon:text-cyan-300 hover:scale-105 active:scale-95 transition-transform cursor-pointer border border-transparent neon:border-cyan-400/30"
                    title="View Specs & Details"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </div>

                {/* Info Text Content */}
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white neon:text-cyan-50 mb-1 leading-snug group-hover:text-orange-500 dark:group-hover:text-pink-400 neon:group-hover:text-cyan-300 transition-colors">
                    {item.name}
                  </h3>
                  
                  {/* Price Tag with glowing styling */}
                  <span className="inline-block text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-400 mb-6">
                    {item.price}
                  </span>
                </div>

                {/* Pre-Order Static Interactive Action Button */}
                <button
                  onClick={() => handleOrderClick(item.id)}
                  className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 border ${
                    isOrdered
                      ? "bg-emerald-500 hover:bg-emerald-600 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse"
                      : "bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 neon:bg-transparent neon:border neon:border-cyan-400 neon:text-cyan-400 neon:hover:bg-cyan-500 neon:hover:text-[#090014] neon:hover:border-cyan-500"
                  }`}
                >
                  {isOrdered ? (
                    <>
                      <Check className="w-4 h-4" /> Reserved! 🏷️
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Pre-Order Vault Item
                    </>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Deluxe Technical Specs Details Modal overlay */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-hidden"
            onClick={() => setSelectedItem(null)}
          >
            {/* Modal Container card */}
            <motion.div
              initial={{ scale: 0.9, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 15, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 neon:bg-[#0c001f] border-4 border-slate-200 dark:border-slate-800 neon:border-cyan-400/80 rounded-[2.5rem] overflow-hidden shadow-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()} // Prevent close on body clicks
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-orange-500 dark:text-pink-400 neon:text-cyan-400 bg-orange-400/10 dark:bg-pink-500/10 neon:bg-cyan-400/10 px-2.5 py-1 rounded">
                    {selectedItem.category}
                  </span>
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white neon:text-cyan-50 mt-2 leading-tight">
                    {selectedItem.name}
                  </h4>
                </div>
                
                {/* Close Button X */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 neon:bg-cyan-950/40 neon:hover:bg-cyan-400 neon:text-cyan-300 neon:hover:text-[#0c001f] text-slate-800 dark:text-white transition-all cursor-pointer z-50 active:scale-90"
                >
                  &times;
                </button>
              </div>

              {/* Specifications checklist list */}
              <div className="space-y-4 mb-8">
                <h5 className="text-xs font-black text-slate-500 dark:text-slate-400 neon:text-cyan-400/70 uppercase tracking-widest flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Official Vault Specifications
                </h5>
                <ul className="space-y-3.5">
                  {selectedItem.specs.map((spec: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm font-semibold text-slate-700 dark:text-slate-350 neon:text-cyan-100">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Order Button */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleOrderClick(selectedItem.id)}
                  className={`flex-1 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 border ${
                    orderedItems.includes(selectedItem.id)
                      ? "bg-emerald-500 hover:bg-emerald-600 border-emerald-500 text-white animate-pulse"
                      : "bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 neon:bg-transparent neon:border neon:border-cyan-400 neon:text-cyan-400"
                  }`}
                >
                  {orderedItems.includes(selectedItem.id) ? "Reserved! 🏷️" : "Pre-Order Now"}
                </button>
                
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95"
                >
                  Close Specs
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
