import { getGuideDirectory, simpleLink } from './../helpers';

const pagesToDeleteorReconsider = () => {
  return {
    link: '/platform-upgrade',
    title: 'Pages to Delete or reconsider',
    children: [
      simpleLink('/platform-notifications?asfdasdfasdf', 'pages to move', [
        simpleLink('/supported-wp'),
        simpleLink('/develop-drupal'), // Move to Drupal section.
        // Not so relevant, needs further review.
        // Let's move it to the Drupal menu for now.
        simpleLink('/drupal-broken-links', 'Fix Broken Links'),
        simpleLink('/faq', 'FAQ'), // move to getting started
        simpleLink('/platform-notifications', 'Platform Notifications'),
        // Has unsupported "product" upstreams Panopoly and OpenAtrium. But should probably go in Web Infra?
        simpleLink('/start-state'),
        // This is a really small page. Move to get started?
        simpleLink('/add-site-clone'),

        // This should be added as a sub-page of guides/mariadb-mysql
        simpleLink(
          '/optimize-wp-options-table-autoloaded-data',
          'Optimize wp_options Table and Autoloaded Data',
        ),
        // @todo, this page seems like it should be an article.
        // But it could go under web infra or troubleshooting performance.
        simpleLink('/cloud-optimization'),
      ]),

      // Deprecated
      simpleLink('/crisis-response-upstream', 'Deprecated or archived pages', [
        simpleLink('/crisis-response-upstream'),
        // This should be deprecated/archived see https://github.com/pantheon-systems/documentation/pull/9251
        getGuideDirectory('guides/edge-integrations', 'Edge Integrations'),
      ]),

      // Maybe we should keep some of these landing listing and just have
      // no sidebar for them.
      simpleLink('/guides', 'landing pages', [
        simpleLink('/guides'),
        simpleLink('/guides/account-mgmt'),
        simpleLink('/products'),
        simpleLink('/support', 'Support landing'),
        // This landing page could go elsewhere
        simpleLink('/performance', 'Performance Consideration'),
        // minimal landing page that should be kept or rebuilt as prose.
        simpleLink('/addons'),
      ]),

      // Pages that should be redirected
      simpleLink('/overview', 'pages that should be redirected', [
        simpleLink('/overview'), //  --> "/"
        simpleLink('/autopilot', 'Autopilot Overview'), // Duplicates the autopilot guide
        simpleLink('/terminus-overview', 'Terminus Overview'),
        simpleLink('/newrelic', 'New Relic', []),
        // This page is a bit short. It is also a duplicate of /guides/getstarted/signup
        simpleLink('/sign-up', 'Sign Up for Pantheon'),
        // This page is already deleted in the main branch.
        simpleLink('/guides/wordpress-composer/pre-ga'),
        simpleLink('/pantheon-yml-overview', 'Pantheon.yml Overview (Delete?)'),
        // This should be deleted along with /wordpress
        simpleLink('/drupal-composer-managed'),
        simpleLink('/wordpress', 'WordPress changelog'),
        //These next 2 already exist in the local development guide
        simpleLink('/visual-studio-code', 'Visual Studio Code'),
        simpleLink('/drupal-phpstorm', 'Using PHPStorm'),
        // This page is duplicated by other terminus stuff
        simpleLink('/terminus-demo', 'Introduction to Terminus'),
        simpleLink('/enterprise-billing-center', 'Enterprise Billing Center'),
        simpleLink('/billing', 'Billing'),
        // This duplicates /guides/getstarted/addsite
        simpleLink('/add-site', 'Adding a Site'),
        // Non-dupe content on this page should be moved to /guides/getstarted/addsite
        simpleLink('/add-site-dashboard', 'Add a site'),
        simpleLink('/workshops'),
        // This is actually for google domains and that's no longer a service
        simpleLink('/google', 'Google Cloud DNS'),
        // This page could use a refresh
        simpleLink('/headless', 'Running a Headless CMS'),
        // This is a page about the move from Rackspace to Google Cloud. Maybe redirect to guides/disaster-recovery
        simpleLink('/platform-upgrade'),
        simpleLink('/cygwin-windows'),
        // Redirect this page to https://docs.pantheon.io/guides/drush/drupal-commandline
        simpleLink(
          '/terminus-drupal-site-management',
          'Using Terminus to Create and Update Drupal Sites on Pantheon',
        ),
      ]), //  --> "/"
    ],
  };
};

export default pagesToDeleteorReconsider;
