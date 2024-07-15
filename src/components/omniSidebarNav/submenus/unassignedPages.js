import { getGuideDirectory, simpleLink } from './../helpers';

const unassignedPages = () => {
  return {
    link: '/asdfasdfasdf',
    title: 'Unassigned',
    children: [

      simpleLink('/automate'),


      simpleLink('/certificate-bundles'),

      // drupal
      simpleLink('/clamav'),

      simpleLink('/clear-caches'),
      simpleLink('/cookies'),
      simpleLink('/client-ip'),

      // @todo, this page is not loading??
      simpleLink('/cloud-optimization'),



      simpleLink('/composer'),
      simpleLink('/composer-convert'),
      simpleLink('/composer-convert-from-empty'),

      simpleLink('/content-staging'),
      simpleLink('/continuous-integration'),


      simpleLink('/crisis-response-upstream'),
      simpleLink('/custom-certificates'),
      simpleLink('/customer-scheduled-cron-jobs'),
      simpleLink('/cygwin-windows'),
      simpleLink('/dashboard'),
      simpleLink('/debug-connections'),


      simpleLink('/develop-drupal'),
      simpleLink('/develop-wordpress'),
      simpleLink('/doc-template'),

      simpleLink('/email'),

      simpleLink('/enterprise-billing-center'),
      simpleLink('/external-libraries'),

      simpleLink('/go-live'),


      simpleLink('/guides'),
      simpleLink('/guides/account-mgmt'),
      simpleLink('/guides/security'),
      simpleLink('/guides/wordpress-composer/pre-ga'),
      simpleLink('/horizontal-scalability'),
      simpleLink('/inclusive-language'),
      simpleLink('/integrations'),
      simpleLink('/jenkins'),
      simpleLink('/load-and-performance-testing'),
      simpleLink('/load-testing-with-blazemeter'),
      simpleLink('/lockr'),

      simpleLink('/migrate-cpanel'),
      simpleLink('/migrate-manual'),
      simpleLink('/migrate-wordpress-multisite'),

      simpleLink('/modules-plugins-known-issues'),
      simpleLink('/multizone-failover'),

      simpleLink('/nested-docroot'),

      simpleLink('/newrelic'),

      simpleLink('/optimize-wp-options-table-autoloaded-data'),
      simpleLink('/oss-support-levels'),
      simpleLink('/outgoing-ips'),
      simpleLink('/overview'),
      simpleLink('/pantheon-workflow'),
      simpleLink('/pantheon-yml'),
      simpleLink('/pantheon-yml-overview'),

      simpleLink('/partial-composer'),
      simpleLink('/performance'),
      simpleLink('/personal-settings'),
      simpleLink('/pingdom-uptime-check'),
      simpleLink('/pivotal-tracker'),
      simpleLink('/platform-notifications'),
      simpleLink('/platform-upgrade'),
      simpleLink('/plugins-known-issues'),
      simpleLink('/products'),
      simpleLink('/relaunch'),
      simpleLink('/required-reading'),
      simpleLink('/rerouting-outbound-email'),
      simpleLink('/resetting-passwords'),
      simpleLink('/search/'),
      simpleLink('/sendgrid'),
      simpleLink('/server_name-and-server_port'),
      simpleLink('/sign-up'),
      simpleLink('/single-application-sites'),
      simpleLink('/site-dashboard'),
      simpleLink('/start-state'),
      simpleLink('/static-site-empty-upstream'),
      simpleLink('/static-site-empty-upstream-demo'),


      simpleLink('/switch-drupal-recommended-upstream'),
      simpleLink('/symlinks-assumed-write-access'),
      simpleLink('/tax-exempt-status'),

      simpleLink('/troubleshoot'),
      simpleLink('/unwind-drupal-multisite'),
      simpleLink('/upgrade-drupal-with-ic-to-latest'),
      simpleLink('/wordpress'),
      simpleLink('/wordpress-known-issues'),
      simpleLink('/workflow-logs'),

      // about docs
      simpleLink('/code-of-conduct'),
      simpleLink('/contribute'),
      simpleLink('/pantheon-community'),
      simpleLink('/trainers'),
      simpleLink('/style-guide'),
      simpleLink('/faq'),
      simpleLink('/glossary/'),


      simpleLink('/addons'),
      simpleLink('/'),
      simpleLink('/add-site'),
      simpleLink('/add-site-custom-upstream'),
      simpleLink('/add-site-dashboard'),





    ],
  }

};

export default unassignedPages;
