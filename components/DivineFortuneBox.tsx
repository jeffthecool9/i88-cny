
import React from 'react';
import { motion } from 'framer-motion';
import { BRAND_STORY } from '../constants.ts';

const DivineFortuneBox: React.FC = () => {
  return (
    <section id="register-section" className="py-32 px-6 bg-[#D40000] relative overflow-hidden">
      <div className="max-w-md mx-auto relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-[#1a0101] rounded-[3.5rem] p-12 border-4 border-yellow-400/30 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]"></div>
          
          <div className="relative z-10">
            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] mb-6 block">Join the Legacy</span>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-4">
              Step Into <br/> 
              <span className="text-yellow-400">Superiority</span>
            </h2>
            <p className="text-white/40 font-bold text-xs uppercase tracking-[0.1em] mb-10 leading-relaxed">
              Experience Malaysia & Singapore's gold standard digital platform.
            </p>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://www.iclub88.com/register', '_blank')}
              className="w-full py-6 bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 text-[#4a0101] rounded-2xl font-black text-xl uppercase tracking-widest shadow-2xl border-b-6 border-[#854d0e] active:translate-y-1 active:border-b-0"
            >
              REGISTER & UNLOCK 🧧
            </motion.button>

            <div className="mt-8 pt-8 border-t border-white/10">
               <span className="text-white/20 text-[8px] font-black uppercase tracking-[0.3em]">
                 Established {BRAND_STORY.established} • Verified Regional Platform
               </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DivineFortuneBox;
