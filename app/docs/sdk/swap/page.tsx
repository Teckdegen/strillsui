import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "swap() — SDK Reference" };

const signatureCode = `client.swap(
  signer: ethers.Signer,
  dexRouter: string,   // DEX router address (e.g. BlazeSwap)
  callData: string     // ABI-encoded swap function call
): Promise<TxResult>`;

const fullCode = `import { ethers } from "ethers";

const BLAZESWAP_ROUTER = "0x2b8f51c1Ffadb778D48A5bd6d0169Cf648568243";
const FXRP  = "0x0b6A3645c240605887a5532109323A3E12273dc7";
const USDT  = "0xC1A5B41512496B80903D1f32d6dEa3a73212E71F";

const iface = new ethers.Interface([
  "function swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline) returns (uint256[])",
  "function getAmountsOut(uint256 amountIn, address[] path) view returns (uint256[])",
]);

// Get live quote from BlazeSwap
const amountIn = ethers.parseUnits("10", 18); // 10 FXRP
const provider = signer.provider!;
const router = new ethers.Contract(BLAZESWAP_ROUTER, iface, provider);
const amounts = await router.getAmountsOut(amountIn, [FXRP, USDT]);
const amountOutMin = (amounts[1] * 95n) / 100n; // 5% slippage

const deadline = Math.floor(Date.now() / 1000) + 300; // 5 min

const callData = iface.encodeFunctionData("swapExactTokensForTokens", [
  amountIn,
  amountOutMin,
  [FXRP, USDT],
  await signer.getAddress(),
  deadline,
]);

const result = await client.swap(signer, BLAZESWAP_ROUTER, callData);
console.log("Swap tx:", result.txHash);`;

const approvalNote = `// Before swapping, the GaslessRouter must be approved for both:
// 1. The input token (FXRP) — to pull the swap amount
// 2. The fee token (USDT/FXRP/WC2FLR) — to pull the fee

const fxrp = new ethers.Contract(FXRP, ["function approve(address,uint256)"], signer);
await fxrp.approve(ROUTER_ADDRESS, ethers.MaxUint256);`;

export default function SdkSwap() {
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Docs", href: "/docs" },
          { label: "SDK Reference", href: "/docs/sdk" },
          { label: "swap()" },
        ]}
      />

      <h1 className="text-4xl font-bold text-white mb-3">swap()</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Execute a gasless DEX swap through any Uniswap V2-compatible router on Flare.
        Encode the calldata yourself for full flexibility over routing and slippage.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Signature</h2>
      <CodeBlock code={signatureCode} language="typescript" />

      <Callout type="warning">
        The GaslessRouter calls the DEX on behalf of the user. Approve the{" "}
        <strong>GaslessRouter</strong> (not the DEX) for the token you want to swap.
      </Callout>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">
        Full example — FXRP → USDT via BlazeSwap
      </h2>
      <CodeBlock code={fullCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Approvals</h2>
      <CodeBlock code={approvalNote} language="typescript" />

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
              ["dexRouter", "string", "Address of the DEX router (e.g. BlazeSwap)"],
              ["callData", "string", "ABI-encoded swap function call"],
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

      <Callout type="tip">
        BlazeSwap on Coston2 is at{" "}
        <code className="text-purple-300 text-xs bg-purple-500/10 px-1.5 py-0.5 rounded">
          0x2b8f51c1Ffadb778D48A5bd6d0169Cf648568243
        </code>
        . It supports standard Uniswap V2 functions.
      </Callout>

      <DocNav
        prev={{ label: "transferAll()", href: "/docs/sdk/transfer-all" }}
        next={{ label: "call()", href: "/docs/sdk/call" }}
      />
    </PageWrapper>
  );
}
