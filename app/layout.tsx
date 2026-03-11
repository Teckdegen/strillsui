import type { Metadata } from "next";
import "./globals.css";

const ICON = "https://image2url.com/r2/default/images/1773134267974-eb80d78c-4412-49a3-aa8b-2ab03d0da0fb.png";

export const metadata: Metadata = {
  title: "Zedkr — Gasless Transactions on Flare",
  description: "Send, swap, and call contracts on Flare without holding FLR for gas. Pay fees in USDT, FXRP, or WC2FLR.",
  icons: { icon: ICON, shortcut: ICON, apple: ICON },
  openGraph: {
    title: "Zedkr — Gasless Transactions on Flare",
    description: "Gasless transfers, swaps, and contract calls on Flare. Fees in USDT, FXRP, or WC2FLR.",
    images: [ICON],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
