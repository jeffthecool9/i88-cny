
import React from 'react';

const HowToJoin: React.FC = () => {
  return (
    <section className="py-16 px-6 bg-[#0c0101]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-yellow-500">
          How to Join
        </h2>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="w-16 h-16 bg-red-800 border-2 border-yellow-500 rounded-2xl flex items-center justify-center text-2xl font-black text-yellow-500 shadow-[0_0_15px_rgba(255,215,0,0.3)]">
              1
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Enter the Portal</h3>
              <p className="text-yellow-100/70">
                <span className="text-yellow-400 font-bold">New Players:</span> Register an account instantly.<br/>
                <span className="text-yellow-400 font-bold">Existing Players:</span> Login to your account to start.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="w-16 h-16 bg-red-800 border-2 border-yellow-500 rounded-2xl flex items-center justify-center text-2xl font-black text-yellow-500 shadow-[0_0_15px_rgba(255,215,0,0.3)]">
              2
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Equip & Collect</h3>
              <p className="text-yellow-100/70">
                Deposit your preferred amount to grab tickets. Visit the Fortune Angpow section and start collecting weapons to unlock massive rewards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToJoin;
