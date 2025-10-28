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
    simpleLink('https://docs.content.pantheon.io', 'Content Publisher'),
    support(),
    security(),
    learning(),
    about(),
    simpleLink('/release-notes', 'Release Notes'),

    simpleLink('/nextjs', 'Next.js', [
      simpleLink('/nextjs', 'Next.js Overview'),
      simpleLink('/nextjs/architecture', 'Architecture'),
      simpleLink('/nextjs/hello-world-tutorial', 'Tutorial: Hello World'),
      simpleLink(
        '/nextjs/content-publisher-tutorial',
        'Tutorial: Content Publisher',
      ),
      simpleLink('/nextjs/multidev', 'Multidev environments'),
      simpleLink('/nextjs/environment-variables', 'Environment Variables'),
      simpleLink('/nextjs/cli-tools', 'CLI Tools'),
      simpleLink(
        '/nextjs/migrating-from-front-end-sites',
        'Migrating from Front-End Sites',
      ),
      simpleLink('/nextjs/test-and-live-env', 'Test and Live Environments'),
      simpleLink(
        '/nextjs/connecting-custom-domain-name',
        'Connecting a Custom Domain Name',
      ),
      simpleLink('/nextjs/request-access', 'Private Alpha Program'),
    ]),

    // pagesToDelete(),
  ];
  return OmniItems;
};

export default getOmniItems;
