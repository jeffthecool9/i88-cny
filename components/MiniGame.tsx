import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { REWARD_CHANCES } from '../constants.ts';
import { RewardType } from '../types.ts';

interface MiniGameProps {
  isOpen: boolean;
  onClose: () => void;
  onTicketUse: () => void;
  tickets: number;
}

const ParticleOverlay = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div 
          key={i}
          className="particle"
          style={{
            width: Math.random() * 3 + 2 + 'px',
            height: Math.random() * 3 + 2 + 'px',
            left: Math.random() * 100 + '%',
            bottom: '-10%',
            animationDuration: Math.random() * 4 + 4 + 's',
            animationDelay: Math.random() * 3 + 's'
          }}
        />
      ))}
    </div>
  );
};

const MiniGame: React.FC<MiniGameProps> = ({ isOpen, onClose, onTicketUse, tickets }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [reward, setReward] = useState<RewardType | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const playSound = (type: 'tick' | 'reveal' | 'error') => {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    const now = ctx.currentTime;
    if (type === 'tick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now); osc.stop(now + 0.1);
    } else if (type === 'reveal') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523, now);
      osc.frequency.exponentialRampToValueAtTime(1046, now + 0.5);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      osc.start(now); osc.stop(now + 0.5);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSelectedIdx(null);
      setReward(null);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePick = (idx: number) => {
    initAudio();
    if (selectedIdx !== null || tickets <= 0 || isRevealing) return;
    
    playSound('tick');
    setSelectedIdx(idx);
    setIsRevealing(true);
    onTicketUse();

    const rand = Math.random() * 100;
    let acc = 0;
    let pickedReward: RewardType = 'BETTER LUCK NEXT TIME';
    for (const r of REWARD_CHANCES) {
      acc += r.weight;
      if (rand <= acc) { pickedReward = r.type; break; }
    }

    setTimeout(() => {
      setReward(pickedReward);
      setIsRevealing(false);
      playSound('reveal');
    }, 1500);
  };

  const reset = () => {
    setSelectedIdx(null);
    setReward(null);
    setIsRevealing(false);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-4">
      {/* Outer Shell Matching Reference Device */}
      <div className="relative w-full max-w-[420px] aspect-[9/16] bg-[#1a0101] border-[6px] border-[#eab308] rounded-[3.5rem] overflow-hidden shadow-[0_0_120px_rgba(0,0,0,1)] flex flex-col">
        
        {/* Oriental Tiles Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')] pointer-events-none"></div>
        <ParticleOverlay />
        
        {/* Navigation & Header - Top Left Title, Top Right Close */}
        <div className="relative z-10 pt-10 px-8 flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-[#eab308] text-[9px] font-black uppercase tracking-[0.4em] mb-1">Celestial Portal</span>
            <h2 className="text-white font-black text-2xl uppercase tracking-tighter leading-none">Mini Game</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-black/50 border border-[#eab308]/40 flex items-center justify-center hover:bg-black/70 transition-all group shadow-lg"
          >
            <svg className="w-5 h-5 text-[#eab308] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Available Tickets - Centered Pill Style */}
        <div className="mt-8 flex justify-center z-10">
          <div className="bg-[#120000]/90 border-2 border-[#eab308]/60 px-8 py-2.5 rounded-full shadow-2xl">
            <div className="flex flex-col items-center">
              <span className="text-[#eab308]/50 text-[8px] font-black uppercase tracking-[0.2em] mb-0.5">Available</span>
              <span className="text-[#eab308] font-black text-lg tracking-widest leading-none">{tickets} TICKETS</span>
            </div>
          </div>
        </div>

        {/* Unified Angpow Grid - Fixed 2/3 Ratio */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="grid grid-cols-3 gap-3 w-full max-w-[340px]">
            {[0, 1, 2].map((idx) => {
              const isSelected = selectedIdx === idx;
              const isInteractive = selectedIdx === null && tickets > 0 && !isRevealing;
              
              return (
                <motion.div
                  key={idx}
                  onClick={() => handlePick(idx)}
                  className={`relative cursor-pointer aspect-[2/3] transition-all duration-500 ${isSelected ? 'z-30' : 'z-10'}`}
                  whileHover={isInteractive ? { scale: 1.05 } : {}}
                  animate={isSelected ? { scale: 1.15 } : {}}
                >
                  <div className={`relative w-full h-full rounded-[1.5rem] border-2 transition-all duration-700 overflow-hidden flex items-center justify-center
                    ${isSelected 
                      ? 'bg-gradient-to-b from-[#ff3e3e] to-[#8b0000] border-[#eab308] shadow-[0_0_50px_rgba(234,179,8,0.6)]' 
                      : 'bg-gradient-to-b from-[#9b0000] to-[#3a0000] border-[#eab308]/20 group hover:border-[#eab308]/60 shadow-xl'
                    }`}
                  >
                    {/* Lattice Overlay */}
                    <div className="absolute inset-2 border border-[#eab308]/10 rounded-[1.2rem] pointer-events-none"></div>
                    
                    {/* Uniform Fortune Symbol */}
                    <span className={`text-5xl cny-font font-black transition-all duration-700 
                      ${isSelected ? 'text-[#eab308] scale-125' : 'text-[#eab308]/30 group-hover:text-[#eab308]/60'}
                      ${isInteractive ? 'animate-gold-blink' : ''}`}
                      style={{ textShadow: isSelected ? '0 0 20px rgba(234,179,8,0.8)' : 'none' }}
                    >
                      福
                    </span>

                    {/* Footer Detail */}
                    <div className="absolute bottom-4 w-6 h-1 bg-[#eab308]/30 rounded-full"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer Prompt - High Contrast Gold */}
        <div className="mb-20 flex flex-col items-center gap-4 z-10 px-8">
          <p className="text-[#eab308] text-[10px] font-black uppercase tracking-[0.45em] text-center drop-shadow-[0_0_15px_rgba(234,179,8,0.7)] animate-gold-blink">
            SELECT AN ENVELOPE TO REVEAL FATE
          </p>
          <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-[#eab308]/60 to-transparent"></div>
        </div>

        {/* Reward Reveal Overlay - Thick Gold Borders matching Reference */}
        <AnimatePresence>
          {reward && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl p-8"
            >
              <div className="w-full bg-[#120000] border-[10px] border-[#eab308] rounded-[4rem] p-12 flex flex-col items-center text-center shadow-[0_0_100px_rgba(0,0,0,1)] relative overflow-hidden">
                {/* Divine Radiance Glow */}
                <div className="absolute -top-1/4 w-80 h-80 bg-[#eab308]/15 blur-[100px] rounded-full pointer-events-none"></div>
                
                <span className="relative z-10 text-[#eab308] text-[11px] font-black uppercase tracking-[0.5em] mb-6">Divine Outcome</span>
                
                <h3 className="relative z-10 text-white text-[3.2rem] font-black italic uppercase tracking-tighter leading-[0.85] mb-14 drop-shadow-2xl">
                  {reward === 'BETTER LUCK NEXT TIME' ? 'DESTINY\nDEFERRED' : reward}
                </h3>
                
                <button 
                  onClick={reset}
                  className="relative z-10 w-full py-6 bg-gradient-to-b from-[#fde047] via-[#eab308] to-[#854d0e] text-[#2a0101] font-black text-2xl rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex items-center justify-center gap-4 border-b-8 border-[#4a2a00] active:translate-y-2 active:border-b-0 transition-all uppercase italic tracking-tighter"
                >
                  PLAY AGAIN <span className="bg-[#d40000] w-6 h-6 flex items-center justify-center rounded text-[10px] text-white">🧧</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reveal Loading State */}
        {isRevealing && !reward && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-3xl z-40 flex flex-col items-center justify-center gap-8">
             <div className="relative">
                <div className="w-24 h-24 border-[8px] border-[#eab308]/20 border-t-[#eab308] rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center font-black text-[#eab308] text-xl animate-pulse">運</div>
             </div>
             <div className="flex flex-col items-center gap-2">
               <span className="text-[#eab308] text-[11px] font-black uppercase tracking-[0.5em]">Consulting the Heavens</span>
               <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-[#eab308] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#eab308] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#eab308] rounded-full animate-bounce [animation-delay:0.4s]"></div>
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniGame;