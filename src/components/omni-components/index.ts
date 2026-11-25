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

// Menu labels are sentence case to match the PDS docs site prototype; the
// sidebar keeps the longer titles. The order here is the order in the menu.
export const getOmniItems = async (): Promise<OmniItem[]> => {
  const OmniItems: OmniItem[] = [
    // The logo links home, so Docs Home stays out of the menu.
    withHeader(simpleLink("/", "Docs Home"), { menu: "none" }),
    withHeader(getStarted(), { menu: "top", label: "Get started" }),
    withHeader(workflows(), { group: "Build", label: "Development workflows" }),
    withHeader(goLive(), { group: "Build", label: "Going live" }),
    withHeader(
      simpleLink("https://docs.content.pantheon.io/", "Content Publisher"),
      { group: "Build" }
    ),
    withHeader(simpleLink("https://docs.p1.pantheon.io/", "P1"), {
      group: "Build",
    }),
    withHeader(webInfrastructure(), {
      group: "Run",
      label: "Web infrastructure",
    }),
    withHeader(accountManagement(), {
      group: "Run",
      label: "Manage accounts and workspaces",
    }),
    withHeader(security(), { group: "Run" }),
    withHeader(simpleLink("/vulnerability-tracker", "Vulnerability Tracker"), {
      group: "Run",
      label: "Vulnerability tracker",
    }),
    withHeader(support(), {
      group: "Run",
      label: "Support and troubleshooting",
    }),
    withHeader(learning(), {
      group: "Learn",
      label: "Learning and certification",
    }),
    withHeader(about(), { group: "Learn", label: "About our docs" }),
    // The pages listed in the CLI menu are marked in terminus.ts.
    withHeader(terminus(), { menu: "cli", label: "CLI" }),
    withHeader(simpleLink("/release-notes", "Release Notes"), {
      menu: "top",
      label: "Release notes",
    }),
    // pagesToDelete(),
  ];
  return OmniItems;
};
