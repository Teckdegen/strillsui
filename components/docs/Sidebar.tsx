"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
      { label: "Approval Gas", href: "/docs/transactions/approval-gas" },
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
  const isActive = section.items.some((i) => i.href === pathname);
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
      >
        <span className="uppercase tracking-[0.18em]">
          {section.title}
        </span>
        <span className="text-[10px] text-slate-400">{open ? "−" : "+"}</span>
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
            <div className="mt-0.5 space-y-0.5 pl-2">
              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[13px] transition-all duration-150 ${
                      active
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="sidebar-indicator"
                        className="absolute left-0 top-1/2 h-3 w-0.5 -translate-y-1/2 rounded-full bg-slate-900"
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
    <aside className="hidden w-64 shrink-0 text-sm text-slate-700 lg:block">
      <div className="sticky top-0 flex h-screen flex-col gap-4 border-r border-slate-200 bg-white/80 pt-4">
        {/* Logo */}
        <Link href="/" className="mb-4 flex items-center gap-2 px-4">
          <span className="text-sm font-semibold text-slate-900">
            Strills <span className="text-slate-500">Docs</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 pb-6">
          {nav.map((section) => (
            <NavSection key={section.title} section={section} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
