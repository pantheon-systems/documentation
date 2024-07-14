import CertificationItems from './submenus/certification';
import { getGuideDirectory, simpleLink } from './helpers';

import getStarted from './submenus/getStarted';

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
      link: '/asdfasdf',
      title: 'Pages to Delete',
      children: [
        simpleLink('/workshops'),

      ]
    },






    {
      link: '/asdfasdfasdf',
      title: 'Unassigned',
      children: [

        simpleLink('/'),
        simpleLink('/add-site'),
        simpleLink('/add-site-clone'),
        simpleLink('/add-site-custom-upstream'),
        simpleLink('/add-site-dashboard'),
        simpleLink('/addons'),
        simpleLink('/agency-tips'),


        simpleLink('/automate'),
        simpleLink('/basic-troubleshooting'),


        simpleLink('/bots-and-indexing'),
        simpleLink('/cache'),
        simpleLink('/cache-control'),
        simpleLink('/caching-advanced-topics'),
        simpleLink('/certificate-bundles'),
        simpleLink('/clamav'),
        simpleLink('/clear-caches'),
        simpleLink('/client-ip'),
        simpleLink('/cloud-optimization'),
        simpleLink('/code-of-conduct'),
        simpleLink('/composer'),
        simpleLink('/composer-convert'),
        simpleLink('/composer-convert-from-empty'),
        simpleLink('/configure-dns'),
        simpleLink('/connection-modes'),
        simpleLink('/content-staging'),
        simpleLink('/continuous-integration'),
        simpleLink('/contribute'),
        simpleLink('/cookies'),
        simpleLink('/core-updates'),
        simpleLink('/crisis-response-upstream'),
        simpleLink('/custom-certificates'),
        simpleLink('/custom-upstreams'),
        simpleLink('/customer-scheduled-cron-jobs'),
        simpleLink('/cygwin-windows'),
        simpleLink('/dashboard'),
        simpleLink('/date-and-time'),
        simpleLink('/debug-cache'),
        simpleLink('/debug-connections'),
        simpleLink('/debug-slow-performance'),
        simpleLink('/deploybot'),
        simpleLink('/develop-drupal'),
        simpleLink('/develop-wordpress'),
        simpleLink('/doc-template'),
        simpleLink('/dreamhost'),
        simpleLink('/drupal'),
        simpleLink('/drupal-10'),
        simpleLink('/drupal-advanced-page-cache'),
        simpleLink('/drupal-broken-links'),
        simpleLink('/drupal-cache'),
        simpleLink('/drupal-caching-views'),
        simpleLink('/drupal-cloudfront'),
        simpleLink('/drupal-commerce'),
        simpleLink('/drupal-composer-managed'),
        simpleLink('/drupal-configuration-management'),
        simpleLink('/drupal-cron'),
        simpleLink('/drupal-from-dist'),
        simpleLink('/drupal-launch-check'),
        simpleLink('/drupal-migration'),
        simpleLink('/drupal-phpstorm'),
        simpleLink('/drupal-s3'),
        simpleLink('/drupal-security-patches'),
        simpleLink('/drupal-to-build-tools'),
        simpleLink('/drupal-updates'),
        simpleLink('/drush'),
        simpleLink('/dyn'),
        simpleLink('/email'),
        simpleLink('/enom'),
        simpleLink('/enterprise-billing-center'),
        simpleLink('/external-libraries'),
        simpleLink('/faq'),
        simpleLink('/gandi'),
        simpleLink('/glossary/'),
        simpleLink('/go-live'),
        simpleLink('/godaddy'),
        simpleLink('/google'),
        simpleLink('/guides'),
        simpleLink('/guides/account-mgmt'),
        simpleLink('/guides/security'),
        simpleLink('/guides/wordpress-composer/pre-ga'),

        simpleLink('/horizontal-scalability'),

        simpleLink('/http-to-https'),
        simpleLink('/inclusive-language'),
        simpleLink('/integrations'),
        simpleLink('/jenkins'),
        simpleLink('/ldap-and-ldaps'),
        simpleLink('/load-and-performance-testing'),
        simpleLink('/load-testing-with-blazemeter'),
        simpleLink('/lockr'),
        simpleLink('/machine-tokens'),
        simpleLink('/migrate-cpanel'),
        simpleLink('/migrate-manual'),
        simpleLink('/migrate-wordpress-multisite'),
        simpleLink('/mime-types'),
        simpleLink('/modules'),
        simpleLink('/modules-known-issues'),
        simpleLink('/modules-plugins-known-issues'),
        simpleLink('/multizone-failover'),
        simpleLink('/namecheap'),
        simpleLink('/nested-docroot'),
        simpleLink('/network-solutions'),
        simpleLink('/newrelic'),
        simpleLink('/opensolr'),
        simpleLink('/optimize-wp-options-table-autoloaded-data'),
        simpleLink('/oss-support-levels'),
        simpleLink('/outgoing-ips'),
        simpleLink('/overview'),
        simpleLink('/pantheon-community'),
        simpleLink('/pantheon-workflow'),
        simpleLink('/pantheon-yml'),
        simpleLink('/pantheon-yml-overview'),
        simpleLink('/pantheon_stripped'),
        simpleLink('/partial-composer'),
        simpleLink('/performance'),
        simpleLink('/personal-settings'),
        simpleLink('/pingdom-uptime-check'),
        simpleLink('/pivotal-tracker'),
        simpleLink('/platform-notifications'),
        simpleLink('/platform-upgrade'),
        simpleLink('/plugins-known-issues'),
        simpleLink('/products'),
        simpleLink('/regions'),
        simpleLink('/relaunch'),
        simpleLink('/required-reading'),
        simpleLink('/rerouting-outbound-email'),
        simpleLink('/resetting-passwords'),
        simpleLink('/search/'),
        simpleLink('/sendgrid'),
        simpleLink('/server_name-and-server_port'),
        simpleLink('/services-yml'),
        simpleLink('/sftp'),
        simpleLink('/sign-up'),
        simpleLink('/single-application-sites'),
        simpleLink('/site-dashboard'),
        simpleLink('/solr'),

        simpleLink('/start-state'),
        simpleLink('/static-site-empty-upstream'),
        simpleLink('/static-site-empty-upstream-demo'),
        simpleLink('/style-guide'),

        simpleLink('/supported-drupal'),
        simpleLink('/supported-wp'),
        simpleLink('/switch-drupal-recommended-upstream'),
        simpleLink('/symlinks-assumed-write-access'),
        simpleLink('/tax-exempt-status'),

        simpleLink('/trainers'),
        simpleLink('/troubleshoot'),
        simpleLink('/unwind-drupal-multisite'),
        simpleLink('/upgrade-drupal-with-ic-to-latest'),

        simpleLink('/wordpress'),
        simpleLink('/wordpress-known-issues'),
        simpleLink('/workflow-logs'),

      ],
    },








