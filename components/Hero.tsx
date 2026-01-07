import React, { useEffect, useMemo, useState } from "react";
import { EVENT_DATES } from "../constants";

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

  // Precompute particles ONCE (prevents re-randomizing every render)
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
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-center bg-cover will-change-transform"
          style={{
            backgroundImage: "url(/assets/cny.png)",
            transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) scale(1.06)`,
          }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
        <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.85)]" />
        {/* bottom fade to content */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0c0101] to-transparent z-10" />
      </div>

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
        <div className="mb-6 animate-float">
          <div className="w-36 h-36 md:w-48 md:h-48 rounded-full border-[6px] border-[#ffcc00] shadow-[0_0_60px_rgba(255,204,0,0.8)] overflow-hidden bg-gradient-to-b from-[#8B0000] to-black relative">
            <img
              src="https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=500&auto=format&fit=crop"
              alt="Immortals Emblem"
              className="w-full h-full object-cover scale-110"
            />
            <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(255,215,0,0.4)]" />
          </div>
        </div>

        <h1 className="text-7xl md:text-[10rem] font-black mb-2 cny-title-glow tracking-tighter leading-none select-none">
          八仙过海
        </h1>

        <p className="text-white text-lg md:text-3xl font-bold mb-10 drop-shadow-[0_4px_15px_rgba(0,0,0,1)] tracking-[0.2em] uppercase">
          Collect Weapons • Unlock Rewards • Grab the Grand Prize
        </p>

        <div className="bg-[#8B6E0D]/95 border-2 border-[#ffcc00] text-white px-10 py-3 rounded-full font-black text-sm md:text-xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] mb-14 backdrop-blur-2xl">
          Event Period: {EVENT_DATES.full}
        </div>

        <div className="cta-button-frame p-1 rounded-3xl shadow-[0_0_50px_rgba(255,204,0,0.6)] transition-all hover:scale-105 active:scale-95 group">
          <button
            onClick={() =>
              document.getElementById("mechanics")?.scrollIntoView({ behavior: "smooth" })
            }
            className="relative bg-gradient-to-b from-[#ff4444] via-[#b91c1c] to-[#7f1d1d] text-white px-16 md:px-32 py-6 rounded-2xl font-black text-3xl md:text-4xl uppercase tracking-tighter border-t-2 border-white/40 shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] pointer-events-none" />
            EXPLORE NOW
          </button>
        </div>
      </div>

      {/* TICKER */}
      <div className="absolute bottom-0 w-full bg-gradient-to-r from-[#8B6E0D] via-[#FFD700] to-[#8B6E0D] text-[#2a0101] py-4 font-black text-xs md:text-base uppercase z-30 shadow-[0_-15px_40px_rgba(0,0,0,0.9)] border-t border-yellow-300/40">
        <div className="marquee-container">
          <div className="marquee-content space-x-20">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className="text-2xl">🏮</span>
                LIMITED TIME EVENT: {EVENT_DATES.full}
                <span className="text-2xl">🏮</span>
                COLLECT WEAPONS
                <span className="text-2xl">🏮</span>
                GRAB REWARDS
              </span>
            ))}
          </div>
          <div className="marquee-content space-x-20">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className="text-2xl">🏮</span>
                LIMITED TIME EVENT: {EVENT_DATES.full}
                <span className="text-2xl">🏮</span>
                COLLECT WEAPONS
                <span className="text-2xl">🏮</span>
                GRAB REWARDS
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
