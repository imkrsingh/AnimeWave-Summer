"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Radio, MessageCircle, Copy, Check } from "lucide-react";

const ROOMS = [
  {
    id: "beach-ep8",
    name: "Beach Episode Watch",
    show: "Summer Days with You · Ep. 8",
    viewers: 2847,
    host: "SakuraHost",
    startsIn: "12 min",
    emoji: "🏖️",
    gradient: "from-sky-400 to-orange-400",
  },
  {
    id: "cyber-premiere",
    name: "Cyber Pulse Premiere",
    show: "Neon Cyber Pulse · Ep. 6",
    viewers: 1923,
    host: "GridMaster",
    startsIn: "45 min",
    emoji: "🌃",
    gradient: "from-fuchsia-500 to-cyan-500",
  },
  {
    id: "samurai-duel",
    name: "Duel Night Lobby",
    show: "Blade of the Fallen Sun · Ep. 12",
    viewers: 3104,
    host: "RoninWave",
    startsIn: "LIVE",
    emoji: "⚔️",
    gradient: "from-amber-500 to-red-600",
  },
];

export default function SummerWatchParty() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyLink = (id: string) => {
    void navigator.clipboard.writeText(`https://animewave.summer/party/${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      id="watchparty"
      className="py-24 relative overflow-hidden bg-sky-50 dark:bg-slate-950 neon:bg-[#090014] transition-colors duration-300"
    >
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-orange-500 dark:text-pink-400 neon:text-cyan-400 font-black uppercase tracking-widest text-xs mb-2">
              <Users className="w-4 h-4" /> Watch Party
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white neon:text-cyan-50 tracking-tight">
              Watch together,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 neon:from-emerald-400 neon:to-cyan-400">
                vibe louder
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 neon:text-cyan-100/60 mt-2 font-medium max-w-xl">
              Join synced rooms with live chat reactions — no spoilers in the lobby.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-950/40 neon:bg-emerald-950/30 border border-green-200 dark:border-green-800/50 neon:border-emerald-500/30">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-green-700 dark:text-green-400 neon:text-emerald-400">
              7,874 fans online
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {ROOMS.map((room, i) => (
            <motion.article
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="tilt-card relative p-6 rounded-3xl bg-white dark:bg-slate-900/90 neon:bg-[#12002b]/70 border border-sky-100 dark:border-slate-800 neon:border-fuchsia-900/40 shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
            >
              <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${room.gradient} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity`} />

              <div className="flex items-start justify-between mb-4 relative">
                <span className="text-4xl">{room.emoji}</span>
                {room.startsIn === "LIVE" ? (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500 text-white text-[10px] font-black uppercase tracking-widest">
                    <Radio className="w-3 h-3" /> Live
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 neon:bg-slate-900 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 neon:text-cyan-200/70">
                    Starts in {room.startsIn}
                  </span>
                )}
              </div>

              <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white neon:text-cyan-50 relative">
                {room.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 neon:text-cyan-200/60 font-medium mt-1 relative">
                {room.show}
              </p>

              <div className="flex items-center gap-4 mt-5 text-xs font-bold text-slate-600 dark:text-slate-400 neon:text-cyan-200/70 relative">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-orange-500 neon:text-cyan-400" />
                  {room.viewers.toLocaleString()}
                </span>
                <span>Host @{room.host}</span>
              </div>

              <div className="flex gap-2 mt-6 relative">
                <button
                  type="button"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 neon:from-cyan-500 neon:to-fuchsia-600 text-white text-xs font-black uppercase tracking-wider btn-pulse hover:brightness-110 transition-all"
                >
                  Join room
                </button>
                <button
                  type="button"
                  onClick={() => copyLink(room.id)}
                  aria-label="Copy invite link"
                  className="p-3 rounded-xl border border-sky-200 dark:border-slate-700 neon:border-fuchsia-900/50 hover:bg-sky-50 dark:hover:bg-slate-800 neon:hover:bg-[#1a0035] transition-colors"
                >
                  {copiedId === room.id ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-500 neon:text-cyan-300/70" />
                  )}
                </button>
              </div>

              <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 neon:text-cyan-300/40 relative">
                <MessageCircle className="w-3 h-3" />
                Synced chat · emoji reactions
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
