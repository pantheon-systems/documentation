import { describe, it, expect } from "vitest";
import { buildSearchSections } from "@/lib/search-sections";
import type { OmniItem } from "@/components/omni-components/helpers";

const items: OmniItem[] = [
  { link: "/", title: "Docs Home", header: { menu: "none" } },
  {
    link: "/platform",
    title: "Web Infrastructure",
    header: { label: "Web infrastructure" },
    children: [
      {
        link: "/object-cache",
        title: "Caching and CDN",
        children: [{ link: "/object-cache/cli", title: "Use the Redis CLI" }],
      },
    ],
  },
  { link: "https://docs.p1.pantheon.io/", title: "P1" },
  { link: "/release-notes", title: "Release Notes" },
];

describe("buildSearchSections", () => {
  const map = buildSearchSections(items);

  it("maps a page to its section and its menu path", () => {
    expect(map["/object-cache"]).toEqual({
      section: "Web infrastructure",
      trail: ["Web infrastructure"],
    });
    expect(map["/object-cache/cli"]).toEqual({
      section: "Web infrastructure",
      trail: ["Web infrastructure", "Caching and CDN"],
    });
  });

  it("leaves out Docs Home, external links and release notes", () => {
    expect(map["/"]).toBeUndefined();
    expect(map["https://docs.p1.pantheon.io/"]).toBeUndefined();
    expect(map["/release-notes"]).toBeUndefined();
  });
});
