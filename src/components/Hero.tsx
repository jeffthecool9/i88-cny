import React from 'react';
import { EVENT_DATES } from '../constants.ts';

interface HeroProps {
  onOpenTutorial: () => void;
}

const DetailedChineseCloud = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 60" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M25,45 C15,45 10,38 10,30 C10,20 22,18 28,22 C32,10 50,8 58,18 C68,12 85,15 88,30 C95,32 95,45 82,48 C85,55 70,58 60,52 C55,58 35,58 25,45 Z" />
    <path d="M35,48 C30,52 20,48 22,42" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const Hero: React.FC<HeroProps> = ({ onOpenTutorial }) => {
  return (
    <section 
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#000814]"
    >
      {/* 1. BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        {/* Image Background with Fallback Color */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('/eight-immortals.png')" }}
        ></div>
        
        {/* Overlays for Readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#000814]"></div>
        
        {/* Glow Effects (Simplified to avoid animation crashes) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl opacity-20 bg-blue-600 blur-[150px] pointer-events-none"></div>
      </div>

      {/* 2. MAIN CONTENT BOX (Z-index 20 ensures it's on top) */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 w-full max-w-2xl py-20">
        
        {/* Title Composition */}
        <div className="relative mb-10">
          {/* Decorative Clouds (Hidden on mobile for performance) */}
          <DetailedChineseCloud className="hidden md:block absolute -top-16 -left-16 w-32 h-32 text-[#eab308] opacity-30" />
          <DetailedChineseCloud className="hidden md:block absolute -bottom-16 -right-16 w-32 h-32 text-[#eab308] opacity-30 rotate-180" />

          <div className="bg-[#000814]/80 backdrop-blur-xl border-2 border-[#eab308]/50 p-8 rounded-[2.5rem] shadow-[0_0_80px_rgba(0,0,0,0.5)]">
            <h1 className="flex flex-col items-center font-black select-none">
              <span className="text-7xl md:text-9xl bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent tracking-widest">
                八仙
              </span>
              <span className="text-7xl md:text-9xl bg-gradient-to-b from-[#ff8e8e] to-[#8b0000] bg-clip-text text-transparent tracking-widest mt-2 drop-shadow-2xl">
                来财
              </span>
            </h1>
          </div>
        </div>

        {/* Info Area */}
        <div className="space-y-6 w-full max-w-sm">
          <div className="border-2 border-[#eab308] px-6 py-4 rounded-xl bg-black/40">
            <p className="text-[#eab308] text-xl md:text-2xl font-black tracking-[0.2em] uppercase">
              8 Immortals Treasure
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#001a4d] to-[#4a0404] text-[#eab308] py-3 px-6 rounded-full font-bold border border-[#eab308]/40 text-sm tracking-widest">
            EVENT: {EVENT_DATES.full}
          </div>

          <button 
            onClick={onOpenTutorial}
            className="text-[#eab308] font-bold text-sm tracking-[0.3em] hover:text-white transition-colors underline underline-offset-8"
          >
            HOW TO PLAY?
          </button>

          {/* Call to Action */}
          <button 
            onClick={() => document.getElementById('mechanics')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full bg-gradient-to-b from-[#fde047] via-[#eab308] to-[#854d0e] text-[#2a0101] py-5 rounded-2xl font-black text-2xl uppercase border-b-4 border-[#4a2a00] shadow-2xl hover:scale-105 active:scale-95 transition-transform"
          >
            JOIN EVENT 🏮
          </button>
        </div>
      </div>

      {/* 3. MARQUEE FOOTER */}
      <div className="absolute bottom-0 w-full bg-black/90 py-4 border-t border-[#eab308]/30 overflow-hidden">
        <div className="flex whitespace-nowrap animate-none md:animate-marquee">
          <div className="flex gap-10 text-[#eab308] text-xs font-bold tracking-widest px-4">
            <span>🏮 EVENT STARTS {EVENT_DATES.start} 🏮</span>
            <span>COLLECT DIVINE WEAPONS 🏮</span>
            <span>WIN REWARDS 🏮</span>
            <span className="hidden md:inline">🏮 EVENT STARTS {EVENT_DATES.start} 🏮</span>
            <span className="hidden md:inline">COLLECT DIVINE WEAPONS 🏮</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
