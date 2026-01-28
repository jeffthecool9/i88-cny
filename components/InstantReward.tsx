import React, { useEffect, useMemo, useRef, useState } from "react";

/* =============================
   CONFIG (EDIT ONLY THESE)
============================= */
const MAX_SPINS = 1;
const SPIN_SECONDS = 4;
const CTA_URL = "https://your-link-here.com"; // 🔴 CHANGE THIS

type Prize = {
  id: string;
  label: string;
  value: string;
  color: string;
};

const PRIZES: Prize[] = [
  { id: "p0", label: "100 FREE SPINS", value: "ON SLOT", color: "#ff1f2d" },
  { id: "p1", label: "i88 REWARD", value: "MYSTERY PRIZE", color: "#e41420" },
  { id: "p2", label: "i88 BONUS", value: "LUCKY DRAW", color: "#c60f18" },
  { id: "p3", label: "i88 FORTUNE", value: "PROSPERITY", color: "#a80b12" },
  { id: "p4", label: "i88 REWARD", value: "MYSTERY PRIZE", color: "#e41420" },
  { id: "p5", label: "i88 BONUS", value: "LUCKY DRAW", color: "#c60f18" },
];

const WHEEL_SIZE = 520;
const OUTER_BORDER_WIDTH = 28;

/* =============================
   POINTER (GOLD)
============================= */
function SimplePointer() {
  return (
    <div className="relative w-14 h-14 sm:w-16 sm:h-16">
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="ptrGold2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="18%" stopColor="#FAF398" />
            <stop offset="52%" stopColor="#F9F295" />
            <stop offset="78%" stopColor="#E0AA3E" />
            <stop offset="100%" stopColor="#B88A44" />
          </linearGradient>
          <filter id="ptrShadow2" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
            <feOffset dx="0" dy="5" result="off" />
            <feFlood floodColor="black" floodOpacity="0.55" result="col" />
            <feComposite in="col" in2="off" operator="in" result="shadow" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#ptrShadow2)">
          <path
            d="M60 10 L90 55 L60 110 L30 55 Z"
            fill="url(#ptrGold2)"
            stroke="#3b2a10"
            strokeWidth="2"
          />
          <circle cx="60" cy="44" r="6" fill="#ee1c25" opacity="0.95" />
        </g>
      </svg>
    </div>
  );
}

