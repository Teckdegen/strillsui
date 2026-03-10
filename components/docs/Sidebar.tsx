"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const nav = [
  {
    title: "Overview",
    items: [
      { label: "Introduction", href: "/docs" },
      { label: "Getting Started", href: "/docs/getting-started" },
    ],
  },
  {
    title: "SDK Reference",
    items: [
      { label: "transfer()", href: "/docs/sdk" },
      { label: "transferAll()", href: "/docs/sdk/transfer-all" },
      { label: "swap()", href: "/docs/sdk/swap" },
      { label: "call()", href: "/docs/sdk/call" },
      { label: "All Transactions", href: "/docs/sdk/fee-quote" },
    ],
  },
  {
    title: "Transactions",
    items: [
      { label: "ERC20 Transfer", href: "/docs/transactions" },
      { label: "Send All", href: "/docs/transactions/send-all" },
      { label: "DEX Swap", href: "/docs/transactions/swap" },
      { label: "Contract Call", href: "/docs/transactions/call" },
      { label: "Approval & Gas", href: "/docs/transactions/approval-gas" },
    ],
  },
  {
    title: "Contracts",
    items: [
      { label: "GaslessRouter", href: "/docs/contracts" },
      { label: "Addresses", href: "/docs/contracts/addresses" },
    ],
  },
  {
    title: "Security",
    items: [
      { label: "How Signatures Work", href: "/docs/security" },
      { label: "Replay Protection", href: "/docs/security/replay" },
      { label: "Approval Model", href: "/docs/security/approval" },
    ],
  },
];

function NavSection({ section }: { section: (typeof nav)[0] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-1 text-left"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">
          {section.title}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-white/15 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-1 flex flex-col">
              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center py-1.5 pl-3 pr-2 text-sm transition-colors duration-150 rounded-md ${
                      active
                        ? "text-white font-medium"
                        : "text-white/38 hover:text-white/70"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-purple-500"
                      />
                    )}
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-52 shrink-0 hidden lg:block">
      <div className="sticky top-0 h-screen overflow-y-auto py-8 flex flex-col">
        <Link href="/" className="flex items-center gap-2.5 mb-10 px-1">
          <div
            className="w-6 h-6 rounded-full border border-white/15 bg-center bg-cover"
            style={{ backgroundImage: "url('https://image2url.com/r2/default/images/1773047373605-4fb22ebb-f299-4f61-b949-c5b42c484cef.jpg')" }}
          />
          <span className="text-sm font-semibold text-white/65 tracking-tight">Strills Pay</span>
        </Link>

        <nav className="flex-1 space-y-0 px-1">
          {nav.map((section) => (
            <NavSection key={section.title} section={section} />
          ))}
        </nav>

        <div className="mt-6 px-1 pt-5 border-t border-white/[0.05] flex flex-col gap-2">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"
            className="text-xs text-white/20 hover:text-white/45 transition-colors">
            GitHub
          </a>
          <a href="https://coston2-explorer.flare.network" target="_blank" rel="noopener noreferrer"
            className="text-xs text-white/20 hover:text-white/45 transition-colors">
            Block Explorer
          </a>
        </div>
      </div>
    </aside>
  );
}
