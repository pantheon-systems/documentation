import { describe, it, expect } from "vitest";
import {
  cleanHighlight,
  slugify,
  toHit,
} from "@/components/search/search-provider";

const sections = {
  "/object-cache/cli": {
    section: "Web infrastructure",
    trail: ["Web infrastructure", "Caching and CDN"],
  },
};

describe("slugify", () => {
  it("makes a section label safe for a URL", () => {
    expect(slugify("Support and troubleshooting")).toBe(
      "support-and-troubleshooting"
    );
    expect(slugify("Command line interface (CLI)")).toBe(
      "command-line-interface-cli"
    );
  });
});

describe("cleanHighlight", () => {
  it("drops the title, site name and search box label AddSearch puts first", () => {
    expect(
      cleanHighlight(
        "Use the <em>Redis</em> CLI | Pantheon Docs Search Pantheon Documentation connect to the <em>Redis</em> server",
        "Use the Redis CLI"
      )
    ).toBe("connect to the <em>Redis</em> server");
  });
});

describe("toHit", () => {
  const base = {
    id: "1",
    title: "Use the Redis CLI",
    highlight: "x <em>y</em>",
  };

  it("turns a docs URL into an internal link with its section and path", () => {
    const hit = toHit(
      { ...base, url: "https://docs.pantheon.io/object-cache/cli" },
      sections
    );
    expect(hit).toMatchObject({
      href: "/object-cache/cli",
      isInternal: true,
      isReleaseNote: false,
      section: "Web infrastructure",
      trail: ["Web infrastructure", "Caching and CDN"],
    });
  });

  it("treats release notes as their own content with no section", () => {
    const hit = toHit(
      { ...base, url: "https://docs.pantheon.io/release-notes/2019/05/x" },
      sections
    );
    expect(hit.isReleaseNote).toBe(true);
    expect(hit.section).toBeNull();
  });

  it("keeps the P1 docs as an external link in the P1 section", () => {
    const hit = toHit(
      { ...base, url: "https://docs.p1.pantheon.io/guide" },
      sections
    );
    expect(hit).toMatchObject({
      isInternal: false,
      href: "https://docs.p1.pantheon.io/guide",
      section: "P1",
    });
  });
});
