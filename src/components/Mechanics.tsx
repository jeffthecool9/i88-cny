import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Mechanics: React.FC = () => {
  const [scrollImg, setScrollImg] = useState<string>("/scroll.png");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload avoids layout jump on slower connections
    const img = new Image();
    img.src = "/scroll.png";
    img.onload = () => setIsLoading(false);
    img.onerror = () => {
      // If scroll.png missing, fail gracefully
      setIsLoading(false);
      setScrollImg("");
    };
  }, []);

  return (
    <section
      id="mechanics"
      className="py-24 px-6 relative bg-gradient-to-b from-[#D40000] to-[#990000] overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* EVENT DESCRIPTION HEADER */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-2xl"
          >
