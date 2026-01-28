import React, { useEffect, useMemo, useRef, useState } from "react";

/* =============================
   CONFIG
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
  { id: "p0", label: "100 FREE SPINS", value: "ON SLOT", color: "#c41212" },
  { id: "p1", label: "i88 REWARD", value: "MYSTERY PRIZE", color: "#b91c1c" },
  { id: "p2", label: "i88 BONUS", value: "LUCKY DRAW", color: "#a30f0f" },
  { id: "p3", label: "i88 FORTUNE", value: "PROSPERITY", color: "#8f0000" },
  { id: "p4", label: "i88 REWARD", value: "MYSTERY PRIZE", color: "#b91c1c" },
  { id: "p5", label: "i88 BONUS", value: "LUCKY DRAW", color: "#a30f0f" },
];

const WHEEL_SIZE = 520;
const OUTER_BORDER_WIDTH = 28;

/* =============================
   POINTER
============================= */
function SimplePointer() {
  return (
    <svg viewBox="0 0 120 120" className="w-14 h-14 sm:w-16 sm:h-16">
      <defs>
        <linearGradient id="ptrGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#f9f295" />
          <stop offset="55%" stopColor="#e0aa3e" />
          <stop offset="78%" stopColor="#faf398" />
          <stop offset="100%" stopColor="#b88a44" />
        </linearGradient>
        <filter id="ptrShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feOffset dx="0" dy="4" result="off" />
          <feFlood floodColor="black" floodOpacity="0.55" result="col" />
          <feComposite in="col" in2="off" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#ptrShadow)">
        <path
          d="M60 10 L90 55 L60 110 L30 55 Z"
          fill="url(#ptrGold)"
          stroke="#3b2a10"
          strokeWidth="2"
        />
        <circle cx="60" cy="42" r="6" fill="#ee1c25" opacity="0.95" />
      </g>
    </svg>
  );
}

