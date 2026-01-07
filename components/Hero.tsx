import React, { useEffect, useMemo, useState } from "react";
import { EVENT_DATES } from "../constants";
import cnyBg from "../assets/cny.png"; // ✅ IMPORTANT

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
      const x = (e.clientX / window.innerWidth - 0.5) * 25;
      const y = (e.clientY / window.innerHeight - 0.5) * 25;
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
    <section className="relative h-screen min-h-[750px] overflow-hidden flex items-center justify-center">
      
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          backgroundImage: `url(${cnyBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) scale(1.08)`,
        }}
      />

      {/* OVERLAYS */}
      <div className="absolute inset-0 bg-black/45 z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 z-10" />

      {/* PARTICLES */}
      <div className="absolute inset-0 z-20 pointer-events-none">
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
      <div className="relative z-30 text-center px-6 max-w-4xl">
        <h1 className="text-7xl md:text-[10rem] font-black mb-4 cny-title-glow tracking-tighter">
          八仙过海
        </h1>

        <p className="text-white text-lg md:text-3xl font-bold mb-10 tracking-[0.25em] uppercase">
          Collect Weapons • Unlock Rewards • Grab the Grand Prize
        </p>

        <div className="inline-block bg-[#8B6E0D]/95 border-2 border-[#ffcc00] text-white px-10 py-3 rounded-full font-black text-sm md:text-xl shadow-2xl backdrop-blur-xl">
          Event Period: {EVENT_DATES.full}
        </div>
      </div>
    </section>
  );
};

export default Hero;
