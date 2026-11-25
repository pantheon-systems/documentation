"use client";

import debounce from "lodash.debounce";
import { TextInput } from "@pantheon-systems/pds-toolkit-react";
import { useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { buildSnippet } from "./text";

// Keyword search for a dated listing (release notes, the vulnerability
// tracker): the full index is fetched lazily on the first keystroke, matches
// are ranked client-side (title above body), and an active filter in the URL
// is respected. Each listing supplies a config and renders its own results.

export type ListingSearchEntry = {
  slug: string;
  title: string;
  publishedDate: string | null;
  text: string;
};

export type ScoredEntry<T extends ListingSearchEntry> = T & {
  snippet: string;
  score: number;
};

export type ListingSearchConfig<T extends ListingSearchEntry> = {
  indexUrl: string;
  /** URL param that holds the active filter values, e.g. "category". */
  filterParam: string;
  /** The filter values an entry carries. It matches when it has any selected. */
  entryFilterValues: (entry: T) => string[];
  /** A trailing clause like ' in "Action Required"', or '' with no filter. */
  describeFilters: (selected: string[]) => string;
  nounSingular: string;
  nounPlural: string;
  /** Used in the empty state: "Try a different keyword or category." */
  filterNoun: string;
};

// Site-wide search can match a lot of entries for a generic keyword; cap how
// many we render so the DOM stays small.
const MAX_RESULTS = 50;

/**
 * Filters and ranks the index against `query`, additionally requiring each
 * match to carry at least one of `selected` when that list is non-empty: the
 * "any of these" semantics the filter dropdown uses for the listing, so an
 * active filter is respected by search results too. Title matches rank above
 * body-only matches; ties keep the index's original (newest-first) order.
 */
function searchIndex<T extends ListingSearchEntry>(
  index: T[],
  query: string,
  selected: string[],
  entryFilterValues: (entry: T) => string[],
): ScoredEntry<T>[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const matches: (ScoredEntry<T> & { originalIndex: number })[] = [];

  index.forEach((entry, originalIndex) => {
    if (
      selected.length > 0 &&
      !entryFilterValues(entry).some((value) => selected.includes(value))
    ) {
      return;
    }

    const titleMatch = entry.title.toLowerCase().includes(trimmed);
    const textMatch = entry.text.toLowerCase().includes(trimmed);
    if (!titleMatch && !textMatch) return;

    matches.push({
      ...entry,
      snippet: buildSnippet(entry.text, query),
      score: titleMatch ? 2 : 1,
      originalIndex,
    });
  });

  matches.sort(
    (a, b) => b.score - a.score || a.originalIndex - b.originalIndex,
  );

  return matches;
}

// The context holds one listing's search at a time, so its entry type is erased
// here and put back by the typed components that read it.
/* eslint-disable @typescript-eslint/no-explicit-any */
type ContextValue = {
  config: ListingSearchConfig<any>;
  query: string;
  trimmedQuery: string;
  isSearching: boolean;
  isWaitingForIndex: boolean;
  indexError: boolean;
  index: ListingSearchEntry[] | null;
  allMatches: ScoredEntry<any>[];
  /* eslint-enable @typescript-eslint/no-explicit-any */
  selectedFilters: string[];
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
};

const ListingSearchContext = createContext<ContextValue | null>(null);

function useListingSearchContext(): ContextValue {
  const context = useContext(ListingSearchContext);
  if (!context) {
    throw new Error(
      "ListingSearchInput and ListingSearchResults must be rendered inside a ListingSearchProvider",
    );
  }
  return context;
}

/**
 * Owns all search state. Rendered once around both the search input and the
 * results/listing area, so the input can be positioned anywhere on the page
 * (e.g. above the filter) independently of where the results are rendered.
 */
export function ListingSearchProvider<T extends ListingSearchEntry>({
  config,
  children,
}: {
  config: ListingSearchConfig<T>;
  children: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [index, setIndex] = useState<T[] | null>(null);
  const [indexError, setIndexError] = useState(false);
  const fetchStartedRef = useRef(false);

  // The filter dropdown writes its selection to a URL param. Reading it here,
  // rather than lifting that component's state, keeps the two decoupled while
  // still in sync: useSearchParams() re-renders this component whenever the
  // URL changes, including from that sibling.
  const searchParams = useSearchParams();
  const selectedFilters = useMemo(
    () => searchParams?.getAll(config.filterParam) ?? [],
    [searchParams, config.filterParam],
  );

  // The full index is only needed once someone actually searches, so it's
  // fetched lazily on the first keystroke rather than on page load.
  const ensureIndexLoaded = useCallback(() => {
    if (fetchStartedRef.current) return;
    fetchStartedRef.current = true;
    setIndexError(false);

    fetch(config.indexUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unexpected response: ${response.status}`);
        }
        return response.json() as Promise<T[]>;
      })
      .then((data) => setIndex(data))
      .catch(() => {
        fetchStartedRef.current = false;
        setIndexError(true);
      });
  }, [config.indexUrl]);

  const debouncedSetQuery = useMemo(
    () => debounce((value: string) => setDebouncedQuery(value), 150),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedSetQuery.cancel();
    };
  }, [debouncedSetQuery]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setQuery(value);
      if (value.trim().length > 0) {
        ensureIndexLoaded();
      }
      debouncedSetQuery(value);
    },
    [debouncedSetQuery, ensureIndexLoaded],
  );

  const handleClear = useCallback(() => {
    debouncedSetQuery.cancel();
    setQuery("");
    setDebouncedQuery("");
  }, [debouncedSetQuery]);

  const trimmedQuery = debouncedQuery.trim();
  const isSearching = trimmedQuery.length > 0;

  const allMatches = useMemo(() => {
    if (!isSearching || !index) return [];
    return searchIndex(
      index,
      trimmedQuery,
      selectedFilters,
      config.entryFilterValues,
    );
  }, [index, isSearching, trimmedQuery, selectedFilters, config]);

  const isWaitingForIndex = isSearching && !index && !indexError;

  const contextValue = useMemo<ContextValue>(
    () => ({
      config,
      query,
      trimmedQuery,
      isSearching,
      isWaitingForIndex,
      indexError,
      index,
      allMatches,
      selectedFilters,
      handleChange,
      handleClear,
    }),
    [
      config,
      query,
      trimmedQuery,
      isSearching,
      isWaitingForIndex,
      indexError,
      index,
      allMatches,
      selectedFilters,
      handleChange,
      handleClear,
    ],
  );

  return (
    <ListingSearchContext.Provider value={contextValue}>
      {children}
    </ListingSearchContext.Provider>
  );
}

/** The full-width search box. Can be placed anywhere within a ListingSearchProvider. */
export const ListingSearchInput = ({
  id,
  label,
}: {
  id: string;
  /** Used as both the placeholder and the accessible name. */
  label: string;
}) => {
  const {
    config,
    query,
    trimmedQuery,
    isSearching,
    isWaitingForIndex,
    index,
    allMatches,
    selectedFilters,
    handleChange,
    handleClear,
  } = useListingSearchContext();

  const filterLabel = config.describeFilters(selectedFilters);

  return (
    <>
      <form
        className="pan-docs-page-search"
        role="search"
        onSubmit={(event) => event.preventDefault()}
      >
        <TextInput
          type="search"
          searchIcon="filter"
          aria-label={label}
          placeholder={label}
          value={query}
          hasClearButton
          onClear={handleClear}
          id={id}
          onChange={handleChange}
          label=""
        />
      </form>

      {/* Announces result counts to screen reader users as they type. */}
      <p className="visually-hidden" role="status" aria-live="polite">
        {isWaitingForIndex
          ? `Searching all ${config.nounPlural}…`
          : isSearching && index
            ? `Found ${allMatches.length} ${
                allMatches.length === 1
                  ? config.nounSingular
                  : config.nounPlural
              } matching "${trimmedQuery}"${filterLabel}`
            : ""}
      </p>
    </>
  );
};

/**
 * Renders either the search results (when a search is active) or `children`,
 * the normal server-rendered listing, otherwise. Each listing renders its own
 * results with `renderResults`, in the same format as its listing.
 */
export function ListingSearchResults<T extends ListingSearchEntry>({
  children,
  containerClassName,
  renderResults,
}: {
  children: ReactNode;
  containerClassName?: string;
  renderResults: (results: ScoredEntry<T>[], query: string) => ReactNode;
}) {
  const {
    config,
    isSearching,
    isWaitingForIndex,
    indexError,
    index,
    allMatches,
    trimmedQuery,
    selectedFilters,
  } = useListingSearchContext();

  if (!isSearching) {
    return <>{children}</>;
  }

  const results = (allMatches as ScoredEntry<T>[]).slice(0, MAX_RESULTS);
  const filterLabel = config.describeFilters(selectedFilters);

  return (
    <div className={containerClassName}>
      {isWaitingForIndex && (
        <p className="rn-search-status">Searching all {config.nounPlural}…</p>
      )}

      {indexError && (
        <p className="rn-search-status rn-search-status--error">
          Something went wrong loading {config.nounPlural} to search. Please try
          again.
        </p>
      )}

      {!isWaitingForIndex && index && allMatches.length === 0 && (
        <p className="rn-search-empty-state">
          No {config.nounPlural} match &ldquo;{trimmedQuery}&rdquo;
          {filterLabel}. Try a different keyword
          {selectedFilters.length > 0 ? ` or ${config.filterNoun}` : ""}.
        </p>
      )}

      {results.length > 0 && (
        <>
          <p className="rn-search-result-count">
            {allMatches.length > MAX_RESULTS
              ? `Showing the ${MAX_RESULTS} most relevant of ${allMatches.length} matching ${config.nounPlural}${filterLabel}`
              : `${allMatches.length} ${
                  allMatches.length === 1
                    ? config.nounSingular
                    : config.nounPlural
                } match "${trimmedQuery}"${filterLabel}`}
          </p>
          {renderResults(results, trimmedQuery)}
        </>
      )}
    </div>
  );
}
