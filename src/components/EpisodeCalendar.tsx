"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock, Bell, BellOff, ChevronLeft, ChevronRight, Tv } from "lucide-react";

interface Episode {
  id: string;
  anime: string;
  episode: number;
  time: string;
  duration: string;
  genre: string;
  color: string;
  darkColor: string;
  neonColor: string;
  image: string;
  isNew?: boolean;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const FULL_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const SCHEDULE: Record<string, Episode[]> = {
  Mon: [
    { id: "m1", anime: "Neon Cyber Pulse", episode: 11, time: "7:00 PM", duration: "24 min", genre: "Sci-Fi", color: "bg-cyan-500", darkColor: "dark:bg-cyan-600", neonColor: "neon:bg-cyan-500", image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=70&w=200&auto=format&fit=crop&fm=webp", isNew: true },
    { id: "m2", anime: "Ocean Breeze Academy", episode: 5, time: "10:00 PM", duration: "23 min", genre: "Comedy", color: "bg-yellow-500", darkColor: "dark:bg-yellow-600", neonColor: "neon:bg-yellow-500", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=70&w=200&auto=format&fit=crop&fm=webp" },
  ],
  Tue: [
    { id: "t1", anime: "Blade of the Fallen Sun", episode: 9, time: "8:30 PM", duration: "26 min", genre: "Action", color: "bg-orange-500", darkColor: "dark:bg-orange-600", neonColor: "neon:bg-orange-500", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=70&w=200&auto=format&fit=crop&fm=webp", isNew: true },
  ],
  Wed: [
    { id: "w1", anime: "Summer Days with You", episode: 8, time: "6:00 PM", duration: "24 min", genre: "Romance", color: "bg-pink-500", darkColor: "dark:bg-pink-600", neonColor: "neon:bg-fuchsia-500", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=70&w=200&auto=format&fit=crop&fm=webp", isNew: true },
    { id: "w2", anime: "Starfall Chronicles", episode: 3, time: "9:00 PM", duration: "25 min", genre: "Fantasy", color: "bg-purple-500", darkColor: "dark:bg-purple-600", neonColor: "neon:bg-purple-500", image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?q=70&w=200&auto=format&fit=crop&fm=webp" },
  ],
  Thu: [
    { id: "th1", anime: "Spirits of Kyoto Festival", episode: 7, time: "7:30 PM", duration: "24 min", genre: "Supernatural", color: "bg-emerald-500", darkColor: "dark:bg-emerald-600", neonColor: "neon:bg-emerald-500", image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=70&w=200&auto=format&fit=crop&fm=webp", isNew: true },
  ],
  Fri: [
    { id: "f1", anime: "Neon Cyber Pulse", episode: 12, time: "7:00 PM", duration: "24 min", genre: "Sci-Fi", color: "bg-cyan-500", darkColor: "dark:bg-cyan-600", neonColor: "neon:bg-cyan-500", image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=70&w=200&auto=format&fit=crop&fm=webp" },
    { id: "f2", anime: "Blade of the Fallen Sun", episode: 10, time: "8:30 PM", duration: "26 min", genre: "Action", color: "bg-orange-500", darkColor: "dark:bg-orange-600", neonColor: "neon:bg-orange-500", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=70&w=200&auto=format&fit=crop&fm=webp" },
  ],
  Sat: [
    { id: "s1", anime: "Summer Days with You", episode: 9, time: "5:00 PM", duration: "24 min", genre: "Romance", color: "bg-pink-500", darkColor: "dark:bg-pink-600", neonColor: "neon:bg-fuchsia-500", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=70&w=200&auto=format&fit=crop&fm=webp" },
    { id: "s2", anime: "Ocean Breeze Academy", episode: 6, time: "7:00 PM", duration: "23 min", genre: "Comedy", color: "bg-yellow-500", darkColor: "dark:bg-yellow-600", neonColor: "neon:bg-yellow-500", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=70&w=200&auto=format&fit=crop&fm=webp" },
    { id: "s3", anime: "Starfall Chronicles", episode: 4, time: "9:30 PM", duration: "25 min", genre: "Fantasy", color: "bg-purple-500", darkColor: "dark:bg-purple-600", neonColor: "neon:bg-purple-500", image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?q=70&w=200&auto=format&fit=crop&fm=webp" },
  ],
  Sun: [
    { id: "su1", anime: "Spirits of Kyoto Festival", episode: 8, time: "6:30 PM", duration: "24 min", genre: "Supernatural", color: "bg-emerald-500", darkColor: "dark:bg-emerald-600", neonColor: "neon:bg-emerald-500", image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=70&w=200&auto=format&fit=crop&fm=webp" },
  ],
};

export default function EpisodeCalendar() {
  const [activeDay, setActiveDay] = useState("Wed");
  const [reminders, setReminders] = useState<Set<string>>(new Set(["m1", "w1"]));
  const [selectedEp, setSelectedEp] = useState<Episode | null>(null);

  const toggleReminder = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setReminders((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const activeDayIndex = DAYS.indexOf(activeDay);

  const goNext = () => setActiveDay(DAYS[(activeDayIndex + 1) % 7]);
  const goPrev = () => setActiveDay(DAYS[(activeDayIndex + 6) % 7]);

  const episodes = SCHEDULE[activeDay] ?? [];

  return (
    <section
      id="calendar"
      className="py-24 bg-white dark:bg-slate-950 neon:bg-[#090014] relative overflow-hidden transition-colors duration-300"
    >
      {/* Decorative orbs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-orange-300/15 dark:bg-pink-600/10 neon:bg-fuchsia-600/15 rounded-full blur-[100px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-300/15 dark:bg-cyan-600/10 neon:bg-cyan-600/15 rounded-full blur-[80px] pointer-events-none transform-gpu" />

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
            <CalendarDays className="w-4 h-4" /> Episode Calendar
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white neon:text-cyan-50 tracking-tight mb-3">
            This Week&apos;s{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500 text-shimmer">
              Airings
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 neon:text-cyan-100/60 max-w-xl mx-auto font-medium">
            Never miss a new episode. Set reminders and track your weekly schedule.
          </p>
        </motion.div>

        {/* Day selector */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <button
            onClick={goPrev}
            className="w-9 h-9 rounded-full bg-white dark:bg-slate-900 neon:bg-[#12002b] border border-sky-200 dark:border-slate-700 neon:border-cyan-500/30 flex items-center justify-center text-slate-600 dark:text-slate-300 neon:text-cyan-400 hover:border-orange-400 dark:hover:border-pink-500 neon:hover:border-cyan-400 transition-colors cursor-pointer shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
            {DAYS.map((day, i) => {
              const hasEps = (SCHEDULE[day] ?? []).length > 0;
              const hasNew = (SCHEDULE[day] ?? []).some((e) => e.isNew);
              const isActive = activeDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`relative flex flex-col items-center gap-1 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer min-w-[56px] ${
                    isActive
                      ? "bg-gradient-to-b from-orange-500 to-pink-500 dark:from-pink-500 dark:to-orange-500 neon:from-cyan-500 neon:to-fuchsia-600 text-white shadow-md"
                      : "bg-sky-50 dark:bg-slate-900 neon:bg-[#12002b] text-slate-500 dark:text-slate-400 neon:text-cyan-400/60 border border-sky-100 dark:border-slate-800 neon:border-fuchsia-900/40 hover:border-orange-300 dark:hover:border-pink-500/40 neon:hover:border-cyan-400/50"
                  }`}
                >
                  {hasNew && !isActive && (
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 dark:bg-pink-500 neon:bg-cyan-400" />
                  )}
                  <span>{day}</span>
                  <span className={`text-[10px] font-bold ${isActive ? "text-white/70" : "text-slate-400 dark:text-slate-600 neon:text-cyan-400/40"}`}>
                    {hasEps ? `${(SCHEDULE[day] ?? []).length} ep` : "—"}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={goNext}
            className="w-9 h-9 rounded-full bg-white dark:bg-slate-900 neon:bg-[#12002b] border border-sky-200 dark:border-slate-700 neon:border-cyan-500/30 flex items-center justify-center text-slate-600 dark:text-slate-300 neon:text-cyan-400 hover:border-orange-400 dark:hover:border-pink-500 neon:hover:border-cyan-400 transition-colors cursor-pointer shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Day label */}
        <motion.p
          key={activeDay}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 neon:text-cyan-300/50 mb-6"
        >
          {FULL_DAYS[activeDayIndex]} — Week of May 25, 2026
        </motion.p>

        {/* Episode list */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {episodes.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 gap-3 text-center"
              >
                <Tv className="w-10 h-10 text-slate-300 dark:text-slate-700 neon:text-cyan-400/30" />
                <p className="font-bold text-slate-500 dark:text-slate-400 neon:text-cyan-300/60">
                  No episodes airing on {FULL_DAYS[activeDayIndex]}.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {episodes.map((ep, i) => (
                  <motion.div
                    key={ep.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.35 }}
                    onClick={() => setSelectedEp(ep)}
                    className="group flex items-center gap-4 p-4 rounded-2xl bg-sky-50 dark:bg-slate-900 neon:bg-[#12002b] border border-sky-100 dark:border-slate-800 neon:border-fuchsia-900/40 hover:border-orange-300 dark:hover:border-pink-500/40 neon:hover:border-cyan-400/50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                    {/* Color accent bar */}
                    <div className={`w-1 h-14 rounded-full ${ep.color} ${ep.darkColor} ${ep.neonColor} shrink-0`} />

                    {/* Thumbnail */}
                    <div className="w-16 h-12 rounded-xl overflow-hidden shrink-0">
                      <img
                        src={ep.image}
                        alt={ep.anime}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-black text-sm text-slate-900 dark:text-white neon:text-cyan-50 truncate">
                          {ep.anime}
                        </h3>
                        {ep.isNew && (
                          <span className="shrink-0 px-2 py-0.5 rounded-full bg-orange-100 dark:bg-pink-950/40 neon:bg-cyan-950/40 text-orange-600 dark:text-pink-400 neon:text-cyan-400 text-[9px] font-black uppercase tracking-wider border border-orange-200 dark:border-pink-500/30 neon:border-cyan-500/30">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-orange-500 dark:text-pink-400 neon:text-fuchsia-400 uppercase tracking-wider">
                        Episode {ep.episode} · {ep.genre}
                      </p>
                    </div>

                    {/* Time + reminder */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 neon:text-cyan-300/60">
                        <Clock className="w-3.5 h-3.5" />
                        {ep.time}
                      </div>
                      <button
                        onClick={(e) => toggleReminder(ep.id, e)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
                          reminders.has(ep.id)
                            ? "bg-orange-500 dark:bg-pink-500 neon:bg-cyan-500 text-white border-transparent"
                            : "bg-white dark:bg-slate-800 neon:bg-[#090014] text-slate-500 dark:text-slate-400 neon:text-cyan-400/60 border-sky-200 dark:border-slate-700 neon:border-cyan-500/20 hover:border-orange-300 dark:hover:border-pink-500/40 neon:hover:border-cyan-400"
                        }`}
                      >
                        {reminders.has(ep.id) ? (
                          <><Bell className="w-3 h-3" /> Set</>
                        ) : (
                          <><BellOff className="w-3 h-3" /> Remind</>
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Episode detail modal */}
      <AnimatePresence>
        {selectedEp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEp(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white dark:bg-slate-900 neon:bg-[#0c001f] border-2 border-sky-100 dark:border-slate-800 neon:border-cyan-400/60 rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <div className="relative h-48">
                <img src={selectedEp.image} alt={selectedEp.anime} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-orange-400 dark:text-pink-400 neon:text-cyan-400 mb-1">
                    {selectedEp.genre}
                  </p>
                  <h3 className="text-xl font-black text-white">{selectedEp.anime}</h3>
                </div>
                <button
                  onClick={() => setSelectedEp(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-black text-slate-900 dark:text-white neon:text-cyan-50">
                      Episode {selectedEp.episode}
                    </p>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 neon:text-cyan-300/60 uppercase tracking-wider mt-0.5">
                      {FULL_DAYS[activeDayIndex]} · {selectedEp.time} · {selectedEp.duration}
                    </p>
                  </div>
                  {selectedEp.isNew && (
                    <span className="px-3 py-1 rounded-full bg-orange-100 dark:bg-pink-950/40 neon:bg-cyan-950/40 text-orange-600 dark:text-pink-400 neon:text-cyan-400 text-xs font-black uppercase tracking-wider border border-orange-200 dark:border-pink-500/30 neon:border-cyan-500/30">
                      New Episode
                    </span>
                  )}
                </div>
                <button
                  onClick={() => toggleReminder(selectedEp.id, { stopPropagation: () => {} } as any)}
                  className={`w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                    reminders.has(selectedEp.id)
                      ? "bg-orange-500 dark:bg-pink-500 neon:bg-cyan-500 text-white shadow-md"
                      : "bg-sky-50 dark:bg-slate-800 neon:bg-[#12002b] text-slate-700 dark:text-slate-300 neon:text-cyan-300 border border-sky-200 dark:border-slate-700 neon:border-cyan-500/30 hover:border-orange-400 dark:hover:border-pink-500 neon:hover:border-cyan-400"
                  }`}
                >
                  {reminders.has(selectedEp.id) ? (
                    <><Bell className="w-4 h-4" /> Reminder Set</>
                  ) : (
                    <><BellOff className="w-4 h-4" /> Set Reminder</>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
