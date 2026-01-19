import React, { useMemo } from "react";

// ✅ Vite-bundled image imports (no /public 404 issues)
import weapon1 from "../src/weapons/weapon-1.png";
import weapon2 from "../src/weapons/weapon-2.png";
import weapon3 from "../src/weapons/weapon-3.png";
import weapon4 from "../src/weapons/weapon-4.png";
import weapon5 from "../src/weapons/weapon-5.png";
import weapon6 from "../src/weapons/weapon-6.png";
import weapon7 from "../src/weapons/weapon-7.png";
import weapon8 from "../src/weapons/weapon-8.png";

type WeaponItem = {
  id: string;
  name: string;
  img: string;
  max: number;
};

const DivineFortuneBox: React.FC = () => {
  const sparkles = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${i * 0.6}s`,
    }));
  }, []);

  const weapons: WeaponItem[] = useMemo(
    () => [
      { id: "1", name: "Sword of Lu", img: weapon1, max: 4 },
      { id: "2", name: "Flute of Han", img: weapon2, max: 4 },
      { id: "3", name: "Fan of Zhong", img: weapon3, max: 4 },
      { id: "4", name: "Gourd of Iron", img: weapon4, max: 4 },
      { id: "5", name: "Crutch of Li", img: weapon5, max: 4 },
      { id: "6", name: "Fan Leaf", img: weapon6, max: 4 },
      { id: "7", name: "Lotus of He", img: weapon7, max: 4 },
      { id: "8", name: "Flower Basket", img: weapon8, max: 4 },
    ],
    []
  );

  return (
    <section className="py-24 px-6 bg-transparent relative overflow-hidden">
      {/* Background Atmosphere (Strict Blue/Red) */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40%] h-64 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[40%] h-64 bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        {/* The Container */}
        <div className="relative bg-[#000814] rounded-[3rem] border-4 border-[#eab308]/30 p-10 md:p-16 text-center shadow-[0_0_80px_rgba(0,0,0,0.9),inset_0_0_40px_rgba(234,179,8,0.05)] overflow-hidden">
          {/* Corners */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-8 border-l-8 border-[#3b82f6] rounded-tl-[2.5rem]" />
          <div className="absolute top-0 right-0 w-20 h-20 border-t-8 border-r-8 border-[#ef4444] rounded-tr-[2.5rem]" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-8 border-l-8 border-[#ef4444] rounded-bl-[2.5rem]" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-8 border-r-8 border-[#3b82f6] rounded-br-[2.5rem]" />

          {/* Title */}
          <div className="inline-block mb-10 relative">
            <div className="text-7xl animate-float">🧧</div>
            <div className="absolute inset-0 bg-[#eab308] blur-3xl opacity-20" />
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter uppercase">
            <span className="block text-white mb-2">DIVINE COLLECTION</span>
            <span className="block bg-gradient-to-b from-[#fde047] via-[#eab308] to-[#854d0e] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(234,179,8,0.4)]">
              Eight Immortals Weapons
            </span>
          </h2>

          <div className="w-40 h-1.5 bg-[#eab308] mx-auto mb-10 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]" />

          {/* Weapon Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 text-left">
            {weapons.map((w) => (
              <div
                key={w.id}
                className="rounded-3xl border border-[#eab308]/20 bg-white/5 p-5 md:p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
              >
                <div className="flex items-center justify-center mb-4">
                  <img
                    src={w.img}
                    alt={w.name}
                    className="h-20 w-20 object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
                    loading="lazy"
                  />
                </div>

                <div className="text-xs md:text-sm font-black text-[#eab308] uppercase tracking-[0.18em] text-center">
                  {w.name}
                </div>

                <div className="mt-4 flex items-center justify-between text-[10px] text-white/60 font-black uppercase tracking-[0.14em]">
                  <span>Progress</span>
                  <span>0 / {w.max}</span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-black/40 overflow-hidden border border-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-b from-[#fde047] via-[#eab308] to-[#854d0e]"
                    style={{ width: "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-[#eab308]/75 font-black text-sm md:text-lg uppercase tracking-[0.3em]">
            Collect more tickets → unlock bigger fortune
          </p>

          {/* Sparkles (stable) */}
          <div className="absolute inset-0 pointer-events-none">
            {sparkles.map((s) => (
              <div
                key={s.id}
                className="absolute bg-[#eab308]/40 w-1 h-1 rounded-full animate-pulse"
                style={{ top: s.top, left: s.left, animationDelay: s.delay }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DivineFortuneBox;
