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
          <h2 className="mb-3 text-[1.6rem] sm:text-[1.9rem] font-semibold text-purple-200">
            One-click gasless protection for every transaction.
          </h2>
          <p className="mb-7 text-sm sm:text-[0.92rem] text-purple-200/70 leading-relaxed">
            Your users sign a single intent; Strills routes transfers, swaps, and contract calls
            through a dedicated relayer that pays FLR gas on-chain and settles protocol fees in
            tokens they already hold.
          </p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.06 },
              },
            }}
            className="mb-4 grid gap-4 rounded-2xl bg-[rgba(17,24,39,0.88)] p-4 text-left text-sm text-purple-100 sm:grid-cols-2"
          >
            <motion.ul
              variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
              className="space-y-2"
            >
              <li className="text-[11px] font-medium uppercase tracking-[0.18em] text-purple-300/80">
                Fee Tokens
              </li>
              {["USDT", "FXRP", "WFLR"].map((label) => (
                <motion.li
                  key={label}
                  variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0 } }}
                  className="flex items-center gap-2 text-[12px] text-purple-100/90"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400/80" />
                  <span className="uppercase tracking-[0.16em]">{label}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.ul
              variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
              className="space-y-2"
            >
              <li className="text-[11px] font-medium uppercase tracking-[0.18em] text-purple-300/80">
                Flow
              </li>
              {[
                "EIP‑712 intents",
                "Relayer pays gas",
                "Transfers & swaps · single signature",
                "Any contract call · non‑custodial wallet",
              ].map((label) => (
                <motion.li
                  key={label}
                  variants={{ hidden: { opacity: 0, x: 6 }, show: { opacity: 1, x: 0 } }}
                  className="flex items-center gap-2 text-[12px] text-purple-100/90"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400/80" />
                  <span>{label}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
