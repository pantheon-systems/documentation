import { processDirectoryForMarkDown } from "@/server/processor/mdx";

/**
 * Where an omni item shows up in the header menu. The omni list is the one place
 * that defines the site's navigation, so the header reads this instead of
 * keeping its own list.
 */
export type OmniHeader = {
  /**
   * "top" is a link in the menu bar, "guides" lists it in the Guides dropdown
   * (the default, so a new section appears with no extra work), "cli" turns the
   * item into the CLI dropdown, and "none" leaves it out.
   */
  menu?: "top" | "guides" | "cli" | "none";
  /** Heading to list the item under inside a dropdown. */
  group?: string;
  /** Menu label, when it should differ from the title. */
  label?: string;
};

export type OmniItem = {
  link: string;
  title: string;
  children?: OmniItem[];
  header?: OmniHeader;
};

export const simpleLink = (link: string, title = "", children: any[] = []) => {
  const returning = {
    link: link,
    title: title || link,
  };

  if (children.length > 0) {
    (returning as any).children = children;
  }
  return returning;
};

export const getGuideDirectory = (
  guideDirectory: string,
  overrideGuideTitle = ""
) => {
  const ChildItems: { link: string; title: string }[] = [];

  const guides = processDirectoryForMarkDown(
    "source/content/" + guideDirectory,
    {}
  );
  let guideTitle = "";

  guides.forEach((guide) => {
    ChildItems.push({
      link: guide.fields.slug,
      title: guide.frontmatter.navtitle || guide.frontmatter.subtitle || "",
    });

    if (guide.fields.slug === "/" + guideDirectory) {
      guideTitle = guide.frontmatter.title || "";
    }
  });

  return {
    link: ChildItems.length > 0 ? ChildItems[0].link : "/" + guideDirectory,
    // link: '/' + guideDirectory,
    // If there is an overrideGuideTitle, use that instead of the guideTitle
    title: overrideGuideTitle || guideTitle,
    children: ChildItems,
  };
};

const containsActiveLink = (item: any, activePage: string) => {
  if (item.link === "/" + activePage || item.link === activePage) {
    return true;
  } else if (item.children && item.children.length > 0) {
    for (let child of item.children) {
      if (containsActiveLink(child, activePage)) {
        return true;
      }
    }
  }
  return false;
};

export const getOmniSidebarActiveSection = (
  activePage: string,
  OmniItems: OmniItem[]
) => {
  if (OmniItems) {
    for (let item of OmniItems) {
      if (containsActiveLink(item, activePage)) {
        return item;
      }
    }
  }
  return undefined;
};

export const findSubMenuItemsToUse = function (
  topLevelParentPath: string,
  NestedItems: OmniItem[]
) {
  for (let item of NestedItems) {
    if (item.link === topLevelParentPath) {
      return item;
    }
  }
  return undefined;
};

export type OmniCrumb = { label: string; href: string };

const labelOf = (item: OmniItem) => item.header?.label ?? item.title;

// The chain of omni items from the top level down to the one for `activePage`.
// A group often shares its link with its first page (App Configuration and
// pantheon.yml), so take the deepest match: the breadcrumb then ends at the
// group, not above it.
const findOmniTrail = (
  activePage: string,
  items: OmniItem[],
  parents: OmniItem[] = []
): OmniItem[] | null => {
  let deepest: OmniItem[] | null = null;

  for (const item of items) {
    const here = [...parents, item];
    const found =
      item.children && item.children.length > 0
        ? findOmniTrail(activePage, item.children, here)
        : null;
    const candidate =
      found ??
      (item.link === activePage || item.link === "/" + activePage
        ? here
        : null);

    if (candidate && (!deepest || candidate.length > deepest.length)) {
      deepest = candidate;
    }
  }

  return deepest;
};

/**
 * The breadcrumb for a page, after "Docs home", following the PDS docs site
 * prototype: a section's own page ends with the section, and any other page
 * ends with its parent (the page's title is the heading right below). A page
 * that isn't in the omni list gets its section, when it has one, and then its
 * own title.
 */
export const getOmniBreadcrumbs = (
  activePage: string,
  items: OmniItem[],
  currentTitle?: string
): OmniCrumb[] => {
  const trail = findOmniTrail(activePage, items);

  if (trail) {
    const shown = trail.length === 1 ? trail : trail.slice(0, -1);
    return shown.map((item) => ({ label: labelOf(item), href: item.link }));
  }

  const section = getOmniSidebarActiveSection(activePage, items);
  const crumbs: OmniCrumb[] = section
    ? [{ label: labelOf(section), href: section.link }]
    : [];
  if (currentTitle) crumbs.push({ label: currentTitle, href: activePage });
  return crumbs;
};
