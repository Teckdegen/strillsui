"use client";

import Link from "next/link";
const links = [{ label: "Docs", href: "/docs" }];

export default function Navbar() {
  return (
    <nav className="relative z-20 px-8 pt-6 pb-4 flex items-center justify-between">
      {/* Brand */}
      <Link href="/" className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full border border-green-500/20 bg-center bg-cover shadow-[0_0_32px_rgba(34,197,94,0.30)]"
          style={{
            backgroundImage:
              "url('https://image2url.com/r2/default/images/1773134267974-eb80d78c-4412-49a3-aa8b-2ab03d0da0fb.png')",
          }}
        />
        <div className="flex flex-col leading-tight">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
            Zedkr
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
        <Link
          href="/docs"
          className="rounded-full border border-green-500/25 bg-green-500/[0.07] px-5 py-1.5 text-xs font-semibold text-green-300/80 hover:bg-green-500/15 hover:text-green-200 transition-colors"
        >
          Open Docs
        </Link>
      </div>
    </nav>
  );
}
