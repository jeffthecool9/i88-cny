import React from 'react';
import { motion } from 'framer-motion';
import { EVENT_DATES } from '../constants.ts';

const DetailedChineseCloud = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 60" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M25,45 C15,45 10,38 10,30 C10,20 22,18 28,22 C32,10 50,8 58,18 C68,12 85,15 88,30 C95,32 95,45 82,48 C85,55 70,58 60,52 C55,58 35,58 25,45 Z" />
  </svg>
);

const Hero: React.FC<{ onOpenTutorial: () => void }> = ({ onOpenTutorial }) => {
  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center pt-32 pb-32 overflow-hidden bg-[#D40000]">
      {/* Background Layers - InkGames Style Depth */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF2222]/40 via-transparent to-black/60"></div>
        <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(253,224,71,0.15)_0%,transparent_70%)] animate-rays"></div>
        
        {/* Floating Artifacts Blur */}
        <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-yellow-400/20 blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-[#8b0000]/40 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-lg">
        {/* Secondary Headline (Pill style) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 bg-black/20 backdrop-blur-lg border border-white/10 px-6 py-2 rounded-full inline-flex items-center gap-2"
        >
          <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.3em]">Special Event Launch</span>
          <div className="w-1 h-1 bg-white/30 rounded-full"></div>
          <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em]">{EVENT_DATES.start}</span>
        </motion.div>

        {/* Main Title Stack */}
        <div className="relative mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <h1 className="flex flex-col items-center leading-none">
              <span className="text-[7rem] md:text-[9rem] font-black text-white cny-font drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] leading-[0.8] tracking-tighter">
                八仙
              </span>
              <span className="text-[7rem] md:text-[9rem] font-black text-yellow-400 cny-font drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] leading-[0.8] tracking-tighter">
                来财
              </span>
            </h1>
          </motion.div>
          
          {/* Subtitle - Professional Layout */}
          <div className="mt-8 flex items-center justify-center gap-4 w-full">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-yellow-400/30"></div>
            <p className="text-yellow-400/80 text-xs font-black uppercase tracking-[0.5em] whitespace-nowrap">
              8 Immortals Treasure
            </p>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-yellow-400/30"></div>
          </div>
        </div>

        {/* Action Group */}
        <div className="flex flex-col items-center gap-6 w-full">
          <button 
            onClick={() => document.getElementById('mechanics')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full py-6 bg-gradient-to-b from-[#fde047] via-[#eab308] to-[#854d0e] text-[#2a0101] rounded-[2rem] font-black text-2xl uppercase tracking-tighter shadow-[0_25px_60px_rgba(0,0,0,0.4)] border-b-8 border-[#4a2a00] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Enter The Portal 🏮
          </button>
          
          <button 
            onClick={onOpenTutorial}
            className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">How to Play</span>
            <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
              <svg className="w-2.5 h-2.5 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Marquee Footer - Solid & Professional */}
      <div className="absolute bottom-0 w-full bg-black/40 backdrop-blur-xl py-5 border-t border-white/10">
        <div className="overflow-hidden">
          <div className="animate-marquee whitespace-nowrap opacity-60">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="flex items-center gap-12 mx-6 text-white font-black text-[9px] uppercase tracking-[0.3em]">
                <span>● LIMITED EDITION WEAPONS</span>
                <span>● TOTAL PRIZE POOL 8.8M</span>
                <span>● COLLECT TO UNLOCK DIVINE MODE</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;