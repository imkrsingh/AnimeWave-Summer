"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Sparkles } from "lucide-react";

export default function EpisodeAlertToast() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const onScroll = () => {
      if (window.scrollY > 500) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  const dismiss = () => {
    setDismissed(true);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, x: -40, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="fixed bottom-24 left-4 md:left-6 z-[55] max-w-[320px]"
        >
          <div className="flex gap-3 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 neon:bg-[#12002b]/95 backdrop-blur-xl border-2 border-orange-200 dark:border-pink-500/40 neon:border-cyan-500/50 shadow-2xl shadow-orange-500/10 dark:shadow-pink-500/15 neon:shadow-cyan-500/20">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 neon:from-cyan-500 neon:to-fuchsia-600 flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-orange-500 dark:text-pink-400 neon:text-cyan-400 mb-0.5">
                <Sparkles className="w-3 h-3" /> New Episode
              </p>
              <p className="font-bold text-slate-900 dark:text-white neon:text-cyan-50 text-sm leading-tight">
                Beach Volleyball Club Ep. 1 is live!
              </p>
              <button
                type="button"
                onClick={() => {
                  document.querySelector("#tonight")?.scrollIntoView({ behavior: "smooth" });
                  dismiss();
                }}
                className="mt-2 text-xs font-black uppercase tracking-wider text-orange-600 dark:text-pink-400 neon:text-cyan-400 hover:underline cursor-pointer"
              >
                View tonight&apos;s lineup →
              </button>
            </div>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss notification"
              className="shrink-0 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 neon:hover:bg-cyan-950/50 text-slate-400 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
