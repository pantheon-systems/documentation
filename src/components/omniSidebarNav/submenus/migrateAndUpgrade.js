import { getGuideDirectory, simpleLink } from './../helpers';

const migrateAndUpgrade = () => {
  return {
    link: '/asdf',
    title: 'Migrating and upgrading',
    children: [
      {
        link: '/migrate-wordpress',
        title: 'Migrating WordPress Sites',
        children: [
          getGuideDirectory('guides/migrate/kinsta', 'Kinsta'),
          getGuideDirectory('guides/migrate/pagely', 'Pagely'),
          getGuideDirectory('guides/migrate/wordpressvip', 'WordPress VIP'),
          getGuideDirectory('guides/migrate/wpengine', 'WP Engine'),
        ],
      },

      getGuideDirectory('guides/migrate/acquia', 'Acquia'),

      getGuideDirectory('guides/migrate/guided', 'Guided Migration'),
      getGuideDirectory('guides/migrate/manual-d8-composer-to-d8', 'Manual d8 to d8'),
      getGuideDirectory('guides/migrate/platformsh', 'Platform.sh'),


      simpleLink('/migrate-cpanel'),
      simpleLink('/migrate-manual'),
      simpleLink('/migrate-wordpress-multisite'),


      simpleLink('/drupal-to-build-tools'),


      // Needs a title override
      getGuideDirectory('guides/drupal/drupal-hosted-createcustom', 'drupal-hosted-createcustom'),

      // needs a title override
      getGuideDirectory('guides/drupal/drupal-hosted-btworkflow', 'drupal-hosted-btworkflow'),

      getGuideDirectory('guides/drupal/drupal-hosted-createbt', 'drupal-hosted-createbt'),

      getGuideDirectory('guides/drupal/drupal-hosted-createdashboard-set8', 'drupal-hosted-createdashboard-set8'),
      getGuideDirectory('guides/drupal/drupal-hosted-createempty-md', 'drupal-hosted-createempty-md'),
      getGuideDirectory('guides/drupal/drupal-hosted-md', 'drupal-hosted-md'),
      getGuideDirectory('guides/drupal/drupal-unhosted', 'unhosted???'),
      getGuideDirectory('guides/drupal/drupal-unhosted-composer', 'unhosted-composer'),
      getGuideDirectory('guides/drupal/drupal-hosted', 'drupal-hosted'),

      simpleLink('/switch-drupal-recommended-upstream'),
      simpleLink('/upgrade-drupal-with-ic-to-latest'),



    ],
  }


};

export default migrateAndUpgrade;
