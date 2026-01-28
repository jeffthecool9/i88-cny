
import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  return (
    <section className="py-32 px-10 bg-[#0f0202] relative overflow-hidden">
      {/* Visual Ambient Light */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00A3FF] blur-[150px] opacity-[0.05] rounded-full"></div>
      
      <div className="max-w-md mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-1.5 bg-[#00A3FF] rounded-full shadow-[0_0_15px_#00A3FF]"></div>
            <span className="text-[#00A3FF] text-xs font-black uppercase tracking-[0.5em]">9Y Proven Legacy</span>
          </div>

          <h2 className="text-6xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-8">
            i88 — <br/>
            <span className="text-[#00A3FF] drop-shadow-[0_0_20px_rgba(0,163,255,0.3)]">9 YEARS</span> <br/>
            OPERATING <br/>
            <span className="text-white text-4xl opacity-80">(2017–2026)</span>
          </h2>

          <div className="h-[2px] w-full bg-gradient-to-r from-[#00A3FF] via-[#00A3FF]/20 to-transparent mb-10"></div>

          <p className="text-white font-bold text-xl uppercase tracking-tight leading-relaxed">
            Built exclusively for <span className="text-white text-2xl">🇲🇾 & 🇸🇬</span> players. Prioritizing regional security and lightning-fast withdrawals since day one.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-sm"
          >
             <span className="block text-[#00A3FF] text-4xl font-black mb-2">9Y</span>
             <span className="text-white text-xs font-black uppercase tracking-widest leading-tight opacity-70">Continuous Operation</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-sm"
          >
             <span className="block text-[#00A3FF] text-4xl font-black mb-2">SGD/MYR</span>
             <span className="text-white text-xs font-black uppercase tracking-widest leading-tight opacity-70">Native Currency Support</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
