"use client";

import Link from "next/link";
const links = [
  { label: "DeFi App", href: "#" },
  { label: "Features", href: "#features" },
  { label: "Docs", href: "/docs" },
];

export default function Navbar() {
  return (
    <nav className="relative z-20 px-8 pt-6 pb-4 flex items-center justify-between">
      {/* Brand */}
      <Link href="/" className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full border border-white/15 bg-center bg-cover shadow-[0_0_40px_rgba(124,58,237,0.45)]"
          style={{
            backgroundImage:
              "url('https://image2url.com/r2/default/images/1773047373605-4fb22ebb-f299-4f61-b949-c5b42c484cef.jpg')",
          }}
        />
        <div className="flex flex-col leading-tight">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
            Strills Paymaster
          </span>
          <span className="text-sm font-semibold text-white/80">Gasless for Flare</span>
        </div>
      </Link>

      {/* Center nav */}
      <div className="hidden md:flex items-center gap-8 text-xs text-white/40">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-white/80 transition-colors duration-200"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right CTA */}
      <div className="hidden sm:flex items-center gap-3">
        <button className="rounded-full border border-white/14 bg-white/5 px-4 py-1.5 text-xs text-white/70 hover:bg-white/10 transition-colors">
          Create Account
        </button>
        <Link
          href="/docs"
          className="rounded-full bg-gradient-to-r from-purple-500 to-violet-400 px-5 py-1.5 text-xs font-semibold text-black shadow-[0_0_40px_rgba(167,139,250,0.7)] hover:brightness-110 transition-all"
        >
          Open Docs
        </Link>
      </div>
    </nav>
  );
}
