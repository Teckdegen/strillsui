"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const ROUTER = "0x658a064aE85c983869e32D478AD3B41a96982114";
const EXPLORER_API = `https://coston2-explorer.flare.network/api/v2/addresses/${ROUTER}`;
const TX_API       = `https://coston2-explorer.flare.network/api/v2/addresses/${ROUTER}/transactions?limit=5`;

interface RecentTx {
  hash: string;
  timestamp: string;
  method: string | null;
  status: string;
}

/* shorten 0xAbCd…eF12 */
function short(hash: string) {
  return `${hash.slice(0, 6)}…${hash.slice(-4)}`;
}

/* relative time */
function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60)  return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export default function Stats() {
  const [txCount, setTxCount]       = useState<number | null>(null);
  const [recent, setRecent]         = useState<RecentTx[]>([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [infoRes, txRes] = await Promise.all([
          fetch(EXPLORER_API),
          fetch(TX_API),
        ]);
        const info = await infoRes.json();
        const txData = await txRes.json();

        setTxCount(info.transaction_count ?? null);

        const items: RecentTx[] = (txData.items ?? []).map((t: {
          hash: string;
          timestamp: string;
          method?: string | null;
          status?: string;
          result?: string;
        }) => ({
          hash: t.hash,
          timestamp: t.timestamp,
          method: t.method ?? null,
          status: t.status ?? t.result ?? "ok",
        }));
        setRecent(items);
      } catch {
        // silently fail — stats are non-critical
      } finally {
        setLoading(false);
      }
    }

    load();
    const id = setInterval(load, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative py-24 px-6 bg-[#080808]">
      {/* subtle top separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />

      <div className="max-w-5xl mx-auto">

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-green-400/60 mb-3">Live on Coston2</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-[-0.02em]">
            Transactions{" "}
            <span style={{
              background: "linear-gradient(135deg, #22c55e, #4ade80)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              processed
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ── total counter card ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 flex flex-col justify-between min-h-[180px]"
          >
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/28 mb-4">Total Transactions</div>

            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-1.5 items-center"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.2, 0.8, 0.2] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      className="w-2 h-2 rounded-full bg-green-500/50"
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="count"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <span
                    className="text-[4rem] font-black leading-none tracking-tight"
                    style={{
                      background: "linear-gradient(135deg, #22c55e 0%, #4ade80 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {txCount !== null ? txCount.toLocaleString() : "—"}
                  </span>
                  <div className="mt-2 text-xs text-white/30">gasless intents executed</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* live indicator */}
            <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-green-400/50">
              <motion.div
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-green-400"
              />
              Updates every 30s
            </div>
          </motion.div>

          {/* ── recent transactions card ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-6 flex flex-col"
          >
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/28 mb-5">Recent Activity</div>

            {loading ? (
              <div className="flex-1 flex flex-col gap-3">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.08, 0.2, 0.08] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.15 }}
                    className="h-7 rounded-md bg-white/[0.06]"
                  />
                ))}
              </div>
            ) : recent.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-sm text-white/25">
                No recent transactions
              </div>
            ) : (
              <div className="flex-1 flex flex-col gap-0 divide-y divide-white/[0.04]">
                {recent.map((tx, i) => (
                  <motion.a
                    key={tx.hash}
                    href={`https://coston2-explorer.flare.network/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="group flex items-center justify-between py-2.5 hover:bg-green-500/[0.04] -mx-2 px-2 rounded-lg transition-colors duration-150"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${tx.status === "ok" ? "bg-green-400/70" : "bg-red-400/70"}`} />
                      <span className="text-xs font-mono text-white/55 group-hover:text-white/80 transition-colors">
                        {short(tx.hash)}
                      </span>
                      {tx.method && (
                        <span className="text-[9px] uppercase tracking-[0.12em] text-green-400/40 bg-green-500/[0.08] px-1.5 py-0.5 rounded-full">
                          {tx.method}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-white/25 shrink-0 ml-2">
                      {timeAgo(tx.timestamp)}
                    </span>
                  </motion.a>
                ))}
              </div>
            )}

            <a
              href={`https://coston2-explorer.flare.network/address/${ROUTER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 pt-4 border-t border-white/[0.05] text-[10px] uppercase tracking-[0.18em] text-white/22 hover:text-green-400/60 transition-colors"
            >
              View all on explorer →
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
