import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "transferAll() — SDK Reference" };

const signatureCode = `client.transferAll(
  signer: ethers.Signer,
  to: string,          // recipient address
  token: string,       // ERC20 token address
  decimals?: number    // token decimals (default: 18)
): Promise<TransferAllResult>`;

const resultCode = `interface TransferAllResult extends TxResult {
  sentAmount: string;   // human-readable amount actually sent
  feeDeducted: string;  // fee amount that was deducted
  feeToken: string;     // address of the fee token used
}`;

const usageCode = `// Drain entire USDT balance — fee auto-deducted, rest goes to recipient
const result = await client.transferAll(
  signer,
  "0x11E76F64Ec3E9A6867D5B462e247E8d08b1d8FFC",
  "0xC1A5B41512496B80903D1f32d6dEa3a73212E71F", // USDT
  6
);

console.log("Sent:", result.sentAmount, "USDT");
console.log("Fee deducted:", result.feeDeducted, "USDT");
console.log("tx:", result.txHash);`;

const differentFeeCode = `// If the fee is paid in a different token, the full balance is sent
// (e.g. user sends all FXRP, fee taken in USDT — they need USDT balance too)
const result = await client.transferAll(
  signer,
  recipient,
  FXRP_ADDRESS,
  18
);
// result.sentAmount === full FXRP balance
// result.feeDeducted is in USDT (different token)`;

export default function SdkTransferAll() {
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Docs", href: "/docs" },
          { label: "SDK Reference", href: "/docs/sdk" },
          { label: "transferAll()" },
        ]}
      />

      <h1 className="text-4xl font-bold text-white mb-3">transferAll()</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Send the user&apos;s entire token balance in one shot. If the fee token matches the send
        token, the fee is automatically deducted so the wallet drains to zero.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Signature</h2>
      <CodeBlock code={signatureCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Return value</h2>
      <CodeBlock code={resultCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Usage</h2>
      <CodeBlock code={usageCode} language="typescript" />

      <Callout type="tip">
        <strong>Same-token fee deduction</strong> — when the fee token equals the send token
        (e.g. sending USDT, fee in USDT), the SDK automatically computes
        {" "}<code className="text-purple-300 text-xs bg-purple-500/10 px-1 rounded">balance − fee</code>
        {" "}as the send amount. The wallet ends up at exactly zero.
      </Callout>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Cross-token fees</h2>
      <CodeBlock code={differentFeeCode} language="typescript" />

      <Callout type="info">
        If the relayer quotes a different token for the fee, the full balance of the send token
        is transferred and the fee is pulled from the user&apos;s fee-token balance separately.
      </Callout>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">How it works internally</h2>
      <div className="flex flex-col gap-3 mb-6">
        {[
          "Reads the user's full token balance on-chain",
          "Calls getFeeQuote() to determine the fee token and amount",
          "If fee token === send token: sendAmount = balance − feeAmount",
          "Calls transfer() with the computed amount",
          "Returns enriched result with sentAmount and feeDeducted",
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-3 text-sm text-white/55">
            <span className="w-5 h-5 rounded-full bg-purple-600/20 border border-purple-600/30 flex items-center justify-center shrink-0 text-xs text-purple-400 font-bold mt-0.5">
              {i + 1}
            </span>
            {step}
          </div>
        ))}
      </div>

      <DocNav
        prev={{ label: "transfer()", href: "/docs/sdk" }}
        next={{ label: "swap()", href: "/docs/sdk/swap" }}
      />
    </PageWrapper>
  );
}