getStarted(),


    {
      link: '/dns-providers',
      title: 'DNS Providers',
      children: [
/*
        1 & 1
    Amazon Route 53
    Cloudflare
    DNS Made Easy
    DreamHost
    Dyn
    Enom
    Gandi
    GoDaddy
    Google
    Namecheap
    Network Solutions
*/
    simpleLink('/1-and-1', '1 & 1'),
    simpleLink('/route53', 'Amazon Route 53'),
simpleLink('/cloudflare', 'Cloudflare'),
simpleLink('/dns-made-easy', 'DNS Made Easy'),


      ],
    },


    {
      link: '/asdf',
      title: 'Migrating and upgrading',
      children: [
        {
          link:  '/migrate-wordpress',
          title: 'migrate-wordpress',
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
        getGuideDirectory('guides/integrated-composer'),


      ],
    },


    {
      link: '/platform',
      title: 'Web Infrastructure',
      children: [


        simpleLink('/object-cache', 'Object Cache', [

          simpleLink('/object-cache/cli', 'CLI'),
          simpleLink('/object-cache/drupal', 'Drupal'),
          simpleLink('/object-cache/errors', 'Errors'),
          simpleLink('/object-cache/faq', 'FAQ'),
          simpleLink('/object-cache/remove', 'remove'),
          simpleLink('/object-cache/wordpress', 'WordPress'),
          simpleLink('/object-cache/wordpress-deprecated', 'WordPress deprecated'),

        ]),




        simpleLink('/timeouts'),

        simpleLink('/application-containers'),
        simpleLink('/apcu'),
        getGuideDirectory('guides/php'),
        getGuideDirectory('guides/logs-pantheon', 'Log files'),
        getGuideDirectory('guides/filesystem', 'Filesystem'),
        getGuideDirectory('guides/global-cdn', 'Global CDN'),
        getGuideDirectory('guides/agcdn'),
        // delete this guide?
        getGuideDirectory('guides/fastly-pantheon'),
        // This page could use a refresh
        simpleLink('/headless'),
        getGuideDirectory('guides/backups'),
        getGuideDirectory('guides/disaster-recovery', 'Disaster Recovery Playbook'),
        getGuideDirectory('guides/edge-integrations', 'Edge Integrations'),
        getGuideDirectory('guides/errors-and-server-responses'),
        getGuideDirectory('guides/environment-configuration'),
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
        simpleLink('/hotfixes'),

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
        getGuideDirectory('guides/build-tools', "build tools"),

        {
          link: '/asdfasdf',
          title: 'Random Tutorials',
          children: [

            simpleLink('/behat'),
            simpleLink('/visual-studio-code'),
          ]
        },

      ],
    },





     {
       link: '/manage',
       title: 'Account Management',
       children: [
     getGuideDirectory('guides/account-mgmt/account'),
         getGuideDirectory('guides/account-mgmt/billing'),
         getGuideDirectory('guides/account-mgmt/plans'),
         getGuideDirectory('guides/account-mgmt/traffic'),
         getGuideDirectory('guides/account-mgmt/workspace-sites-teams'),
        getGuideDirectory('guides/enterprise-billing-center'),
    getGuideDirectory('guides/sso'),
         getGuideDirectory('guides/wordpress-google-sso', 'WP SAML Auth'),
         // @todo, this page is oddly short.
         simpleLink('/support'),
    getGuideDirectory('guides/support', 'Support'),
        getGuideDirectory('guides/professional-services'),

         getGuideDirectory('guides/domains'),
         getGuideDirectory('guides/custom-upstream'),
         getGuideDirectory('guides/secure-development'),
         simpleLink('/autopilot', 'Autopilot Overview'),
         getGuideDirectory('guides/autopilot', 'Autopilot Guide'),
         getGuideDirectory('guides/autopilot-custom-upstream'),
         simpleLink('/ssh-keys'),
         simpleLink('/billing'),

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
      link: '/terminus',
      title: 'Terminus',
      children: [
        // @todo, copy the order from the terminus template
        simpleLink('/terminus'),
        simpleLink('/terminus-demo'),
        simpleLink('/terminus-drupal-site-management'),
        simpleLink('/terminus-overview'),
        simpleLink('/terminus/ci/bitbucket'),
        simpleLink('/terminus/ci/circleci'),
        simpleLink('/terminus/ci/github-actions'),
        simpleLink('/terminus/ci/gitlab'),
        simpleLink('/terminus/commands'),
        simpleLink('/terminus/configuration'),
        simpleLink('/terminus/create'),
        simpleLink('/terminus/directory'),
        simpleLink('/terminus/examples'),
        simpleLink('/terminus/install'),
        simpleLink('/terminus/plugins'),
        simpleLink('/terminus/scripting'),
        simpleLink('/terminus/supported-terminus'),
        simpleLink('/terminus/terminus-3-0'),
        simpleLink('/terminus/updates'),
      ]
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
