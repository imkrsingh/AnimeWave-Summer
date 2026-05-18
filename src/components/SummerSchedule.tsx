"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Bell, Clock, Tv, Play, Sparkles } from "lucide-react";
import { useState } from "react";

const WEEKDAYS = ["Monday", "Wednesday", "Friday", "Saturday", "Sunday"];

const SCHEDULE_DATA = [
  {
    day: "Monday",
    shows: [
      {
        id: 1,
        title: "Ocean Breezes",
        time: "11:30 JST",
        episode: "Episode 4",
        station: "Tokyo MX / Crunchyroll",
        genre: "Slice of Life",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=70&w=600",
        description: "Haru takes Yuki to his childhood hidden cove. Beautiful seaside vistas and warm memories unfold."
      }
    ]
  },
  {
    day: "Wednesday",
    shows: [
      {
        id: 2,
        title: "Neon Cyber Pulse",
        time: "21:00 JST",
        episode: "Episode 6",
        station: "BS11 / Netflix",
        genre: "Sci-Fi / Action",
        image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=70&w=600",
        description: "Kai decodes the core mainframe. The security forces deploy cyber-drones as the grid collapses."
      }
    ]
  },
  {
    day: "Friday",
    shows: [
      {
        id: 3,
        title: "Spirits of Kyoto Festival",
        time: "23:00 JST",
        episode: "Episode 5",
        station: "Tokyo MX / Crunchyroll",
        genre: "Supernatural / Mystery",
        image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=70&w=600",
        description: "Rei meets the fox spirit under the giant cherry blossom tree. The legendary lantern parade begins."
      }
    ]
  },
  {
    day: "Saturday",
    shows: [
      {
        id: 4,
        title: "Blade of the Fallen Sun",
        time: "18:30 JST",
        episode: "Episode 6",
        station: "Fuji TV / Crunchyroll",
        genre: "Action / Historical",
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=70&w=600",
        description: "Aiko faces the commander of the Frozen Sect on the burning bridge. High stakes katana duel!"
      },
      {
        id: 5,
        title: "Summer Days with You",
        time: "20:00 JST",
        episode: "Episode 6",
        station: "Tokyo MX / Hulu",
        genre: "Romance",
        image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=70&w=600",
        description: "A sudden summer rainstorm forces the class to seek shelter under the old beach railway station."
      }
    ]
  },
  {
    day: "Sunday",
    shows: [
      {
        id: 6,
        title: "Echoes of Eternity",
        time: "17:00 JST",
        episode: "Episode 7",
        station: "BS11 / Crunchyroll",
        genre: "Adventure / Fantasy",
        image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?q=70&w=600",
        description: "The crew discovers the celestial boundary gate. An ancient guardian wakes from stardust sleep."
      }
    ]
  }
];

