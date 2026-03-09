import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "transfer() — SDK Reference" };

const signatureCode = `client.transfer(
  signer: ethers.Signer,
  to: string,          // recipient address
  token: string,       // ERC20 token address
  amount: string,      // human-readable amount e.g. "10.5"
  decimals?: number    // token decimals (default: 18)
): Promise<TxResult>`;

const basicCode = `import { GaslessClient } from "@strills/paymaster-sdk";

const result = await client.transfer(
  signer,
  "0x11E76F64Ec3E9A6867D5B462e247E8d08b1d8FFC",
  "0xC1A5B41512496B80903D1f32d6dEa3a73212E71F", // USDT on Coston2
  "25",
  6
);

if (result.status === "success") {
  console.log("Sent! tx:", result.txHash);
}`;

const resultCode = `interface TxResult {
  txHash: string;       // on-chain transaction hash
  status: "success" | "failed";
  error?: string;       // present when status is "failed"
}`;

const fxrpCode = `// Send 50 FXRP — fee paid in FXRP
const result = await client.transfer(
  signer,
  recipient,
  "0x0b6A3645c240605887a5532109323A3E12273dc7", // FXRP
  "50",
  18
);`;

export default function SdkTransfer() {
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Docs", href: "/docs" },
          { label: "SDK Reference", href: "/docs/sdk" },
          { label: "transfer()" },
        ]}
      />

      <h1 className="text-4xl font-bold text-white mb-3">transfer()</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Send any ERC20 token to a recipient without holding FLR. The fee is automatically
        deducted from the same token (or whichever token the relayer quotes).
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Signature</h2>
      <CodeBlock code={signatureCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Basic usage</h2>
      <CodeBlock code={basicCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Return value</h2>
      <CodeBlock code={resultCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Parameters</h2>
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
              ["signer", "ethers.Signer", "The user's wallet signer"],
              ["to", "string", "Recipient wallet address"],
              ["token", "string", "ERC20 contract address to send"],
              ["amount", "string", "Human-readable amount (e.g. \"10.5\")"],
              ["decimals", "number?", "Token decimals — defaults to 18"],
            ].map(([p, t, d]) => (
              <tr key={p}>
                <td className="px-5 py-3 font-mono text-purple-300 text-xs">{p}</td>
                <td className="px-5 py-3 font-mono text-white/40 text-xs">{t}</td>
                <td className="px-5 py-3 text-white/55 text-xs">{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold text-white mb-3">More examples</h2>
      <CodeBlock code={fxrpCode} language="typescript" />

      <Callout type="info">
        The user must have approved the GaslessRouter before calling{" "}
        <code className="text-purple-300 text-xs bg-purple-500/10 px-1.5 py-0.5 rounded">transfer()</code>.
        See <a href="/docs/getting-started" className="underline text-purple-400 hover:text-purple-300">Getting Started</a>{" "}
        for the one-time approval step.
      </Callout>

      <DocNav
        prev={{ label: "Getting Started", href: "/docs/getting-started" }}
        next={{ label: "transferAll()", href: "/docs/sdk/transfer-all" }}
      />
    </PageWrapper>
  );
}
