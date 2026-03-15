"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const RPC    = "https://coston2-api.flare.network/ext/bc/C/rpc";
const ROUTER = "0x1214ccD861f187aB017F20617C602638B125689B";

// Coston2 ~1s block time → 7 days ≈ 604 800 blocks
const BLOCKS_7D = 604_800;

let _id = 0;
async function rpc<T>(method: string, params: unknown[]): Promise<T> {
  const r = await fetch(RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: ++_id, method, params }),
  });
  const d = await r.json();
  if (d.error) throw new Error(d.error.message);
  return d.result as T;
}

interface RawLog { transactionHash: string; blockNumber: string; }

// Divide-and-conquer: handles any RPC block-range limit automatically
async function countTxsInRange(from: number, to: number, depth = 0): Promise<number> {
  if (from > to || depth > 24) return 0;
  try {
    const logs = await rpc<RawLog[]>("eth_getLogs", [{
      address: ROUTER,
      fromBlock: `0x${from.toString(16)}`,
      toBlock:   `0x${to.toString(16)}`,
    }]);
    return new Set((logs ?? []).map(l => l.transactionHash)).size;
  } catch {
    if (from >= to) return 0;
    const mid = Math.floor((from + to) / 2);
    const [l, r] = await Promise.all([
      countTxsInRange(from,     mid, depth + 1),
      countTxsInRange(mid + 1,  to,  depth + 1),
    ]);
    return l + r;
  }
}

interface Tx {
  hash: string;
  from: string;
  timestamp: string;
  method: string | null;
  status: string;
}

async function fetchRouterData(): Promise<{ feed: Tx[]; sevenDayCount: number }> {
  // Current block
  const currentHex = await rpc<string>("eth_blockNumber", []);
  const current    = parseInt(currentHex, 16);
  const from7d     = Math.max(0, current - BLOCKS_7D);
  const fromFeed   = Math.max(0, current - 10_000); // ~last 2-3 hrs for feed

  // Run 7-day count + feed logs in parallel
  const [sevenDayCount, feedLogs] = await Promise.all([
    countTxsInRange(from7d, current),
    rpc<RawLog[]>("eth_getLogs", [{
      address:   ROUTER,
      fromBlock: `0x${fromFeed.toString(16)}`,
      toBlock:   "latest",
    }]).catch(() => [] as RawLog[]),
  ]);

  // Deduplicate feed logs → 5 most recent unique txHashes
  const seen    = new Set<string>();
  const hashes: string[] = [];
  for (const log of [...(feedLogs ?? [])].reverse()) {
    if (!seen.has(log.transactionHash)) {
      seen.add(log.transactionHash);
      hashes.push(log.transactionHash);
      if (hashes.length >= 5) break;
    }
  }

  // Fetch tx + receipt in parallel for all 5
  const pairs = await Promise.all(
    hashes.map(hash =>
      Promise.all([
        rpc<{ from: string; input: string; hash: string }>(
          "eth_getTransactionByHash", [hash]
        ),
        rpc<{ status: string; blockNumber: string }>(
          "eth_getTransactionReceipt", [hash]
        ),
      ]).catch(() => null)
    )
  );

  // Collect unique block numbers, fetch them all at once
  const blockNums = [...new Set(
    pairs.filter(Boolean).map(p => p![1].blockNumber)
  )];
  const blockMap: Record<string, { timestamp: string }> = {};
  await Promise.all(
    blockNums.map(async bn => {
      const b = await rpc<{ timestamp: string }>(
        "eth_getBlockByNumber", [bn, false]
      ).catch(() => null);
      if (b) blockMap[bn] = b;
    })
  );

  // Build feed items
  const feed: Tx[] = pairs
    .filter(Boolean)
    .map(p => {
      const [tx, receipt] = p!;
      const block = blockMap[receipt.blockNumber];
      const ts    = block
        ? new Date(parseInt(block.timestamp, 16) * 1000).toISOString()
        : new Date().toISOString();
      const selector = tx.input?.slice(0, 10) ?? "";
      return {
        hash:      tx.hash,
        from:      tx.from,
        timestamp: ts,
        method:    selector || null,
        status:    receipt.status === "0x1" ? "ok" : "failed",
      };
    });

  return { feed, sevenDayCount };
}

// Known 4-byte selectors for the GaslessRouter
const SELECTORS: Record<string, string> = {
  "0x": "call",
};
function methodLabel(selector: string | null): string {
  if (!selector) return "execute";
  if (SELECTORS[selector]) return SELECTORS[selector];
  // generic: all router calls are executions
  return "execute";
}

