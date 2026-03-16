import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "Contract Call | Zedkr Docs" };

const code = `import { Zedkr } from "zedkr";
const client   = await Zedkr.create({ provider });
const callData = iface.encodeFunctionData("stake", [ethers.parseUnits("100", 18)]);
const result   = await client.call(signer, STAKING_CONTRACT, callData);
console.log(result.txHash);`;

const encodeCode = `import { ethers } from "ethers";

const iface    = new ethers.Interface(["function stake(uint256 amount)"]);
const callData = iface.encodeFunctionData("stake", [ethers.parseUnits("100", 18)]);
const result   = await client.call(signer, "0xStakingContract", callData);`;

export default function TxCall() {
  return (
    <PageWrapper>
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Transactions" }, { label: "Contract Call" }]} />

      <h1 className="text-4xl font-bold text-white mb-3">Contract Call</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Call any smart contract function without FLR gas. Stake tokens, mint NFTs, vote on
        governance, any on-chain action, fully gasless.
      </p>

      <CodeBlock code={code} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Encoding calldata</h2>
      <CodeBlock code={encodeCode} language="typescript" />

      <Callout type="warning">
        The Zedkr router becomes <code className="text-green-300/80 text-xs bg-green-500/10 px-1 rounded">msg.sender</code> when
        calling the target contract. Contracts that require <code className="text-green-300/80 text-xs bg-green-500/10 px-1 rounded">msg.sender === EOA</code> will not work.
      </Callout>

      <DocNav
        prev={{ label: "DEX Swap", href: "/docs/transactions/swap" }}
        next={{ label: "Approval & Gas", href: "/docs/transactions/approval-gas" }}
      />
    </PageWrapper>
  );
}
