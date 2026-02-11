import { processDirectoryForMarkDown } from "@/server/processor/mdx";

export type OmniItem = {
  link: string;
  title: string;
  children?: OmniItem[];
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
