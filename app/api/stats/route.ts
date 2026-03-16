import { NextResponse } from "next/server";

const RELAYER = "0xA823d13118E65DD1beA758a78e9016B6584E037c";
const ROUTER  = "0x1214ccD861f187aB017F20617C602638B125689B";

// No query params - Coston2 Blockscout rejects unknown fields
const RELAYER_TX_URL = `https://coston2-explorer.flare.network/api/v2/addresses/${RELAYER}/transactions`;

let cache: { data: unknown; at: number } | null = null;
const TTL = 15_000;

export async function GET() {
  if (cache && Date.now() - cache.at < TTL) {
    return NextResponse.json(cache.data);
  }

  try {
    const res = await fetch(RELAYER_TX_URL, {
      cache: "no-store",
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) throw new Error(`Explorer ${res.status}`);

    const json = await res.json();
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;

    // Filter only txs the relayer sent TO the router
    const routerTxs = (json.items ?? []).filter(
      (t: { to?: { hash?: string } }) =>
        t.to?.hash?.toLowerCase() === ROUTER.toLowerCase()
    );

    const feed = routerTxs.slice(0, 5).map((t: {
      hash: string;
      from?: { hash: string };
      timestamp: string;
      method?: string | null;
      status?: string;
    }) => ({
      hash:      t.hash,
      from:      t.from?.hash ?? RELAYER,
      timestamp: t.timestamp,
      method:    t.method ?? null,
      status:    t.status ?? "ok",
    }));

    const sevenDayCount = routerTxs.filter(
      (t: { timestamp: string }) => new Date(t.timestamp).getTime() >= cutoff
    ).length;

    const data = { feed, sevenDayCount };
    cache = { data, at: Date.now() };
    return NextResponse.json(data);
  } catch {
    if (cache) return NextResponse.json(cache.data);
    return NextResponse.json({ feed: [], sevenDayCount: 0 });
  }
}
