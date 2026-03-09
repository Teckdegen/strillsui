import { PageWrapper, Breadcrumb, DocNav, CodeBlock, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "How Signatures Work — Security" };

const typesCode = `// EIP-712 types for the Intent struct
const types = {
  Intent: [
    { name: "user",       type: "address" },
    { name: "target",     type: "address" },
    { name: "callData",   type: "bytes"   },
    { name: "feeToken",   type: "address" },
    { name: "feeAmount",  type: "uint256" },
    { name: "nonce",      type: "uint256" },
    { name: "deadline",   type: "uint256" },
  ],
};`;

const signingCode = `// How the SDK signs an intent
const domain = {
  name: "GaslessRouter",
  version: "1",
  chainId: 114,
  verifyingContract: GASLESS_ROUTER_ADDRESS,
};

const intent = {
  user: await signer.getAddress(),
  target: TOKEN_ADDRESS,
  callData: token.interface.encodeFunctionData("transfer", [to, amountWei]),
  feeToken: USDT_ADDRESS,
  feeAmount: feeWei,
  nonce: await router.nonces(userAddress),
  deadline: Math.floor(Date.now() / 1000) + 300,
};

// MetaMask shows a human-readable popup — user sees exactly what they're approving
const signature = await signer.signTypedData(domain, types, intent);`;

const verifyCode = `// On-chain verification in GaslessRouter.sol (simplified)
bytes32 structHash = keccak256(abi.encode(
  INTENT_TYPEHASH,
  intent.user,
  intent.target,
  keccak256(intent.callData),
  intent.feeToken,
  intent.feeAmount,
  intent.nonce,
  intent.deadline
));

bytes32 digest = _hashTypedDataV4(structHash);
address recovered = ECDSA.recover(digest, sig);

// Guards against zero-address and signature malleability
if (recovered == address(0) || recovered != intent.user) {
  revert InvalidSignature();
}`;

const walletPopupCode = `// What MetaMask shows the user — fully readable, no raw bytes:
// ┌─────────────────────────────────────────────────────┐
// │  Signature Request                                   │
// │  GaslessRouter (0x658a...2114)                       │
// │                                                      │
// │  user:      0x11E7...FFC                             │
// │  target:    0xC1A5...E71F (USDT)                     │
// │  feeToken:  0xC1A5...E71F (USDT)                     │
// │  feeAmount: 15400 (0.0154 USDT)                      │
// │  nonce:     42                                       │
// │  deadline:  1709123456 (5 min from now)              │
// │                                                      │
// │  [Sign]  [Cancel]                                    │
// └─────────────────────────────────────────────────────┘`;

export default function SecuritySignatures() {
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Docs", href: "/docs" },
          { label: "Security", href: "/docs/security" },
          { label: "How Signatures Work" },
        ]}
      />

      <h1 className="text-4xl font-bold text-white mb-3">How Signatures Work</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        Every gasless transaction is authorized by an EIP-712 typed-data signature.
        The user&apos;s private key never leaves their device — the relayer only receives a signature.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Why EIP-712?</h2>
      <p className="text-sm text-white/50 leading-relaxed mb-6">
        EIP-712 structures the data being signed so wallets can display it in a human-readable
        format. Instead of signing opaque bytes, users see exactly what they&apos;re authorizing:
        who gets paid, how much, what the deadline is, and what action will be executed.
      </p>
      <CodeBlock code={walletPopupCode} language="bash" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Type definitions</h2>
      <CodeBlock code={typesCode} language="typescript" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">Signing flow (SDK)</h2>
      <CodeBlock code={signingCode} language="typescript" />

      <Callout type="tip">
        The signature commits to every field of the intent — including the fee amount and
        deadline. The relayer cannot alter any field without invalidating the signature.
      </Callout>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">On-chain verification</h2>
      <CodeBlock code={verifyCode} language="solidity" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Security properties</h2>
      <div className="grid grid-cols-1 gap-3 mb-6">
        {[
          {
            label: "Non-custodial",
            desc: "Private key stays in the user's wallet. Relayer only holds a signature.",
          },
          {
            label: "Tamper-proof",
            desc: "Any modification to the signed data invalidates the signature.",
          },
          {
            label: "Chain-bound",
            desc: "The domain separator includes chainId — signatures cannot be replayed on other chains.",
          },
          {
            label: "Contract-bound",
            desc: "The domain includes verifyingContract — only GaslessRouter can use the signature.",
          },
          {
            label: "Time-limited",
            desc: "Every signature has a deadline. Expired intents revert on-chain.",
          },
        ].map(({ label, desc }) => (
          <div key={label} className="glass rounded-xl p-4 flex gap-3">
            <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0" />
            <div>
              <div className="text-sm font-medium text-white">{label}</div>
              <div className="text-xs text-white/45 mt-0.5 leading-relaxed">{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <DocNav
        prev={{ label: "Addresses", href: "/docs/contracts/addresses" }}
        next={{ label: "Replay Protection", href: "/docs/security/replay" }}
      />
    </PageWrapper>
  );
}
