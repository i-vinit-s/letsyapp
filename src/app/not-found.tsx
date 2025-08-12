"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white text-black px-6 text-center">
      {/* Floating big 404 */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: 1,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="text-[8rem] sm:text-[12rem] font-extrabold text-black/10 select-none"
      >
        404
      </motion.h1>

      {/* Main text */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-3xl sm:text-4xl font-bold mb-4"
      >
        Oops! Page Not Found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-gray-600 mb-8 max-w-md"
      >
        Looks like you’re lost in the confessions… Let’s get you back to where
        the secrets live.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Link
          href="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-neutral-800 transition shadow-md"
        >
          Go Home
        </Link>
      </motion.div>
    </section>
  );
}
