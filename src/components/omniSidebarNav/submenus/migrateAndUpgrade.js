import { getGuideDirectory, simpleLink } from './../helpers';

const migrateAndUpgrade = () => {
  return {
    link: '/guides/guided',
    title: 'Migrating Sites to Pantheon',
    children: [
      getGuideDirectory('guides/migrate/guided', 'Guided Migration'),
      simpleLink('/migrate-manual', 'Manual Migration'),
      simpleLink('/migrate-wordpress-multisite', 'WordPress Multisite'),
      getGuideDirectory('guides/migrate/kinsta', 'Kinsta'),
      getGuideDirectory('guides/migrate/pagely', 'Pagely'),
      getGuideDirectory('guides/migrate/wordpressvip', 'WordPress VIP'),
      getGuideDirectory('guides/migrate/wpengine', 'WP Engine'),
      /// I would have guessed that the Platform.sh docs would be about Drupal, not WordPress.
      getGuideDirectory('guides/migrate/platformsh', 'Platform.sh'),
      getGuideDirectory('guides/migrate/acquia', 'Acquia'),
      simpleLink('/migrate-cpanel', 'GoDaddy CPanel'),
    ],
  };
};

export default migrateAndUpgrade;
