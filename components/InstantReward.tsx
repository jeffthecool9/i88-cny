import React, { useEffect, useMemo, useRef, useState } from "react";

/** -----------------------------
 *  CONFIG (EDIT THESE ONLY)
 *  ----------------------------- */
const MAX_SPINS = 1; // session limit
const SPIN_SECONDS = 4.0; // spin duration feel

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

const WHEEL_SIZE = 520; // SVG viewBox size
const OUTER_BORDER_WIDTH = 28;

/** -----------------------------
 *  MINI POINTER (TOP)
 *  ----------------------------- */
function SimplePointer() {
  return (
    <div className="relative w-14 h-14 sm:w-16 sm:h-16">
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="ptrGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#f9df9d" />
            <stop offset="70%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#6a4f1a" />
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
          <circle cx="60" cy="44" r="6" fill="#ee1c25" opacity="0.95" />
        </g>
      </svg>
    </div>
  );
}

/** -----------------------------
 *  MAIN COMPONENT
 *  ----------------------------- */
const FortuneWheel: React.FC = () => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const finishedRef = useRef(false);

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [showAngpowWin, setShowAngpowWin] = useState(false);
  const [spinsUsed, setSpinsUsed] = useState(0);

  const segments = PRIZES.length;
  const anglePerSegment = 360 / segments;

  const isLimitReached = spinsUsed >= MAX_SPINS;

  // ✅ Always force to 100 FREE SPINS
  const forcedWinIndex = useMemo(() => {
    const idx = PRIZES.findIndex((p) => p.label.trim().toUpperCase() === "100 FREE SPINS");
    return idx >= 0 ? idx : 0;
  }, []);

  const winner = winnerIndex !== null ? PRIZES[winnerIndex] : null;

  /** Spin logic */
  const spin = () => {
    if (isSpinning) return;
    if (isLimitReached) return;

    // hide winner UI while spinning
    setShowAngpowWin(false);
    setWinnerIndex(null);
    setIsSpinning(true);
    finishedRef.current = false;

    const targetIndex = forcedWinIndex;

    // aim center of the target slice under the pointer
    const segmentOffset = anglePerSegment / 2;
    const targetAngle = 360 - targetIndex * anglePerSegment - segmentOffset;

    const currentRotation = rotationRef.current % 360;
    const delta = (targetAngle - currentRotation + 360) % 360;

    const extraRotations = 8;
    const finalRotation = rotationRef.current + extraRotations * 360 + delta;

    rotationRef.current = finalRotation;
    setRotation(finalRotation);
    setWinnerIndex(targetIndex);
  };

  /** Transition end -> show YOU WON + congratulations message */
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

      // show winner angpow + congrats only after stop
      setShowAngpowWin(true);
    };

    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, []);

  return (
    <div className="relative w-full max-w-[min(92vw,560px)] mx-auto">
      {/* ✅ push the whole wheel LOWER */}
      <div className="relative mt-10 sm:mt-14 md:mt-16">
        {/* Pointer */}
        <div className="absolute -top-[6%] left-1/2 -translate-x-1/2 z-50 drop-shadow-[0_10px_20px_rgba(0,0,0,0.55)]">
          <SimplePointer />
        </div>

        {/* Wheel */}
        <div className="relative w-full aspect-square flex items-center justify-center">
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
            {/* gloss */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_120px_rgba(255,255,255,0.15)] z-20 pointer-events-none border-[2px] sm:border-[4px] border-white/10" />

            <svg viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`} className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="20%" stopColor="#fffacd" />
                  <stop offset="50%" stopColor="#f9df9d" />
                  <stop offset="80%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#433010" />
                </linearGradient>

                <pattern id="scalePattern" x="0" y="0" width="20" height="12" patternUnits="userSpaceOnUse">
                  <path d="M0 12 Q5 0 10 12 Q15 0 20 12" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="0.5" />
                  <path
                    d="M0 6 Q5 -6 10 6 Q15 -6 20 6"
                    fill="none"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="0.35"
                    transform="translate(0, 3)"
                  />
                </pattern>

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
                  <feComposite in="SourceGraphic" in2="specular" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
                </filter>
              </defs>

              <circle cx={WHEEL_SIZE / 2} cy={WHEEL_SIZE / 2} r={WHEEL_SIZE / 2 - 5} fill="url(#redLacquer)" />

              <g>
                {PRIZES.map((prize, i) => {
                  const startAngle = i * anglePerSegment;
                  const endAngle = (i + 1) * anglePerSegment;
                  const outerR = WHEEL_SIZE / 2 - OUTER_BORDER_WIDTH;

                  const x1 = WHEEL_SIZE / 2 + outerR * Math.cos(((startAngle - 90) * Math.PI) / 180);
                  const y1 = WHEEL_SIZE / 2 + outerR * Math.sin(((startAngle - 90) * Math.PI) / 180);
                  const x2 = WHEEL_SIZE / 2 + outerR * Math.cos(((endAngle - 90) * Math.PI) / 180);
                  const y2 = WHEEL_SIZE / 2 + outerR * Math.sin(((endAngle - 90) * Math.PI) / 180);

                  const d = `M ${WHEEL_SIZE / 2} ${WHEEL_SIZE / 2} L ${x1} ${y1} A ${outerR} ${outerR} 0 0 1 ${x2} ${y2} Z`;

                  return (
                    <g key={prize.id}>
                      <path d={d} fill={prize.color} opacity={1} />
                      <line
                        x1={WHEEL_SIZE / 2}
                        y1={WHEEL_SIZE / 2}
                        x2={x1}
                        y2={y1}
                        stroke="rgba(255, 255, 255, 0.12)"
                        strokeWidth="1"
                      />

                      <g transform={`rotate(${startAngle + anglePerSegment / 2}, ${WHEEL_SIZE / 2}, ${WHEEL_SIZE / 2})`}>
                        <text
                          x={WHEEL_SIZE / 2}
                          y={105}
                          textAnchor="middle"
                          fill="#fffacd"
                          className="cinzel font-bold text-[16px] sm:text-[18px] tracking-wider pointer-events-none"
                          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
                        >
                          {prize.label}
                        </text>
                        <text
                          x={WHEEL_SIZE / 2}
                          y={125}
                          textAnchor="middle"
                          fill="rgba(255,255,255,0.82)"
                          className="montserrat font-bold text-[8px] sm:text-[9px] tracking-[0.2em] pointer-events-none uppercase"
                        >
                          {prize.value}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </g>

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
                  r={WHEEL_SIZE / 2 - OUTER_BORDER_WIDTH / 2}
                  fill="none"
                  stroke="url(#scalePattern)"
                  strokeWidth={OUTER_BORDER_WIDTH}
                  opacity="0.35"
                />
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
              </g>
            </svg>
          </div>

          {/* SPIN angpow - only before win overlay */}
          <button
            onClick={spin}
            disabled={isSpinning || isLimitReached}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[46%]
              w-20 h-28 xs:w-24 xs:h-34 sm:w-28 sm:h-40
              z-40 focus:outline-none transition-transform duration-500
              ${isSpinning ? "animate-vibrate" : "hover:scale-105 active:scale-95"}
              ${isLimitReached ? "opacity-70 cursor-not-allowed" : ""}`}
            style={{
              opacity: showAngpowWin ? 0 : 1,
              pointerEvents: showAngpowWin ? "none" : "auto",
              transition: "opacity 220ms ease",
            }}
          >
            <div className="w-full h-full bg-gradient-to-b from-[#ee1c25] via-[#ee1c25] to-[#7f1d1d] rounded-lg sm:rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.55),_inset_0_2px_12px_rgba(255,255,255,0.35)] border-2 border-white/30 relative flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute top-0 w-full bg-[#c41212] rounded-b-[18px] sm:rounded-b-[22px] border-b border-white/20 h-7 sm:h-10 z-20" />
              <div className="z-30 flex flex-col items-center justify-center mt-2 sm:mt-4 px-2 text-center">
                <span className="cinzel text-[#f9df9d] text-3xl xs:text-4xl sm:text-5xl font-black mb-1 drop-shadow-[0_2px_5px_rgba(0,0,0,0.45)]">
                  福
                </span>
                <span className="montserrat text-[#f9df9d] font-black tracking-widest uppercase text-[9px] xs:text-[10px] sm:text-sm leading-tight drop-shadow-md">
                  SPIN
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] animate-shimmer-slow pointer-events-none" />
            </div>
          </button>

          {/* YOU WON angpow - only after stop */}
          {showAngpowWin && winner && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[46%] z-40">
              <div className="w-24 h-36 xs:w-28 xs:h-40 sm:w-32 sm:h-48 bg-gradient-to-b from-[#ee1c25] via-[#ee1c25] to-[#7f1d1d] rounded-lg sm:rounded-xl shadow-[0_15px_50px_rgba(0,0,0,0.7),_inset_0_2px_15px_rgba(255,255,255,0.4)] border-2 border-white/30 relative flex flex-col items-center justify-center overflow-hidden animate-popIn">
                <div className="absolute top-0 w-full bg-[#c41212] rounded-b-[18px] sm:rounded-b-[22px] border-b border-white/20 h-8 sm:h-12 z-20" />
                <div className="z-30 flex flex-col items-center justify-center mt-2 sm:mt-5 px-2 text-center">
                  <span className="cinzel text-[#f9df9d] text-4xl sm:text-5xl font-black mb-1 drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
                    福
                  </span>
                  <span className="montserrat text-[#f9df9d] font-black tracking-widest uppercase text-[10px] sm:text-sm leading-tight drop-shadow-md">
                    YOU WON
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent animate-shimmer-fast pointer-events-none" />
              </div>
            </div>
          )}
        </div>

        {/* ✅ Congratulations message (only after stop) */}
        {showAngpowWin && (
        <div className="mt-7 text-center px-4">
  <div className="winKicker">CONGRATULATIONS</div>

  <div className="winHeadline">
    <span className="winGold">YOU WON 100 FREE SPINS</span>
    <span className="winGoldSub">ON SLOT</span>
  </div>

  <div className="mt-4 cinzel text-[10px] sm:text-xs tracking-[0.45em] uppercase text-[#f9df9d]/70 font-bold">
    {isLimitReached ? "LIMIT REACHED" : "CLICK THE RED ANGPOW"}
  </div>
          </div>
        )}

        {/* If not won yet, show the normal helper line */}
        {!showAngpowWin && (
          <div className="mt-6 text-center">
            <p className="cinzel text-[10px] sm:text-xs tracking-[0.45em] uppercase text-[#f9df9d]/70 font-bold">
              {isLimitReached ? "LIMIT REACHED" : "CLICK THE RED ANGPOW"}
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes vibrate {
          0%, 100% { transform: translate(-50%, -46%) rotate(0deg); }
          25% { transform: translate(calc(-50% + 1px), calc(-46% + 1px)) rotate(0.4deg); }
          75% { transform: translate(calc(-50% - 1px), calc(-46% - 1px)) rotate(-0.4deg); }
        }
        .animate-vibrate { animation: vibrate 0.18s linear infinite; }

        @keyframes shimmer-fast {
          0% { transform: translateY(120%); }
          100% { transform: translateY(-120%); }
        }
        @keyframes shimmer-slow {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(250%) skewX(-20deg); }
        }
        .animate-shimmer-fast { animation: shimmer-fast 1.2s ease-in-out infinite; }
        .animate-shimmer-slow { animation: shimmer-slow 3.6s ease-in-out infinite; }

        @keyframes popIn {
          from { opacity: 0; transform: translateY(10px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-popIn { animation: popIn 420ms cubic-bezier(0.2, 1, 0.3, 1) both; }

        /* ✅ bright gold win text */
        .goldWinText {
          background: linear-gradient(180deg, #ffffff 0%, #fff3b0 18%, #fde68a 38%, #fbbf24 62%, #d4af37 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow:
            0 0 14px rgba(253, 224, 71, 0.32),
            0 8px 24px rgba(0, 0, 0, 0.55);
        }
      `}</style>
    </div>
  );
};

export default FortuneWheel;
