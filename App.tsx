import Hero from "./components/Hero";

export default function App() {
  return (
    <main className="min-h-screen bg-[#0c0101]">
      <Hero />

      <section id="mechanics" className="relative bg-[#0c0101] text-white overflow-hidden">
  {/* Background glow */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,215,0,0.18),transparent_60%)] blur-2xl" />
    <div className="absolute -bottom-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,215,0,0.10),transparent_60%)] blur-2xl" />
  </div>

  <div className="relative mx-auto max-w-6xl px-6 py-20">
    {/* Header */}
    <div className="text-center">
      <p className="text-yellow-200/80 tracking-[0.25em] uppercase text-sm">
        Event Guide
      </p>
      <h2 className="mt-3 text-4xl md:text-6xl font-black text-yellow-200">
        Mechanics & Rewards
      </h2>
      <p className="mt-4 text-yellow-100/70 max-w-2xl mx-auto">
        Collect weapons, unlock tiers, and claim the grand prize. Simple rules — fast rewards.
      </p>
    </div>

    {/* 3 Steps */}
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {[
        {
          title: "1) Join the Event",
          desc: "Register / login and enter the CNY event page to start tracking your progress.",
        },
        {
          title: "2) Complete Missions",
          desc: "Finish daily missions to earn points and collect weapon fragments.",
        },
        {
          title: "3) Claim Rewards",
          desc: "Unlock reward tiers instantly. The more you collect, the higher your prize tier.",
        },
      ].map((x, idx) => (
        <div
          key={idx}
          className="rounded-2xl border border-yellow-200/20 bg-white/5 p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-yellow-200">{x.title}</h3>
            <span className="text-yellow-200/60 text-sm font-bold">Step</span>
          </div>
          <p className="mt-3 text-yellow-100/75 leading-relaxed">{x.desc}</p>
        </div>
      ))}
    </div>

    {/* Rewards Grid */}
    <div className="mt-14">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <h3 className="text-2xl md:text-3xl font-black text-yellow-200">
          Reward Tiers
        </h3>
        <p className="text-yellow-100/60 text-sm">
          *Replace prizes below with your real prizes.
        </p>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {[
          {
            tier: "Bronze",
            tag: "Entry rewards",
            items: ["Bonus Credits", "Mystery Loot Box", "Starter Weapon"],
          },
          {
            tier: "Gold",
            tag: "Mid-tier unlock",
            items: ["Higher Bonus", "Rare Weapon Skin", "Premium Loot Box"],
          },
          {
            tier: "Legendary",
            tag: "Grand prize tier",
            items: ["Grand Prize Draw", "Limited Weapon Set", "VIP Reward Pack"],
          },
        ].map((r, idx) => (
          <div
            key={idx}
            className="relative rounded-2xl border border-yellow-200/25 bg-gradient-to-b from-white/8 to-white/4 p-6 backdrop-blur-xl"
          >
            <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_40px_rgba(255,215,0,0.12)]" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-black text-yellow-200">{r.tier}</h4>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-yellow-300/15 text-yellow-200 border border-yellow-200/20">
                  {r.tag}
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-yellow-100/80">
                {r.items.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-[6px] h-2 w-2 rounded-full bg-yellow-200/70" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Timeline */}
    <div className="mt-14">
      <h3 className="text-2xl md:text-3xl font-black text-yellow-200 text-center">
        Event Timeline
      </h3>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Phase 1",
            date: "12 Feb — 18 Feb",
            desc: "Launch week missions + fast tier unlocks.",
          },
          {
            title: "Phase 2",
            date: "19 Feb — 24 Feb",
            desc: "Mid-event boosters + rare reward drops.",
          },
          {
            title: "Final Phase",
            date: "25 Feb — 27 Feb",
            desc: "Last chance to complete sets and enter grand prize.",
          },
        ].map((t, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-yellow-200/20 bg-white/5 p-6 backdrop-blur-xl"
          >
            <p className="text-yellow-200/80 text-sm tracking-[0.2em] uppercase">
              {t.title}
            </p>
            <p className="mt-2 text-xl font-black text-yellow-200">{t.date}</p>
            <p className="mt-3 text-yellow-100/75">{t.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* FAQ */}
    <div className="mt-14">
      <h3 className="text-2xl md:text-3xl font-black text-yellow-200 text-center">
        FAQ
      </h3>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {[
          {
            q: "How do I earn points?",
            a: "Complete daily missions and event tasks. Points are tracked automatically.",
          },
          {
            q: "When can I claim rewards?",
            a: "Instantly after you unlock a tier. Some prizes may be sent within 24 hours.",
          },
          {
            q: "Can I repeat missions?",
            a: "Daily missions reset. Special missions may have limited attempts.",
          },
          {
            q: "What happens if I miss a day?",
            a: "No problem — continue from your current progress. Just fewer points earned.",
          },
        ].map((f, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-yellow-200/20 bg-white/5 p-6 backdrop-blur-xl"
          >
            <p className="text-lg font-black text-yellow-200">{f.q}</p>
            <p className="mt-2 text-yellow-100/75 leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom CTA */}
    <div className="mt-16 text-center">
      <div className="inline-flex flex-col items-center gap-4 rounded-2xl border border-yellow-200/25 bg-white/5 px-8 py-8 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.6)]">
        <p className="text-yellow-100/80">
          Ready to collect weapons and unlock rewards?
        </p>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="cta-button-frame rounded-full bg-[#8B6E0D] px-10 py-4 font-black text-white text-lg tracking-wide hover:brightness-110 active:scale-[0.99] transition"
        >
          BACK TO TOP
        </button>

        <p className="text-xs text-yellow-100/50">
          Replace this CTA with WhatsApp / register button later.
        </p>
      </div>
    </div>
  </div>
</section>

    </main>
  );
}
