import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "Replay Protection — Security" };

const nonceCode = `// Solidity — nonce management
mapping(address => uint256) public nonces;

function execute(Intent calldata intent, bytes calldata sig) external {
  // Nonce must match current value
  if (nonces[intent.user] != intent.nonce) revert BadNonce();

  // Increment BEFORE any external calls (reentrancy + replay protection)
  nonces[intent.user]++;

  // ... rest of execution
}`;

const sdkNonceCode = `// The SDK automatically fetches the current nonce before signing
const nonce = await router.nonces(userAddress);

const intent = {
  ...
  nonce,   // included in EIP-712 signature
  deadline: Math.floor(Date.now() / 1000) + 300,
};`;

const deadlineCode = `// Deadline enforcement
if (block.timestamp > intent.deadline) revert Expired();

// Typical deadline: 5 minutes from signing
const deadline = Math.floor(Date.now() / 1000) + 300;

// For long-running operations: up to 30 minutes
const deadline = Math.floor(Date.now() / 1000) + 1800;`;

const crossChainCode = `// EIP-712 domain prevents cross-chain replay
const domain = {
  name: "GaslessRouter",
  version: "1",
  chainId: 114,              // Coston2 — hardcoded in domain
  verifyingContract: "0x658a064aE85c983869e32D478AD3B41a96982114",
};

// A signature created for chainId 114 CANNOT be used on:
// - Flare mainnet (chainId 14)
// - Ethereum (chainId 1)
// - Any other network`;

const attackScenario = `// What replay protection prevents:

// ATTACK: Relayer captures Alice's valid signature for "send 10 USDT"
// ATTEMPT: Relayer submits the SAME signature a second time
// RESULT: REVERTS with BadNonce()
//   → nonces[Alice] is now 1, intent.nonce is still 0
//   → mismatch → revert ✅

// ATTACK: Relayer captures Alice's signature, waits for deadline
// ATTEMPT: Submits the signature after deadline
// RESULT: REVERTS with Expired()
//   → block.timestamp > intent.deadline → revert ✅`;

export default function SecurityReplay() {
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Docs", href: "/docs" },
          { label: "Security", href: "/docs/security" },
          { label: "Replay Protection" },
        ]}
      />

      <h1 className="text-4xl font-bold text-white mb-3">Replay Protection</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Three layers prevent a signed intent from being executed more than once:
        sequential nonces, deadlines, and chain-bound domain separators.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Layer 1 — Sequential nonces</h2>
      <p className="text-sm text-white/45 leading-relaxed mb-4">
        Each user has an incrementing nonce in the contract. Once an intent is executed,
        the nonce advances — the same signature can never be used again.
      </p>
      <CodeBlock code={nonceCode} language="solidity" />

      <CodeBlock code={sdkNonceCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Layer 2 — Deadlines</h2>
      <p className="text-sm text-white/45 leading-relaxed mb-4">
        Every intent has an expiry timestamp. Even if a relayer holds a valid signature,
        it cannot submit it after the deadline.
      </p>
      <CodeBlock code={deadlineCode} language="typescript" />

      <Callout type="info">
        Set short deadlines (5 min) for better UX safety. Longer deadlines are fine for
        flows where the user might be slow to confirm in a UI.
      </Callout>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">
        Layer 3 — Chain-bound domain
      </h2>
      <p className="text-sm text-white/45 leading-relaxed mb-4">
        The EIP-712 domain includes <code className="text-purple-300 text-xs bg-purple-500/10 px-1.5 py-0.5 rounded">chainId</code>{" "}
        and <code className="text-purple-300 text-xs bg-purple-500/10 px-1.5 py-0.5 rounded">verifyingContract</code>.
        Signatures are bound to one specific contract on one specific chain.
      </p>
      <CodeBlock code={crossChainCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Attack scenarios</h2>
      <CodeBlock code={attackScenario} language="typescript" />

      <Callout type="tip">
        The nonce is fetched automatically by the SDK. Developers don&apos;t need to manage
        it manually — just call <code className="text-purple-300 text-xs bg-purple-500/10 px-1.5 py-0.5 rounded">client.transfer()</code>{" "}
        and the SDK handles everything.
      </Callout>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Summary</h2>
      <div className="glass rounded-xl overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wide">Layer</th>
              <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wide">Mechanism</th>
              <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wide">Prevents</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {[
              ["Nonce", "Sequential counter per user", "Same signature used twice"],
              ["Deadline", "Block timestamp check", "Stale signatures submitted later"],
              ["Domain", "chainId + contract address", "Cross-chain replay attacks"],
            ].map(([l, m, p]) => (
              <tr key={l}>
                <td className="px-5 py-3 font-medium text-white text-xs">{l}</td>
                <td className="px-5 py-3 text-white/50 text-xs">{m}</td>
                <td className="px-5 py-3 text-white/50 text-xs">{p}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DocNav
        prev={{ label: "How Signatures Work", href: "/docs/security" }}
        next={{ label: "Approval Model", href: "/docs/security/approval" }}
      />
    </PageWrapper>
  );
}
