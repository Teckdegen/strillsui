"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

const floatingTokens = [
  { symbol: "USDT", color: "#26a17b", delay: 0, x: -280, y: -60 },
  { symbol: "FXRP", color: "#346aa9", delay: 1.2, x: 280, y: -80 },
  { symbol: "WFLR", color: "#e84142", delay: 0.6, x: -240, y: 120 },
  { symbol: "FLR", color: "#7c3aed", delay: 1.8, x: 260, y: 100 },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Background orbs */}
      <div className="orb w-[600px] h-[600px] bg-purple-700 top-[-100px] left-1/2 -translate-x-1/2 opacity-20" />
      <div className="orb w-[400px] h-[400px] bg-purple-500 bottom-0 right-0 opacity-10" style={{ animationDelay: "2s" }} />
      <div className="orb w-[300px] h-[300px] bg-violet-800 top-1/4 left-0 opacity-10" style={{ animationDelay: "1s" }} />

      {/* Animated grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating token badges */}
      {floatingTokens.map((t) => (
        <motion.div
          key={t.symbol}
          className="absolute hidden lg:flex items-center gap-2 glass px-4 py-2.5 rounded-2xl"
          style={{ borderColor: `${t.color}30` }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -12, 0],
          }}
          transition={{
            opacity: { delay: t.delay + 1, duration: 0.5 },
            scale: { delay: t.delay + 1, duration: 0.5 },
            y: { delay: t.delay, duration: 4 + t.delay * 0.5, repeat: Infinity, ease: "easeInOut" },
          }}
          whileHover={{ scale: 1.08 }}
          style2={{
            left: `calc(50% + ${t.x}px)`,
            top: `calc(50% + ${t.y}px)`,
          }}
          // Note: using CSS transform offset from center
          initial2={{ x: t.x, y: t.y }}
        >
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: t.color }}>
            {t.symbol[0]}
          </div>
          <span className="text-xs font-semibold text-white/80">{t.symbol}</span>
          <span className="text-xs text-green-400 font-medium">✓ gasless</span>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-8 border-purple-600/30"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-white/60 font-medium">Live on Flare · Coston2 Testnet</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6"
        >
          <span className="text-white">Transact on Flare</span>
          <br />
          <span className="gradient-text">without gas</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Send tokens, swap on BlazeSwap, and call any smart contract on Flare —
          all without holding a single FLR. Pay fees in USDT, FXRP, or WFLR.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/docs"
            className="btn-purple px-7 py-3.5 rounded-2xl text-sm font-semibold text-white flex items-center gap-2 group"
          >
            <span>Read the Docs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            href="#transactions"
            className="glass px-7 py-3.5 rounded-2xl text-sm font-semibold text-white/70 hover:text-white hover:border-purple-600/40 transition-all duration-300 flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-purple-400" />
            <span>See What's Possible</span>
          </Link>
        </motion.div>

        {/* Token ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-3 mt-14 flex-wrap"
        >
          {["USDT", "FXRP", "WFLR", "Any ERC20"].map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + i * 0.1 }}
              className="token-badge"
            >
              {t}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="text-xs text-white/30"
          >
            accepted as fee tokens
          </motion.span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 glass rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-purple-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
