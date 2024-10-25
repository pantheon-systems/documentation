import CertificationItems from './submenus/certification';

import getStarted from './submenus/getStarted';
import goLive from './submenus/goLive';
import pagesToDelete from './submenus/pagesToDelete';
import unassignedPages from './submenus/unassignedPages';
import migrateAndUpgrade from './submenus/migrateAndUpgrade';
import drupal from './submenus/drupal';
import wordpress from './submenus/wordpress';
import webInfrastructure from './submenus/webInfrastructure';
import accountManagement from './submenus/accountManagement';
import frontEndSites from './submenus/frontEndSites';
import terminus from './submenus/terminus';
import about from './submenus/about';
import workflows from './submenus/workflows';

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
    getStarted(), // assigned to Chris ✅
    workflows(),
    goLive(),
    wordpress(), // assigned to Chris ✅
    drupal(), // Assigned to Steve

    migrateAndUpgrade(), // todo, move under "Get Started"
    webInfrastructure(),
    accountManagement(),
    frontEndSites(), // ✅
    terminus(), // ✅
    about(), // assigned to Rachel ✅

    // @todo, should we have a separate tutorials section?
    {
      link: '/certification',
      title: 'WebOps Certification',
      children: CertificationItems, // ✅
    },
  ];

  // Existing top level nav items

  // Get Started  --- Keep
  // Develop  -- Rename to "Development Workflows"
  // Go Live    ---Keep
  // Explore Platform Architecture --- "Rename to Web Infrastructure"
  // Automate and Integrate   --- Currently just "Integrations"
  // Optimize Performance --- We'll remove this menu item. Much of the info here will go in Troubleshoot or Web Infra
  // Manage Teams & Organizations  --  "Acount Management"
  // Troubleshoot  --> rename to "Support and Troubleshooting"
  // Release Notes --> Keep
  // Glossary  --> Removing. This page is under "about"
  // Certification --- Keep
  // Terminus --- Keep

  // Stuff in the top level of this "Omni menu" but isn't in the existing top level
  // Drupal  -- Adding
  // WordPress -- Adding
  // Migrate and Upgrade --- Moving under "Get Started"
  // Front end Sites --- We're moving

  // New Order
  //
  // Get Started
  // Development Workflows
  // Go Live
  // Web Infrastructure
  // Account Management
  // Command Line Interface
  // WordPress
  // Drupal
  // Front End Sites   // Move under "Web Infrastructure" ?
  // Integrations
  // Support and Troubleshooting
  // Certification
  // About Our Docs
  // Release Notes

  console.log('OmniItems: ', OmniItems);

  return OmniItems;
};

export default getOmniItems;
