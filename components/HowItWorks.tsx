"use client";

import { motion } from "framer-motion";

const steps = [
  { n: "01", title: "Sign Off-Chain",        sub: "EIP-712 typed data", desc: "You sign an intent in your wallet. No on-chain tx, no gas. Takes under a second." },
  { n: "02", title: "Relayer Submits",        sub: "Relayer pays FLR",   desc: "The relayer picks up your intent, pays the gas, and submits the transaction on-chain." },
  { n: "03", title: "Fee Auto-Deducted",      sub: "Token of choice",    desc: "The contract verifies your signature, pulls the fee in USDT, FXRP, or WC2FLR, and executes." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 px-6 overflow-hidden bg-[#06030f]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[700px] rounded-full bg-purple-900/10 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-purple-400/60 mb-4">How it works</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-[-0.02em]">
            Three steps.{" "}
            <span style={{
              background: "linear-gradient(135deg, #c084fc, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Zero gas.
            </span>
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.06]">
          {steps.map(({ n, title, sub, desc }, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              whileHover={{ backgroundColor: "rgba(109,40,217,0.06)" }}
              className="group relative flex flex-col gap-5 bg-[#06030f] p-8 cursor-default transition-colors duration-300"
            >
              {/* number */}
              <span className="text-[4rem] font-black text-white/[0.04] leading-none select-none group-hover:text-purple-600/15 transition-colors duration-500">
                {n}
              </span>

              {/* active line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/0 to-transparent group-hover:via-purple-500/50 transition-all duration-500" />

              <div>
                <div className="text-base font-bold text-white mb-1">{title}</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-purple-400/55 mb-3">{sub}</div>
                <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
