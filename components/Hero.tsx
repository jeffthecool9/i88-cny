import React, { useEffect, useMemo, useState } from "react";
import { EVENT_DATES } from "../constants";
import cnyBg from "@/src/assets/cny.png"; // ✅ IMPORTANT: src/assets MUST be imported

type Particle = {
  id: number;
  top: string;
  left: string;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
};

const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 35;
      const y = (e.clientY / window.innerHeight - 0.5) * 35;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <section className="relative h-screen min-h-[750px] flex flex-col items-center justify-center overflow-hidden">
      {/* BACKGROUND IMAGE (parallax) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${cnyBg})`,
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) scale(1.06)`,
        }}
      />

      {/* LIGHT GLOW LAYER */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.12),transparent_55%)]" />

      {/* DARK OVERLAYS */}
      <div className="absolute inset-0 z-[2] bg-black/45" />
      <div className="absolute inset-0 z-[3] bg-gradient-to-b from-black/20 via-transparent to-black/70" />
      <div className="absolute inset-0 z-[4] shadow-[inset_0_0_180px_rgba(0,0,0,0.85)]" />
      <div className="absolute inset-x-0 bottom-0 z-[5] h-32 bg-gradient-to-t from-[#0c0101] to-transparent" />

      {/* PARTICLES */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bg-[#FFD700] rounded-full blur-[0.7px] animate-pulse"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              top: p.top,
              left: p.left,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 w-full max-w-4xl pt-10">
        <h1 className="text-7xl md:text-[10rem] font-black mb-2 cny-title-glow tracking-tighter leading-none select-none">
          八仙过海
        </h1>

        <p className="text-white text-lg md:text-3xl font-bold mb-10 drop-shadow-[0_4px_15px_rgba(0,0,0,1)] tracking-[0.2em] uppercase">
          Collect Weapons • Unlock Rewards • Grab the Grand Prize
        </p>

        <div className="bg-[#8B6E0D]/95 border-2 border-[#ffcc00] text-white px-10 py-3 rounded-full font-black text-sm md:text-xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] mb-14 backdrop-blur-2xl">
          Event Period: {EVENT_DATES.full}
        </div>
      </div>
    </section>
  );
};

export default Hero;
