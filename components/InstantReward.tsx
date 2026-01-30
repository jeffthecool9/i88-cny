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
        </defs>
        <path
          d="M60 10 L90 55 L60 110 L30 55 Z"
          fill="url(#ptrGold2)"
        />
      </svg>
    </div>
  );
}

/* =============================
   MAIN COMPONENT
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

    const targetCenter =
      forcedWinIndex * anglePerSegment + anglePerSegment / 2;

    const desired = (360 - targetCenter) % 360;
    const current = ((rotationRef.current % 360) + 360) % 360;
    const delta = (desired - current + 360) % 360;

    const extraSpins = 8;
    const finalRotation = rotationRef.current + extraSpins * 360 + delta;

    rotationRef.current = finalRotation;
    setRotation(finalRotation);
  };

  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;

    const onEnd = (e: TransitionEvent) => {
      if (e.target !== el) return;
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
      <div className="relative text-center rounded-[28px] p-6 sm:p-7 overflow-hidden border border-[#F9F295]/18 bg-black/10 shadow-[0_18px_80px_rgba(0,0,0,0.55)]">

        <h2 className="mt-4 leading-tight">
          <span className="block text-[34px] sm:text-[42px] font-black tracking-tight goldTitle">
            PLAY WITH US
          </span>
          <span className="block text-[34px] sm:text-[42px] font-black tracking-tight goldTitle">
            → GET INSTANT REWARDS
          </span>
        </h2>

        <p className="mt-3 text-sm sm:text-base text-white/78 leading-relaxed max-w-[440px] mx-auto">
          Deposit & play — rewards are credited instantly. Spin the wheel to
          reveal your welcome reward.
        </p>
      </div>

      <div className="relative mt-10">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-40">
          <SimplePointer />
        </div>

        <div className="relative aspect-square">
          <div
            ref={wheelRef}
            className="w-full h-full"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning
                ? `transform ${SPIN_SECONDS}s cubic-bezier(0.15,0,0.15,1)`
                : "none",
            }}
          >
            <svg viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`} className="w-full h-full">
              <circle
                cx={WHEEL_SIZE / 2}
                cy={WHEEL_SIZE / 2}
                r={WHEEL_SIZE / 2 - 6}
                fill="#b11212"
              />
            </svg>
          </div>

          {!showWin && (
            <button
              onClick={spin}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-24 h-24 rounded-full bg-red-600 text-white font-black">
              SPIN
            </button>
          )}
        </div>
      </div>

      <style>{`
        .goldTitle{
          position: relative;
          display: inline-block;
          background: linear-gradient(
            180deg,
            #ffffff 0%,
            #fff7cf 10%,
            #ffe27a 24%,
            #ffd14c 40%,
            #fff1a8 55%,
            #ffc84a 70%,
            #fff6c9 85%,
            #ffffff 100%
          );
          -webkit-background-clip:text;
          background-clip:text;
          color:transparent;
          -webkit-text-stroke: 1px rgba(255,235,160,0.22);
          text-shadow:
            0 2px 0 rgba(0,0,0,0.25),
            0 14px 42px rgba(0,0,0,0.78),
            0 0 26px rgba(255,230,140,0.35),
            0 0 70px rgba(255,210,80,0.22);
        }

        .goldTitle::after{
          content:"";
          position:absolute;
          inset:-18% -35%;
          background: linear-gradient(
            110deg,
            transparent 0%,
            rgba(255,255,255,0.0) 35%,
            rgba(255,255,255,0.7) 50%,
            rgba(255,255,255,0.0) 65%,
            transparent 100%
          );
          transform: translateX(-60%) skewX(-18deg);
          animation: goldShimmer 2.8s ease-in-out infinite;
          mix-blend-mode: screen;
          pointer-events:none;
        }

        @keyframes goldShimmer{
          0%{ transform: translateX(-65%) skewX(-18deg); opacity:0 }
          50%{ opacity:1 }
          100%{ transform: translateX(65%) skewX(-18deg); opacity:0 }
        }
      `}</style>
    </section>
  );
};

export default InstantReward;
