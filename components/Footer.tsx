"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-green-500/[0.08] px-8 pb-6 pt-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.4 }}
        className="flex flex-col items-center justify-between gap-2 text-[11px] text-white/40 sm:flex-row"
      >
        <span className="uppercase tracking-[0.25em] text-[9px] text-white/30">
          Powered by Flare
        </span>
        <span className="text-center text-white/45 sm:text-right">
          © {new Date().getFullYear()} Zedkr, gasless infrastructure for DeFi wallets.
        </span>
      </motion.div>
    </footer>
  );
}
