import CertificationItems from './submenus/certification';
import { getGuideDirectory, simpleLink } from './helpers';

import getStarted from './submenus/getStarted';
import dnsProviders from './submenus/dnsProviders';
import pagesToDelete from './submenus/pagesToDelete';
import unassignedPages from './submenus/unassignedPages';
import migrateAndUpgrade from './submenus/migrateAndUpgrade';

/**
 * Retrieves the all the menu items for the sidebar navigation.
 * @returns {Array} An array of Omni items.
 */
const getOmniItems = () => {
  const OmniItems = [
   // about docs
   // /contribute

    pagesToDelete(),
    unassignedPages(),
    getStarted(),
    dnsProviders(),
    migrateAndUpgrade(),



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
