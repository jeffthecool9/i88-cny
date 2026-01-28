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
          <stop offset="0%" stopColor="#fff" />
          <stop offset="40%" stopColor="#f9df9d" />
          <stop offset="100%" stopColor="#d4af37" />
        </linearGradient>
      </defs>
      <path
        d="M60 10 L90 55 L60 110 L30 55 Z"
        fill="url(#ptrGold)"
        stroke="#3b2a10"
        strokeWidth="2"
      />
      <circle cx="60" cy="42" r="6" fill="#ee1c25" />
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

  const forcedWinIndex = useMemo(
    () => PRIZES.findIndex(p => p.label === "100 FREE SPINS"),
    []
  );

  const spin = () => {
    if (isSpinning || isLimitReached) return;

    setIsSpinning(true);
    setShowWin(false);
    finishedRef.current = false;

    const segmentOffset = anglePerSegment / 2;
    const targetAngle =
      360 - forcedWinIndex * anglePerSegment - segmentOffset;

    const current = rotationRef.current % 360;
    const delta = (targetAngle - current + 360) % 360;

    const finalRotation =
      rotationRef.current + 8 * 360 + delta;

    rotationRef.current = finalRotation;
    setRotation(finalRotation);
  };

  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;

    const onEnd = (e: TransitionEvent) => {
      if (e.target !== el || finishedRef.current) return;
      finishedRef.current = true;
      setIsSpinning(false);
      setSpinsUsed(v => v + 1);
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

              const x1 = WHEEL_SIZE / 2 + r * Math.cos((start - 90) * Math.PI / 180);
              const y1 = WHEEL_SIZE / 2 + r * Math.sin((start - 90) * Math.PI / 180);
              const x2 = WHEEL_SIZE / 2 + r * Math.cos((end - 90) * Math.PI / 180);
              const y2 = WHEEL_SIZE / 2 + r * Math.sin((end - 90) * Math.PI / 180);

              const d = `M ${WHEEL_SIZE / 2} ${WHEEL_SIZE / 2}
                         L ${x1} ${y1}
                         A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;

              return (
                <g key={p.id}>
                  <path d={d} fill={p.color} />
                  <g transform={`rotate(${start + anglePerSegment / 2}, ${WHEEL_SIZE / 2}, ${WHEEL_SIZE / 2})`}>
                    <text
                      x={WHEEL_SIZE / 2}
                      y={110}
                      textAnchor="middle"
                      fill="#fffacd"
                      className="font-bold text-[16px]"
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
            disabled={isSpinning}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       w-20 h-28 sm:w-24 sm:h-36
                       bg-gradient-to-b from-[#ee1c25] to-[#7f1d1d]
                       rounded-xl border-2 border-white/30
                       shadow-xl flex flex-col items-center justify-center
                       hover:scale-105 active:scale-95 transition"
          >
            <span className="text-[#f9df9d] text-4xl font-black">福</span>
            <span className="text-[#f9df9d] text-xs tracking-widest font-bold">
              SPIN
            </span>
          </button>
        )}
      </div>

      {/* CTA */}
      {showWin && (
        <a
          href={CTA_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-8 block text-center px-6 py-5 rounded-2xl
                     bg-gradient-to-b from-[#3a0b0b] to-[#120000]
                     shadow-[0_25px_80px_rgba(0,0,0,0.7)]
                     hover:scale-[1.02] transition"
        >
          <div className="text-[11px] tracking-[0.5em] text-[#f9df9d]/70 font-bold mb-2">
            CONGRATULATIONS
          </div>

          <div
            className="text-2xl sm:text-3xl font-black goldWinText leading-tight"
          >
            YOU WON 100 FREE SPINS
            <div className="text-lg sm:text-xl mt-1">ON SLOT</div>
          </div>

          <div className="mt-4 text-xs tracking-[0.3em] text-white/80 font-bold">
            TAP TO CLAIM NOW →
          </div>
        </a>
      )}

      <style>{`
        .goldWinText{
          background: linear-gradient(180deg,#fff,#fde68a,#fbbf24,#d4af37);
          -webkit-background-clip:text;
          background-clip:text;
          color:transparent;
          text-shadow:0 0 18px rgba(253,224,71,0.45),0 10px 30px rgba(0,0,0,0.7);
        }
      `}</style>
    </div>
  );
};

export default FortuneWheel;
