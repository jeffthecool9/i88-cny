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
          <stop offset="40%" stopColor="#f9df9d" />
          <stop offset="100%" stopColor="#d4af37" />
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
        <circle cx="60" cy="42" r="6" fill="#ee1c25" />
      </g>
    </svg>
  );
}

/* =============================
   MAIN COMPONENT
============================= */
const FortuneWheel: React.FC = () => {
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

  // ✅ Robust forced index (prevents -1)
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

    // land at the CENTER of the target slice under pointer
    const segmentOffset = anglePerSegment / 2;
    const targetAngle = 360 - forcedWinIndex * anglePerSegment - segmentOffset;

    const current = ((rotationRef.current % 360) + 360) % 360;
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
    <div className="relative w-full max-w-[560px] mx-auto mt-14">
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
          <svg viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`} className="w-full h-full">
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

              const x1 = WHEEL_SIZE / 2 + r * Math.cos(((start - 90) * Math.PI) / 180);
              const y1 = WHEEL_SIZE / 2 + r * Math.sin(((start - 90) * Math.PI) / 180);
              const x2 = WHEEL_SIZE / 2 + r * Math.cos(((end - 90) * Math.PI) / 180);
              const y2 = WHEEL_SIZE / 2 + r * Math.sin(((end - 90) * Math.PI) / 180);

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
                      className="font-bold text-[16px]"
                      style={{ textShadow: "0 2px 10px rgba(0,0,0,0.55)" }}
                    >
                      {p.label}
                    </text>
                    <text
                      x={WHEEL_SIZE / 2}
                      y={130}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.85)"
                      className="text-[9px] tracking-widest"
                    >
                      {p.value}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* SPIN BUTTON */}
        {!showWin && (
          <button
            onClick={spin}
            disabled={isSpinning || isLimitReached}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-20 h-28 sm:w-24 sm:h-36
              bg-gradient-to-b from-[#ee1c25] to-[#7f1d1d]
              rounded-xl border-2 border-white/30
              shadow-xl flex flex-col items-center justify-center
              transition
              ${isSpinning ? "animate-vibrate" : "hover:scale-105 active:scale-95"}
              ${isLimitReached ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            <span className="text-[#f9df9d] text-4xl font-black drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
              福
            </span>
            <span className="text-[#f9df9d] text-xs tracking-widest font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
              SPIN
            </span>
          </button>
        )}
      </div>

      {/* CTA BUTTON (premium gold) */}
      {showWin && (
        <a
          href={CTA_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-8 block px-4"
        >
          <div className="ctaGoldWrap group w-full max-w-[520px] mx-auto">
            <div className="ctaGoldInner">
              <div className="ctaKicker">CONGRATULATIONS</div>

              <div className="ctaTitle">
                YOU WON <span className="ctaGoldText">100 FREE SPINS</span>
              </div>

              <div className="ctaSub">ON SLOT</div>

              <div className="ctaAction">
                TAP TO CLAIM NOW <span className="ctaArrow">→</span>
              </div>

              <div className="ctaShine" />
            </div>
          </div>
        </a>
      )}

      <style>{`
        @keyframes vibrate {
          0%,100% { transform: translate(-50%,-50%) rotate(0deg); }
          25% { transform: translate(calc(-50% + 1px), calc(-50% + 1px)) rotate(0.4deg); }
          75% { transform: translate(calc(-50% - 1px), calc(-50% - 1px)) rotate(-0.4deg); }
        }
        .animate-vibrate { animation: vibrate 0.18s linear infinite; }

        /* ===== Premium Gold CTA Button (your palette) ===== */
        .ctaGoldWrap{
          border-radius: 22px;
          padding: 2px;
          background: linear-gradient(90deg,#F9F295,#E0AA3E,#FAF398,#B88A44);
          box-shadow:
            0 18px 55px rgba(0,0,0,0.65),
            inset 0 1px 0 rgba(255,255,255,0.65);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .ctaGoldWrap:hover{
          transform: scale(1.015);
          box-shadow:
            0 22px 70px rgba(0,0,0,0.7),
            0 0 22px rgba(250,243,152,0.18),
            inset 0 1px 0 rgba(255,255,255,0.7);
        }
        .ctaGoldWrap:active{
          transform: scale(0.985);
        }
        .ctaGoldInner{
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          padding: 20px 18px 18px;
          text-align: center;
          background: radial-gradient(circle at top, rgba(70,12,12,0.95) 0%, rgba(18,0,0,0.95) 70%);
        }
        .ctaKicker{
          font-size: 11px;
          letter-spacing: .48em;
          font-weight: 800;
          color: rgba(255,255,255,0.68);
          margin-bottom: 10px;
          text-transform: uppercase;
        }
        .ctaTitle{
          font-size: 26px;
          line-height: 1.15;
          font-weight: 900;
          color: #fff;
          text-transform: uppercase;
        }
        .ctaGoldText{
          display: inline-block;
          background: linear-gradient(180deg,#ffffff 0%,#FFF7C8 20%,#FAF398 45%,#E0AA3E 70%,#B88A44 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow:
            0 0 18px rgba(250,243,152,0.25),
            0 8px 24px rgba(0,0,0,0.65);
        }
        .ctaSub{
          margin-top: 8px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .26em;
          color: rgba(250,243,152,0.95);
          text-transform: uppercase;
        }
        .ctaAction{
          margin-top: 14px;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .22em;
          color: rgba(255,255,255,0.9);
          text-transform: uppercase;
        }
        .ctaArrow{
          display: inline-block;
          transition: transform .25s ease;
        }
        .group:hover .ctaArrow{
          transform: translateX(6px);
        }
        .ctaShine{
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.32) 50%, transparent 80%);
          transform: translateX(-120%);
          animation: ctaShine 3.8s infinite;
          pointer-events: none;
        }
        @keyframes ctaShine{
          0%{ transform: translateX(-120%); }
          40%{ transform: translateX(120%); }
          100%{ transform: translateX(120%); }
        }

        @media (max-width: 420px){
          .ctaTitle{ font-size: 22px; }
        }
      `}</style>
    </div>
  );
};

export default FortuneWheel;
