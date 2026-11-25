// An HTML or JSX tag such as <Alert> or </Callout>. No "<" or ">" inside, so a
// tag can't contain another one.
const TAG = /<\/?[a-zA-Z][^<>]*>/g;

// Remove tags until nothing changes, so a nested "<<b>script>" can't leave a
// tag behind once the inner one is gone.
const removeTags = (text: string): string => {
  let previous: string;
  let current = text;
  do {
    previous = current;
    current = current.replace(TAG, " ");
  } while (current !== previous);
  return current;
};

/**
 * Reduce a markdown body to plain text suitable for searching and building
 * highlighted snippets from. This intentionally favors simplicity over perfect
 * fidelity - it's used for matching and display in search results, not for
 * rendering.
 */
export function stripMarkdown(markdown: string): string {
  const withoutMarkdown = markdown
    .replace(/^---[\s\S]*?---\n*/, "") // any leading frontmatter, defensively
    .replace(/```[\s\S]*?```/g, " ") // fenced code blocks
    .replace(/`([^`]+)`/g, "$1") // inline code
    .replace(/!\[.*?\]\(.*?\)/g, "") // images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"); // links -> link text

  return removeTags(withoutMarkdown)
    .replace(/[#>*_~`]/g, "") // remaining markdown symbols
    .replace(/\s+/g, " ") // collapse all whitespace
    .trim();
}
