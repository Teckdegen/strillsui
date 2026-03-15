import { NextResponse } from "next/server";

// Every gasless tx goes: relayer wallet → router contract
const RELAYER = "0xA823d13118E65DD1beA758a78e9016B6584E037c";
const ROUTER  = "0x1214ccD861f187aB017F20617C602638B125689B";
const BASE    = `https://coston2-explorer.flare.network/api/v2/addresses/${RELAYER}/transactions?filter=from&limit=50`;

interface FeedTx {
  hash: string;
  from: string;
  timestamp: string;
  method: string | null;
  status: string;
}

interface StatsData {
  feed: FeedTx[];
  sevenDayCount: number;
}

// 15s server-side cache — prevents hammering the explorer
let cache: { data: StatsData; at: number } | null = null;
const TTL = 15_000;

async function fetchStats(): Promise<StatsData> {
  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
  let sevenDayCount = 0;
  const feed: FeedTx[] = [];
  let nextPageParams: Record<string, string> | null = null;
  let reachedCutoff = false;

  for (let page = 0; page < 20; page++) {
    const url: string = nextPageParams
      ? `${BASE}&${new URLSearchParams(nextPageParams)}`
      : BASE;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) break;

    const data = await res.json();
    const items: {
      hash: string;
      timestamp: string;
      method?: string | null;
      status?: string;
      from?: { hash: string };
      to?: { hash: string } | null;
    }[] = data.items ?? [];

    for (const t of items) {
      // Only count transactions from the relayer TO the router
      const toAddr = t.to?.hash?.toLowerCase() ?? "";
      if (toAddr !== ROUTER.toLowerCase()) continue;

      if (feed.length < 5) {
        feed.push({
          hash:      t.hash,
          from:      t.from?.hash ?? RELAYER,
          timestamp: t.timestamp,
          method:    t.method ?? null,
          status:    t.status ?? "ok",
        });
      }

      if (new Date(t.timestamp).getTime() >= cutoff) {
        sevenDayCount++;
      } else {
        reachedCutoff = true;
      }
    }

    if (reachedCutoff || !data.next_page_params || items.length === 0) break;

    nextPageParams = Object.fromEntries(
      Object.entries(data.next_page_params as Record<string, unknown>).map(
        ([k, v]) => [k, String(v)]
      )
    );
  }

  return { feed, sevenDayCount };
}

export async function GET() {
  if (cache && Date.now() - cache.at < TTL) {
    return NextResponse.json(cache.data);
  }

  try {
    const data = await fetchStats();
    cache = { data, at: Date.now() };
    return NextResponse.json(data);
  } catch {
    if (cache) return NextResponse.json(cache.data);
    return NextResponse.json({ feed: [], sevenDayCount: 0 });
  }
}
