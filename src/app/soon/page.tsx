"use client";

import { motion } from "framer-motion";

export default function ComingSoon() {
  const circles = [
    { size: 80, left: "10%", top: "20%" },
    { size: 100, left: "70%", top: "30%" },
    { size: 60, left: "40%", top: "70%" },
    { size: 120, left: "80%", top: "80%" },
    { size: 90, left: "20%", top: "85%" },
  ];

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-white overflow-hidden">
      {/* Floating circles */}
      {circles.map((c, i) => (
        <motion.div
          key={i}
          className="absolute bg-black/5 rounded-full"
          style={{
            width: `${c.size}px`,
            height: `${c.size}px`,
            left: c.left,
            top: c.top,
          }}
          animate={{
            y: [0, 20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4 + i,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Text */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl sm:text-6xl font-bold text-black z-10"
      >
        Let´sYapp
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg text-neutral-600 mt-4 z-10"
      >
        Anonymous Confessions — Coming Soon
      </motion.p>

      {/* Pulsing underline */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-4 h-1 w-20 bg-black z-10 origin-left"
      />
    </section>
  );
}
