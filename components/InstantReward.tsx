import React, { useEffect, useMemo, useRef, useState } from "react";

/* =============================
   CONFIG
============================= */
const MAX_SPINS = 1;
const SPIN_SECONDS = 4;
const CTA_URL = "https://your-link-here.com"; // ✅ change this

type Prize = { id: string; label: string; value: string; color: string };

const PRIZES: Prize[] = [
  // make the winning slice slightly brighter (like picture 2)
  { id: "p0", label: "100 FREE SPINS", value: "ON SLOT", color: "#ff1f1f" },
  { id: "p1", label: "i88 REWARD", value: "MYSTERY PRIZE", color: "#d80f0f" },
  { id: "p2", label: "i88 BONUS", value: "LUCKY DRAW", color: "#b90b0b" },
  { id: "p3", label: "i88 FORTUNE", value: "PROSPERITY", color: "#8d0707" },
  { id: "p4", label: "i88 REWARD", value: "MYSTERY PRIZE", color: "#d80f0f" },
  { id: "p5", label: "i88 BONUS", value: "LUCKY DRAW", color: "#b90b0b" },
];

const WHEEL_SIZE = 520;
const OUTER_BORDER_WIDTH = 30;

/* =============================
   POINTER (Premium Gold)
============================= */
function SimplePointer() {
  return (
    <div className="relative">
      <svg viewBox="0 0 120 120" className="w-14 h-14 sm:w-16 sm:h-16">
        <defs>
          <linearGradient id="ptrGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="28%" stopColor="#F9F295" />
            <stop offset="55%" stopColor="#E0AA3E" />
            <stop offset="78%" stopColor="#FAF398" />
            <stop offset="100%" stopColor="#B88A44" />
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
          <circle cx="60" cy="42" r="10" fill="rgba(253,224,71,0.25)" />
        </g>
      </svg>
    </div>
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

  // ✅ always win 100 FREE SPINS
  const forcedWinIndex = useMemo(() => {
    const idx = PRIZES.findIndex((p) => p.label.trim().toUpperCase() === "100 FREE SPINS");
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
    <div className="relative w-full max-w-[560px] mx-auto">
      {/* ✅ push whole wheel a bit lower */}
      <div className="relative mt-14 sm:mt-16">
        {/* POINTER */}
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-50 drop-shadow-[0_10px_20px_rgba(0,0,0,0.55)]">
          <SimplePointer />
        </div>

        {/* WHEEL */}
        <div className="relative aspect-square">
          <div
            ref={wheelRef}
            className={`w-full h-full relative ${showWin ? "winWheelPulse" : ""}`}
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? `transform ${SPIN_SECONDS}s cubic-bezier(0.15,0,0.15,1)` : "none",
            }}
          >
            {/* premium gloss overlay */}
            <div className="absolute inset-0 rounded-full z-30 pointer-events-none wheelGloss" />

            <svg viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`} className="w-full h-full overflow-visible">
              <defs>
                {/* lacquer base */}
                <radialGradient id="redLacquer2" cx="50%" cy="42%" r="62%">
                  <stop offset="0%" stopColor="#ff4b4b" />
                  <stop offset="35%" stopColor="#ff1f1f" />
                  <stop offset="70%" stopColor="#d10d0d" />
                  <stop offset="100%" stopColor="#4a0707" />
                </radialGradient>

                {/* inner sheen highlight */}
                <radialGradient id="sheenTopLeft" cx="30%" cy="25%" r="55%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
                  <stop offset="30%" stopColor="rgba(255,255,255,0.12)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>

                {/* premium gold rim (your reference) */}
                <linearGradient id="goldCTA" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F9F295" />
                  <stop offset="35%" stopColor="#E0AA3E" />
                  <stop offset="70%" stopColor="#FAF398" />
                  <stop offset="100%" stopColor="#B88A44" />
                </linearGradient>

                {/* subtle etched pattern on rim */}
                <pattern id="rimEtch" x="0" y="0" width="22" height="12" patternUnits="userSpaceOnUse">
                  <path
                    d="M0 12 Q5 0 11 12 Q17 0 22 12"
                    fill="none"
                    stroke="rgba(0,0,0,0.22)"
                    strokeWidth="0.6"
                  />
                  <path
                    d="M0 6 Q5 -6 11 6 Q17 -6 22 6"
                    fill="none"
                    stroke="rgba(255,255,255,0.14)"
                    strokeWidth="0.4"
                    transform="translate(0, 3)"
                  />
                </pattern>

                {/* win bloom */}
                <filter id="winBloom" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                  <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="
                      1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 0.85 0"
                    result="bloom"
                  />
                  <feMerge>
                    <feMergeNode in="bloom" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* rim specular */}
                <filter id="rimSpecular">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                  <feSpecularLighting
                    in="blur"
                    surfaceScale="6"
                    specularConstant="1"
                    specularExponent="35"
                    lightingColor="#ffffff"
                    result="spec"
                  >
                    <fePointLight x="300" y="-120" z="420" />
                  </feSpecularLighting>
                  <feComposite in="spec" in2="SourceAlpha" operator="in" result="specular" />
                  <feComposite in="SourceGraphic" in2="specular" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
                </filter>
              </defs>

              {/* base */}
              <circle cx={WHEEL_SIZE / 2} cy={WHEEL_SIZE / 2} r={WHEEL_SIZE / 2 - 6} fill="url(#redLacquer2)" />
              {/* sheen */}
              <circle cx={WHEEL_SIZE / 2} cy={WHEEL_SIZE / 2} r={WHEEL_SIZE / 2 - 14} fill="url(#sheenTopLeft)" opacity="0.55" />

              {/* segments */}
              <g>
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
                    <g key={p.id} filter={isWinnerSlice ? "url(#winBloom)" : undefined}>
                      <path d={d} fill={p.color} opacity={0.92} />
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
                          y={108}
                          textAnchor="middle"
                          className={`wheelLabel ${isWinnerSlice ? "wheelLabelWin" : ""}`}
                        >
                          {p.label}
                        </text>
                        <text
                          x={WHEEL_SIZE / 2}
                          y={130}
                          textAnchor="middle"
                          className={`wheelSub ${isWinnerSlice ? "wheelSubWin" : ""}`}
                        >
                          {p.value}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </g>

              {/* GOLD RIM */}
              <g filter="url(#rimSpecular)">
                <circle
                  cx={WHEEL_SIZE / 2}
                  cy={WHEEL_SIZE / 2}
                  r={WHEEL_SIZE / 2 - OUTER_BORDER_WIDTH / 2}
                  fill="none"
                  stroke="url(#goldCTA)"
                  strokeWidth={OUTER_BORDER_WIDTH}
                />
                <circle
                  cx={WHEEL_SIZE / 2}
                  cy={WHEEL_SIZE / 2}
                  r={WHEEL_SIZE / 2 - OUTER_BORDER_WIDTH / 2}
                  fill="none"
                  stroke="url(#rimEtch)"
                  strokeWidth={OUTER_BORDER_WIDTH}
                  opacity="0.38"
                />
                {/* subtle inner ring */}
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

            {/* win ring glow overlay */}
            {showWin && (
              <div className="absolute inset-0 rounded-full pointer-events-none z-40 winRingGlow" />
            )}
          </div>

          {/* SPIN button (angpow) - only before win */}
          {!showWin && (
            <button
              onClick={spin}
              disabled={isSpinning || isLimitReached}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                w-20 h-28 sm:w-24 sm:h-36 z-50
                rounded-xl border-2 border-white/30
                shadow-[0_18px_55px_rgba(0,0,0,0.55),_inset_0_2px_12px_rgba(255,255,255,0.25)]
                bg-gradient-to-b from-[#ff2a2a] to-[#7f1d1d]
                flex flex-col items-center justify-center
                transition-transform duration-300
                ${isSpinning ? "animateVibrate" : "hover:scale-105 active:scale-95"}
                ${isLimitReached ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <div className="absolute top-0 w-full bg-[#c41212] rounded-b-[18px] border-b border-white/20 h-7 sm:h-10" />
              <span className="relative z-10 text-[#F9F295] text-4xl font-black drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                福
              </span>
              <span className="relative z-10 text-[#F9F295] text-xs tracking-[0.35em] font-black">
                SPIN
              </span>
              <div className="absolute inset-0 pointer-events-none angpowShine" />
            </button>
          )}

          {/* ✅ WIN angpow shows only after stop */}
          {showWin && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
              <div className="relative w-24 h-36 sm:w-28 sm:h-44 rounded-xl border-2 border-white/35 bg-gradient-to-b from-[#ff2a2a] to-[#7f1d1d] shadow-[0_28px_90px_rgba(0,0,0,0.65)] overflow-hidden winAngpow">
                <div className="absolute top-0 w-full bg-[#c41212] rounded-b-[20px] border-b border-white/20 h-9 sm:h-12" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center pt-3">
                  <span className="text-[#FAF398] text-5xl font-black drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
                    福
                  </span>
                  <span className="mt-1 text-[#FAF398] text-xs tracking-[0.35em] font-black">
                    YOU WON
                  </span>
                </div>
                <div className="absolute inset-0 pointer-events-none winShimmer" />
                <div className="absolute inset-0 pointer-events-none winFlare" />
              </div>
            </div>
          )}
        </div>

        {/* CTA card/button (golden gradient like your reference image) */}
        {showWin && (
          <a
            href={CTA_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 block rounded-2xl px-6 py-6 text-center
                       shadow-[0_30px_100px_rgba(0,0,0,0.65)]
                       bg-gradient-to-b from-[#2a0606] to-[#120000]
                       hover:scale-[1.02] active:scale-[0.99] transition"
          >
            <div className="text-[11px] tracking-[0.55em] font-black text-white/70">
              CONGRATULATIONS
            </div>

            <div className="mt-3 leading-tight">
              <div className="winGoldText text-2xl sm:text-3xl font-black">
                YOU WON 100 FREE SPINS
              </div>
              <div className="winGoldText text-lg sm:text-xl font-black mt-1">ON SLOT</div>
            </div>

            {/* ✅ actual CTA button look */}
            <div className="mt-5 flex justify-center">
              <div className="ctaGoldBtn">
                <span className="ctaGoldBtnText">TAP TO CLAIM NOW</span>
                <span className="ctaArrow">→</span>
              </div>
            </div>
          </a>
        )}

        {/* helper line before win */}
        {!showWin && (
          <div className="mt-6 text-center">
            <p className="text-[10px] sm:text-xs tracking-[0.45em] uppercase font-black text-white/55">
              {isLimitReached ? "LIMIT REACHED" : "CLICK THE RED ANGPOW"}
            </p>
          </div>
        )}

        {/* tiny sparkles (only after win) */}
        {showWin && (
          <div className="pointer-events-none absolute inset-x-0 -bottom-2 flex justify-center">
            <div className="relative w-[560px] max-w-full h-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <span
                  key={i}
                  className="sparkle"
                  style={{
                    left: `${8 + i * 9}%`,
                    animationDelay: `${i * 0.12}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        /* ===== Labels (premium) ===== */
        .wheelLabel{
          font-weight: 900;
          letter-spacing: 0.08em;
          fill: #fff1c7;
          text-shadow: 0 2px 10px rgba(0,0,0,0.55);
          font-size: 16px;
        }
        @media (min-width: 640px){
          .wheelLabel{ font-size: 18px; }
        }
        .wheelSub{
          font-weight: 800;
          letter-spacing: 0.28em;
          fill: rgba(255,255,255,0.78);
          font-size: 9px;
          text-transform: uppercase;
        }
        .wheelLabelWin{
          fill: #ffffff;
          filter: drop-shadow(0 0 10px rgba(253,224,71,0.55));
        }
        .wheelSubWin{
          fill: rgba(255,255,255,0.92);
          filter: drop-shadow(0 0 10px rgba(253,224,71,0.4));
        }

        /* ===== Wheel glossy overlay ===== */
        .wheelGloss{
          background:
            radial-gradient(circle at 30% 25%, rgba(255,255,255,0.28), rgba(255,255,255,0) 55%),
            radial-gradient(circle at 50% 70%, rgba(0,0,0,0.18), rgba(0,0,0,0) 55%);
          box-shadow: inset 0 0 120px rgba(255,255,255,0.12);
        }

        /* ===== Angpow shine ===== */
        .angpowShine{
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.18) 30%, transparent 60%);
          transform: translateX(-120%);
          animation: shineSweep 2.6s ease-in-out infinite;
        }
        @keyframes shineSweep{
          0%{ transform: translateX(-120%); }
          55%{ transform: translateX(140%); }
          100%{ transform: translateX(140%); }
        }

        /* ===== Vibrate while spinning ===== */
        .animateVibrate{
          animation: vibrate 0.18s linear infinite;
        }
        @keyframes vibrate{
          0%,100%{ transform: translate(-50%, -50%) rotate(0deg); }
          25%{ transform: translate(calc(-50% + 1px), calc(-50% + 1px)) rotate(0.4deg); }
          75%{ transform: translate(calc(-50% - 1px), calc(-50% - 1px)) rotate(-0.4deg); }
        }

        /* ===== Winner wheel pulse ===== */
        .winWheelPulse{
          filter: drop-shadow(0 0 18px rgba(253,224,71,0.22));
        }
        .winRingGlow{
          box-shadow:
            0 0 25px rgba(253,224,71,0.22),
            0 0 55px rgba(253,224,71,0.18),
            inset 0 0 30px rgba(255,255,255,0.08);
          animation: ringPulse 1.2s ease-in-out infinite;
        }
        @keyframes ringPulse{
          0%,100%{ opacity: 0.75; transform: scale(1); }
          50%{ opacity: 1; transform: scale(1.01); }
        }

        /* ===== Win angpow effects ===== */
        .winAngpow{
          animation: popIn 420ms cubic-bezier(0.2, 1, 0.3, 1) both;
          box-shadow:
            0 30px 90px rgba(0,0,0,0.65),
            0 0 35px rgba(253,224,71,0.22);
        }
        @keyframes popIn{
          from{ opacity:0; transform: scale(0.96); }
          to{ opacity:1; transform: scale(1); }
        }
        .winShimmer{
          background: linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.16) 35%, transparent 70%);
          transform: translateY(120%);
          animation: shimmerUp 1.2s ease-in-out infinite;
        }
        @keyframes shimmerUp{
          0%{ transform: translateY(120%); opacity: 0; }
          25%{ opacity: 1; }
          100%{ transform: translateY(-120%); opacity: 0; }
        }
        .winFlare{
          background: radial-gradient(circle at 50% 55%, rgba(253,224,71,0.26), rgba(253,224,71,0) 60%);
          animation: flarePulse 1.1s ease-in-out infinite;
        }
        @keyframes flarePulse{
          0%,100%{ opacity: 0.55; }
          50%{ opacity: 1; }
        }

        /* ===== Gold win text ===== */
        .winGoldText{
          background: linear-gradient(180deg,#ffffff 0%,#FAF398 22%,#E0AA3E 52%,#FAF398 78%,#B88A44 100%);
          -webkit-background-clip:text;
          background-clip:text;
          color: transparent;
          text-shadow:
            0 0 18px rgba(253,224,71,0.35),
            0 10px 34px rgba(0,0,0,0.65);
        }

        /* ===== CTA Gold Button ===== */
        .ctaGoldBtn{
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 18px;
          border-radius: 16px;
          background: linear-gradient(90deg,#F9F295 0%,#E0AA3E 35%,#FAF398 70%,#B88A44 100%);
          box-shadow:
            0 18px 50px rgba(0,0,0,0.55),
            inset 0 1px 0 rgba(255,255,255,0.45);
          border: 1px solid rgba(0,0,0,0.25);
          transform: translateZ(0);
        }
        .ctaGoldBtn::before{
          content:"";
          position:absolute;
          inset: 1px;
          border-radius: 14px;
          background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.55), rgba(255,255,255,0) 55%);
          pointer-events:none;
          opacity: 0.9;
        }
        .ctaGoldBtnText{
          position: relative;
          z-index: 1;
          font-weight: 900;
          letter-spacing: 0.22em;
          font-size: 12px;
          color: #1a0b00;
          text-transform: uppercase;
        }
        .ctaArrow{
          position: relative;
          z-index: 1;
          font-weight: 900;
          color: #1a0b00;
        }

        /* ===== Sparkles ===== */
        .sparkle{
          position:absolute;
          top: -10px;
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255,255,255,1), rgba(253,224,71,0.9), rgba(253,224,71,0));
          filter: drop-shadow(0 0 10px rgba(253,224,71,0.45));
          animation: sparkleFloat 1.6s ease-in-out infinite;
        }
        @keyframes sparkleFloat{
          0%{ transform: translateY(0) scale(0.8); opacity: 0.4; }
          50%{ transform: translateY(-16px) scale(1.1); opacity: 1; }
          100%{ transform: translateY(0) scale(0.85); opacity: 0.55; }
        }
      `}</style>
    </div>
  );
};

export default FortuneWheel;
