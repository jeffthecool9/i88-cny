import React, { useEffect, useMemo, useState } from "react";
import { EVENT_DATES } from "../constants";
import cnyBg from "../assets/cny.png";

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
    <section className="relative h-screen overflow-hidden flex items-center justify-center">
      
      {/* ✅ BACKGROUND IMAGE (VISIBLE) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${cnyBg})`,
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) scale(1.05)`,
        }}
      />

      {/* ✅ SOFT DARK OVERLAY (NOT KILLING IMAGE) */}
      <div className="absolute inset-0 bg-black/25" />

      {/* ✅ GOLD LIGHT VIGNETTE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.25),transparent_60%)]" />

      {/* PARTICLES */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bg-yellow-400 rounded-full blur-[1px]"
            style={{
              width: p.size,
              height: p.size,
              top: p.top,
              left: p.left,
              opacity: p.opacity,
              animation: `pulse ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative z-20 text-center px-6">
        <h1 className="text-6xl md:text-8xl font-black cny-title-glow mb-4">
          八仙过海
        </h1>

        <p className="text-white tracking-[0.2em] font-bold mb-8">
          COLLECT WEAPONS • UNLOCK REWARDS • GRAB THE GRAND PRIZE
        </p>

        <div className="inline-block bg-yellow-600/90 text-black font-black px-8 py-3 rounded-full">
          Event Period: {EVENT_DATES.full}
        </div>
      </div>
    </section>
  );
};

export default Hero;
