import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "Introduction | Zedkr Docs" };

const installCode = `npm install zedkr ethers`;

const quickCode = `import { Zedkr } from "zedkr";
import { ethers } from "ethers";
const provider = new ethers.BrowserProvider(window.ethereum);
const client   = await Zedkr.create({ provider });
const result   = await client.transfer(signer, "0xRecipient", "0xToken", "10", 6);`;

export default function DocsIntro() {
  return (
    <PageWrapper>
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Introduction" }]} />

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1 text-xs text-green-400 mb-5">
          Zedkr SDK
        </div>
        <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
          Gasless Transactions on Flare
        </h1>
        <p className="text-lg text-white/50 leading-relaxed max-w-2xl">
          Send tokens, swap on DEXes, call any contract, without holding FLR.
          Fees are paid in USDT, FXRP, or WC2FLR. Five lines of code. That&apos;s it.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { title: "Zero FLR",      desc: "Users never need native gas. Sign once, Zedkr handles the rest." },
          { title: "Any Fee Token", desc: "Pay in USDT, FXRP, or WC2FLR. Your choice at signing time." },
          { title: "5 Lines",       desc: "Pass your provider, that's all the config you'll ever need." },
        ].map(({ title, desc }) => (
          <div key={title} className="glass p-4 rounded-xl">
            <div className="text-sm font-semibold text-white mb-1">{title}</div>
            <div className="text-xs text-white/40 leading-relaxed">{desc}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-white mb-4">How it works</h2>
      <div className="flex flex-col gap-3 mb-10">
        {[
          { n: "1", label: "User signs an intent",        sub: "EIP-712 typed data, off-chain" },
          { n: "2", label: "SDK sends to Zedkr relayer",  sub: "Built-in, no URL to configure" },
          { n: "3", label: "Relayer submits on-chain",    sub: "Pays FLR gas from relayer wallet" },
          { n: "4", label: "Fee pulled, action executed", sub: "Atomic, sign once, done" },
        ].map(({ n, label, sub }) => (
          <div key={n} className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-green-600/20 border border-green-600/30 flex items-center justify-center shrink-0 text-sm font-bold text-green-400">
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
        The relayer and router are built into the SDK. Pass your provider, nothing else.
      </Callout>

      <DocNav next={{ label: "Getting Started", href: "/docs/getting-started" }} />
    </PageWrapper>
  );
}
