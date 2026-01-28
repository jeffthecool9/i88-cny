import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

/** -----------------------------
 *  CONFIG (edit these only)
 *  ----------------------------- */
const MAX_SPINS = 1; // session limit
const FORCE_WIN_INDEX = 0; // set to undefined to allow random
const SPIN_SECONDS = 4.0; // duration feel
const CTA_URL =
  "https://dyna.mb8-offer3.com/my?dv=mb8worldclassbonus&culture=en";

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
  { id: "p3", label: "i88 FORTUNE", value: "PROSPERITY", color: "#8f0d0d" },
  { id: "p4", label: "i88 REWARD", value: "MYSTERY PRIZE", color: "#b91c1c" },
  { id: "p5", label: "i88 BONUS", value: "LUCKY DRAW", color: "#a30f0f" },
];

const WHEEL_SIZE = 520; // SVG viewBox size
const OUTER_BORDER_WIDTH = 28;

/** -----------------------------
 *  Helpers
 *  ----------------------------- */
const clampIndex = (n: number, len: number) => {
  const x = Math.floor(n);
  if (len <= 0) return 0;
  return ((x % len) + len) % len;
};

/** -----------------------------
 *  Pointer (simple premium badge)
 *  ----------------------------- */
const SimplePointer: React.FC = () => {
  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20">
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="ptrGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#f9df9d" />
            <stop offset="60%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#8a6d3b" />
          </linearGradient>
          <filter id="ptrShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
            <feOffset dx="0" dy="5" result="off" />
            <feFlood floodColor="#000" floodOpacity="0.55" result="col" />
            <feComposite in="col" in2="off" operator="in" result="shadow" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#ptrShadow)">
          {/* shield */}
          <path
            d="M60 110 L86 84 L86 36 Q86 16 60 16 Q34 16 34 36 L34 84 Z"
            fill="url(#ptrGold)"
            stroke="#5c4a22"
            strokeWidth="1.5"
          />
          {/* tip */}
          <path
            d="M60 112 L72 88 L60 96 L48 88 Z"
            fill="#8a6d3b"
            opacity="0.95"
          />
          {/* jewel */}
          <circle cx="60" cy="52" r="5" fill="#ee1c25" />
        </g>
      </svg>
    </div>
  );
};

/** -----------------------------
 *  Confetti (lightweight, optional)
 *  ----------------------------- */
const Confetti: React.FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-40">
      {Array.from({ length: 26 }).map((_, i) => (
        <span
          key={i}
          className="absolute w-2 h-3 rounded-sm opacity-90"
          style={{
            left: `${(i * 7) % 100}%`,
            top: `-10%`,
            background:
              i % 3 === 0 ? "#f9df9d" : i % 3 === 1 ? "#ee1c25" : "#ffffff",
            animation: `confettiFall ${2.8 + (i % 7) * 0.18}s linear ${
              (i % 8) * 0.12
            }s forwards`,
            transform: `rotate(${(i * 21) % 180}deg)`,
          }}
        />
      ))}
    </div>
  );
};

/** -----------------------------
 *  FortuneWheel (self-contained)
 *  ----------------------------- */