const METHOD_COLORS: Record<string, string> = {
  execute:  "text-green-400/70 bg-green-500/[0.10] border-green-500/20",
  transfer: "text-green-300/70 bg-green-500/[0.08] border-green-500/15",
  swap:     "text-blue-400/70  bg-blue-500/[0.10]  border-blue-500/20",
  approve:  "text-amber-400/70 bg-amber-500/[0.10] border-amber-500/20",
  call:     "text-white/30     bg-white/[0.04]      border-white/10",
};

function short(addr: string) {
  return addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : "—";
}

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function CountUp({ target }: { target: number }) {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    if (target === prev.current) return;
    const from = prev.current;
    prev.current = target;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / 1400, 1);
      setDisplay(Math.floor(from + (1 - Math.pow(1 - p, 3)) * (target - from)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);
  return (
    <span style={{
      background: "linear-gradient(135deg,#22c55e 0%,#4ade80 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}>
      {display.toLocaleString()}
    </span>
  );
}

export default function Stats() {
  const [sevenDay, setSevenDay] = useState<number | null>(null);
  const [txs, setTxs]           = useState<Tx[]>([]);
  const [loading, setLoading]   = useState(true);
  const [pulse, setPulse]       = useState(false);
  const prevHash                = useRef("");

  async function load() {
    try {
      const { feed, sevenDayCount } = await fetchRouterData();
      setSevenDay(sevenDayCount);
      if (feed[0]?.hash && feed[0].hash !== prevHash.current) {
        prevHash.current = feed[0].hash;
        if (!loading) { setPulse(true); setTimeout(() => setPulse(false), 800); }
      }
      setTxs(feed);
    } catch { /* non-critical */ }
    finally { setLoading(false); }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 15_000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative py-24 px-6 bg-[#080808]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />

      <div className="max-w-3xl mx-auto">

        {/* ── 7-day count ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}
          className="mb-12 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-green-400/60 mb-4">Past 7 days</p>
          <div className="text-[4.5rem] sm:text-[6rem] font-black leading-none tracking-tight mb-3">
            {sevenDay === null ? <span className="text-white/10">—</span> : <CountUp target={sevenDay} />}
          </div>
          <p className="text-sm text-white/30 tracking-wide">gasless transactions processed</p>
          <div className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/20">
            <motion.div
              animate={pulse ? { scale: [1,1.8,1], opacity: [1,0.4,1] } : { opacity: [1,0.3,1] }}
              transition={pulse ? { duration: 0.5 } : { duration: 1.8, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-green-400"
            />
            Live · updates every 15s
          </div>
        </motion.div>

        {/* ── feed ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/28">Recent activity</span>
            <div className="flex items-center gap-1.5 text-[10px] text-green-400/50">
              <motion.div animate={{ opacity:[1,0.25,1] }} transition={{ duration:1.6, repeat:Infinity }}
                className="w-1 h-1 rounded-full bg-green-400" />
              Live
            </div>
          </div>

          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-2.5 border-b border-white/[0.04] text-[9px] uppercase tracking-[0.18em] text-white/18">
            <span>Tx Hash</span>
            <span className="text-right">From</span>
            <span className="text-right">Type</span>
            <span className="text-right">Time</span>
          </div>

          {loading ? (
            <div className="flex flex-col divide-y divide-white/[0.03]">
              {[...Array(5)].map((_, i) => (
                <motion.div key={i}
                  animate={{ opacity:[0.05,0.12,0.05] }}
                  transition={{ duration:1.6, repeat:Infinity, delay: i * 0.12 }}
                  className="h-12 mx-5 my-1.5 rounded-lg bg-white/[0.05]"
                />
              ))}
            </div>
          ) : txs.length === 0 ? (
            <div className="py-16 text-center text-sm text-white/25">No transactions yet</div>
          ) : (
            <AnimatePresence initial={false}>
              {txs.map((tx, i) => {
                const label = methodLabel(tx.method);
                const color = METHOD_COLORS[label] ?? METHOD_COLORS.call;
                const ok    = tx.status === "ok";
                return (
                  <motion.a key={tx.hash}
                    href={`https://coston2-explorer.flare.network/tx/${tx.hash}`}
                    target="_blank" rel="noopener noreferrer"
                    initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
                    transition={{ duration:0.3, delay: i * 0.04 }}
                    className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-5 py-3.5 border-b border-white/[0.04] last:border-0 hover:bg-green-500/[0.04] transition-colors duration-150 group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${ok ? "bg-green-400/65" : "bg-red-400/65"}`} />
                      <span className="text-xs font-mono text-white/50 group-hover:text-white/80 transition-colors truncate">
                        {short(tx.hash)}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-white/28 text-right">{short(tx.from)}</span>
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

          <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.05] bg-white/[0.01]">
            <span className="text-[10px] text-white/15">Coston2 testnet</span>
            <a href={`https://coston2-explorer.flare.network/address/${ROUTER}`}
              target="_blank" rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-[0.16em] text-white/20 hover:text-green-400/60 transition-colors">
              View all →
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
