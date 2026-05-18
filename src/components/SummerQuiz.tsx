"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, Award, Smile, BookOpen, Laptop, Flame, Waves } from "lucide-react";
import { useState } from "react";

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
    title: "Pick your summer pet companion!",
    options: [
      { text: "A lazy beach cat wearing cool sunglasses", score: 1, icon: Waves, color: "from-blue-400 to-cyan-500" },
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
    color: "from-blue-400 to-cyan-500 text-cyan-400 border-cyan-400/50",
  },
  mystique: {
    title: "The Kyoto Mystique",
    show: "Spirits of Kyoto Festival",
    character: "Rei & Kagura",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=70&w=800",
    description: "You see beauty in hidden spiritual realms, ancient folklore, and quiet summer nights filled with floating lanterns. You love supernatural mysteries!",
    color: "from-green-400 to-emerald-500 text-emerald-400 border-emerald-400/50",
  },
  cyber: {
    title: "The Neon Cyber Runner",
    show: "Neon Cyber Pulse",
    character: "Kai (Hacker 0x1)",
    image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=70&w=800",
    description: "You belong in a futuristic high-tech cyber landscape, hacking megacorps and cruising neon highways. You are adventurous and tech-savvy!",
    color: "from-fuchsia-500 to-cyan-400 text-cyan-300 border-cyan-400/50",
  },
  solar: {
    title: "The Solar Champion",
    show: "Blade of the Fallen Sun",
    character: "Aiko Tanaka",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=70&w=800",
    description: "You are a warrior at heart, wielding the power of solar wind and rising to face epic historical battles. You are fiercely loyal and incredibly powerful!",
    color: "from-orange-500 to-red-500 text-orange-400 border-orange-400/50",
  },
};

