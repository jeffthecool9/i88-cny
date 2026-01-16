import React from 'react';
import { INITIAL_WEAPONS } from '../constants.ts';

const Mechanics: React.FC = () => {
  return (
    <section id="mechanics" className="py-24 px-6 relative overflow-hidden bg-[#000814]">
      {/* Strict Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(239,68,68,0.1),transparent_50%)] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-7xl font-black text-center mb-24 text-[#eab308] uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]">
          The Path to Wealth
        </h2>

        {/* 4 Steps: Vertically Stacked, using Strict Blue/Red/Gold */}
        <div className="flex flex-col gap-6 mb-32">
          {[
            { 
              step: '1', 
              title: 'COLLECT WEAPONS', 
              desc: 'Gather the 8 legendary tools of the Immortals to gain divine power.', 
              color: 'bg-[#001a4d]', 
              accent: 'border-[#3b82f6]/40',
              numBg: 'from-[#173489] to-[#001a4d]'
            },
            { 
              step: '2', 
              title: 'GUARANTEE REWARD', 
              desc: 'Every play is a winner! Each ticket used guarantees a prize reveal.', 
              color: 'bg-[#4a0404]', 
              accent: 'border-[#ef4444]/40',
              numBg: 'from-[#8b0000] to-[#4a0404]'
            },
            { 
              step: '3', 
              title: 'MASTER ALL 8', 
              desc: 'Collect 4 sets of every weapon to unlock the legendary Grand Prize pool.', 
              color: 'bg-[#001a4d]', 
              accent: 'border-[#3b82f6]/40',
              numBg: 'from-[#173489] to-[#001a4d]'
            },
            { 
              step: '4', 
              title: 'WIN GRAND PRIZE', 
              desc: 'Complete your destiny and claim the ultimate treasure of the Eight Immortals.', 
              color: 'bg-[#4a0404]', 
              accent: 'border-[#ef4444]/40',
              numBg: 'from-[#8b0000] to-[#4a0404]'
            },
          ].map((item, i) => (
            <div 
              key={i} 
              className={`${item.color} ${item.accent} backdrop-blur-md p-10 md:p-14 rounded-[3rem] border-4 flex flex-col items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.7)] group transition-all hover:scale-[1.02]`}
            >
              <div className={`bg-gradient-to-br ${item.numBg} text-[#eab308] rounded-2xl w-20 h-20 flex items-center justify-center font-black text-4xl mb-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] border-2 border-[#eab308]/30`}>
                {item.step}
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-[#eab308] mb-4 uppercase tracking-tighter">
                {item.title}
              </h3>
              <p className="text-white/80 text-sm md:text-xl font-bold uppercase tracking-tight max-w-md leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Weapon Gallery Header */}
        <div className="flex items-center justify-between mb-16 border-b-4 border-[#eab308]/20 pb-6">
          <h3 className="text-3xl md:text-5xl font-black text-[#eab308] uppercase tracking-tight">
            Divine Collection
          </h3>
          <div className="hidden md:block h-[2px] flex-grow mx-10 bg-gradient-to-r from-[#eab308]/40 via-[#3b82f6]/20 to-[#ef4444]/20"></div>
        </div>

        {/* Grid Display for Weapons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {INITIAL_WEAPONS.map((weapon) => {
            const progressPercent = (weapon.count / weapon.max) * 100;
            return (
              <div 
                key={weapon.id} 
                className="bg-black/40 backdrop-blur-sm p-6 md:p-8 rounded-[2.5rem] text-center border border-white/5 shadow-2xl transition-all hover:scale-105 hover:border-[#eab308]/30 group"
              >
                {/* Floating Image Container with Enhanced Aura */}
                <div className="relative h-32 md:h-40 flex items-center justify-center mb-6 md:mb-8">
                  {/* Aura Pulse Background */}
                  <div 
                    className="absolute w-24 h-24 bg-[radial-gradient(circle,rgba(234,179,8,0.2)_0%,transparent_70%)] rounded-full animate-weapon-glow"
                    style={{ animationDelay: `${parseInt(weapon.id) * 0.2}s` }}
                  ></div>
                  
                  <img 
                    src={weapon.image} 
                    alt={weapon.name} 
                    className="max-w-[85%] max-h-[90%] object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.9)] animate-divine-float"
                    style={{ 
                      animationDelay: `${parseInt(weapon.id) * 0.3}s`,
                      animationDuration: `${5 + Math.random() * 3}s` 
                    }}
                  />
                </div>

                {/* Weapon Name (Gold) */}
                <div className="text-[11px] md:text-sm font-black text-[#eab308] uppercase mb-6 tracking-tight h-10 flex items-center justify-center leading-tight">
                  {weapon.name}
                </div>

                {/* Progress Section - Balanced Horizontal Ratio */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 w-full">
                    {/* Label + Count (1 Sentence) */}
                    <div className="whitespace-nowrap text-[9px] md:text-[10px] font-black text-white/40 uppercase tracking-widest shrink-0">
                      PROGRESS <span className="text-[#eab308] ml-1">{weapon.count}/{weapon.max}</span>
                    </div>
                    
                    {/* Balanced Progress Bar with Divine Shine Effect */}
                    <div className="flex-grow bg-black/80 rounded-full h-3 p-[2px] border border-[#eab308]/10 overflow-hidden relative animate-progress-bar-glow">
                      {/* Inner Fill Container */}
                      <div 
                        className="h-full rounded-full transition-all duration-1000 relative overflow-hidden bg-gradient-to-r from-[#173489] via-[#8b0000] to-[#ef4444] animate-energy-flow shadow-[0_0_15px_rgba(239,68,68,0.4)] ring-1 ring-white/10"
                        style={{ width: `${progressPercent}%` }}
                      >
                        {/* Layer 1: Animated Shimmer Sweep (Refracted Light) */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-progress-shimmer pointer-events-none"></div>
                        
                        {/* Layer 2: Subtle Energy Grain/Pattern */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

                        {/* Layer 3: Leading Edge Flare (The Divine Point) */}
                        {progressPercent > 0 && (
                          <div 
                            className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center pointer-events-none"
                          >
                            <div className="w-4 h-4 bg-white rounded-full blur-sm animate-flare-pulse"></div>
                            <div className="absolute w-2 h-2 bg-[#eab308] rounded-full brightness-150"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Mechanics;