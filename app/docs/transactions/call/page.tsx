import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "Contract Call — Transactions" };

const genericCallCode = `import { ethers } from "ethers";

// Call any function on any contract — gaslessly
const iface = new ethers.Interface([
  "function myFunction(address user, uint256 amount)",
]);

const callData = iface.encodeFunctionData("myFunction", [
  await signer.getAddress(),
  ethers.parseUnits("100", 18),
]);

const result = await client.call(
  signer,
  "0xYourContractAddress",
  callData
);

if (result.status === "success") {
  console.log("Contract called! tx:", result.txHash);
}`;

const nftMintCode = `// Gasless NFT mint
const nftIface = new ethers.Interface([
  "function mint(address to, uint256 tokenId)",
]);

const callData = nftIface.encodeFunctionData("mint", [
  await signer.getAddress(),
  BigInt(42), // tokenId
]);

const result = await client.call(signer, NFT_CONTRACT, callData);`;

const govVoteCode = `// Gasless governance vote
const govIface = new ethers.Interface([
  "function castVote(uint256 proposalId, uint8 support)",
]);
// support: 0 = Against, 1 = For, 2 = Abstain

const callData = govIface.encodeFunctionData("castVote", [
  proposalId,
  1, // For
]);

const result = await client.call(signer, GOVERNANCE_CONTRACT, callData);`;

const limitsCode = `// Limitations of gasless calls:
//
// ✅ msg.sender = GaslessRouter (the contract sees router as caller)
// ✅ intent.user = the actual user (verified via EIP-712 signature)
// ❌ msg.value cannot be non-zero (no ETH/FLR forwarding)
// ❌ Target contracts that require msg.sender === EOA will fail
//
// Best for: token operations, DeFi interactions, governance, NFTs
// Not suitable for: contracts that do tx.origin checks`;

export default function TxCall() {
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Docs", href: "/docs" },
          { label: "Transactions", href: "/docs/transactions" },
          { label: "Contract Call" },
        ]}
      />

      <h1 className="text-4xl font-bold text-white mb-3">Contract Call</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Execute any smart contract function gaslessly. From governance voting to NFT minting —
        encode the calldata with ethers.js and submit without FLR.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Generic call</h2>
      <CodeBlock code={genericCallCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Example — NFT mint</h2>
      <CodeBlock code={nftMintCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">
        Example — Governance vote
      </h2>
      <CodeBlock code={govVoteCode} language="typescript" />

      <Callout type="tip">
        Gasless voting is a powerful UX improvement — token holders can participate in
        governance even if their wallet has no FLR.
      </Callout>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Limitations</h2>
      <CodeBlock code={limitsCode} language="typescript" />

      <Callout type="warning">
        The GaslessRouter is <code className="text-yellow-300 text-xs bg-yellow-500/10 px-1.5 py-0.5 rounded">msg.sender</code>{" "}
        when calling the target contract. Contracts that check{" "}
        <code className="text-yellow-300 text-xs bg-yellow-500/10 px-1.5 py-0.5 rounded">msg.sender === user</code>{" "}
        will not work without modification.
      </Callout>

      <DocNav
        prev={{ label: "DEX Swap", href: "/docs/transactions/swap" }}
        next={{ label: "Approval Gas", href: "/docs/transactions/approval-gas" }}
      />
    </PageWrapper>
  );
}
