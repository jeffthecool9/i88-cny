import React, { useRef, useState, useEffect } from "react";

/** -------------------------------
 *  CONFIG (edit these only)
 *  ------------------------------- */
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
const OUTER_BORDER_WIDTH = 28; // premium rim thickness

/** -------------------------------
 *  SimplePointer (inline, no deps)
 *  ------------------------------- */
const SimplePointer: React.FC = () => {
  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="ptrGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#f9df9d" />
            <stop offset="60%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#6b4f1d" />
          </linearGradient>
          <filter id="ptrShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="b" />
            <feOffset dx="0" dy="4" result="o" />
            <feFlood floodColor="black" floodOpacity="0.45" result="c" />
            <feComposite in="c" in2="o" operator="in" result="s" />
            <feMerge>
              <feMergeNode in="s" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#ptrShadow)">
          {/* top badge */}
          <path
            d="M50 6 L74 22 L50 52 L26 22 Z"
            fill="url(#ptrGold)"
            stroke="rgba(0,0,0,0.25)"
            strokeWidth="1"
          />
          {/* tip */}
          <path
            d="M50 50 L58 28 L42 28 Z"
            fill="rgba(0,0,0,0.15)"
            transform="translate(0, 18)"
          />
          {/* jewel */}
          <circle cx="50" cy="26" r="4.2" fill="#ee1c25" />
        </g>
      </svg>
    </div>
  );
};

/** -------------------------------
 *  FortuneWheel
 *  ------------------------------- */
interface FortuneWheelProps {
  isSpinning: boolean;
  onComplete: (label: string) => void;
  onSpinRequest: () => void;
  forceWinIndex?: number;
  isLimitReached?: boolean;
}

