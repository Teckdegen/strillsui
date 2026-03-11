import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "swap() — Zedkr SDK" };

const usageCode = `import { Zedkr } from "zedkr";
const client   = await Zedkr.create({ provider });
const callData = iface.encodeFunctionData("swapExactTokensForTokens", [amountIn, amountOutMin, [FXRP, USDT], to, deadline]);
const result   = await client.swap(signer, BLAZESWAP_ROUTER, callData);
console.log(result.txHash);`;

const encodeCode = `import { ethers } from "ethers";

const BLAZESWAP = "0x2b8f51c1Ffadb778D48A5bd6d0169Cf648568243";
const FXRP      = "0x0b6A3645c240605887a5532109323A3E12273dc7";
const USDT      = "0xC1A5B41512496B80903D1f32d6dEa3a73212E71F";

const iface    = new ethers.Interface(["function swapExactTokensForTokens(uint256,uint256,address[],address,uint256) returns (uint256[])"]);
const amountIn = ethers.parseUnits("10", 6); // 10 FXRP
const deadline = Math.floor(Date.now() / 1000) + 300;
const callData = iface.encodeFunctionData("swapExactTokensForTokens", [amountIn, 0n, [FXRP, USDT], await signer.getAddress(), deadline]);

const result   = await client.swap(signer, BLAZESWAP, callData);`;

export default function SdkSwap() {
  return (
    <PageWrapper>
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "SDK", href: "/docs/sdk" }, { label: "swap()" }]} />

      <h1 className="text-4xl font-bold text-white mb-3">swap()</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Gasless DEX swap through any Uniswap V2-compatible router on Flare. Encode the calldata
        with ethers.js — you keep full control over routing, slippage, and deadlines.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Usage</h2>
      <CodeBlock code={usageCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Full example — FXRP → USDT via BlazeSwap</h2>
      <CodeBlock code={encodeCode} language="typescript" />

      <Callout type="warning">
        Approve the router (not the DEX) for the input token before swapping.
      </Callout>

      <Callout type="tip">
        BlazeSwap on Coston2: <code className="text-green-300/80 text-xs">0x2b8f51c1Ffadb778D48A5bd6d0169Cf648568243</code>
      </Callout>

      <DocNav
        prev={{ label: "transferAll()", href: "/docs/sdk/transfer-all" }}
        next={{ label: "call()", href: "/docs/sdk/call" }}
      />
    </PageWrapper>
  );
}
