import CertificationItems from './submenus/certification';

import getStarted from './submenus/getStarted';
import goLive from './submenus/goLive';
import pagesToDelete from './submenus/pagesToDelete';
import unassignedPages from './submenus/unassignedPages';
import webInfrastructure from './submenus/webInfrastructure';
import accountManagement from './submenus/accountManagement';

import terminus from './submenus/terminus';
import about from './submenus/about';
import workflows from './submenus/workflows';
import support from './submenus/support';
import security from './submenus/security';
import { simpleLink } from './helpers';

// Before we can merge we need to:
// Todo: review reporting in console log - Assigned to Steve to investigate
// Todo: Review pages that are reported as unassigned
// Todo: remove console logging from this component.
// Todo, add search bar back to landing pages

/**
 * Retrieves the all the menu items for the sidebar navigation.
 * @returns {Array} An array of Omni items.
 */
const getOmniItems = () => {
  const OmniItems = [
    simpleLink('/', 'Docs Home'),
    getStarted(), // assigned to Chris ✅
    workflows(), // ✅
    goLive(), // ✅
    webInfrastructure(), // ✅
    accountManagement(), // ✅
    terminus(), // ✅
    support(), // ✅
    security(), // ✅
    // @todo, should we have a separate tutorials section?

    CertificationItems(),  // ✅
    about(), // assigned to Rachel ✅
    // Release notes
    simpleLink('/release-notes', 'Release Notes'),
    pagesToDelete(),
    unassignedPages(),
  ];

  console.log('OmniItems: ', OmniItems);

  return OmniItems;
};

export default getOmniItems;
