"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

/* ── Breadcrumb ─────────────────────────────────────── */
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="mb-8 flex items-center gap-1.5 text-xs text-white/25">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-white/15">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-white/60 transition-colors duration-150">
              {item.label}
            </Link>
          ) : (
            <span className="text-white/50">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* ── Prev / Next nav ────────────────────────────────── */
export function DocNav({
  prev,
  next,
}: {
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
}) {
  return (
    <div className="mt-16 grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-8">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col gap-0.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition-all duration-200 hover:border-green-500/25 hover:bg-green-500/[0.05]"
        >
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/25 group-hover:text-green-400/60 transition-colors">← Previous</span>
          <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{prev.label}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col gap-0.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-right transition-all duration-200 hover:border-green-500/25 hover:bg-green-500/[0.05] col-start-2"
        >
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/25 group-hover:text-green-400/60 transition-colors">Next →</span>
          <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{next.label}</span>
        </Link>
      ) : null}
    </div>
  );
}

/* ── Code block ─────────────────────────────────────── */
export function CodeBlock({ code, language = "typescript" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-green-500/[0.10] bg-[#050c07]">
      {/* header bar */}
      <div className="flex items-center justify-between border-b border-green-500/[0.08] px-4 py-2.5">
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/25">{language}</span>
        <button
          onClick={copy}
          className="text-[10px] uppercase tracking-[0.15em] text-white/25 hover:text-green-400 transition-colors duration-150"
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      {/* code */}
      <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed text-green-200/75 font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ── Callout ────────────────────────────────────────── */
export function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "warning" | "tip";
  children: React.ReactNode;
}) {
  const map = {
    info:    { border: "border-l-blue-500/60",   bg: "bg-blue-500/5",    text: "text-blue-300/80",   label: "Note" },
    warning: { border: "border-l-amber-500/60",  bg: "bg-amber-500/5",   text: "text-amber-300/80",  label: "Warning" },
    tip:     { border: "border-l-green-500/60",  bg: "bg-green-500/[0.05]", text: "text-green-300/80", label: "Tip" },
  };
  const { border, bg, text, label } = map[type];

  return (
    <div className={`my-5 flex gap-4 border-l-2 ${border} ${bg} rounded-r-xl px-5 py-4`}>
      <div className="flex-1">
        <div className={`text-[10px] uppercase tracking-[0.18em] font-semibold ${text} mb-1.5`}>{label}</div>
        <div className="text-sm text-white/55 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

/* ── Page wrapper ───────────────────────────────────── */
export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="gitbook-content"
    >
      {children}
    </motion.div>
  );
}