export default function SummerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswerClick = (optionScore: number) => {
    const updatedScores = [...score, optionScore];
    setScore(updatedScores);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const getResult = () => {
    const totalScore = score.reduce((a, b) => a + b, 0);
    if (totalScore <= 5) return RESULTS.dreamer;
    if (totalScore <= 8) return RESULTS.mystique;
    if (totalScore <= 10) return RESULTS.cyber;
    return RESULTS.solar;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore([]);
    setQuizFinished(false);
    setQuizStarted(false);
  };

  const result = getResult();

  return (
    <section id="quiz" className="py-24 bg-sky-100 dark:bg-slate-950 neon:bg-[#090014] relative overflow-hidden transition-colors duration-300 transform-gpu">
      {/* Soft color glowing spheres */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-orange-400/20 dark:bg-pink-500/10 neon:bg-fuchsia-500/15 rounded-full blur-[80px] pointer-events-none transform-gpu translate-z-0"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-blue-400/20 dark:bg-cyan-500/10 neon:bg-cyan-500/15 rounded-full blur-[80px] pointer-events-none transform-gpu translate-z-0"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-orange-400/10 dark:bg-pink-500/10 neon:bg-cyan-400/10 border border-orange-400/20 dark:border-pink-500/20 neon:border-cyan-400/30 text-orange-600 dark:text-pink-400 neon:text-cyan-300 font-bold uppercase tracking-wider text-xs shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-orange-500 neon:text-cyan-400" /> Static Otaku Matcher
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white neon:text-cyan-50 leading-tight">
            Summer <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500">Personality Matcher</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-350 neon:text-cyan-100/70 text-lg mt-3 max-w-xl mx-auto font-medium">
            Answer 3 quick static questions to discover your ultimate summer anime character and show alignment!
          </p>
        </div>

        {/* Dynamic State Container cards */}
        <div className="bg-white/60 dark:bg-slate-900/40 neon:bg-[#12002b]/40 backdrop-blur-md border-4 border-white dark:border-slate-800/80 neon:border-cyan-500/20 rounded-[2.5rem] p-8 md:p-12 shadow-xl relative overflow-hidden transition-all duration-300 min-h-[420px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!quizStarted && (
              <motion.div
                key="start"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-6"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-500 dark:to-orange-500 neon:from-cyan-400 neon:to-fuchsia-500 flex items-center justify-center text-white mx-auto mb-6 shadow-md shadow-orange-500/10">
                  <Award className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white neon:text-cyan-50 mb-3">
                  Find Your Summer Destiny
                </h3>
                <p className="text-slate-600 dark:text-slate-400 neon:text-cyan-100/60 max-w-md mx-auto mb-8 font-medium">
                  Are you a blazing solar sword master or a cool beachside slice-of-life dreamer? Let's analyze your summer choices!
                </p>
                <button
                  onClick={() => setQuizStarted(true)}
                  className="px-10 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-500 dark:to-orange-500 neon:from-cyan-500 neon:to-fuchsia-600 rounded-full text-white font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-orange-500/20 transition-all cursor-pointer active:scale-95 transform-gpu"
                >
                  Start Matcher Quiz
                </button>
              </motion.div>
            )}

            {quizStarted && !quizFinished && (
              <motion.div
                key={`q-${currentQuestion}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {/* Progress bar info */}
                <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 neon:text-cyan-400/60 mb-6">
                  <span>Question {currentQuestion + 1} of {QUESTIONS.length}</span>
                  <span>{Math.round(((currentQuestion) / QUESTIONS.length) * 100)}% Complete</span>
                </div>
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 neon:bg-[#090014] rounded-full overflow-hidden mb-8 border border-slate-350 dark:border-slate-700/50">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-500 dark:to-orange-500 neon:from-cyan-400 neon:to-fuchsia-500 transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>

                <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white neon:text-cyan-50 mb-8">
                  {QUESTIONS[currentQuestion].title}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {QUESTIONS[currentQuestion].options.map((opt, i) => {
                    const Icon = opt.icon;
                    return (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswerClick(opt.score)}
                        className="p-5 text-left rounded-2xl bg-white/70 dark:bg-slate-950/40 neon:bg-[#090014]/60 border-2 border-slate-250 dark:border-slate-800 neon:border-cyan-500/10 hover:border-orange-400 dark:hover:border-pink-500/50 neon:hover:border-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-all flex items-center gap-4 cursor-pointer group shadow-sm"
                      >
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${opt.color} flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="flex-1 font-bold text-slate-700 dark:text-slate-300 neon:text-cyan-50 text-sm md:text-base leading-tight">
                          {opt.text}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {quizFinished && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                {/* Result left column image */}
                <div className="md:col-span-5 relative rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 neon:border-cyan-400/50 shadow-lg h-72">
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400 neon:text-cyan-300">RECOMMENDED WATCH</span>
                    <h4 className="text-lg font-black text-white leading-tight">{result.show}</h4>
                  </div>
                </div>

                {/* Result right column text */}
                <div className="md:col-span-7 flex flex-col justify-center text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-orange-100 dark:bg-orange-500/20 neon:bg-cyan-950/40 text-orange-600 dark:text-orange-400 neon:text-cyan-400 border border-orange-200 dark:border-orange-500/20 neon:border-cyan-400/30">
                      MATCH DECREE
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white neon:text-cyan-50 leading-tight">
                    {result.title}
                  </h3>
                  
                  <h4 className="text-sm font-black text-slate-600 dark:text-slate-400 neon:text-cyan-300/80 mt-1 uppercase tracking-wider">
                    Character Link: <span className="underline decoration-pink-500 font-extrabold">{result.character}</span>
                  </h4>

                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 neon:text-cyan-100/70 mt-4 leading-relaxed font-semibold">
                    {result.description}
                  </p>

                  <div className="mt-8 flex gap-4">
                    <button
                      onClick={resetQuiz}
                      className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 neon:bg-transparent neon:border neon:border-cyan-400 text-white dark:text-slate-900 neon:text-cyan-400 font-black rounded-xl text-xs uppercase tracking-wider transition-colors duration-300 cursor-pointer active:scale-95 shadow-md flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" /> Try Again
                    </button>
                    
                    <button
                      onClick={() => alert(`Wow! I matched as '${result.title}' (${result.character}) in the AnimeWave summer personality matcher!`)}
                      className="px-6 py-3.5 bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-500 dark:to-orange-500 neon:from-cyan-400 neon:to-fuchsia-500 text-white font-black rounded-xl text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer active:scale-95 shadow-md"
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
