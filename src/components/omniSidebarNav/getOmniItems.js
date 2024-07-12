import CertificationItems from './submenus/certification';
import { getGuideDirectory } from './helpers';

/**
 * Retrieves the all the menu items for the sidebar navigation.
 * @returns {Array} An array of Omni items.
 */
const getOmniItems = () => {
  const OmniItems = [
   // about docs
   // /contribute

// site serving infrastructure
// /guides/filesystem
// /guides/global-cdn
// /guides/php





  // Extending Pantheon
  // /guides/quicksilver
    // /guides/build-tools
    // /guides/terminus
    // /guides/wp-cli


// DNS providers  dns-providers
// 1-and-1

    {
      link: '/platform',
      title: 'Ops Platform',
      children: [
        getGuideDirectory('guides/php'),
        getGuideDirectory('guides/filesystem'),

      ],
    },


    {
      link: '/develop',
      title: 'Development workflows',
      children: [
        getGuideDirectory('guides/git'),
        getGuideDirectory('guides/multidev'),
        getGuideDirectory('guides/new-relic'),
        getGuideDirectory('guides/sftp'),
        getGuideDirectory('guides/wp-cli'),
      ],
    },

    {
      link: '/guides/decoupled',
      title: 'Front-End Sites and Starter Kits',
      children: [
        getGuideDirectory('guides/decoupled/overview'),
        getGuideDirectory('guides/decoupled/wp-nextjs-frontend-starters'),
        getGuideDirectory('guides/decoupled/wp-backend-starters'),
        getGuideDirectory('guides/decoupled/wp-gatsby-frontend-starters'),
        getGuideDirectory('guides/decoupled/drupal-backend-starters'),
        getGuideDirectory('guides/decoupled/drupal-nextjs-frontend-starters'),
        getGuideDirectory('guides/decoupled/no-starter-kit'),
      ],
    },
    {
      link: '/certification',
      title: 'WebOps Certification',
      children: CertificationItems,
    },
  ];

  return OmniItems;
};

export default getOmniItems;
