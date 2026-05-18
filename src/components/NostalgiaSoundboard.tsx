"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, Sparkles, Play } from "lucide-react";

interface SoundPad {
  id: number;
  name: string;
  subtitle: string;
  color: string;
  glow: string;
  type: "magic" | "level" | "spin" | "spring" | "laser" | "charge" | "jutsu" | "rubber" | "mystery";
}

const PADS: SoundPad[] = [
  {
    id: 1,
    name: "Doraemon Magic Pocket",
    subtitle: "Future Gadget Spawn",
    color: "bg-sky-500 text-white",
    glow: "shadow-[0_0_20px_rgba(14,165,233,0.5)] border-sky-400",
    type: "magic"
  },
  {
    id: 2,
    name: "Pokémon Level Up",
    subtitle: "Classic 8-Bit Fanfare",
    color: "bg-yellow-500 text-slate-900",
    glow: "shadow-[0_0_20px_rgba(234,179,8,0.5)] border-yellow-400",
    type: "level"
  },
  {
    id: 3,
    name: "Beyblade Rip-Spin",
    subtitle: "High-Speed Metal Whine",
    color: "bg-purple-500 text-white",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.5)] border-purple-400",
    type: "spin"
  },
  {
    id: 4,
    name: "Shin Chan Mischief",
    subtitle: "Funny Spring Boing",
    color: "bg-rose-500 text-white",
    glow: "shadow-[0_0_20px_rgba(244,63,94,0.5)] border-rose-400",
    type: "spring"
  },
  {
    id: 5,
    name: "Dragon Ball Ki Charge",
    subtitle: "8-Bit Aura Energy Blast",
    color: "bg-orange-500 text-white",
    glow: "shadow-[0_0_20px_rgba(249,115,22,0.5)] border-orange-400",
    type: "charge"
  },
  {
    id: 6,
    name: "Cyber Laser Shot",
    subtitle: "Futuristic Retro Beam",
    color: "bg-emerald-500 text-white",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.5)] border-emerald-400",
    type: "laser"
  },
  {
    id: 7,
    name: "Naruto Ninja Jutsu",
    subtitle: "Substitution Teleport Poof",
    color: "bg-amber-600 text-white",
    glow: "shadow-[0_0_20px_rgba(217,119,6,0.5)] border-amber-500",
    type: "jutsu"
  },
  {
    id: 8,
    name: "Luffy Elastic Stretch",
    subtitle: "Bouncy Rubber Gum-Gum",
    color: "bg-red-600 text-white",
    glow: "shadow-[0_0_20px_rgba(220,38,38,0.5)] border-red-500",
    type: "rubber"
  },
  {
    id: 9,
    name: "Conan Clue Deduction",
    subtitle: "Mystery Solved Chime",
    color: "bg-blue-600 text-white",
    glow: "shadow-[0_0_20px_rgba(37,99,235,0.5)] border-blue-500",
    type: "mystery"
  }
];