function FortuneWheel(props: {
  isSpinning: boolean;
  isLimitReached: boolean;
  onSpinRequest: () => void;
  onComplete: (label: string) => void;
  forceWinIndex?: number;
}) {
  const { isSpinning, isLimitReached, onSpinRequest, onComplete, forceWinIndex } =
    props;

  const wheelRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const [rotation, setRotation] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const doneRef = useRef(false);

  const segments = PRIZES.length;
  const anglePerSegment = 360 / segments;

  const targetIndex = useMemo(() => {
    if (forceWinIndex === undefined) return undefined;
    return clampIndex(forceWinIndex, segments);
  }, [forceWinIndex, segments]);

  useEffect(() => {
    if (!isSpinning || !wheelRef.current) {
      if (!isSpinning && !doneRef.current) setShowCelebration(false);
      return;
    }

    const el = wheelRef.current;
    doneRef.current = false;
    setShowCelebration(false);

    const winIndex =
      targetIndex !== undefined
        ? targetIndex
        : Math.floor(Math.random() * segments);

    // Align center of segment to pointer at top
    const extraRotations = 8;
    const segmentOffset = anglePerSegment / 2;
    const targetAngle = 360 - winIndex * anglePerSegment - segmentOffset;

    const current = rotationRef.current % 360;
    const delta = (targetAngle - current + 360) % 360;
    const finalRotation = rotationRef.current + extraRotations * 360 + delta;

    rotationRef.current = finalRotation;
    setRotation(finalRotation);

    const onEnd = (e: TransitionEvent) => {
      if (e.target !== el) return;
      if (e.propertyName !== "transform") return;
      if (doneRef.current) return;
      doneRef.current = true;

      setShowCelebration(true);
      el.removeEventListener("transitionend", onEnd);
      onComplete(PRIZES[winIndex].label);
    };

    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, [isSpinning, anglePerSegment, segments, onComplete, targetIndex]);

  return (
    <div className="relative w-full max-w-[min(92vw,560px)] aspect-square mx-auto">
      <div
        className={`absolute -top-[6%] left-1/2 -translate-x-1/2 z-50 drop-shadow-[0_10px_20px_rgba(0,0,0,0.55)] transition-transform duration-500 origin-bottom ${
          !isSpinning && !isLimitReached ? "hover:scale-110" : ""
        }`}
      >
        <SimplePointer />
      </div>

      <Confetti show={showCelebration} />

      <div
        ref={wheelRef}
        className="w-full h-full relative"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning
            ? `transform ${SPIN_SECONDS}s cubic-bezier(0.15, 0, 0.15, 1)`
            : "none",
        }}
      >
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_120px_rgba(255,255,255,0.14)] z-20 pointer-events-none border-[3px] border-white/10" />

        <svg viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`} className="w-full h-full">
          <defs>
            <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="20%" stopColor="#fffacd" />
              <stop offset="50%" stopColor="#f9df9d" />
              <stop offset="80%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#433010" />
            </linearGradient>

            <radialGradient id="redLacquer" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff4d4d" />
              <stop offset="70%" stopColor="#ee1c25" />
              <stop offset="100%" stopColor="#450a0a" />
            </radialGradient>

            <filter id="rimSpecular">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
              <feSpecularLighting
                in="blur"
                surfaceScale="5"
                specularConstant="1"
                specularExponent="30"
                lightingColor="#ffffff"
                result="spec"
              >
                <fePointLight x="300" y="-100" z="400" />
              </feSpecularLighting>
              <feComposite in="spec" in2="SourceAlpha" operator="in" result="specular" />
              <feComposite
                in="SourceGraphic"
                in2="specular"
                operator="arithmetic"
                k1="0"
                k2="1"
                k3="1"
                k4="0"
              />
            </filter>
          </defs>

          <circle
            cx={WHEEL_SIZE / 2}
            cy={WHEEL_SIZE / 2}
            r={WHEEL_SIZE / 2 - 5}
            fill="url(#redLacquer)"
          />

          {/* segments */}
          <g>
            {PRIZES.map((prize, i) => {
              const startAngle = i * anglePerSegment;
              const endAngle = (i + 1) * anglePerSegment;
              const outerR = WHEEL_SIZE / 2 - OUTER_BORDER_WIDTH;

              const x1 =
                WHEEL_SIZE / 2 +
                outerR * Math.cos(((startAngle - 90) * Math.PI) / 180);
              const y1 =
                WHEEL_SIZE / 2 +
                outerR * Math.sin(((startAngle - 90) * Math.PI) / 180);
              const x2 =
                WHEEL_SIZE / 2 +
                outerR * Math.cos(((endAngle - 90) * Math.PI) / 180);
              const y2 =
                WHEEL_SIZE / 2 +
                outerR * Math.sin(((endAngle - 90) * Math.PI) / 180);

              const d = `M ${WHEEL_SIZE / 2} ${WHEEL_SIZE / 2} L ${x1} ${y1} A ${outerR} ${outerR} 0 0 1 ${x2} ${y2} Z`;

              return (
                <g key={prize.id}>
                  <path d={d} fill={prize.color} opacity={0.98} />
                  <line
                    x1={WHEEL_SIZE / 2}
                    y1={WHEEL_SIZE / 2}
                    x2={x1}
                    y2={y1}
                    stroke="rgba(255,255,255,0.14)"
                    strokeWidth="1"
                  />

                  {/* label */}
                  <g
                    transform={`rotate(${startAngle + anglePerSegment / 2}, ${
                      WHEEL_SIZE / 2
                    }, ${WHEEL_SIZE / 2})`}
                  >
                    <text
                      x={WHEEL_SIZE / 2}
                      y={110}
                      textAnchor="middle"
                      fill="#fffacd"
                      fontFamily="Cinzel, serif"
                      fontWeight="800"
                      fontSize="18"
                      style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
                    >
                      {prize.label}
                    </text>
                    <text
                      x={WHEEL_SIZE / 2}
                      y={132}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.82)"
                      fontFamily="Montserrat, system-ui, sans-serif"
                      fontWeight="800"
                      fontSize="10"
                      letterSpacing="2"
                    >
                      {prize.value}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>

          {/* rim */}
          <g filter="url(#rimSpecular)">
            <circle
              cx={WHEEL_SIZE / 2}
              cy={WHEEL_SIZE / 2}
              r={WHEEL_SIZE / 2 - OUTER_BORDER_WIDTH / 2}
              fill="none"
              stroke="url(#goldMetallic)"
              strokeWidth={OUTER_BORDER_WIDTH}
            />
            <circle
              cx={WHEEL_SIZE / 2}
              cy={WHEEL_SIZE / 2}
              r={WHEEL_SIZE / 2 - OUTER_BORDER_WIDTH}
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1"
            />
          </g>
        </svg>
      </div>

      {/* Center Angpow Button */}
      <button
        onClick={onSpinRequest}
        disabled={isSpinning || isLimitReached}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          w-24 h-36 sm:w-36 sm:h-52 z-50 focus:outline-none transition-transform duration-500
          ${isSpinning ? "animate-vibrate" : "hover:scale-105 active:scale-95"}
          ${isLimitReached ? "opacity-60 cursor-not-allowed grayscale" : ""}`}
      >
        <div
          className="w-full h-full rounded-xl shadow-[0_15px_50px_rgba(0,0,0,0.72),_inset_0_2px_15px_rgba(255,255,255,0.35)]
          border-2 border-white/25 relative overflow-hidden flex flex-col items-center justify-center"
          style={{
            background:
              "linear-gradient(180deg, #ee1c25 0%, #ee1c25 35%, #7f1d1d 100%)",
          }}
        >
          <div className="absolute top-0 w-full h-10 sm:h-14 bg-[#c41212] rounded-b-[22px] border-b border-white/15 shadow-[0_6px_14px_rgba(0,0,0,0.35)]" />
          <div className="relative z-10 text-center mt-3 sm:mt-6 px-2">
            <div className="text-[#f9df9d] font-black text-4xl sm:text-5xl leading-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]">
              福
            </div>
            <div className="mt-1 text-[#f9df9d] font-black tracking-[0.35em] text-[10px] sm:text-sm">
              {isLimitReached && !isSpinning ? "YOU WON" : "SPIN"}
            </div>
          </div>

          {/* shine sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] animate-shimmer-slow pointer-events-none" />
        </div>

        {!isSpinning && !isLimitReached && (
          <div className="absolute inset-[-12px] sm:inset-[-15px] rounded-2xl border-2 border-[#ee1c25]/40 animate-ping pointer-events-none" />
        )}
      </button>

      <style>{`
        @keyframes vibrate {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          25% { transform: translate(calc(-50% + 1px), calc(-50% + 1px)) rotate(0.4deg); }
          75% { transform: translate(calc(-50% - 1px), calc(-50% - 1px)) rotate(-0.4deg); }
        }
        .animate-vibrate { animation: vibrate 0.25s linear infinite; }

        @keyframes shimmer-slow {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(250%) skewX(-20deg); }
        }
        .animate-shimmer-slow {
          animation: shimmer-slow 3.6s ease-in-out infinite;
        }

        @keyframes confettiFall {
          0%   { transform: translateY(-10%) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          100% { transform: translateY(120vh) rotate(220deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/** -----------------------------
 *  WheelSection (handles states + win UI)
 *  ----------------------------- */
export default function CNYWheelSection() {
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [spinsUsed, setSpinsUsed] = useState(0);

  const isLimitReached = spinsUsed >= MAX_SPINS && !spinning;

  const handleSpinRequest = useCallback(() => {
    if (spinning || spinsUsed >= MAX_SPINS) return;
    setWinner(null);
    setSpinning(true);
    setSpinsUsed((p) => p + 1);
  }, [spinning, spinsUsed]);

  const handleComplete = useCallback((label: string) => {
    setSpinning(false);
    setWinner(label);
  }, []);

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 py-10 sm:py-14">
      {/* headline (optional) */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="text-[10px] sm:text-xs tracking-[0.45em] uppercase text-[#f9df9d]/70 font-bold">
          VIP i88 • LUNAR FORTUNE
        </div>
        <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-[0.08em] text-[#f9df9d] drop-shadow-[0_12px_40px_rgba(0,0,0,0.65)]">
          RM50 UNLOCKS INSTANT CNY REWARDS
        </h2>
        <p className="mt-3 text-white/80 max-w-2xl mx-auto">
          Deposit RM50 / SGD50 and spin immediately to claim your reward. 🧧✨
        </p>
      </div>

      {/* wheel */}
      <div className="relative flex items-center justify-center">
        <FortuneWheel
          isSpinning={spinning}
          isLimitReached={isLimitReached}
          onSpinRequest={handleSpinRequest}
          onComplete={handleComplete}
          forceWinIndex={FORCE_WIN_INDEX}
        />
      </div>

      {/* status */}
      <div className="mt-8 text-center">
        {isLimitReached && !winner ? (
          <>
            <div className="text-[#d4af37] tracking-[0.35em] font-black">
              SESSION LIMIT REACHED
            </div>
            <div className="text-[#f9df9d]/60 text-xs tracking-widest uppercase mt-2">
              ONE FORTUNE PER DESCENDANT
            </div>
          </>
        ) : (
          <div className="text-[#f9df9d] tracking-[0.45em] font-bold animate-pulse">
            {spinning ? "DIVINING PROSPERITY..." : "CLICK THE RED ANGPOW TO SPIN"}
          </div>
        )}
      </div>

      {/* win modal */}
      <div
        className={`mt-10 flex flex-col items-center gap-6 transition-all duration-700 ${
          winner ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        <div className="bg-gradient-to-b from-[#b91c1c] to-[#7f1d1d] border-2 border-[#f9df9d]/50 px-10 py-6 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.85)] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#f9df9d] to-transparent" />
          <div className="text-[#f9df9d] text-4xl font-black tracking-[0.22em] drop-shadow-lg">
            HUAT AH!
          </div>
          <div className="mt-2 text-white font-black tracking-widest uppercase">
            YOU WON {winner}
          </div>
        </div>

        <a
          href={CTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative px-14 py-4 tracking-[0.35em] font-black text-lg sm:text-2xl overflow-hidden transition-all duration-500 rounded-full bg-gradient-to-r from-[#f9df9d] via-[#d4af37] to-[#8a6d3b] hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] hover:scale-110 active:scale-95 text-[#2d0a0a] shadow-2xl"
        >
          DEPOSIT AND CLAIM NOW
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out" />
        </a>
      </div>
    </section>
  );
}
