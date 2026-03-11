import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "Approval & Gas — Zedkr Docs" };

const approveCode = `import { ethers } from "ethers";

const USDT   = "0xC1A5B41512496B80903D1f32d6dEa3a73212E71F";
const ROUTER = (await client.getConfig()).routerAddress;

const usdt = new ethers.Contract(USDT, ["function approve(address,uint256)"], signer);
await usdt.approve(ROUTER, ethers.MaxUint256); // one-time, per token`;

export default function TxApproval() {
  return (
    <PageWrapper>
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Transactions" }, { label: "Approval & Gas" }]} />

      <h1 className="text-4xl font-bold text-white mb-3">Approval &amp; Gas</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        There is exactly one transaction that requires FLR gas: the initial ERC20 approval.
        After that, every interaction through Zedkr is completely gasless — forever.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">One-time approval</h2>
      <CodeBlock code={approveCode} language="typescript" />

      <Callout type="tip">
        Tokens with EIP-2612 permit support (like some USDT versions) skip this entirely —
        the SDK handles permit signing automatically. No FLR ever needed.
      </Callout>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Approval rules</h2>
      <div className="flex flex-col gap-3">
        {[
          "One approval per fee token (USDT, FXRP, or WC2FLR)",
          "Approve the Zedkr router address — not any other contract",
          "MaxUint256 means you never need to re-approve",
          "The fee cap in the router limits the maximum the router can pull per transaction",
        ].map((rule, i) => (
          <div key={i} className="flex items-start gap-3 text-sm text-white/55">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/60 mt-2 shrink-0" />
            {rule}
          </div>
        ))}
      </div>

      <DocNav
        prev={{ label: "Contract Call", href: "/docs/transactions/call" }}
        next={{ label: "How Signatures Work", href: "/docs/security" }}
      />
    </PageWrapper>
  );
}
