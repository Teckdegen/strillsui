import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "call() — SDK Reference" };

const signatureCode = `client.call(
  signer: ethers.Signer,
  target: string,      // contract address to call
  callData: string     // ABI-encoded function call
): Promise<TxResult>`;

const approveExample = `import { ethers } from "ethers";

const FXRP = "0x0b6A3645c240605887a5532109323A3E12273dc7";
const GASLESS_ROUTER = "0x658a064aE85c983869e32D478AD3B41a96982114";

// Encode: approve(GASLESS_ROUTER, MaxUint256) on FXRP
const iface = new ethers.Interface([
  "function approve(address spender, uint256 amount) returns (bool)",
]);
const callData = iface.encodeFunctionData("approve", [
  GASLESS_ROUTER,
  ethers.MaxUint256,
]);

// Submit gaslessly
const result = await client.call(signer, FXRP, callData);
console.log("txHash:", result.txHash);`;

const stakingExample = `// Example: interact with a staking contract gaslessly
const stakingIface = new ethers.Interface([
  "function stake(uint256 amount)",
]);

const callData = stakingIface.encodeFunctionData("stake", [
  ethers.parseUnits("100", 18),
]);

const result = await client.call(signer, STAKING_CONTRACT, callData);`;

const resultCode = `interface TxResult {
  txHash: string;
  status: "success" | "failed";
  error?: string;
}`;

export default function SdkCall() {
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Docs", href: "/docs" },
          { label: "SDK Reference", href: "/docs/sdk" },
          { label: "call()" },
        ]}
      />

      <h1 className="text-4xl font-bold text-white mb-3">call()</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Execute any arbitrary smart contract function gaslessly. Encode the calldata with
        ethers.js and pass the target contract — the relayer handles gas.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Signature</h2>
      <CodeBlock code={signatureCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Return value</h2>
      <CodeBlock code={resultCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">
        Example — gasless token approval
      </h2>
      <p className="text-sm text-white/45 leading-relaxed mb-4">
        Use <code className="text-purple-300 text-xs bg-purple-500/10 px-1.5 py-0.5 rounded">call()</code> to
        approve a spender contract — without paying FLR gas. Useful for bootstrapping users
        who have tokens but no native gas.
      </p>
      <CodeBlock code={approveExample} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">
        Example — contract interaction
      </h2>
      <CodeBlock code={stakingExample} language="typescript" />

      <Callout type="warning">
        The user must have approved the GaslessRouter to spend their fee token before
        calling <code className="text-purple-300 text-xs bg-purple-500/10 px-1.5 py-0.5 rounded">call()</code>.
        If using <code className="text-purple-300 text-xs bg-purple-500/10 px-1.5 py-0.5 rounded">call()</code>
        {" "}to do the initial approval, the user must hold FLR for that very first transaction.
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
              ["signer", "ethers.Signer", "User's wallet signer"],
              ["target", "string", "Contract address to call"],
              ["callData", "string", "ABI-encoded function + arguments"],
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

      <DocNav
        prev={{ label: "swap()", href: "/docs/sdk/swap" }}
        next={{ label: "getFeeQuote()", href: "/docs/sdk/fee-quote" }}
      />
    </PageWrapper>
  );
}
