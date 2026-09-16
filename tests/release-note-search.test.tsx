/// <reference types="vitest-fetch-mock/types" />
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  ReleaseNoteSearchProvider,
  ReleaseNoteSearchInput,
  ReleaseNoteSearchResults,
} from "@/templates/release-note-listing/release-note-search";

// ReleaseNoteSearchProvider reads the `category` filter from the URL via
// next/navigation's useSearchParams(), which requires a Next.js router
// context that isn't present under plain @testing-library/react rendering.
// Mock it so tests can control what "URL" the component sees, the same way
// the category filter dropdown would set it via router.push().
let mockSearchParams = new URLSearchParams();
vi.mock("next/navigation", () => ({
  useSearchParams: () => mockSearchParams,
}));

const SEARCH_INDEX = [
  {
    slug: "release-notes/2026/09/current-page-note",
    title: "Improved dashboard performance",
    publishedDate: "2026-09-10",
    categories: [],
    text: "We shipped faster page loads across the Site Dashboard.",
  },
  {
    slug: "release-notes/2026/08/php-82-83-84-85-security-updates",
    title: "PHP 8.2, 8.3, 8.4, and 8.5 security updates",
    publishedDate: "2026-08-15",
    categories: ["infrastructure"],
    text: "PHP versions have been updated to address several security vulnerabilities.",
  },
  {
    slug: "release-notes/2025/01/unrelated-note",
    title: "New invoice status tags",
    publishedDate: "2025-01-17",
    categories: [],
    text: "Invoices now show a status tag such as paid or overdue.",
  },
  {
    slug: "release-notes/2026/07/global-cdn-default",
    title: "New sites now provision on the next-generation Global CDN by default",
    publishedDate: "2026-07-01",
    categories: ["infrastructure"],
    text: "New sites are automatically provisioned on the next-generation Global CDN.",
  },
  {
    slug: "release-notes/2026/06/global-action-required",
    title: "Action required: migrate off the legacy Global load balancer",
    publishedDate: "2026-06-01",
    categories: ["action-required"],
    text: "Sites still on the legacy global load balancer must migrate before it is retired.",
  },
];

const renderWithCurrentPageItem = () =>
  render(
    <ReleaseNoteSearchProvider>
      <ReleaseNoteSearchInput />
      <ReleaseNoteSearchResults>
        <div data-testid="current-page-content">
          <h2>Improved dashboard performance</h2>
          <p>We shipped faster page loads across the Site Dashboard.</p>
        </div>
      </ReleaseNoteSearchResults>
    </ReleaseNoteSearchProvider>
  );

const getInput = () =>
  screen.getByPlaceholderText(
    "Search all release notes by keyword"
  ) as HTMLInputElement;

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.mockResponse(JSON.stringify(SEARCH_INDEX));
  mockSearchParams = new URLSearchParams();
});

