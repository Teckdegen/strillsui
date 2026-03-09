import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "Approval Model — Security" };

const pullFeeCode = `// GaslessRouter._pullFee() — how the fee is collected
function _pullFee(
  address user,
  address feeToken,
  uint256 feeAmount
) internal {
  // Checks per-token fee cap (owner-configurable)
  if (maxFeePerToken[feeToken] > 0 && feeAmount > maxFeePerToken[feeToken]) {
    revert FeeTooHigh();
  }

  // Pulls fee from user → treasury
  // Handles both standard ERC20 (returns bool) and non-standard (returns nothing)
  (bool success, bytes memory data) = feeToken.call(
    abi.encodeWithSelector(IERC20.transferFrom.selector, user, treasury, feeAmount)
  );
  require(success && (data.length == 0 || abi.decode(data, (bool))), "Fee pull failed");
}`;

const feeCapCode = `// Owner sets per-token fee cap to protect users
// Example: max 1 USDT per transaction
await router.setMaxFeePerToken(
  USDT_ADDRESS,
  ethers.parseUnits("1", 6) // 1 USDT max
);

// Now if relayer quotes more than 1 USDT, the tx reverts with FeeTooHigh()`;

const approveOnceCode = `// ✅ One-time approval — MaxUint256
// Best UX: user approves once, never again
await usdt.approve(GASLESS_ROUTER, ethers.MaxUint256);

// ✅ Exact amount approval — more restrictive
// User re-approves when limit is used
await usdt.approve(GASLESS_ROUTER, ethers.parseUnits("100", 6));

// ❌ Never approve a random contract as GaslessRouter
// Only approve the official deployed GaslessRouter address`;

const riskCode = `// What MaxUint256 approval means:
// - GaslessRouter CAN pull up to MaxUint256 of your USDT
// - But it only pulls what's in the signed intent (feeAmount + transferAmount)
// - If GaslessRouter is compromised, your full USDT is at risk
//
// Mitigation: per-token fee cap limits how much can be pulled as a fee.
// The transfer amount is also in the signed intent — user approved it explicitly.
//
// Risk rating: LOW with a well-audited router + fee cap configured
// Risk rating: HIGH if router is compromised (use exact approvals if concerned)`;

const checkAllowanceCode = `// Revoke approval at any time
await usdt.approve(GASLESS_ROUTER, 0n);

// Check current approval
const allowance = await usdt.allowance(userAddress, GASLESS_ROUTER);
console.log("Approved:", ethers.formatUnits(allowance, 6), "USDT");`;

export default function SecurityApproval() {
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Docs", href: "/docs" },
          { label: "Security", href: "/docs/security" },
          { label: "Approval Model" },
        ]}
      />

      <h1 className="text-4xl font-bold text-white mb-3">Approval Model</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Understanding what token approvals mean, what risks they carry, and how per-token
        fee caps protect users from overcharging.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Why approval is needed</h2>
      <p className="text-sm text-white/50 leading-relaxed mb-6">
        The GaslessRouter uses <code className="text-purple-300 text-xs bg-purple-500/10 px-1.5 py-0.5 rounded">transferFrom</code>{" "}
        to pull tokens from the user. This is the standard EVM pattern for protocols that
        act on behalf of users. Without approval, no contract can touch your tokens.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">How the fee is pulled</h2>
      <CodeBlock code={pullFeeCode} language="solidity" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Per-token fee cap</h2>
      <p className="text-sm text-white/45 leading-relaxed mb-4">
        The contract owner can set a maximum fee per token. If the relayer ever quotes
        a fee above this cap, the transaction reverts — protecting users from overcharging.
      </p>
      <CodeBlock code={feeCapCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Approval options</h2>
      <CodeBlock code={approveOnceCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Risk analysis</h2>
      <CodeBlock code={riskCode} language="typescript" />

      <Callout type="warning">
        <strong>MaxUint256 approval</strong> gives the GaslessRouter unlimited spending power
        for that token. Only do this for contracts you trust. The fee cap provides an
        additional on-chain safety net.
      </Callout>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Revoking approval</h2>
      <CodeBlock code={checkAllowanceCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Security checklist</h2>
      <div className="flex flex-col gap-2.5 mb-6">
        {[
          "Only approve the official GaslessRouter address",
          "Verify the router address on the block explorer before approving",
          "Check that the owner has configured per-token fee caps",
          "Use exact-amount approvals for higher security (at the cost of re-approvals)",
          "Revoke approvals if you stop using the protocol",
          "Never share your private key — signatures are the only thing the relayer needs",
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 glass rounded-lg px-4 py-3">
            <div className="w-5 h-5 rounded border border-purple-500/40 bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm text-white/60">{item}</span>
          </div>
        ))}
      </div>

      <DocNav
        prev={{ label: "Replay Protection", href: "/docs/security/replay" }}
      />
    </PageWrapper>
  );
}
