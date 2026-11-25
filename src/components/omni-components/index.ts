import getStarted from "./get-started";
import { OmniHeader, OmniItem, simpleLink } from "./helpers";
import workflows from "./workflows";
import goLive from "./go-live";
import webInfrastructure from "./web-infrastructure";
import accountManagement from "./account-management";
import terminus from "./terminus";
import support from "./support";
import security from "./security";
import learning from "./learning";
import about from "./about";

// The one list of the site's sections. The sidebar reads it, and so does the
// header menu: `header` says where an item shows up there. An item with no
// `header` is listed under Guides, so a new section is in the menu as soon as it
// is added here.
const withHeader = (item: OmniItem, header: OmniHeader): OmniItem => ({
  ...item,
  header,
});

export const getOmniItems = async (): Promise<OmniItem[]> => {
  const OmniItems: OmniItem[] = [
    // The logo links home, so Docs Home stays out of the menu.
    withHeader(simpleLink("/", "Docs Home"), { menu: "none" }),
    withHeader(getStarted(), { menu: "top" }),
    withHeader(workflows(), { group: "Build" }),
    withHeader(goLive(), { group: "Build" }),
    withHeader(webInfrastructure(), { group: "Run" }),
    withHeader(accountManagement(), { group: "Run" }),
    withHeader(simpleLink("https://docs.p1.pantheon.io/", "P1"), {
      group: "Build",
    }),
    withHeader(
      simpleLink("https://docs.content.pantheon.io/", "Content Publisher"),
      { group: "Build" }
    ),
    // The pages listed in the CLI menu are marked in terminus.ts.
    withHeader(terminus(), { menu: "cli", label: "CLI" }),
    withHeader(support(), { group: "Run" }),
    withHeader(security(), { group: "Run" }),
    withHeader(learning(), { group: "Learn" }),
    withHeader(about(), { group: "Learn" }),
    withHeader(simpleLink("/release-notes", "Release Notes"), { menu: "top" }),
    // pagesToDelete(),
  ];
  return OmniItems;
};
