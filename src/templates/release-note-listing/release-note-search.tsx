"use client";

import debounce from "lodash.debounce";
import { Tag, TextInput } from "@pantheon-systems/pds-toolkit-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PublishedDate from "@/components/common/published-date";
import { releaseNoteCategoryLoader } from "./release-note-categories";
import {
  ChangeEvent,
  Fragment,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type ReleaseNoteSearchEntry = {
  slug: string;
  title: string;
  publishedDate: string | null;
  categories: string[];
  text: string;
};

type ScoredEntry = ReleaseNoteSearchEntry & { snippet: string; score: number };

const SEARCH_INDEX_URL = "/release-notes/search-index.json";
// Site-wide search can match a lot of release notes for a generic keyword;
// cap how many we render so the DOM stays small.
const MAX_RESULTS = 50;
const SNIPPET_RADIUS = 90;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Splits `text` on every case-insensitive occurrence of `query` and wraps
 * the matches in <mark>, returning renderable React children.
 */
function highlightText(text: string, query: string): ReactNode {
  const trimmed = query.trim();
  if (!trimmed) return text;

  const parts = text.split(new RegExp(`(${escapeRegExp(trimmed)})`, "gi"));
  if (parts.length === 1) return text;

  // String#split with a single capturing group alternates
  // [non-match, match, non-match, match, ...], so odd indices are matches.
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <mark key={index} className="release-note-search-highlight">
        {part}
      </mark>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    )
  );
}

/** Builds a short excerpt of `text` centered on the first match of `query`. */
function buildSnippet(text: string, query: string): string {
  const trimmed = query.trim();
  const matchIndex = trimmed
    ? text.toLowerCase().indexOf(trimmed.toLowerCase())
    : -1;

  if (matchIndex === -1) {
    return text.length > SNIPPET_RADIUS * 2
      ? `${text.slice(0, SNIPPET_RADIUS * 2).trim()}…`
      : text;
  }

  const start = Math.max(0, matchIndex - SNIPPET_RADIUS);
  const end = Math.min(text.length, matchIndex + trimmed.length + SNIPPET_RADIUS);

  let snippet = text.slice(start, end).trim();
  if (start > 0) snippet = `…${snippet}`;
  if (end < text.length) snippet = `${snippet}…`;
  return snippet;
}

/**
 * Filters and ranks the search index against `query`, additionally
 * requiring each match to carry at least one of `selectedCategories` when
 * that list is non-empty - the same "any of these categories" semantics
 * the category filter dropdown already uses for the paginated listing, so
 * an active category filter is respected by search results too. Title
 * matches rank above body-only matches; ties keep the index's original
 * (newest-first) order.
 */
