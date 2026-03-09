"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap } from "lucide-react";

const footerLinks = {
  Docs: [
    { label: "Introduction", href: "/docs" },
    { label: "Getting Started", href: "/docs/getting-started" },
    { label: "SDK Reference", href: "/docs/sdk" },
    { label: "Security", href: "/docs/security" },
  ],
  Transactions: [
    { label: "ERC20 Transfer", href: "/docs/transactions/transfer" },
    { label: "Send All", href: "/docs/transactions/send-all" },
    { label: "DEX Swap", href: "/docs/transactions/swap" },
    { label: "Contract Call", href: "/docs/transactions/call" },
  ],
  Network: [
    { label: "Flare Network", href: "https://flare.network" },
    { label: "Coston2 Explorer", href: "https://coston2-explorer.flare.network" },
    { label: "Coston2 Faucet", href: "https://faucet.flare.network" },
    { label: "BlazeSwap", href: "https://blazeswap.xyz" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10 px-6 border-t border-white/[0.06] overflow-hidden">
      <div className="orb w-[600px] h-[200px] bg-purple-900 bottom-0 left-1/2 -translate-x-1/2 opacity-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16"
        >
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg text-white">
                Strills <span className="gradient-text">Pay</span>
              </span>
            </Link>
            <p className="text-sm text-white/35 leading-relaxed max-w-xs">
              Gasless transactions on Flare. Sign an intent, we handle the gas.
            </p>

            {/* Built on Flare badge */}
            <div className="mt-6 inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-xs text-white/40">Built on Flare Network</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} Strills Paymaster. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/docs" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Documentation
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
