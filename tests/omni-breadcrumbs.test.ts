import { describe, it, expect } from "vitest";
import {
  getOmniBreadcrumbs,
  type OmniItem,
} from "@/components/omni-components/helpers";

const items: OmniItem[] = [
  {
    link: "/platform",
    title: "Web Infrastructure",
    header: { label: "Web infrastructure" },
    children: [
      {
        link: "/guides/app-containers",
        title: "Application Containers",
        children: [
          // A group that shares its link with its first page.
          {
            link: "/pantheon-yml",
            title: "App Configuration",
            children: [{ link: "/pantheon-yml", title: "pantheon.yml" }],
          },
        ],
      },
    ],
  },
  {
    link: "/develop",
    title: "Development Workflows",
    header: { label: "Development workflows" },
  },
];

describe("getOmniBreadcrumbs", () => {
  it("ends at the page's parent, using the group when it shares the page's link", () => {
    expect(getOmniBreadcrumbs("/pantheon-yml", items)).toEqual([
      { label: "Web infrastructure", href: "/platform" },
      { label: "Application Containers", href: "/guides/app-containers" },
      { label: "App Configuration", href: "/pantheon-yml" },
    ]);
  });

  it("accepts a path without the leading slash", () => {
    expect(getOmniBreadcrumbs("pantheon-yml", items)).toHaveLength(3);
  });

  it("ends a section's own page with the section, by its menu label", () => {
    expect(getOmniBreadcrumbs("/develop", items)).toEqual([
      { label: "Development workflows", href: "/develop", isCurrent: true },
    ]);
  });

  it("gives a page outside the list its title, after its section when it has one", () => {
    expect(getOmniBreadcrumbs("/glossary", items, "Glossary")).toEqual([
      { label: "Glossary", href: "/glossary", isCurrent: true },
    ]);
  });

  it("has no crumbs for an unknown page without a title", () => {
    expect(getOmniBreadcrumbs("/nowhere", items)).toEqual([]);
  });
});
