import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Strills Paymaster — Gasless Transactions on Flare",
  description:
    "Send, swap, and interact with any contract on Flare without holding FLR for gas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
