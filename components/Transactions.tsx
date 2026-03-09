"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Send, ArrowLeftRight, FileCode2, Wallet, Fuel, ArrowRight } from "lucide-react";

const txns = [
  {
    icon: Send,
    title: "ERC20 Transfer",
    description:
      "Send USDT, FXRP, WFLR, or any ERC20 token to any address on Flare — no FLR in your wallet required.",
    tags: ["USDT", "FXRP", "Any ERC20"],
    href: "/docs/transactions/transfer",
    color: "#7c3aed",
  },
  {
    icon: Wallet,
    title: "Send All",
    description:
      "Transfer your entire token balance in one click. Fee is automatically calculated and deducted from the amount sent.",
    tags: ["Full balance", "Auto fee"],
    href: "/docs/transactions/send-all",
    color: "#a855f7",
  },
  {
    icon: ArrowLeftRight,
    title: "DEX Swap",
    description:
      "Swap any token pair on BlazeSwap via the Uniswap V2 router. Live quote with 2% slippage protection, all gasless.",
    tags: ["BlazeSwap", "FXRP → USDT"],
    href: "/docs/transactions/swap",
    color: "#8b5cf6",
  },
  {
    icon: FileCode2,
    title: "Contract Call",
    description:
      "Call any smart contract function on Flare — DeFi protocols, NFTs, staking contracts — without paying FLR gas.",
    tags: ["Any contract", "Any function"],
    href: "/docs/transactions/call",
    color: "#6d28d9",
  },
  {
    icon: Fuel,
    title: "Approval Gas Bootstrap",
    description:
      "First time? The relayer sends you exactly enough FLR to run one approve() transaction. Then you're gasless forever.",
    tags: ["One-time", "Free FLR"],
    href: "/docs/transactions/approval-gas",
    color: "#7c3aed",
  },
];

export default function Transactions() {
  return (
    <section id="transactions" className="relative py-32 px-6 overflow-hidden">
      {/* Decorative */}
      <div className="orb w-[600px] h-[400px] bg-purple-900 bottom-0 left-0 opacity-15" />
      <div className="orb w-[400px] h-[400px] bg-violet-800 top-0 right-0 opacity-10" style={{ animationDelay: "1.5s" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="token-badge mb-4 inline-block">Supported Transactions</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Everything you need,{" "}
            <span className="gradient-text">gasless</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Five transaction types fully supported out of the box.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {txns.map((tx, i) => {
            const Icon = tx.icon;
            return (
              <motion.div
                key={tx.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={tx.href} className="glass-card p-7 flex flex-col gap-5 h-full block group">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${tx.color}20`,
                      border: `1px solid ${tx.color}30`,
                      boxShadow: `0 0 20px ${tx.color}10`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: tx.color }} />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-200">
                      {tx.title}
                    </h3>
                    <p className="text-sm text-white/45 leading-relaxed">{tx.description}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {tx.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                        style={{
                          background: `${tx.color}15`,
                          border: `1px solid ${tx.color}25`,
                          color: "#c4b5fd",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read more */}
                  <div className="flex items-center gap-1 text-xs text-purple-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 -mb-1">
                    <span>Read docs</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-card p-7 flex flex-col items-center justify-center text-center gap-4 border-dashed border-purple-600/20 hover:border-purple-500/40"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-600/20 flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">Any Contract</h3>
              <p className="text-sm text-white/40">
                The router supports any whitelisted contract — DeFi, NFTs, staking, and more.
              </p>
            </div>
            <Link
              href="/docs"
              className="text-xs text-purple-400 font-medium hover:text-purple-300 transition-colors flex items-center gap-1"
            >
              Explore the docs <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
