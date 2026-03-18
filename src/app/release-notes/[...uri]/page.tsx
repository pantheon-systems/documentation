"use server";

import { getAllPages } from "@/lib/page-utils";
import { generateMetadataFromUri } from "@/lib/site-metadata";
import { ReleaseNoteTemplate } from "@/templates/release-note";
import { ReleaseNoteListingTemplate } from "@/templates/release-note-listing";
import { notFound } from "next/navigation";

export interface DynamicViewProps {
  params: Promise<{ uri: string[] }>;
  searchParams: Promise<{
    local: "true" | "false" | undefined;
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

export async function generateMetadata() {
  try {
    return {
      ...generateMetadataFromUri({
        title: "Pantheon release notes",
        description: "A summary of changes to the Pantheon Platform",
      }),
      authors: [],
    };
  } catch {
    return {
      title: "Not Found",
      description: "Not Found",
    };
  }
}
