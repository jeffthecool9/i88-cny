
import React from 'react';
import { EVENT_DATES } from '../constants.ts';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[90vh] md:h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden bg-[#fafafa]">
      
      {/* 1. MYSTERIOUS HOLY BACKGROUND AREA */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-white">
        
        {/* The Exact Uploaded Image - Floating and Mysterious */}
        <div className="absolute inset-0 flex items-center justify-center scale-110">
          <img 
            src="eight-immortals.png" 
            alt="Eight Immortals / 八仙过海" 
            className="w-full h-full object-cover object-center animate-holy-float opacity-90 transition-opacity duration-1000"
            onLoad={(e) => (e.currentTarget.style.opacity = '1')}
          />
        </div>

        {/* 2. HOLY LIGHT OVERLAYS (Bright and Mysterious, not Dark) */}
        {/* Soft Golden Central Highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_20%,rgba(255,255,255,0.6)_60%,rgba(255,255,255,0.9)_100%)] z-10 pointer-events-none"></div>
        
        {/* Divine God Rays */}
        <div className="absolute top-0 left-0 w-full h-full z-15 pointer-events-none opacity-40 animate-rays overflow-hidden">
          <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(255,255,255,0.2)_10deg,transparent_20deg,rgba(255,255,255,0.1)_40deg,transparent_60deg)]"></div>
        </div>

        {/* 3. GENTLE WINDY CLOUDS (Passing by slowly) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Top Cloud Layer */}
          <div className="absolute top-10 -left-1/4 w-[150%] h-64 bg-white/20 blur-[80px] rounded-full animate-cloud-drift opacity-40"></div>
          {/* Bottom Mist Layer */}
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white via-white/40 to-transparent z-30"></div>
          {/* Drifting Ethereal Shapes */}
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-yellow-100/10 blur-[100px] rounded-full animate-cloud-drift opacity-30" style={{ animationDelay: '-10s' }}></div>
        </div>

        {/* 4. TRANSITION TO CONTENT */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0c0101] to-transparent z-40"></div>
      </div>

      {/* 5. HOLY PARTICLES (Divine Dust) */}
      <div className="absolute inset-0 z-45 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full blur-[1px] animate-pulse"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDuration: Math.random() * 6 + 4 + 's',
              animationDelay: Math.random() * 5 + 's',
              opacity: Math.random() * 0.6 + 0.2
            }}
          />
        ))}
      </div>

      {/* 6. CONTENT LAYER (FOREGROUND) */}
      <div className="relative z-50 flex flex-col items-center text-center px-6 w-full max-w-4xl">
        
        {/* Main Title (Elegant & Bright) */}
        <h1 className="text-8xl md:text-[12rem] font-black mb-0 cny-title-glow tracking-tighter leading-none select-none text-red-700 drop-shadow-2xl">
          八仙过海
        </h1>
        
        {/* Tagline */}
        <p className="text-red-900 text-xl md:text-3xl font-black mb-8 tracking-[0.2em] uppercase bg-white/40 backdrop-blur-sm px-6 py-2 rounded-lg">
          Collect Weapons • Unlock Rewards
        </p>

        {/* Date Capsule */}
        <div className="bg-red-800 text-yellow-400 px-8 py-2 rounded-full font-black text-sm md:text-lg shadow-xl mb-10 border-2 border-yellow-500">
          Event Period: {EVENT_DATES.full}
        </div>

        {/* Primary CTA */}
        <div className="p-1 rounded-3xl shadow-[0_15px_40px_rgba(139,0,0,0.3)] hover:scale-105 transition-all">
          <button 
            onClick={() => document.getElementById('mechanics')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-b from-yellow-400 to-yellow-600 text-red-950 px-16 md:px-24 py-5 rounded-2xl font-black text-2xl md:text-3xl uppercase tracking-tighter shadow-lg"
          >
            START JOURNEY 🏮
          </button>
        </div>
      </div>

      {/* 7. EVENT MARQUEE TICKER */}
      <div className="absolute bottom-0 w-full bg-red-900 text-yellow-400 py-3 font-bold text-xs md:text-sm uppercase z-50 shadow-2xl overflow-hidden border-t-2 border-yellow-500/30">
        <div className="flex marquee-container">
          <div className="marquee-content space-x-12">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="flex items-center gap-4 whitespace-nowrap">
                🏮 LIMITED TIME EVENT: {EVENT_DATES.full} 🏮 COLLECT THE DIVINE WEAPONS 🏮 UNLOCK REWARDS 🏮
              </span>
            ))}
          </div>
          <div className="marquee-content space-x-12">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="flex items-center gap-4 whitespace-nowrap">
                🏮 LIMITED TIME EVENT: {EVENT_DATES.full} 🏮 COLLECT THE DIVINE WEAPONS 🏮 UNLOCK REWARDS 🏮
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
