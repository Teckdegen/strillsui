"use client";

import { motion, useAnimate, stagger } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

/* ── token nodes ── */
const nodes = [
  {
    id: "usdt",
    label: "USDT",
    sub: "fee token",
    x: 16, y: 26,
    delay: 0,
    img: "https://image2url.com/r2/default/images/1773134129636-2335aa43-ef63-47e9-8fad-12349e820c38.png",
  },
  {
    id: "fxrp",
    label: "FXRP",
    sub: "fee token",
    x: 78, y: 20,
    delay: 0.15,
    img: "https://image2url.com/r2/default/images/1773134218523-49b58045-951e-4ad2-9ab5-1cc0897fad86.jpg",
  },
  {
    id: "wflr",
    label: "WC2FLR",
    sub: "fee token",
    x: 12, y: 67,
    delay: 0.3,
    img: "https://image2url.com/r2/default/images/1773134181553-4b674bcc-3bf6-412b-bf4e-dfa755bbeeb6.png",
  },
  {
    id: "flr",
    label: "FLR",
    sub: "gas · relayer",
    x: 80, y: 70,
    delay: 0.45,
    img: null, // no icon provided — gradient fallback
  },
];

/* ── animated SVG connection line ── */
function Line({ x1, y1, x2, y2, delay = 0 }: { x1: number; y1: number; x2: number; y2: number; delay?: number }) {
  return (
    <svg className="pointer-events-none absolute inset-0 w-full h-full">
      <line
        x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
        stroke="rgba(139,92,246,0.12)" strokeWidth="1" strokeDasharray="4 10"
      />
      <motion.line
        x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
        stroke="rgba(167,139,250,0.48)" strokeWidth="1.5"
        strokeDasharray="14 110" strokeLinecap="round"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -130 }}
        transition={{ duration: 2.8 + delay, repeat: Infinity, ease: "linear", delay }}
      />
    </svg>
  );
}

/* ── single floating token node ── */
function TokenNode({ label, sub, x, y, delay, img }: { label: string; sub: string; x: number; y: number; delay: number; img: string | null }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.5 + delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ left: `${x}%`, top: `${y}%` }}
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4 + delay * 0.6, repeat: Infinity, ease: "easeInOut", delay }}
        className="flex flex-col items-center gap-2"
      >
        {/* icon circle */}
        <div className="relative">
          <div className="w-11 h-11 rounded-full border border-purple-500/25 overflow-hidden shadow-[0_0_28px_rgba(139,92,246,0.32)] bg-[#0d0719]">
            {img ? (
              <img
                src={img}
                alt={label}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #4c1d95, #7c3aed)" }}>
                <span className="text-[9px] font-bold text-white tracking-tight">FLR</span>
              </div>
            )}
          </div>
          {/* pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.9], opacity: [0.38, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay }}
            className="absolute inset-0 rounded-full border border-purple-400/22"
          />
        </div>

        {/* label */}
        <div className="text-center">
          <div className="text-[11px] font-semibold text-white/80 tracking-wide leading-none">{label}</div>
          <div className="text-[8px] text-purple-400/50 tracking-[0.15em] uppercase mt-0.5">{sub}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── typewriter component ── */
function TypeWriter({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.045 } },
        hidden: {},
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.18, ease: "easeOut" } },
          }}
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ── blinking cursor ── */
function Cursor({ delay }: { delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0, 1, 1, 1, 0] }}
      transition={{ duration: 0.9, delay, repeat: 4, ease: "linear" }}
      className="inline-block w-[3px] h-[0.85em] bg-purple-400 rounded-full align-middle ml-1 translate-y-[-0.05em]"
    />
  );
}

