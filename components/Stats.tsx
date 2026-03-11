"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const ROUTER      = "0x658a064aE85c983869e32D478AD3B41a96982114";
const ADDR_API    = `https://coston2-explorer.flare.network/api/v2/addresses/${ROUTER}`;
const TX_API      = `https://coston2-explorer.flare.network/api/v2/addresses/${ROUTER}/transactions?limit=10`;

interface Tx {
  hash: string;
  timestamp: string;
  method: string | null;
  status: string;
  from: string;
}

function short(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60)   return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

function methodLabel(raw: string | null): string {
  if (!raw) return "call";
  const m = raw.toLowerCase();
  if (m.includes("transfer")) return "transfer";
  if (m.includes("swap"))     return "swap";
  if (m.includes("execute"))  return "execute";
  if (m.includes("approve"))  return "approve";
  return raw.length > 12 ? raw.slice(0, 12) : raw;
}

const METHOD_COLORS: Record<string, string> = {
  transfer: "text-green-400/70 bg-green-500/[0.10] border-green-500/20",
  swap:     "text-blue-400/70  bg-blue-500/[0.10]  border-blue-500/20",
  execute:  "text-green-300/70 bg-green-500/[0.08] border-green-500/15",
  approve:  "text-amber-400/70 bg-amber-500/[0.10] border-amber-500/20",
  call:     "text-white/30     bg-white/[0.04]      border-white/10",
};

function methodColor(label: string) {
  return METHOD_COLORS[label] ?? METHOD_COLORS.call;
}

/* ── animated number counter ── */
function CountUp({ target }: { target: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (target === 0) return;
    const duration = 1400;
    const start    = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);

  return (
    <span
      style={{
        background: "linear-gradient(135deg, #22c55e 0%, #4ade80 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {display.toLocaleString()}
    </span>
  );
}

export default function Stats() {
  const [txCount, setTxCount] = useState<number | null>(null);
  const [txs, setTxs]         = useState<Tx[]>([]);
  const [loading, setLoading] = useState(true);
  const [pulse, setPulse]     = useState(false);
  const prevHashRef           = useRef<string>("");

  async function load() {
    try {
      const [infoRes, txRes] = await Promise.all([
        fetch(ADDR_API),
        fetch(TX_API),
      ]);
      const info   = await infoRes.json();
      const txData = await txRes.json();

      setTxCount(info.transaction_count ?? null);

      const items: Tx[] = (txData.items ?? []).map((t: {
        hash: string;
        timestamp: string;
        method?: string | null;
        status?: string;
        result?: string;
        from?: { hash: string };
      }) => ({
        hash:      t.hash,
        timestamp: t.timestamp,
        method:    t.method ?? null,
        status:    t.status ?? t.result ?? "ok",
        from:      t.from?.hash ?? "",
      }));

      if (items[0]?.hash && items[0].hash !== prevHashRef.current) {
        prevHashRef.current = items[0].hash;
        if (!loading) { setPulse(true); setTimeout(() => setPulse(false), 800); }
      }

      setTxs(items);
    } catch {
      // non-critical
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 20_000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative py-24 px-6 bg-[#080808]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />

      <div className="max-w-3xl mx-auto">

        {/* ── total count banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-green-400/60 mb-4">All time</p>

          <div className="text-[4.5rem] sm:text-[6rem] font-black leading-none tracking-tight mb-3">
            {txCount === null ? (
              <span className="text-white/10">—</span>
            ) : (
              <CountUp target={txCount} />
            )}
          </div>

          <p className="text-sm text-white/30 tracking-wide">
            gasless transactions processed so far
          </p>

          {/* live dot */}
          <div className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/20">
            <motion.div
              animate={pulse
                ? { scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }
                : { opacity: [1, 0.3, 1] }
              }
              transition={pulse ? { duration: 0.5 } : { duration: 1.8, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-green-400"
            />
            Live · updates every 20s
          </div>
        </motion.div>

        {/* ── recent activity feed ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card overflow-hidden"
        >
          {/* header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/28">Recent activity</span>
            <div className="flex items-center gap-1.5 text-[10px] text-green-400/50">
              <motion.div
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="w-1 h-1 rounded-full bg-green-400"
              />
              Live
            </div>
          </div>

          {/* column headers */}
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-2.5 border-b border-white/[0.04] text-[9px] uppercase tracking-[0.18em] text-white/18">
            <span>Tx Hash</span>
            <span className="text-right">From</span>
            <span className="text-right">Type</span>
            <span className="text-right">Time</span>
          </div>

          {/* rows */}
          {loading ? (
            <div className="flex flex-col divide-y divide-white/[0.03]">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.05, 0.12, 0.05] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.12 }}
                  className="h-12 mx-5 my-1.5 rounded-lg bg-white/[0.05]"
                />
              ))}
            </div>
          ) : txs.length === 0 ? (
            <div className="py-16 text-center text-sm text-white/25">
              No transactions yet
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {txs.map((tx, i) => {
                const label = methodLabel(tx.method);
                const color = methodColor(label);
                const ok    = tx.status === "ok" || tx.status === "1" || tx.status === "success";
                return (
                  <motion.a
                    key={tx.hash}
                    href={`https://coston2-explorer.flare.network/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-5 py-3.5 border-b border-white/[0.04] last:border-0 hover:bg-green-500/[0.04] transition-colors duration-150 group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${ok ? "bg-green-400/65" : "bg-red-400/65"}`} />
                      <span className="text-xs font-mono text-white/50 group-hover:text-white/80 transition-colors truncate">
                        {short(tx.hash)}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-white/28 text-right">
                      {tx.from ? short(tx.from) : "—"}
                    </span>
                    <span className={`text-[9px] uppercase tracking-[0.12em] font-semibold px-2 py-0.5 rounded-full border ${color} whitespace-nowrap`}>
                      {label}
                    </span>
                    <span className="text-[11px] text-white/20 text-right whitespace-nowrap">
                      {timeAgo(tx.timestamp)}
                    </span>
                  </motion.a>
                );
              })}
            </AnimatePresence>
          )}

          {/* footer */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.05] bg-white/[0.01]">
            <span className="text-[10px] text-white/15">Coston2 testnet</span>
            <a
              href={`https://coston2-explorer.flare.network/address/${ROUTER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-[0.16em] text-white/20 hover:text-green-400/60 transition-colors"
            >
              View all →
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
