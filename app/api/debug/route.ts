import { NextResponse } from "next/server";

const RELAYER = "0xA823d13118E65DD1beA758a78e9016B6584E037c";
const ROUTER  = "0x1214ccD861f187aB017F20617C602638B125689B";

export async function GET() {
  const results: Record<string, unknown> = {};

  // Test: router txs — no limit param
  try {
    const r = await fetch(
      `https://coston2-explorer.flare.network/api/v2/addresses/${ROUTER}/transactions`,
      { cache: "no-store", signal: AbortSignal.timeout(6000) }
    );
    results.router_status = r.status;
    if (r.ok) {
      const d = await r.json();
      results.router_items_count = d.items?.length ?? 0;
      results.router_first = d.items?.[0] ?? null;
      results.router_keys = d.items?.[0] ? Object.keys(d.items[0]) : [];
    } else {
      results.router_body = await r.text();
    }
  } catch (e) {
    results.router_error = String(e);
  }

  // Test: relayer txs — no limit param
  try {
    const r = await fetch(
      `https://coston2-explorer.flare.network/api/v2/addresses/${RELAYER}/transactions`,
      { cache: "no-store", signal: AbortSignal.timeout(6000) }
    );
    results.relayer_status = r.status;
    if (r.ok) {
      const d = await r.json();
      results.relayer_items_count = d.items?.length ?? 0;
      results.relayer_first = d.items?.[0] ?? null;
      results.relayer_keys = d.items?.[0] ? Object.keys(d.items[0]) : [];
    } else {
      results.relayer_body = await r.text();
    }
  } catch (e) {
    results.relayer_error = String(e);
  }

  return NextResponse.json(results);
}
