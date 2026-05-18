"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, Radio } from "lucide-react";
import { useTheme } from "next-themes";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: (() => void) | undefined;
    YT: any;
  }
}

const TRACKS = [
  {
    id: 1,
    title: "On & On",
    artist: "Cartoon (feat. Daniel Levi)",
    duration: "3:27",
    cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=200&auto=format&fit=crop",
    genre: "NCS Chill",
    color: "from-orange-400 to-pink-500",
    url: "K4DyBUG242c" // Cartoon - On & On YouTube ID
  },
  {
    id: 2,
    title: "Fade",
    artist: "Alan Walker [NCS Release]",
    duration: "4:24",
    cover: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=200&auto=format&fit=crop",
    genre: "Chill Synth",
    color: "from-cyan-400 to-fuchsia-500",
    url: "bM7SZ5SBzyY" // Alan Walker - Fade YouTube ID
  },
  {
    id: 3,
    title: "Hope",
    artist: "Tobu [NCS Release]",
    duration: "4:45",
    cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=200&auto=format&fit=crop",
    genre: "Summer House",
    color: "from-yellow-400 to-orange-500",
    url: "EP625xQIGzs" // Tobu - Hope YouTube ID
  },
  {
    id: 4,
    title: "My Heart",
    artist: "Different Heaven & EH!DE",
    duration: "4:27",
    cover: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=200&auto=format&fit=crop",
    genre: "Electro Pop",
    color: "from-green-400 to-cyan-500",
    url: "jK2aIUmmdP4" // Different Heaven - My Heart YouTube ID
  },
  {
    id: 5,
    title: "Fearless",
    artist: "Lost Sky [NCS Release]",
    duration: "3:15",
    cover: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=200&auto=format&fit=crop",
    genre: "Epic Trap",
    color: "from-purple-400 to-indigo-500",
    url: "9ruj7wY9j94" // Lost Sky - Fearless YouTube ID
  },
  {
    id: 6,
    title: "Heroes Tonight",
    artist: "Janji (feat. Johnning)",
    duration: "3:28",
    cover: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=200&auto=format&fit=crop",
    genre: "Melodic House",
    color: "from-rose-400 to-red-500",
    url: "3nQNiWdeH2Q" // Janji - Heroes Tonight YouTube ID
  }
];

