"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";

export default function NewsletterFooter() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <footer className="relative bg-sky-200 dark:bg-slate-950 neon:bg-[#090014] pt-24 pb-12 overflow-hidden transition-colors duration-300 transform-gpu">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-yellow-200/50 dark:to-pink-900/20 neon:to-fuchsia-900/30 pointer-events-none transition-colors duration-300 transform-gpu translate-z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white/70 dark:bg-slate-900/50 neon:bg-[#12002b]/60 backdrop-blur-md border-4 border-white dark:border-white/10 neon:border-cyan-400/40 rounded-[3rem] p-8 md:p-16 text-center shadow-xl mb-24 relative overflow-hidden transition-colors duration-300 transform-gpu"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400/20 dark:bg-pink-500/10 neon:bg-fuchsia-500/20 rounded-full blur-[60px] pointer-events-none transform-gpu translate-z-0"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/20 dark:bg-cyan-500/10 neon:bg-cyan-500/20 rounded-full blur-[60px] pointer-events-none transform-gpu translate-z-0"></div>

          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white neon:text-cyan-50 mb-4 relative z-10 tracking-tight">
            Don&apos;t miss an <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500 text-shimmer">Episode</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-400 neon:text-cyan-100/70 mb-8 max-w-xl mx-auto text-lg relative z-10 font-medium">
            Subscribe to our newsletter and get exclusive summer updates, behind-the-scenes content, and early access to beach merchandise.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto relative z-10" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 bg-white dark:bg-slate-950/50 neon:bg-[#090014]/80 border-2 border-sky-200 dark:border-slate-700 neon:border-fuchsia-500/50 rounded-full px-6 py-4 text-slate-900 dark:text-white neon:text-cyan-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 neon:placeholder:text-cyan-200/50 focus:outline-none focus:border-orange-500 dark:focus:border-pink-500 neon:focus:border-cyan-400 focus:ring-2 focus:ring-orange-200 dark:focus:ring-pink-500 transition-colors font-medium shadow-inner"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-500 dark:to-orange-500 neon:from-cyan-400 neon:to-fuchsia-600 rounded-full font-black text-white shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2 uppercase tracking-wider text-sm transform-gpu will-change-transform active:scale-95 cursor-pointer"
            >
              Subscribe <Send className="w-4 h-4" />
            </button>
          </form>

          <AnimatePresence>
            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-4 flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 neon:text-cyan-400 font-bold text-sm relative z-10"
              >
                <CheckCircle2 className="w-5 h-5" />
                You&apos;re on the wave list! Summer updates coming soon.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t-2 border-sky-300/50 dark:border-white/10 neon:border-cyan-500/30 pt-8 transition-colors duration-300">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500">
              ANIME<span className="text-blue-600 dark:text-white neon:text-cyan-50">WAVE</span>
            </span>
          </div>

          <p className="text-slate-600 dark:text-slate-500 neon:text-cyan-200/50 text-sm font-bold">
            &copy; 2026 AnimeWave Studio. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {[
              {
                title: "Portfolio",
                href: "#",
                svg: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                )
              },
              {
                title: "Instagram",
                href: "https://instagram.com",
                svg: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                )
              },
              {
                title: "YouTube",
                href: "https://youtube.com",
                svg: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                )
              },
              {
                title: "Share",
                href: "#",
                svg: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                )
              },
              {
                title: "More Links",
                href: "#",
                svg: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                )
              }
            ].map((item, i) => (
              <a 
                key={i} 
                href={item.href} 
                title={item.title}
                className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 neon:bg-transparent border-2 border-sky-100 dark:border-slate-800 neon:border-cyan-500/50 flex items-center justify-center text-blue-500 dark:text-slate-400 neon:text-cyan-400 hover:text-white hover:bg-orange-500 hover:border-orange-500 dark:hover:bg-pink-500 dark:hover:border-pink-500 neon:hover:bg-fuchsia-500 neon:hover:border-fuchsia-500 neon:hover:text-white transition-colors duration-300 shadow-sm"
              >
                {item.svg}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
