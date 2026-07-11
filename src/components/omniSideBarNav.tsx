"use server";
import { getOmniSidebarActiveSection } from "./omni-components/helpers";

import { SideNavCompact } from "./ui/pds-re-export";
import { MOBILE_MENU_BREAKPOINT } from "@/constants";
import { getOmniItems } from "./omni-components";
import { turnItemsIntoLinks } from "./omni-components/client-helper";

export const OmniSidebarNav = async ({
  activePage,
}: {
  activePage: string;
}) => {
  const OmniItems = await getOmniItems();

  const menuItems = getOmniSidebarActiveSection(activePage, OmniItems);

  if (menuItems) {
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
