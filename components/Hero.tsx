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
          <h2 className="mb-3 text-[1.6rem] sm:text-[1.9rem] font-semibold text-white">
            One-click gasless protection for every transaction.
          </h2>
          <p className="mb-7 text-sm sm:text-[0.92rem] text-white/60 leading-relaxed">
            Your users sign a single intent; Strills routes transfers, swaps, and contract calls
            through a dedicated relayer that pays FLR gas on-chain and settles protocol fees in
            tokens they already hold.
          </p>

          <div className="mb-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <div className="flex gap-2">
              {["USDT", "FXRP", "WFLR"].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-white/18 bg-white/6 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/70"
                >
                  {label}
                </span>
              ))}
            </div>
            <div className="flex gap-2 text-[10px] text-white/45">
              <span className="rounded-full border border-white/12 bg-white/4 px-3 py-1">
                EIP‑712 intents
              </span>
              <span className="rounded-full border border-white/12 bg-white/4 px-3 py-1">
                Relayer pays gas
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between text-[11px] text-white/40">
            <div className="flex flex-col items-center sm:items-start gap-1">
              <span className="text-white/65">Transfers &amp; swaps</span>
              <span>Single signature</span>
            </div>
            <div className="hidden h-px flex-1 bg-gradient-to-r from-white/10 via-white/30 to-white/10 sm:block" />
            <div className="flex flex-col items-center sm:items-end gap-1">
              <span className="text-white/65">Any contract call</span>
              <span>Non‑custodial wallet</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
