import { getGuideDirectory, simpleLink } from './../helpers';

const pagesToDeleteorReconsider = () => {
  return {
    link: '/platform-upgrade',
    title: 'Pages to Delete or reconsider',
    children: [

      getGuideDirectory('guides/drupal/drupal-unhosted', 'unhosted???'),
      // Is this duplicated by guides/drupal-unhosted-composer
      getGuideDirectory(
        'guides/migrate/manual-d8-composer-to-d8',
        'Manual d8 to d8',
      ),
      // This page could use a refresh
      simpleLink('/headless', 'Running a Headless CMS'),
      simpleLink('/cygwin-windows'),
        
      // Deprecated
      simpleLink('/crisis-response-upstream', 'Deprecated or archived pages', [
        simpleLink('/drupal-10', 'Drupal 10'),
        simpleLink('/crisis-response-upstream'),
        // This should be deprecated/archived see https://github.com/pantheon-systems/documentation/pull/9251
        getGuideDirectory('guides/edge-integrations', 'Edge Integrations'),
        simpleLink('/drupal-updates', 'Drupal Updates'),
        simpleLink('/lockr'),
      ]),
      // --- ^^ Everything above still needs to be reviewed ^^ ---

      
      // --- Everything below has been deleted for redirection in PR #9335 ---
      // Pages that should be redirected
      simpleLink('/overview', 'pages that should be redirected', [
        simpleLink('/overview'), //  --> "/"
        // We should probably delete/redirect this.
        simpleLink('/manage'),
        // Should this one be redirected to /guides/custom-upstreams?
        simpleLink('/custom-upstreams', 'Custom Upstreams'),
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
        // This is a page about the move from Rackspace to Google Cloud. Maybe redirect to guides/disaster-recovery
        // RW: I think maybe /monthly-maintenance is a better target for the redirect
        simpleLink('/platform-upgrade'),
        // Redirect this page to https://docs.pantheon.io/guides/drush/drupal-commandline
        simpleLink(
          '/terminus-drupal-site-management',
          'Using Terminus to Create and Update Drupal Sites on Pantheon',
        ),
        // Todo: relocate this page.
        {
          link: '/migrate-wordpress',
          title: 'Migrating WordPress Sites',
        },


      ]), //  --> "/"
    ],
  };
};

export default pagesToDeleteorReconsider;
