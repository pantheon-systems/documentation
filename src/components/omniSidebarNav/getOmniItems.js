import CertificationItems from './submenus/certification';
import { getGuideDirectory, simpleLink } from './helpers';

import getStarted from './submenus/getStarted';
import dnsProviders from './submenus/dnsProviders';
import pagesToDelete from './submenus/pagesToDelete';
import unassignedPages from './submenus/unassignedPages';
import migrateAndUpgrade from './submenus/migrateAndUpgrade';
import drupal from './submenus/drupal';
import wordpress from './submenus/wordpress';
import webInfrastructure from './submenus/webInfrastructure';
import accountManagement from './submenus/accountManagement';
import integrations from './submenus/integrations';
import frontEndSites from './submenus/frontEndSites';
import terminus from './submenus/terminus';

/**
 * Retrieves the all the menu items for the sidebar navigation.
 * @returns {Array} An array of Omni items.
 */
const getOmniItems = () => {
  const OmniItems = [
   // about docs
   // /contribute

    pagesToDelete(),
    unassignedPages(),
    getStarted(),
    wordpress(),
    drupal(),
    dnsProviders(),
    migrateAndUpgrade(),
    webInfrastructure(),
    accountManagement(),
    integrations(),
    frontEndSites(),
    terminus(),

    {
      link: '/certification',
      title: 'WebOps Certification',
      children: CertificationItems,
    },
  ];
  return OmniItems;
};

export default getOmniItems;
