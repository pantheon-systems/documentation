import { Fragment, ReactNode } from "react";

export const SNIPPET_RADIUS = 90;

export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Splits `text` on every case-insensitive occurrence of `query` and wraps
 * the matches in <mark>, returning renderable React children.
 */
export function highlightText(text: string, query: string): ReactNode {
  const trimmed = query.trim();
  if (!trimmed) return text;

  const parts = text.split(new RegExp(`(${escapeRegExp(trimmed)})`, "gi"));
  if (parts.length === 1) return text;

  // String#split with a single capturing group alternates
  // [non-match, match, non-match, match, ...], so odd indices are matches.
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <mark key={index} className="release-note-search-highlight">
        {part}
      </mark>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    )
  );
}

/** Builds a short excerpt of `text` centered on the first match of `query`. */
export function buildSnippet(text: string, query: string): string {
  const trimmed = query.trim();
  const matchIndex = trimmed
    ? text.toLowerCase().indexOf(trimmed.toLowerCase())
    : -1;

  if (matchIndex === -1) {
    return text.length > SNIPPET_RADIUS * 2
      ? `${text.slice(0, SNIPPET_RADIUS * 2).trim()}…`
      : text;
  }

  const start = Math.max(0, matchIndex - SNIPPET_RADIUS);
  const end = Math.min(
    text.length,
    matchIndex + trimmed.length + SNIPPET_RADIUS
  );

  let snippet = text.slice(start, end).trim();
  if (start > 0) snippet = `…${snippet}`;
  if (end < text.length) snippet = `${snippet}…`;
  return snippet;
}
