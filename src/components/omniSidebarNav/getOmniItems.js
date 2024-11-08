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
//Todo: Fix doc template (missing search bar)
//Todo: Fix video template (missing search bar)
//Todo: add sidebar to landing pages (end goal is to delete them entirely)
//Todo: review reporting in console log
//Todo: Finish security submenu

// Review things Steve did alone.
//Todo: Finish tutorials submenu in certification
//Todo: Update dropdown in main site nav
//Todo: Confirm move of Front-End Sites under web infrastructure
//Todo: Decide if search should be in the sidebar. In the "about" section maybe?
//Todo: audit troubleshooting submenu in support
// Todo: reconcile this branch with https://github.com/pantheon-systems/documentation/pull/9296

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
    support(),
    security(),
    // @todo, should we have a separate tutorials section?

    CertificationItems(),
    about(), // assigned to Rachel ✅
    // Release notes
    simpleLink('/Release Notes', 'Release Notes'),
    pagesToDelete(),
    unassignedPages(),
  ];

  console.log('OmniItems: ', OmniItems);

  return OmniItems;
};

export default getOmniItems;
