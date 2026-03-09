import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Strills Paymaster — Gasless Transactions on Flare",
  description:
    "Send, swap, and interact with any contract on Flare without holding FLR for gas.",
  icons: {
    icon: "https://image2url.com/r2/default/images/1773047373605-4fb22ebb-f299-4f61-b949-c5b42c484cef.jpg",
  },
  openGraph: {
    title: "Strills Paymaster — Gasless Transactions on Flare",
    description:
      "Gasless transfers, swaps, and contract calls on Flare. Fees in USDT, FXRP, or WC2FLR.",
    images: [
      "https://image2url.com/r2/default/images/1773047373605-4fb22ebb-f299-4f61-b949-c5b42c484cef.jpg",
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