export default function SummerRadio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [trackDuration, setTrackDuration] = useState("0:00");
  const [volume, setVolume] = useState(70);
  const [iframeReady, setIframeReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme } = useTheme();
  const playerRef = useRef<any>(null);

  const currentTrack = TRACKS[currentTrackIndex];
  const currentTheme = mounted ? theme : 'dark';

  // Load YouTube script & initialize player
  useEffect(() => {
    setMounted(true);

    // Dynamic import safety
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      initPlayer();
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    }

    return () => {
      // Keep static clean
    };
  }, []);

  const initPlayer = () => {
    if (playerRef.current) return;

    playerRef.current = new window.YT.Player("youtube-player", {
      height: "0",
      width: "0",
      videoId: TRACKS[currentTrackIndex].url,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        rel: 0,
        showinfo: 0,
        modestbranding: 1
      },
      events: {
        onReady: () => {
          setIframeReady(true);
          playerRef.current.setVolume(volume);
        },
        onStateChange: (event: any) => {
          // YT.PlayerState.ENDED is 0
          if (event.data === 0) {
            handleNext();
          }
        }
      }
    });
  };

  // Play / Pause handling
  const handlePlayPause = () => {
    if (!playerRef.current || !iframeReady) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  // Sync volume updates
  useEffect(() => {
    if (playerRef.current && iframeReady && typeof playerRef.current.setVolume === 'function') {
      playerRef.current.setVolume(volume);
    }
  }, [volume, iframeReady]);

  // Sync track selection / swaps
  useEffect(() => {
    if (playerRef.current && iframeReady && typeof playerRef.current.loadVideoById === 'function') {
      playerRef.current.currentTime = 0;
      setProgress(0);
      setCurrentTime("0:00");
      playerRef.current.loadVideoById(TRACKS[currentTrackIndex].url);
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [currentTrackIndex, iframeReady]);

  // Real-time Audio Polling for perfect tracking
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && playerRef.current && iframeReady && typeof playerRef.current.getCurrentTime === 'function') {
      interval = setInterval(() => {
        const curTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration() || 1;
        setProgress((curTime / duration) * 100);

        const mins = Math.floor(curTime / 60);
        const secs = Math.floor(curTime % 60);
        setCurrentTime(`${mins}:${secs.toString().padStart(2, '0')}`);

        const dMins = Math.floor(duration / 60);
        const dSecs = Math.floor(duration % 60);
        setTrackDuration(`${dMins}:${dSecs.toString().padStart(2, '0')}`);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrackIndex, iframeReady]);

  const handleNext = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime("0:00");
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setTimeout(() => setIsPlaying(true), 200);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime("0:00");
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setTimeout(() => setIsPlaying(true), 200);
  };

  const handleTrackSelect = (index: number) => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime("0:00");
    setCurrentTrackIndex(index);
    setTimeout(() => setIsPlaying(true), 200);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (playerRef.current && iframeReady && typeof playerRef.current.seekTo === 'function') {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const percentage = clickX / width;
      const duration = playerRef.current.getDuration() || 0;
      const newTime = percentage * duration;
      playerRef.current.seekTo(newTime, true);
      setProgress(percentage * 100);
    }
  };

  return (
    <section className="py-24 bg-sky-200 dark:bg-slate-950 neon:bg-[#090014] relative overflow-hidden flex items-center justify-center transition-colors duration-300 transform-gpu">
      {/* Hidden YouTube Iframe Node */}
      <div id="youtube-player" className="absolute w-0 h-0 opacity-0 pointer-events-none"></div>

      {/* Background gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none transform-gpu">
        <div className={`absolute inset-0 bg-gradient-to-b from-sky-200/80 via-yellow-100/60 to-sky-200/90 transition-opacity duration-500 ${currentTheme === 'light' ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/80 to-slate-950 transition-opacity duration-500 ${currentTheme === 'dark' ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute inset-0 bg-gradient-to-b from-[#090014] via-[#12002b]/80 to-[#090014] transition-opacity duration-500 ${currentTheme === 'neon' ? 'opacity-100' : 'opacity-0'}`}></div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-400/20 to-fuchsia-400/20 dark:from-pink-600/10 dark:to-blue-500/10 neon:from-cyan-500/30 neon:to-fuchsia-500/30 blur-[80px] transform-gpu translate-z-0"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-orange-400/10 dark:bg-pink-500/10 neon:bg-cyan-400/10 border border-orange-400/20 dark:border-pink-500/20 neon:border-cyan-400/30 text-orange-600 dark:text-pink-400 neon:text-cyan-300 font-bold uppercase tracking-wider text-xs shadow-sm"
            >
              <Radio className="w-4 h-4 neon:animate-pulse" /> Live Streaming (YouTube NCS)
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white neon:text-cyan-50">
              AnimeWave <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-pink-400 dark:to-orange-400 neon:from-cyan-400 neon:to-fuchsia-500">Summer Radio</span>
            </h2>
            <p className="text-slate-700 dark:text-slate-300 neon:text-cyan-100/70 text-lg mt-3 max-w-xl mx-auto font-medium">
              Real YouTube NCS integration! Click Play to listen to legendary copyright-free summer anthems directly through our retro player deck.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white/40 dark:bg-slate-900/40 neon:bg-[#12002b]/40 backdrop-blur-md p-8 rounded-[3rem] border border-white/60 dark:border-white/10 neon:border-cyan-500/20 shadow-xl transform-gpu"
          >
            {/* Left side: Rotating Vinyl/CD Cover */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-300/40 dark:border-slate-800/40 neon:border-cyan-500/10 pb-8 lg:pb-0 lg:pr-8">
              <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center">
                
                {/* Vinyl Record Shadow/Background Ring */}
                <div className="absolute inset-0 rounded-full bg-slate-950 shadow-xl dark:shadow-black/70 neon:shadow-[0_0_30px_rgba(34,211,238,0.2)]"></div>
                
                {/* The Vinyl Grooves */}
                <div className="absolute inset-2 rounded-full border border-slate-800/60 bg-[radial-gradient(circle_at_center,#111_10%,#222_30%,#111_50%,#333_70%,#000_100%)]"></div>
                
                {/* Custom Album Cover (Rotating center piece) */}
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-slate-950 z-10 flex items-center justify-center will-change-transform"
                >
                  <img
                    src={currentTrack.cover}
                    alt={currentTrack.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Center Spindle Hole */}
                  <div className="absolute w-6 h-6 rounded-full bg-[#090014] border-2 border-slate-950 z-20 shadow-inner"></div>
                </motion.div>
                
                {/* Stylized Tonearm needle */}
                <div 
                  className={`absolute top-0 right-4 w-24 h-32 origin-top-right transform transition-transform duration-500 z-20 pointer-events-none ${isPlaying ? 'rotate-12' : '-rotate-6'}`}
                  style={{
                    backgroundImage: "radial-gradient(circle at 100% 0%, #cbd5e1 4px, transparent 4px)",
                  }}
                >
                  {/* Metal arm */}
                  <div className="w-[4px] h-24 bg-gradient-to-b from-slate-300 to-slate-500 mx-auto rounded-full shadow-sm"></div>
                  {/* Cartridge/Needle head */}
                  <div className="w-4 h-6 bg-slate-700 dark:bg-slate-800 rounded-sm absolute bottom-0 left-[38px] shadow-sm transform -rotate-12"></div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <span className="text-orange-500 dark:text-pink-400 neon:text-cyan-400 font-bold uppercase tracking-wider text-xs">
                  {currentTrack.genre}
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white neon:text-cyan-50 mt-1 leading-tight">
                  {currentTrack.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 neon:text-cyan-200/70 text-sm mt-1">
                  {currentTrack.artist}
                </p>
              </div>
            </div>

            {/* Right side: Player controls & Playlist */}
            <div className="lg:col-span-7 flex flex-col justify-between lg:pl-8 pt-4 lg:pt-0">
              
              {/* Dynamic Equalizer / Waveform Visualization */}
              <div className="h-16 flex items-end justify-between px-4 mb-8 bg-sky-100/50 dark:bg-slate-950/40 neon:bg-[#090014]/50 border border-slate-300/30 dark:border-slate-800/30 neon:border-cyan-500/20 rounded-2xl overflow-hidden py-3">
                {Array.from({ length: 24 }).map((_, i) => {
                  const heights = isPlaying 
                    ? [20, 50, 30, 60, 40, 75, 20, 50][i % 8] 
                    : 10;
                  
                  return (
                    <motion.div
                      key={i}
                      animate={isPlaying ? { height: [10, heights, 10] } : { height: 8 }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.05,
                        ease: "easeInOut"
                      }}
                      className={`w-[6px] md:w-[8px] rounded-full bg-gradient-to-t ${currentTrack.color}`}
                    />
                  );
                })}
              </div>

              {/* Progress Slider */}
              <div className="mb-8">
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 neon:text-cyan-200/50 font-bold mb-2">
                  <span>{currentTime}</span>
                  <span>{trackDuration !== "0:00" ? trackDuration : currentTrack.duration}</span>
                </div>
                <div 
                  onClick={handleProgressBarClick}
                  className="h-2 w-full bg-slate-200 dark:bg-slate-800 neon:bg-[#090014] rounded-full overflow-hidden border border-slate-300/30 dark:border-slate-700/50 cursor-pointer relative group"
                >
                  <div 
                    className={`h-full bg-gradient-to-r ${currentTrack.color} rounded-full transition-all duration-150`}
                    style={{ width: `${progress}%` }}
                  />
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-orange-500 dark:border-pink-500 neon:border-cyan-400 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: `calc(${progress}% - 8px)` }}
                  />
                </div>
              </div>

              {/* Core Control Buttons */}
              <div className="flex items-center justify-between gap-6 mb-8 px-4">
                
                {/* Volume Slider */}
                <div className="flex items-center gap-2 w-1/4">
                  <Volume2 className="w-5 h-5 text-slate-600 dark:text-slate-400 neon:text-cyan-400" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                    className="w-full accent-orange-500 dark:accent-pink-500 neon:accent-cyan-400 bg-slate-300 dark:bg-slate-700 neon:bg-[#090014] h-1 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Playback Controls */}
                <div className="flex items-center gap-6">
                  <button 
                    onClick={handlePrev}
                    className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 neon:hover:bg-cyan-950/30 text-slate-800 dark:text-white neon:text-cyan-400 transition-colors"
                  >
                    <SkipBack className="w-6 h-6 fill-current" />
                  </button>

                  <button
                    onClick={handlePlayPause}
                    className={`p-5 rounded-full text-white bg-gradient-to-r ${currentTrack.color} shadow-lg hover:scale-105 active:scale-95 transition-all transform-gpu`}
                  >
                    {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                  </button>

                  <button 
                    onClick={handleNext}
                    className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 neon:hover:bg-cyan-950/30 text-slate-800 dark:text-white neon:text-cyan-400 transition-colors"
                  >
                    <SkipForward className="w-6 h-6 fill-current" />
                  </button>
                </div>

                {/* Track Badge */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 neon:bg-[#090014] text-slate-800 dark:text-slate-300 neon:text-cyan-300 text-xs font-bold border border-slate-300/40 dark:border-slate-700/50">
                  <Music className="w-3.5 h-3.5" />
                  Track {currentTrackIndex + 1}/{TRACKS.length}
                </div>
              </div>

              {/* Playlist Selection */}
              <div className="space-y-3">
                <span className="text-xs uppercase font-black tracking-widest text-slate-600 dark:text-slate-400 neon:text-cyan-400/80 mb-2 block">
                  Up Next / Playlist (Scroll)
                </span>
                
                <div className="max-h-[220px] overflow-y-auto pr-1 space-y-3 custom-scrollbar">
                  {TRACKS.map((track, i) => (
                    <div
                      key={track.id}
                      onClick={() => handleTrackSelect(i)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                        currentTrackIndex === i 
                          ? 'bg-gradient-to-r from-slate-100 to-slate-200/50 dark:from-slate-800 dark:to-slate-800/40 neon:from-cyan-950/40 neon:to-[#12002b]/40 border-orange-500/50 dark:border-pink-500/50 neon:border-cyan-400/50 shadow-md' 
                          : 'bg-transparent border-transparent hover:bg-slate-100/50 dark:hover:bg-slate-800/30 neon:hover:bg-[#12002b]/20 hover:border-slate-300/20 dark:hover:border-slate-700/20 neon:hover:border-cyan-500/10'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm relative group-hover:scale-105 transition-transform transform-gpu">
                          <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                          {currentTrackIndex === i && isPlaying && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <span className="w-1.5 h-3 bg-cyan-400 rounded-full animate-bounce" />
                              <span className="w-1.5 h-4 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s] mx-0.5" />
                              <span className="w-1.5 h-3 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white neon:text-cyan-100 text-sm md:text-base leading-tight">
                            {track.title}
                          </h4>
                          <p className="text-slate-600 dark:text-slate-400 neon:text-cyan-200/60 text-xs mt-0.5">
                            {track.artist}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold px-2 py-1 rounded bg-slate-200/80 dark:bg-slate-800 neon:bg-[#090014] text-slate-800 dark:text-slate-400 neon:text-cyan-400">
                          {track.genre.split(" ")[0]}
                        </span>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 neon:text-cyan-300/50">
                          {track.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
