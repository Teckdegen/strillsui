import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Strills Paymaster — Gasless Transactions on Flare",
  description:
    "Send, swap, and interact with any contract on Flare without holding FLR for gas.",
  icons: {
    icon: "https://i.ibb.co/XZJsq6QB/photo-2026-03-09-10-09-22-removebg-preview.png",
  },
  openGraph: {
    title: "Strills Paymaster — Gasless Transactions on Flare",
    description:
      "Gasless transfers, swaps, and contract calls on Flare. Fees in USDT, FXRP, or WC2FLR.",
    images: [
      "https://i.ibb.co/XZJsq6QB/photo-2026-03-09-10-09-22-removebg-preview.png",
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
