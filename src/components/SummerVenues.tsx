"use client";

import { motion } from "framer-motion";
import { MapPin, Compass, Sparkles } from "lucide-react";

const SETTINGS_DATA = [
  {
    id: 1,
    title: "Kugenuma Coastline",
    show: "Summer Days with You",
    location: "Shonan Province, Japan",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=70&w=600", // Gorgeous sunset beach
    description: "A beautiful golden shoreline where the old coastal railway track runs right alongside the crushing waves, serving as the backdrop for sweet slice-of-life summer memories."
  },
  {
    id: 2,
    title: "The Gion Lantern Walk",
    show: "Spirits of Kyoto Festival",
    location: "Higashiyama, Kyoto",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=70&w=600", // Ancient Kyoto streets with lanterns
    description: "An ancient, rain-swept pathway illuminated by thousands of traditional red paper lanterns, bridging the border between the mortal city and the spirit realms during midsummer."
  },
  {
    id: 3,
    title: "Kyoto Solar Shrine Base",
    show: "Blade of the Fallen Sun",
    location: "Mount Kurama, Japan",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=70&w=600", // Traditional sunlit temple
    description: "Built at the highest peak to capture raw solar radiation, this sacred sun-baked shrine houses the star-core forge where Aiko Tanaka's legendary Sunfire Blade was woven."
  },
  {
    id: 4,
    title: "Neon Sector 9 Canopy",
    show: "Neon Cyber Pulse",
    location: "Neo-Tokyo Grid",
    image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=70&w=600", // Rain slicked neon cyber street
    description: "A high-tech cyberpunk metropolis combining rain-slicked asphalt, glowing magenta light towers, synthetic digital beaches, and massive holographic palm trees."
  }
];

export default function SummerVenues() {
  return (
    <section id="venues" className="py-24 bg-sky-100 dark:bg-slate-950 neon:bg-[#090014] relative overflow-hidden transition-colors duration-300 transform-gpu">
      {/* Subtle background ambient glows */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-orange-400/10 dark:bg-pink-500/5 neon:bg-fuchsia-500/10 rounded-full blur-[80px] pointer-events-none transform-gpu translate-z-0"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-blue-400/10 dark:bg-cyan-500/5 neon:bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none transform-gpu translate-z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-orange-400/10 dark:bg-pink-500/10 neon:bg-cyan-400/10 border border-orange-400/20 dark:border-pink-500/20 neon:border-cyan-400/30 text-orange-600 dark:text-pink-400 neon:text-cyan-300 font-bold uppercase tracking-wider text-xs shadow-sm"
          >
            <Compass className="w-4 h-4 text-orange-500 neon:text-cyan-400" /> Story Settings
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white neon:text-cyan-50 leading-tight">
            Scenic <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500">Anime Settings</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-350 neon:text-cyan-100/70 text-lg mt-3 max-w-xl mx-auto font-medium">
            Take a virtual tour of the iconic in-universe locations and breathtaking backdrops where our summer tales unfold.
          </p>
        </div>

        {/* Story Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {SETTINGS_DATA.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="group relative rounded-[2.5rem] bg-white/60 dark:bg-slate-900/40 neon:bg-[#12002b]/40 backdrop-blur-md border border-white dark:border-slate-850 neon:border-cyan-500/20 p-5 shadow-sm overflow-hidden flex flex-col justify-between transition-all duration-350 hover:shadow-md hover:border-orange-400 dark:hover:border-pink-500/50 neon:hover:border-cyan-400"
            >
              {/* Product Image Frame */}
              <div className="relative h-60 w-full rounded-2.5xl overflow-hidden mb-4 border border-slate-200 dark:border-slate-800 neon:border-cyan-500/10">
                <img
                  src={venue.image}
                  alt={venue.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                
                {/* Location pin tag */}
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded bg-black/60 backdrop-blur-sm text-[10px] font-black uppercase text-yellow-400 neon:text-cyan-300 border border-yellow-400/20 neon:border-cyan-400/30 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {venue.location}
                </span>
              </div>

              {/* Text Description Details */}
              <div className="px-1">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white neon:text-cyan-50">
                    {venue.title}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-500/20 neon:bg-fuchsia-500/10 border border-orange-200 dark:border-orange-500/30 neon:border-fuchsia-500/35 text-[9px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 neon:text-fuchsia-400">
                    {venue.show}
                  </span>
                </div>

                <p className="text-sm text-slate-655 dark:text-slate-300 neon:text-cyan-100/70 leading-relaxed font-semibold mt-3">
                  {venue.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
