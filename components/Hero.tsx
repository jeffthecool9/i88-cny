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
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <section className="relative h-screen min-h-[750px] flex flex-col items-center justify-center overflow-hidden">
      {/* BACKGROUND IMAGE (served from /public) */}
      <div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: "url(/assets/cny.png)",
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) scale(1.05)`,
        }}
      />

      {/* LIGHT overlays only */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.18),transparent_60%)]" />

      {/* PARTICLES */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bg-[#FFD700] rounded-full blur-[1px] animate-pulse"
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
