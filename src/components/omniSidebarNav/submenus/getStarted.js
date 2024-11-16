import { getGuideDirectory, simpleLink } from './../helpers';

const getStarted = () => {
  return {
    // @todo, implement sidebar on landing pages.
    link: '/guides/getstarted',
    title: 'Get Started',
    children: [
      getGuideDirectory('guides/getstarted'),
      // This page is kind of a landing page? Should it be in this menu?

      simpleLink('/required-reading', 'Required Reading'),
      getGuideDirectory('guides/platform-considerations'),
      simpleLink('/guides/guided', 'Migrating Sites to Pantheon', [
        getGuideDirectory('guides/migrate/guided', 'Guided Migration'),
        simpleLink('/migrate-manual', 'Manual Migration'),
        simpleLink('/migrate-wordpress-multisite', 'WordPress Multisite'),
        simpleLink('/unwind-drupal-multisite'),
        getGuideDirectory('guides/migrate/kinsta', 'Kinsta'),
        getGuideDirectory('guides/migrate/pagely', 'Pagely'),
        getGuideDirectory('guides/migrate/wordpressvip', 'WordPress VIP'),
        getGuideDirectory('guides/migrate/wpengine', 'WP Engine'),
        /// I would have guessed that the Platform.sh docs would be about Drupal, not WordPress.
        getGuideDirectory('guides/migrate/platformsh', 'Platform.sh'),
        getGuideDirectory('guides/migrate/acquia', 'Acquia'),
        simpleLink('/migrate-cpanel', 'GoDaddy CPanel'),
        getGuideDirectory(
          'guides/drupal/drupal-unhosted-composer',
          'Composer-based Drupal sites',
        ),
      ]),




      simpleLink('/dashboard', 'Dashboard', [
        simpleLink('/site-dashboard', 'Site Dashboard'),
        simpleLink('/personal-settings', 'Personal Settings'),
        simpleLink(
          '/add-site-custom-upstream',
          'Adding a Site with a Custom Upstream',
        ),
      ]),
    ],
  };
};

export default getStarted;
