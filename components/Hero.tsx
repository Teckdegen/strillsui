"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-8 pb-14 pt-10">
      {/* Soft spotlight */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(148,163,184,0.22),_transparent_65%)] blur-3xl" />
        <div className="absolute bottom-[-220px] right-[-140px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(15,23,42,0.85),_transparent_60%)] blur-3xl opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(15,23,42,0.85),_transparent_60%)] mix-blend-screen opacity-80" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Section 1: brand wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex min-h-[60vh] w-full flex-col items-center justify-center space-y-6"
        >
          <h1 className="text-[3.4rem] sm:text-[4.3rem] md:text-[4.9rem] tracking-[0.25em] font-semibold text-white/95">
            STRILLS
          </h1>
          <p className="max-w-md text-xs sm:text-sm text-white/55 uppercase tracking-[0.24em]">
            GASLESS PAYMASTER FOR FLARE
          </p>
          <Link
            href="#details"
            className="mt-4 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-8 py-2.5 text-xs font-semibold tracking-[0.18em] text-white/85 hover:bg-white/14 hover:text-white transition-colors"
          >
            GET STARTED
          </Link>
        </motion.div>

        {/* Section 2: details, revealed on scroll */}
        <motion.div
          id="details"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-3xl pb-6 pt-2"
        >
          {/* Fee tokens — minimal inline list */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 flex flex-wrap items-center justify-center gap-2"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-purple-300/70">
              Fee tokens
            </span>
            <span className="text-purple-500/40">·</span>
            {["USDT", "FXRP", "WFLR"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-purple-500/25 bg-purple-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-purple-200"
              >
                {t}
              </span>
            ))}
          </motion.div>

          {/* Flow — 3 steps, minimal words */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6"
          >
            {[
              { label: "Sign", sub: "EIP‑712" },
              { label: "Relayer", sub: "Pays gas" },
              { label: "Done", sub: "Fee in token" },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <span className="rounded-full border border-purple-500/30 bg-purple-500/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-purple-200">
                    {step.label}
                  </span>
                  <span className="mt-1 text-[10px] uppercase tracking-widest text-purple-400/60">
                    {step.sub}
                  </span>
                </div>
                {i < 2 && (
                  <span className="hidden text-purple-500/40 sm:inline" aria-hidden>
                    →
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
