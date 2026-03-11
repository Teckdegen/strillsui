"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

/* ── constants ── */
const TEXT1 = "Zero Gas.";
const TEXT2 = "Full Control.";
const TOTAL  = TEXT1.length + TEXT2.length;
const TYPE_SPEED  = 60;
const ERASE_SPEED = 28;
const HOLD_MS     = 2800;

/* ── 3 token nodes only ── */
const nodes = [
  {
    id: "usdt",  label: "USDT",   sub: "fee token", x: 10, y: 10, delay: 0,
    img: "https://image2url.com/r2/default/images/1773134129636-2335aa43-ef63-47e9-8fad-12349e820c38.png",
  },
  {
    id: "fxrp",  label: "FXRP",   sub: "fee token", x: 88, y: 10, delay: 0.2,
    img: "https://image2url.com/r2/default/images/1773134218523-49b58045-951e-4ad2-9ab5-1cc0897fad86.jpg",
  },
  {
    id: "wflr",  label: "WC2FLR", sub: "fee token", x: 50, y: 85, delay: 0.4,
    img: "https://image2url.com/r2/default/images/1773134181553-4b674bcc-3bf6-412b-bf4e-dfa755bbeeb6.png",
  },
];

/* ── animated SVG line ── */
function Line({ x1, y1, x2, y2, delay = 0 }: { x1: number; y1: number; x2: number; y2: number; delay?: number }) {
  return (
    <svg className="pointer-events-none absolute inset-0 w-full h-full">
      <line
        x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
        stroke="rgba(34,197,94,0.08)" strokeWidth="1" strokeDasharray="4 10"
      />
      <motion.line
        x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
        stroke="rgba(74,222,128,0.38)" strokeWidth="1.5"
        strokeDasharray="14 120" strokeLinecap="round"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -140 }}
        transition={{ duration: 2.8 + delay, repeat: Infinity, ease: "linear", delay }}
      />
    </svg>
  );
}

/* ── floating token node ── */
function TokenNode({ label, sub, x, y, delay, img }: {
  label: string; sub: string; x: number; y: number; delay: number; img: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.6 + delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ left: `${x}%`, top: `${y}%` }}
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4 + delay * 0.7, repeat: Infinity, ease: "easeInOut", delay }}
        className="flex flex-col items-center gap-2"
      >
        <div className="relative">
          <div className="w-11 h-11 rounded-full border border-green-500/25 overflow-hidden shadow-[0_0_28px_rgba(34,197,94,0.28)] bg-[#0a1209]">
            <img src={img} alt={label} className="w-full h-full object-cover rounded-full" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.9], opacity: [0.35, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay }}
            className="absolute inset-0 rounded-full border border-green-400/20"
          />
        </div>
        <div className="text-center">
          <div className="text-[11px] font-semibold text-white/78 tracking-wide leading-none">{label}</div>
          <div className="text-[8px] text-green-400/50 tracking-[0.15em] uppercase mt-0.5">{sub}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── blinking cursor ── */
function Cursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
      className="inline-block w-[3px] h-[0.82em] bg-green-400 rounded-sm align-middle ml-1.5 translate-y-[-0.06em]"
    />
  );
}

