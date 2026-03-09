"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const links = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Transactions", href: "#transactions" },
  { label: "Docs", href: "/docs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/60 backdrop-blur-2xl border-b border-white/[0.06] shadow-xl shadow-black/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center shadow-lg shadow-purple-600/30 group-hover:shadow-purple-500/50 transition-all duration-300">
            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg tracking-tight">
            <span className="text-white">Strills</span>
            <span className="gradient-text"> Pay</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/60 hover:text-white transition-colors duration-200 relative group"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-purple-500 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/50 hover:text-white transition-colors duration-200"
          >
            GitHub
          </a>
          <Link
            href="/docs"
            className="btn-purple px-4 py-2 rounded-xl text-sm font-semibold text-white"
          >
            <span>Get Started</span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/docs"
                onClick={() => setOpen(false)}
                className="btn-purple px-4 py-2 rounded-xl text-sm font-semibold text-white text-center"
              >
                <span>Get Started</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
