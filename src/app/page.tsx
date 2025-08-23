"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <>
      {/* Hero Section */}
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
            <div className="flex flex-col sm:flex-row gap-4 w-full items-center justify-center">
              {/* First button - Transparent initially */}
              <Link href="/c/create" className="w-full sm:w-auto">
                <button className="w-[90%] sm:w-auto px-6 py-3 rounded-lg font-medium border border-black text-black bg-transparent hover:bg-black hover:text-white transition-colors duration-600 ease-in-out shadow-md">
                  Create My Page
                </button>
              </Link>

              {/* Second button - Black initially */}
              {/* <Link href="/soon" className="w-full sm:w-auto">
                <button className="w-[90%] sm:w-auto px-6 py-3 rounded-lg font-medium border border-black bg-black text-white hover:bg-transparent hover:text-black transition-colors duration-300 ease-in-out shadow-md">
                  Coming Soon
                </button>
              </Link> */}
            </div>
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

      {/* Features Section */}
      <section className="py-24 bg-gray-50 text-center select-none">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-gray-900">
          Why Choose{" "}
          <span className="relative inline-block px-5 py-2 rounded-3xl bg-black text-white shadow-lg">
            LetsYapp?
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          {[
            {
              title: "100% Anonymous",
              desc: "No names, no sign-ups required. Just your voice.",
            },
            {
              title: "Safe & Supportive",
              desc: "A judgment-free zone to share and connect with others.",
            },
            {
              title: "Real Stories",
              desc: "Discover what others are going through and relate deeply.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-10 rounded-3xl bg-white/50 backdrop-blur-lg shadow-2xl border border-gray-200 hover:scale-105 transition-transform duration-300 hover:shadow-3xl"
            >
              <h3 className="font-bold text-2xl mb-4 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-gray-900">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-5xl mx-auto px-6 text-center">
          {[
            {
              icon: "📝",
              title: "1. Write",
              desc: "Share your thoughts or confession.",
            },
            {
              icon: "📢",
              title: "2. Post",
              desc: "Submit anonymously with one click.",
            },
            {
              icon: "💬",
              title: "3. Connect",
              desc: "Read, react, and connect with others.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white/40 backdrop-blur-md border border-gray-200 shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <span className="text-6xl">{item.icon}</span>
              <h3 className="font-semibold text-2xl mt-4 mb-3 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Share Your Truth?</h2>
        <p className="mb-8 text-lg text-gray-300">
          Create your confession page today and let your voice be heard.
        </p>
        <Link href="/c/create">
          <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition shadow-md">
            Create My Page
          </button>
        </Link>
      </section>
    </>
  );
}
