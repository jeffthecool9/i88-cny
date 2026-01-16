
import React from 'react';

const HowToJoin: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-transparent relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-7xl font-black text-center mb-20 text-[#eab308] uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]">
          How to Join
        </h2>

        <div className="grid gap-12">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-8 bg-[#001a4d]/40 backdrop-blur-md p-10 rounded-[3rem] border-2 border-[#3b82f6]/20 group hover:border-[#3b82f6]/50 transition-all">
            <div className="w-24 h-24 bg-gradient-to-br from-[#173489] to-[#001a4d] border-4 border-[#eab308] rounded-[2rem] flex flex-shrink-0 items-center justify-center text-4xl font-black text-[#eab308] shadow-[0_0_30px_rgba(234,179,8,0.3)] animate-float">
              1
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3 uppercase tracking-tight">Enter the Portal</h3>
              <p className="text-white/70 text-base md:text-lg font-bold leading-relaxed">
                <span className="text-[#3b82f6]">NEW PLAYERS:</span> Register an account instantly.<br/>
                <span className="text-[#3b82f6]">EXISTING PLAYERS:</span> Login to start your collection.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row items-center gap-8 bg-[#4a0404]/40 backdrop-blur-md p-10 rounded-[3rem] border-2 border-[#ef4444]/20 group hover:border-[#ef4444]/50 transition-all">
            <div className="w-24 h-24 bg-gradient-to-br from-[#8b0000] to-[#4a0404] border-4 border-[#eab308] rounded-[2rem] flex flex-shrink-0 items-center justify-center text-4xl font-black text-[#eab308] shadow-[0_0_30px_rgba(234,179,8,0.3)] animate-float" style={{ animationDelay: '0.2s' }}>
              2
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3 uppercase tracking-tight">Equip & Collect</h3>
              <p className="text-white/70 text-base md:text-lg font-bold leading-relaxed">
                Deposit to earn tickets. Use them in the <span className="text-[#ef4444]">FORTUNE ANGPOW</span> section to unlock the 8 Divine Weapons.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background flare */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#3b82f6]/5 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ef4444]/5 blur-[100px] rounded-full"></div>
    </section>
  );
};

export default HowToJoin;