export default function Hero() {
  const [hovered, setHovered] = useState(false);

  // line 1 ≈ 9 chars × 0.045s = 0.4s + 0.35 initial = 0.75s
  // line 2 ≈ 12 chars × 0.045s = 0.54s, starts after line 1 + gap
  const line2Delay = 0.35 + 9 * 0.045 + 0.15;

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#06030f]">

      {/* bg glows */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.72, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(109,40,217,0.24) 0%, transparent 60%)" }}
        />
        <div className="absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-purple-900/14 blur-3xl" />
        <div className="absolute -right-40 bottom-1/3 h-80 w-80 rounded-full bg-violet-900/10 blur-3xl" />
        {/* star field */}
        {[...Array(32)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.1, 0.55, 0.1] }}
            transition={{ duration: 2.5 + (i % 5), repeat: Infinity, delay: (i * 0.27) % 3.8 }}
            className="absolute rounded-full bg-white/70"
            style={{
              width: i % 5 === 0 ? "2px" : "1px",
              height: i % 5 === 0 ? "2px" : "1px",
              left: `${(i * 37 + 11) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
            }}
          />
        ))}
      </div>

      {/* connection lines */}
      <div className="pointer-events-none absolute inset-0">
        <Line x1={16} y1={26} x2={50} y2={50} delay={0} />
        <Line x1={78} y1={20} x2={50} y2={50} delay={0.6} />
        <Line x1={12} y1={67} x2={50} y2={50} delay={1.1} />
        <Line x1={80} y1={70} x2={50} y2={50} delay={1.6} />
      </div>

      {/* floating nodes */}
      {nodes.map((n) => <TokenNode key={n.id} {...n} />)}

      {/* center content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center px-6">

        {/* pill badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-purple-500/20 bg-purple-500/7 px-4 py-1.5 text-[10px] tracking-[0.22em] text-purple-300/70 uppercase"
        >
          <motion.span
            animate={{ opacity: [1, 0.15, 1] }}
            transition={{ duration: 1.7, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block"
          />
          Live on Flare Coston2
        </motion.div>

        {/* headline — typewriter effect */}
        <h1
          className="text-[3rem] sm:text-[4.8rem] md:text-[6rem] font-black leading-[1.0] tracking-[-0.035em] text-white"
          style={{ fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <TypeWriter text="Zero Gas." className="text-white" />
            <Cursor delay={0.3 + 9 * 0.045} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: line2Delay }}
          >
            <TypeWriter
              text="Full Control."
              className=""
            />
            <Cursor delay={line2Delay + 13 * 0.045} />
          </motion.div>
        </h1>

        {/* gradient overlay on "Full Control." */}
        <style jsx global>{`
          .hero-gradient-line {
            background: linear-gradient(135deg, #c084fc 0%, #7c3aed 45%, #a78bfa 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        `}</style>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: line2Delay + 13 * 0.045 + 0.5 }}
          className="mt-6 max-w-xs text-sm text-white/36 leading-[1.9]"
        >
          Send, swap, call — without FLR.
          <br />Pay in USDT, FXRP, or WC2FLR.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: line2Delay + 13 * 0.045 + 0.75 }}
          className="mt-10 flex items-center gap-3"
        >
          <Link
            href="/docs"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-purple-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_0_32px_rgba(124,58,237,0.42)] transition-all duration-300 hover:shadow-[0_0_52px_rgba(124,58,237,0.7)] hover:scale-[1.03]"
          >
            <span className="relative z-10">Open Docs</span>
            <motion.span
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.18 }}
              className="relative z-10 text-purple-200"
            >
              →
            </motion.span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-7 py-3 text-sm font-semibold text-white/55 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:text-white hover:bg-white/[0.07]"
          >
            View Code
          </a>
        </motion.div>

        {/* flow hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: line2Delay + 13 * 0.045 + 1.2 }}
          className="mt-16 flex items-center gap-3 text-[9px] uppercase tracking-[0.24em] text-white/20"
        >
          {["Sign EIP-712", "→", "Relayer sends", "→", "Fee deducted"].map((s, i) => (
            <motion.span
              key={i}
              animate={s !== "→" ? { opacity: [0.2, 0.6, 0.2] } : {}}
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
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-8 flex items-center gap-2.5 text-[9px] uppercase tracking-[0.22em] text-white/20"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-5 h-5 rounded-full border border-white/14 flex items-center justify-center"
        >
          <span className="text-[8px]">↓</span>
        </motion.div>
        01 / Scroll
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 right-8 text-right"
      >
        <div className="text-[9px] uppercase tracking-[0.28em] text-white/16">Gasless Layer</div>
        <div className="mt-1.5 w-8 h-px bg-white/10 ml-auto" />
      </motion.div>
    </section>
  );
}
