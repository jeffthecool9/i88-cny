import React from "react";

export default function App() {
return (
  <main className="relative min-h-screen w-full bg-[#000814] flex flex-col">
    {/* EMERGENCY VISUAL CHECK */}
    <div className="bg-red-600 text-white p-10 text-center z-[9999] block">
      <h1 className="text-4xl font-bold">SYSTEM ONLINE</h1>
      <p>If you see this, the layout was the problem.</p>
    </div>

    {/* Ensure Hero is not absolute */}
    <section className="relative w-full border-4 border-yellow-500">
       <Hero onOpenTutorial={() => setIsTutorialOpen(true)} />
    </section>
    
    {/* Rest of your components... */}
  </main>
);
}
