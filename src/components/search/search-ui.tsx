"use client";

import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Button,
  CheckboxGroup,
  Pagination,
  TextInput,
} from "@/components/ui/pds-re-export";
import { RESULTS_PER_PAGE, useSearch } from "./search-provider";

/**
 * AddSearch marks the matches with <em>. Parse its HTML into an inert document
 * and rebuild it as React text and <mark>, so no tag or entity is handled with
 * a regular expression and none of its markup is injected into the page.
 */
export const renderHighlight = (highlight: string): ReactNode => {
  const doc = new DOMParser().parseFromString(highlight, "text/html");
  const nodes: ReactNode[] = [];

  const walk = (parent: Node, inMatch: boolean) => {
    parent.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent ?? "";
        if (!text) return;
        nodes.push(
          inMatch ? (
            <mark key={nodes.length} className="release-note-search-highlight">
              {text}
            </mark>
          ) : (
            <span key={nodes.length}>{text}</span>
          )
        );
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const element = child as Element;
        // Text inside a script or style is code, not content.
        if (element.tagName === "SCRIPT" || element.tagName === "STYLE") return;
        walk(element, inMatch || element.tagName === "EM");
      }
    });
  };

  walk(doc.body, false);
  return nodes;
};

/** The page heading, the search box and the result count. */
export const SearchHeader = () => {
  const { query, status, filtered, hits, totalHits, setQuery } = useSearch();
  const [value, setValue] = useState(query);
  const [shownQuery, setShownQuery] = useState(query);
  const [sentQuery, setSentQuery] = useState(query);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const latestSetQuery = useRef(setQuery);

  useEffect(() => {
    latestSetQuery.current = setQuery;
  });
  useEffect(() => () => clearTimeout(timer.current), []);

  // Follow the URL when it changes under the box (the back button, a link with
  // a term), but not for the change the box itself just made: the URL then only
  // trails what the reader typed.
  if (query !== shownQuery) {
    setShownQuery(query);
    if (query !== sentQuery) {
      setSentQuery(query);
      setValue(query);
    }
  }

  const send = (next: string) => {
    setSentQuery(next.trim());
    latestSetQuery.current(next);
  };

  const change = (next: string) => {
    setValue(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => send(next), 500);
  };

  let message = "Enter a search term to find pages in the documentation.";
  if (status === "loading") message = "Searching…";
  if (status === "error")
    message = "Something went wrong with the search. Please try again.";
  if (status === "done") {
    message =
      filtered.length === 0
        ? `No results for “${query}”. Try a different keyword or fewer filters.`
        : `${filtered.length} result${filtered.length === 1 ? "" : "s"} for “${query}”${
            hits.length < totalHits
              ? ` (the ${hits.length} best of ${totalHits} matches)`
              : ""
          }`;
  }

  return (
    <div className="docs-search-header">
      <h1 className="pds-heading-4xl">Search results</h1>
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          clearTimeout(timer.current);
          send(value);
        }}
      >
        <TextInput
          id="search-results-query"
          type="search"
          label="Search the documentation"
          showLabel={false}
          placeholder="Search the documentation"
          value={value}
          hasClearButton
          onClear={() => change("")}
          onChange={(event) => change(event.target.value)}
        />
      </form>
      <p className="docs-search-header__count" role="status" aria-live="polite">
        {message}
      </p>
    </div>
  );
};

/** The Content and Section filters, each with how many results it would keep. */
export const SearchFilters = () => {
  const {
    status,
    hits,
    filters,
    contentCounts,
    sectionCounts,
    setFilter,
    clearFilters,
  } = useSearch();

  // Nothing to filter when there are no matches.
  if (status !== "done" || hits.length === 0) return null;
  const hasFilters = filters.content.length + filters.section.length > 0;

  return (
    <div className="docs-search-filters">
      {/* Keyed on the selection so the checkboxes follow the URL. */}
      <CheckboxGroup
        key={`content-${filters.content.join("|")}`}
        id="search-content"
        label="Content"
        labelVariant="heading"
        options={[
          {
            id: "search-content-guides",
            label: `Guides and references (${contentCounts.guides})`,
            value: "guides",
            checked: filters.content.includes("guides"),
          },
          {
            id: "search-content-release-notes",
            label: `Release notes (${contentCounts["release-notes"]})`,
            value: "release-notes",
            checked: filters.content.includes("release-notes"),
          },
        ]}
        onValueChange={(values) => setFilter("content", values)}
      />
      {sectionCounts.length > 0 && (
        <CheckboxGroup
          key={`section-${filters.section.join("|")}`}
          id="search-section"
          label="Section"
          labelVariant="heading"
          options={sectionCounts.map((section) => ({
            id: `search-section-${section.slug}`,
            label: `${section.label} (${section.count})`,
            value: section.slug,
            checked: filters.section.includes(section.slug),
          }))}
          onValueChange={(values) => setFilter("section", values)}
        />
      )}
      <Button
        label="Clear all"
        variant="subtle"
        size="s"
        onClick={clearFilters}
        disabled={!hasFilters}
      />
    </div>
  );
};

/** The matches on this page, and the pagination. */
export const SearchResultsList = () => {
  const { status, pageHits, filtered, page, setPage } = useSearch();

  if (status !== "done" || filtered.length === 0) return null;

  return (
    <>
      <ol className="docs-search-results">
        {pageHits.map((hit) => (
          <li key={hit.id} className="docs-search-result">
            <p className="docs-search-result__path">
              {hit.isReleaseNote ? "Release notes" : hit.trail.join(" › ")}
            </p>
            <h2 className="docs-search-result__title">
              {hit.isInternal ? (
                <Link href={hit.href}>{hit.title}</Link>
              ) : (
                <a href={hit.href}>{hit.title}</a>
              )}
            </h2>
            {hit.highlight && (
              <p className="docs-search-result__snippet">
                {renderHighlight(hit.highlight)}
              </p>
            )}
          </li>
        ))}
      </ol>
      {filtered.length > RESULTS_PER_PAGE && (
        <Pagination
          className="docs-note-pagination"
          currentPage={page}
          totalItemCount={filtered.length}
          itemsPerPage={RESULTS_PER_PAGE}
          headingText="Search results pages"
          onPageChange={setPage}
        />
      )}
    </>
  );
};
