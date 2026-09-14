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

function stripHtml(text: string): string {
  return text.replace(/<[^>]*>?/gm, "").replace(/\s+/g, " ").trim();
}

function cleanText(raw: string): string {
  if (!raw) return "";
  // Check CDATA first
  const cdataMatch = raw.match(/<!\[CDATA\[([\s\S]*?)\]\]>/i);
  const content = cdataMatch ? cdataMatch[1] : raw;
  return stripHtml(decodeXmlEntities(content));
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
