
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DIVINE_ICONS = ['🧧', '💎', '💰', '🧧', '✨', '👑'];

const Mechanics: React.FC = () => {
  const [reels, setReels] = useState([['🧧', '💎', '💰'], ['💰', '🧧', '✨'], ['✨', '💰', '🧧']]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);

  const startDivineSpin = () => {
    if (isSpinning || hasSpun) return;
    setIsSpinning(true);
    let iterations = 0;
    const interval = setInterval(() => {
      setReels(prev => prev.map(() => 
        Array(3).fill(0).map(() => DIVINE_ICONS[Math.floor(Math.random() * DIVINE_ICONS.length)])
      ));
      iterations++;
      if (iterations > 15) {
        clearInterval(interval);
        setReels([['💎', '💰', '🧧'], ['✨', '💰', '👑'], ['🧧', '💰', '💎']]);
        setIsSpinning(false);
        setHasSpun(true);
      }
    }, 100);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <section id="mechanics" className="py-24 px-6 relative bg-gradient-to-b from-[#A30000] to-[#8B0000] overflow-hidden">
      <div className="max-w-md mx-auto relative z-10 flex flex-col items-center">
        <div className="bg-black/40 backdrop-blur-md border border-white/20 px-8 py-3 rounded-full mb-12">
           <span className="text-[#FF5F5F] text-xs font-black uppercase tracking-[0.4em]">Divine Gameplay Extension</span>
        </div>

        <div className="text-center mb-10 px-4">
           <h3 className="text-white text-4xl font-black uppercase tracking-tighter mb-6 leading-tight">
             Beyond the Welcome: <br/>
             <span className="text-yellow-400 italic">The Divine Jackpot Slot</span>
           </h3>
           <p className="text-[#FF5F5F] text-sm font-bold uppercase tracking-widest leading-relaxed">
             Join the 8 Immortals in the grand unsealing of our seasonal pool.
           </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative w-full flex flex-col items-center justify-center mb-12"
        >
          <div className="absolute inset-4 bg-yellow-400/10 blur-[60px] rounded-[3rem]"></div>
          <div className="relative w-full bg-[#5F0000]/60 rounded-[3rem] border-4 border-white/10 p-8 flex flex-col shadow-2xl overflow-hidden">
            <div className="h-64 grid grid-cols-3 gap-3 bg-black/50 rounded-2xl p-4 border-2 border-yellow-600/30 overflow-hidden relative">
              {reels.map((reel, c) => (
                <div key={c} className="flex flex-col gap-2 relative z-10">
                  {reel.map((icon, i) => (
                    <motion.div
                      key={`${c}-${i}`}
                      animate={isSpinning ? { y: [0, 10, 0] } : { y: 0 }}
                      transition={{ duration: 0.1, repeat: isSpinning ? Infinity : 0 }}
                      className={`flex-1 rounded-xl bg-white/5 flex items-center justify-center text-4xl border border-white/5
                        ${!isSpinning && hasSpun && i === 1 ? 'bg-yellow-400/30 border-yellow-400/60 shadow-[0_0_15px_rgba(234,179,8,0.5)] scale-105 z-20' : ''}`}
                    >
                      <span>{icon}</span>
                    </motion.div>
                  ))}
                </div>
              ))}
              <motion.div animate={{ opacity: !isSpinning && hasSpun ? 1 : 0.2 }} className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent -translate-y-1/2 pointer-events-none z-30" />
            </div>

            <div className="mt-8">
              <AnimatePresence mode="wait">
                {!hasSpun ? (
                  <motion.button 
                    onClick={startDivineSpin}
                    disabled={isSpinning}
                    className="w-full py-6 bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600 text-[#1a0101] rounded-2xl font-black text-base uppercase tracking-[0.3em] shadow-xl border-b-6 border-yellow-800"
                  >
                    {isSpinning ? 'Divine Spin...' : 'Unseal Fortune 🎰'}
                  </motion.button>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8">
                    <div className="text-center">
                      <span className="block text-yellow-400 text-xs font-black uppercase tracking-[0.5em] mb-4">Divine Win Revealed</span>
                      <h4 className="text-white text-5xl font-black uppercase tracking-tighter leading-none italic drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]">
                        100 <span className="text-yellow-400 underline underline-offset-8">FREE SPINS</span>
                      </h4>
                      <div className="mt-8 flex items-center justify-center gap-4">
                        <span className="text-[#FF5F5F] text-xs font-black uppercase tracking-[0.4em]">Sacred Unsealing Result</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <button onClick={() => window.open('https://www.iclub88.com/register', '_blank')} className="w-full py-6 bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600 text-[#1a0101] rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl">Deposit & Claim Now ➔</button>
                      <button onClick={scrollToTop} className="w-full py-4 text-[#FF5F5F] font-bold text-xs uppercase tracking-[0.3em]">Back to Home</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Mechanics;
