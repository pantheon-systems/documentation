"use client";

import { Tag } from "@pantheon-systems/pds-toolkit-react";
import Link from "next/link";
import { ReactNode } from "react";
import PublishedDate from "@/components/common/published-date";
import {
  ListingSearchConfig,
  ListingSearchInput,
  ListingSearchProvider,
  ListingSearchResults,
} from "@/components/common/listing-search/listing-search";
import { highlightText } from "@/components/common/listing-search/text";
import { releaseNoteCategoryLoader } from "./release-note-categories";

export type ReleaseNoteSearchEntry = {
  slug: string;
  title: string;
  publishedDate: string | null;
  categories: string[];
  text: string;
};

/** Builds a trailing clause like ' in "Action Required"' for status messages, or '' when no category filter is active. */
function describeSelectedCategories(selectedCategories: string[]): string {
  if (selectedCategories.length === 0) return "";
  const labels = selectedCategories.map(
    (slug) => releaseNoteCategoryLoader(slug)?.displayName ?? slug
  );
  return ` in ${labels.join(", ")}`;
}

// Defined once at module level so its identity is stable across renders.
const config: ListingSearchConfig<ReleaseNoteSearchEntry> = {
  indexUrl: "/release-notes/search-index.json",
  filterParam: "category",
  entryFilterValues: (entry) => entry.categories,
  describeFilters: describeSelectedCategories,
  nounSingular: "release note",
  nounPlural: "release notes",
  filterNoun: "category",
};

/**
 * Owns all release-note search state. Rendered once around both the search
 * input and the results/listing area, so the input can be positioned
 * anywhere on the page (e.g. above the category filter) independently of
 * where the results it controls are rendered.
 */
export const ReleaseNoteSearchProvider = ({
  children,
}: {
  children: ReactNode;
}) => <ListingSearchProvider config={config}>{children}</ListingSearchProvider>;

/** The full-width search box. Can be placed anywhere within a ReleaseNoteSearchProvider. */
export const ReleaseNoteSearchInput = () => (
  <ListingSearchInput
    id="release-note-filter"
    label="Search all release notes by keyword"
  />
);

/**
 * Renders either the site-wide search results (when a search is active) or
 * `children` - the normal server-rendered release notes for the current
 * page - otherwise.
 */
export const ReleaseNoteSearchResults = ({
  children,
  containerClassName,
}: {
  children: ReactNode;
  containerClassName?: string;
}) => (
  <ListingSearchResults<ReleaseNoteSearchEntry>
    containerClassName={containerClassName}
    renderResult={(result, query) => (
      <>
        <div className="rn-search-result__header">
          <Link href={`/${result.slug}`} className="rn-search-result__title">
            {highlightText(result.title, query)}
          </Link>
          <div className="rn-search-result__categories">
            {result.categories.map((categorySlug) => {
              const category = releaseNoteCategoryLoader(categorySlug);
              return (
                <Tag
                  key={categorySlug}
                  tagLabel={category?.displayName ?? categorySlug}
                  tagColor={category?.color}
                />
              );
            })}
          </div>
        </div>
        {result.publishedDate && (
          <PublishedDate
            dateString={result.publishedDate}
            className="rn-search-result__date"
          />
        )}
        <p className="rn-search-result__snippet">
          {highlightText(result.snippet, query)}
        </p>
      </>
    )}
  >
    {children}
  </ListingSearchResults>
);
