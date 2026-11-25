"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { SearchSection } from "@/lib/search-sections";

// The site search results page. AddSearch finds the matches; the Content and
// Section filters, the counts and the paging are done here, over the first few
// hundred matches, so the filters can show how many results each would keep.

const ADDSEARCH_KEY = "a7b957b7a8f57f4cc544c54f289611c6";
const FETCH_SIZE = 100;
const MAX_FETCH_PAGES = 5;
export const RESULTS_PER_PAGE = 10;

type RawHit = {
  id: string;
  url: string;
  title: string;
  meta_description?: string;
  highlight?: string;
};

export type SearchHit = {
  id: string;
  /** An internal path, or the full URL for another site (P1 docs). */
  href: string;
  isInternal: boolean;
  title: string;
  /** Text with the matches wrapped in <em>, as AddSearch returns it. */
  highlight: string;
  isReleaseNote: boolean;
  section: string | null;
  trail: string[];
};

export type SearchFilters = { content: string[]; section: string[] };

type Status = "idle" | "loading" | "done" | "error";

type SearchContextValue = {
  query: string;
  status: Status;
  /** Matches AddSearch reports, which can be more than were fetched. */
  totalHits: number;
  hits: SearchHit[];
  filtered: SearchHit[];
  pageHits: SearchHit[];
  page: number;
  filters: SearchFilters;
  contentCounts: Record<string, number>;
  sectionCounts: { slug: string; label: string; count: number }[];
  setQuery: (query: string) => void;
  setFilter: (kind: keyof SearchFilters, values: string[]) => void;
  clearFilters: () => void;
  setPage: (page: number) => void;
};

const SearchContext = createContext<SearchContextValue | null>(null);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used inside SearchProvider");
  return context;
};

export const slugify = (label: string) =>
  label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const normalizePath = (path: string) =>
  path.length > 1 ? path.replace(/\/$/, "") : path;

export const toHit = (
  raw: RawHit,
  sections: Record<string, SearchSection>
): SearchHit => {
  const url = new URL(raw.url);
  const isInternal = url.host === "docs.pantheon.io";
  const path = normalizePath(url.pathname);
  const isReleaseNote = isInternal && path.startsWith("/release-notes");
  const info = isInternal ? sections[path] : undefined;
  // The P1 docs are their own site, listed as the P1 section.
  const section =
    info?.section ?? (url.host === "docs.p1.pantheon.io" ? "P1" : null);

  return {
    id: raw.id,
    // Another site's page links out as it is, but only over http(s): never a
    // javascript: or data: URL from the index.
    href: isInternal
      ? `${url.pathname}${url.hash}`
      : url.protocol === "https:" || url.protocol === "http:"
        ? url.href
        : "#",
    isInternal,
    title: raw.title,
    highlight:
      cleanHighlight(raw.highlight ?? "", raw.title) ||
      raw.meta_description ||
      "",
    isReleaseNote,
    section: isReleaseNote ? null : section,
    trail: info?.trail ?? (section ? [section] : []),
  };
};

// AddSearch's highlight starts with the page title, the site name and the
// search box's label, so cut that off to leave the text from the page itself.
export const cleanHighlight = (highlight: string, title: string) => {
  let text = highlight.replace(/^.*?\|\s*Pantheon Docs\s*/, "");
  text = text.replace(/^Search Pantheon Documentation\s*/, "");
  const plainTitle = title.trim();
  if (plainTitle && text.toLowerCase().startsWith(plainTitle.toLowerCase())) {
    text = text.slice(plainTitle.length).trim();
  }
  return text.trim();
};

