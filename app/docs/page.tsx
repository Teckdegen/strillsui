import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "Introduction — Strills Pay Docs" };

const installCode = `npm install @strills/paymaster-sdk ethers`;

const quickCode = `import { GaslessClient } from "@strills/paymaster-sdk";
import { ethers } from "ethers";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const client = GaslessClient.create({
  provider,
  relayerUrl: "https://your-relayer.railway.app",
  routerAddress: "0x658a064aE85c983869e32D478AD3B41a96982114",
  chainId: 114,
});

// Send 10 USDT — zero FLR needed
const result = await client.transfer(
  signer,
  "0xRecipientAddress",
  "0xC1A5B41512496B80903D1f32d6dEa3a73212E71F", // USDT
  "10",
  6
);

console.log("tx:", result.txHash);`;

export default function DocsIntro() {
  return (
    <PageWrapper>
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Introduction" }]} />

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1 text-xs text-purple-400 mb-5">
          Strills Paymaster SDK
        </div>
        <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
          Gasless Transactions on Flare
        </h1>
        <p className="text-lg text-white/50 leading-relaxed max-w-2xl">
          Strills Paymaster lets users send tokens, swap on DEXes, and call contracts —
          all without holding native FLR. Fees are paid in USDT, FXRP, or WC2FLR.
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          {
            title: "Zero FLR",
            desc: "Users never need native gas tokens. Sign once, we handle the rest.",
          },
          {
            title: "Any Fee Token",
            desc: "Pay in USDT, FXRP, or WC2FLR. Your choice at signing time.",
          },
          {
            title: "Non-Custodial",
            desc: "EIP-712 signatures. Your keys stay yours — always.",
          },
        ].map(({ title, desc }) => (
          <div key={title} className="glass p-4 rounded-xl">
            <div className="text-sm font-semibold text-white mb-1">{title}</div>
            <div className="text-xs text-white/40 leading-relaxed">{desc}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-white mb-4">How it works</h2>
      <p className="text-white/50 text-sm leading-relaxed mb-6">
        The user signs an EIP-712 typed-data intent off-chain. The SDK sends this to the
        relayer, which validates the signature, estimates gas, deducts a small fee in the
        user&apos;s chosen token, then submits the transaction on-chain — paying FLR gas from its
        own wallet. The GaslessRouter contract verifies the signature, pulls the fee, and
        executes the user&apos;s intended action atomically.
      </p>

      <div className="flex flex-col gap-3 mb-10">
        {[
          { n: "1", label: "User signs an intent", sub: "EIP-712 typed data, off-chain only" },
          { n: "2", label: "SDK sends to relayer", sub: "Relayer validates + estimates fee" },
          { n: "3", label: "Relayer submits on-chain", sub: "Pays FLR gas from relayer wallet" },
          { n: "4", label: "Contract executes atomically", sub: "Fee pulled → action executed" },
        ].map(({ n, label, sub }) => (
          <div key={n} className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-600/30 flex items-center justify-center shrink-0 text-sm font-bold text-purple-400">
              {n}
            </div>
            <div>
              <div className="text-sm font-medium text-white">{label}</div>
              <div className="text-xs text-white/35">{sub}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-white mb-4">Quick start</h2>
      <CodeBlock code={installCode} language="bash" />
      <CodeBlock code={quickCode} language="typescript" />

      <Callout type="tip">
        On Coston2 testnet, the router is already deployed. See{" "}
        <a href="/docs/contracts/addresses" className="underline text-purple-400 hover:text-purple-300">
          Contract Addresses
        </a>{" "}
        for the full list.
      </Callout>

      <DocNav
        next={{ label: "Getting Started", href: "/docs/getting-started" }}
      />
    </PageWrapper>
  );
}
