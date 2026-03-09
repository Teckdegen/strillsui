"use client";

import { motion } from "framer-motion";
import { PenLine, Radio, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: PenLine,
    title: "You Sign Off-Chain",
    description:
      "You sign a typed intent in your wallet — no on-chain tx, no gas needed. It takes under a second.",
    detail: "EIP-712 signature",
  },
  {
    number: "02",
    icon: Radio,
    title: "Relayer Submits",
    description:
      "Our relayer picks up your signed intent, pays the FLR gas, and submits the transaction to Flare on your behalf.",
    detail: "Relayer pays gas",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Done — Fee Auto-Deducted",
    description:
      "The contract executes your intent, pulls the protocol fee from your wallet in USDT, FXRP, or WFLR, and emits an on-chain event.",
    detail: "Fee in your token",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 px-6 overflow-hidden">
      {/* Section orb */}
      <div className="orb w-[500px] h-[500px] bg-purple-800 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="token-badge mb-4 inline-block">How It Works</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Three steps.{" "}
            <span className="gradient-text">Zero gas.</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            From sign to settled — the whole flow happens in seconds.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector lines */}
          <div className="hidden md:block absolute top-[4.5rem] left-[33%] w-[34%] h-px bg-gradient-to-r from-purple-600/40 via-purple-400/60 to-purple-600/40" />
          <div className="hidden md:block absolute top-[4.5rem] left-[66%] w-[34%] h-px bg-gradient-to-r from-purple-600/40 via-purple-400/60 to-purple-600/40" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="glass-card p-8 flex flex-col gap-5 group cursor-default"
              >
                {/* Number + Icon */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-600/30 flex items-center justify-center group-hover:bg-purple-600/30 group-hover:border-purple-500/50 transition-all duration-300">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="text-4xl font-black text-white/10 group-hover:text-purple-600/30 transition-colors duration-300">
                    {step.number}
                  </span>
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
                </div>

                {/* Detail badge */}
                <div className="mt-auto">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1">
                    <div className="w-1 h-1 rounded-full bg-purple-400" />
                    {step.detail}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
