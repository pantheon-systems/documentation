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
      simpleLink('/configure-dns'),
      simpleLink('/connection-modes'),
      simpleLink('/content-staging'),
      simpleLink('/continuous-integration'),


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

      simpleLink('/email'),

      simpleLink('/enterprise-billing-center'),
      simpleLink('/external-libraries'),
      simpleLink('/faq'),

      simpleLink('/glossary/'),
      simpleLink('/go-live'),


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

      simpleLink('/nested-docroot'),

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

      // about docs
      simpleLink('/code-of-conduct'),
      simpleLink('/contribute'),


      simpleLink('/addons'),
      simpleLink('/'),
      simpleLink('/add-site'),
      simpleLink('/add-site-custom-upstream'),
      simpleLink('/add-site-dashboard'),





    ],
  }

};

export default unassignedPages;
