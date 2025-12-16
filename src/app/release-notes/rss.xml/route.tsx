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

export const GET = async () => {
  const releaseNotes: (BasePageDataWithoutComponent & {
    type: "release-note";
    data: ReleaseNoteData;
  })[] = (await processReleaseNotePages()).filter(
    (releaseNote) =>
      releaseNote.type === "release-note" &&
      releaseNote.data.node.frontmatter.published_date
  ) as any;

  const output = releaseNotes.map((releaseNote) => ({
    title: releaseNote.data.node.frontmatter.title,
    excerpt: releaseNote.data.node.excerpt,
    link: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://docs.pantheon.io"}/release-notes/${releaseNote.data.node.fields.slug}`,
    id: uuidv5(releaseNote.data.node.id, namespace),
    published_date: new Date(
      `${releaseNotes[0].data.node.frontmatter.published_date}T${getSeededTime(releaseNotes[0].data.node.frontmatter.title ?? "")}Z`
    ).toUTCString(),
  }));

  // convert to xml
  const xml = new rss({
    title: "Pantheon release notes RSS feed",
    description: "Stay updated with the latest releases and enhancements.",
    site_url: "https://docs.pantheon.io/release-notes",
    feed_url: "https://docs.pantheon.io/release-notes/rss.xml",
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
    },
  });
};
