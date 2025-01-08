import getStarted from './submenus/getStarted';
import goLive from './submenus/goLive';
import webInfrastructure from './submenus/webInfrastructure';
import accountManagement from './submenus/accountManagement';
import terminus from './submenus/terminus';
import about from './submenus/about';
import workflows from './submenus/workflows';
import support from './submenus/support';
import security from './submenus/security';
import { simpleLink } from './helpers';
import learning from './submenus/learning';

// Before we can merge we need to:
// Todo: remove console logging from this component.
// todo, delete pagesToDelete()

/**
 * Retrieves the all the menu items for the sidebar navigation.
 * @returns {Array} An array of Omni items.
 */
const getOmniItems = () => {
  const OmniItems = [
    simpleLink('/', 'Docs Home'),
    getStarted(),
    workflows(),
    goLive(),
    webInfrastructure(),
    accountManagement(),
    terminus(),
    support(),
    security(),
    learning(),
    about(),
    simpleLink('/release-notes', 'Release Notes'),
    // pagesToDelete(),
  ];
  return OmniItems;
};

export default getOmniItems;
