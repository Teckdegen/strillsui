"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";

const ICON = "https://image2url.com/r2/default/images/1773236115705-9cba8e64-53c7-43c1-ae3c-0fed01c105ff.png";

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
    title: "Security",
    items: [
      { label: "How Signatures Work", href: "/docs/security" },
      { label: "Replay Protection", href: "/docs/security/replay" },
      { label: "Approval Model", href: "/docs/security/approval" },
    ],
  },
];

/* ── single collapsible section ── */
function NavSection({ section, onLinkClick }: { section: (typeof nav)[0]; onLinkClick?: () => void }) {
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
        <ChevronDown className={`w-3 h-3 text-white/15 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
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
                    onClick={onLinkClick}
                    className={`relative flex items-center py-1.5 pl-3 pr-2 text-sm transition-colors duration-150 rounded-md ${
                      active ? "text-white font-medium" : "text-white/40 hover:text-white/75"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-green-500"
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

/* ── shared nav tree ── */
function NavTree({ onLinkClick }: { onLinkClick?: () => void }) {
  return (
    <>
      <nav className="flex-1 space-y-0 px-1">
        {nav.map((section) => (
          <NavSection key={section.title} section={section} onLinkClick={onLinkClick} />
        ))}
      </nav>
      <div className="mt-6 px-1 pt-5 border-t border-white/[0.05] flex flex-col gap-2">
        <a
          href="https://coston2-explorer.flare.network"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white/20 hover:text-green-400/60 transition-colors"
        >
          Block Explorer
        </a>
      </div>
    </>
  );
}

/* ── mobile hamburger button + drawer ── */
/* The button bar is rendered FIXED (top-16) so it's out of the flex layout flow */
export function MobileMenuBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const currentLabel = nav
    .flatMap((s) => s.items)
    .find((i) => i.href === pathname)?.label ?? "Docs";

  return (
    <>
      {/* Fixed top bar - mobile only, does NOT affect flex layout */}
      <div className="lg:hidden fixed top-16 left-0 right-0 z-30 flex items-center justify-between bg-[#080808]/95 backdrop-blur-xl border-b border-green-500/[0.08] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-5 h-5 rounded-full border border-green-500/20 bg-center bg-cover shrink-0"
            style={{ backgroundImage: `url('${ICON}')` }}
          />
          <span className="text-xs text-white/50 truncate max-w-[200px]">{currentLabel}</span>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 rounded-lg border border-green-500/15 bg-green-500/[0.05] px-3 py-1.5 text-xs text-white/55 hover:text-white hover:bg-green-500/10 transition-colors"
        >
          <Menu className="w-3.5 h-3.5" />
          <span>Menu</span>
        </button>
      </div>

      {/* Backdrop + drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72 bg-[#080d09] border-r border-green-500/[0.08] flex flex-col overflow-y-auto"
            >
              <div className="flex items-center justify-between px-5 py-5 border-b border-white/[0.06]">
                <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-full border border-green-500/20 bg-center bg-cover shadow-[0_0_20px_rgba(34,197,94,0.25)]"
                    style={{ backgroundImage: `url('${ICON}')` }}
                  />
                  <div className="flex flex-col leading-tight">
                    <span className="text-[9px] tracking-[0.25em] uppercase text-white/30">Zedkr</span>
                    <span className="text-sm font-semibold text-white/75">Docs</span>
                  </div>
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex-1 flex flex-col px-4 pt-6 pb-8">
                <NavTree onLinkClick={() => setOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── desktop sidebar only ── */
export default function Sidebar() {
  return (
    <aside className="w-52 shrink-0 hidden lg:block">
      <div className="sticky top-0 h-screen overflow-y-auto py-8 flex flex-col">
        <Link href="/" className="flex items-center gap-2.5 mb-10 px-1">
          <div
            className="w-6 h-6 rounded-full border border-green-500/20 bg-center bg-cover"
            style={{ backgroundImage: `url('${ICON}')` }}
          />
          <span className="text-sm font-semibold text-white/65 tracking-tight">Zedkr</span>
        </Link>
        <NavTree />
      </div>
    </aside>
  );
}
