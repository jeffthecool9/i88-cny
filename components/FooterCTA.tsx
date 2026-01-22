
import React from 'react';
import { motion } from 'framer-motion';
import { EVENT_DATES } from '../constants';

const FloatingAngpow = ({ delay = 0, x = 0, y = 0, scale = 1 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.4, 1, 0.4],
      scale: [scale, scale * 1.2, scale],
      y: [y, y - 20, y],
      x: [x, x + 10, x]
    }}
    transition={{ 
      duration: 4, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut"
    }}
    className="absolute text-3xl pointer-events-none select-none z-0"
    style={{ left: `${50 + x}%`, top: `${50 + y}%` }}
  >
    🧧
  </motion.div>
);

const FooterCTA: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-[#000814] to-[#4a0404] text-center border-t border-[#eab308]/10 overflow-hidden relative">
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <h2 className="text-5xl md:text-7xl font-black text-[#eab308] mb-6 uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]">
          MASTER THE <br/> IMMORTALS
        </h2>
        <p className="text-white/60 mb-16 font-black uppercase tracking-[0.3em] text-[10px] md:text-sm">
          Limited time opportunity • ends {EVENT_DATES.end}
        </p>

        {/* Primary Action Button (Updated to Red Angpow Theme with surrounding elements) */}
        <div className="relative group max-w-md mx-auto h-32 flex items-center justify-center">
          
          {/* Surrounding Animated Angpows */}
          <FloatingAngpow delay={0} x={-60} y={-40} scale={1.2} />
          <FloatingAngpow delay={1} x={65} y={-35} scale={0.8} />
          <FloatingAngpow delay={0.5} x={-75} y={10} scale={1} />
          <FloatingAngpow delay={1.5} x={70} y={25} scale={1.1} />
          <FloatingAngpow delay={2} x={-10} y={-55} scale={0.7} />
          <FloatingAngpow delay={0.8} x={15} y={45} scale={0.9} />

          {/* Enhanced Red Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#FF0000] to-[#B91C1C] rounded-2xl blur-2xl opacity-20 group-hover:opacity-60 transition duration-500"></div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-full py-7 bg-gradient-to-b from-[#FF2222] via-[#D40000] to-[#8B0000] text-white font-black text-2xl md:text-3xl rounded-2xl shadow-[0_20px_50px_rgba(212,0,0,0.4)] transition-all uppercase tracking-tighter border-b-8 border-[#5F0000] active:border-b-0 z-10"
          >
            <span className="flex items-center justify-center gap-3">
               REGISTER NOW 🧧
            </span>
          </motion.button>
        </div>
        
        {/* Disclosure */}
        <p className="mt-24 text-[9px] text-white/20 leading-relaxed uppercase tracking-[0.2em] max-w-lg mx-auto font-bold">
          *Official Eight Immortals Event by iClub88. All services strictly monitored for quality and compliance. Play with discipline. 18+ only. iClub88 & i88 are the under the same platform for SG & MY Only.
          
        </p>
      </div>
      
      {/* Background Decorative Element */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-40 bg-red-600/10 blur-[100px] pointer-events-none"></div>
    </section>
  );
};

export default FooterCTA;
