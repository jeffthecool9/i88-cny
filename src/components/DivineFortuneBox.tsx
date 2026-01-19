import React, { useMemo } from "react";

const DivineFortuneBox: React.FC = () => {
  const sparkles = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${i * 0.6}s`,
    }));
  }, []);

  return (
    <section className="py-24 px-6 bg-transparent relative overflow-hidden">
      {/* Background Atmosphere (Strict Blue/Red) */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40%] h-64 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[40%] h-64 bg-red-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative group">
        {/* The Info Box Container */}
        <div className="relative bg-[#000814] rounded-[3rem] border-4 border-[#eab308]/30 p-12 md:p-20 text-center shadow-[0_0_80px_rgba(0,0,0,0.9),inset_0_0_40px_rgba(234,179,8,0.05)] overflow-hidden">
          {/* Binary Corners: Blue and Red only */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-8 border-l-8 border-[#3b82f6] rounded-tl-[2.5rem]"></div>
          <div className="absolute top-0 right-0 w-20 h-20 border-t-8 border-r-8 border-[#ef4444] rounded-tr-[2.5rem]"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-8 border-l-8 border-[#ef4444] rounded-bl-[2.5rem]"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-8 border-r-8 border-[#3b82f6] rounded-br-[2.5rem]"></div>

          {/* Icon */}
          <div className="inline-block mb-10 relative">
            <div className="text-7xl animate-float">🧧</div>
            <div className="absolute inset-0 bg-[#eab308] blur-3xl opacity-20"></div>
          </div>

          {/* Main Message: Strict Gold Text */}
          <h2 className="text-4xl md:text-7xl font-black mb-10 leading-tight tracking-tighter uppercase">
            <span className="block text-white mb-2">MORE TICKETS</span>
            <span className="block text-[#eab308] text-5xl mb-4">=</span>
            <span className="block bg-gradient-to-b from-[#fde047] via-[#eab308] to-[#854d0e] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(234,179,8,0.4)]">
              BIGGER FORTUNE
            </span>
          </h2>

          {/* Simple Gold Divider */}
          <div className="w-32 h-1.5 bg-[#eab308] mx-auto mb-10 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>

          <p className="text-[#eab308]/80 font-black text-sm md:text-xl uppercase tracking-[0.3em] max-w-lg mx-auto leading-relaxed">
            Unleash the power <br /> of the Eight Immortals
          </p>

          {/* Gold Pulse Sparkles (stable) */}
          <div className="absolute inset-0 pointer-events-none">
            {sparkles.map((s) => (
              <div
                key={s.id}
                className="absolute bg-[#eab308]/40 w-1 h-1 rounded-full animate-pulse"
                style={{
                  top: s.top,
                  left: s.left,
                  animationDelay: s.delay,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DivineFortuneBox;
