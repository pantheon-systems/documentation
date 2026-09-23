"use client";

import { Tag } from "@pantheon-systems/pds-toolkit-react";
import { useEffect, useState } from "react";
import ReleaseNotePopoverCategorySelector from "./release-note-popover-category-selector";
import { releaseNoteCategoryLoader } from "./release-note-categories";
import { useRouter, useSearchParams } from "next/navigation";

export const ReleaseNoteListingClientComponent = ({
  categories,
  allCategories,
  pageNumber,
}: {
  pageNumber: number;
  allCategories: {
    slug: string;
    displayName: string;
    color: string;
    description: string;
  }[];
  categories: {
    node: {
      frontmatter: {
        categories: string[];
      };
    };
  }[];
}) => {
  // 1. Get search parameters
  const searchParams = useSearchParams();

  // Helper to get initial categories from URL
  const getInitialCategories = () => {
    const initialSlugs = searchParams.getAll("category");
    return initialSlugs.map((slug) => ({ slug }));
  };

  // 2. Initialize state with URL data
  const [filters, setFilters] = useState<{
    categories: { slug: string; displayName?: string }[];
  }>({
    categories: getInitialCategories(), // Initializes categories from URL
  });

  const [currentPage, setCurrentPage] = useState(pageNumber);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleRemoveTag = (category: { slug: string }) => {
    setFilters((prevState) => ({
      ...prevState,
      categories: [
        ...prevState.categories.filter((item) => item.slug !== category.slug),
      ], // Filter using slug for reliable comparison
    }));
    setCurrentPage(1);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const router = useRouter();

  /**
   * Builds the URL with the selected category filters whenever they (or the
   * current page) change.
   */
  useEffect(() => {
    // 1. Initialize an array to hold all search parameter strings
    const params: string[] = [];

    // 2. Add category parameters
    filters.categories.forEach((category) => {
      params.push(`category=${category.slug}`);
    });

    // 3. Construct the search string
    const searchString = params.join("&");

    // 4. Build the final URL path
    let newPath = `/release-notes/${currentPage}`;
    if (searchString.length > 0) {
      newPath += `/?${searchString}`;
    }

    // 5. Push the new URL
    router.push(newPath);
  }, [filters, currentPage, router]); // Dependency array for filters and currentPage

  useEffect(() => {
    setCurrentPage(pageNumber);
  }, [pageNumber]);

  return (
    <>
      <div
        style={{
          borderBottom: "1px solid var(--pds-color-border-default)",
          paddingBlockEnd: "var(--pds-spacing-3xl)",
          paddingBlockStart: "var(--pds-spacing-m)",
        }}
      >

        {/*
          Text-based filtering of the release notes on this page is handled
          by <ReleaseNoteSearch>, which is rendered above the note list in
          src/templates/release-note-listing/index.tsx. It filters and
          highlights matches client-side without a server round-trip, unlike
          the category filters below (see the `query` search param removed
          here: it was never read by the page and had no effect).
        */}
        <div className="rn-popover-trigger-and-tags">
          <ReleaseNotePopoverCategorySelector
            allCategories={allCategories}
            categories={categories}
            filters={filters}
            setFilters={setFilters}
            setCurrentPage={setCurrentPage}
            isDisabled={!isLoaded}
          />
          <div className="rn-tags-list">
            {filters &&
              filters.categories.map((item) => {
                return (
                  <Tag
                    key={item.slug}
                    tagLabel={
                      releaseNoteCategoryLoader(item.slug)?.displayName ?? ""
                    }
                    tagColor={releaseNoteCategoryLoader(item.slug)?.color}
                    onRemove={() => handleRemoveTag(item)}
                    isRemovable={true}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
