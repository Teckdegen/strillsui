import { PageWrapper, Breadcrumb, DocNav, CodeBlock } from "@/components/docs/DocPage";

export const metadata = { title: "All Transactions — Zedkr SDK" };

const setupCode = `import { Zedkr } from "zedkr";
const client = await Zedkr.create({ provider }); // pass your ethers provider — that's all`;

const txs = [
  {
    title: "Send tokens",
    sub: "Transfer any ERC20 to a recipient",
    code: `const result = await client.transfer(signer, "0xRecipient", "0xToken", "10", 18);`,
  },
  {
    title: "Send all",
    sub: "Drain entire balance — fee auto-deducted",
    code: `const result = await client.transferAll(signer, "0xRecipient", "0xToken", 18);`,
  },
  {
    title: "DEX swap",
    sub: "Swap via BlazeSwap or any Uniswap V2 router",
    code: `const result = await client.swap(signer, DEX_ROUTER, callData);`,
  },
  {
    title: "Contract call",
    sub: "Call any on-chain function gaslessly",
    code: `const result = await client.call(signer, "0xContract", callData);`,
  },
];

export default function AllTransactions() {
  return (
    <PageWrapper>
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "SDK", href: "/docs/sdk" }, { label: "All Transactions" }]} />

      <h1 className="text-4xl font-bold text-white mb-3">All Transactions</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Every gasless operation follows the same pattern. Init the client once, call any method — done.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Setup — once</h2>
      <CodeBlock code={setupCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-10 mb-6">All operations — one line each</h2>
      <div className="flex flex-col gap-8">
        {txs.map(({ title, sub, code }, i) => (
          <div key={title}>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-6 h-6 rounded-full bg-green-600/20 border border-green-600/30 flex items-center justify-center text-xs font-bold text-green-400">
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
