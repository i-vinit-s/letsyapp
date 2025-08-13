"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-white">
      <div className="relative z-10 text-center max-w-3xl px-6 mt-10">
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900"
        >
          Share Your{" "}
          <span className="relative inline-block px-4 py-1 rounded-3xl bg-black text-white">
            Truth
          </span>{" "}
          Without Fear
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-base sm:text-lg text-neutral-600 mb-8"
        >
          LetsYapp is your safe space for anonymous confessions. Speak your
          mind, connect with others, and be heard — no logins, no judgments,
          just real stories.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {/* <Link href="/confess">
            <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-neutral-800 transition shadow-md">
              Post a Confession
            </button>
          </Link>
          <Link href="/feed">
            <button className="bg-white border border-black text-black px-6 py-3 rounded-lg font-medium hover:bg-neutral-200 transition shadow-md">
              View Feed
            </button>
          </Link> */}
          <Link href="/soon">
            <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-neutral-800 transition shadow-md">
              Coming Soon
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Scrolling background slogans */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex flex-col justify-around">
        {[
          "Anonymous. Safe. Real.",
          "Confess. React. Connect.",
          "No Names. No Judgments.",
          "Your Story Matters.",
        ].map((text, index) => (
          <motion.div
            key={index}
            initial={{ x: index % 2 === 0 ? "-100%" : "100%" }}
            animate={{ x: index % 2 === 0 ? "100%" : "-100%" }}
            transition={{
              repeat: Infinity,
              duration: 18 + index * 3,
              ease: "linear",
            }}
            className="whitespace-nowrap text-black/10 text-9xl sm:text-9xl font-extrabold uppercase"
          >
            {text}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
