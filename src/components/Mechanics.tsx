import React from "react";
import { INITIAL_WEAPONS } from "../constants";

const Mechanics: React.FC = () => {
  return (
    <section id="mechanics" className="relative bg-[#0c0101] text-white overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-52 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,215,0,0.16),transparent_60%)] blur-3xl" />
        <div className="absolute -bottom-52 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,215,0,0.10),transparent_60%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20">
        {/* Header */}
        <div className="text-center">
          <p className="text-yellow-200/80 tracking-[0.25em] uppercase text-sm">
            Event Guide
          </p>

          <h2 className="mt-3 text-4xl md:text-6xl font-black text-yellow-200">
            How the Event Works
          </h2>

          <p className="mt-4 text-yellow-100/70 max-w-2xl mx-auto">
            Collect weapons, unlock rewards, and complete the full set to enter the Grand Prize.
          </p>
        </div>

        {/* 4 Steps */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "Collect weapons to unlock powerful rewards across the sea.",
            "Each unlock uses 1 ticket. Every unlock guarantees a reward.",
            "Collect all 8 weapons (4x each) to unlock the Grand Prize!",
            "Mini-Game: Pick 1 out of 3 Fortune Angpow to reveal your luck.",
          ].map((desc, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-yellow-200/20 bg-white/5 p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
            >
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500 text-[#2a0000] rounded-full w-12 h-12 flex items-center justify-center font-black text-xl flex-shrink-0 shadow-[0_0_25px_rgba(255,215,0,0.35)]">
                  {idx + 1}
                </div>
                <p className="text-yellow-50/90 text-sm md:text-base leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Weapon Progress */}
        <div className="mt-14">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h3 className="text-2xl md:text-3xl font-black text-yellow-200">
              Weapon Progress
            </h3>
            <p className="text-yellow-100/55 text-sm">
              *Live progress can be wired later — now it’s UI only.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {INITIAL_WEAPONS.map((weapon) => (
              <div
                key={weapon.id}
                className="relative rounded-2xl border border-yellow-200/20 bg-gradient-to-b from-white/8 to-white/4 p-4 backdrop-blur-xl"
              >
                <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_40px_rgba(255,215,0,0.10)]" />
                <div className="relative">
                  <div className="text-4xl mb-2">{weapon.icon}</div>

                  <div className="text-xs font-black text-yellow-200 uppercase mb-2 min-h-[32px] flex items-center">
                    {weapon.name}
                  </div>

                  <div className="flex justify-between text-[10px] text-yellow-100/70 mb-1">
                    <span>Progress</span>
                    <span>
                      {weapon.count ?? 0} / {weapon.max}
                    </span>
                  </div>

                  <div className="w-full bg-[#2a0000] rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          ((weapon.count ?? 0) / weapon.max) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 rounded-2xl border border-yellow-200/25 bg-white/5 px-8 py-8 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.6)]">
            <p className="text-yellow-100/80">
              Ready to collect weapons and unlock rewards?
            </p>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="cta-button-frame rounded-full bg-[#8B6E0D] px-10 py-4 font-black text-white text-lg tracking-wide hover:brightness-110 active:scale-[0.99] transition"
            >
              BACK TO TOP
            </button>

            <p className="text-xs text-yellow-100/50">
              Replace this CTA with WhatsApp / register button later.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mechanics;
