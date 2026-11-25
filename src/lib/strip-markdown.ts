/**
 * Reduce a markdown body to plain text suitable for searching and building
 * highlighted snippets from. This intentionally favors simplicity over perfect
 * fidelity - it's used for matching and display in search results, not for
 * rendering.
 */
export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/^---[\s\S]*?---\n*/, "") // any leading frontmatter, defensively
    .replace(/```[\s\S]*?```/g, " ") // fenced code blocks
    .replace(/`([^`]+)`/g, "$1") // inline code
    .replace(/!\[.*?\]\(.*?\)/g, "") // images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links -> link text
    .replace(/<\/?[a-zA-Z][^>]*>/g, " ") // HTML/JSX tags (e.g. <Alert>, <Callout>)
    .replace(/[#>*_~`]/g, "") // remaining markdown symbols
    .replace(/\s+/g, " ") // collapse all whitespace
    .trim();
}
