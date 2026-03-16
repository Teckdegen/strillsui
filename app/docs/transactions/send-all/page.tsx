import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "Send All | Zedkr Docs" };

const code = `import { Zedkr } from "zedkr";
const client = await Zedkr.create({ provider });
const result = await client.transferAll(signer, "0xRecipient", "0xUSDT", 6);
console.log(\`Sent \${result.sentAmount} USDT\`);`;

export default function TxSendAll() {
  return (
    <PageWrapper>
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Transactions" }, { label: "Send All" }]} />

      <h1 className="text-4xl font-bold text-white mb-3">Send All</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Drain the user&apos;s entire token balance to a recipient. When sending and paying fees in the same
        token, Zedkr automatically computes <strong>balance − fee</strong> so the wallet goes to exactly zero.
      </p>

      <CodeBlock code={code} language="typescript" />

      <Callout type="tip">
        <strong>Zero wallet</strong> - if fee token = send token (e.g. USDT to USDT), the user&apos;s
        balance lands at exactly 0. No dust left behind.
      </Callout>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">How the amount is calculated</h2>
      <div className="flex flex-col gap-3">
        {[
          "Reads the user's full on-chain balance",
          "Fetches the fee quote from the relayer",
          "If same token: sentAmount = balance − fee",
          "If different token: sends full balance, fee pulled separately",
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-3 text-sm text-white/55">
            <span className="w-5 h-5 rounded-full bg-green-600/20 border border-green-600/30 flex items-center justify-center shrink-0 text-xs text-green-400 font-bold mt-0.5">
              {i + 1}
            </span>
            {step}
          </div>
        ))}
      </div>

      <DocNav
        prev={{ label: "ERC20 Transfer", href: "/docs/transactions" }}
        next={{ label: "DEX Swap", href: "/docs/transactions/swap" }}
      />
    </PageWrapper>
  );
}
