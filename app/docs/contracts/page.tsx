import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "GaslessRouter — Contracts" };

const executeCode = `// Solidity (simplified) — what happens on-chain
function execute(Intent calldata intent, bytes calldata sig) external {
  // 1. Verify EIP-712 signature
  address signer = _recoverSigner(intent, sig);
  if (signer != intent.user) revert InvalidSignature();

  // 2. Check nonce (replay protection)
  if (nonces[intent.user] != intent.nonce) revert BadNonce();
  nonces[intent.user]++;

  // 3. Check deadline
  if (block.timestamp > intent.deadline) revert Expired();

  // 4. Pull fee from user → treasury
  _pullFee(intent.user, intent.feeToken, intent.feeAmount);

  // 5. Execute the intended call
  (bool ok, ) = intent.target.call(intent.callData);
  if (!ok) revert CallFailed();
}`;

const intentStructCode = `// The Intent struct signed by users (EIP-712)
struct Intent {
  address user;        // signer's address
  address target;      // contract to call
  bytes   callData;    // ABI-encoded function call
  address feeToken;    // USDT / FXRP / WC2FLR
  uint256 feeAmount;   // fee in token's native decimals
  uint256 nonce;       // replay protection nonce
  uint256 deadline;    // unix timestamp expiry
}`;

const domainCode = `// EIP-712 domain separator
const domain = {
  name: "GaslessRouter",
  version: "1",
  chainId: 114,
  verifyingContract: "0x658a064aE85c983869e32D478AD3B41a96982114",
};`;

const adminCode = `// Owner-only functions
function setTreasury(address newTreasury) external onlyOwner;
function setMaxFeePerToken(address token, uint256 maxFee) external onlyOwner;

// View functions
function nonces(address user) external view returns (uint256);
function maxFeePerToken(address token) external view returns (uint256);
function treasury() external view returns (address);`;

const securityFeatures = [
  {
    title: "Signature Verification",
    desc: "EIP-712 typed data. ecrecover result is checked for zero address. Signature malleability (high-s) rejected.",
  },
  {
    title: "Nonce Replay Protection",
    desc: "Sequential nonces prevent the same intent from being executed twice.",
  },
  {
    title: "Deadline Enforcement",
    desc: "Intents expire at a unix timestamp set by the user at signing time.",
  },
  {
    title: "Per-Token Fee Cap",
    desc: "Owner can set a maximum fee per token. Prevents relayer from overcharging.",
  },
  {
    title: "Zero Address Guards",
    desc: "intent.user and ecrecover output are checked against address(0).",
  },
];

export default function ContractsGaslessRouter() {
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Docs", href: "/docs" },
          { label: "Contracts", href: "/docs/contracts" },
          { label: "GaslessRouter" },
        ]}
      />

      <h1 className="text-4xl font-bold text-white mb-3">GaslessRouter</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        The on-chain contract that verifies intent signatures and executes user actions.
        It is the only contract users need to approve — all actions flow through it.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Intent struct</h2>
      <CodeBlock code={intentStructCode} language="solidity" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">EIP-712 domain</h2>
      <CodeBlock code={domainCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">
        execute() — core function
      </h2>
      <p className="text-sm text-white/45 leading-relaxed mb-4">
        Called by the relayer once it has the signed intent. Verifies, collects fee, and
        dispatches the call — all atomically.
      </p>
      <CodeBlock code={executeCode} language="solidity" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Admin functions</h2>
      <CodeBlock code={adminCode} language="solidity" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Security features</h2>
      <div className="flex flex-col gap-3 mb-8">
        {securityFeatures.map(({ title, desc }) => (
          <div key={title} className="glass rounded-xl p-4 flex gap-3">
            <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0" />
            <div>
              <div className="text-sm font-medium text-white mb-0.5">{title}</div>
              <div className="text-xs text-white/45 leading-relaxed">{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <Callout type="tip">
        The contract has no upgrade mechanism — it is immutable once deployed.
        Fee configuration (treasury, fee caps) can be updated by the owner without redeployment.
      </Callout>

      <DocNav
        prev={{ label: "Approval & Gas", href: "/docs/transactions/approval-gas" }}
        next={{ label: "Addresses", href: "/docs/contracts/addresses" }}
      />
    </PageWrapper>
  );
}
