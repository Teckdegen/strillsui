import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "DEX Swap | Zedkr Docs" };

const code = `import { Zedkr } from "zedkr";
const client   = await Zedkr.create({ provider });
const callData = iface.encodeFunctionData("swapExactTokensForTokens", [amountIn, 0n, [FXRP, USDT], to, deadline]);
const result   = await client.swap(signer, BLAZESWAP_ROUTER, callData);
console.log(result.txHash);`;

const encodeCode = `import { ethers } from "ethers";

const BLAZESWAP = "0x2b8f51c1Ffadb778D48A5bd6d0169Cf648568243"; // Coston2
const iface     = new ethers.Interface(["function swapExactTokensForTokens(uint256,uint256,address[],address,uint256) returns (uint256[])"]);
const amountIn  = ethers.parseUnits("10", 6);
const deadline  = Math.floor(Date.now() / 1000) + 300;
const callData  = iface.encodeFunctionData("swapExactTokensForTokens", [amountIn, 0n, [FXRP, USDT], await signer.getAddress(), deadline]);

const result = await client.swap(signer, BLAZESWAP, callData);`;

export default function TxSwap() {
  return (
    <PageWrapper>
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Transactions" }, { label: "DEX Swap" }]} />

      <h1 className="text-4xl font-bold text-white mb-3">DEX Swap</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Swap tokens through any Uniswap V2-compatible DEX on Flare, without holding FLR.
        Encode your own calldata for full control over routing, slippage, and deadlines.
      </p>

      <CodeBlock code={code} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Full example - FXRP to USDT</h2>
      <CodeBlock code={encodeCode} language="typescript" />

      <Callout type="warning">
        Approve the Zedkr router (not the DEX itself) for the input token before swapping.
      </Callout>

      <Callout type="tip">
        BlazeSwap on Coston2: <code className="text-green-300/80 text-xs">0x2b8f51c1Ffadb778D48A5bd6d0169Cf648568243</code>
      </Callout>

      <DocNav
        prev={{ label: "Send All", href: "/docs/transactions/send-all" }}
        next={{ label: "Contract Call", href: "/docs/transactions/call" }}
      />
    </PageWrapper>
  );
}
