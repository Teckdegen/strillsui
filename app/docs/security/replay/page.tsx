import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "Replay Protection | Zedkr Docs" };

const nonceCode = `// Each user has an incrementing nonce stored on-chain
// Once an intent is executed, that nonce is consumed
// Sending the same signed intent again → reverts with "nonce used"

intent.nonce = await client.getNonce(userAddress); // always fresh`;

export default function SecurityReplay() {
  return (
    <PageWrapper>
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Security" }, { label: "Replay Protection" }]} />

      <h1 className="text-4xl font-bold text-white mb-3">Replay Protection</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Zedkr uses three layers of replay protection. A signed intent can only execute once,
        on one chain, within its deadline window.
      </p>

      <div className="flex flex-col gap-4 mb-8">
        {[
          {
            label: "Nonce",
            desc: "Every intent carries a per-user nonce. Once consumed on-chain, that nonce can never be used again. The SDK always fetches the current nonce automatically.",
          },
          {
            label: "Deadline",
            desc: "Intents include a Unix timestamp deadline. The router rejects any intent submitted after the deadline, even if the nonce hasn't been consumed.",
          },
          {
            label: "Chain ID",
            desc: "The EIP-712 domain separator includes the chain ID. A signature valid on Coston2 cannot be replayed on Flare mainnet or any other network.",
          },
        ].map(({ label, desc }) => (
          <div key={label} className="glass rounded-xl px-5 py-4">
            <div className="text-sm font-semibold text-green-400 mb-1">{label}</div>
            <div className="text-sm text-white/50 leading-relaxed">{desc}</div>
          </div>
        ))}
      </div>

      <CodeBlock code={nonceCode} language="typescript" />

      <Callout type="info">
        The SDK manages nonces automatically. You never need to fetch or track them manually.
      </Callout>

      <DocNav
        prev={{ label: "How Signatures Work", href: "/docs/security" }}
        next={{ label: "Approval Model", href: "/docs/security/approval" }}
      />
    </PageWrapper>
  );
}
