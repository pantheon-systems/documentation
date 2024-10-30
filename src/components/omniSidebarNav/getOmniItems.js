import CertificationItems from './submenus/certification';

import getStarted from './submenus/getStarted';
import goLive from './submenus/goLive';
import pagesToDelete from './submenus/pagesToDelete';
import unassignedPages from './submenus/unassignedPages';
import drupal from './submenus/drupal';
import wordpress from './submenus/wordpress';
import webInfrastructure from './submenus/webInfrastructure';
import accountManagement from './submenus/accountManagement';
import frontEndSites from './submenus/frontEndSites';
import terminus from './submenus/terminus';
import about from './submenus/about';
import workflows from './submenus/workflows';
import support from './submenus/support';

/**
 * Retrieves the all the menu items for the sidebar navigation.
 * @returns {Array} An array of Omni items.
 */
const getOmniItems = () => {
  const OmniItems = [
    getStarted(), // assigned to Chris ✅
    workflows(),
    goLive(),
    webInfrastructure(),
    accountManagement(), // ✅
    terminus(), // ✅
    wordpress(), // assigned to Chris ✅
    drupal(), // Assigned to Steve
    frontEndSites(), // ✅
    support(), // ✅
    // @todo, should we have a separate tutorials section?
    {
      link: '/certification',
      title: 'WebOps Certification',
      children: CertificationItems, // ✅
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
