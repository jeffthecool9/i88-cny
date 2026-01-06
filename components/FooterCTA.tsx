
import React from 'react';
import { EVENT_DATES } from '../constants';

const FooterCTA: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#0c0101] to-[#4d0101] text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-black cny-gradient-text mb-4 uppercase tracking-tighter">
          Master the Eight Immortals
        </h2>
        <p className="text-yellow-100/80 mb-10 font-bold uppercase tracking-widest text-sm">
          Limited time event. Ends {EVENT_DATES.end}
        </p>

        <div className="flex flex-col space-y-4">
          <button className="w-full py-5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-red-950 font-black text-xl rounded-2xl shadow-[0_0_20px_rgba(255,215,0,0.5)] active:scale-95 transition-all">
            NEW PLAYER CLICK HERE
          </button>
          <button className="w-full py-5 bg-transparent border-2 border-yellow-500 text-yellow-500 font-black text-xl rounded-2xl active:scale-95 transition-all">
            EXISTING PLAYER CLICK HERE
          </button>
        </div>
        
        <p className="mt-8 text-[10px] text-yellow-600 uppercase tracking-[0.2em]">
          Terms and conditions apply. Play responsibly.
        </p>
      </div>
    </section>
  );
};

export default FooterCTA;
