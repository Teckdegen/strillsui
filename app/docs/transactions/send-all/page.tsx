import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "Send All — Transactions" };

const usageCode = `// Send entire USDT balance to recipient
const result = await client.transferAll(
  signer,
  "0xRecipientAddress",
  "0xC1A5B41512496B80903D1f32d6dEa3a73212E71F", // USDT
  6 // decimals
);

console.log(\`Sent: \${result.sentAmount} USDT\`);
console.log(\`Fee: \${result.feeDeducted} USDT\`);
// Wallet balance after: ~0 USDT`;

const mathCode = `// The SDK does this math automatically:
//
// balance      = 100.000000 USDT  (6 decimals)
// fee quote    =   0.015400 USDT
//                 ----------
// sentAmount   =  99.984600 USDT  ← what recipient gets
// feeDeducted  =   0.015400 USDT  ← what relayer collects
//
// Total pulled from wallet = balance (100 USDT)
// Wallet ends at exactly 0`;

const crossTokenCode = `// If fee is paid in a DIFFERENT token:
const result = await client.transferAll(
  signer,
  recipient,
  FXRP_ADDRESS, // sending all FXRP
  18
);
// Full FXRP balance is sent (no deduction)
// Fee is separately pulled from user's USDT balance
console.log(\`Sent: \${result.sentAmount} FXRP (full balance)\`);
console.log(\`Fee: \${result.feeDeducted} USDT (different token)\`);`;

const migrationCode = `// Perfect for migrating wallets — drain old wallet, fill new one
async function migrateWallet(oldSigner, newAddress) {
  const tokens = [
    { address: USDT, decimals: 6 },
    { address: FXRP, decimals: 18 },
    { address: WC2FLR, decimals: 18 },
  ];

  for (const { address, decimals } of tokens) {
    const result = await client.transferAll(oldSigner, newAddress, address, decimals);
    if (result.status === "success") {
      console.log(\`Migrated: \${result.sentAmount} (fee: \${result.feeDeducted})\`);
    }
  }
}`;

export default function TxSendAll() {
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Docs", href: "/docs" },
          { label: "Transactions", href: "/docs/transactions" },
          { label: "Send All" },
        ]}
      />

      <h1 className="text-4xl font-bold text-white mb-3">Send All</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Drain an entire token balance in one operation. The fee is automatically deducted when
        paying with the same token, so the wallet reaches exactly zero.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Usage</h2>
      <CodeBlock code={usageCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Fee math</h2>
      <CodeBlock code={mathCode} language="typescript" />

      <Callout type="tip">
        This is ideal for payment flows where users want to sweep their full balance —
        no manual math, no leftover dust.
      </Callout>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Cross-token fees</h2>
      <CodeBlock code={crossTokenCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Wallet migration</h2>
      <p className="text-sm text-white/45 leading-relaxed mb-4">
        A practical use case: migrate all tokens from an old wallet to a new one without
        needing FLR on the old wallet.
      </p>
      <CodeBlock code={migrationCode} language="typescript" />

      <Callout type="warning">
        If the user&apos;s balance is less than the fee amount, the transaction will revert.
        Always ensure the user has enough balance to cover the fee plus some amount to send.
      </Callout>

      <DocNav
        prev={{ label: "ERC20 Transfer", href: "/docs/transactions" }}
        next={{ label: "DEX Swap", href: "/docs/transactions/swap" }}
      />
    </PageWrapper>
  );
}
