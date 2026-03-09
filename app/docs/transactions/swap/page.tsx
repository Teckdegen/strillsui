import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "DEX Swap — Transactions" };

const fullSwapCode = `import { ethers } from "ethers";

const BLAZESWAP = "0x2b8f51c1Ffadb778D48A5bd6d0169Cf648568243";
const FXRP  = "0x0b6A3645c240605887a5532109323A3E12273dc7";
const USDT  = "0xC1A5B41512496B80903D1f32d6dEa3a73212E71F";

const routerABI = [
  "function getAmountsOut(uint256 amountIn, address[] path) view returns (uint256[])",
  "function swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline) returns (uint256[])",
];

const router = new ethers.Contract(BLAZESWAP, routerABI, signer.provider!);
const userAddr = await signer.getAddress();

// 1. Get live price quote
const amountIn = ethers.parseUnits("10", 18); // 10 FXRP
const [, amountOut] = await router.getAmountsOut(amountIn, [FXRP, USDT]);
const minOut = (amountOut * 95n) / 100n; // 5% slippage tolerance

// 2. Encode calldata
const iface = new ethers.Interface(routerABI);
const callData = iface.encodeFunctionData("swapExactTokensForTokens", [
  amountIn,
  minOut,
  [FXRP, USDT],
  userAddr,       // recipient of output tokens
  Math.floor(Date.now() / 1000) + 300, // 5 min deadline
]);

// 3. Execute gaslessly
const result = await client.swap(signer, BLAZESWAP, callData);
console.log("Swap tx:", result.txHash);`;

const approvalCode = `// Before swapping, approve GaslessRouter for the INPUT token
const fxrp = new ethers.Contract(FXRP, [
  "function approve(address,uint256) returns (bool)"
], signer);

await fxrp.approve(GASLESS_ROUTER, ethers.MaxUint256);
// Now swap gaslessly as many times as needed`;

const multiHopCode = `// Multi-hop swap: FXRP → WC2FLR → USDT
const callData = iface.encodeFunctionData("swapExactTokensForTokens", [
  amountIn,
  minOut,
  [FXRP, WC2FLR, USDT], // 2 hops
  userAddr,
  deadline,
]);
const result = await client.swap(signer, BLAZESWAP, callData);`;

export default function TxSwap() {
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Docs", href: "/docs" },
          { label: "Transactions", href: "/docs/transactions" },
          { label: "DEX Swap" },
        ]}
      />

      <h1 className="text-4xl font-bold text-white mb-3">DEX Swap</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Swap tokens on BlazeSwap or any Uniswap V2-compatible DEX on Flare — without holding FLR.
        You encode the calldata; the relayer handles gas.
      </p>

      <Callout type="warning">
        The GaslessRouter executes the swap <strong>as msg.sender</strong>. Approve the{" "}
        <strong>GaslessRouter</strong> — not the DEX — for the input token.
      </Callout>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Step 1 — Approve input token</h2>
      <CodeBlock code={approvalCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">
        Step 2 — Get quote + swap FXRP → USDT
      </h2>
      <CodeBlock code={fullSwapCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Multi-hop swaps</h2>
      <p className="text-sm text-white/45 leading-relaxed mb-4">
        Chain multiple pools in a single transaction by expanding the path array.
      </p>
      <CodeBlock code={multiHopCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">BlazeSwap on Coston2</h2>
      <div className="glass rounded-xl p-5 mb-6">
        <div className="flex flex-col gap-3 text-sm">
          {[
            ["Router", "0x2b8f51c1Ffadb778D48A5bd6d0169Cf648568243"],
            ["Compatible with", "Uniswap V2 ABI"],
            ["Network", "Coston2 (Chain ID 114)"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-start justify-between gap-4">
              <span className="text-white/40 text-xs shrink-0">{k}</span>
              <span className="font-mono text-purple-300 text-xs text-right">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <Callout type="tip">
        Set a slippage tolerance of 0.5%–5% depending on the pair&apos;s liquidity.
        Use <code className="text-purple-300 text-xs bg-purple-500/10 px-1.5 py-0.5 rounded">getAmountsOut</code>{" "}
        to get the expected output before signing.
      </Callout>

      <DocNav
        prev={{ label: "Send All", href: "/docs/transactions/send-all" }}
        next={{ label: "Contract Call", href: "/docs/transactions/call" }}
      />
    </PageWrapper>
  );
}