export default function SummerSchedule() {
  const [selectedDay, setSelectedDay] = useState("Saturday");
  const [reminders, setReminders] = useState<number[]>([]);

  const toggleReminder = (id: number) => {
    if (reminders.includes(id)) {
      setReminders(reminders.filter((rId) => rId !== id));
    } else {
      setReminders([...reminders, id]);
    }
  };

  const currentShows = SCHEDULE_DATA.find((d) => d.day === selectedDay)?.shows || [];

  return (
    <section id="schedule" className="py-24 bg-sky-100 dark:bg-slate-950 neon:bg-[#090014] relative overflow-hidden transition-colors duration-300 transform-gpu">
      {/* Decorative ambient glowing backdrops */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-cyan-400/10 dark:bg-pink-500/5 neon:bg-fuchsia-500/10 rounded-full blur-[80px] pointer-events-none transform-gpu translate-z-0"></div>
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-orange-400/10 dark:bg-blue-500/5 neon:bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none transform-gpu translate-z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-orange-400/10 dark:bg-pink-500/10 neon:bg-cyan-400/10 border border-orange-400/20 dark:border-pink-500/20 neon:border-cyan-400/30 text-orange-600 dark:text-pink-400 neon:text-cyan-300 font-bold uppercase tracking-wider text-xs shadow-sm"
          >
            <Calendar className="w-4 h-4 text-orange-500 neon:text-cyan-400" /> Static Broadcast Guide
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white neon:text-cyan-50 leading-tight">
            Summer 2026 <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500">Visual Schedule</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 neon:text-cyan-100/70 text-lg mt-3 max-w-xl mx-auto font-medium">
            Plan your weekly otaku watchlist! Click a day to view broadcast timings, stations, and episode descriptions.
          </p>
        </div>

        {/* Day Selector row */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 max-w-2xl mx-auto bg-white/40 dark:bg-slate-900/40 neon:bg-[#12002b]/40 backdrop-blur-sm p-2 rounded-full border border-white/60 dark:border-slate-800/80 neon:border-cyan-500/20 shadow-md">
          {WEEKDAYS.map((day) => {
            const isActive = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-slate-950 dark:text-white neon:text-cyan-350"
                    : "text-slate-600 dark:text-slate-450 neon:text-cyan-400/60 hover:text-slate-900 dark:hover:text-white neon:hover:text-cyan-300"
                }`}
              >
                {day.substring(0, 3)}
                {isActive && (
                  <motion.span
                    layoutId="activeScheduleDay"
                    className="absolute inset-0 bg-slate-200/60 dark:bg-slate-850/80 neon:bg-cyan-950/40 rounded-full border border-slate-300 dark:border-slate-750 neon:border-cyan-500/35 -z-10 transform-gpu"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Grid of show cards for selected day */}
        <div className="max-w-4xl mx-auto min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {currentShows.map((show) => {
                const hasReminder = reminders.includes(show.id);
                return (
                  <motion.div
                    key={show.id}
                    className="group relative rounded-[2.2rem] bg-white/60 dark:bg-slate-900/40 neon:bg-[#12002b]/40 backdrop-blur-md border border-white dark:border-slate-850 neon:border-cyan-500/20 p-5 shadow-lg overflow-hidden flex flex-col justify-between transition-all duration-300"
                  >
                    {/* Soft image background inside container */}
                    <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4 border border-slate-200 dark:border-slate-800 neon:border-cyan-500/10">
                      <img
                        src={show.image}
                        alt={show.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                      
                      {/* Top Time and Genre Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-[10px] font-black uppercase text-yellow-400 neon:text-cyan-300 border border-yellow-400/20 neon:border-cyan-400/30 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {show.time}
                        </span>
                        <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-[10px] font-black uppercase text-white border border-white/10">
                          {show.genre}
                        </span>
                      </div>
                    </div>

                    <div>
                      {/* Show Details */}
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white neon:text-cyan-50">
                          {show.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-500/20 neon:bg-fuchsia-500/10 border border-orange-200 dark:border-orange-500/30 neon:border-fuchsia-500/35 text-[9px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 neon:text-fuchsia-400">
                          {show.episode}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 neon:text-cyan-300/60 font-bold mb-3 flex items-center gap-1.5">
                        <Tv className="w-3.5 h-3.5" /> Broadcast: {show.station}
                      </p>

                      <p className="text-sm text-slate-600 dark:text-slate-300 neon:text-cyan-100/70 leading-relaxed font-semibold mb-6">
                        {show.description}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 mt-auto">
                      {/* Set Reminder static interactive toggle */}
                      <button
                        onClick={() => toggleReminder(show.id)}
                        className={`flex-1 py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 border ${
                          hasReminder
                            ? "bg-emerald-500 hover:bg-emerald-600 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse"
                            : "bg-white hover:bg-slate-100 dark:bg-slate-850 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white neon:bg-cyan-950/20 neon:border-cyan-500/30 neon:text-cyan-400 neon:hover:bg-cyan-500 neon:hover:text-[#090014] neon:hover:border-cyan-500"
                        }`}
                      >
                        <Bell className={`w-4 h-4 ${hasReminder ? "fill-current" : ""}`} />
                        {hasReminder ? "Reminder Set! 🔔" : "Set Reminder"}
                      </button>

                      {/* Watch Preview Alert */}
                      <button
                        onClick={() => alert(`Opening official broadcast preview for '${show.title}' ${show.episode}!`)}
                        className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-black text-xs uppercase tracking-wider transition-colors duration-300 cursor-pointer active:scale-95 flex items-center justify-center"
                      >
                        <Play className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
