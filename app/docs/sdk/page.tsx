import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "transfer() | Zedkr SDK" };

const usageCode = `import { Zedkr } from "zedkr";
const client = await Zedkr.create({ provider });
const result = await client.transfer(signer, "0xRecipient", "0xToken", "10", 6);
console.log(result.txHash);`;

const drainCode = `// Send entire balance — fee auto-deducted from same token
const result = await client.transferAll(signer, "0xRecipient", "0xUSDT", 6);
console.log(result.sentAmount); // balance minus fee, wallet hits zero`;

const fxrpCode = `const result = await client.transfer(
  signer,
  "0xRecipient",
  "0x0b6A3645c240605887a5532109323A3E12273dc7", // FXRP
  "50",
  6
);`;

export default function SdkTransfer() {
  return (
    <PageWrapper>
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "SDK", href: "/docs/sdk" }, { label: "transfer()" }]} />

      <h1 className="text-4xl font-bold text-white mb-3">transfer()</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Send any ERC20 token without holding FLR. The fee is deducted automatically from the user&apos;s fee token.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Usage</h2>
      <CodeBlock code={usageCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-10 mb-4">Parameters</h2>
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
              ["token",    "string",        "ERC20 token address to send"],
              ["amount",   "string",        "Human-readable amount e.g. \"10.5\""],
              ["decimals", "number?",       "Token decimals, defaults to 18"],
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

      <h2 className="text-xl font-semibold text-white mb-3">Example: send FXRP</h2>
      <CodeBlock code={fxrpCode} language="typescript" />

      <Callout type="info">
        Approve the router once for each token before the first transfer.
        See <a href="/docs/getting-started" className="underline text-green-400 hover:text-green-300">Getting Started</a> for the one-time approval step.
      </Callout>

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">Draining the full balance</h2>
      <p className="text-white/50 text-sm leading-relaxed mb-4">
        When you need to send a user&apos;s entire token balance, use <code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">transferAll()</code>. The SDK reads the on-chain balance, subtracts the fee, and sends the remainder so the wallet lands at exactly zero. No manual math needed.
      </p>
      <CodeBlock code={drainCode} language="typescript" />

      <Callout type="tip">
        Same-token fee deduction: if the fee token and send token are the same (e.g. USDT fee, USDT send), <code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">transferAll()</code> handles it automatically. The wallet empties to zero.
      </Callout>

      <DocNav
        prev={{ label: "Getting Started", href: "/docs/getting-started" }}
        next={{ label: "swap()", href: "/docs/sdk/swap" }}
      />
    </PageWrapper>
  );
}
