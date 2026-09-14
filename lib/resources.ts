import { parseFeed, type FeedItem } from "@/lib/rss";

export interface HackerNewsSignal {
  title: string;
  url: string;
  source: string;
  points: number;
  timeAgo: string;
}

export interface TechSignal {
  company: string;
  category: "AI" | "AI Policy" | "Systems" | "Developer Tools" | "Security" | "Semiconductors" | "Cloud";
  headline: string;
  date: string;
  url: string;
  freshness: "Breaking" | "Fresh" | "Recent" | string;
}

export interface MarketSignal {
  asset: string;
  name: string;
  price: string;
  change24h: string;
  positive: boolean;
}

export interface LiveSignalsPayload {
  hackerNews: HackerNewsSignal[];
  techUpdates: TechSignal[];
  marketSignals: MarketSignal[];
  timestamp: string;
}

const FALLBACK_HN: HackerNewsSignal[] = [
  {
    title: "Rust 1.85 and Rust 2024 Edition are stabilized",
    url: "https://blog.rust-lang.org/",
    source: "blog.rust-lang.org",
    points: 428,
    timeAgo: "3h ago",
  },
  {
    title: "Show HN: Static analysis for automated IR transformation",
    url: "https://news.ycombinator.com",
    source: "news.ycombinator.com",
    points: 362,
    timeAgo: "5h ago",
  },
  {
    title: "Tree-sitter: Fast and robust incremental parsing at scale",
    url: "https://tree-sitter.github.io/tree-sitter/",
    source: "tree-sitter.github.io",
    points: 310,
    timeAgo: "7h ago",
  },
  {
    title: "Deterministic verification and bounded agent workflows",
    url: "https://news.ycombinator.com",
    source: "news.ycombinator.com",
    points: 275,
    timeAgo: "9h ago",
  },
  {
    title: "Designing Data-Intensive Applications: Distributed Consensus Revisited",
    url: "https://dataintensive.net/",
    source: "dataintensive.net",
    points: 219,
    timeAgo: "12h ago",
  },
];

const FALLBACK_TECH: TechSignal[] = [
  {
    company: "OpenAI",
    category: "AI",
    headline: "Advancements in reasoning models and deterministic agentic constraints",
    date: "Mar 14, 2026",
    url: "https://openai.com/news/",
    freshness: "Breaking",
  },
  {
    company: "Google DeepMind",
    category: "AI",
    headline: "Frontier multimodal models with native code synthesis and verification",
    date: "Mar 12, 2026",
    url: "https://deepmind.google/blog/",
    freshness: "Fresh",
  },
  {
    company: "Rust Foundation",
    category: "Systems",
    headline: "Rust compiler infrastructure enhancements and asynchronous trait stabilization",
    date: "Mar 10, 2026",
    url: "https://blog.rust-lang.org/",
    freshness: "Recent",
  },
  {
    company: "GitHub",
    category: "Developer Tools",
    headline: "Next-generation developer tooling: safe code analysis and agent pipelines",
    date: "Mar 08, 2026",
    url: "https://github.blog/",
    freshness: "Recent",
  },
  {
    company: "Cloudflare",
    category: "Systems",
    headline: "Zero-trust edge computation and high-throughput serverless isolation",
    date: "Mar 06, 2026",
    url: "https://blog.cloudflare.com/",
    freshness: "Recent",
  },
];

const FALLBACK_CRYPTO: MarketSignal[] = [
  { asset: "BTC", name: "Bitcoin", price: "$89,240", change24h: "+2.4%", positive: true },
  { asset: "ETH", name: "Ethereum", price: "$2,715", change24h: "+1.8%", positive: true },
  { asset: "SOL", name: "Solana", price: "$182", change24h: "+3.9%", positive: true },
];

function formatTimeAgo(epochSeconds?: number): string {
  if (!epochSeconds) return "recently";
  const diff = Math.floor(Date.now() / 1000 - epochSeconds);
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

function getFreshness(date: Date | null): { dateStr: string; freshness: string } {
  if (!date) {
    return { dateStr: "Recent", freshness: "Recent" };
  }
  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dateStr = `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, "0")}, ${date.getFullYear()}`;

  if (diffHours >= 0 && diffHours < 24) {
    return { dateStr, freshness: "Breaking" };
  } else if (diffHours >= 24 && diffHours < 72) {
    return { dateStr, freshness: "Fresh" };
  } else if (diffHours >= 72 && diffHours < 336) {
    return { dateStr, freshness: "Recent" };
  }
  return { dateStr, freshness: dateStr };
}

// Bounded fetch helper with timeout
async function fetchWithTimeout(url: string, timeoutMs = 2500): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Portfolio-Intelligence-Bot/1.0 (+https://raitaskeen.me)",
      },
      next: { revalidate: 300 },
    });
    clearTimeout(timeoutId);
    return res;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

