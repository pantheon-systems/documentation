import {
  getOmniBreadcrumbs,
  type OmniItem,
} from "@/components/omni-components/helpers";

export type SearchSection = {
  /** The top-level menu section the page belongs to, e.g. "Web infrastructure". */
  section: string;
  /** The menu path to the page, shown above a search result. */
  trail: string[];
};

// Release notes and the tracker are searched as their own kind of content, not
// as part of a documentation section.
const isOwnContent = (link: string) =>
  link.startsWith("/release-notes") ||
  link.startsWith("/vulnerability-tracker");

const normalize = (path: string) =>
  path.length > 1 ? path.replace(/\/$/, "") : path;

/**
 * Maps each page in the omni list to its section and menu path, for the search
 * results page: its Section filter, and the path above each result. The omni
 * list is the one place the site's structure is defined, so this follows it.
 */
export const buildSearchSections = (
  items: OmniItem[]
): Record<string, SearchSection> => {
  const sections: Record<string, SearchSection> = {};

  const visit = (list: OmniItem[], top?: OmniItem) => {
    for (const item of list) {
      const section = top ?? item;
      const link = item.link ?? "";
      const isInternal = link.startsWith("/") && !isOwnContent(link);
      const path = normalize(link);

      if (
        isInternal &&
        !(path in sections) &&
        section.header?.menu !== "none"
      ) {
        const crumbs = getOmniBreadcrumbs(link, items);
        if (crumbs.length > 0) {
          sections[path] = {
            section: crumbs[0].label,
            trail: crumbs.map((crumb) => crumb.label),
          };
        }
      }

      if (item.children?.length) visit(item.children, section);
    }
  };

  visit(items);
  return sections;
};
