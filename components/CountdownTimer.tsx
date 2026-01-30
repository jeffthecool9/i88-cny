import React, { useEffect, useRef, useState } from "react";

/**
 * ✅ Kuala Lumpur time (+08:00)
 * Event starts at: 1 Feb 2026, 12:01 AM (00:01)
 */
const EVENT_START = new Date("2026-02-01T00:01:00+08:00").getTime();

export const trackEvent = (eventName: string, params: Record<string, any>) => {
  console.log(`[Analytics] ${eventName}`, params);
  if ((window as any).fbq) (window as any).fbq("trackCustom", eventName, params);
  if ((window as any).gtag) (window as any).gtag("event", eventName, params);
};

type Props = { pageVariant?: string };
type Mode = "countdown" | "elapsed";

const CountdownTimer: React.FC<Props> = ({ pageVariant = "cny_hero_v1" }) => {
  const [timeMs, setTimeMs] = useState<number | null>(null);
  const [mode, setMode] = useState<Mode>("countdown");

  const offsetRef = useRef<number>(0);
  const impressionFired = useRef(false);
  const eventStartedFired = useRef(false);

  useEffect(() => {
    let alive = true;

    const updateTimer = () => {
      const now = Date.now() + offsetRef.current;

      // ✅ After event start: show elapsed DAY:HRS:MIN
      if (now >= EVENT_START) {
        const elapsed = now - EVENT_START;

        if (!alive) return;
        setMode("elapsed");
        setTimeMs(elapsed);

        if (!eventStartedFired.current) {
          trackEvent("event_started", { page_variant: pageVariant });
          eventStartedFired.current = true;
        }
        return;
      }

      // ✅ Before event start: countdown HRS:MIN:SEC
      const remaining = Math.max(0, EVENT_START - now);

      if (!alive) return;
      setMode("countdown");
      setTimeMs(remaining);

      if (!impressionFired.current) {
        trackEvent("timer_impression", {
          seconds_left: Math.floor(remaining / 1000),
          page_variant: pageVariant,
        });
        impressionFired.current = true;
      }
    };

    const syncTime = async () => {
      try {
        const response = await fetch(window.location.origin, {
          method: "HEAD",
          cache: "no-store",
        });

        const dateHeader = response.headers.get("Date");
        if (dateHeader) {
          const serverNow = new Date(dateHeader).getTime();
          const deviceNow = Date.now();
          offsetRef.current = serverNow - deviceNow;
        }
      } catch {
        // fallback to device time
      } finally {
        updateTimer();
      }
    };

    syncTime();
    const interval = window.setInterval(updateTimer, 1000);

    return () => {
      alive = false;
      window.clearInterval(interval);
    };
  }, [pageVariant]);

  const formatCountdown = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    return {
      h: h.toString().padStart(2, "0"),
      m: m.toString().padStart(2, "0"),
      s: s.toString().padStart(2, "0"),
    };
  };

  // ✅ After event starts: DD:HH:MM (Day:Hour:Min)
  const formatElapsedDDHHMM = (ms: number) => {
    const totalMinutes = Math.floor(ms / (1000 * 60));
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const mins = totalMinutes % 60;

    return {
      d: days.toString().padStart(2, "0"),
      h: hours.toString().padStart(2, "0"),
      m: mins.toString().padStart(2, "0"),
    };
  };

  if (timeMs === null) return <div className="h-12" />;

  if (mode === "countdown") {
    const { h, m, s } = formatCountdown(timeMs);

    return (
      <div className="flex flex-col items-center">
        <div className="flex gap-3 items-center">
          <TimeUnit label="HRS" value={h} />
          <span className="text-yellow-400 text-3xl font-black -mt-1 animate-pulse">
            :
          </span>
          <TimeUnit label="MIN" value={m} />
          <span className="text-yellow-400 text-3xl font-black -mt-1 animate-pulse">
            :
          </span>
          <TimeUnit label="SEC" value={s} />
        </div>
      </div>
    );
  }

  const { d, h, m } = formatElapsedDDHHMM(timeMs);

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-3 items-center">
        <TimeUnit label="DAY" value={d} />
        <span className="text-yellow-400 text-3xl font-black -mt-1 animate-pulse">
          :
        </span>
        <TimeUnit label="HRS" value={h} />
        <span className="text-yellow-400 text-3xl font-black -mt-1 animate-pulse">
          :
        </span>
        <TimeUnit label="MIN" value={m} />
      </div>
    </div>
  );
};

const TimeUnit: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-black/60 border border-yellow-400/20 w-14 h-14 rounded-xl flex items-center justify-center shadow-2xl">
        <span className="text-yellow-400 text-2xl font-black font-mono">
          {value}
        </span>
      </div>
      <span className="text-xs font-black text-[#FF5F5F] mt-2 tracking-tighter">
        {label}
      </span>
    </div>
  );
};

export default CountdownTimer;
