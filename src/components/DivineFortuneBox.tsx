import React, { useMemo } from "react";

type WeaponCard = {
  id: number;
  name: string;
  filename: string; // weapon-1.png etc
};

const WEAPONS: WeaponCard[] = [
  { id: 1, name: "Sword of Lu", filename: "weapon-1.png" },
  { id: 2, name: "Flute of Han", filename: "weapon-2.png" },
  { id: 3, name: "Fan of Zhong", filename: "weapon-3.png" },
  { id: 4, name: "Gourd of Iron", filename: "weapon-4.png" },
  { id: 5, name: "Castanets of Cao", filename: "weapon-5.png" },
  { id: 6, name: "Crutch of Li", filename: "weapon-6.png" },
  { id: 7, name: "Lotus of He", filename: "weapon-7.png" },
  { id: 8, name: "Flower Basket", filename: "weapon-8.png" },
];

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
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40%] h-64 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[40%] h-64 bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative group">
        {/* The Info Box Container */}
        <div className="relative bg-[#000814] rounded-[3rem] border-4 border-[#eab308]/30 p-10 md:p-16 text-center shadow-[0_0_80px_rgba(0,0,0,0.9),inset_0_0_40px_rgba(234,179,8,0.05)] overflow-hidden">
          {/* Binary Corners: Blue and Red only */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-8 border-l-8 border-[#3b82f6] rounded-tl-[2.5rem]" />
          <div className="absolute top-0 right-0 w-20 h-20 border-t-8 border-r-8 border-[#ef4444] rounded-tr-[2.5rem]" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-8 border-l-8 border-[#ef4444] rounded-bl-[2.5rem]" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-8 border-r-8 border-[#3b82f6] rounded-br-[2.5rem]" />

          {/* Icon */}
          <div className="inline-block mb-8 relative">
            <div className="text-7xl animate-float">🧧</div>
            <div className="absolute inset-0 bg-[#eab308] blur-3xl opacity-20" />
          </div>

          {/* Main Message: Strict Gold Text */}
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter uppercase">
            <span className="block text-white mb-2">MORE TICKETS</span>
            <span className="block text-[#eab308] text-5xl mb-4">=</span>
            <span className="block bg-gradient-to-b from-[#fde047] via-[#eab308] to-[#854d0e] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(234,179,8,0.4)]">
              BIGGER FORTUNE
            </span>
          </h2>

          {/* Simple Gold Divider */}
          <div className="w-32 h-1.5 bg-[#eab308] mx-auto mb-8 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]" />

          <p className="text-[#eab308]/80 font-black text-sm md:text-xl uppercase tracking-[0.3em] max-w-lg mx-auto leading-relaxed">
            Unleash the power <br /> of the Eight Immortals
          </p>

          {/* ✅ NEW: Divine Collection Grid */}
          <div className="mt-12">
            <div className="text-left">
              <h3 className="text-2xl md:text-3xl font-black text-[#eab308] uppercase tracking-wide">
                Divine Collection
              </h3>
              <p className="mt-2 text-white/60 text-sm">
                Collect all 8 weapons to unlock the grand prize.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {WEAPONS.map((w) => (
                <div
                  key={w.id}
                  className="rounded-3xl border border-[#eab308]/15 bg-black/30 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
                >
                  <div className="relative mx-auto w-full flex items-center justify-center">
                    <div className="absolute inset-0 rounded-2xl bg-[#eab308]/10 blur-2xl opacity-40" />
                    <img
                      src={`/weapons/${w.filename}`}
                      alt={w.name}
                      className="relative h-24 md:h-28 w-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                      loading="lazy"
                      onError={(e) => {
                        // If image path wrong, this makes the bug obvious (instead of silent blank)
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>

                  <div className="mt-4 text-xs md:text-sm font-black text-[#eab308] uppercase tracking-wide">
                    {w.name}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[10px] text-white/50 font-black uppercase tracking-wider">
                    <span>Progress</span>
                    <span>0 / 4</span>
                  </div>

                  <div className="mt-2 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-gradient-to-b from-[#fde047] via-[#eab308] to-[#854d0e]"
                      style={{ width: "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

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