/* =============================
   MAIN SINGLE-FILE SECTION
============================= */
const InstantReward: React.FC = () => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const finishedRef = useRef(false);

  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinsUsed, setSpinsUsed] = useState(0);
  const [showWin, setShowWin] = useState(false);

  const segments = PRIZES.length;
  const anglePerSegment = 360 / segments;
  const isLimitReached = spinsUsed >= MAX_SPINS;

  // ✅ force to always land at 100 FREE SPINS
  const forcedWinIndex = useMemo(() => {
    const idx = PRIZES.findIndex(
      (p) => p.label.trim().toUpperCase() === "100 FREE SPINS"
    );
    return idx >= 0 ? idx : 0;
  }, []);

  const spin = () => {
    if (isSpinning || isLimitReached) return;

    setIsSpinning(true);
    setShowWin(false);
    finishedRef.current = false;

    const segmentOffset = anglePerSegment / 2;
    const targetAngle = 360 - forcedWinIndex * anglePerSegment - segmentOffset;

    const current = rotationRef.current % 360;
    const delta = (targetAngle - current + 360) % 360;

    const finalRotation = rotationRef.current + 8 * 360 + delta;

    rotationRef.current = finalRotation;
    setRotation(finalRotation);
  };

  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;

    const onEnd = (e: TransitionEvent) => {
      if (e.target !== el) return;
      if (e.propertyName !== "transform") return;
      if (finishedRef.current) return;

      finishedRef.current = true;
      setIsSpinning(false);
      setSpinsUsed((v) => v + 1);
      setShowWin(true);
    };

    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, []);

  return (
    <section className="relative w-full max-w-[560px] mx-auto px-4 pt-10 pb-10">
      {/* =============================
          VIBRANT CNY INTRO (UPDATED)
      ============================= */}
      <div className="relative text-center rounded-[28px] p-6 sm:p-7 overflow-hidden border border-[#F9F295]/18 bg-black/10 shadow-[0_18px_80px_rgba(0,0,0,0.55)]">
        {/* background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-[#ff1f2d]/25 blur-[90px]" />
          <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-[620px] h-[620px] rounded-full bg-[#F9F295]/10 blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
               style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")' }} />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F9F295]/25 bg-black/20">
            <span className="text-[10px] tracking-[0.35em] uppercase font-black text-[#F9F295]/85">
              INSTANT MEMBER PRIVILEGES
            </span>
          </div>

          <h2 className="mt-4 leading-tight">
            <span className="block text-[34px] sm:text-[42px] font-black tracking-tight goldTitle">
              PLAY WITH US
            </span>
            <span className="block text-[34px] sm:text-[42px] font-black tracking-tight goldTitle">
              → GET INSTANT REWARDS
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-white/78 leading-relaxed max-w-[440px] mx-auto">
            Deposit & play — rewards are credited fast. Spin the wheel to reveal your welcome reward.
          </p>

          {/* 3 benefits: clean “button bullets” */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-3 px-4 py-4 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center badgeGold">
                <span className="text-[12px] font-black text-black/90">01</span>
              </div>
              <div className="text-left">
                <div className="text-sm font-extrabold text-white">Instant Credit</div>
                <div className="text-[12px] text-white/70">to your account</div>
              </div>
            </div>

            <div className="flex-1 flex items-center gap-3 px-4 py-4 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center badgeGold">
                <span className="text-[12px] font-black text-black/90">02</span>
              </div>
              <div className="text-left">
                <div className="text-sm font-extrabold text-white">3 Min Withdrawal</div>
                <div className="text-[12px] text-white/70">fast processing</div>
              </div>
            </div>

            <div className="flex-1 flex items-center gap-3 px-4 py-4 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center badgeGold">
                <span className="text-[12px] font-black text-black/90">03</span>
              </div>
              <div className="text-left">
                <div className="text-sm font-extrabold text-white">VIP Tier 24/7</div>
                <div className="text-[12px] text-white/70">customer service</div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-[11px] tracking-[0.45em] uppercase font-bold text-[#F9F295]/70">
            TRY THE FREE DEMO SPIN ↓
          </div>
        </div>
      </div>

      {/* =============================
          WHEEL (V2 LOOK LIKE PIC 2)
      ============================= */}
      <div className="relative mt-8 sm:mt-10">
        {/* glow behind wheel */}
        <div className={`absolute inset-0 -z-10 rounded-[40px] ${showWin ? "winGlow" : "baseGlow"}`} />

        {/* pointer */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-40 drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)]">
          <SimplePointer />
        </div>

        {/* wheel wrapper */}
        <div className="relative aspect-square rounded-[40px] overflow-visible">
          <div
            ref={wheelRef}
            className={`w-full h-full ${showWin ? "winWheelPop" : ""}`}
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning
                ? `transform ${SPIN_SECONDS}s cubic-bezier(0.15,0,0.15,1)`
                : "none",
            }}
          >
            <svg viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`} className="w-full h-full overflow-visible">
              <defs>
                {/* wheel lacquer */}
                <radialGradient id="redLacquerV2" cx="50%" cy="45%" r="60%">
                  <stop offset="0%" stopColor="#ff3b3b" />
                  <stop offset="55%" stopColor="#ee1c25" />
                  <stop offset="100%" stopColor="#5a0606" />
                </radialGradient>

                {/* gold rim */}
                <linearGradient id="goldRimV2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F9F295" />
                  <stop offset="28%" stopColor="#E0AA3E" />
                  <stop offset="55%" stopColor="#FAF398" />
                  <stop offset="78%" stopColor="#E0AA3E" />
                  <stop offset="100%" stopColor="#B88A44" />
                </linearGradient>

                {/* subtle rim pattern */}
                <pattern id="rimPatternV2" x="0" y="0" width="18" height="10" patternUnits="userSpaceOnUse">
                  <path d="M0 10 Q4 0 9 10 Q14 0 18 10" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" />
                </pattern>

                {/* glossy overlay */}
                <radialGradient id="glossV2" cx="35%" cy="25%" r="70%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
                  <stop offset="40%" stopColor="rgba(255,255,255,0.08)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>

                {/* win bloom */}
                <filter id="winBloomV2" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="10" result="blur" />
                  <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="
                      1 0 0 0 0
                      0 0.9 0 0 0
                      0 0 0.2 0 0
                      0 0 0 0.8 0"
                    result="col"
                  />
                  <feMerge>
                    <feMergeNode in="col" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* base */}
              <circle cx={WHEEL_SIZE / 2} cy={WHEEL_SIZE / 2} r={WHEEL_SIZE / 2 - 6} fill="url(#redLacquerV2)" />

              {/* segments */}
              {PRIZES.map((p, i) => {
                const start = i * anglePerSegment;
                const end = (i + 1) * anglePerSegment;
                const r = WHEEL_SIZE / 2 - OUTER_BORDER_WIDTH;

                const x1 = WHEEL_SIZE / 2 + r * Math.cos(((start - 90) * Math.PI) / 180);
                const y1 = WHEEL_SIZE / 2 + r * Math.sin(((start - 90) * Math.PI) / 180);
                const x2 = WHEEL_SIZE / 2 + r * Math.cos(((end - 90) * Math.PI) / 180);
                const y2 = WHEEL_SIZE / 2 + r * Math.sin(((end - 90) * Math.PI) / 180);

                const d = `M ${WHEEL_SIZE / 2} ${WHEEL_SIZE / 2} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;

                const isWinnerSlice = showWin && i === forcedWinIndex;

                return (
                  <g key={p.id} filter={isWinnerSlice ? "url(#winBloomV2)" : "none"}>
                    <path d={d} fill={p.color} opacity={0.98} />
                    <line
                      x1={WHEEL_SIZE / 2}
                      y1={WHEEL_SIZE / 2}
                      x2={x1}
                      y2={y1}
                      stroke="rgba(255,255,255,0.14)"
                      strokeWidth="1"
                    />

                    <g transform={`rotate(${start + anglePerSegment / 2}, ${WHEEL_SIZE / 2}, ${WHEEL_SIZE / 2})`}>
                      <text
                        x={WHEEL_SIZE / 2}
                        y={110}
                        textAnchor="middle"
                        fill={isWinnerSlice ? "#ffffff" : "#fff3b0"}
                        className="font-black text-[16px] sm:text-[18px] tracking-wider"
                        style={{ textShadow: "0 2px 10px rgba(0,0,0,0.65)" }}
                      >
                        {p.label}
                      </text>
                      <text
                        x={WHEEL_SIZE / 2}
                        y={130}
                        textAnchor="middle"
                        fill={isWinnerSlice ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.82)"}
                        className="font-bold text-[9px] tracking-[0.22em] uppercase"
                      >
                        {p.value}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* glossy highlight */}
              <circle cx={WHEEL_SIZE / 2} cy={WHEEL_SIZE / 2} r={WHEEL_SIZE / 2 - 12} fill="url(#glossV2)" opacity={0.8} />

              {/* gold rim */}
              <circle
                cx={WHEEL_SIZE / 2}
                cy={WHEEL_SIZE / 2}
                r={WHEEL_SIZE / 2 - OUTER_BORDER_WIDTH / 2}
                fill="none"
                stroke="url(#goldRimV2)"
                strokeWidth={OUTER_BORDER_WIDTH}
              />
              <circle
                cx={WHEEL_SIZE / 2}
                cy={WHEEL_SIZE / 2}
                r={WHEEL_SIZE / 2 - OUTER_BORDER_WIDTH / 2}
                fill="none"
                stroke="url(#rimPatternV2)"
                strokeWidth={OUTER_BORDER_WIDTH}
                opacity={0.28}
              />

              {/* crisp inner rings */}
              <circle
                cx={WHEEL_SIZE / 2}
                cy={WHEEL_SIZE / 2}
                r={WHEEL_SIZE / 2 - OUTER_BORDER_WIDTH}
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1"
              />
              <circle
                cx={WHEEL_SIZE / 2}
                cy={WHEEL_SIZE / 2}
                r={WHEEL_SIZE / 2}
                fill="none"
                stroke="rgba(0,0,0,0.18)"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* SPIN ANGPOW (only before win) */}
          {!showWin && (
            <button
              onClick={spin}
              disabled={isSpinning || isLimitReached}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                w-20 h-28 sm:w-24 sm:h-36 rounded-xl border-2 border-white/30
                shadow-[0_18px_50px_rgba(0,0,0,0.55)]
                bg-gradient-to-b from-[#ff2a2a] via-[#ee1c25] to-[#7f1d1d]
                flex flex-col items-center justify-center
                transition-transform duration-300
                ${isSpinning ? "animate-vibrate" : "hover:scale-105 active:scale-95"}
                ${isLimitReached ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <div className="absolute top-0 w-full h-9 sm:h-12 bg-[#c41212] rounded-b-[18px] border-b border-white/20" />
              <span className="relative z-10 text-[#F9F295] text-4xl sm:text-5xl font-black drop-shadow-[0_6px_18px_rgba(0,0,0,0.55)]">
                福
              </span>
              <span className="relative z-10 text-[#F9F295] text-[10px] sm:text-xs font-black tracking-[0.35em] uppercase">
                SPIN
              </span>
              <div className="absolute inset-0 shimmerSlow pointer-events-none" />
            </button>
          )}

          {/* YOU WON ANGPOW (only after stop) */}
          {showWin && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-24 h-36 sm:w-28 sm:h-44 rounded-xl border-2 border-white/30
                              shadow-[0_22px_70px_rgba(0,0,0,0.70)]
                              bg-gradient-to-b from-[#ff2a2a] via-[#ee1c25] to-[#7f1d1d]
                              flex flex-col items-center justify-center overflow-hidden animate-popIn">
                <div className="absolute top-0 w-full h-10 sm:h-14 bg-[#c41212] rounded-b-[18px] border-b border-white/20" />
                <span className="relative z-10 text-[#F9F295] text-5xl font-black drop-shadow-[0_10px_26px_rgba(253,224,71,0.25)]">
                  福
                </span>
                <span className="relative z-10 text-[#F9F295] text-[11px] font-black tracking-[0.28em] uppercase">
                  YOU WON
                </span>
                <div className="absolute inset-0 shimmerFast pointer-events-none" />
              </div>
            </div>
          )}
        </div>

        {/* =============================
            WIN CTA BUTTON (GOLD)
        ============================= */}
        {showWin && (
          <a
            href={CTA_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 block w-full rounded-[22px] p-[2px] goldBorder hover:scale-[1.01] active:scale-[0.99] transition-transform"
          >
            <div className="rounded-[20px] px-6 py-5 text-center bg-[#240202] shadow-[0_24px_90px_rgba(0,0,0,0.65)]">
              <div className="text-[10px] sm:text-[11px] tracking-[0.55em] uppercase font-black text-[#F9F295]/70 mb-2">
                CONGRATULATIONS
              </div>

              <div className="winGoldHeadline text-[22px] sm:text-[28px] font-black leading-tight">
                YOU WON 100 FREE SPINS
                <div className="text-[16px] sm:text-[18px] mt-1">ON SLOT</div>
              </div>

              <div className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full goldButton">
                <span className="text-[11px] sm:text-xs font-black tracking-[0.35em] uppercase text-black/90">
                  TAP TO CLAIM NOW
                </span>
                <span className="text-black/85 font-black">→</span>
              </div>
            </div>
          </a>
        )}

        {/* helper text before win */}
        {!showWin && (
          <div className="mt-6 text-center">
            <p className="text-[11px] tracking-[0.45em] uppercase text-[#F9F295]/70 font-bold">
              {isLimitReached ? "LIMIT REACHED" : "CLICK THE RED ANGPOW"}
            </p>
          </div>
        )}
      </div>

      {/* =============================
          STYLES (IN-FILE)
      ============================= */}
      <style>{`
        .goldTitle{
          background: linear-gradient(180deg,#fff,#FAF398 18%,#F9F295 42%,#E0AA3E 72%,#B88A44);
          -webkit-background-clip:text;
          background-clip:text;
          color:transparent;
          text-shadow: 0 10px 40px rgba(0,0,0,0.65), 0 0 18px rgba(253,224,71,0.22);
        }
        .badgeGold{
          background: linear-gradient(90deg,#F9F295,#E0AA3E,#FAF398,#B88A44);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.55), 0 10px 30px rgba(0,0,0,0.35);
        }
        .baseGlow{
          background: radial-gradient(circle at 50% 40%, rgba(238,28,37,0.25), transparent 60%);
          filter: blur(18px);
        }
        .winGlow{
          background:
            radial-gradient(circle at 50% 40%, rgba(253,224,71,0.28), transparent 62%),
            radial-gradient(circle at 50% 60%, rgba(238,28,37,0.25), transparent 62%);
          filter: blur(16px);
          animation: winGlowPulse 1.2s ease-in-out infinite;
        }
        @keyframes winGlowPulse{
          0%,100%{ transform: scale(1); opacity: 0.95; }
          50%{ transform: scale(1.03); opacity: 0.75; }
        }

        .winWheelPop{
          animation: winWheelPop 520ms cubic-bezier(0.2,1,0.3,1) both;
        }
        @keyframes winWheelPop{
          from{ transform: scale(0.985); filter: drop-shadow(0 0 0 rgba(0,0,0,0)); }
          to{ transform: scale(1); filter: drop-shadow(0 18px 65px rgba(0,0,0,0.55)); }
        }

        @keyframes vibrate {
          0%,100% { transform: translate(-50%, -50%) rotate(0deg); }
          25% { transform: translate(calc(-50% + 1px), calc(-50% + 1px)) rotate(0.35deg); }
          75% { transform: translate(calc(-50% - 1px), calc(-50% - 1px)) rotate(-0.35deg); }
        }
        .animate-vibrate{ animation: vibrate 0.18s linear infinite; }

        .shimmerSlow{
          background: linear-gradient(110deg, transparent, rgba(255,255,255,0.16), transparent);
          transform: translateX(-140%);
          animation: shimmerSlow 3.6s ease-in-out infinite;
        }
        @keyframes shimmerSlow{
          0%{ transform: translateX(-140%) skewX(-18deg); }
          100%{ transform: translateX(140%) skewX(-18deg); }
        }

        .shimmerFast{
          background: linear-gradient(180deg, transparent, rgba(255,255,255,0.20), transparent);
          transform: translateY(120%);
          animation: shimmerFast 1.1s ease-in-out infinite;
        }
        @keyframes shimmerFast{
          0%{ transform: translateY(120%); }
          100%{ transform: translateY(-120%); }
        }

        @keyframes popIn{
          from{ opacity:0; transform: translateY(10px) scale(0.96); }
          to{ opacity:1; transform: translateY(0) scale(1); }
        }
        .animate-popIn{ animation: popIn 420ms cubic-bezier(0.2,1,0.3,1) both; }

        .goldBorder{
          background: linear-gradient(90deg,#F9F295,#E0AA3E,#FAF398,#B88A44);
          box-shadow: 0 16px 60px rgba(0,0,0,0.45);
        }
        .winGoldHeadline{
          background: linear-gradient(180deg,#fff,#FAF398 18%,#F9F295 42%,#E0AA3E 72%,#B88A44);
          -webkit-background-clip:text;
          background-clip:text;
          color:transparent;
          text-shadow: 0 0 18px rgba(253,224,71,0.25), 0 10px 34px rgba(0,0,0,0.7);
        }
        .goldButton{
          background: linear-gradient(90deg,#F9F295,#E0AA3E,#FAF398,#B88A44);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.65),
            0 12px 40px rgba(0,0,0,0.45);
          border: 1px solid rgba(0,0,0,0.15);
        }
      `}</style>
    </section>
  );
};

export default InstantReward;
