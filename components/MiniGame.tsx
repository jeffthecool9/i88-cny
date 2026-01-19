import React, { useState, useEffect, useRef } from 'react';
import { REWARD_CHANCES } from '../constants.ts';
import { RewardType } from '../types.ts';

interface MiniGameProps {
  isOpen: boolean;
  onClose: () => void;
  onTicketUse: () => void;
  tickets: number;
}

const MiniGame: React.FC<MiniGameProps> = ({ isOpen, onClose, onTicketUse, tickets }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [reward, setReward] = useState<RewardType | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize Audio Context on first interaction
  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const playSound = (type: 'tick' | 'reveal' | 'error' | 'sparkle') => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'tick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'reveal') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.5); // C6
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(783.99, now); // G5
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      gain2.gain.setValueAtTime(0.2, now);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc2.start(now);
      osc2.stop(now + 0.4);
    } else if (type === 'error') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.2);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'sparkle') {
      const grainCount = 12;
      for (let i = 0; i < grainCount; i++) {
        const sOsc = ctx.createOscillator();
        const sGain = ctx.createGain();
        sOsc.type = 'sine';
        const baseFreq = 2000 + (Math.random() * 4000);
        const startTime = now + (i * 0.03) + (Math.random() * 0.05);
        sOsc.frequency.setValueAtTime(baseFreq, startTime);
        sOsc.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, startTime + 0.3);
        sOsc.connect(sGain);
        sGain.connect(ctx.destination);
        sGain.gain.setValueAtTime(0, startTime);
        sGain.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
        sGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
        sOsc.start(startTime);
        sOsc.stop(startTime + 0.3);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    if (reward) {
      playSound('reveal');
      playSound('sparkle');
    }
  }, [reward]);

  if (!isOpen) return null;

  const handlePick = (idx: number) => {
    initAudio();
    if (selectedIdx !== null || tickets <= 0) {
      if (tickets <= 0) playSound('error');
      return;
    }
    
    playSound('tick');
    setSelectedIdx(idx);
    setIsRevealing(true);
    onTicketUse();

    const rand = Math.random() * 100;
    let acc = 0;
    let pickedReward: RewardType = 'BETTER LUCK NEXT TIME';
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
    }, 1200);
  };

  const reset = () => {
    initAudio();
    if (tickets === 0) {
      onClose();
      setTimeout(() => {
        const footer = document.querySelector('section.bg-gradient-to-b.from-\\[\\#0c0101\\].to-\\[\\#4d0101\\]');
        if (footer) {
          footer.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    setSelectedIdx(null);
    setReward(null);
    setIsRevealing(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-hide bg-gradient-to-b from-[#8B0000] to-[#2a0101] rounded-[2.5rem] border-4 border-[#eab308] p-6 md:p-10 text-center shadow-[0_0_80px_rgba(234,179,8,0.3)]">
        
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-[#eab308] hover:text-white text-4xl font-light leading-none z-10 transition-colors"
        >
          &times;
        </button>
        
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-48 h-48 border-8 border-[#eab308] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 border-8 border-[#eab308] rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative z-0">
          <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tight drop-shadow-lg">
            FORTUNE <br/> ANGPOW
          </h2>
          <p className="text-[#eab308] font-bold text-xs uppercase tracking-[0.2em] mb-4 opacity-80">
            Pick one to reveal your destiny!
          </p>
          
          <div className="text-white text-xs font-black mb-6 uppercase tracking-[0.1em] bg-red-950/50 py-2 rounded-full border border-white/5">
            Current Tickets: <span className="text-[#eab308] ml-1">{tickets}</span>
          </div>

          <div className={`flex justify-between items-center gap-4 h-56 mb-10 ${tickets === 0 && selectedIdx === null ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
            {[0, 1, 2].map((i) => (
              <div 
                key={i}
                onClick={() => handlePick(i)}
                className={`
                  relative flex-1 h-48 bg-gradient-to-b from-[#ef4444] to-[#8b0000] rounded-2xl border-2 border-[#eab308]/30 
                  cursor-pointer flex flex-col items-center justify-center transition-all duration-500 ease-out group
                  ${selectedIdx === null && tickets > 0 ? 
                    'animate-bounce-gentle hover:scale-110 hover:-translate-y-4 hover:brightness-125' 
                    : ''
                  }
                  ${selectedIdx !== null && selectedIdx !== i ? 'opacity-20 scale-90 grayscale blur-[1px]' : ''}
                  ${selectedIdx === i ? 'scale-110 shadow-[0_0_60px_rgba(234,179,8,0.8)] border-[#eab308] ring-4 ring-[#eab308]/20' : ''}
                `}
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                {/* Visual Accent Lines & Glow Container */}
                <div className={`absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500 ${selectedIdx === null ? 'animate-hover-glow' : ''}`}></div>
                <div className="absolute top-0 left-0 w-full h-1/2 border-b border-[#eab308]/10 bg-white/5 rounded-t-2xl pointer-events-none"></div>
                <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none"></div>

                <div className="text-[#eab308] text-4xl font-black drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] select-none z-10 group-hover:scale-125 transition-transform duration-500">福</div>
                
                {selectedIdx === i && isRevealing && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 bg-[#eab308] rounded-full animate-ping opacity-40"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {tickets === 0 && selectedIdx === null && (
            <div className="mb-8 p-4 bg-yellow-950/40 rounded-2xl border border-[#eab308]/20">
              <p className="text-[#eab308] text-sm font-black uppercase mb-3">You are out of tickets!</p>
              <button 
                onClick={reset}
                className="bg-gradient-to-b from-[#fde047] via-[#eab308] to-[#854d0e] text-[#2a0101] px-8 py-2 rounded-xl font-black text-xs uppercase shadow-lg active:translate-y-0.5 transition-transform"
              >
                Get More Now
              </button>
            </div>
          )}

          <div className="mb-8 inline-block bg-black/40 px-6 py-2 rounded-full border border-[#eab308]/20 text-[10px] font-black text-[#eab308] uppercase tracking-widest">
             -1 TICKET PER PLAY
          </div>

          <div className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${reward ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            {reward && (
              <div className="p-8 bg-gradient-to-b from-[#fde047] via-[#eab308] to-[#854d0e] text-[#2a0101] rounded-3xl shadow-2xl relative group">
                <div className="absolute -inset-2 bg-[#eab308]/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse"></div>
                
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#8b0000] text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md z-10">
                  HUAT AH!
                </div>
                <p className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-70">Congratulations!</p>
                
                <h3 className="relative z-10 animate-reward-pop text-3xl md:text-5xl font-black mb-8 tracking-tighter uppercase flex flex-col items-center drop-shadow-sm">
                  {reward.split(' ').reduce((acc: string[][], word, i) => {
                    if (i % 2 === 0) acc.push([word]);
                    else acc[acc.length - 1].push(word);
                    return acc;
                  }, []).map((line, i) => (
                    <span key={i} className="block last:text-[#8b0000]">{line.join(' ')}</span>
                  ))}
                </h3>

                <button 
                  onClick={reset}
                  className="relative z-10 w-full py-4 bg-[#8b0000] text-white rounded-xl font-black hover:bg-red-800 transition-all shadow-xl active:scale-95 text-sm uppercase tracking-widest border-b-4 border-red-950 active:border-b-0"
                >
                  {tickets === 0 ? 'Collect & Continue' : 'Play Again'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniGame;