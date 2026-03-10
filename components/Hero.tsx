"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const nodes = [
  { id: "usdt",  label: "USDT",   sub: "fee token",     x: 16,  y: 26, delay: 0 },
  { id: "fxrp",  label: "FXRP",   sub: "fee token",     x: 78,  y: 20, delay: 0.15 },
  { id: "wflr",  label: "WC2FLR", sub: "fee token",     x: 12,  y: 67, delay: 0.3 },
  { id: "flr",   label: "FLR",    sub: "gas · relayer", x: 80,  y: 70, delay: 0.45 },
];

function Line({ x1, y1, x2, y2, delay = 0 }: { x1: number; y1: number; x2: number; y2: number; delay?: number }) {
  return (
    <svg className="pointer-events-none absolute inset-0 w-full h-full">
      <line
        x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
        stroke="rgba(139,92,246,0.13)" strokeWidth="1" strokeDasharray="5 9"
      />
      <motion.line
        x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
        stroke="rgba(167,139,250,0.5)" strokeWidth="1.5"
        strokeDasharray="16 110" strokeLinecap="round"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -130 }}
        transition={{ duration: 2.8 + delay, repeat: Infinity, ease: "linear", delay }}
      />
    </svg>
  );
}

function TokenNode({ label, sub, x, y, delay }: { label: string; sub: string; x: number; y: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.5 + delay, ease: "easeOut" }}
      style={{ left: `${x}%`, top: `${y}%` }}
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 3.8 + delay * 0.5, repeat: Infinity, ease: "easeInOut", delay }}
        className="flex flex-col items-center gap-1.5"
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-[#0d0719] border border-purple-500/30 flex items-center justify-center shadow-[0_0_24px_rgba(139,92,246,0.28)]">
            <span className="text-[9px] font-bold text-purple-300 tracking-tight">
              {label === "WC2FLR" ? "WFL" : label}
            </span>
          </div>
          <motion.div
            animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay }}
            className="absolute inset-0 rounded-full border border-purple-400/25"
          />
        </div>
        <div className="text-center">
          <div className="text-[11px] font-semibold text-white/75 tracking-wide">{label}</div>
          <div className="text-[9px] text-purple-400/55 tracking-wider uppercase">{sub}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#06030f]">

      {/* bg glows */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(109,40,217,0.26) 0%, transparent 60%)" }}
        />
        <div className="absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-purple-900/15 blur-3xl" />
        <div className="absolute -right-40 bottom-1/3 h-80 w-80 rounded-full bg-violet-900/12 blur-3xl" />
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: 2.5 + (i % 4), repeat: Infinity, delay: (i * 0.28) % 3.5 }}
            className="absolute w-px h-px rounded-full bg-white/70"
            style={{ left: `${(i * 37 + 11) % 100}%`, top: `${(i * 53 + 7) % 100}%` }}
          />
        ))}
      </div>

      {/* connection lines */}
      <div className="pointer-events-none absolute inset-0">
        <Line x1={16} y1={26} x2={50} y2={50} delay={0} />
        <Line x1={78} y1={20} x2={50} y2={50} delay={0.5} />
        <Line x1={12} y1={67} x2={50} y2={50} delay={1} />
        <Line x1={80} y1={70} x2={50} y2={50} delay={1.5} />
      </div>

      {/* floating nodes */}
      {nodes.map((n) => <TokenNode key={n.id} {...n} />)}

      {/* center content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-purple-500/20 bg-purple-500/7 px-4 py-1.5 text-[10px] tracking-[0.22em] text-purple-300/75 uppercase"
        >
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block"
          />
          Live on Flare Coston2
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-[3rem] sm:text-[4.5rem] md:text-[5.8rem] font-black leading-[1.02] tracking-[-0.035em] text-white"
        >
          Zero Gas.
          <br />
          <span style={{
            background: "linear-gradient(135deg, #c084fc 0%, #7c3aed 45%, #a78bfa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Full Control.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-6 max-w-sm text-sm text-white/38 leading-loose"
        >
          Send tokens, swap on-chain, call contracts — without holding FLR.
          Pay fees in USDT, FXRP, or WC2FLR.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex items-center gap-3"
        >
          <Link
            href="/docs"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-purple-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_0_32px_rgba(124,58,237,0.42)] transition-all duration-300 hover:shadow-[0_0_52px_rgba(124,58,237,0.68)] hover:scale-[1.03]"
          >
            <span className="relative z-10">Open Docs</span>
            <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }} className="relative z-10 text-purple-200">
              →
            </motion.span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-7 py-3 text-sm font-semibold text-white/60 backdrop-blur-sm transition-all duration-300 hover:border-white/22 hover:text-white hover:bg-white/[0.07]"
          >
            View Code
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.9 }}
          className="mt-16 flex items-center gap-3 text-[9px] uppercase tracking-[0.24em] text-white/22"
        >
          {["Sign EIP-712", "→", "Relayer sends", "→", "Fee deducted"].map((s, i) => (
            <motion.span
              key={i}
              animate={s !== "→" ? { opacity: [0.22, 0.65, 0.22] } : {}}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }}
            >
              {s}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-8 flex items-center gap-2.5 text-[9px] uppercase tracking-[0.22em] text-white/22"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-5 h-5 rounded-full border border-white/15 flex items-center justify-center"
        >
          <span className="text-[8px]">↓</span>
        </motion.div>
        01 / Scroll
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 right-8 text-right"
      >
        <div className="text-[9px] uppercase tracking-[0.28em] text-white/18">Gasless Layer</div>
        <div className="mt-1.5 w-8 h-px bg-white/12 ml-auto" />
      </motion.div>
    </section>
  );
}