export default function NostalgiaSoundboard() {
  const [activePad, setActivePad] = useState<number | null>(null);
  const [speed, setSpeed] = useState<number>(1.0); // 0.5x (Slowed), 1.0x (Normal), 1.5x (Fasted)
  const [ambientGlow, setAmbientGlow] = useState<string>("rgba(34, 211, 238, 0.12)"); // Brighter default light cyan
  const [activeWaveColor, setActiveWaveColor] = useState<string>("#22d3ee"); // Dynamic visualizer color
  
  const glowTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Initialize Web Audio Context & Analyser Node
  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
      }
      if (glowTimeoutRef.current) {
        clearTimeout(glowTimeoutRef.current);
      }
    };
  }, []);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
      analyserRef.current = audioCtxRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      analyserRef.current.connect(audioCtxRef.current.destination);
      
      // Start drawing real-time visual oscilloscope wave on canvas
      drawOscilloscope();
    }
    
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  // Synthesize sound effects dynamically using oscillators (completely static, zero downloading assets!)
  const playSound = (type: SoundPad["type"]) => {
    initAudio();
    const ctx = audioCtxRef.current;
    const analyser = analyserRef.current;
    if (!ctx || !analyser) return;

    // Reset and trigger dynamic smoky background color transitions!
    if (glowTimeoutRef.current) {
      clearTimeout(glowTimeoutRef.current);
    }

    // ENHANCED HIGH-BRIGHTNESS BACKDROP COLOR VALUES (Increased alpha channels for dynamic light pop!)
    const GLOW_COLORS: Record<SoundPad["type"], string> = {
      magic: "rgba(14, 165, 233, 0.55)",   // Doraemon Sky Blue
      level: "rgba(234, 179, 8, 0.65)",   // Pokemon Yellow
      spin: "rgba(168, 85, 247, 0.55)",    // Beyblade Purple
      spring: "rgba(244, 63, 94, 0.55)",   // Shin Chan Rose/Pink
      charge: "rgba(249, 115, 22, 0.65)",  // Dragon Ball Orange
      laser: "rgba(16, 185, 129, 0.55)",   // Cyber Laser Emerald
      jutsu: "rgba(217, 119, 6, 0.65)",    // Naruto Amber/Gold
      rubber: "rgba(220, 38, 38, 0.65)",   // Luffy Red
      mystery: "rgba(37, 99, 235, 0.55)",  // Conan Blue/Navy
    };

    const WAVE_COLORS: Record<SoundPad["type"], string> = {
      magic: "#0ea5e9",   // Doraemon Sky Blue
      level: "#eab308",   // Pokemon Yellow
      spin: "#a855f7",    // Beyblade Purple
      spring: "#f43f5e",   // Shin Chan Pink
      charge: "#f97316",  // Dragon Ball Orange
      laser: "#10b981",   // Cyber Laser Emerald
      jutsu: "#d97706",   // Naruto Amber
      rubber: "#dc2626",  // Luffy Red
      mystery: "#2563eb",  // Conan Blue
    };

    // Update state to render glowing background smoke & visualizer wave color
    setAmbientGlow(GLOW_COLORS[type]);
    setActiveWaveColor(WAVE_COLORS[type]);

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(analyser);

    const now = ctx.currentTime;
    
    // Dynamic tempo calculations:
    const durationMultiplier = 1 / speed;
    
    // Pitch factor: pitch shifts nicely down when slowed down and shifts up when sped up!
    const pitchFactor = speed; 

    // Sound duration mappings for dynamic ambient aura timing
    const durations: Record<SoundPad["type"], number> = {
      magic: 0.6,
      level: 0.55,
      spin: 0.8,
      spring: 0.45,
      charge: 0.9,
      laser: 0.35,
      jutsu: 0.25,
      rubber: 0.45,
      mystery: 0.55,
    };

    const activeDurationMs = durations[type] * durationMultiplier * 1000;

    // Reset glow back to light cyan after sound plays out
    glowTimeoutRef.current = setTimeout(() => {
      setAmbientGlow("rgba(34, 211, 238, 0.12)");
      setActiveWaveColor("#22d3ee");
    }, activeDurationMs + 250);

    if (type === "magic") {
      // Doraemon Magic Pocket - Arpeggiated sparkling sweep
      osc.type = "sine";
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.25, now + 0.05 * durationMultiplier);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6 * durationMultiplier);

      osc.frequency.setValueAtTime(440 * pitchFactor, now);
      osc.frequency.setValueAtTime(554 * pitchFactor, now + 0.15 * durationMultiplier);
      osc.frequency.setValueAtTime(659 * pitchFactor, now + 0.3 * durationMultiplier);
      osc.frequency.setValueAtTime(880 * pitchFactor, now + 0.45 * durationMultiplier);

      osc.start(now);
      osc.stop(now + 0.6 * durationMultiplier);
    } 
    else if (type === "level") {
      // Pokémon Level Up - Iconic rapid rising arpeggio
      osc.type = "square";
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.18, now + 0.02 * durationMultiplier);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5 * durationMultiplier);

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5 -> E5 -> G5 -> C6
      notes.forEach((freq, i) => {
        osc.frequency.setValueAtTime(freq * pitchFactor, now + (i * 0.08) * durationMultiplier);
      });

      osc.start(now);
      osc.stop(now + 0.55 * durationMultiplier);
    } 
    else if (type === "spin") {
      // Beyblade Rip-Spin - FM Sweep descending frequency
      osc.type = "sawtooth";
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.15, now + 0.05 * durationMultiplier);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.8 * durationMultiplier);

      osc.frequency.setValueAtTime(1000 * pitchFactor, now);
      osc.frequency.exponentialRampToValueAtTime(120 * pitchFactor, now + 0.7 * durationMultiplier);

      osc.start(now);
      osc.stop(now + 0.8 * durationMultiplier);
    } 
    else if (type === "spring") {
      // Shin Chan Mischief - Cute pitch bending bounce
      osc.type = "triangle";
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.25, now + 0.02 * durationMultiplier);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.45 * durationMultiplier);

      osc.frequency.setValueAtTime(200 * pitchFactor, now);
      osc.frequency.linearRampToValueAtTime(600 * pitchFactor, now + 0.2 * durationMultiplier);
      osc.frequency.linearRampToValueAtTime(150 * pitchFactor, now + 0.45 * durationMultiplier);

      osc.start(now);
      osc.stop(now + 0.45 * durationMultiplier);
    } 
    else if (type === "charge") {
      // Dragon Ball Ki Power Charge
      osc.type = "sawtooth";
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.1 * durationMultiplier);
      gainNode.gain.linearRampToValueAtTime(0.001, now + 0.9 * durationMultiplier);

      osc.frequency.setValueAtTime(100 * pitchFactor, now);
      for (let i = 0; i < 20; i++) {
        osc.frequency.setValueAtTime((200 + i * 30 + Math.sin(i) * 40) * pitchFactor, now + (i * 0.04) * durationMultiplier);
      }

      osc.start(now);
      osc.stop(now + 0.9 * durationMultiplier);
    } 
    else if (type === "laser") {
      // Retro laser shot
      osc.type = "triangle";
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.22, now + 0.02 * durationMultiplier);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35 * durationMultiplier);

      osc.frequency.setValueAtTime(1800 * pitchFactor, now);
      osc.frequency.exponentialRampToValueAtTime(80 * pitchFactor, now + 0.3 * durationMultiplier);

      osc.start(now);
      osc.stop(now + 0.35 * durationMultiplier);
    }
    else if (type === "jutsu") {
      // Naruto Ninja Jutsu - Rapid smokey teleport poof
      osc.type = "sawtooth";
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.25, now + 0.01 * durationMultiplier);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.25 * durationMultiplier);

      osc.frequency.setValueAtTime(1200 * pitchFactor, now);
      osc.frequency.exponentialRampToValueAtTime(180 * pitchFactor, now + 0.2 * durationMultiplier);

      osc.start(now);
      osc.stop(now + 0.25 * durationMultiplier);
    }
    else if (type === "rubber") {
      // Luffy Elastic Gum-Gum stretch & snap
      osc.type = "triangle";
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.05 * durationMultiplier);
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.3 * durationMultiplier);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.45 * durationMultiplier);

      // Wobbling stretch frequency, then quick snap
      osc.frequency.setValueAtTime(140 * pitchFactor, now);
      osc.frequency.linearRampToValueAtTime(320 * pitchFactor, now + 0.3 * durationMultiplier);
      osc.frequency.setValueAtTime(680 * pitchFactor, now + 0.32 * durationMultiplier); // The Snap!
      osc.frequency.exponentialRampToValueAtTime(180 * pitchFactor, now + 0.42 * durationMultiplier);

      osc.start(now);
      osc.stop(now + 0.45 * durationMultiplier);
    }
    else if (type === "mystery") {
      // Conan Clue Deduction - Elegant double crystal chime arpeggio
      osc.type = "sine";
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.22, now + 0.02 * durationMultiplier);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.55 * durationMultiplier);

      // C6 (1046Hz) -> E6 (1318Hz) -> G6 (1568Hz)
      osc.frequency.setValueAtTime(1046.50 * pitchFactor, now);
      osc.frequency.setValueAtTime(1318.51 * pitchFactor, now + 0.12 * durationMultiplier);
      osc.frequency.setValueAtTime(1567.98 * pitchFactor, now + 0.24 * durationMultiplier);

      osc.start(now);
      osc.stop(now + 0.55 * durationMultiplier);
    }
  };

  // Draw real-time dynamic visual wave representation using Canvas API
  const drawOscilloscope = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const renderFrame = () => {
      animationFrameId.current = requestAnimationFrame(renderFrame);
      analyser.getByteTimeDomainData(dataArray);

      // Match theme styled background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const waveColor = canvas.getAttribute("data-wave-color") || "#22d3ee";

      // Draw a subtle matching glowing smoke mist background INSIDE the oscilloscope screen canvas!
      if (waveColor !== "#22d3ee") {
        const gradient = ctx.createRadialGradient(
          canvas.width / 2, 
          canvas.height / 2, 
          5, 
          canvas.width / 2, 
          canvas.height / 2, 
          120
        );
        gradient.addColorStop(0, waveColor + "3c"); // Even brighter screen smoke glow
        gradient.addColorStop(0.5, waveColor + "1a");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.lineWidth = 3;
      // Glowing neon wave color
      ctx.strokeStyle = waveColor;
      ctx.shadowBlur = 10;
      ctx.shadowColor = waveColor;

      ctx.beginPath();

      const sliceWidth = (canvas.width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    renderFrame();
  };

  return (
    <section className="py-20 bg-sky-50 dark:bg-slate-950 neon:bg-[#060012] relative overflow-hidden transition-colors duration-300 transform-gpu z-10">
      
      {/* Decorative organic background grids */}
      <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 neon:opacity-20 pointer-events-none transform-gpu" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, #64748b 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>

      {/* LEFT OUTSIDE DYNAMIC SMOKY AURA BACKDROP (Optimized with higher brightness & tighter high-power blur) */}
      <motion.div
        animate={{
          scale: activePad ? [1, 1.4, 1.25] : [1, 1.12, 1],
          x: activePad ? [-30, 30, 0] : [0, 15, 0],
          y: activePad ? [30, -30, 0] : [0, -15, 0],
        }}
        transition={{
          duration: activePad ? 0.7 : 14,
          repeat: activePad ? 0 : Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-[-160px] md:left-[-200px] lg:left-[-220px] -translate-y-1/2 w-[350px] h-[350px] md:w-[650px] md:h-[650px] rounded-full blur-[80px] md:blur-[130px] pointer-events-none z-0 transition-colors duration-1000 ease-out opacity-85 md:opacity-100"
        style={{
          backgroundColor: ambientGlow,
        }}
      />

      {/* RIGHT OUTSIDE DYNAMIC SMOKY AURA BACKDROP (Optimized with higher brightness & tighter high-power blur) */}
      <motion.div
        animate={{
          scale: activePad ? [1, 1.4, 1.25] : [1, 1.12, 1],
          x: activePad ? [30, -30, 0] : [0, -15, 0],
          y: activePad ? [-30, 30, 0] : [0, 15, 0],
        }}
        transition={{
          duration: activePad ? 0.7 : 14,
          repeat: activePad ? 0 : Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 right-[-160px] md:right-[-200px] lg:right-[-220px] -translate-y-1/2 w-[350px] h-[350px] md:w-[650px] md:h-[650px] rounded-full blur-[80px] md:blur-[130px] pointer-events-none z-0 transition-colors duration-1000 ease-out opacity-85 md:opacity-100"
        style={{
          backgroundColor: ambientGlow,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-600 dark:text-cyan-400 font-black uppercase tracking-wider text-[10px] shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-spin" style={{ animationDuration: '4s' }} /> Sound Station
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white neon:text-cyan-50 leading-tight">
            Childhood <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500 dark:from-pink-400 dark:to-purple-500 neon:from-cyan-400 neon:to-fuchsia-500">8-Bit Sound Deck</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 neon:text-cyan-100/60 text-sm md:text-base mt-2 max-w-lg mx-auto font-medium">
            Click any retro console pad to instantly synthesize legendary childhood sound waves dynamically inside your browser!
          </p>
        </div>

        {/* Console Deck Shell (Parent Card) */}
        <div className="max-w-4xl mx-auto bg-white/40 dark:bg-slate-900/40 neon:bg-[#12002b]/40 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-white dark:border-slate-850 neon:border-cyan-500/20 shadow-xl relative overflow-hidden z-10">
          
          {/* Dynamic inner smoky glow overlay directly behind pads inside the card */}
          <div 
            className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out z-0 opacity-25 dark:opacity-35 neon:opacity-45 blur-[70px] rounded-[2.5rem]"
            style={{
              background: activePad 
                ? `radial-gradient(circle at center, ${ambientGlow.replace("0.55", "0.7").replace("0.65", "0.8")} 0%, transparent 70%)`
                : 'none',
            }}
          />

          {/* Futuristic Visualizer Screen */}
          <div className="relative mb-6 p-4 rounded-2xl bg-black border-2 border-slate-300 dark:border-slate-800 neon:border-cyan-400/50 shadow-inner overflow-hidden flex flex-col items-center justify-center z-10">
            
            {/* Visual Screen Watermark */}
            <div className="absolute top-2 left-4 text-[9px] text-cyan-400/70 font-mono tracking-widest uppercase flex items-center gap-1">
              <Volume2 className="w-3 h-3 animate-pulse" /> Oscilloscope: Web Audio Synth
            </div>
            <div className="absolute top-2 right-4 text-[9px] text-slate-500 font-mono">
              [ACTIVE]
            </div>

            {/* Live Canvas wave display with dynamic color data binding */}
            <canvas 
              ref={canvasRef} 
              data-wave-color={activeWaveColor}
              width="600" 
              height="100" 
              className="w-full h-24 max-w-full rounded-lg bg-slate-950 pointer-events-none border border-slate-900 shadow-inner"
            />
          </div>

          {/* Dynamic Tempo & Pitch Modulation Console Deck */}
          <div className="relative mb-8 p-4 rounded-2xl bg-slate-100/50 dark:bg-black/30 neon:bg-[#090014]/50 border border-slate-200 dark:border-slate-800/45 neon:border-cyan-500/10 flex flex-col md:flex-row items-center justify-between gap-4 z-10">
            <div className="flex items-center gap-3 text-left w-full md:w-auto">
              <div className="p-2.5 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-550 dark:text-cyan-400 neon:text-cyan-400 animate-pulse">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-black text-slate-850 dark:text-white neon:text-cyan-50 uppercase tracking-wider">Tempo & Pitch Deck</h4>
                <p className="text-[9px] md:text-[10px] font-bold text-slate-500 dark:text-slate-400 neon:text-cyan-300/40">Slow down the speed to unlock awesome Slowed & Reverb / Pitch-Down tape effects!</p>
              </div>
            </div>
            
            {/* Interactive Speed Controllers */}
            <div className="flex items-center gap-3.5 w-full md:w-auto justify-between md:justify-end">
              <span className="text-xs font-mono font-black text-cyan-500 dark:text-cyan-400 neon:text-cyan-400 bg-black/10 dark:bg-black/40 px-2.5 py-1 rounded-lg border border-transparent dark:border-slate-800 neon:border-cyan-500/20">{speed.toFixed(2)}x</span>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.25"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="flex-1 md:w-36 accent-cyan-400 bg-slate-200 dark:bg-slate-800 neon:bg-[#090014] h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex items-center gap-1.5">
                {[0.5, 1.0, 1.5].map((val) => (
                  <button
                    key={val}
                    onClick={() => setSpeed(val)}
                    className={`px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                      speed === val 
                        ? 'bg-cyan-400 text-slate-950 font-black scale-105 shadow-md shadow-cyan-400/20' 
                        : 'bg-slate-100 dark:bg-slate-900 neon:bg-[#090014]/60 text-slate-500 dark:text-slate-400 neon:text-cyan-400/80 border border-slate-250 dark:border-slate-800 neon:border-cyan-500/10 hover:border-cyan-400/30'
                    }`}
                  >
                    {val === 0.5 ? 'Slow' : val === 1.0 ? 'Norm' : 'Fast'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Interactive Pad Grid (3x3 Perfect Square) */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 z-10">
            {PADS.map((pad) => {
              const isActive = activePad === pad.id;
              
              return (
                <motion.div
                  key={pad.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setActivePad(pad.id);
                    playSound(pad.type);
                    setTimeout(() => setActivePad(null), 300);
                  }}
                  className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? `${pad.color} ${pad.glow} border-transparent scale-103` 
                      : 'bg-white/80 dark:bg-slate-950/60 neon:bg-[#090014]/80 border-slate-200 dark:border-slate-855 neon:border-cyan-500/10 hover:border-cyan-400'
                  }`}
                >
                  <div className="relative z-10 flex flex-col justify-between h-full text-left select-none">
                    
                    {/* Top row */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[8px] font-mono tracking-widest font-black uppercase px-2 py-0.5 rounded ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-900 neon:bg-cyan-950/40 text-slate-500 dark:text-slate-400 neon:text-cyan-400'
                      }`}>
                        PAD #{pad.id.toString().padStart(2, "0")}
                      </span>
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-900 neon:bg-cyan-950/20'}`}>
                        <Play className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400 neon:text-cyan-400 fill-current'}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h4 className={`text-base font-black leading-tight ${isActive ? 'text-white' : 'text-slate-855 dark:text-white neon:text-cyan-100'}`}>
                        {pad.name}
                      </h4>
                      <p className={`text-[10px] font-bold mt-1 ${isActive ? 'text-white/80' : 'text-slate-500 dark:text-slate-400 neon:text-cyan-200/50'}`}>
                        {pad.subtitle}
                      </p>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
