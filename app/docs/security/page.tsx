import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "How Signatures Work — Zedkr Docs" };

const signCode = `// The SDK signs this Intent struct using EIP-712
{
  user:      "0xYourWallet",
  target:    "0xRecipientOrContract",
  feeToken:  "0xUSDT",
  maxFee:    "50000",   // max fee in token units (6 decimals for USDT)
  nonce:     42,        // prevents replay
  deadline:  1700000000 // Unix timestamp
}`;

export default function SecuritySigs() {
  return (
    <PageWrapper>
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Security" }, { label: "How Signatures Work" }]} />

      <h1 className="text-4xl font-bold text-white mb-3">How Signatures Work</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Every Zedkr transaction is authorized by an EIP-712 typed signature. The user&apos;s private
        key never leaves their wallet — the relayer only ever sees the signed intent, not the key.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">The Intent struct</h2>
      <CodeBlock code={signCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Security guarantees</h2>
      <div className="flex flex-col gap-3 mb-6">
        {[
          { label: "Non-custodial",    desc: "The relayer never holds your keys or tokens." },
          { label: "Bound to chain",   desc: "The domain separator includes the chain ID — signatures can't be replayed on other networks." },
          { label: "Deadline",         desc: "Intents expire at a user-specified timestamp. Stale signatures can't be executed." },
          { label: "Fee cap",          desc: "maxFee in the intent limits how much the router can deduct. The relayer can't charge more." },
          { label: "Nonce",            desc: "Each nonce is consumed once — the same intent can never execute twice." },
        ].map(({ label, desc }) => (
          <div key={label} className="glass rounded-xl px-4 py-3 flex gap-3">
            <span className="text-sm font-semibold text-green-400 w-32 shrink-0">{label}</span>
            <span className="text-sm text-white/50">{desc}</span>
          </div>
        ))}
      </div>

      <Callout type="tip">
        EIP-712 gives users a human-readable signing prompt in MetaMask. They can see
        exactly what they&apos;re authorizing before signing.
      </Callout>

      <DocNav
        prev={{ label: "Approval & Gas", href: "/docs/transactions/approval-gas" }}
        next={{ label: "Replay Protection", href: "/docs/security/replay" }}
      />
    </PageWrapper>
  );
}
