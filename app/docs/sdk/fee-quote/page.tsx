import { PageWrapper, Breadcrumb, DocNav, CodeBlock } from "@/components/docs/DocPage";

export const metadata = { title: "All Transactions — SDK Reference" };

const txs = [
  {
    title: "Send tokens",
    sub: "Transfer any ERC20 to a recipient",
    code: `const result = await client.transfer(
  signer,
  "0xRecipientAddress",
  "0xTokenAddress",
  "10", // amount
  18    // decimals
);`,
  },
  {
    title: "Send all",
    sub: "Drain entire balance — fee auto-deducted",
    code: `const result = await client.transferAll(
  signer,
  "0xRecipientAddress",
  "0xTokenAddress",
  18 // decimals
);`,
  },
  {
    title: "DEX swap",
    sub: "Swap tokens via BlazeSwap or any Uniswap V2 router",
    code: `const result = await client.swap(
  signer,
  "0xDexRouterAddress",
  callData // ABI-encoded swap call
);`,
  },
  {
    title: "Contract call",
    sub: "Call any smart contract function gaslessly",
    code: `const result = await client.call(
  signer,
  "0xContractAddress",
  callData // ABI-encoded function call
);`,
  },
];

export default function AllTransactions() {
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Docs", href: "/docs" },
          { label: "SDK Reference", href: "/docs/sdk" },
          { label: "All Transactions" },
        ]}
      />

      <h1 className="text-4xl font-bold text-white mb-3">All Transactions</h1>
      <p className="text-white/50 text-base leading-relaxed mb-10">
        Every gasless operation in 5 lines. Import the client, call the method, done.
      </p>

      <div className="flex flex-col gap-10">
        {txs.map(({ title, sub, code }, i) => (
          <div key={title}>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-6 h-6 rounded-full bg-purple-600/20 border border-purple-600/30 flex items-center justify-center text-xs font-bold text-purple-400">
                {i + 1}
              </span>
              <div>
                <span className="text-base font-semibold text-white">{title}</span>
                <span className="ml-3 text-xs text-white/35">{sub}</span>
              </div>
            </div>
            <CodeBlock code={code} language="typescript" />
          </div>
        ))}
      </div>

      <DocNav
        prev={{ label: "call()", href: "/docs/sdk/call" }}
        next={{ label: "ERC20 Transfer", href: "/docs/transactions" }}
      />
    </PageWrapper>
  );
}
