
import React, { useEffect, useState } from 'react';
import { EVENT_DATES } from '../constants';

const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Precise parallax calculation for an immersive mythical experience
      const x = (e.clientX / window.innerWidth - 0.5) * 35;
      const y = (e.clientY / window.innerHeight - 0.5) * 35;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen min-h-[750px] flex flex-col items-center justify-center overflow-hidden">
{/* CNY Eight Immortals Background */}
<div className="absolute inset-0 z-0">
  <div
    className="absolute inset-0 bg-center bg-cover will-change-transform"
    style={{
      backgroundImage: "url('/assets/cny-baxian-bg.png')",
      transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) scale(1.06)`,
    }}
  />

  {/* Dark readability overlay */}
  <div className="absolute inset-0 bg-black/40" />

  {/* Cinematic vignette */}
  <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.85)]" />
</div>



      {/* 4. MIST & FOG LAYERS (Cinematic Depth) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Rolling Mist at the bottom */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/10 to-transparent blur-[120px] opacity-30 animate-pulse"></div>
        
        {/* Floating Clouds */}
        <div className="absolute top-1/4 -left-1/4 w-[80%] h-full bg-white/[0.03] blur-[100px] rounded-full animate-[float_15s_infinite_ease-in-out]"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[80%] h-full bg-white/[0.03] blur-[100px] rounded-full animate-[float_12s_infinite_ease-in-out_reverse]"></div>
      </div>

      {/* 5. GOLDEN DIVINE PARTICLES (Dopamine-triggering Micro-interactions) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-[#FFD700] rounded-full blur-[0.5px] animate-pulse"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDuration: Math.random() * 4 + 2 + 's',
              animationDelay: Math.random() * 5 + 's',
              opacity: Math.random() * 0.4 + 0.1
            }}
          />
        ))}
      </div>

      {/* 6. CONTENT LAYER (FOREGROUND - HIGH CONTRAST) */}
      <div className="relative z-30 flex flex-col items-center text-center px-6 w-full max-w-4xl pt-10">
        {/* Divine Emblem Animated Icon */}
        <div className="mb-6 animate-float">
          <div className="w-36 h-36 md:w-48 md:h-48 rounded-full border-[6px] border-[#ffcc00] shadow-[0_0_60px_rgba(255,204,0,0.8)] overflow-hidden bg-gradient-to-b from-[#8B0000] to-black relative">
            <img 
              src="https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=500&auto=format&fit=crop" 
              alt="Immortals Emblem" 
              className="w-full h-full object-cover scale-110"
            />
            {/* Inner Glow */}
            <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(255,215,0,0.4)] pointer-events-none"></div>
          </div>
        </div>
        
        {/* Event Title (Glow Effect) */}
        <h1 className="text-7xl md:text-[10rem] font-black mb-2 cny-title-glow tracking-tighter leading-none select-none">
          八仙过海
        </h1>
        
        {/* Sub-headline (High Contrast) */}
        <p className="text-white text-lg md:text-3xl font-bold mb-10 drop-shadow-[0_4px_10px_rgba(0,0,0,1)] tracking-widest uppercase">
          Collect Weapons • Unlock Rewards • Grab the Grand Prize
        </p>

        {/* Event Date Badge Pill */}
        <div className="bg-[#8B6E0D]/95 border-2 border-[#ffcc00] text-white px-12 py-3 rounded-full font-black text-sm md:text-xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] mb-14 backdrop-blur-xl border-opacity-70">
          Event Period: {EVENT_DATES.full}
        </div>

        {/* Cinematic Primary CTA */}
        <div className="cta-button-frame p-1 rounded-3xl shadow-[0_0_50px_rgba(255,204,0,0.5)] transition-all hover:scale-105 active:scale-95 group">
          <button 
            onClick={() => document.getElementById('mechanics')?.scrollIntoView({ behavior: 'smooth' })}
            className="relative bg-gradient-to-b from-[#ff4444] via-[#b91c1c] to-[#7f1d1d] text-white px-16 md:px-28 py-6 rounded-2xl font-black text-3xl md:text-4xl uppercase tracking-tighter border-t-2 border-white/40 shadow-2xl overflow-hidden"
          >
            {/* Button Shine Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] pointer-events-none"></div>
            EXPLORE NOW
          </button>
        </div>
      </div>

      {/* 7. TICKER STRIP (Event Anchoring) */}
      <div className="absolute bottom-0 w-full bg-gradient-to-r from-[#8B6E0D] via-[#FFD700] to-[#8B6E0D] text-[#2a0101] py-4 font-black text-xs md:text-base uppercase z-50 shadow-[0_-15px_40px_rgba(0,0,0,0.8)] border-t border-yellow-300/30">
        <div className="marquee-container">
          <div className="marquee-content space-x-16">
            {[...Array(6)].map((_, i) => (
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
          <div className="marquee-content space-x-16">
            {[...Array(6)].map((_, i) => (
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
