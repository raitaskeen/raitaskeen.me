/**
 * Lightweight, zero-dependency RSS 2.0 and Atom XML feed parser.
 * Handles CDATA, XML entity decoding, HTML tag stripping, and date parsing.
 */

export interface FeedItem {
  title: string;
  link: string;
  pubDate: Date | null;
  summary: string;
  source?: string;
}

function decodeXmlEntities(text: string): string {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

export const MAX_RSS_TEXT_LENGTH = 10_000;

export function stripHtml(text: string): string {
  let current = text.slice(0, MAX_RSS_TEXT_LENGTH);
  let previous: string;

  do {
    previous = current;
    current = current.replace(/<[^>]*>?/gm, "");
  } while (current !== previous);

  return current
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function cleanText(raw: string): string {
  if (!raw) return "";
  // 1. Remove CDATA wrapper
  const withoutCdata = raw.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1");
  // 2. Decode XML/HTML entities before stripping HTML
  const decoded = decodeXmlEntities(withoutCdata);
  // 3. Repeatedly strip markup, remove residual < and >, normalize whitespace
  return stripHtml(decoded);
}

function extractTag(block: string, tagName: string): string {
  // Matches <tag>...</tag> or <tag attr="...">...</tag>
  const regex = new RegExp(`<${tagName}(?:\\s+[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`, "i");
  const match = block.match(regex);
  return match ? match[1].trim() : "";
}

function extractAtomLink(block: string): string {
  // Atom entries often have <link rel="alternate" href="..." /> or <link href="..." />
  const hrefMatch = block.match(/<link[^>]+href=["']([^"']+)["'][^>]*>/i);
  if (hrefMatch) {
    return hrefMatch[1].trim();
  }
  return extractTag(block, "link");
}

export function parseFeed(xmlText: string, defaultSource = ""): FeedItem[] {
  const items: FeedItem[] = [];
  if (!xmlText) return items;

  // Determine if RSS (<item>) or Atom (<entry>)
  const isAtom = /<entry[\s>]/i.test(xmlText);
  const tagToSplit = isAtom ? "entry" : "item";

  const regex = new RegExp(`<${tagToSplit}[\\s>]([\\s\\S]*?)<\\/${tagToSplit}>`, "gi");
  let match: RegExpExecArray | null;

  while ((match = regex.exec(xmlText)) !== null) {
    const block = match[1];

    // Title
    const rawTitle = extractTag(block, "title");
    const title = cleanText(rawTitle);
    if (!title) continue;

    // Link
    let link = "";
    if (isAtom) {
      link = extractAtomLink(block);
    } else {
      link = extractTag(block, "link");
      if (!link) {
        // Some RSS use <link href="..." />
        const hrefMatch = block.match(/<link[^>]+href=["']([^"']+)["']/i);
        link = hrefMatch ? hrefMatch[1] : "";
      }
    }
    link = decodeXmlEntities(link.trim());
    if (!/^https?:\/\//i.test(link)) {
      continue;
    }

    // Date
    const rawDate =
      extractTag(block, "pubDate") ||
      extractTag(block, "published") ||
      extractTag(block, "updated") ||
      extractTag(block, "dc:date");
    
    let pubDate: Date | null = null;
    if (rawDate) {
      const parsed = new Date(rawDate);
      if (!isNaN(parsed.getTime())) {
        pubDate = parsed;
      }
    }

    // Summary / Description / Content
    const rawDesc =
      extractTag(block, "description") ||
      extractTag(block, "summary") ||
      extractTag(block, "content");
    const summary = cleanText(rawDesc);

    items.push({
      title,
      link,
      pubDate,
      summary,
      source: defaultSource,
    });
  }

  return items;
}
