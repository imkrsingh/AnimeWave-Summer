"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, Award, Smile, BookOpen, Laptop, Flame, Waves, Swords, Compass } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    title: "Where would you spend your perfect summer day?",
    options: [
      { text: "Chilling by the beach with a cold soda", score: 1, icon: Waves, color: "from-blue-400 to-cyan-500" },
      { text: "Exploring quiet, ancient shrines in Kyoto", score: 2, icon: BookOpen, color: "from-green-400 to-emerald-500" },
      { text: "Hacking code in a futuristic neon gaming bunker", score: 3, icon: Laptop, color: "from-fuchsia-400 to-cyan-500" },
      { text: "Training with a legendary sword under the blazing sun", score: 4, icon: Flame, color: "from-orange-400 to-red-500" },
    ],
  },
  {
    id: 2,
    title: "Choose your ultimate summer superpowers!",
    options: [
      { text: "Slowing down time for slice-of-life relaxation", score: 1, icon: Smile, color: "from-blue-400 to-cyan-500" },
      { text: "Summoning protective spirits of the festival night", score: 2, icon: BookOpen, color: "from-green-400 to-emerald-500" },
      { text: "Injecting cyber adrenaline into digital networks", score: 3, icon: Laptop, color: "from-fuchsia-400 to-cyan-500" },
      { text: "Unleashing solar flares directly from star cores", score: 4, icon: Flame, color: "from-orange-400 to-red-500" },
    ],
  },
  {
    id: 3,
    title: "Which summer sound triggers your ultimate nostalgia?",
    options: [
      { text: "The gentle murmur of sea waves and distant seagulls", score: 1, icon: Waves, color: "from-blue-400 to-cyan-500" },
      { text: "The sacred chime of a quiet shrine bell at midnight", score: 2, icon: BookOpen, color: "from-green-400 to-emerald-500" },
      { text: "The futuristic click of mechanical keys & lo-fi beats", score: 3, icon: Laptop, color: "from-fuchsia-400 to-cyan-500" },
      { text: "The fierce crackle of bonfires and sparks rising high", score: 4, icon: Flame, color: "from-orange-400 to-red-500" },
    ],
  },
  {
    id: 4,
    title: "What is your signature summer gear?",
    options: [
      { text: "A breezy straw hat and a vintage polaroid camera", score: 1, icon: Smile, color: "from-blue-400 to-cyan-500" },
      { text: "An elegant folding fan painted with golden kitsune foxes", score: 2, icon: Sparkles, color: "from-green-400 to-emerald-500" },
      { text: "Glossy neon visor shades and haptic tech gloves", score: 3, icon: Laptop, color: "from-fuchsia-400 to-cyan-500" },
      { text: "A solar-heated plasma katana bound with red leather ropes", score: 4, icon: Swords, color: "from-orange-400 to-red-500" },
    ],
  },
  {
    id: 5,
    title: "Pick your summer pet companion!",
    options: [
      { text: "A lazy beach cat wearing cool dark sunglasses", score: 1, icon: Waves, color: "from-blue-400 to-cyan-500" },
      { text: "A mystical glowing spirit fox from the forest", score: 2, icon: BookOpen, color: "from-green-400 to-emerald-500" },
      { text: "A micro robotic assistant drone with cute LED eyes", score: 3, icon: Laptop, color: "from-fuchsia-400 to-cyan-500" },
      { text: "A soaring golden falcon forged from solar rays", score: 4, icon: Flame, color: "from-orange-400 to-red-500" },
    ],
  },
];

const RESULTS = {
  dreamer: {
    title: "The Coastal Dreamer",
    show: "Summer Days with You",
    character: "Haru & Yuki",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=70&w=800",
    description: "You seek peaceful, warm summer breeze afternoons, ocean shores, and sweet romantic memories with friends. You love relaxation and slice-of-life stories!",
    color: "from-blue-500 to-cyan-400 text-cyan-400 border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.25)]",
    glow: "rgba(14, 165, 233, 0.45)",
    syncRate: "97.4%"
  },
  mystique: {
    title: "The Kyoto Mystique",
    show: "Spirits of Kyoto Festival",
    character: "Kagura Rei",
    image: "/rei.png",
    description: "You see beauty in hidden spiritual realms, ancient Shinto folklore, and quiet summer nights filled with floating lanterns. You love supernatural mysteries!",
    color: "from-emerald-500 to-green-400 text-emerald-400 border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.25)]",
    glow: "rgba(16, 185, 129, 0.45)",
    syncRate: "99.1%"
  },
  cyber: {
    title: "The Neon Cyber Runner",
    show: "Neon Cyber Pulse",
    character: "Kai (Hacker 0x1)",
    image: "/kai.png",
    description: "You belong in a futuristic high-tech cyber landscape, hacking megacorporations and cruising neon highways. You are adventurous, quick-witted, and tech-savvy!",
    color: "from-fuchsia-500 to-cyan-400 text-cyan-300 border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.35)]",
    glow: "rgba(168, 85, 247, 0.45)",
    syncRate: "98.6%"
  },
  solar: {
    title: "The Solar Champion",
    show: "Blade of the Fallen Sun",
    character: "Aiko Tanaka",
    image: "/aiko.png",
    description: "You are a warrior at heart, wielding the power of solar wind and rising to face epic historical battles. You are fiercely loyal, incredibly powerful, and determined!",
    color: "from-orange-500 to-red-500 text-orange-400 border-orange-400/50 shadow-[0_0_20px_rgba(249,115,22,0.3)]",
    glow: "rgba(249, 115, 22, 0.45)",
    syncRate: "96.8%"
  },
};

