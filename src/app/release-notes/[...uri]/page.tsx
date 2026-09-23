"use server";

import { getAllPages } from "@/lib/page-utils";
import { generateMetadataFromUri } from "@/lib/site-metadata";
import { ReleaseNoteTemplate } from "@/templates/release-note";
import { ReleaseNoteListingTemplate } from "@/templates/release-note-listing";
import { notFound } from "next/navigation";

export interface DynamicViewProps {
  params: Promise<{ uri: string[] }>;
  searchParams: Promise<{
    category?: string[];
  }>;
}

const getPage = async (uri: string[], category?: string[]) => {
  if (uri.length === 1 && !Number.isNaN(parseInt(uri[0]))) {

    // list of articles
    const pages = await getAllPages(["release-notes", ...uri], category);

    const page = pages.find(
      (page) => page.uri === ["release-notes", ...uri].join("/")
    );

    if (!page || page.type !== "release-note-listing") {
      throw new Error("Page not found");
    }

    return {
      Component: (
        <ReleaseNoteListingTemplate
          pageNumber={page.data.pageNumber}
          releaseNotes={page.data.releaseNotes}
          categories={page.data.categories}
          totalPages={page.data.totalPages}
          selectedCategories={category}
        />
      ),
      title: "Pantheon Release Notes",
      description: "Pantheon Release Notes",
    };
  }

  const pages = await getAllPages(["release-notes", ...uri]);
  const page = pages.find(
    (page) => page.uri === ["release-notes", ...uri].join("/")
  );

  if (!page || page.type !== "release-note") {
    return notFound();
  }

  return {
    Component: <ReleaseNoteTemplate releaseNote={page.data} />,
    title: page.title,
    description: "Pantheon Release Notes",
  };
};

export default async function Page(props: DynamicViewProps) {
  try {
    const { uri } = await props.params;

    const { category } = await props.searchParams;

    const { Component } = await getPage(uri, category);

    if (Component === null) {
      return notFound();
    }

    return Component;
  } catch {
    return notFound();
  }
}

const defaultReleaseNoteMetadata = {
  ...generateMetadataFromUri({
    title: "Pantheon Release Notes",
    description: "A summary of changes to the Pantheon Platform",
  }),
  authors: [],
};

export async function generateMetadata(props: DynamicViewProps) {
  try {
    const { uri } = await props.params;

    // For listing pages (e.g., /release-notes/1), use generic metadata
    if (uri.length === 1 && !Number.isNaN(parseInt(uri[0]))) {
      return defaultReleaseNoteMetadata;
    }

    // For individual release notes, fetch the specific note's data
    const pages = await getAllPages(["release-notes", ...uri]);
    const page = pages.find(
      (page) => page.uri === ["release-notes", ...uri].join("/")
    );

    if (!page || page.type !== "release-note") {
      return defaultReleaseNoteMetadata;
    }

    const node = page.data.node;
    const title = node.frontmatter.title || "Pantheon Release Note";

    // Try excerpt first, then fall back to extracting from content
    let description = node.excerpt?.trim();
    if (!description && node.content) {
      // Strip markdown formatting
      const cleaned = node.content
        .replace(/^---[\s\S]*?---\n*/m, "") // Remove frontmatter if present
        .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Convert links to text
        .replace(/[#*_`~>]/g, "") // Remove markdown symbols (keep hyphens)
        .replace(/\n+/g, " ") // Replace newlines with spaces
        .replace(/\s+/g, " ") // Collapse multiple spaces
        .trim();

      // Truncate at word boundary around 200 chars
      if (cleaned.length > 200) {
        const truncated = cleaned.substring(0, 200);
        const lastSpace = truncated.lastIndexOf(" ");
        description = lastSpace > 100 ? truncated.substring(0, lastSpace) + "..." : truncated + "...";
      } else {
        description = cleaned;
      }
    }
    description = node.frontmatter.description || description || "A summary of changes to the Pantheon Platform";

    return {
      ...generateMetadataFromUri({
        title,
        description,
        categories: node.frontmatter.categories,
        reviewed: node.frontmatter.published_date,
      }),
      authors: [],
    };
  } catch {
    return defaultReleaseNoteMetadata;
  }
}