/* ── main component ── */
export default function Hero() {
  const [count, setCount]       = useState(0);
  const [phase, setPhase]       = useState<"typing" | "holding" | "erasing" | "resetting">("typing");
  const [hovered, setHovered]   = useState(false);

  /* state machine */
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (count < TOTAL) {
        timer = setTimeout(() => setCount((c) => c + 1), TYPE_SPEED);
      } else {
        setPhase("holding");
      }
    }

    if (phase === "holding") {
      timer = setTimeout(() => setPhase("erasing"), HOLD_MS);
    }

    if (phase === "erasing") {
      if (count > 0) {
        timer = setTimeout(() => setCount((c) => c - 1), ERASE_SPEED);
      } else {
        setPhase("resetting");
      }
    }

    if (phase === "resetting") {
      timer = setTimeout(() => setPhase("typing"), 320);
    }

    return () => clearTimeout(timer);
  }, [count, phase]);

  /* derive display strings */
  const chars1 = Math.min(count, TEXT1.length);
  const chars2 = Math.max(0, count - TEXT1.length);
  const showCursor = phase === "typing" || phase === "erasing";
  const cursorOnLine2 = count > TEXT1.length;

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#080808]">

      {/* bg glows */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.28, 0.55, 0.28] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(34,197,94,0.16) 0%, transparent 60%)" }}
        />
        <div className="absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-green-900/10 blur-3xl" />
        <div className="absolute -right-40 bottom-1/3 h-80 w-80 rounded-full bg-green-900/8 blur-3xl" />
        {[...Array(32)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.1, 0.5, 0.1] }}
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

      {/* lines — only 3 */}
      <div className="pointer-events-none absolute inset-0">
        <Line x1={10} y1={10} x2={50} y2={50} delay={0} />
        <Line x1={88} y1={10} x2={50} y2={50} delay={0.6} />
        <Line x1={50} y1={85} x2={50} y2={50} delay={1.2} />
      </div>

      {/* floating nodes */}
      {nodes.map((n) => <TokenNode key={n.id} {...n} />)}

      {/* center content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center px-6">

        {/* badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-green-500/20 bg-green-500/[0.07] px-4 py-1.5 text-[10px] tracking-[0.22em] text-green-300/70 uppercase"
        >
          <motion.span
            animate={{ opacity: [1, 0.15, 1] }}
            transition={{ duration: 1.7, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"
          />
          Live on Flare Coston2
        </motion.div>

        {/* looping typewriter headline */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[3rem] sm:text-[4.8rem] md:text-[6rem] font-black leading-[1.08] tracking-[-0.035em]"
          style={{ fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif", minHeight: "2.2em" }}
        >
          {/* line 1 — white */}
          <div className="block text-white">
            {TEXT1.slice(0, chars1)}
            {showCursor && !cursorOnLine2 && <Cursor />}
          </div>

          {/* line 2 — green gradient */}
          <div
            className="block"
            style={{
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 45%, #4ade80 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: chars2 > 0 ? "transparent" : "initial",
              backgroundClip: "text",
              minHeight: "1em",
            }}
          >
            {TEXT2.slice(0, chars2)}
            {showCursor && cursorOnLine2 && <Cursor />}
          </div>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-6 max-w-xs text-sm text-white/35 leading-[1.9]"
        >
          Send, swap, call — without FLR.
          <br />Pay in USDT, FXRP, or WC2FLR.
        </motion.p>

        {/* single CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mt-10"
        >
          <Link
            href="/docs"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-green-700 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_32px_rgba(34,197,94,0.35)] transition-all duration-300 hover:shadow-[0_0_55px_rgba(34,197,94,0.60)] hover:scale-[1.03]"
          >
            <span className="relative z-10">Open Docs</span>
            <motion.span
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.18 }}
              className="relative z-10 text-green-200"
            >
              →
            </motion.span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>

        {/* flow hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="mt-16 flex items-center gap-3 text-[9px] uppercase tracking-[0.24em] text-white/18"
        >
          {["Sign EIP-712", "→", "Relayer sends", "→", "Fee deducted"].map((s, i) => (
            <motion.span
              key={i}
              animate={s !== "→" ? { opacity: [0.18, 0.55, 0.18] } : {}}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }}
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
        className="absolute bottom-8 left-8 flex items-center gap-2.5 text-[9px] uppercase tracking-[0.22em] text-white/18"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-5 h-5 rounded-full border border-white/12 flex items-center justify-center"
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
        <div className="text-[9px] uppercase tracking-[0.28em] text-white/14">Gasless Layer</div>
        <div className="mt-1.5 w-8 h-px bg-green-500/20 ml-auto" />
      </motion.div>
    </section>
  );
}
