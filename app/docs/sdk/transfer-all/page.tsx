import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "transferAll() — Zedkr SDK" };

const usageCode = `import { Zedkr } from "zedkr";
const client = await Zedkr.create({ provider });
const result = await client.transferAll(signer, "0xRecipient", "0xUSDT", 6);
console.log(\`Sent \${result.sentAmount} — fee: \${result.feeDeducted}\`);`;

export default function SdkTransferAll() {
  return (
    <PageWrapper>
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "SDK", href: "/docs/sdk" }, { label: "transferAll()" }]} />

      <h1 className="text-4xl font-bold text-white mb-3">transferAll()</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Drain the user&apos;s entire token balance in one shot. When the fee token matches the send token,
        the fee is auto-deducted so the wallet goes to exactly zero.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Usage</h2>
      <CodeBlock code={usageCode} language="typescript" />

      <Callout type="tip">
        <strong>Same-token fee deduction</strong> — sending USDT with the fee in USDT?
        The SDK computes <code className="text-green-300 text-xs bg-green-500/10 px-1 rounded">balance − fee</code> automatically.
        The wallet ends at exactly zero.
      </Callout>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Parameters</h2>
      <div className="glass rounded-xl overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wide">Param</th>
              <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wide">Type</th>
              <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wide">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {[
              ["signer",   "ethers.Signer", "The user's wallet signer"],
              ["to",       "string",        "Recipient wallet address"],
              ["token",    "string",        "ERC20 token address"],
              ["decimals", "number?",       "Token decimals — defaults to 18"],
            ].map(([p, t, d]) => (
              <tr key={p}>
                <td className="px-5 py-3 font-mono text-green-300/80 text-xs">{p}</td>
                <td className="px-5 py-3 font-mono text-white/40 text-xs">{t}</td>
                <td className="px-5 py-3 text-white/55 text-xs">{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold text-white mb-3">Return value</h2>
      <div className="glass rounded-xl p-4 text-sm text-white/55 leading-relaxed">
        Returns <code className="text-green-300/80 text-xs bg-green-500/10 px-1 rounded">TransferAllResult</code> which extends{" "}
        <code className="text-green-300/80 text-xs bg-green-500/10 px-1 rounded">TxResult</code> with{" "}
        <code className="text-green-300/80 text-xs">sentAmount</code>,{" "}
        <code className="text-green-300/80 text-xs">feeDeducted</code>, and{" "}
        <code className="text-green-300/80 text-xs">feeToken</code>.
      </div>

      <DocNav
        prev={{ label: "transfer()", href: "/docs/sdk" }}
        next={{ label: "swap()", href: "/docs/sdk/swap" }}
      />
    </PageWrapper>
  );
}
