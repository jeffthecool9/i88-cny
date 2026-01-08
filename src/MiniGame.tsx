
import React, { useState } from 'react';
import { REWARD_CHANCES } from '../constants.ts';
import { RewardType } from '../types.ts';

interface MiniGameProps {
  isOpen: boolean;
  onClose: () => void;
  onTicketUse: () => void;
}

const MiniGame: React.FC<MiniGameProps> = ({ isOpen, onClose, onTicketUse }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [reward, setReward] = useState<RewardType | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  if (!isOpen) return null;

  const handlePick = (idx: number) => {
    if (selectedIdx !== null) return;
    
    setSelectedIdx(idx);
    setIsRevealing(true);
    onTicketUse();

    // Determine Reward
    const rand = Math.random() * 100;
    let acc = 0;
    let pickedReward: RewardType = 'Thank You';
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
    setSelectedIdx(null);
    setReward(null);
    setIsRevealing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#8B0000] to-[#2a0101] rounded-3xl border-4 border-yellow-600 p-8 text-center overflow-hidden shadow-[0_0_50px_rgba(255,215,0,0.4)]">
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-yellow-500 text-3xl font-bold">&times;</button>
        
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-32 h-32 border-4 border-yellow-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-4 border-yellow-500 rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <h2 className="text-3xl font-black cny-gradient-text mb-2 uppercase tracking-widest">Fortune Angpow</h2>
        <p className="text-yellow-200 text-sm mb-12">Pick one to reveal your destiny!</p>

        {/* Angpows */}
        <div className="flex justify-between items-end h-64 mb-8">
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              onClick={() => handlePick(i)}
              className={`
                relative w-1/4 h-48 bg-gradient-to-b from-red-600 to-red-800 rounded-xl border-2 border-yellow-500/50 
                cursor-pointer transition-all duration-500 flex flex-col items-center justify-center
                ${selectedIdx === null ? 'animate-bounce' : ''}
                ${selectedIdx !== null && selectedIdx !== i ? 'opacity-30 scale-90 grayscale' : ''}
                ${selectedIdx === i ? 'scale-110 shadow-[0_0_30px_rgba(255,215,0,0.6)]' : ''}
              `}
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {/* Envelope Design */}
              <div className="absolute top-0 left-0 w-full h-1/2 border-b border-yellow-500/20 bg-red-700/50 rounded-t-xl"></div>
              <div className="text-yellow-500 text-3xl font-bold">福</div>
              
              {/* Reveal Animation Light */}
              {selectedIdx === i && isRevealing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 1 Ticket Indicator */}
        <div className="mb-6 inline-block bg-yellow-600/20 px-4 py-1 rounded-full border border-yellow-600/40 text-xs font-bold text-yellow-500">
           -1 TICKET PER PLAY
        </div>

        {/* Reward Modal/Overlay */}
        {reward && (
          <div className="mt-4 p-6 bg-yellow-500 text-red-950 rounded-2xl animate-in zoom-in duration-300">
            <p className="text-xs font-bold uppercase tracking-widest mb-1">Congratulations!</p>
            <h3 className="text-3xl font-black mb-4">{reward}</h3>
            <button 
              onClick={reset}
              className="px-8 py-2 bg-red-950 text-white rounded-lg font-bold hover:bg-red-900 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniGame;
