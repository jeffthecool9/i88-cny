
import React from 'react';
import { EVENT_DATES } from '../constants';

const FooterCTA: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-[#000814] to-[#4a0404] text-center border-t border-[#eab308]/10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <h2 className="text-5xl md:text-7xl font-black text-[#eab308] mb-6 uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]">
          MASTER THE <br/> IMMORTALS
        </h2>
        <p className="text-white/60 mb-16 font-black uppercase tracking-[0.3em] text-[10px] md:text-sm">
          Limited time opportunity • ends {EVENT_DATES.end}
        </p>

        {/* Primary Action Button (Strict Gold) */}
        <div className="relative group max-w-md mx-auto">
          {/* Strict Dual-Tone Glow (Blue/Red) */}
          <div className="absolute -inset-3 bg-gradient-to-r from-[#173489] to-[#8b0000] rounded-2xl blur-xl opacity-20 group-hover:opacity-60 transition duration-500"></div>
          
          <button className="relative w-full py-7 bg-gradient-to-b from-[#fde047] via-[#eab308] to-[#854d0e] text-[#2a0101] font-black text-2xl md:text-3xl rounded-2xl shadow-2xl active:scale-[0.98] transition-all uppercase tracking-tighter border-b-6 border-[#4a2a00] active:border-b-0">
            REGISTER NOW 🧧
          </button>
        </div>
        
        {/* Disclosure */}
        <p className="mt-20 text-[9px] text-white/20 leading-relaxed uppercase tracking-[0.2em] max-w-lg mx-auto font-bold">
          *Official Eight Immortals Event by iClub88. All services strictly monitored for quality and compliance. Play with discipline. 18+ only.
        </p>
      </div>
    </section>
  );
};

export default FooterCTA;