export async function fetchHackerNewsSignals(): Promise<HackerNewsSignal[]> {
  try {
    const res = await fetchWithTimeout("https://hacker-news.firebaseio.com/v0/topstories.json", 2000);
    if (!res.ok) return FALLBACK_HN;

    const ids: number[] = await res.json();
    const candidateIds = (ids || []).slice(0, 15);

    const storyPromises = candidateIds.map(async (id) => {
      try {
        const itemRes = await fetchWithTimeout(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, 1800);
        if (!itemRes.ok) return null;
        const data = await itemRes.json();
        if (!data || !data.title) return null;

        return {
          title: data.title as string,
          url: (data.url || `https://news.ycombinator.com/item?id=${data.id}`) as string,
          source: extractHostname(data.url),
          points: (data.score || 100) as number,
          timeAgo: formatTimeAgo(data.time),
        };
      } catch {
        return null;
      }
    });

    const results = (await Promise.all(storyPromises)).filter(Boolean) as HackerNewsSignal[];
    if (results.length > 0) {
      return results.slice(0, 5);
    }
  } catch {
    // Return fallback on network error
  }
  return FALLBACK_HN;
}

interface FeedConfig {
  company: string;
  category: TechSignal["category"];
  url: string;
}

const LIVE_FEEDS: FeedConfig[] = [
  { company: "OpenAI", category: "AI", url: "https://openai.com/news/rss.xml" },
  { company: "Google DeepMind", category: "AI", url: "https://deepmind.google/blog/rss.xml" },
  { company: "Rust Foundation", category: "Systems", url: "https://blog.rust-lang.org/feed.xml" },
  { company: "GitHub", category: "Developer Tools", url: "https://github.blog/feed/" },
  { company: "Cloudflare", category: "Systems", url: "https://blog.cloudflare.com/rss/" },
  { company: "Ars Technica", category: "AI", url: "https://arstechnica.com/ai/feed/" },
  { company: "Ars Technica", category: "AI Policy", url: "https://arstechnica.com/category/tech-policy/feed/" },
];

export async function fetchTechSignals(): Promise<TechSignal[]> {
  try {
    const feedPromises = LIVE_FEEDS.map(async (feedConfig) => {
      try {
        const res = await fetchWithTimeout(feedConfig.url, 2500);
        if (!res.ok) return [];
        const xml = await res.text();
        const items: FeedItem[] = parseFeed(xml, feedConfig.company);

        return items.map((item) => {
          const { dateStr, freshness } = getFreshness(item.pubDate);
          return {
            company: feedConfig.company,
            category: feedConfig.category,
            headline: item.title,
            date: dateStr,
            url: item.link || feedConfig.url,
            freshness,
            pubDate: item.pubDate,
          };
        });
      } catch {
        return [];
      }
    });

    const settled = await Promise.allSettled(feedPromises);
    const allItems = settled
      .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
      .filter((item) => item.headline && item.headline.length > 5);

    if (allItems.length > 0) {
      // Deduplicate by headline
      const seen = new Set<string>();
      const uniqueItems = allItems.filter((item) => {
        const key = item.headline.toLowerCase().trim();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      // Sort by publication date (newest first)
      uniqueItems.sort((a, b) => {
        const timeA = a.pubDate ? a.pubDate.getTime() : 0;
        const timeB = b.pubDate ? b.pubDate.getTime() : 0;
        return timeB - timeA;
      });

      return uniqueItems.slice(0, 6).map((item) => ({
        company: item.company,
        category: item.category,
        headline: item.headline,
        date: item.date,
        url: item.url,
        freshness: item.freshness,
      }));
    }
  } catch {
    // Return fallback on failure
  }
  return FALLBACK_TECH;
}

export async function fetchMarketSignals(): Promise<MarketSignal[]> {
  try {
    const res = await fetchWithTimeout(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true",
      2000
    );

    if (res.ok) {
      const data = await res.json();
      if (data.bitcoin && data.ethereum) {
        return [
          {
            asset: "BTC",
            name: "Bitcoin",
            price: `$${data.bitcoin.usd ? data.bitcoin.usd.toLocaleString() : "89,240"}`,
            change24h: `${data.bitcoin.usd_24h_change >= 0 ? "+" : ""}${data.bitcoin.usd_24h_change?.toFixed(1) || "2.4"}%`,
            positive: (data.bitcoin.usd_24h_change || 0) >= 0,
          },
          {
            asset: "ETH",
            name: "Ethereum",
            price: `$${data.ethereum.usd ? data.ethereum.usd.toLocaleString() : "2,715"}`,
            change24h: `${data.ethereum.usd_24h_change >= 0 ? "+" : ""}${data.ethereum.usd_24h_change?.toFixed(1) || "1.8"}%`,
            positive: (data.ethereum.usd_24h_change || 0) >= 0,
          },
          {
            asset: "SOL",
            name: "Solana",
            price: `$${data.solana?.usd ? data.solana.usd.toLocaleString() : "182"}`,
            change24h: `${(data.solana?.usd_24h_change || 0) >= 0 ? "+" : ""}${data.solana?.usd_24h_change?.toFixed(1) || "3.9"}%`,
            positive: (data.solana?.usd_24h_change || 0) >= 0,
          },
        ];
      }
    }
  } catch {
    // Graceful fallback
  }
  return FALLBACK_CRYPTO;
}

export async function getLiveSignals(): Promise<LiveSignalsPayload> {
  const [hackerNews, techUpdates, marketSignals] = await Promise.all([
    fetchHackerNewsSignals(),
    fetchTechSignals(),
    fetchMarketSignals(),
  ]);

  return {
    hackerNews,
    techUpdates,
    marketSignals,
    timestamp: new Date().toISOString(),
  };
}
