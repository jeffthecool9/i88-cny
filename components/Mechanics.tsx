
import React from 'react';
import { INITIAL_WEAPONS } from '../constants';

const Mechanics: React.FC = () => {
  return (
    <section id="mechanics" className="py-16 px-6 bg-[#0c0101]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-yellow-500 border-b-2 border-yellow-500 pb-2 inline-block mx-auto w-full">
          How the Event Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="glass-card p-6 rounded-2xl flex items-center space-x-4">
            <div className="bg-yellow-500 text-[#8B0000] rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
            <p className="text-yellow-50 text-sm">Collect weapons to unlock powerful rewards across the sea.</p>
          </div>
          <div className="glass-card p-6 rounded-2xl flex items-center space-x-4">
            <div className="bg-yellow-500 text-[#8B0000] rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
            <p className="text-yellow-50 text-sm">Each unlock uses 1 ticket. Every unlock guarantees a reward.</p>
          </div>
          <div className="glass-card p-6 rounded-2xl flex items-center space-x-4">
            <div className="bg-yellow-500 text-[#8B0000] rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
            <p className="text-yellow-50 text-sm">Collect all 8 weapons (4x each) to unlock the Grand Prize!</p>
          </div>
          <div className="glass-card p-6 rounded-2xl flex items-center space-x-4">
            <div className="bg-yellow-500 text-[#8B0000] rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">4</div>
            <p className="text-yellow-50 text-sm">Mini-Game: Pick 1 out of 3 Fortune Angpow to reveal your luck.</p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-yellow-400 mb-6">Weapon Progress</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INITIAL_WEAPONS.map((weapon) => (
            <div key={weapon.id} className="glass-card p-4 rounded-xl text-center border-yellow-900/50">
              <div className="text-4xl mb-2">{weapon.icon}</div>
              <div className="text-xs font-bold text-yellow-500 uppercase mb-2 h-8 flex items-center justify-center">{weapon.name}</div>
              <div className="flex justify-between text-[10px] text-yellow-200 mb-1">
                <span>Progress</span>
                <span>0 / {weapon.max}</span>
              </div>
              <div className="w-full bg-red-950 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mechanics;