const fetchPage = async (term: string, page: number) => {
  const response = await fetch(
    `https://api.addsearch.com/v1/search/${ADDSEARCH_KEY}?term=${encodeURIComponent(
      term
    )}&limit=${FETCH_SIZE}&page=${page}&sort=relevance`
  );
  if (!response.ok) throw new Error(`AddSearch responded ${response.status}`);
  return (await response.json()) as { total_hits: number; hits: RawHit[] };
};

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams?.get("search")?.trim() ?? "";
  const page = Math.max(1, parseInt(searchParams?.get("page") ?? "1", 10) || 1);
  const filters: SearchFilters = useMemo(
    () => ({
      content: searchParams?.getAll("content") ?? [],
      section: searchParams?.getAll("section") ?? [],
    }),
    [searchParams]
  );

  // What was fetched, and for which term. The status follows from comparing it
  // with the current term, so the effect below only sets state once a request
  // has finished.
  const [result, setResult] = useState<{
    query: string;
    hits: RawHit[];
    total: number;
  } | null>(null);
  const [failedQuery, setFailedQuery] = useState<string | null>(null);
  const status: Status = !query
    ? "idle"
    : result?.query === query
      ? "done"
      : failedQuery === query
        ? "error"
        : "loading";
  const raw = useMemo(
    () => (result?.query === query ? result.hits : []),
    [result, query]
  );
  const totalHits = result?.query === query ? result.total : 0;
  const [sections, setSections] = useState<Record<string, SearchSection>>({});

  // Where each page sits in the menu: loaded once.
  useEffect(() => {
    fetch("/search/sections.json")
      .then((response) => response.json())
      .then(setSections)
      .catch(() => setSections({}));
  }, []);

  // Fetch the matches whenever the term changes (not for filters or paging).
  useEffect(() => {
    if (!query) return;

    let cancelled = false;

    (async () => {
      try {
        const first = await fetchPage(query, 1);
        const pages = Math.min(
          MAX_FETCH_PAGES,
          Math.ceil(first.total_hits / FETCH_SIZE)
        );
        const rest = await Promise.all(
          Array.from({ length: Math.max(0, pages - 1) }, (_, i) =>
            fetchPage(query, i + 2)
          )
        );
        if (cancelled) return;
        setResult({
          query,
          hits: [first, ...rest].flatMap((page) => page.hits),
          total: first.total_hits,
        });
      } catch {
        if (!cancelled) setFailedQuery(query);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [query]);

  const hits = useMemo(
    () => raw.map((hit) => toHit(hit, sections)),
    [raw, sections]
  );

  const filtered = useMemo(
    () =>
      hits.filter((hit) => {
        const contentOk =
          filters.content.length === 0 ||
          filters.content.includes(
            hit.isReleaseNote ? "release-notes" : "guides"
          );
        const sectionOk =
          filters.section.length === 0 ||
          (hit.section !== null &&
            filters.section.includes(slugify(hit.section)));
        return contentOk && sectionOk;
      }),
    [hits, filters]
  );

  const contentCounts = useMemo(() => {
    const releaseNotes = hits.filter((hit) => hit.isReleaseNote).length;
    return {
      guides: hits.length - releaseNotes,
      "release-notes": releaseNotes,
    };
  }, [hits]);

  const sectionCounts = useMemo(() => {
    const counts = new Map<string, number>();
    hits.forEach((hit) => {
      if (hit.section)
        counts.set(hit.section, (counts.get(hit.section) ?? 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([label, count]) => ({ slug: slugify(label), label, count }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
  }, [hits]);

  const pageHits = useMemo(
    () =>
      filtered.slice((page - 1) * RESULTS_PER_PAGE, page * RESULTS_PER_PAGE),
    [filtered, page]
  );

  const update = useCallback(
    (
      change: (params: URLSearchParams) => void,
      options?: { scroll?: boolean }
    ) => {
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      change(params);
      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: options?.scroll ?? false,
      });
    },
    [router, pathname, searchParams]
  );

  const value: SearchContextValue = {
    query,
    status,
    totalHits,
    hits,
    filtered,
    pageHits,
    page,
    filters,
    contentCounts,
    sectionCounts,
    setQuery: (next) =>
      update((params) => {
        params.delete("page");
        if (next.trim()) params.set("search", next.trim());
        else params.delete("search");
      }),
    setFilter: (kind, values) =>
      update((params) => {
        params.delete("page");
        params.delete(kind);
        values.forEach((value) => params.append(kind, value));
      }),
    clearFilters: () =>
      update((params) => {
        params.delete("page");
        params.delete("content");
        params.delete("section");
      }),
    setPage: (next) =>
      update(
        (params) => {
          if (next > 1) params.set("page", String(next));
          else params.delete("page");
        },
        { scroll: true }
      ),
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
