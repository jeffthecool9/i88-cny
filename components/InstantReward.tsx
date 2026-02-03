import React from "react";

/* =============================
   INSTANT REWARD (INTRO ONLY)
   - Keeps the top intro card
   - Removes the entire spinning wheel section
============================= */

const InstantReward: React.FC = () => {
  return (
    <section className="relative w-full max-w-[560px] mx-auto px-4 pt-10 pb-10">
      {/* =============================
          CNY INTRO (KEPT)
      ============================= */}
      <div className="relative text-center rounded-[28px] p-6 sm:p-7 overflow-hidden border border-[#F9F295]/18 bg-black/10 shadow-[0_18px_80px_rgba(0,0,0,0.55)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-[#ff1f2d]/25 blur-[90px]" />
          <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-[620px] h-[620px] rounded-full bg-[#F9F295]/10 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
            style={{
              backgroundImage:
                'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")',
            }}
          />
        </div>

        <div className="relative z-10">
          <h2 className="mt-1 leading-tight">
            <span className="block text-[34px] sm:text-[42px] font-black tracking-tight goldTitle">
              PLAY WITH US
            </span>
            <span className="block text-[34px] sm:text-[42px] font-black tracking-tight goldTitle">
              → GET INSTANT REWARDS
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-white/78 leading-relaxed max-w-[440px] mx-auto">
            Deposit & play — rewards are credited instantly
          </p>

          <div className="mt-6 max-w-[460px] mx-auto flex flex-col gap-3">
            <div className="goldPill">
              <span className="goldPillText">Instant Credit to Your Account</span>
            </div>

            <div className="goldPill">
              <span className="goldPillText">3 Minute Withdrawal</span>
            </div>

            <div className="goldPill">
              <span className="goldPillText">VIP Tier 24/7 Customer Service</span>
            </div>
          </div>

      
        </div>
      </div>

      {/* =============================
          ✅ WHEEL REMOVED COMPLETELY
      ============================= */}

      <style>{`
        .goldTitle{
          background: linear-gradient(
            180deg,
            #fff,
            #FAF398 18%,
            #F9F295 42%,
            #E0AA3E 72%,
            #B88A44
          );
          -webkit-background-clip:text;
          background-clip:text;
          color:transparent;
          text-shadow:
            0 10px 40px rgba(0,0,0,0.65),
            0 0 18px rgba(253,224,71,0.22);
        }

        .goldPill{
          width: 100%;
          padding: 14px 18px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            #F9F295,
            #E0AA3E,
            #FAF398,
            #B88A44
          );
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.65),
            0 12px 40px rgba(0,0,0,0.45);
          border: 1px solid rgba(0,0,0,0.18);
        }

        .goldPillText{
          display:block;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.82);
          font-size: 14px;
          line-height: 1.15;
          text-align: center;
        }

        @media (min-width: 640px){
          .goldPillText{ font-size: 16px; }
        }
      `}</style>
    </section>
  );
};

export default InstantReward;
