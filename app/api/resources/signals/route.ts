import { NextResponse } from "next/server";

export const revalidate = 300; // 5-minute cache

interface HnItem {
  id: number;
  title: string;
  url?: string;
  score?: number;
  by?: string;
  time?: number;
}

interface SignalPayload {
  hackerNews: {
    title: string;
    url: string;
    source: string;
    points: number;
    timeAgo: string;
  }[];
  techUpdates: {
    company: string;
    category: string;
    headline: string;
    date: string;
    url: string;
  }[];
  marketSignals: {
    asset: string;
    name: string;
    price: string;
    change24h: string;
    positive: boolean;
  }[];
  timestamp: string;
}

const FALLBACK_HN = [
  {
    title: "Rust 1.85 and Rust 2024 Edition are stabilized",
    url: "https://blog.rust-lang.org/",
    source: "blog.rust-lang.org",
    points: 412,
    timeAgo: "4h ago",
  },
  {
    title: "Bun 1.2: Built-in S3 client, PostgreSQL driver, and cJS compatibility",
    url: "https://bun.sh/blog/bun-v1.2",
    source: "bun.sh",
    points: 385,
    timeAgo: "6h ago",
  },
  {
    title: "Tree-sitter: Fast and robust incremental parsing",
    url: "https://tree-sitter.github.io/tree-sitter/",
    source: "github.io",
    points: 290,
    timeAgo: "8h ago",
  },
  {
    title: "Why AST-based refactoring beats generative rewriting",
    url: "https://news.ycombinator.com",
    source: "news.ycombinator.com",
    points: 247,
    timeAgo: "12h ago",
  },
];

const CURATED_TECH_UPDATES = [
  {
    company: "Anthropic",
    category: "AI",
    headline: "Claude 3.5 Sonnet upgrades code reasoning and computer use capabilities",
    date: "Recent",
    url: "https://www.anthropic.com/news",
  },
  {
    company: "Rust Foundation",
    category: "Systems",
    headline: "Rust 2024 Edition lands with refined lifetime rules and standard library hardening",
    date: "Recent",
    url: "https://blog.rust-lang.org",
  },
  {
    company: "Google DeepMind",
    category: "AI",
    headline: "Gemini 2.0 Flash released with real-time multimodal streaming and agentic execution",
    date: "Recent",
    url: "https://deepmind.google/technologies/gemini/",
  },
  {
    company: "Bun",
    category: "Developer Tools",
    headline: "Bun 1.2 introduces native Node-compatible Postgres and full S3 SDK integration",
    date: "Recent",
    url: "https://bun.sh/blog",
  },
  {
    company: "Linux Kernel",
    category: "Operating Systems",
    headline: "Linux 6.13 brings memory tiering optimizations and enhanced Bcachefs tooling",
    date: "Recent",
    url: "https://kernel.org",
  },
];

const FALLBACK_CRYPTO = [
  { asset: "BTC", name: "Bitcoin", price: "$88,450", change24h: "+2.1%", positive: true },
  { asset: "ETH", name: "Ethereum", price: "$2,690", change24h: "+1.6%", positive: true },
  { asset: "SOL", name: "Solana", price: "$176", change24h: "+3.4%", positive: true },
];

function formatTimeAgo(epochSeconds?: number): string {
  if (!epochSeconds) return "recently";
  const diff = Math.floor((Date.now() / 1000) - epochSeconds);
  if (diff < 3600) return `${Math.max(1, Math.floor(diff / 60))}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function extractHostname(url?: string): string {
  if (!url) return "news.ycombinator.com";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "external";
  }
}

export async function GET() {
  let hackerNews = FALLBACK_HN;
  let marketSignals = FALLBACK_CRYPTO;

  // 1. Attempt lightweight fetch from Hacker News Firebase API (timeout 2500ms)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const topRes = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json", {
      signal: controller.signal,
      next: { revalidate: 300 },
    });

    if (topRes.ok) {
      const ids: number[] = await topRes.json();
      const storyPromises = (ids || []).slice(0, 4).map(async (id) => {
        const itemRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
          signal: controller.signal,
          next: { revalidate: 300 },
        });
        if (!itemRes.ok) return null;
        const data: HnItem = await itemRes.json();
        return {
          title: data.title,
          url: data.url || `https://news.ycombinator.com/item?id=${data.id}`,
          source: extractHostname(data.url),
          points: data.score || 100,
          timeAgo: formatTimeAgo(data.time),
        };
      });

      const resolved = (await Promise.all(storyPromises)).filter(Boolean) as typeof FALLBACK_HN;
      if (resolved.length > 0) {
        hackerNews = resolved;
      }
    }
    clearTimeout(timeoutId);
  } catch {
    // Graceful fallback to static high-signal items
  }

  // 2. Attempt lightweight fetch for crypto prices (timeout 2000ms)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const cryptoRes = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true",
      {
        signal: controller.signal,
        next: { revalidate: 300 },
      }
    );

    if (cryptoRes.ok) {
      const data = await cryptoRes.json();
      if (data.bitcoin && data.ethereum) {
        marketSignals = [
          {
            asset: "BTC",
            name: "Bitcoin",
            price: `$${data.bitcoin.usd?.toLocaleString() || "88,450"}`,
            change24h: `${data.bitcoin.usd_24h_change >= 0 ? "+" : ""}${data.bitcoin.usd_24h_change?.toFixed(1) || "2.1"}%`,
            positive: (data.bitcoin.usd_24h_change || 0) >= 0,
          },
          {
            asset: "ETH",
            name: "Ethereum",
            price: `$${data.ethereum.usd?.toLocaleString() || "2,690"}`,
            change24h: `${data.ethereum.usd_24h_change >= 0 ? "+" : ""}${data.ethereum.usd_24h_change?.toFixed(1) || "1.6"}%`,
            positive: (data.ethereum.usd_24h_change || 0) >= 0,
          },
          {
            asset: "SOL",
            name: "Solana",
            price: `$${data.solana?.usd?.toLocaleString() || "176"}`,
            change24h: `${(data.solana?.usd_24h_change || 0) >= 0 ? "+" : ""}${data.solana?.usd_24h_change?.toFixed(1) || "3.4"}%`,
            positive: (data.solana?.usd_24h_change || 0) >= 0,
          },
        ];
      }
    }
    clearTimeout(timeoutId);
  } catch {
    // Graceful fallback
  }

  const payload: SignalPayload = {
    hackerNews,
    techUpdates: CURATED_TECH_UPDATES,
    marketSignals,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
