"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="mb-6 flex items-center gap-2 text-xs text-slate-400">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {i > 0 && <span>/</span>}
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-slate-100">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-100">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function DocNav({
  prev,
  next,
}: {
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
}) {
  return (
    <div className="mt-16 flex items-center justify-between border-t border-slate-800 pt-8">
      {prev ? (
        <Link
          href={prev.href}
          className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <div className="text-left">
            <div className="text-xs text-slate-400">Previous</div>
            <div>{prev.label}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next && (
        <Link
          href={next.href}
          className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <div className="text-right">
            <div className="text-xs text-slate-400">Next</div>
            <div>{next.label}</div>
          </div>
        </Link>
      )}
    </div>
  );
}

export function CodeBlock({ code, language = "typescript" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block my-5 group">
      <div className="code-header">
        <span className="text-xs font-mono text-purple-200/80">{language}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-100 transition-colors"
        >
          <span className={copied ? "text-green-400" : ""}>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="p-5 overflow-x-auto text-sm text-purple-300 font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "warning" | "tip";
  children: React.ReactNode;
}) {
  const styles = {
    info: "bg-blue-500/8 border-blue-500/20 text-blue-300",
    warning: "bg-yellow-500/8 border-yellow-500/20 text-yellow-300",
    tip: "bg-purple-500/8 border-purple-500/20 text-purple-300",
  };
  const icons = { info: "ℹ️", warning: "⚠️", tip: "💡" };

  return (
    <div className={`flex gap-3 p-4 rounded-xl border my-5 ${styles[type]}`}>
      <span>{icons[type]}</span>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="doc-content"
    >
      {children}
    </motion.div>
  );
}
