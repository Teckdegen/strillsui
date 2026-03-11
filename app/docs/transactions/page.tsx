import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "ERC20 Transfer — Zedkr Docs" };

const code = `import { Zedkr } from "zedkr";
const client = await Zedkr.create({ provider });
const result = await client.transfer(signer, "0xRecipient", "0xUSDT", "25", 6);
console.log(result.txHash);`;

export default function TxTransfer() {
  return (
    <PageWrapper>
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Transactions" }, { label: "ERC20 Transfer" }]} />

      <h1 className="text-4xl font-bold text-white mb-3">ERC20 Transfer</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Send any ERC20 token to a recipient. The fee is pulled automatically from the user&apos;s
        chosen fee token. The recipient gets the exact amount — nothing extra required.
      </p>

      <CodeBlock code={code} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">What happens on-chain</h2>
      <div className="flex flex-col gap-3 mb-6">
        {[
          "User signs an EIP-712 intent off-chain — no gas, no broadcast",
          "Zedkr relayer validates the signature and submits the transaction",
          "Fee is pulled from the user's fee token balance",
          "The ERC20 transfer executes atomically in the same transaction",
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-3 text-sm text-white/55">
            <span className="w-5 h-5 rounded-full bg-green-600/20 border border-green-600/30 flex items-center justify-center shrink-0 text-xs text-green-400 font-bold mt-0.5">
              {i + 1}
            </span>
            {step}
          </div>
        ))}
      </div>

      <Callout type="info">
        Approve the router once for your fee token before the first transfer. See{" "}
        <a href="/docs/getting-started" className="underline text-green-400 hover:text-green-300">Getting Started</a>.
      </Callout>

      <DocNav
        prev={{ label: "All Transactions", href: "/docs/sdk/fee-quote" }}
        next={{ label: "Send All", href: "/docs/transactions/send-all" }}
      />
    </PageWrapper>
  );
}
