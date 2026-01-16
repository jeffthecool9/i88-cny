
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
      className="relative h-[95vh] md:h-screen min-h-[800px] flex flex-col items-center justify-center overflow-hidden bg-[url('eight-immortals.png')] bg-cover bg-center bg-no-repeat"
    >
      {/* 1. OVERLAY LAYER (Atmospheric Effects) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Darkening Overlay to ensure readability while showing the image */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,rgba(0,0,0,0.8)_100%)]"></div>

        {/* Ambient Cosmic Particles */}
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

        {/* Dynamic Color Flares (Blue/Red) */}
        <div className="absolute top-[-20%] left-[-10%] w-[90%] h-[90%] rounded-full bg-[#173489]/20 blur-[120px] animate-[cosmic-pulse_12s_infinite]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[90%] h-[90%] rounded-full bg-[#8b0000]/30 blur-[120px] animate-[cosmic-pulse_12s_infinite_reverse]"></div>

        {/* Strict Dual Rays (Strict Blue & Red) */}
        <div className="absolute top-0 left-0 w-full h-full z-15 opacity-10 animate-rays">
          <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,#173489_20deg,transparent_40deg,#8b0000_60deg,transparent_80deg)]"></div>
        </div>

        {/* Bottom Transition Fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#000814] to-transparent z-40"></div>
      </div>

      {/* 2. GOLD SPARKLES */}
      <div className="absolute inset-0 z-45 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-[#eab308] rounded-full blur-[0.5px] animate-pulse"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDuration: Math.random() * 4 + 2 + 's',
              opacity: Math.random() * 0.4 + 0.1
            }}
          />
        ))}
      </div>

      {/* 3. FOREGROUND CONTENT */}
      <div className="relative z-50 flex flex-col items-center text-center px-6 w-full max-w-lg">
        
        {/* FANCY TITLE COMPOSITION */}
        <div className="mb-14 relative group">
          {/* External Ornate Flourishes */}
          <div className="absolute -top-12 -left-12 text-[#eab308]/30 w-32 h-32 select-none pointer-events-none">
            <DetailedChineseCloud className="w-full h-full animate-float opacity-60" />
          </div>
          <div className="absolute -bottom-12 -right-12 text-[#eab308]/30 w-32 h-32 select-none pointer-events-none">
            <DetailedChineseCloud className="w-full h-full animate-float-reverse opacity-60 rotate-180" />
          </div>

          {/* Background Radiant Glow */}
          <div className="absolute inset-0 -m-12 bg-[radial-gradient(circle,rgba(234,179,8,0.3)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl"></div>

          {/* The Artistic Frame */}
          <div className="relative p-2 rounded-[2rem] bg-gradient-to-br from-[#eab308] via-[#fde047] to-[#854d0e] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="bg-[#000814]/80 backdrop-blur-md rounded-[1.8rem] p-6 md:p-10 relative overflow-hidden">
              
              {/* Subtle Texture/Lattice in Background */}
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')]"></div>

              {/* Character Stack */}
              <h1 className="relative flex flex-col items-center font-black select-none">
                
                {/* First Part: "八仙" - Pearl White Gradient */}
                <div className="relative mb-4 group/part">
                  <div className="absolute inset-0 bg-white/5 blur-2xl scale-125 rounded-full group-hover/part:bg-white/10 transition-colors"></div>
                  <span className="relative block text-[7rem] md:text-[9.5rem] leading-[0.9] bg-gradient-to-b from-white via-[#f0f0f0] to-[#cccccc] bg-clip-text text-transparent drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] tracking-[0.15em] pl-[0.15em] transition-transform duration-700 hover:scale-[1.05]">
                    八仙
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shine_4s_ease-in-out_infinite] pointer-events-none mix-blend-overlay"></div>
                  </span>
                </div>

                {/* Second Part: "来财" with 3D Polished Lacquer Style */}
                <div className="relative group/part2 mt-2">
                  {/* Traditional Red Seal Effect Overlay */}
                  <div className="absolute inset-[-12%] bg-gradient-to-br from-[#ef4444]/20 to-[#8b0000]/40 rounded-xl border border-[#ef4444]/30 transform -rotate-1 group-hover/part2:rotate-1 transition-all duration-700 shadow-inner"></div>
                  
                  <span 
                    className="relative block text-[7rem] md:text-[9.5rem] leading-[0.9] tracking-[0.15em] pl-[0.15em] transition-transform duration-700 hover:scale-[1.05] 
                               bg-gradient-to-b from-[#ff8e8e] via-[#ef4444] to-[#8b0000] bg-clip-text text-transparent 
                               filter drop-shadow-[0_1.5px_0.5px_rgba(255,255,255,0.9)] drop-shadow-[0_8px_15px_rgba(0,0,0,0.9)]"
                    style={{
                      // Custom shadow for that sharp corner rim light effect
                      textShadow: '0px 0px 10px rgba(239, 68, 68, 0.4)'
                    }}
                  >
                    来财
                    {/* Animated Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-full animate-[shine_4s_ease-in-out_infinite_reverse] pointer-events-none mix-blend-overlay"></div>
                  </span>
                </div>
              </h1>

              {/* Ornate Inner Corner Brackets */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#eab308]/40 rounded-tl-lg"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#eab308]/40 rounded-tr-lg"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#eab308]/40 rounded-bl-lg"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#eab308]/40 rounded-br-lg"></div>
            </div>
          </div>
        </div>
        
        {/* Tagline Box - Elevated Luxury */}
        <div className="w-full bg-[#000814]/90 border-2 border-[#eab308] px-4 py-8 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] mb-10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#eab308]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
          <p className="relative z-10 text-[#eab308] text-2xl md:text-3xl font-black tracking-[0.3em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            8 Immortals<br/>Treasure
          </p>
        </div>

        {/* Gold Info Capsule */}
        <div className="w-full bg-gradient-to-r from-[#001a4d] to-[#4a0404] text-[#eab308] px-8 py-4 rounded-full font-black text-sm md:text-base shadow-2xl mb-8 border-2 border-[#eab308]/60 uppercase tracking-[0.2em] relative group">
          <span className="relative z-10">EVENT: {EVENT_DATES.full}</span>
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
        </div>

        {/* How to Play Link */}
        <button 
          onClick={onOpenTutorial}
          className="text-[#eab308] font-black text-sm uppercase tracking-[0.3em] hover:text-white transition-all mb-14 relative group"
        >
          <span className="relative z-10">HOW TO PLAY?</span>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#eab308] group-hover:w-full transition-all duration-500"></div>
        </button>

        {/* Gold Button - The "Call to Fortune" */}
        <div className="p-1 w-full max-w-xs transition-all duration-300">
          <button 
            onClick={() => document.getElementById('mechanics')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full bg-gradient-to-b from-[#fde047] via-[#eab308] to-[#854d0e] text-[#2a0101] py-6 rounded-3xl font-black text-2xl md:text-3xl uppercase tracking-tighter border-b-8 border-[#4a2a00] 
                       shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(234,179,8,0.2)] 
                       transition-all duration-300 ease-out
                       hover:scale-[1.05] hover:-translate-y-2 hover:shadow-[0_50px_100px_rgba(0,0,0,0.9),0_0_60px_rgba(234,179,8,0.4)]
                       active:scale-[0.98] active:translate-y-0.5 active:shadow-inner"
          >
            JOIN EVENT 🏮
          </button>
        </div>
      </div>

      {/* 4. MARQUEE (Strict Gold on Dark) */}
      <div className="absolute bottom-0 w-full bg-black/90 backdrop-blur-xl text-[#eab308] py-5 font-black text-[11px] md:text-sm uppercase z-50 border-t-2 border-[#eab308]/30 tracking-[0.2em]">
        <div className="flex marquee-container">
          <div className="marquee-content space-x-16">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="flex items-center gap-6 whitespace-nowrap">
                🏮 EVENT STARTS {EVENT_DATES.start} 🏮 COLLECT DIVINE WEAPONS 🏮 WIN REWARDS 🏮
              </span>
            ))}
          </div>
          <div className="marquee-content space-x-16">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="flex items-center gap-6 whitespace-nowrap">
                🏮 EVENT STARTS {EVENT_DATES.start} 🏮 COLLECT DIVINE WEAPONS 🏮 WIN REWARDS 🏮
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
