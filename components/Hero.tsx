"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-8 pb-14 pt-10">
      {/* Soft spotlight */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.15),_transparent_60%)] blur-3xl" />
        <div className="absolute bottom-[-200px] right-[-120px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(79,70,229,0.5),_transparent_60%)] blur-3xl opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(15,23,42,0.9),_transparent_60%)] mix-blend-screen opacity-80" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Small pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[11px] font-medium text-white/60"
        >
          <span className="h-1 w-1 rounded-full bg-emerald-400" />
          Live on Flare · Coston2
        </motion.div>

        {/* Core headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mb-4 text-[2.6rem] leading-[1.05] text-white sm:text-[3.2rem] md:text-[3.6rem] font-semibold"
        >
          One-click gasless protection
          <br />
          <span className="gradient-text">for every Flare wallet</span>
        </motion.h1>

        {/* Supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-9 max-w-xl text-sm sm:text-[0.92rem] text-white/55 leading-relaxed"
        >
          Strills routes transfers, swaps, and contract calls through a dedicated paymaster — so
          your users never touch FLR. Fees settle in USDT, FXRP, or WFLR while the relayer handles gas.
        </motion.p>

        {/* Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.5 }}
          className="mb-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link
            href="/docs"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-violet-400 px-7 py-2.5 text-sm font-semibold text-black shadow-[0_0_40px_rgba(167,139,250,0.7)] hover:brightness-110 transition-all"
          >
            Open Developer Docs
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/5 px-6 py-2 text-sm font-medium text-white/75 hover:bg-white/10 transition-colors"
          >
            Discover the flow
          </Link>
        </motion.div>

        {/* Corner labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid w-full max-w-3xl grid-cols-2 gap-3 text-[11px] text-white/35 sm:grid-cols-4"
        >
          <div className="text-left sm:text-center">
            <div className="font-medium text-white/60">USDT · FXRP · WFLR</div>
            <div>Fee tokens</div>
          </div>
          <div className="text-right sm:text-center">
            <div className="font-medium text-white/60">Transfers &amp; swaps</div>
            <div>Single intent</div>
          </div>
          <div className="hidden sm:block text-left">
            <div className="font-medium text-white/60">Relayer wallet</div>
            <div>Pays native gas</div>
          </div>
          <div className="hidden sm:block text-right">
            <div className="font-medium text-white/60">EIP‑712</div>
            <div>Non-custodial signatures</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
