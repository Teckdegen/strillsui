import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "Approval Model — Zedkr Docs" };

const approveCode = `// Approve once — the router can then pull fees for every future transaction
const usdt = new ethers.Contract(USDT_ADDRESS, ["function approve(address,uint256)"], signer);
await usdt.approve(ROUTER_ADDRESS, ethers.MaxUint256);`;

export default function SecurityApproval() {
  return (
    <PageWrapper>
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Security" }, { label: "Approval Model" }]} />

      <h1 className="text-4xl font-bold text-white mb-3">Approval Model</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Zedkr uses standard ERC20 <code className="text-green-300/80 text-xs bg-green-500/10 px-1 rounded">approve</code> to
        pull fees. The router is the only address that can spend tokens — and only up to the per-transaction fee cap.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">How it works</h2>
      <CodeBlock code={approveCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Safety properties</h2>
      <div className="flex flex-col gap-3 mb-6">
        {[
          "The fee cap (set in the router) limits the maximum the router can pull per transaction — even with MaxUint256 approval",
          "The intent's maxFee field gives users a second layer of control — they sign exactly what they agree to pay",
          "Only the official Zedkr router address can use the approval — no other contract",
          "Users can revoke approval at any time with approve(ROUTER, 0)",
        ].map((rule, i) => (
          <div key={i} className="flex items-start gap-3 text-sm text-white/55">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/60 mt-2 shrink-0" />
            {rule}
          </div>
        ))}
      </div>

      <Callout type="warning">
        Always verify the router address before approving. Only approve the official Zedkr router
        shown in the SDK — never a random address claiming to be it.
      </Callout>

      <DocNav
        prev={{ label: "Replay Protection", href: "/docs/security/replay" }}
      />
    </PageWrapper>
  );
}
