"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    // { name: "About", href: "/about" },
    // { name: "Confessions", href: "/confessions" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[85%]">
      {/* Glassy container */}
      <div className="relative flex items-center justify-between px-6 py-3 rounded-2xl border border-white/40 shadow-lg backdrop-blur-lg bg-white/30">
        {/* Glossy overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/30 via-white/10 to-white/5 pointer-events-none" />

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-900 relative z-10">
          Let’sYapp
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 relative z-10">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-800 hover:text-black transition font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800 hover:text-black focus:outline-none text-2xl relative z-10"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="md:hidden mt-2 bg-white/50 backdrop-blur-lg border border-white/30 rounded-xl shadow-lg"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-800 hover:text-black px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
