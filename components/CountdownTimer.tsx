
import React, { useState, useEffect, useRef } from 'react';

const TARGET_DATE = new Date("2026-02-01T00:00:00+08:00").getTime();

export const trackEvent = (eventName: string, params: Record<string, any>) => {
  console.log(`[Analytics] ${eventName}`, params);
  if ((window as any).fbq) (window as any).fbq('trackCustom', eventName, params);
  if ((window as any).gtag) (window as any).gtag('event', eventName, params);
};

const CountdownTimer: React.FC<{ pageVariant?: string }> = ({ pageVariant = 'cny_hero_v1' }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const offsetRef = useRef<number>(0);
  const impressionFired = useRef(false);

  useEffect(() => {
    const syncTime = async () => {
      let serverOffset = 0;
      try {
        const response = await fetch(window.location.origin, { method: "HEAD", cache: "no-store" });
        const dateHeader = response.headers.get("Date");
        if (dateHeader) {
          const serverNow = new Date(dateHeader).getTime();
          const deviceNow = Date.now();
          serverOffset = serverNow - deviceNow;
        }
      } catch (e) {}
      offsetRef.current = serverOffset;
      updateTimer();
    };

    const updateTimer = () => {
      const now = Date.now() + offsetRef.current;
      const remaining = Math.max(0, TARGET_DATE - now);
      setTimeLeft(remaining);
      if (!impressionFired.current && remaining !== null) {
        trackEvent('timer_impression', { seconds_left: Math.floor(remaining / 1000), page_variant: pageVariant });
        impressionFired.current = true;
      }
    };

    syncTime();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [pageVariant]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return { h: h.toString().padStart(2, '0'), m: m.toString().padStart(2, '0'), s: s.toString().padStart(2, '0') };
  };

  if (timeLeft === null) return <div className="h-12" />;
  if (timeLeft <= 0) {
    return (
      <div className="bg-black/40 backdrop-blur-xl border border-yellow-400/30 px-8 py-4 rounded-2xl">
        <span className="text-yellow-400 font-black text-lg uppercase tracking-widest animate-pulse">Event Started</span>
      </div>
    );
  }

  const { h, m, s } = formatTime(timeLeft);

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-3">
        <TimeUnit label="HRS" value={h} />
        <span className="text-yellow-400 text-3xl font-black mt-1 animate-pulse">:</span>
        <TimeUnit label="MIN" value={m} />
        <span className="text-yellow-400 text-3xl font-black mt-1 animate-pulse">:</span>
        <TimeUnit label="SEC" value={s} />
      </div>
      <p className="mt-4 text-sm font-black uppercase tracking-[0.4em] text-[#FF5F5F]">Until Divine Unsealing</p>
    </div>
  );
};

const TimeUnit = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="bg-black/60 border border-yellow-400/20 w-14 h-14 rounded-xl flex items-center justify-center shadow-2xl">
      <span className="text-yellow-400 text-2xl font-black font-mono">{value}</span>
    </div>
    <span className="text-xs font-black text-[#FF5F5F] mt-2 tracking-tighter">{label}</span>
  </div>
);

export default CountdownTimer;
