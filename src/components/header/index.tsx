import { getOmniItems } from "@/components/omni-components";
import { buildHeaderMenu } from "@/components/omni-components/header-menu";
import SiteHeader from "./site-header";

// The menu comes from the omni list, the same source as the sidebar, so a new
// section shows up here without editing the header.
export default async function Header() {
  const menu = buildHeaderMenu(await getOmniItems());

  return <SiteHeader menu={menu} />;
}
