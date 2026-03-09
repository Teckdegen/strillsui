import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "Getting Started — Strills Pay Docs" };

const installCode = `npm install @strills/paymaster-sdk ethers`;

const createClientCode = `import { GaslessClient } from "@strills/paymaster-sdk";
import { ethers } from "ethers";

// Browser (MetaMask / any EIP-1193 wallet)
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

// Node.js / scripts
const provider = new ethers.JsonRpcProvider("https://coston2-api.flare.network/ext/bc/C/rpc");
const signer = new ethers.Wallet("0xYOUR_PRIVATE_KEY", provider);

const client = GaslessClient.create({
  provider,
  relayerUrl: "https://your-relayer.railway.app",
  routerAddress: "0x658a064aE85c983869e32D478AD3B41a96982114",
  chainId: 114, // Coston2 testnet
});`;

const firstTxCode = `// 1. Get a fee quote to see the cost before signing
const quote = await client.getFeeQuote({
  user: await signer.getAddress(),
  target: "0xC1A5B41512496B80903D1f32d6dEa3a73212E71F", // USDT
  callData: "0x", // empty for a transfer
});

console.log("Fee tokens available:", quote);
// [{ token: "USDT", amount: "0.015", address: "0xC1A5B..." }, ...]

// 2. Send 10 USDT — no FLR needed
const result = await client.transfer(
  signer,
  "0x11E76F64Ec3E9A6867D5B462e247E8d08b1d8FFC", // recipient
  "0xC1A5B41512496B80903D1f32d6dEa3a73212E71F", // USDT
  "10",   // amount
  6       // decimals
);

console.log("txHash:", result.txHash);
console.log("status:", result.status); // "success" | "failed"`;

const approveCode = `// Before sending, the user must approve the GaslessRouter to spend their tokens.
// This is a one-time, per-token approval. Users pay gas for this tx (or use EIP-2612 permit).

// Standard approval (user pays gas once)
const usdt = new ethers.Contract(USDT_ADDRESS, ["function approve(address,uint256)"], signer);
await usdt.approve(ROUTER_ADDRESS, ethers.MaxUint256);

// After this, all future gasless transactions cost zero FLR.`;

const envCode = `RELAYER_PRIVATE_KEY=0x...          # relayer wallet (holds FLR for gas)
FLARE_RPC_URL=https://coston2-api.flare.network/ext/bc/C/rpc
GASLESS_ROUTER_ADDRESS=0x658a064aE85c983869e32D478AD3B41a96982114
TREASURY_ADDRESS=0x...              # where collected fees go
PORT=3000
CHAIN_ID=114`;

export default function GettingStarted() {
  return (
    <PageWrapper>
      <Breadcrumb
        items={[{ label: "Docs", href: "/docs" }, { label: "Getting Started" }]}
      />

      <h1 className="text-4xl font-bold text-white mb-3">Getting Started</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Set up the SDK, connect to the relayer, and send your first gasless transaction in minutes.
      </p>

      {/* Requirements */}
      <h2 className="text-xl font-semibold text-white mb-4">Requirements</h2>
      <div className="glass rounded-xl p-5 mb-8">
        <ul className="space-y-2.5 text-sm text-white/60">
          {[
            "Node.js 18+ or a modern browser with MetaMask",
            "A Flare-compatible wallet with tokens (USDT, FXRP, or WC2FLR)",
            "One-time token approval to the GaslessRouter contract",
            "A running relayer instance (Railway, Docker, or local)",
          ].map((req) => (
            <li key={req} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
              {req}
            </li>
          ))}
        </ul>
      </div>

      {/* Step 1 */}
      <h2 className="text-xl font-semibold text-white mb-3">Step 1 — Install the SDK</h2>
      <CodeBlock code={installCode} language="bash" />

      {/* Step 2 */}
      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Step 2 — Create a client</h2>
      <p className="text-sm text-white/45 leading-relaxed mb-4">
        The client is a lightweight wrapper around the relayer API and the on-chain contracts.
        Create one instance and reuse it throughout your app.
      </p>
      <CodeBlock code={createClientCode} language="typescript" />

      {/* Step 3 */}
      <h2 className="text-xl font-semibold text-white mt-8 mb-3">
        Step 3 — One-time token approval
      </h2>
      <p className="text-sm text-white/45 leading-relaxed mb-4">
        The GaslessRouter needs approval to pull the fee from the user&apos;s wallet.
        This is a single on-chain transaction that uses FLR gas — after this, everything is gasless.
      </p>
      <CodeBlock code={approveCode} language="typescript" />

      <Callout type="info">
        Tokens with EIP-2612 permit support (like some versions of USDT) can skip this step —
        the SDK handles permit signing automatically.
      </Callout>

      {/* Step 4 */}
      <h2 className="text-xl font-semibold text-white mt-8 mb-3">
        Step 4 — Send your first transaction
      </h2>
      <CodeBlock code={firstTxCode} language="typescript" />

      {/* Relayer setup */}
      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Relayer configuration</h2>
      <p className="text-sm text-white/45 leading-relaxed mb-4">
        The relayer is a small Express server. Configure it via environment variables and deploy
        to Railway, Fly.io, or any Node.js host.
      </p>
      <CodeBlock code={envCode} language="bash" />

      <Callout type="tip">
        The relayer wallet must hold FLR to pay gas. Fund it from the{" "}
        <a
          href="https://faucet.flare.network"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-purple-400 hover:text-purple-300"
        >
          Flare Faucet
        </a>
        .
      </Callout>

      <DocNav
        prev={{ label: "Introduction", href: "/docs" }}
        next={{ label: "transfer()", href: "/docs/sdk" }}
      />
    </PageWrapper>
  );
}
