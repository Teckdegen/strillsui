import { PageWrapper, Breadcrumb, DocNav, Callout } from "@/components/docs/DocPage";

export const metadata = { title: "Addresses — Contracts" };

const coston2Contracts = [
  { name: "GaslessRouter", address: "0x658a064aE85c983869e32D478AD3B41a96982114", note: "Main entry point" },
  { name: "Treasury", address: "0xA74Ec048b10a566006fE9557196452Cd63609d22", note: "Fee recipient" },
];

const coston2Tokens = [
  { symbol: "USDT", address: "0xC1A5B41512496B80903D1f32d6dEa3a73212E71F", decimals: "6", feeToken: true },
  { symbol: "FXRP", address: "0x0b6A3645c240605887a5532109323A3E12273dc7", decimals: "18", feeToken: true },
  { symbol: "WC2FLR", address: "0xC67DCE33D7A8efA5FfEB961899C73fe01bCe9273", decimals: "18", feeToken: true },
];

const coston2Dexes = [
  { name: "BlazeSwap Router", address: "0x2b8f51c1Ffadb778D48A5bd6d0169Cf648568243", note: "Uniswap V2 compatible" },
];

const network = {
  name: "Coston2 Testnet",
  chainId: "114",
  rpc: "https://coston2-api.flare.network/ext/bc/C/rpc",
  explorer: "https://coston2-explorer.flare.network",
  currency: "C2FLR",
};

export default function ContractAddresses() {
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Docs", href: "/docs" },
          { label: "Contracts", href: "/docs/contracts" },
          { label: "Addresses" },
        ]}
      />

      <h1 className="text-4xl font-bold text-white mb-3">Contract Addresses</h1>
      <p className="text-white/50 text-base leading-relaxed mb-8">
        All deployed contract addresses on Flare&apos;s Coston2 testnet.
      </p>

      {/* Network info */}
      <h2 className="text-xl font-semibold text-white mb-4">Network</h2>
      <div className="glass rounded-xl p-5 mb-8">
        <div className="grid grid-cols-2 gap-3 text-sm">
          {Object.entries(network).map(([k, v]) => (
            <div key={k}>
              <div className="text-xs text-white/30 uppercase tracking-wide mb-0.5">{k}</div>
              {k === "rpc" || k === "explorer" ? (
                <a
                  href={v}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-purple-400 hover:text-purple-300 transition-colors break-all"
                >
                  {v}
                </a>
              ) : (
                <div className="font-mono text-xs text-white/70">{v}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Core contracts */}
      <h2 className="text-xl font-semibold text-white mb-4">Core Contracts</h2>
      <div className="glass rounded-xl overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wide">Contract</th>
              <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wide">Address</th>
              <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wide">Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {coston2Contracts.map(({ name, address, note }) => (
              <tr key={name}>
                <td className="px-5 py-3 font-medium text-white text-xs">{name}</td>
                <td className="px-5 py-3">
                  <a
                    href={`${network.explorer}/address/${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-purple-400 hover:text-purple-300 text-xs transition-colors"
                  >
                    {address}
                  </a>
                </td>
                <td className="px-5 py-3 text-white/40 text-xs">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fee tokens */}
      <h2 className="text-xl font-semibold text-white mb-4">Fee Tokens</h2>
      <div className="glass rounded-xl overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wide">Symbol</th>
              <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wide">Address</th>
              <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wide">Decimals</th>
              <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wide">Fee token</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {coston2Tokens.map(({ symbol, address, decimals, feeToken }) => (
              <tr key={symbol}>
                <td className="px-5 py-3 font-bold text-white text-xs">{symbol}</td>
                <td className="px-5 py-3">
                  <a
                    href={`${network.explorer}/address/${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-purple-400 hover:text-purple-300 text-xs transition-colors"
                  >
                    {address}
                  </a>
                </td>
                <td className="px-5 py-3 text-white/50 text-xs">{decimals}</td>
                <td className="px-5 py-3 text-xs">
                  {feeToken ? (
                    <span className="text-green-400 bg-green-400/10 border border-green-400/20 rounded px-2 py-0.5">
                      Yes
                    </span>
                  ) : (
                    <span className="text-white/30">No</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DEXes */}
      <h2 className="text-xl font-semibold text-white mb-4">DEX Routers</h2>
      <div className="glass rounded-xl overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wide">DEX</th>
              <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wide">Router Address</th>
              <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wide">Note</th>
            </tr>
          </thead>
          <tbody>
            {coston2Dexes.map(({ name, address, note }) => (
              <tr key={name}>
                <td className="px-5 py-3 font-medium text-white text-xs">{name}</td>
                <td className="px-5 py-3">
                  <a
                    href={`${network.explorer}/address/${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-purple-400 hover:text-purple-300 text-xs transition-colors"
                  >
                    {address}
                  </a>
                </td>
                <td className="px-5 py-3 text-white/40 text-xs">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="tip">
        All addresses link to the Coston2 block explorer. Mainnet addresses will be listed
        here when the protocol launches on Flare mainnet.
      </Callout>

      <DocNav
        prev={{ label: "GaslessRouter", href: "/docs/contracts" }}
        next={{ label: "How Signatures Work", href: "/docs/security" }}
      />
    </PageWrapper>
  );
}
