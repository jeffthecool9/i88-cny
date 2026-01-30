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
   POINTER
============================= */
function SimplePointer() {
  return (
    <div className="relative w-14 h-14 sm:w-16 sm:h-16">
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="ptrGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor="#FAF398" />
            <stop offset="60%" stopColor="#E0AA3E" />
            <stop offset="100%" stopColor="#B88A44" />
          </linearGradient>
        </defs>
        <path
          d="M60 10 L90 55 L60 110 L30 55 Z"
          fill="url(#ptrGold)"
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

    const finalRotation = rotationRef.current + 8 * 360 + delta;
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
      setSpinsUsed((v) => v + 1);
      setShowWin(true);
    };

    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, []);

  return (
    <section className="relative w-full max-w-[560px] mx-auto px-4 pt-10 pb-10 text-center">
      <h2 className="leading-[0.9] mb-6">
        <span className="shinyTitle">PLAY WITH US</span>
        <span className="shinyTitle">→ GET INSTANT</span>
        <span className="shinyTitle">REWARDS</span>
      </h2>

      <div className="relative mt-8">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-40">
          <SimplePointer />
        </div>

        <div className="relative aspect-square rounded-[40px]">
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
                r={WHEEL_SIZE / 2 - 10}
                fill="#b11212"
              />
            </svg>
          </div>

          {!showWin && (
            <button
              onClick={spin}
              className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-red-600 text-white font-black"
            >
              SPIN
            </button>
          )}
        </div>
      </div>

      <style>{`
        .shinyTitle{
          display:block;
          font-size: clamp(40px, 7vw, 58px);
          font-weight: 900;
          letter-spacing: -0.03em;
          background: linear-gradient(
            180deg,
            #ffffff 0%,
            #fff7c2 12%,
            #ffd86b 30%,
            #fff1a8 48%,
            #ffcc4d 66%,
            #fff2b0 84%,
            #ffffff 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow:
            0 6px 20px rgba(0,0,0,0.6),
            0 0 40px rgba(255,210,100,0.35);
        }
      `}</style>
    </section>
  );
};

export default InstantReward;
