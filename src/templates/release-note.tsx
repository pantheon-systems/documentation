"use server";
import { NotePage } from "@/components/common/note-page";
import { ProcessedFile } from "@/server/processor/mdx";
import { MdxWrapper } from "@/components/ui/mdx-wrapper";
import {
  headline2,
  headline3,
  headline4,
} from "@/components/common/release-headlines";
import { ReleaseNoteTags } from "@/templates/release-note-listing/release-note-tags";
import { formatLongDate } from "@/lib/format-date";
import { sanitizeSlug } from "@/lib/utils";
import type { AdjacentPage } from "@/lib/page-utils";

const toPagerLink = (page: AdjacentPage | null) =>
  page
    ? {
        url: `/${sanitizeSlug(page.fields.slug)}`,
        title: page.title || "Release note",
      }
    : null;

export const ReleaseNoteTemplate = async ({
  releaseNote,
}: {
  releaseNote: {
    prev: AdjacentPage | null;
    node: ProcessedFile;
    next: AdjacentPage | null;
  };
}) => {
  const node = releaseNote.node;
  const categories: string[] = node.frontmatter.categories ?? [];
  const published = node.frontmatter.published_date
    ? formatLongDate(node.frontmatter.published_date)
    : null;
  const tags = <ReleaseNoteTags categories={categories} />;

  return (
    <NotePage
      activePage="/release-notes"
      parent={{ label: "Pantheon release notes", href: "/release-notes" }}
      title={node.frontmatter.title ?? ""}
      asideLabel="About this release note"
      rssHref="/release-notes/rss.xml"
      details={[
        ...(published ? [{ label: "Published", value: published }] : []),
        ...(categories.length > 0
          ? [{ label: "Categories", value: tags }]
          : []),
      ]}
      narrowMeta={
        <>
          {published && <p className="pan-docs-note__date">{published}</p>}
          {tags}
        </>
      }
      prev={toPagerLink(releaseNote.prev)}
      next={toPagerLink(releaseNote.next)}
    >
      <MdxWrapper
        article={{ content: node.content }}
        componentMap={{
          h1: headline2,
          h2: headline3,
          h3: headline4,
        }}
      />
    </NotePage>
  );
};
