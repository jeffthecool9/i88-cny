import React from 'react';

const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[440px]">
      <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Logo Area */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-lg flex items-center justify-center font-black text-[#8b0000] text-xs">
            八
          </div>
          <span className="text-white font-black text-xs tracking-widest uppercase opacity-80">TREASURE</span>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-500 text-[9px] font-black uppercase tracking-tighter">Event Live</span>
          </div>
          
          <button className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;