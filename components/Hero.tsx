
import React from 'react';
import { motion, Variants } from 'framer-motion';
import CountdownTimer, { trackEvent } from './CountdownTimer.tsx';

const Hero: React.FC<{ onOpenTutorial: () => void }> = ({ onOpenTutorial }) => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const handleCtaClick = () => {
    trackEvent('cta_click', { cta_id: 'hero_register_main' });
    window.open('https://www.iclub88.com/register', '_blank');
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-32 overflow-hidden bg-[#4a0101]">
      {/* Visual Canvas Background */}
      <div className="absolute inset-0 z-0 bg-paper-texture">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,0,0,0.4)_0%,transparent_100%)]"></div>
        <motion.div 
          animate={{ y: [-20, 20], x: [-10, 10], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-20"
        />
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-50 flex flex-col items-center text-center px-6 w-full max-w-md"
      >
        <motion.div variants={item} className="mb-10">
          <div className="h-14 w-auto px-6 py-2 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Cloud9_logo.svg/2560px-Cloud9_logo.svg.png" 
              alt="i88" 
              className="h-full w-auto filter brightness-110"
            />
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-12">
           <h1 className="text-8xl font-black leading-[0.85] uppercase tracking-tighter mb-4 flex flex-col items-center">
             {/* cloudy white styling for 八仙 */}
             <span className="block text-white/95 italic drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] filter blur-[0.3px]">
               八仙
             </span>
             {/* gold shadow and white outline styling for 来财 */}
             <span 
               className="block text-yellow-500 drop-shadow-[0_10px_20px_rgba(234,179,8,0.9)]"
               style={{ 
                 WebkitTextStroke: '2px white',
                 paintOrder: 'stroke fill'
               }}
             >
               来财
             </span>
           </h1>
           <div className="flex items-center justify-center gap-4">
             <div className="h-px w-8 bg-yellow-500/50"></div>
             <p className="text-[#FF5F5F] font-black text-sm uppercase tracking-[0.4em]">Lunar Year 2026</p>
             <div className="h-px w-8 bg-yellow-500/50"></div>
           </div>
        </motion.div>

        <motion.div variants={item} className="mb-12">
          <CountdownTimer pageVariant="cny_visual_v2" />
        </motion.div>

        <motion.div variants={item} className="w-full relative group">
          <div className="absolute -inset-1 bg-yellow-400 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <button 
            onClick={handleCtaClick}
            className="relative w-full py-7 bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 text-[#4a0101] rounded-[2.2rem] font-black text-2xl uppercase tracking-widest shadow-[0_25px_60px_rgba(0,0,0,0.5)] border-b-8 border-[#854d0e] transition-all transform hover:-translate-y-1 active:translate-y-1 active:border-b-0"
          >
            ENTER THE FATE 🧧
          </button>
          
          <div className="mt-10 flex justify-center gap-12">
            <div className="flex flex-col items-center">
              <span className="text-white text-2xl">🛡️</span>
              <span className="text-[#FF5F5F] text-xs font-black tracking-widest mt-2">SECURE</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white text-2xl">⚡</span>
              <span className="text-[#FF5F5F] text-xs font-black tracking-widest mt-2">FAST</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white text-2xl">💎</span>
              <span className="text-[#FF5F5F] text-xs font-black tracking-widest mt-2">TRUST</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
