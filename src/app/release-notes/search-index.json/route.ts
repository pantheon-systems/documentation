import { getAllReleaseNotes } from "@/lib/page-utils";
import { stripMarkdown } from "@/lib/strip-markdown";

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
