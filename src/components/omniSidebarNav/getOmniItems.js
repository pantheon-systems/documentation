import CertificationItems from './submenus/certification';

import getStarted from './submenus/getStarted';
import goLive from './submenus/goLive';
import pagesToDelete from './submenus/pagesToDelete';
import unassignedPages from './submenus/unassignedPages';
import webInfrastructure from './submenus/webInfrastructure';
import accountManagement from './submenus/accountManagement';
import frontEndSites from './submenus/frontEndSites';
import terminus from './submenus/terminus';
import about from './submenus/about';
import workflows from './submenus/workflows';
import support from './submenus/support';
import security from './submenus/security';
// Before we can merge we need to: 
//Todo: Fix doc template (missing search bar)
//Todo: Fix video template (missing search bar)
//Todo: add sidebar to landing pages (end goal is to deleete them entirely)
//Todo: review reporting in console log 
//Todo: Update dropdown in main site nav 
//Todo: Finish tutorials submenu in certification
//Todo: audit troubleshooting submenu in support 
//Todo: Finish security submenu

/**
 * Retrieves the all the menu items for the sidebar navigation.
 * @returns {Array} An array of Omni items.
 */
const getOmniItems = () => {
  const OmniItems = [
    getStarted(), // assigned to Chris ✅
    workflows(), // ✅
    goLive(), // ✅
    webInfrastructure(), // ✅
    accountManagement(), // ✅
    terminus(), // ✅
    frontEndSites(), // ✅
    support(),
    security(),
    // @todo, should we have a separate tutorials section?
    {
      link: '/certification',
      title: 'WebOps Certification',
      children: CertificationItems,
    },
    about(), // assigned to Rachel ✅
    // Release notes

    pagesToDelete(),
    unassignedPages(),
  ];

  console.log('OmniItems: ', OmniItems);

  return OmniItems;
};

export default getOmniItems;
