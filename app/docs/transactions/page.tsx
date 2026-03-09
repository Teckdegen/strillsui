import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "ERC20 Transfer — Transactions" };

const flowCode = `// Full gasless ERC20 transfer flow

// 1. ONE-TIME: Approve the router (costs FLR gas, done once per token)
const token = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, signer);
await token.approve(GASLESS_ROUTER, ethers.MaxUint256);

// 2. EVERY TIME: Sign + send gaslessly
const result = await client.transfer(
  signer,
  "0xRecipient",
  TOKEN_ADDRESS,
  "50",  // amount
  18     // decimals
);`;

const underHoodCode = `// What happens under the hood when you call transfer():

// 1. SDK builds an EIP-712 typed-data intent:
const intent = {
  user: userAddress,
  target: tokenAddress,
  callData: token.interface.encodeFunctionData("transfer", [to, amountWei]),
  feeToken: USDT_ADDRESS,
  feeAmount: feeWei,
  nonce: currentNonce,
  deadline: Math.floor(Date.now() / 1000) + 300,
};

// 2. User signs (MetaMask shows a readable structured data popup)
const signature = await signer.signTypedData(domain, types, intent);

// 3. SDK POSTs to relayer: { intent, signature }
// 4. Relayer verifies signature, submits tx, router executes on-chain`;

const errorHandling = `const result = await client.transfer(signer, to, token, "50", 18);

if (result.status === "failed") {
  console.error("Transfer failed:", result.error);
  // "Insufficient balance", "Allowance too low", "Deadline expired", etc.
}`;

export default function TxTransfer() {
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Docs", href: "/docs" },
          { label: "Transactions", href: "/docs/transactions" },
          { label: "ERC20 Transfer" },
        ]}
      />

      <h1 className="text-4xl font-bold text-white mb-3">ERC20 Transfer</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Send any ERC20 token on Flare without FLR. The most common gasless operation —
        perfect for peer-to-peer payments, payroll, and onboarding new users.
      </p>

      {/* Supported tokens */}
      <h2 className="text-xl font-semibold text-white mb-4">Supported tokens</h2>
      <div className="glass rounded-xl overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wide">Token</th>
              <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wide">Address (Coston2)</th>
              <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wide">Decimals</th>
              <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wide">Fee token?</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {[
              ["USDT", "0xC1A5B41...E71F", "6", "Yes"],
              ["FXRP", "0x0b6A36...dc7", "18", "Yes"],
              ["WC2FLR", "0xC67DCE...273", "18", "Yes"],
              ["Any ERC20", "—", "varies", "No (can send, not pay fee)"],
            ].map(([t, a, d, f]) => (
              <tr key={t}>
                <td className="px-5 py-3 font-medium text-white text-xs">{t}</td>
                <td className="px-5 py-3 font-mono text-purple-300 text-xs">{a}</td>
                <td className="px-5 py-3 text-white/50 text-xs">{d}</td>
                <td className="px-5 py-3 text-white/50 text-xs">{f}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold text-white mb-3">Full flow</h2>
      <CodeBlock code={flowCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Under the hood</h2>
      <p className="text-sm text-white/45 leading-relaxed mb-4">
        The SDK builds an EIP-712 intent, signs it locally, and sends it to the relayer.
        No raw transaction is constructed client-side.
      </p>
      <CodeBlock code={underHoodCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Error handling</h2>
      <CodeBlock code={errorHandling} language="typescript" />

      <Callout type="info">
        Any ERC20 token can be <em>sent</em> gaslessly — but only USDT, FXRP, and WC2FLR
        can be used to <em>pay the fee</em>. The user must hold at least one fee token.
      </Callout>

      <DocNav
        prev={{ label: "getFeeQuote()", href: "/docs/sdk/fee-quote" }}
        next={{ label: "Send All", href: "/docs/transactions/send-all" }}
      />
    </PageWrapper>
  );
}