describe("ReleaseNoteSearch", () => {
  it("lets the search input be positioned independently of the results it controls", () => {
    render(
      <ReleaseNoteSearchProvider>
        <ReleaseNoteSearchInput />
        <div data-testid="category-filter-placeholder">
          Filter by category
        </div>
        <ReleaseNoteSearchResults>
          <div data-testid="current-page-content" />
        </ReleaseNoteSearchResults>
      </ReleaseNoteSearchProvider>
    );

    const input = getInput();
    const categoryFilter = screen.getByTestId("category-filter-placeholder");
    // DOCUMENT_POSITION_FOLLOWING (4) means `categoryFilter` comes after
    // `input` in the DOM, i.e. the search box renders above it.
    expect(
      input.compareDocumentPosition(categoryFilter) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("renders the current page's content unchanged when there is no query", () => {
    renderWithCurrentPageItem();

    expect(screen.getByTestId("current-page-content")).toBeTruthy();
    expect(document.querySelector(".rn-search-results")).toBeNull();
  });

  it("finds release notes from other pages, not just the current page's content", async () => {
    renderWithCurrentPageItem();
    const input = getInput();

    fireEvent.change(input, { target: { value: "php" } });

    await waitFor(() => {
      const link = screen.getByRole("link", {
        name: /PHP 8\.2, 8\.3, 8\.4, and 8\.5 security updates/i,
      }) as HTMLAnchorElement;
      expect(link.getAttribute("href")).toBe(
        "/release-notes/2026/08/php-82-83-84-85-security-updates"
      );
    });

    // The current page's own server-rendered content is swapped out while
    // search results are showing.
    expect(screen.queryByTestId("current-page-content")).toBeNull();
  });

  it("only fetches the full search index once, lazily, on first use", async () => {
    renderWithCurrentPageItem();
    const input = getInput();

    expect(fetchMock).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: "php" } });
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    fireEvent.change(input, { target: { value: "invoice" } });
    await waitFor(() => {
      expect(
        screen.getByRole("link", { name: /New invoice status tags/i })
      ).toBeTruthy();
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("highlights the matched keyword in both the title and the snippet", async () => {
    renderWithCurrentPageItem();
    const input = getInput();

    fireEvent.change(input, { target: { value: "security" } });

    await waitFor(() => {
      const marks = Array.from(document.querySelectorAll("mark"));
      expect(marks.length).toBeGreaterThan(0);
      marks.forEach((mark) => {
        expect(mark.textContent?.toLowerCase()).toBe("security");
      });
    });
  });

  it("shows an empty state when no release note matches", async () => {
    renderWithCurrentPageItem();
    const input = getInput();

    fireEvent.change(input, { target: { value: "nonexistent-keyword" } });

    await waitFor(() => {
      expect(
        screen.getByText(/No release notes match/i)
      ).toBeTruthy();
    });
  });

  it("restores the current page's content when the search is cleared", async () => {
    renderWithCurrentPageItem();
    const input = getInput();

    fireEvent.change(input, { target: { value: "php" } });
    await waitFor(() => {
      expect(document.querySelector(".rn-search-results")).not.toBeNull();
    });

    fireEvent.change(input, { target: { value: "" } });

    await waitFor(() => {
      expect(screen.getByTestId("current-page-content")).toBeTruthy();
      expect(document.querySelector(".rn-search-results")).toBeNull();
    });
  });

  describe("when a category filter is also active", () => {
    it("excludes matches that don't carry the selected category", async () => {
      // Matches the reported bug: searching "global" with "Action required"
      // selected should not surface a "Global CDN" note that is only
      // tagged "infrastructure".
      mockSearchParams = new URLSearchParams("category=action-required");
      renderWithCurrentPageItem();
      const input = getInput();

      fireEvent.change(input, { target: { value: "global" } });

      await waitFor(() => {
        expect(
          screen.getByRole("link", {
            name: /Action required: migrate off the legacy Global load balancer/i,
          })
        ).toBeTruthy();
      });

      expect(
        screen.queryByRole("link", {
          name: /New sites now provision on the next-generation Global CDN by default/i,
        })
      ).toBeNull();
    });

    it("shows both matches when no category filter is active", async () => {
      renderWithCurrentPageItem();
      const input = getInput();

      fireEvent.change(input, { target: { value: "global" } });

      await waitFor(() => {
        expect(
          screen.getByRole("link", {
            name: /New sites now provision on the next-generation Global CDN by default/i,
          })
        ).toBeTruthy();
        expect(
          screen.getByRole("link", {
            name: /Action required: migrate off the legacy Global load balancer/i,
          })
        ).toBeTruthy();
      });
    });

    it("shows an empty state when the keyword matches nothing in the selected category", async () => {
      mockSearchParams = new URLSearchParams("category=action-required");
      renderWithCurrentPageItem();
      const input = getInput();

      fireEvent.change(input, { target: { value: "invoice" } });

      await waitFor(() => {
        expect(screen.getByText(/No release notes match/i)).toBeTruthy();
      });
    });
  });
});