export default function SummerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  // Web Audio click blips to add arcade chiptune touch feeling!
  const playClickSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      const now = ctx.currentTime;
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
      
      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      
      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {
      console.error(e);
    }
  };

  const playSuccessSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      const now = ctx.currentTime;
      
      osc.type = "square";
      osc.frequency.setValueAtTime(660, now);
      osc.frequency.setValueAtTime(880, now + 0.08);
      osc.frequency.setValueAtTime(1320, now + 0.16);
      
      gainNode.gain.setValueAtTime(0.06, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      
      osc.start(now);
      osc.stop(now + 0.38);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAnswerClick = (optionScore: number) => {
    playClickSound();
    const updatedScores = [...score, optionScore];
    setScore(updatedScores);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      playSuccessSound();
      setQuizFinished(true);
    }
  };

  const getResult = () => {
    const totalScore = score.reduce((a, b) => a + b, 0);
    // Scaled thresholds for 5 questions (score range: 5 to 20)
    if (totalScore <= 8) return RESULTS.dreamer;
    if (totalScore <= 12) return RESULTS.mystique;
    if (totalScore <= 16) return RESULTS.cyber;
    return RESULTS.solar;
  };

  const resetQuiz = () => {
    playClickSound();
    setCurrentQuestion(0);
    setScore([]);
    setQuizFinished(false);
    setQuizStarted(false);
  };

  const result = getResult();

  return (
    <section id="quiz" className="py-24 bg-sky-100 dark:bg-slate-950 neon:bg-[#090014] relative overflow-hidden transition-colors duration-300 transform-gpu z-10">
      
      {/* Decorative ambient glowing spheres mapped to page grid */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-orange-400/20 dark:bg-pink-500/10 neon:bg-fuchsia-500/15 rounded-full blur-[80px] pointer-events-none transform-gpu translate-z-0"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-blue-400/20 dark:bg-cyan-500/10 neon:bg-cyan-500/15 rounded-full blur-[80px] pointer-events-none transform-gpu translate-z-0"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-orange-400/10 dark:bg-pink-500/10 neon:bg-cyan-400/10 border border-orange-400/20 dark:border-pink-500/20 neon:border-cyan-400/30 text-orange-600 dark:text-pink-400 neon:text-cyan-300 font-bold uppercase tracking-wider text-xs shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-orange-500 neon:text-cyan-400" /> Dynamic Otaku Matcher
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white neon:text-cyan-50 leading-tight">
            Summer <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500">Destiny Matcher</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-350 neon:text-cyan-100/70 text-base md:text-lg mt-3 max-w-xl mx-auto font-medium">
            Answer **5 highly interactive arcade questions** to compute your ultimate anime destiny and match with the summer cast!
          </p>
        </div>

        {/* Console Box Wrapper Container */}
        <div className="bg-white/60 dark:bg-slate-900/40 neon:bg-[#12002b]/40 backdrop-blur-md border-4 border-white dark:border-slate-800/80 neon:border-cyan-500/20 rounded-[2.5rem] p-6 md:p-10 shadow-xl relative overflow-hidden transition-all duration-300 min-h-[440px] flex flex-col justify-center text-left">
          
          {/* Dynamic Background Glow mapped to result when quiz finishes! */}
          {quizFinished && (
            <div 
              className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out z-0 opacity-20 dark:opacity-30 blur-[70px]"
              style={{
                background: `radial-gradient(circle at center, ${result.glow} 0%, transparent 70%)`
              }}
            />
          )}

          <AnimatePresence mode="wait">
            
            {/* STAGE 1: Quiz Welcome Deck */}
            {!quizStarted && (
              <motion.div
                key="start"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-6 z-10"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-500 dark:to-orange-500 neon:from-cyan-400 neon:to-fuchsia-500 flex items-center justify-center text-white mx-auto mb-6 shadow-md shadow-orange-500/10">
                  <Award className="w-10 h-10" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white neon:text-cyan-50 mb-3">
                  Find Your Summer Destiny
                </h3>
                <p className="text-slate-655 dark:text-slate-400 neon:text-cyan-100/60 max-w-md mx-auto mb-8 font-semibold text-sm md:text-base leading-relaxed">
                  Are you a blazing solar katana warrior, a quiet kitsune fox guardian, a cybernetic hacker renegade, or a cool sea breeze slice-of-life dreamer? Let's decode your destiny!
                </p>
                <button
                  onClick={() => { playClickSound(); setQuizStarted(true); }}
                  className="px-10 py-5 bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-500 dark:to-orange-500 neon:from-cyan-500 neon:to-fuchsia-600 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-lg hover:shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer transform-gpu"
                >
                  Start Matcher Quiz
                </button>
              </motion.div>
            )}

            {/* STAGE 2: Interactive Question Deck */}
            {quizStarted && !quizFinished && (
              <motion.div
                key={`q-${currentQuestion}`}
                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full z-10"
              >
                {/* Progress bar info */}
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-450 neon:text-cyan-400/70 mb-4">
                  <span>Question {currentQuestion + 1} of {QUESTIONS.length}</span>
                  <span>{Math.round(((currentQuestion) / QUESTIONS.length) * 100)}% Match Computed</span>
                </div>
                
                {/* Visualizer glowing progress bar */}
                <div className="h-3 w-full bg-slate-200 dark:bg-slate-850 neon:bg-[#090014] rounded-full overflow-hidden mb-8 border border-slate-300 dark:border-slate-800/80 neon:border-cyan-500/10">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-500 dark:to-orange-500 neon:from-cyan-400 neon:to-fuchsia-500 transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.4)]"
                    style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>

                <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white neon:text-cyan-50 mb-8 leading-tight">
                  {QUESTIONS[currentQuestion].title}
                </h3>

                {/* Option Buttons grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {QUESTIONS[currentQuestion].options.map((opt, i) => {
                    const OptionIcon = opt.icon;
                    return (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98, y: 0 }}
                        onClick={() => handleAnswerClick(opt.score)}
                        className="p-5 text-left rounded-2xl bg-white/80 dark:bg-slate-950/60 neon:bg-[#090014]/65 border-2 border-slate-250 dark:border-slate-850 neon:border-cyan-500/10 hover:border-orange-400 dark:hover:border-pink-500 neon:hover:border-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-all flex items-center gap-4 cursor-pointer group shadow-sm"
                      >
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${opt.color} flex items-center justify-center text-white shadow-inner group-hover:rotate-6 transition-transform`}>
                          <OptionIcon className="w-5 h-5" />
                        </div>
                        <span className="flex-1 font-bold text-slate-700 dark:text-slate-350 neon:text-cyan-100 text-sm md:text-base leading-tight">
                          {opt.text}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STAGE 3: High-Fidelity Result Matching Profile Card */}
            {quizFinished && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10"
              >
                {/* Result left column image portrait */}
                <div className="md:col-span-5 relative rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 neon:border-cyan-400/50 shadow-xl h-80 transform-gpu">
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-5 left-5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-yellow-400 neon:text-cyan-300 bg-black/60 px-2 py-0.5 rounded border border-yellow-400/20">RECOMMENDED WATCH</span>
                    <h4 className="text-xl font-black text-white mt-1 leading-none">{result.show}</h4>
                  </div>
                </div>

                {/* Result right column text analytics */}
                <div className="md:col-span-7 flex flex-col justify-center text-left">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-orange-100 dark:bg-orange-500/20 neon:bg-cyan-950/40 text-orange-600 dark:text-orange-400 neon:text-cyan-400 border border-orange-200 dark:border-orange-500/20 neon:border-cyan-400/30">
                      DESTINY DECREE
                    </span>
                    <span className="text-[9px] font-mono font-black uppercase tracking-widest px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-500/20 neon:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 neon:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 neon:border-emerald-400/30 animate-pulse">
                      SYNC RATIO: {result.syncRate}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white neon:text-cyan-50 leading-tight">
                    {result.title}
                  </h3>
                  
                  <h4 className="text-xs md:text-sm font-black text-slate-655 dark:text-slate-400 neon:text-cyan-300/80 mt-1.5 uppercase tracking-wider flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-pink-500" />
                    Soul Character Match: <span className="underline decoration-pink-550 decoration-2 font-extrabold">{result.character}</span>
                  </h4>

                  <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 neon:text-cyan-100/70 mt-5 leading-relaxed font-semibold">
                    {result.description}
                  </p>

                  {/* Actions Bar */}
                  <div className="mt-8 flex gap-4">
                    <button
                      onClick={resetQuiz}
                      className="px-6 py-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 neon:bg-[#090014] neon:border neon:border-cyan-400 text-white dark:text-slate-900 neon:text-cyan-400 font-black rounded-xl text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer active:scale-95 shadow-md flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" /> Try Again
                    </button>
                    
                    <button
                      onClick={() => alert(`Matched as '${result.title}' (${result.character}) in the AnimeWave summer destiny matcher! Sync Rate: ${result.syncRate}`)}
                      className="px-6 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-500 dark:to-orange-500 neon:from-cyan-400 neon:to-fuchsia-500 text-white font-black rounded-xl text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer active:scale-95 shadow-md"
                    >
                      Share Match
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
