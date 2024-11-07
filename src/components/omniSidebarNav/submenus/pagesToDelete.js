import { getGuideDirectory, simpleLink } from './../helpers';

const pagesToDeleteorReconsider = () => {
  return {
    link: '/cache',
    title: 'Pages to Delete or reconsider',
    children: [
      // minimal landing page that should be kept.
      simpleLink('/addons'),

      simpleLink('/partial-composer'), // This page should be rewritten to focus on WordPress.
      simpleLink('/cache'),
      simpleLink('/pantheon-yml-overview', 'Pantheon.yml Overview (Delete?)'),

      // This page is odd now that D11 is out.
      simpleLink('/drupal-10', 'Drupal 10'),
      // Build tools dependent, may not be relevant
      simpleLink('/drupal-commerce', 'Drupal Commerce'),
      // This should be deleted along with /wordpress
      simpleLink('/drupal-composer-managed'),
      simpleLink('/develop-drupal'),
      // Not so relevant, needs further review
      simpleLink('/drupal-broken-links', 'Fix Broken Links'),
      simpleLink('/drupal-updates'),

      // This landing page could go elsewhere
      simpleLink('/performance', 'Performance Consideration'),

      // This page could use a refresh
      simpleLink('/headless', 'Running a Headless CMS'),

      simpleLink('/drupal-caching-views'), // link to dorg docs instead, maybe from status docs or drupal cache doc

      //These next 2 already exist in the local development guide
      simpleLink('/visual-studio-code', 'Visual Studio Code'),
      simpleLink('/drupal-phpstorm', 'Using PHPStorm'),

      simpleLink('/workshops'),
      simpleLink('/agency-tips', 'Agency Tips'),
      simpleLink('/support', 'Support landing'),
      simpleLink('/platform-notifications', 'Platform Notifications'),
      simpleLink('/billing', 'Billing'),
      simpleLink('/guides/account-mgmt'),
      simpleLink('/enterprise-billing-center', 'Enterprise Billing Center'),

      // This is a really small page.
      simpleLink('/add-site-clone'),
      simpleLink('/supported-wp'),
      simpleLink('/cygwin-windows'),
      simpleLink('/faq', 'FAQ'),

      // This page is already deleted in the main branch.
      simpleLink('/guides/wordpress-composer/pre-ga'),
      simpleLink('/wordpress', 'WordPress changelog'),
      // Deprecated
      simpleLink('/crisis-response-upstream'),
      simpleLink('/static-site-empty-upstream'),
      simpleLink('/static-site-empty-upstream-demo'),

      // This page is pretty empty
      simpleLink('/overview'),

      // Maybe we should keep some of these landing listing and just have
      // no sidebar for them.
      simpleLink('/guides'),
      simpleLink('/guides/security'),
      simpleLink('/products'),

      // This page is a bit short. It is also a duplicate of /guides/getstarted/signup
      simpleLink('/sign-up', 'Sign Up for Pantheon'),
      // This duplicates /guides/getstarted/addsite
      simpleLink('/add-site', 'Adding a Site'),
      // Non-dupe content on this page should be moved to /guides/getstarted/addsite
      simpleLink('/add-site-dashboard', 'Add a site'),
      // This should be added as a sub-page of guides/mariadb-mysql
      simpleLink(
        '/optimize-wp-options-table-autoloaded-data',
        'Optimize wp_options Table and Autoloaded Data',
      ),

      // This is actually for google domains and that's no longer a service
      simpleLink('/google', 'Google Cloud DNS'),
      // Has unsupported "product" upstreams Panopoly and OpenAtrium
      simpleLink('/start-state'),

      // This page is duplicated by other terminus stuff
      simpleLink('/terminus-demo', 'Introduction to Terminus'),

      // Redirect this page to https://docs.pantheon.io/guides/drush/drupal-commandline
      simpleLink(
        '/terminus-drupal-site-management',
        'Using Terminus to Create and Update Drupal Sites on Pantheon',
      ),
      simpleLink('/newrelic', 'New Relic', [

      ]),
      // Redirect to /terminus
      simpleLink('/terminus-overview', 'Terminus Overview'),

      // @todo, this page seems like it should be an article.
      simpleLink('/cloud-optimization'),

      // This is a page about the move from Rackspace to Google Cloud
      simpleLink('/platform-upgrade'),

      simpleLink('/autopilot', 'Autopilot Overview'), // Duplicates the autopilot guide

      simpleLink('/certificate-bundles'),

      // Pages to audit and reconsider before adding to migration submenu
      simpleLink('/composer-convert'),
      simpleLink('/composer-convert-from-empty'),

      simpleLink('/drupal-migration', 'Restructuring Drupal Codebases', [
        simpleLink('/drupal-to-build-tools'),

        getGuideDirectory('guides/drupal/drupal-hosted', 'drupal-hosted'),
        getGuideDirectory('guides/drupal/drupal-unhosted', 'unhosted???'),
        getGuideDirectory(
          'guides/drupal/drupal-unhosted-composer',
          'unhosted-composer',
        ),
        getGuideDirectory(
          'guides/drupal/drupal-hosted-md',
          'drupal-hosted-multidev',
        ),
        getGuideDirectory(
          'guides/drupal/drupal-hosted-createempty-md',
          'drupal-hosted-createempty-md',
        ),
        getGuideDirectory(
          'guides/drupal/drupal-hosted-createdashboard-set8',
          'drupal-hosted-createdashboard-set8',
        ),
        getGuideDirectory(
          'guides/drupal/drupal-hosted-btworkflow',
          'drupal-hosted-btworkflow',
        ),

        getGuideDirectory(
          'guides/drupal/drupal-hosted-createbt',
          'drupal-hosted-createbt',
        ),
        getGuideDirectory(
          'guides/drupal/drupal-hosted-createcustom',
          'drupal-hosted-createcustom',
        ),
        simpleLink(
          '/switch-drupal-recommended-upstream',
          'Restructuring Drupal Codebases',
        ),
        simpleLink('/upgrade-drupal-with-ic-to-latest'),
        {
          link: '/migrate-wordpress',
          title: 'Migrating WordPress Sites',
        },
        getGuideDirectory(
          'guides/migrate/manual-d8-composer-to-d8',
          'Manual d8 to d8',
        ),
      ]),
    ],
  };
};

export default pagesToDeleteorReconsider;
