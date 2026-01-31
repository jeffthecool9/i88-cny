import React, { useEffect, useRef, useState } from "react";

/**
 * 🇲🇾 Kuala Lumpur time (+08:00)
 * Event START : 1 Feb 2026, 00:01
 * Event END   : 27 Feb 2026, 23:59
 */
const EVENT_START = new Date("2026-02-01T00:01:00+08:00").getTime();
const EVENT_END   = new Date("2026-02-27T23:59:00+08:00").getTime();

export const trackEvent = (eventName: string, params: Record<string, any>) => {
  console.log(`[Analytics] ${eventName}`, params);
  if ((window as any).fbq) (window as any).fbq("trackCustom", eventName, params);
  if ((window as any).gtag) (window as any).gtag("event", eventName, params);
};

type Props = { pageVariant?: string };
type Mode = "countdown" | "elapsed" | "ended";

const CountdownTimer: React.FC<Props> = ({ pageVariant = "cny_hero_v1" }) => {
  const [timeMs, setTimeMs] = useState<number | null>(null);
  const [mode, setMode] = useState<Mode>("countdown");

  const offsetRef = useRef<number>(0);
  const firedStart = useRef(false);
  const firedEnd = useRef(false);

  useEffect(() => {
    let alive = true;

    const updateTimer = () => {
      const now = Date.now() + offsetRef.current;

      /* 🟥 EVENT ENDED */
      if (now >= EVENT_END) {
        if (!alive) return;
        setMode("ended");
        setTimeMs(0);

        if (!firedEnd.current) {
          trackEvent("event_ended", { page_variant: pageVariant });
          firedEnd.current = true;
        }
        return;
      }

      /* 🟨 EVENT ONGOING */
      if (now >= EVENT_START) {
        const elapsed = now - EVENT_START;

        if (!alive) return;
        setMode("elapsed");
        setTimeMs(elapsed);

        if (!firedStart.current) {
          trackEvent("event_started", { page_variant: pageVariant });
          firedStart.current = true;
        }
        return;
      }

      /* 🟩 BEFORE EVENT */
      const remaining = EVENT_START - now;
      if (!alive) return;

      setMode("countdown");
      setTimeMs(remaining);
    };

    const syncTime = async () => {
      try {
        const res = await fetch(window.location.origin, {
          method: "HEAD",
          cache: "no-store",
        });
        const serverDate = res.headers.get("Date");
        if (serverDate) {
          offsetRef.current = new Date(serverDate).getTime() - Date.now();
        }
      } catch {
        /* fallback to device time */
      } finally {
        updateTimer();
      }
    };

    syncTime();
    const interval = setInterval(updateTimer, 1000);

    return () => {
      alive = false;
      clearInterval(interval);
    };
  }, [pageVariant]);

  /* ---------- FORMATTERS ---------- */

  const formatCountdown = (ms: number) => {
    const total = Math.floor(ms / 1000);
    return {
      h: String(Math.floor(total / 3600)).padStart(2, "0"),
      m: String(Math.floor((total % 3600) / 60)).padStart(2, "0"),
      s: String(total % 60).padStart(2, "0"),
    };
  };

  const formatElapsed = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    return {
      d: String(Math.floor(mins / 1440)).padStart(2, "0"),
      h: String(Math.floor((mins % 1440) / 60)).padStart(2, "0"),
      m: String(mins % 60).padStart(2, "0"),
    };
  };

  if (timeMs === null) return <div className="h-12" />;

  /* ---------- RENDER ---------- */

  if (mode === "ended") {
    return (
      <div className="flex flex-col items-center">
        <div className="endedPill">EVENT ENDED</div>

        <style>{`
          .endedPill{
            padding: 10px 22px;
            border-radius: 999px;
            background: rgba(0,0,0,0.55);
            border: 1px solid rgba(255,255,255,0.15);
            color: #ff5f5f;
            font-weight: 900;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            text-shadow:
              0 0 18px rgba(255,95,95,0.45),
              0 6px 22px rgba(0,0,0,0.85);
          }
        `}</style>
      </div>
    );
  }

  const isCountdown = mode === "countdown";
  const t = isCountdown
    ? formatCountdown(timeMs)
    : formatElapsed(timeMs);

  return (
    <div className="flex gap-3 items-center">
      {isCountdown ? (
        <>
          <TimeUnit label="HRS" value={t.h} />
          <Colon />
          <TimeUnit label="MIN" value={t.m} />
          <Colon />
          <TimeUnit label="SEC" value={t.s} />
        </>
      ) : (
        <>
          <TimeUnit label="DAY" value={t.d} />
          <Colon />
          <TimeUnit label="HRS" value={t.h} />
          <Colon />
          <TimeUnit label="MIN" value={t.m} />
        </>
      )}
    </div>
  );
};

/* ---------- UI PARTS ---------- */

const Colon = () => (
  <span className="text-yellow-400 text-3xl font-black animate-pulse">:</span>
);

const TimeUnit: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="bg-black/60 border border-yellow-400/20 w-14 h-14 rounded-xl flex items-center justify-center shadow-2xl">
      <span className="text-yellow-400 text-2xl font-black font-mono">
        {value}
      </span>
    </div>

    <span className="timerLabel mt-2">{label}</span>

    <style>{`
      .timerLabel{
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(0,0,0,0.45);
        border: 1px solid rgba(255,255,255,0.1);
        color: #ff3b3b;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        text-shadow:
          0 0 14px rgba(255,59,59,0.4),
          0 4px 18px rgba(0,0,0,0.85);
      }
    `}</style>
  </div>
);

export default CountdownTimer;
