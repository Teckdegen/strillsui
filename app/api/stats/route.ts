import { NextResponse } from "next/server";

const ROUTER = "0x1214ccD861f187aB017F20617C602638B125689B";
const BASE   = `https://coston2-explorer.flare.network/api/v2/addresses/${ROUTER}`;

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

// Simple server-side in-memory cache — avoids hammering Blockscout
let cache: { data: StatsData; at: number } | null = null;
const TTL = 15_000;

async function fetchStats(): Promise<StatsData> {
  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
  let sevenDayCount = 0;
  const feed: FeedTx[] = [];
  let nextPageParams: Record<string, string> | null = null;
  let reachedCutoff = false;
  let firstPage = true;

  for (let page = 0; page < 20; page++) {
    const url: string = nextPageParams
      ? `${BASE}/transactions?limit=50&${new URLSearchParams(nextPageParams)}`
      : `${BASE}/transactions?limit=50`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) break;

    const data = await res.json();
    const items: {
      hash: string;
      timestamp: string;
      method?: string | null;
      status?: string;
      from?: { hash: string };
      next_page_params?: Record<string, unknown>;
    }[] = data.items ?? [];

    for (const t of items) {
      // Grab the 5 most recent for the feed
      if (firstPage && feed.length < 5) {
        feed.push({
          hash:      t.hash,
          from:      t.from?.hash ?? "",
          timestamp: t.timestamp,
          method:    t.method ?? null,
          status:    t.status ?? "ok",
        });
      }

      // Count everything within 7 days
      if (new Date(t.timestamp).getTime() >= cutoff) {
        sevenDayCount++;
      } else {
        reachedCutoff = true;
      }
    }

    firstPage = false;
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
  // Serve stale cache instantly if fresh
  if (cache && Date.now() - cache.at < TTL) {
    return NextResponse.json(cache.data);
  }

  try {
    const data = await fetchStats();
    cache = { data, at: Date.now() };
    return NextResponse.json(data);
  } catch {
    // Return stale data rather than an error if we have it
    if (cache) return NextResponse.json(cache.data);
    return NextResponse.json({ feed: [], sevenDayCount: 0 });
  }
}
