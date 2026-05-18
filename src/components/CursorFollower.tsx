"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "next-themes";

export default function CursorFollower() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  // High-performance motion values (bypasses React state loop for 120FPS tracking)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs to add elegant drag delay
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);

    // Disable custom cursor on mobile/touch screens to ensure flawless UX
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Scale up cursor on interactive elements (buttons, links, select cards)
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest(".cursor-pointer") ||
        target.closest("button") ||
        target.closest("a");

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!mounted || !isVisible) return null;

  const currentTheme = theme || 'dark';

  // Theme-specific glow colors
  let cursorColor = "border-orange-500 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.3)]";
  if (currentTheme === "dark") {
    cursorColor = "border-pink-500 bg-pink-500/10 shadow-[0_0_15px_rgba(236,72,153,0.3)]";
  } else if (currentTheme === "neon") {
    cursorColor = "border-cyan-400 bg-cyan-400/20 shadow-[0_0_20px_#22d3ee,inset_0_0_10px_#22d3ee]";
  }

  return (
    <motion.div
      className={`fixed top-0 left-0 w-8 h-8 rounded-full border-2 pointer-events-none z-[9999] transform-gpu translate-z-0 ${cursorColor}`}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isHovered ? 1.8 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  );
}
