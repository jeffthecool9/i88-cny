import React from "react";
import { motion } from "framer-motion";

type FloatingAngpowProps = {
  delay?: number;
  x?: number;
  y?: number;
  scale?: number;
  size?: string;
};

const FloatingAngpow: React.FC<FloatingAngpowProps> = ({
  delay = 0,
  x = 0,
  y = 0,
  scale = 1,
  size = "text-3xl",
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0.35, 1, 0.35],
      scale: [scale, scale * 1.15, scale],
      y: [y, y - 18, y],
      x: [x, x + 10, x],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    className={`absolute pointer-events-none select-none z-0 ${size}`}
    style={{
      left: "50%",
      top: "50%",
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
    }}
  >
