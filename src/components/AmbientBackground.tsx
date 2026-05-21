"use client";

import { useAppTheme } from "@/hooks/useAppTheme";

const ORB_CONFIG = {
  light: [
    { className: "bg-orange-400/25 w-[420px] h-[420px] -top-32 -left-24", delay: "0s" },
    { className: "bg-cyan-400/20 w-[360px] h-[360px] top-[40%] -right-20", delay: "2s" },
    { className: "bg-yellow-300/25 w-[300px] h-[300px] bottom-[10%] left-[20%]", delay: "4s" },
  ],
  dark: [
    { className: "bg-pink-600/15 w-[480px] h-[480px] -top-40 right-[10%]", delay: "0s" },
    { className: "bg-blue-600/12 w-[400px] h-[400px] top-[35%] -left-32", delay: "3s" },
    { className: "bg-orange-500/10 w-[320px] h-[320px] bottom-[5%] right-[15%]", delay: "1.5s" },
  ],
  neon: [
    { className: "bg-fuchsia-600/20 w-[500px] h-[500px] -top-48 left-[5%] shadow-[0_0_80px_rgba(192,38,211,0.25)]", delay: "0s" },
    { className: "bg-cyan-500/15 w-[380px] h-[380px] top-[50%] -right-28 shadow-[0_0_60px_rgba(34,211,238,0.2)]", delay: "2.5s" },
    { className: "bg-purple-600/15 w-[340px] h-[340px] bottom-0 left-[30%] shadow-[0_0_50px_rgba(147,51,234,0.2)]", delay: "4s" },
  ],
} as const;

export default function AmbientBackground() {
  const { currentTheme } = useAppTheme();
  const orbs = ORB_CONFIG[currentTheme] ?? ORB_CONFIG.dark;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden
    >
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={`ambient-orb absolute rounded-full blur-[100px] transform-gpu ${orb.className}`}
          style={{ animationDelay: orb.delay }}
        />
      ))}
      <div className="absolute inset-0 grain-overlay opacity-[0.35] dark:opacity-[0.2] neon:opacity-[0.25]" />
    </div>
  );
}
