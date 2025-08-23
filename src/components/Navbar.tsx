"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useUser(); // check if user is signed in

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
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 relative z-10"
        >
          Let’sYapp
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center relative z-10">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-800 hover:text-black transition font-medium"
            >
              {item.name}
            </Link>
          ))}

          {/* Authentication buttons */}
          {!isSignedIn ? (
            <div className="flex gap-3">
              <SignInButton>
                <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black transition">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="px-4 py-2 bg-white text-black border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          ) : (
            <UserButton
              afterSignOutUrl="/" // redirect after sign out
              appearance={{ elements: { userButtonAvatarBox: "w-10 h-10" } }}
            />
          )}
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
            <div className="px-4 pt-2 pb-3 space-y-1 flex flex-col">
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

              {/* Mobile auth buttons */}
              {!isSignedIn ? (
                <div className="flex flex-col gap-2 px-3 pb-2">
                  <SignInButton>
                    <button className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black transition">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              ) : (
                <Link
                  href="/profile"
                  className="block w-full text-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-black font-medium"
                >
                  Profile
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
