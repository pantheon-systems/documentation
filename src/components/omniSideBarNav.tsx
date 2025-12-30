"use server";
import {
  findSubMenuItemsToUse,
  getOmniSidebarActiveSection,
} from "./omni-components/helpers";

import { SideNavCompact } from "./ui/pds-re-export";
import { MOBILE_MENU_BREAKPOINT } from "@/constants";
import { getOmniItems } from "./omni-components";
import { turnItemsIntoLinks } from "./omni-components/client-helper";

export const OmniSidebarNav = async ({
  activePage,
  submenuPathToUse = "",
}: {
  activePage: string;
  submenuPathToUse?: string;
}) => {
  const OmniItems = await getOmniItems();

  /* Reporting debug code
  const flattenedOmniItems = flattenOmniItems(OmniItems);
  const results = CalculateFilteredPathsInMenu(
    filteredWrittenPaths,
    flattenedOmniItems,
);
  console.log(results);
  */

  const menuItems = getOmniSidebarActiveSection(activePage, OmniItems);

  // If the caller is asking for a specific submenu, use that directly.
  if (submenuPathToUse.length > 0) {
    const submenuItems = findSubMenuItemsToUse(submenuPathToUse, OmniItems);
    if (!submenuItems) {
      return null;
    }
    const submenuLinks = turnItemsIntoLinks(submenuItems, activePage);
    return (
      <SideNavCompact
        mobileMenuMaxWidth={MOBILE_MENU_BREAKPOINT}
        className="sidenav-compact"
        ariaLabel={submenuLinks.linkContent}
        headingText={submenuLinks.linkContent}
        menuItems={submenuLinks.links}
      />
    );
  } else if (menuItems) {
    const OmniLinks = turnItemsIntoLinks(menuItems, activePage);
    return (
      <SideNavCompact
        mobileMenuMaxWidth={MOBILE_MENU_BREAKPOINT}
        className="sidenav-compact"
        ariaLabel={OmniLinks.linkContent}
        headingText={OmniLinks.linkContent}
        menuItems={OmniLinks.links}
      />
    );
  } else {
    return <div></div>;
  }
};
