import {
  BasePageDataWithoutComponent,
  processReleaseNotePages,
  ReleaseNoteData,
} from "@/lib/page-utils";
import { writeFileSync } from "fs";
import { v5 as uuidv5 } from "uuid";
import rss from "rss";

const namespace = "7539b93c-4544-4851-b5e6-4caf2c78e3ac";

function hashCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function getSeededTime(title: string) {
  const hash = hashCode(title);

  const hours = (hash % 24).toString().padStart(2, "0");
  const minutes = (hash % 60).toString().padStart(2, "0");
  const seconds = ((hash >> 8) % 60).toString().padStart(2, "0"); // Shift for more variance

  return `${hours}:${minutes}:${seconds}`;
}

export const GET = async (request: Request) => {
  // Optional filter: ?category=content-publisher (repeat or comma-separate for several)
  const categories = new URL(request.url).searchParams
    .getAll("category")
    .flatMap((value) => value.split(","))
    .map((value) => value.trim())
    .filter(Boolean);

  const releaseNotes: (BasePageDataWithoutComponent & {
    type: "release-note";
    data: ReleaseNoteData;
    // Filter down the notes using categories.
  })[] = (await processReleaseNotePages(undefined, categories)).filter(
    (releaseNote) =>
      releaseNote.type === "release-note" &&
      releaseNote.data.node.frontmatter.published_date
  ) as any;

  const output = releaseNotes.map((releaseNote) => ({
    title: releaseNote.data.node.frontmatter.title,
    excerpt: releaseNote.data.node.frontmatter.description || "A summary of changes to the Pantheon Platform",
    link: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://docs.pantheon.io"}/${releaseNote.data.node.fields.slug}`,
    id: uuidv5(releaseNote.data.node.id, namespace),
    // Use published_at (set by GitHub Action) if available, otherwise fall back to
    // synthetic time based on title hash for backwards compatibility with older notes
    published_date: releaseNote.data.node.frontmatter.published_at
      ? new Date(releaseNote.data.node.frontmatter.published_at).toUTCString()
      : new Date(
          `${releaseNote.data.node.frontmatter.published_date}T${getSeededTime(releaseNote.data.node.frontmatter.title ?? "")}Z`
        ).toUTCString(),
  }));

  // convert to xml
  const feedUrl = "https://docs.pantheon.io/release-notes/rss.xml";
  const xml = new rss({
    title: "Pantheon release notes RSS feed",
    description: "Stay updated with the latest releases and enhancements.",
    site_url: "https://docs.pantheon.io/release-notes",
    feed_url:
      categories.length > 0
        ? `${feedUrl}?${new URLSearchParams(categories.map((c) => ["category", c])).toString()}`
        : feedUrl,
  });
  output.forEach((item) => {
    xml.item({
      title: item.title ?? "",
      description: item.excerpt,
      url: item.link,
      guid: item.id,
      date: item.published_date,
    });
  });

  const xmlString = xml.xml();

  return new Response(`${xmlString}`, {
    headers: {
      "Content-Type": "application/xml",
      // Public feed: allow cross-origin reads (e.g. the Pantheon Dashboard).
      "Access-Control-Allow-Origin": "*",
    },
  });
};
