import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "call() — Zedkr SDK" };

const usageCode = `import { Zedkr } from "zedkr";
const client   = await Zedkr.create({ provider });
const callData = iface.encodeFunctionData("stake", [ethers.parseUnits("100", 18)]);
const result   = await client.call(signer, STAKING_CONTRACT, callData);
console.log(result.txHash);`;

const encodeCode = `import { ethers } from "ethers";

const iface    = new ethers.Interface(["function stake(uint256 amount)"]);
const callData = iface.encodeFunctionData("stake", [ethers.parseUnits("100", 18)]);
const result   = await client.call(signer, "0xStakingContract", callData);`;

export default function SdkCall() {
  return (
    <PageWrapper>
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "SDK", href: "/docs/sdk" }, { label: "call()" }]} />

      <h1 className="text-4xl font-bold text-white mb-3">call()</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Call any smart contract function without FLR gas. Encode the calldata with ethers.js and
        pass the target address — staking, governance, NFT mints, anything.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Usage</h2>
      <CodeBlock code={usageCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Example — staking contract</h2>
      <CodeBlock code={encodeCode} language="typescript" />

      <Callout type="warning">
        The user must have approved the router for their fee token before calling{" "}
        <code className="text-green-300/80 text-xs bg-green-500/10 px-1 rounded">call()</code>.
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
              ["target",   "string",        "Contract address to call"],
              ["callData", "string",        "ABI-encoded function + arguments"],
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

      <DocNav
        prev={{ label: "swap()", href: "/docs/sdk/swap" }}
        next={{ label: "All Transactions", href: "/docs/sdk/fee-quote" }}
      />
    </PageWrapper>
  );
}
