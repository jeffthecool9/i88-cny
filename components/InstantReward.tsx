
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const REWARDS = [
  { label: '100 FREE SPINS', icon: '🎰', color: '#FFD700' },
  { label: 'RM88 ANGPAW', icon: '🧧', color: '#FFFFFF' },
  { label: 'DIVINE LUCK', icon: '✨', color: '#FFD700' },
  { label: 'MYSTERY GIFT', icon: '🎁', color: '#FFFFFF' },
  { label: '888% BONUS', icon: '📈', color: '#FFD700' },
  { label: 'GOLD BAR', icon: '🪙', color: '#FFFFFF' },
  { label: 'JACKPOT', icon: '💎', color: '#FFD700' },
  { label: 'HUAT AH!', icon: '🦁', color: '#FFFFFF' },
];

const InstantReward: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<typeof REWARDS[0] | null>(null);
  const [showResult, setShowResult] = useState(false);

  const startSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setShowResult(false);
    const extraRounds = 5 + Math.floor(Math.random() * 5);
    const newRotation = rotation + (extraRounds * 360) + (360 - (rotation % 360)) + 22.5; 
    setRotation(newRotation);
    setTimeout(() => {
      setSpinning(false);
      setWinner(REWARDS[0]);
      setShowResult(true);
    }, 4000);
  };

  return (
    <section className="py-24 px-6 bg-[#1a0101] relative overflow-hidden flex flex-col items-center">
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6 italic">
          SPIN FOR <br/> <span className="text-yellow-400 not-italic">DIVINE FATE</span>
        </h2>
        <div className="w-24 h-1.5 bg-yellow-500 mx-auto rounded-full"></div>
      </motion.div>

      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-[14px] border-[#854d0e] shadow-[0_0_60px_rgba(212,0,0,0.3)] z-0"></div>
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: [0.15, 0, 0.15, 1] }}
          className="relative w-[92%] h-[92%] rounded-full overflow-hidden border-4 border-yellow-500 shadow-2xl z-10"
          style={{ background: 'conic-gradient(from 0deg, #D40000 0deg 45deg, #8B0000 45deg 90deg, #D40000 90deg 135deg, #8B0000 135deg 180deg, #D40000 180deg 225deg, #8B0000 225deg 270deg, #D40000 270deg 315deg, #8B0000 315deg 360deg)' }}
        >
          {REWARDS.map((reward, i) => (
            <div
              key={i}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 origin-bottom flex flex-col items-center pt-10"
              style={{ transform: `translateX(-50%) rotate(${i * 45}deg)` }}
            >
              <span className="text-4xl mb-3 drop-shadow-md">{reward.icon}</span>
              <span className="text-xs font-black text-white/80 uppercase tracking-widest [writing-mode:vertical-rl] rotate-180">
                {reward.label}
              </span>
            </div>
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#854d0e] rounded-full border-4 border-yellow-500 shadow-2xl flex items-center justify-center z-20">
            <span className="text-white font-black text-2xl">福</span>
          </div>
        </motion.div>
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-14 bg-yellow-500 z-[30] clip-path-pointer shadow-xl border-x-2 border-white/20"></div>
      </div>

      <div className="mt-16 w-full max-w-xs relative z-20 text-center">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <div className="flex flex-col items-center">
              <motion.button
                key="spin-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startSpin}
                disabled={spinning}
                className={`w-full py-7 rounded-[2rem] font-black text-2xl uppercase tracking-[0.2em] shadow-2xl transition-all border-b-8
                  ${spinning ? 'bg-gray-800 text-gray-500 border-gray-900' : 'bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 text-[#4a0101] border-yellow-800'}`}
              >
                {spinning ? 'Fate Deciding...' : 'SPIN YOUR LUCK'}
              </motion.button>
              <p className="mt-6 text-[#FF5F5F] text-sm font-black uppercase tracking-[0.4em]">One Attempt per Deposit</p>
            </div>
          ) : (
            <motion.div
              key="result-card"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white p-1 rounded-[2.5rem] shadow-[0_20px_80px_rgba(255,255,255,0.2)] animate-bounce-slow"
            >
              <div className="bg-[#D40000] rounded-[2.3rem] py-10 px-8 text-center border-4 border-yellow-400">
                <p className="text-yellow-400 text-xs font-black uppercase tracking-[0.4em] mb-4">Heavenly Reward Unlocked</p>
                <h3 className="text-white text-4xl font-black uppercase tracking-tighter leading-none mb-8 italic">
                  {winner?.label}
                </h3>
                <button 
                  onClick={() => window.open('https://www.iclub88.com/register', '_blank')}
                  className="w-full py-5 bg-white text-[#D40000] rounded-2xl font-black text-base uppercase tracking-widest shadow-xl hover:bg-yellow-400 transition-colors"
                >
                  CLAIM NOW 🧧
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `.clip-path-pointer { clip-path: polygon(0% 0%, 100% 0%, 50% 100%); }`}} />
    </section>
  );
};

export default InstantReward;