const FortuneWheel: React.FC<FortuneWheelProps> = ({
  isSpinning,
  onComplete,
  onSpinRequest,
  forceWinIndex,
  isLimitReached,
}) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const [rotation, setRotation] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const hasCompletedRef = useRef(false);

  const segments = PRIZES.length;
  const anglePerSegment = 360 / segments;
  const targetIndex = forceWinIndex !== undefined && forceWinIndex >= 0 ? forceWinIndex : 0;

  useEffect(() => {
    if (!isSpinning || !wheelRef.current) {
      if (!isSpinning && !hasCompletedRef.current) setShowCelebration(false);
      return;
    }

    const el = wheelRef.current;
    hasCompletedRef.current = false;
    setShowCelebration(false);

    const extraRotations = 8;
    const segmentOffset = anglePerSegment / 2;
    const targetAngle = 360 - targetIndex * anglePerSegment - segmentOffset;

    const currentRotation = rotationRef.current % 360;
    const delta = (targetAngle - currentRotation + 360) % 360;
    const finalRotation = rotationRef.current + extraRotations * 360 + delta;

    rotationRef.current = finalRotation;
    setRotation(finalRotation);

    const handleTransitionEnd = (e: TransitionEvent) => {
      if (e.target !== el) return;
      if (e.propertyName !== "transform") return;
      if (hasCompletedRef.current) return;

      hasCompletedRef.current = true;
      setShowCelebration(true);
      el.removeEventListener("transitionend", handleTransitionEnd);
      onComplete(PRIZES[targetIndex].label);
    };

    el.addEventListener("transitionend", handleTransitionEnd);
    return () => el.removeEventListener("transitionend", handleTransitionEnd);
  }, [isSpinning, targetIndex, anglePerSegment, onComplete]);

  return (
    <div className="relative w-full max-w-[min(92vw,550px)] aspect-square flex items-center justify-center mx-auto">
      <div
        className={`relative w-full h-full group transition-transform duration-700 ease-out ${
          !isSpinning && !isLimitReached ? "hover:scale-[1.02]" : ""
        }`}
      >
        {/* Pointer */}
        <div
          className={`absolute -top-[5%] left-1/2 -translate-x-1/2 z-50
          filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]
          transition-all duration-500 origin-bottom
          ${!isSpinning && !isLimitReached ? "group-hover:scale-110 group-hover:drop-shadow-[0_0_25px_rgba(249,223,157,0.65)]" : ""}`}
        >
          <SimplePointer />
        </div>

        {/* Rotating Wheel */}
        <div
          ref={wheelRef}
          className="w-full h-full relative"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? "transform 4s cubic-bezier(0.15, 0, 0.15, 1)" : "none",
          }}
        >
          {/* Gloss Overlay */}
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
                <path
                  d="M0 12 Q5 0 10 12 Q15 0 20 12"
                  fill="none"
                  stroke="rgba(0,0,0,0.35)"
                  strokeWidth="0.55"
                />
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

              <filter id="ultraBloom" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="15" result="blur" />
                <feFlood floodColor="#ee1c25" floodOpacity="0.8" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

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

            {/* Main Wheel Face */}
            <circle cx={WHEEL_SIZE / 2} cy={WHEEL_SIZE / 2} r={WHEEL_SIZE / 2 - 5} fill="url(#redLacquer)" />

            {/* Segments */}
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
                const isWinner = showCelebration && i === targetIndex;

                return (
                  <g key={prize.id} className={isWinner ? "animate-prize-highlight" : ""}>
                    <path
                      d={d}
                      fill={prize.color}
                      className="transition-all duration-300 opacity-100"
                      style={{ filter: isWinner ? "url(#ultraBloom)" : "none" }}
                    />
                    <line
                      x1={WHEEL_SIZE / 2}
                      y1={WHEEL_SIZE / 2}
                      x2={x1}
                      y2={y1}
                      stroke="rgba(255, 255, 255, 0.15)"
                      strokeWidth="1"
                    />

                    {/* ✅ TEXT MOVED OUTWARD: y=105 -> 95, y=125 -> 118 */}
                    <g transform={`rotate(${startAngle + anglePerSegment / 2}, ${WHEEL_SIZE / 2}, ${WHEEL_SIZE / 2})`}>
                      <text
                        x={WHEEL_SIZE / 2}
                        y={95}
                        textAnchor="middle"
                        fill={isWinner ? "#fff" : "#fffacd"}
                        className="cinzel font-bold text-[16px] sm:text-[18px] tracking-wider pointer-events-none transition-all duration-300"
                        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
                      >
                        {prize.label}
                      </text>
                      <text
                        x={WHEEL_SIZE / 2}
                        y={118}
                        textAnchor="middle"
                        fill={isWinner ? "#fff" : "rgba(255, 255, 255, 0.8)"}
                        className="montserrat font-bold text-[8px] sm:text-[9px] tracking-[0.2em] pointer-events-none uppercase"
                      >
                        {prize.value}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>

            {/* Premium Rim */}
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
                opacity="0.4"
                className="mix-blend-multiply"
              />

              <circle
                cx={WHEEL_SIZE / 2}
                cy={WHEEL_SIZE / 2}
                r={WHEEL_SIZE / 2 - OUTER_BORDER_WIDTH}
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
              />
              <circle
                cx={WHEEL_SIZE / 2}
                cy={WHEEL_SIZE / 2}
                r={WHEEL_SIZE / 2}
                fill="none"
                stroke="rgba(0,0,0,0.2)"
                strokeWidth="2"
              />
            </g>
          </svg>
        </div>

        {/* ✅ ANGPOW HUB BUTTON (SMALLER + LIFTED + LESS SHADOW) */}
        <button
          onClick={onSpinRequest}
          disabled={isSpinning || isLimitReached}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[46%]
            w-20 h-28 xs:w-24 xs:h-34 sm:w-28 sm:h-40
            z-40 focus:outline-none transition-transform duration-500
            ${isSpinning ? "animate-vibrate" : "hover:scale-105 active:scale-95"}`}
        >
          <div
            className={`w-full h-full bg-gradient-to-b from-[#ee1c25] via-[#ee1c25] to-[#7f1d1d]
              rounded-lg sm:rounded-xl
              shadow-[0_10px_30px_rgba(0,0,0,0.55),_inset_0_2px_12px_rgba(255,255,255,0.35)]
              border-2 border-white/30 relative flex flex-col items-center justify-center overflow-hidden transition-all duration-700
              ${isLimitReached && !isSpinning ? "border-white shadow-[0_0_50px_rgba(238,28,37,0.55)] scale-105" : ""}`}
          >
            {/* flap */}
            <div
              className={`absolute top-0 w-full bg-[#c41212] rounded-b-[18px] sm:rounded-b-[22px]
              shadow-[0_4px_10px_rgba(0,0,0,0.35)] border-b border-white/20 transition-all duration-1000 origin-top z-20
              ${isLimitReached && !isSpinning ? "-rotate-x-180 opacity-0 translate-y-[-18px]" : "h-7 sm:h-10"}`}
            />

            <div className="z-30 flex flex-col items-center justify-center mt-2 sm:mt-4 px-2 text-center">
              <span
                className={`cinzel text-[#f9df9d] text-3xl xs:text-4xl sm:text-5xl font-black mb-1 transition-all duration-700
                ${isLimitReached && !isSpinning ? "scale-110 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.75)]" : "drop-shadow-[0_2px_5px_rgba(0,0,0,0.45)]"}`}
              >
                福
              </span>
              <span
                className={`montserrat text-[#f9df9d] font-black tracking-widest uppercase transition-all duration-700
                text-[9px] xs:text-[10px] sm:text-sm leading-tight
                ${isLimitReached && !isSpinning ? "text-white" : "drop-shadow-md"}`}
              >
                {isLimitReached && !isSpinning ? "YOU WON" : "SPIN"}
              </span>
            </div>

            {/* subtle shine */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] animate-shimmer-slow pointer-events-none" />
            {isLimitReached && !isSpinning && (
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/18 to-transparent animate-shimmer-fast pointer-events-none" />
            )}
          </div>

          {!isSpinning && !isLimitReached && (
            <div className="absolute inset-[-10px] sm:inset-[-12px] rounded-2xl border-2 border-[#ee1c25]/35 animate-ping pointer-events-none" />
          )}
        </button>

        <style>{`
          @keyframes vibrate {
            0%, 100% { transform: translate(-50%, -46%) rotate(0deg); }
            25% { transform: translate(calc(-50% + 1px), calc(-46% + 1px)) rotate(0.4deg); }
            75% { transform: translate(calc(-50% - 1px), calc(-46% - 1px)) rotate(-0.4deg); }
          }
          @keyframes prize-highlight {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.6) saturate(1.4); }
          }
          @keyframes shimmer-fast {
            0% { transform: translateY(120%); }
            100% { transform: translateY(-120%); }
          }
          @keyframes shimmer-slow {
            0% { transform: translateX(-150%) skewX(-20deg); }
            100% { transform: translateX(250%) skewX(-20deg); }
          }
          .animate-vibrate { animation: vibrate 0.22s linear infinite; }
          .animate-prize-highlight { animation: prize-highlight 1.15s ease-in-out infinite; }
          .rotate-x-180 { transform: rotateX(160deg); }

          @media (max-width: 400px) {
            .xs\\:w-24 { width: 6rem; }
            .xs\\:h-34 { height: 8.5rem; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default FortuneWheel;