function searchIndex(
  index: ReleaseNoteSearchEntry[],
  query: string,
  selectedCategories: string[]
): ScoredEntry[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const matches: (ScoredEntry & { originalIndex: number })[] = [];

  index.forEach((entry, originalIndex) => {
    if (
      selectedCategories.length > 0 &&
      !entry.categories.some((category) =>
        selectedCategories.includes(category)
      )
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
    (a, b) => b.score - a.score || a.originalIndex - b.originalIndex
  );

  return matches;
}

/** Builds a trailing clause like ' in "Action Required"' for status messages, or '' when no category filter is active. */
function describeSelectedCategories(selectedCategories: string[]): string {
  if (selectedCategories.length === 0) return "";
  const labels = selectedCategories.map(
    (slug) => releaseNoteCategoryLoader(slug)?.displayName ?? slug
  );
  return ` in ${labels.join(", ")}`;
}

type ReleaseNoteSearchContextValue = {
  query: string;
  trimmedQuery: string;
  isSearching: boolean;
  isWaitingForIndex: boolean;
  indexError: boolean;
  index: ReleaseNoteSearchEntry[] | null;
  allMatches: ScoredEntry[];
  selectedCategories: string[];
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
};

const ReleaseNoteSearchContext =
  createContext<ReleaseNoteSearchContextValue | null>(null);

function useReleaseNoteSearchContext(): ReleaseNoteSearchContextValue {
  const context = useContext(ReleaseNoteSearchContext);
  if (!context) {
    throw new Error(
      "ReleaseNoteSearchInput and ReleaseNoteSearchResults must be rendered inside a ReleaseNoteSearchProvider"
    );
  }
  return context;
}

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
}) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [index, setIndex] = useState<ReleaseNoteSearchEntry[] | null>(null);
  const [indexError, setIndexError] = useState(false);
  const fetchStartedRef = useRef(false);

  // The category filter dropdown (ReleaseNoteListingClientComponent) writes
  // its selection to the `category` URL param. Reading it here - rather
  // than lifting that component's state - keeps the two filters decoupled
  // while still staying in sync: useSearchParams() re-renders this
  // component whenever the URL changes, including from that sibling.
  const searchParams = useSearchParams();
  const selectedCategories = useMemo(
    () => searchParams?.getAll("category") ?? [],
    [searchParams]
  );

  // The full-site index is only needed once someone actually searches, so
  // it's fetched lazily on the first keystroke rather than on page load.
  const ensureIndexLoaded = useCallback(() => {
    if (fetchStartedRef.current) return;
    fetchStartedRef.current = true;
    setIndexError(false);

    fetch(SEARCH_INDEX_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unexpected response: ${response.status}`);
        }
        return response.json() as Promise<ReleaseNoteSearchEntry[]>;
      })
      .then((data) => setIndex(data))
      .catch(() => {
        fetchStartedRef.current = false;
        setIndexError(true);
      });
  }, []);

  const debouncedSetQuery = useMemo(
    () => debounce((value: string) => setDebouncedQuery(value), 150),
    []
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
    [debouncedSetQuery, ensureIndexLoaded]
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
    return searchIndex(index, trimmedQuery, selectedCategories);
  }, [index, isSearching, trimmedQuery, selectedCategories]);

  const isWaitingForIndex = isSearching && !index && !indexError;

  const contextValue = useMemo<ReleaseNoteSearchContextValue>(
    () => ({
      query,
      trimmedQuery,
      isSearching,
      isWaitingForIndex,
      indexError,
      index,
      allMatches,
      selectedCategories,
      handleChange,
      handleClear,
    }),
    [
      query,
      trimmedQuery,
      isSearching,
      isWaitingForIndex,
      indexError,
      index,
      allMatches,
      selectedCategories,
      handleChange,
      handleClear,
    ]
  );

  return (
    <ReleaseNoteSearchContext.Provider value={contextValue}>
      {children}
    </ReleaseNoteSearchContext.Provider>
  );
};

/** The full-width search box. Can be placed anywhere within a ReleaseNoteSearchProvider. */
export const ReleaseNoteSearchInput = () => {
  const {
    query,
    trimmedQuery,
    isSearching,
    isWaitingForIndex,
    index,
    allMatches,
    selectedCategories,
    handleChange,
    handleClear,
  } = useReleaseNoteSearchContext();

  const categoryLabel = describeSelectedCategories(selectedCategories);

  return (
    <>
      <div className="pds-input-field pds-input-field--text pds-spacing-mar-block-end-xl rn-search-input">
        <TextInput
          type="search"
          searchIcon="filter"
          aria-label="Search all release notes by keyword"
          placeholder="Search all release notes by keyword"
          value={query}
          hasClearButton
          onClear={handleClear}
          id="release-note-filter"
          className="pds-input-field__input"
          onChange={handleChange}
          label=""
        />
      </div>

      {/* Announces result counts to screen reader users as they type. */}
      <p className="visually-hidden" role="status" aria-live="polite">
        {isWaitingForIndex
          ? "Searching all release notes…"
          : isSearching && index
            ? `Found ${allMatches.length} release note${
                allMatches.length === 1 ? "" : "s"
              } matching "${trimmedQuery}"${categoryLabel}`
            : ""}
      </p>
    </>
  );
};

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
}) => {
  const {
    isSearching,
    isWaitingForIndex,
    indexError,
    index,
    allMatches,
    trimmedQuery,
    selectedCategories,
  } = useReleaseNoteSearchContext();

  if (!isSearching) {
    return <>{children}</>;
  }

  const results = allMatches.slice(0, MAX_RESULTS);
  const categoryLabel = describeSelectedCategories(selectedCategories);

  return (
    <div className={containerClassName}>
      {isWaitingForIndex && (
        <p className="rn-search-status">Searching all release notes…</p>
      )}

      {indexError && (
        <p className="rn-search-status rn-search-status--error">
          Something went wrong loading release notes to search. Please try
          again.
        </p>
      )}

      {!isWaitingForIndex && index && allMatches.length === 0 && (
        <p className="rn-search-empty-state">
          No release notes match &ldquo;{trimmedQuery}&rdquo;{categoryLabel}.
          Try a different keyword{selectedCategories.length > 0 ? " or category" : ""}.
        </p>
      )}

      {results.length > 0 && (
        <>
          <p className="rn-search-result-count">
            {allMatches.length > MAX_RESULTS
              ? `Showing the ${MAX_RESULTS} most relevant of ${allMatches.length} matching release notes${categoryLabel}`
              : `${allMatches.length} release note${
                  allMatches.length === 1 ? "" : "s"
                } match "${trimmedQuery}"${categoryLabel}`}
          </p>
          <ul className="rn-search-results">
            {results.map((result) => (
              <li key={result.slug} className="rn-search-result">
                <div className="rn-search-result__header">
                  <Link
                    href={`/${result.slug}`}
                    className="rn-search-result__title"
                  >
                    {highlightText(result.title, trimmedQuery)}
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
                  {highlightText(result.snippet, trimmedQuery)}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
