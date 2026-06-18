"use client";

import debounce from "lodash.debounce";

import { Tag, TextInput } from "@pantheon-systems/pds-toolkit-react";
import { useEffect, useRef, useState } from "react";
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

  // Helper to get initial query from URL (NEW)
  const getInitialQuery = () => {
    // We use searchParams.get() for a single value, defaulting to an empty string.

    console.log('getInitialQuery searchParams:', Array.from(searchParams.entries()) );
    return searchParams.get("query") || "";
  };

  // 2. Initialize state with URL data
  const [filters, setFilters] = useState<{
    query: string;
    categories: { slug: string; displayName?: string }[];
  }>({
    query: getInitialQuery(), // ✅ Initializes query from URL
    categories: getInitialCategories(), // Initializes categories from URL
  });

  const [currentPage, setCurrentPage] = useState(pageNumber);
  const [isLoaded, setIsLoaded] = useState(false);

  // We can remove queryRef since we are no longer using it for the input value.
  // It is also not strictly necessary for the onChange handler.
  // let queryRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    // Note: The input value is now controlled by the user's typing
    // We update the state, which triggers the useEffect hook below.
    setFilters((prevState) => ({ ...prevState, query: newQuery }));
    setCurrentPage(1);
  };

  const debouncedHandleInputChange = debounce(handleInputChange, 300);

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
   * 🛑 The core fix is in this useEffect hook.
   * It now correctly builds the URL with both category filters and the search query.
   */
  useEffect(() => {
    // 1. Initialize an array to hold all search parameter strings
    const params = [];

    // 2. Add category parameters
    filters.categories.forEach((category) => {
      params.push(`category=${category.slug}`);
    });

    // 3. Add query parameter, if it exists
    const trimmedQuery = filters.query.trim();
    console.log('inside useEffect');
    if (trimmedQuery.length > 0) {
      console.log('trimmedQuery:', trimmedQuery);
      // Use encodeURIComponent to safely handle spaces and special characters
      console.log('Adding query to params:', trimmedQuery);
      params.push(`query=${encodeURIComponent(trimmedQuery)}`);
    }

    // 4. Construct the search string
    const searchString = params.join("&");

    // 5. Build the final URL path
    let newPath = `/release-notes/${currentPage}`;
    if (searchString.length > 0) {
      newPath += `/?${searchString}`;
    }

    // 6. Push the new URL
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

        {/* Text based search of release notes is not functional.
        The UI is commented out for now. https://github.com/pantheon-systems/documentation-in-nextjs/issues/177
        It may be preferable to just wait until release notes are moved fully
        to Content Publisher.
        <div
          className="pds-input-field pds-input-field--text pds-spacing-mar-block-end-xl"
          style={{
            flexGrow: "2",
          }}
        >
          <TextInput
            type="search"
            searchIcon="filter"
            aria-label="Filter by text"
            placeholder="Filter by text"
            // Use defaultValue to initialize the input with the URL query on mount
            defaultValue={filters.query}
            id="release-note-filter"
            className="pds-input-field__input"
            onChange={debouncedHandleInputChange}
            label={""}
          />
        </div>
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
