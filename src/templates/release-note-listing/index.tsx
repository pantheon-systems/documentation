"use server";
import { RssLink } from "@/components/common/rss-link";
import { DocsPage } from "@/components/docs-page";
import { releaseNoteSummary } from "@/lib/release-note-summary";
import { ProcessedFile } from "@/server/processor/mdx";
import { processDirectoryForJson } from "@/server/processor/json";
import { ReleaseNoteFilters } from "./release-note-filters";
import { ReleaseNoteList } from "./release-note-entry";
import { ReleaseNotesPagination } from "./release-notes-pagination";
import {
  ReleaseNoteSearchInput,
  ReleaseNoteSearchProvider,
  ReleaseNoteSearchResults,
} from "./release-note-search";

const INTRO =
  "Your destination for staying informed about our latest innovations and product updates.";

export const ReleaseNoteListingTemplate = async ({
  releaseNotes,
  landing,
  totalItems,
  itemsPerPage,
  pageNumber,
}: {
  pageNumber: number;
  selectedCategories?: string | string[];
  landing?: {
    introText: string;
  };
  categories: unknown;
  releaseNotes: {
    prev: { fields: { slug: string } } | null;
    node: ProcessedFile;
    next: { fields: { slug: string } } | null;
  }[];
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}) => {
  const allCategoriesData = await processDirectoryForJson(
    "source/releasenotescategories",
    "releaseNoteCategories.json",
  );
  const categories: { slug: string; displayName: string }[] = [
    ...allCategoriesData[0].content.categories,
  ].sort((a, b) => a.displayName.localeCompare(b.displayName));

  return (
    <ReleaseNoteSearchProvider>
      <DocsPage
        activePage="/release-notes"
        sidebar={<ReleaseNoteFilters categories={categories} />}
        sidebarLabel="Filter by category"
        hasBreadcrumb={false}
        header={
          <>
            <h1 className="pan-docs-page-header__title">
              Pantheon release notes
            </h1>
            <p className="pan-docs-page-header__lede">
              {landing?.introText ?? INTRO}
            </p>
            <div className="pan-docs-page-header__rss">
              <RssLink href="/release-notes/rss.xml" />
            </div>
            <ReleaseNoteSearchInput />
          </>
        }
      >
        <ReleaseNoteSearchResults>
          <ReleaseNoteList
            entries={releaseNotes.map(({ node }) => ({
              slug: node.fields.slug,
              title: node.frontmatter.title,
              publishedDate: node.frontmatter.published_date,
              summary: releaseNoteSummary(node),
              categories: node.frontmatter.categories ?? [],
            }))}
          />
          <ReleaseNotesPagination
            currentPage={pageNumber}
            totalItemCount={totalItems}
            itemsPerPage={itemsPerPage}
          />
        </ReleaseNoteSearchResults>
      </DocsPage>
    </ReleaseNoteSearchProvider>
  );
};
