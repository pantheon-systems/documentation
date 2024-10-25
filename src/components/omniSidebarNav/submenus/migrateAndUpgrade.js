import { getGuideDirectory, simpleLink } from './../helpers';

const migrateAndUpgrade = () => {
  return {
    link: '/guides/guided',
    title: 'Migrating Sites to Pantheon',
    children: [

      getGuideDirectory('guides/migrate/guided', 'Guided Migration'),
      {
        link: '/migrate-wordpress',
        title: 'Migrating WordPress Sites',
        children: [
          getGuideDirectory('guides/migrate/kinsta', 'Kinsta'),
          getGuideDirectory('guides/migrate/pagely', 'Pagely'),
          getGuideDirectory('guides/migrate/wordpressvip', 'WordPress VIP'),
          getGuideDirectory('guides/migrate/wpengine', 'WP Engine'),
/// I would have guessed that the Platform.sh docs would be about Drupal, not WordPress.
          getGuideDirectory('guides/migrate/platformsh', 'Platform.sh'),

          simpleLink('/migrate-wordpress-multisite', "Multisite"),
        ],
      },


      simpleLink('/migrate-manual', "Manual Migration", [
        getGuideDirectory('guides/migrate/manual-d8-composer-to-d8', 'Manual d8 to d8'),
        getGuideDirectory('guides/migrate/acquia', 'Acquia'),
        simpleLink('/migrate-cpanel', "CPanel"),

      ]),



      simpleLink('/drupal-migration', "Restructuring Drupal Codebases", [

        simpleLink('/drupal-to-build-tools'),

        getGuideDirectory('guides/drupal/drupal-hosted', 'drupal-hosted'),
        getGuideDirectory('guides/drupal/drupal-unhosted', 'unhosted???'),
        getGuideDirectory('guides/drupal/drupal-unhosted-composer', 'unhosted-composer'),
        getGuideDirectory('guides/drupal/drupal-hosted-md', 'drupal-hosted-multidev'),
        getGuideDirectory('guides/drupal/drupal-hosted-createempty-md', 'drupal-hosted-createempty-md'),
        getGuideDirectory('guides/drupal/drupal-hosted-createdashboard-set8', 'drupal-hosted-createdashboard-set8'),
        getGuideDirectory('guides/drupal/drupal-hosted-btworkflow', 'drupal-hosted-btworkflow'),

        getGuideDirectory('guides/drupal/drupal-hosted-createbt', 'drupal-hosted-createbt'),
        getGuideDirectory('guides/drupal/drupal-hosted-createcustom', 'drupal-hosted-createcustom'),
        simpleLink('/switch-drupal-recommended-upstream', "Restructuring Drupal Codebases"),
        simpleLink('/upgrade-drupal-with-ic-to-latest'),
      ]
),

    ],
  }
};

export default migrateAndUpgrade;
