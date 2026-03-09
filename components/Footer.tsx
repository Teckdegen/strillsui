"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-8 pb-6 pt-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.4 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-white/35"
      >
        <div className="space-y-1">
          <div className="uppercase tracking-[0.25em] text-[9px] text-white/30">
            Powered by Flare
          </div>
          <div className="text-white/45">
            © {new Date().getFullYear()} Strills Paymaster. Gasless transactions for modern DeFi
            apps.
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px] text-white/35">
          <span className="text-white/45">Trusted by developers from</span>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1">
              BlazeSwap
            </span>
            <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1">
              Coston2
            </span>
            <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1">
              EVM dApps
            </span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
