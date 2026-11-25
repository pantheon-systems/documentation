import type { OmniItem } from "./helpers";

export type HeaderMenuLink = { label: string; href: string };
export type HeaderMenuGroup = { heading?: string; links: HeaderMenuLink[] };
export type HeaderMenuEntry =
  | ({ type: "link" } & HeaderMenuLink)
  | { type: "dropdown"; label: string; groups: HeaderMenuGroup[] };

const GUIDES_LABEL = "Guides";
// Heading for guides that name no group, so a new section is never dropped.
const UNGROUPED_HEADING = "More";

type Grouped = { group?: string; link: HeaderMenuLink };

const toLink = (item: OmniItem): HeaderMenuLink => ({
  label: item.header?.label ?? item.title,
  href: item.link,
});

// Group in the order each heading first appears, with ungrouped links last.
const toGroups = (entries: Grouped[]): HeaderMenuGroup[] => {
  const named = new Map<string, HeaderMenuLink[]>();
  const ungrouped: HeaderMenuLink[] = [];

  for (const { group, link } of entries) {
    if (!group) {
      ungrouped.push(link);
    } else {
      named.set(group, [...(named.get(group) ?? []), link]);
    }
  }

  const groups: HeaderMenuGroup[] = Array.from(named).map(
    ([heading, links]) => ({
      heading,
      links,
    })
  );

  if (ungrouped.length > 0) {
    groups.push({
      heading: groups.length > 0 ? UNGROUPED_HEADING : undefined,
      links: ungrouped,
    });
  }

  return groups;
};

// Pick out the descendants that name a group, in tree order. A dropdown such as
// CLI lists chosen pages from deep in a section, not the whole tree.
const collectGrouped = (item: OmniItem, out: Grouped[] = []): Grouped[] => {
  for (const child of item.children ?? []) {
    if (child.link && child.header?.group) {
      out.push({ group: child.header.group, link: toLink(child) });
    }
    collectGrouped(child, out);
  }
  return out;
};

/**
 * Build the header menu from the omni items, in omni order. The Guides dropdown
 * sits where its first item is, and a section that sets no header options is
 * listed under Guides, so adding a section to the omni list is enough to get it
 * into the menu.
 */
export const buildHeaderMenu = (items: OmniItem[]): HeaderMenuEntry[] => {
  const entries: HeaderMenuEntry[] = [];
  const guides: Grouped[] = [];
  let guidesIndex = -1;

  for (const item of items) {
    const menu = item.header?.menu ?? "guides";
    if (menu === "none" || !item.link) continue;

    if (menu === "top") {
      entries.push({ type: "link", ...toLink(item) });
    } else if (menu === "cli") {
      entries.push({
        type: "dropdown",
        label: item.header?.label ?? item.title,
        groups: toGroups(collectGrouped(item)),
      });
    } else {
      if (guidesIndex < 0) {
        guidesIndex = entries.length;
        entries.push({ type: "dropdown", label: GUIDES_LABEL, groups: [] });
      }
      guides.push({ group: item.header?.group, link: toLink(item) });
    }
  }

  if (guidesIndex >= 0) {
    entries[guidesIndex] = {
      type: "dropdown",
      label: GUIDES_LABEL,
      groups: toGroups(guides),
    };
  }

  return entries;
};
