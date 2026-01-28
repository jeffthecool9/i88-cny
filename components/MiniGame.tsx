
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { REWARD_CHANCES } from '../constants.ts';
import { RewardType } from '../types.ts';

interface MiniGameProps {
  isOpen: boolean;
  onClose: () => void;
  onTicketUse: () => void;
  tickets: number;
  onRefill: () => void;
}

const MiniGame: React.FC<MiniGameProps> = ({ isOpen, onClose, onTicketUse, tickets, onRefill }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [reward, setReward] = useState<RewardType | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const playSound = (type: 'spend' | 'open' | 'reveal' | 'error') => {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === 'spend') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(now + 0.2);
    } else if (type === 'open') {
      const noise = ctx.createBufferSource();
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      noise.buffer = buf;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      noise.connect(gain); gain.connect(ctx.destination);
      noise.start();
    } else if (type === 'reveal') {
      [440, 554, 659, 880].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.frequency.setValueAtTime(f, now + i * 0.1);
        g.gain.setValueAtTime(0.1, now + i * 0.1);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.5);
        osc.connect(g); g.connect(ctx.destination);
        osc.start(now + i * 0.1); osc.stop(now + i * 0.1 + 0.5);
      });
    } else if (type === 'error') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(100, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(now + 0.3);
    }
  };

  const handlePick = (idx: number) => {
    initAudio();
    if (selectedIdx !== null || tickets <= 0) {
      if (tickets <= 0) playSound('error');
      return;
    }
    playSound('spend');
    playSound('open');
    setSelectedIdx(idx);
    setIsRevealing(true);
    onTicketUse();

    const rand = Math.random() * 100;
    let acc = 0;
    let pickedReward: RewardType = REWARD_CHANCES[0].type;
    for (const r of REWARD_CHANCES) {
      acc += r.weight;
      if (rand <= acc) {
        pickedReward = r.type;
        break;
      }
    }

    setTimeout(() => {
      setReward(pickedReward);
      setIsRevealing(false);
      playSound('reveal');
    }, 1200);
  };

  const reset = () => {
    initAudio();
    setSelectedIdx(null);
    setReward(null);
    setIsRevealing(false);
  };

  const handleFinalAction = () => {
    initAudio();
    if (tickets > 0) {
      reset();
    } else {
      // Demo finished, redirect to Layer 1 Register section
      onClose();
      setTimeout(() => {
        const el = document.getElementById('register-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-lg bg-gradient-to-b from-[#991B1B] to-[#450A0A] rounded-[3rem] border-4 border-[#FDE047] p-8 text-center shadow-[0_0_100px_rgba(253,224,71,0.2)] overflow-hidden"
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-[#FDE047] hover:text-white text-4xl font-light leading-none z-10 transition-colors"
        >
          &times;
        </button>

        <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter drop-shadow-lg">
          ANGPOW DEMO
        </h2>
        <p className="text-[#FDE047] font-black text-[10px] uppercase tracking-[0.3em] mb-8 opacity-80">
          PICK ONE PACKET TO START
        </p>
        
        <div className="flex justify-center mb-8">
          <div className="bg-black/40 backdrop-blur-md border-2 border-[#FDE047]/30 rounded-full px-6 py-2 flex items-center gap-3">
             <span className="text-white/60 font-black text-[9px] uppercase tracking-widest">Available Tickets:</span>
             <span className="text-[#FDE047] font-black text-xl">{tickets}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 h-52 mb-8">
          {[0, 1, 2].map((i) => (
            <motion.div 
              key={i}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePick(i)}
              className={`
                relative h-full bg-gradient-to-b from-[#EF4444] to-[#B91C1C] rounded-2xl border-4 border-[#FDE047]/40 
                cursor-pointer flex flex-col items-center justify-center transition-all duration-500
                ${selectedIdx === null && tickets > 0 ? 'hover:scale-105 hover:brightness-110' : ''}
                ${selectedIdx !== null && selectedIdx !== i ? 'opacity-20 scale-90 grayscale' : ''}
                ${selectedIdx === i ? 'ring-4 ring-[#FDE047] shadow-[0_0_40px_rgba(253,224,71,0.6)]' : ''}
              `}
            >
              <div className="text-[#FDE047] text-5xl font-black drop-shadow-md select-none">福</div>
              {selectedIdx === i && isRevealing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#FDE047]/40 rounded-full animate-ping"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="min-h-[160px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!reward && tickets === 0 && selectedIdx === null && (
              <motion.div 
                key="out-of-tickets"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full"
              >
                <p className="text-[#FDE047] text-xs font-black uppercase mb-4 tracking-widest">No tickets left!</p>
                <button 
                  onClick={onRefill}
                  className="bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 text-[#4a0101] px-10 py-4 rounded-2xl font-black text-sm uppercase shadow-xl border-b-6 border-yellow-800 active:translate-y-1 active:border-b-0"
                >
                  Refill Demo Tickets
                </button>
              </motion.div>
            )}

            {reward && (
              <motion.div 
                key="reward"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="w-full bg-gradient-to-b from-[#FFF9DB] to-[#FDE047] p-8 rounded-[2.5rem] border-4 border-white/20 shadow-2xl relative"
              >
                <p className="text-red-800 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Divine Gift:</p>
                <h3 className="text-red-900 text-3xl font-black mb-6 leading-tight tracking-tighter">
                  {reward}
                </h3>
                <button 
                  onClick={handleFinalAction}
                  className="w-full py-4 bg-gradient-to-b from-[#60A5FA] via-[#2563EB] to-[#1E3A8A] text-white rounded-xl font-black text-sm uppercase tracking-widest border-b-6 border-[#172554] active:translate-y-1 active:border-b-0"
                >
                  {tickets > 0 ? 'Try Again' : 'Go to Event 🧧'}
                </button>
              </motion.div>
            )}

            {!reward && !isRevealing && tickets > 0 && (
              <motion.div 
                key="pick-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                className="text-white/60 font-black text-[12px] uppercase tracking-[0.4em]"
              >
                Pick a red packet to see your luck
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default MiniGame;
