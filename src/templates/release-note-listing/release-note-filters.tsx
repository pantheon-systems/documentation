"use client";

import { ListingFilters } from "@/components/common/listing-filters";

/** The "Filter by category" sidebar of the release notes list. */
export const ReleaseNoteFilters = ({
  categories,
}: {
  categories: { slug: string; displayName: string }[];
}) => (
  <ListingFilters
    paramName="category"
    basePath="/release-notes/1"
    label="Filter by category"
    idPrefix="release-note-categories"
    options={categories.map((category) => ({
      value: category.slug,
      label: category.displayName,
    }))}
  />
);
