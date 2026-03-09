import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "Approval & Gas — Transactions" };

const standardApprovalCode = `import { ethers } from "ethers";

const GASLESS_ROUTER = "0x658a064aE85c983869e32D478AD3B41a96982114";
const USDT = "0xC1A5B41512496B80903D1f32d6dEa3a73212E71F";

// Standard ERC20 approval — costs FLR gas, but only once per token
const usdt = new ethers.Contract(
  USDT,
  ["function approve(address spender, uint256 amount) returns (bool)"],
  signer
);

await usdt.approve(GASLESS_ROUTER, ethers.MaxUint256);
// ✅ After this, all USDT transfers are gasless forever`;

const exactApprovalCode = `// Use exact amount instead of MaxUint256 for tighter security
const amount = ethers.parseUnits("1000", 6); // approve 1000 USDT
await usdt.approve(GASLESS_ROUTER, amount);

// User will need to re-approve when this limit is used up`;

const permitCode = `// EIP-2612 Permit — no separate approval TX needed
// The SDK handles this automatically for permit-compatible tokens

// How it works internally:
const domain = { name: "USD Tether", version: "1", chainId: 114, verifyingContract: USDT };
const types = {
  Permit: [
    { name: "owner", type: "address" },
    { name: "spender", type: "address" },
    { name: "value", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
  ],
};
const permit = {
  owner: userAddress,
  spender: GASLESS_ROUTER,
  value: amount,
  nonce: await usdt.nonces(userAddress),
  deadline: Math.floor(Date.now() / 1000) + 300,
};
const permitSig = await signer.signTypedData(domain, types, permit);
// Permit signature included in the relayer request — no prior approval tx!`;

const checkAllowanceCode = `// Check current allowance before transacting
const usdt = new ethers.Contract(USDT, [
  "function allowance(address owner, address spender) view returns (uint256)",
], provider);

const allowance = await usdt.allowance(userAddress, GASLESS_ROUTER);
if (allowance === 0n) {
  // Show "Approve first" UI
} else {
  // Ready to transact gaslessly
}`;

const gaslessApprovalCode = `// Bootstrap scenario: user has USDT but zero FLR
// Use gasless call() to approve — but this requires fee token approval first!
//
// Catch-22: to use gasless call, user needs approval.
//
// Solution: Use a micro-faucet or wallet app to send the user ~0.001 FLR
// just for the one-time approval, then everything else is gasless.
//
// Alternatively, if the token supports EIP-2612 permit, no approval needed.`;

export default function TxApprovalGas() {
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Docs", href: "/docs" },
          { label: "Transactions", href: "/docs/transactions" },
          { label: "Approval & Gas" },
        ]}
      />

      <h1 className="text-4xl font-bold text-white mb-3">Approval & Gas</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Understanding the one-time approval requirement — what it is, why it exists,
        and how to minimize friction with EIP-2612 permit.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Why approve at all?</h2>
      <p className="text-sm text-white/50 leading-relaxed mb-6">
        The GaslessRouter pulls tokens from the user&apos;s wallet (fee + send amount).
        ERC20&apos;s <code className="text-purple-300 text-xs bg-purple-500/10 px-1.5 py-0.5 rounded">transferFrom</code>{" "}
        requires prior approval. This is a standard EVM security mechanism — no contract
        can move your tokens without your explicit consent.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Standard approval</h2>
      <CodeBlock code={standardApprovalCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Exact amount approval</h2>
      <p className="text-sm text-white/45 leading-relaxed mb-4">
        For higher security, approve only the amount you expect to spend.
        Trade-off: users need to re-approve when the limit runs out.
      </p>
      <CodeBlock code={exactApprovalCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">
        EIP-2612 Permit (no approval tx)
      </h2>
      <p className="text-sm text-white/45 leading-relaxed mb-4">
        Tokens with EIP-2612 support can be approved via a signature — no on-chain tx,
        no FLR needed. The SDK handles permit automatically when available.
      </p>
      <CodeBlock code={permitCode} language="typescript" />

      <Callout type="tip">
        With EIP-2612 permit, users can go fully gasless from day one — even for the
        first interaction. No FLR needed at any point.
      </Callout>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Check allowance in UI</h2>
      <CodeBlock code={checkAllowanceCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">The bootstrap problem</h2>
      <CodeBlock code={gaslessApprovalCode} language="typescript" />

      <Callout type="info">
        Most modern token bridges and faucets can send a tiny amount of FLR alongside
        tokens specifically for this one-time approval. After that, users never need FLR again.
      </Callout>

      <DocNav
        prev={{ label: "Contract Call", href: "/docs/transactions/call" }}
        next={{ label: "GaslessRouter", href: "/docs/contracts" }}
      />
    </PageWrapper>
  );
}
