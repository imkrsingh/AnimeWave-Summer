"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Sun, X, Download } from "lucide-react";
import { useState } from "react";

const IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=70&w=1000&auto=format&fit=crop&fm=webp", span: "md:col-span-2 md:row-span-2", height: "h-[500px]" },
  { id: 2, src: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=70&w=500&auto=format&fit=crop&fm=webp", span: "md:col-span-1 md:row-span-1", height: "h-[240px]" },
  { id: 3, src: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=70&w=500&auto=format&fit=crop&fm=webp", span: "md:col-span-1 md:row-span-1", height: "h-[240px]" },
  { id: 4, src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=70&w=500&auto=format&fit=crop&fm=webp", span: "md:col-span-1 md:row-span-1", height: "h-[240px]" },
  { id: 5, src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=70&w=500&auto=format&fit=crop&fm=webp", span: "md:col-span-1 md:row-span-1", height: "h-[240px]" },
];

export default function GallerySection() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section id="wallpapers" className="py-24 bg-white dark:bg-slate-900 neon:bg-[#12002b] transition-colors duration-300 transform-gpu">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 transform-gpu">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center justify-center gap-2 mb-4 text-cyan-600 dark:text-cyan-400 neon:text-fuchsia-400 font-bold uppercase tracking-widest text-sm"
          >
            <Sun className="w-5 h-5 text-yellow-500 neon:text-cyan-400" /> Summer Memories
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white neon:text-cyan-50 mb-4"
          >
            Aesthetic <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 dark:from-sky-400 dark:to-blue-500 neon:from-cyan-400 neon:to-fuchsia-400">Wallpapers</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 dark:text-slate-400 neon:text-cyan-100/70 max-w-2xl mx-auto text-lg font-medium"
          >
            Download stunning 4K artwork from our featured sunny titles. Perfect for your desktop or mobile devices.
          </motion.p>
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min">
          {IMAGES.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              onClick={() => setActiveImage(img.src)}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer ${img.span} ${img.height} shadow-sm border-4 border-sky-50 dark:border-transparent neon:border-cyan-500/30 transform-gpu`}
            >
              <div className="absolute inset-0 bg-sky-900/10 dark:bg-slate-900/20 neon:bg-[#090014]/40 group-hover:bg-transparent transition-colors duration-300 z-10 pointer-events-none transform-gpu"></div>
              <img 
                src={img.src} 
                alt={`Gallery image ${img.id}`} 
                loading="lazy"
                className="w-full h-full object-cover transform-gpu group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform"
              />
              
              <div className="absolute inset-0 bg-white/30 dark:bg-black/50 neon:bg-[#090014]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center backdrop-blur-sm transform-gpu">
                <div className="p-4 bg-white/80 dark:bg-white/20 neon:bg-cyan-500/20 rounded-full text-blue-600 dark:text-white neon:text-cyan-300 transform-gpu translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-sm border border-transparent neon:border-cyan-400/50">
                  <Maximize2 className="w-6 h-6 animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* High-Fidelity Wallpaper Lightbox Overlay Console */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 md:p-8 cursor-zoom-out"
            onClick={() => setActiveImage(null)}
          >
            {/* Main Lightbox Body Frame */}
            <motion.div
              initial={{ scale: 0.9, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 15, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative max-w-5xl max-h-[75vh] md:max-h-[80vh] rounded-[2rem] overflow-hidden border-4 border-white/10 neon:border-cyan-400 shadow-2xl flex items-center justify-center bg-slate-900"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image container
            >
              {/* Close Button on Image */}
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer z-50"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={activeImage}
                alt="Enlarged aesthetic wallpaper"
                className="w-full h-auto max-h-[75vh] md:max-h-[80vh] object-contain"
              />
            </motion.div>

            {/* Utility Download bar at the bottom */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 flex items-center gap-4 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href={activeImage}
                target="_blank"
                rel="noopener noreferrer"
                download="animewave-summer-wallpaper.jpg"
                className="px-6 py-3 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-white neon:bg-cyan-950/80 neon:border neon:border-cyan-400 neon:text-cyan-400 font-black rounded-xl text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
              >
                <Download className="w-4 h-4" /> Download Full HD Wallpaper
              </a>
              <button
                onClick={() => setActiveImage(null)}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white border border-white/10 font-black rounded-xl text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer active:scale-95"
              >
                Close View
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
