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




// DNS providers  dns-providers
// 1-and-1



    {
      link: '/get-started',
      title: 'Get Started',
      children: [
        getGuideDirectory('guides/getstarted'),
        getGuideDirectory('guides/launch'),
        getGuideDirectory('guides/migrate'),
        getGuideDirectory('guides/wordpress-pantheon'),
      ],
    },



    {
      link: '/asdf',
      title: 'Migrating and upgrading',
      children: [
        getGuideDirectory('guides/pagely'),
        getGuideDirectory('guides/platformsh'),
        getGuideDirectory('guides/kinsta'),
        getGuideDirectory('guides/wpengine'),
        getGuideDirectory('guides/wordpressvip'),
        // Needs a title override
        getGuideDirectory('guides/drupal-hosted-createcustom'),

        // needs a title override
        getGuideDirectory('guides/drupal-hosted-btworkflow'),

        getGuideDirectory('guides/drupal-hosted-createbt'),

        getGuideDirectory('guides/drupal-hosted-createdashboard-set8'),
        getGuideDirectory('guides/drupal-hosted-createempty-md'),
        getGuideDirectory('guides/drupal-hosted-md'),
        getGuideDirectory('guides/drupal-unhosted'),
        getGuideDirectory('guides/guided'),
        getGuideDirectory('guides/integrated-composer'),
        getGuideDirectory('guides/manual-d8-composer-to-d8'),


      ],
    },


    {
      link: '/platform',
      title: 'Ops Platform',
      children: [
        getGuideDirectory('guides/php'),
        getGuideDirectory('guides/logs-pantheon', 'Log files'),
        getGuideDirectory('guides/filesystem', 'Filesystem'),
        getGuideDirectory('guides/global-cdn', 'Global CDN'),
        getGuideDirectory('guides/agcdn'),
        // delete this guide?
        getGuideDirectory('guides/fastly-pantheon'),
        getGuideDirectory('guides/backups'),
        getGuideDirectory('guides/disaster-recovery', 'Disaster Recovery Playbook'),
        getGuideDirectory('guides/edge-integrations', 'Edge Integrations'),
        getGuideDirectory('guides/errors-and-server-responses'),
        getGuideDirectory('guides/environment-configuration'),
        getGuideDirectory('guides/drupal'),
        getGuideDirectory('guides/wordpress-developer'),
        getGuideDirectory('guides/wordpress-configurations'),
        getGuideDirectory('guides/solr-drupal'),
        getGuideDirectory('guides/redirect'),
        getGuideDirectory('guides/mariadb-mysql'),
        getGuideDirectory('guides/platform-considerations'),
        getGuideDirectory('guides/frontend-performance'),
        getGuideDirectory('guides/woocommerce', "WooCommerce"),
        getGuideDirectory('guides/multisite', "WordPress Multisite"),

      ],
    },


    {
      link: '/develop',
      title: 'Development workflows',
      children: [
        getGuideDirectory('guides/git', "Git"),
        getGuideDirectory('guides/multidev'),
        getGuideDirectory('guides/new-relic', 'New Relic Performance Monitoring'),
        getGuideDirectory('guides/wordpress-composer', 'WordPress and Composer'),
        getGuideDirectory('guides/sftp', 'SFTP'),
        getGuideDirectory('guides/wp-cli', 'WP-CLI'),
        getGuideDirectory('guides/drush', 'Drush (the Drupal CLI)'),
        getGuideDirectory('guides/quicksilver', 'Quicksilver Workflow Hooks'),
        getGuideDirectory('guides/local-development', 'Local Development'),
        // maybe move this to a "tutorial" section
        getGuideDirectory('guides/wordpress-git', 'WordPress and Git'),



        //

        //getGuideDirectory('integrated-composer'),
      ],
    },





     {
       link: '/manage',
       title: 'account-management',
       children: [
     getGuideDirectory('guides/account-mgmt/account'),
         getGuideDirectory('guides/account-mgmt/billing'),
         getGuideDirectory('guides/account-mgmt/plans'),
         getGuideDirectory('guides/account-mgmt/traffic'),
         getGuideDirectory('guides/account-mgmt/workspace-sites-teams'),
        getGuideDirectory('guides/enterprise-billing-center'),
    getGuideDirectory('guides/sso'),
         getGuideDirectory('guides/wordpress-google-sso'),
    getGuideDirectory('guides/support'),
        getGuideDirectory('guides/professional-services'),
        getGuideDirectory('guides/filesystem'),
         getGuideDirectory('guides/domains'),
         getGuideDirectory('guides/custom-upstream'),
         getGuideDirectory('guides/secure-development'),
         getGuideDirectory('guides/autopilot'),

       ],
     },


    {
      link: '/asdfasdfasdf',
      // better name for this section needed
      title: 'Futher Integrations',
      children: [
        getGuideDirectory('guides/pagerduty'),
        getGuideDirectory('guides/accessibility'),

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
  console.log(OmniItems);
  return OmniItems;
};

export default getOmniItems;
