"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Zap, BookOpen, Code2, ArrowLeftRight, Shield, Layers } from "lucide-react";

const nav = [
  {
    title: "Overview",
    icon: BookOpen,
    items: [
      { label: "Introduction", href: "/docs" },
      { label: "Getting Started", href: "/docs/getting-started" },
    ],
  },
  {
    title: "SDK Reference",
    icon: Code2,
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
    icon: ArrowLeftRight,
    items: [
      { label: "ERC20 Transfer", href: "/docs/transactions" },
      { label: "Send All", href: "/docs/transactions/send-all" },
      { label: "DEX Swap", href: "/docs/transactions/swap" },
      { label: "Contract Call", href: "/docs/transactions/call" },
      { label: "Approval Gas", href: "/docs/transactions/approval-gas" },
    ],
  },
  {
    title: "Contracts",
    icon: Layers,
    items: [
      { label: "GaslessRouter", href: "/docs/contracts" },
      { label: "Addresses", href: "/docs/contracts/addresses" },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    items: [
      { label: "How Signatures Work", href: "/docs/security" },
      { label: "Replay Protection", href: "/docs/security/replay" },
      { label: "Approval Model", href: "/docs/security/approval" },
    ],
  },
];

function NavSection({ section }: { section: (typeof nav)[0] }) {
  const pathname = usePathname();
  const isActive = section.items.some((i) => i.href === pathname);
  const [open, setOpen] = useState<boolean>(true);
  const Icon = section.icon;

  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/[0.03] transition-colors duration-200 group"
      >
        <div className="flex items-center gap-2.5">
          <Icon className="w-3.5 h-3.5 text-purple-400/70" />
          <span className="text-xs font-semibold text-white/40 uppercase tracking-widest group-hover:text-white/60 transition-colors">
            {section.title}
          </span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-white/20 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pl-3 mt-0.5 space-y-0.5">
              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 relative ${
                      active
                        ? "text-white font-medium bg-purple-600/15 border border-purple-600/20"
                        : "text-white/45 hover:text-white/80 hover:bg-white/[0.03]"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="sidebar-indicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-purple-500 rounded-full"
                      />
                    )}
                    <span className="pl-1">{item.label}</span>
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
    <aside className="w-64 shrink-0 hidden lg:block">
      <div className="sticky top-0 h-screen overflow-y-auto py-6 flex flex-col">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 px-4 mb-8">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-base text-white">
            Strills <span className="gradient-text">Pay</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex-1 px-2 space-y-1">
          {nav.map((section) => (
            <NavSection key={section.title} section={section} />
          ))}
        </nav>

        {/* Bottom links */}
        <div className="px-4 pt-6 border-t border-white/[0.05] mt-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors mb-2"
          >
            GitHub →
          </a>
          <a
            href="https://coston2-explorer.flare.network"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            Coston2 Explorer →
          </a>
        </div>
      </div>
    </aside>
  );
}
