import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "Getting Started | Zedkr Docs" };

const installCode = `npm install zedkr ethers`;

const initCode = `import { Zedkr } from "zedkr";
import { ethers } from "ethers";

// Browser (MetaMask / any EIP-1193 wallet)
const provider = new ethers.BrowserProvider(window.ethereum);

// Node.js / scripts
const provider = new ethers.JsonRpcProvider("https://coston2-api.flare.network/ext/bc/C/rpc");

const client = await Zedkr.create({ provider });`;

const approveCode = `import { ethers } from "ethers";

const USDT   = "0xC1A5B41512496B80903D1f32d6dEa3a73212E71F";
const ROUTER = (await client.getConfig()).routerAddress;

const usdt = new ethers.Contract(USDT, ["function approve(address,uint256)"], signer);
await usdt.approve(ROUTER, ethers.MaxUint256);`;

const firstTxCode = `import { Zedkr } from "zedkr";
const client = await Zedkr.create({ provider });
const result = await client.transfer(signer, "0xRecipient", "0xToken", "10", 6);
console.log("txHash:", result.txHash);
console.log("status:", result.status); // "success" | "failed"`;

export default function GettingStarted() {
  return (
    <PageWrapper>
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Getting Started" }]} />

      <h1 className="text-4xl font-bold text-white mb-3">Getting Started</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Install Zedkr, create a client with your provider, and send a gasless transaction in under a minute.
      </p>

      <div className="glass rounded-xl p-5 mb-8">
        <ul className="space-y-2.5 text-sm text-white/60">
          {[
            "Node.js 18+ or a modern browser with MetaMask",
            "A wallet with tokens (USDT, FXRP, or WC2FLR)",
            "One-time token approval, after that, zero FLR forever",
          ].map((req) => (
            <li key={req} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
              {req}
            </li>
          ))}
        </ul>
      </div>

      <h2 className="text-xl font-semibold text-white mb-3">Step 1 - Install</h2>
      <CodeBlock code={installCode} language="bash" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Step 2 - Create a client</h2>
      <p className="text-sm text-white/45 leading-relaxed mb-4">
        Pass your provider. The relayer URL and router address are baked in, no extra config.
      </p>
      <CodeBlock code={initCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Step 3 - One-time token approval</h2>
      <p className="text-sm text-white/45 leading-relaxed mb-4">
        Approve once per token. This is the only transaction that requires FLR gas.
        Every transaction after this is completely gasless.
      </p>
      <CodeBlock code={approveCode} language="typescript" />

      <Callout type="info">
        Tokens with EIP-2612 permit support skip this step entirely, the SDK handles it automatically.
      </Callout>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Step 4 - Send your first transaction</h2>
      <CodeBlock code={firstTxCode} language="typescript" />

      <Callout type="tip">
        That&apos;s it. Same 5-line pattern works for every transaction type, transfers, swaps, and contract calls.
      </Callout>

      <DocNav
        prev={{ label: "Introduction", href: "/docs" }}
        next={{ label: "transfer()", href: "/docs/sdk" }}
      />
    </PageWrapper>
  );
}
