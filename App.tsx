import React from "react";
import Hero from "./src/components/Hero";

export default function App() {
  return (
    <main className="min-h-screen bg-[#0c0101]">
      <Hero />
      {/* Dummy target so your CTA scroll works */}
      <section id="mechanics" className="min-h-[600px] px-6 py-20 bg-[#0c0101]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-yellow-200 mb-4">
            Mechanics Section
          </h2>
          <p className="text-yellow-100/80">
            This is a placeholder section so the “EXPLORE NOW” button can scroll properly.
          </p>
        </div>
      </section>
    </main>
  );
}
