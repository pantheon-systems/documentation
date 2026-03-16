import { getOmniSidebarActiveSection, OmniItem } from "./omni-components/helpers";
import { getOmniItems } from "./omni-components";
import { SideNavClient, NavItemData } from "./omni-components/SideNavClient";

// Convert OmniItem to plain NavItemData (no React elements)
const convertToNavData = (item: OmniItem, activePage: string): NavItemData => {
  return {
    link: item.link,
    title: item.title,
    isActive: item.link === activePage || item.link === "/" + activePage,
    children: item.children && item.children.length > 0
      ? item.children
          .filter((child) => child && child.link)
          .map((child) => convertToNavData(child, activePage))
      : undefined,
  };
};

export const OmniSidebarNav = async ({
  activePage,
}: {
  activePage: string;
}) => {
  const OmniItems = await getOmniItems();
  const menuItems = getOmniSidebarActiveSection(activePage, OmniItems);

  if (menuItems) {
    const navData = convertToNavData(menuItems, activePage);
    return (
      <SideNavClient
        headingText={navData.title}
        menuItemsData={navData.children || []}
      />
    );
  } else {
    return <div></div>;
  }
};
