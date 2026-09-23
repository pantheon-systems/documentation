import { getAllReleaseNotes } from "@/lib/page-utils";

// Release note content rarely changes more than a few times a day, so the
// index is safe to cache for a while rather than re-reading and
// re-stripping every markdown file on every request.
export const revalidate = 3600;

export type ReleaseNoteSearchEntry = {
  slug: string;
  title: string;
  publishedDate: string | null;
  categories: string[];
  text: string;
};

/**
 * Reduce a release note's markdown body to plain text suitable for
 * searching and building highlighted snippets from. This intentionally
 * favors simplicity over perfect fidelity - it's used for matching and
 * display in search results, not for rendering.
 */
function stripMarkdown(markdown: string): string {
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

export async function GET() {
  const releaseNotes = getAllReleaseNotes();

  const index: ReleaseNoteSearchEntry[] = releaseNotes.map((node) => ({
    slug: node.fields.slug,
    title: node.frontmatter.title ?? "",
    publishedDate: node.frontmatter.published_date ?? null,
    categories: node.frontmatter.categories ?? [],
    text: stripMarkdown(node.content ?? ""),
  }));

  return Response.json(index, {
    headers: {
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
