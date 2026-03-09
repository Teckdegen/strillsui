"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Copy, Check } from "lucide-react";
import { useState } from "react";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-2 text-xs text-white/30 mb-8">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {i > 0 && <span>/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-white/60 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-white/60">{item.label}</span>
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
    <div className="flex items-center justify-between mt-16 pt-8 border-t border-white/[0.06]">
      {prev ? (
        <Link
          href={prev.href}
          className="flex items-center gap-2 glass px-4 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:border-purple-600/30 transition-all duration-200 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <div className="text-left">
            <div className="text-xs text-white/30">Previous</div>
            <div>{prev.label}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next && (
        <Link
          href={next.href}
          className="flex items-center gap-2 glass px-4 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:border-purple-600/30 transition-all duration-200 group"
        >
          <div className="text-right">
            <div className="text-xs text-white/30">Next</div>
            <div>{next.label}</div>
          </div>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
        <span className="text-xs text-purple-400/60 font-mono">{language}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/70 transition-colors"
        >
          {copied ? (
            <><Check className="w-3.5 h-3.5 text-green-400" /><span className="text-green-400">Copied</span></>
          ) : (
            <><Copy className="w-3.5 h-3.5" /><span>Copy</span></>
          )}
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
