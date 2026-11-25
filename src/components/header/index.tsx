import { getOmniItems } from "@/components/omni-components";
import { getOmniSidebarActiveSection } from "@/components/omni-components/helpers";
import { buildHeaderMenu } from "@/components/omni-components/header-menu";
import SiteHeader from "./site-header";

// The menu comes from the omni list, the same source as the sidebar, so a new
// section shows up here without editing the header. `activePage` is the page's
// path; the menu item of the section it belongs to is marked as the active trail.
export default async function Header({ activePage }: { activePage?: string }) {
  const items = await getOmniItems();
  const menu = buildHeaderMenu(items);
  const activeHref = activePage
    ? getOmniSidebarActiveSection(activePage, items)?.link
    : undefined;

  return <SiteHeader menu={menu} activeHref={activeHref} />;
}
