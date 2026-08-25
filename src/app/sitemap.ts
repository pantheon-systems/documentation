// src/app/sitemap.ts
// Next.js App Router metadata convention: automatically served at /sitemap.xml
import type { MetadataRoute } from "next";
import { getAllPages } from "@/lib/page-utils";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://docs.pantheon.io"
).replace(/\/$/, "");

// Page types that should not appear in search results.
// iframeembeds are meant to be embedded, not indexed on their own.
const EXCLUDED_TYPES = new Set(["iframe-embed"]);

// Regenerate at most once an hour so a content deploy doesn't require a rebuild
// of the whole route, and the build itself stays fast.
export const revalidate = 3600;

// Some content filenames contain characters that are illegal in a <loc> value:
// literal "&" (breaks XML parsing outright) and spaces. Next.js does NOT escape
// these, so encode them here.
//
// encodeURI handles spaces and leaves "/", "," and other legal path characters
// alone; it deliberately does not touch "&", so that is replaced explicitly.
const encodePath = (uri: string): string =>
  encodeURI(uri).replace(/&/g, "%26");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPages();

  const seen = new Set<string>();
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  for (const page of pages) {
    if (EXCLUDED_TYPES.has(page.type)) continue;
    if (!page.uri) continue;

    // getAllPages() returns slugs with no leading/trailing slash (normalizeSlug)
    const url = `${SITE_URL}/${encodePath(page.uri)}`;
    if (seen.has(url)) continue;
    seen.add(url);

    entries.push({
      url,
      changeFrequency: page.type === "release-note" ? "monthly" : "weekly",
      priority: page.type === "release-note" ? 0.5 : 0.8,
    });
  }

  return entries;
}