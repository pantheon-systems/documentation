import getStarted from "./get-started";
import { OmniItem, simpleLink } from "./helpers";
import workflows from "./workflows";
import goLive from "./go-live";
import webInfrastructure from "./web-infrastructure";
import accountManagement from "./account-management";
import terminus from "./terminus";
import support from "./support";
import security from "./security";
import learning from "./learning";
import about from "./about";

export const getOmniItems = async (): Promise<OmniItem[]> => {
  const OmniItems = [
    simpleLink("/", "Docs Home"),
    getStarted(),
    workflows(),
    goLive(),
    webInfrastructure(),
    accountManagement(),
    simpleLink("https://docs.content.pantheon.io/", "Content Publisher"),
    terminus(),
    support(),
    security(),
    learning(),
    about(),
    simpleLink("/release-notes", "Release Notes"),
    // pagesToDelete(),
  ];
  return OmniItems;
};
