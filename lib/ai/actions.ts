export interface CompanionAction {
  label: string;
  href: string;
  isExternal: boolean;
  isDownload?: boolean;
}

export interface ParsedResponse {
  cleanContent: string;
  actions: CompanionAction[];
}

const ACTION_PATTERN = /\[\[ACTION:\s*([^|\]]+)\s*\|\s*([^\]]+)\s*\]\]/g;

/**
 * Extracts action button directives from AI companion response text.
 * Strips the action syntax from the visible text and returns structured actions.
 */
export function extractActions(rawText: string): ParsedResponse {
  const actions: CompanionAction[] = [];
  const matches = rawText.matchAll(ACTION_PATTERN);

  for (const match of matches) {
    const label = match[1].trim();
    const href = match[2].trim();
    const isExternal = href.startsWith("http://") || href.startsWith("https://");
    const isDownload = href.endsWith(".pdf");

    // Avoid duplicate links
    if (!actions.some((a) => a.href === href)) {
      actions.push({ label, href, isExternal, isDownload });
    }
  }

  const cleanContent = rawText.replace(ACTION_PATTERN, "").trim();

  return { cleanContent, actions };
}
