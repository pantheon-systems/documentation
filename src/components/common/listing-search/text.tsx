import { Fragment, ReactNode } from "react";

export const SNIPPET_RADIUS = 90;

/**
 * Wraps every case-insensitive occurrence of `query` in `text` in <mark>,
 * returning renderable React children. Finds the matches with indexOf, so the
 * query is never turned into a regular expression.
 */
export function highlightText(text: string, query: string): ReactNode {
  const needle = query.trim().toLowerCase();
  if (!needle) return text;

  const haystack = text.toLowerCase();
  const parts: ReactNode[] = [];
  let from = 0;
  let match = haystack.indexOf(needle, from);
  if (match === -1) return text;

  while (match !== -1) {
    if (match > from) {
      parts.push(
        <Fragment key={`t${from}`}>{text.slice(from, match)}</Fragment>
      );
    }
    parts.push(
      <mark key={`m${match}`} className="release-note-search-highlight">
        {text.slice(match, match + needle.length)}
      </mark>
    );
    from = match + needle.length;
    match = haystack.indexOf(needle, from);
  }
  if (from < text.length) {
    parts.push(<Fragment key={`t${from}`}>{text.slice(from)}</Fragment>);
  }
  return parts;
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
