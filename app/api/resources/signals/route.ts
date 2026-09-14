import { NextResponse } from "next/server";
import { getLiveSignals } from "@/lib/resources";

export const revalidate = 300; // 5-minute cache

export async function GET() {
  const payload = await getLiveSignals();

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
