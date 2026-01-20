import React from 'react';

const DivineFortuneBox: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-transparent relative overflow-hidden">
      {/* Background Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-96 bg-yellow-400/10 blur-[180px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-lg mx-auto relative group">
        
        {/* Updated Imperial Box */}
        <div className="relative bg-gradient-to-b from-[#FF0000] to-[#B00000] rounded-[4rem] border-8 border-yellow-400/50 p-12 md:p-16 text-center shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden">
          
          {/* Traditional Corners */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-[10px] border-l-[10px] border-yellow-400 rounded-tl-[3.5rem]"></div>
          <div className="absolute top-0 right-0 w-24 h-24 border-t-[10px] border-r-[10px] border-yellow-400 rounded-tr-[3.5rem]"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b-[10px] border-l-[10px] border-yellow-400 rounded-bl-[3.5rem]"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-[10px] border-r-[10px] border-yellow-400 rounded-br-[3.5rem]"></div>

          {/* Animated Angpow Icon */}
          <div className="inline-block mb-10 relative">
            <div className="text-[9rem] filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)] animate-bounce-gentle">🧧</div>
            <div className="absolute inset-0 bg-yellow-400 blur-[80px] opacity-40"></div>
          </div>

          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-none tracking-tighter uppercase flex flex-col items-center">
            <span className="text-white drop-shadow-md">Get Your</span>
            <span className="text-yellow-300 drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)] scale-110">RM38,888 NOW</span>
          </h2>

          <div className="w-32 h-1.5 bg-yellow-300 mx-auto mb-8 rounded-full"></div>

          <p className="text-white font-black text-lg md:text-xl uppercase tracking-[0.2em] max-w-xs mx-auto leading-relaxed drop-shadow-lg opacity-90">
            UNLEASH THE POWER <br/> OF THE IMMORTALS
          </p>

          {/* Sparkle Particles */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="absolute bg-white w-1.5 h-1.5 rounded-full animate-ping"
                style={{
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  animationDelay: `${i * 0.7}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DivineFortuneBox;