/* =============================
   MAIN SECTION
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

  // ✅ force win: 100 FREE SPINS
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
    <section className="relative w-full max-w-[980px] mx-auto px-4">
      {/* =============================
          SALES COPY (BEFORE WHEEL)
      ============================== */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-3 rounded-full bg-black/25 border border-white/10 px-4 py-2">
          <span className="text-[#f9df9d]/80 text-[10px] sm:text-xs font-black tracking-[0.35em] uppercase">
            Instant Member Privileges
          </span>
        </div>

        <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight">
          <span className="goldHeadline">PLAY WITH US</span>{" "}
          <span className="text-white/90">→</span>{" "}
          <span className="goldHeadline">GET INSTANT REWARDS</span>
        </h2>

        <p className="mt-3 text-white/80 text-[12px] sm:text-base max-w-2xl mx-auto leading-relaxed">
          Deposit & play — rewards are credited fast. Spin the wheel to reveal
          your welcome reward.
        </p>

        {/* benefits */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {[
            { t: "Instant credit", d: "Fast processing to your account" },
            { t: "VIP support", d: "Priority help when you need it" },
            { t: "Exclusive rewards", d: "Member-only bonuses & perks" },
          ].map((b, i) => (
            <div
              key={i}
              className="rounded-2xl bg-black/20 border border-white/10 p-4 text-left"
            >
              <div className="text-white font-black tracking-wide">{b.t}</div>
              <div className="text-white/70 text-xs sm:text-sm mt-1">
                {b.d}
              </div>
            </div>
          ))}
        </div>

        {/* pre-spin instruction */}
        {!showWin && (
          <div className="mt-7 text-center">
            <div className="text-[#f9df9d]/70 text-[10px] sm:text-xs font-black tracking-[0.45em] uppercase">
              Try the free demo spin 👇
            </div>
            <div className="mt-1 text-white/70 text-xs sm:text-sm">
              Tap the red angpow to reveal your reward
            </div>
          </div>
        )}
      </div>

      {/* =============================
          WHEEL (LOWER)
      ============================== */}
      <div className="relative w-full max-w-[560px] mx-auto mt-10 sm:mt-14">
        {/* POINTER */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-40">
          <SimplePointer />
        </div>

        {/* WHEEL */}
        <div className="relative aspect-square">
          <div
            ref={wheelRef}
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning
                ? `transform ${SPIN_SECONDS}s cubic-bezier(0.15,0,0.15,1)`
                : "none",
            }}
            className="w-full h-full"
          >
            <svg
              viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
              className="w-full h-full"
            >
              {/* base */}
              <circle
                cx={WHEEL_SIZE / 2}
                cy={WHEEL_SIZE / 2}
                r={WHEEL_SIZE / 2}
                fill="#b91c1c"
              />

              {PRIZES.map((p, i) => {
                const start = i * anglePerSegment;
                const end = (i + 1) * anglePerSegment;
                const r = WHEEL_SIZE / 2 - OUTER_BORDER_WIDTH;

                const x1 =
                  WHEEL_SIZE / 2 +
                  r * Math.cos(((start - 90) * Math.PI) / 180);
                const y1 =
                  WHEEL_SIZE / 2 +
                  r * Math.sin(((start - 90) * Math.PI) / 180);
                const x2 =
                  WHEEL_SIZE / 2 +
                  r * Math.cos(((end - 90) * Math.PI) / 180);
                const y2 =
                  WHEEL_SIZE / 2 +
                  r * Math.sin(((end - 90) * Math.PI) / 180);

                const d = `M ${WHEEL_SIZE / 2} ${WHEEL_SIZE / 2}
                           L ${x1} ${y1}
                           A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;

                return (
                  <g key={p.id}>
                    <path d={d} fill={p.color} />
                    <g
                      transform={`rotate(${start + anglePerSegment / 2}, ${
                        WHEEL_SIZE / 2
                      }, ${WHEEL_SIZE / 2})`}
                    >
                      <text
                        x={WHEEL_SIZE / 2}
                        y={110}
                        textAnchor="middle"
                        fill="#fffacd"
                        className="font-black text-[16px] sm:text-[18px]"
                        style={{
                          letterSpacing: "0.08em",
                          textShadow: "0 2px 10px rgba(0,0,0,0.55)",
                        }}
                      >
                        {p.label}
                      </text>
                      <text
                        x={WHEEL_SIZE / 2}
                        y={132}
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.85)"
                        className="text-[9px] tracking-widest font-black"
                      >
                        {p.value}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* rim */}
              <circle
                cx={WHEEL_SIZE / 2}
                cy={WHEEL_SIZE / 2}
                r={WHEEL_SIZE / 2 - OUTER_BORDER_WIDTH / 2}
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth={2}
                opacity={0.25}
              />
            </svg>
          </div>

          {/* SPIN BUTTON (ANGPOW) */}
          {!showWin && (
            <button
              onClick={spin}
              disabled={isSpinning}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[48%]
                w-20 h-28 sm:w-24 sm:h-36
                bg-gradient-to-b from-[#ee1c25] to-[#7f1d1d]
                rounded-xl border-2 border-white/30
                shadow-[0_16px_40px_rgba(0,0,0,0.55)]
                flex flex-col items-center justify-center
                transition
                ${isSpinning ? "animate-vibrate" : "hover:scale-105 active:scale-95"}
              `}
            >
              <span className="text-[#f9df9d] text-4xl font-black drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]">
                福
              </span>
              <span className="text-[#f9df9d] text-[10px] tracking-[0.4em] font-black">
                SPIN
              </span>
            </button>
          )}
        </div>

        {/* =============================
            POST-WIN CTA (BUTTON)
        ============================== */}
        {showWin && (
          <a
            href={CTA_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 block w-full text-center rounded-3xl px-6 py-6
              bg-[#2a0404]/60 border border-white/10
              shadow-[0_30px_90px_rgba(0,0,0,0.7)]
              hover:scale-[1.01] active:scale-[0.99] transition"
          >
            <div className="text-[10px] sm:text-xs tracking-[0.55em] uppercase text-white/70 font-black">
              Congratulations
            </div>

            <div className="mt-2 text-3xl sm:text-4xl font-black leading-tight">
              <span className="goldWinText">YOU WON 100 FREE SPINS</span>
              <div className="mt-2 text-lg sm:text-xl font-black goldWinText">
                ON SLOT
              </div>
            </div>

            {/* ✅ gold CTA like your reference palette */}
            <div className="mt-5 inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl goldCtaBtn">
              <span className="text-black/90 font-black tracking-[0.22em] uppercase text-[11px] sm:text-xs">
                Tap to claim now
              </span>
              <span className="text-black/80 font-black">→</span>
            </div>

            <div className="mt-4 text-[10px] sm:text-xs tracking-[0.45em] uppercase text-[#f9df9d]/65 font-black">
              {isLimitReached ? "LIMIT REACHED" : "READY TO REGISTER"}
            </div>
          </a>
        )}
      </div>

      <style>{`
        .goldHeadline {
          background: linear-gradient(180deg, #ffffff 0%, #f9f295 22%, #e0aa3e 48%, #faf398 72%, #b88a44 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 12px 40px rgba(0,0,0,0.55);
        }

        .goldWinText{
          background: linear-gradient(90deg, #f9f295 0%, #e0aa3e 35%, #faf398 70%, #b88a44 100%);
          -webkit-background-clip:text;
          background-clip:text;
          color:transparent;
          text-shadow: 0 0 18px rgba(253,224,71,0.30), 0 14px 45px rgba(0,0,0,0.75);
        }

        .goldCtaBtn{
          background: linear-gradient(90deg, #f9f295 0%, #e0aa3e 35%, #faf398 70%, #b88a44 100%);
          box-shadow: 0 16px 55px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.45);
          border: 1px solid rgba(255,255,255,0.22);
        }

        @keyframes vibrate {
          0%, 100% { transform: translate(-50%, -48%) rotate(0deg); }
          25% { transform: translate(calc(-50% + 1px), calc(-48% + 1px)) rotate(0.35deg); }
          75% { transform: translate(calc(-50% - 1px), calc(-48% - 1px)) rotate(-0.35deg); }
        }
        .animate-vibrate { animation: vibrate 0.18s linear infinite; }
      `}</style>
    </section>
  );
};

export default InstantReward;
