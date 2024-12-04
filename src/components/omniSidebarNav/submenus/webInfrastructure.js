import { getGuideDirectory, simpleLink } from './../helpers';

const webInfrastructure = () => {
  return {
    link: '/platform',
    title: 'Web Infrastructure',
    children: [
      simpleLink('/platform', 'Overview'),

      simpleLink('/application-containers', 'Application Containers', [
        simpleLink(
          '/application-containers',
          'All About Application Containers',
        ),
        simpleLink('/horizontal-scalability', 'Horizontal Scalability'),
        // This page is oddly short.
        simpleLink('/single-application-sites', 'One app per site'),
        getGuideDirectory('guides/php'),

        // These pages could be folded into the "Environment configuration" section.
        simpleLink('/pantheon-yml', 'App Configuration', [
          simpleLink('/pantheon-yml', 'pantheon.yml'),
          simpleLink('/nested-docroot', 'Nested Docroot'),
          simpleLink(
            '/server_name-and-server_port',
            'Server Name and Server Port',
          ),
          simpleLink('/date-and-time', 'Date and Time'),
          simpleLink('/outgoing-ips', 'Dynamic Outgoing IP Addresses'),
          // Given the warning on this page, we should consider removing it.
          simpleLink('/client-ip', 'Getting the Client IP Address'),
        ]),

        getGuideDirectory('guides/logs-pantheon', 'Environment Log files'),
        // @todo, should this page be an article?
        simpleLink('/multizone-failover', 'Multizone Failover'),

        // Should this be nested somewhere else?
        simpleLink('/regions', 'Global Regions and Data Residency'),
        // remove PhantomJS stuff?
        simpleLink('/external-libraries', 'External Libraries'),
        simpleLink('/email', 'Email', [
          simpleLink('/sendgrid', 'SendGrid'),
          simpleLink(
            '/rerouting-outbound-email',
            'Rerouting outbound email during development',
          ),
        ]),
      ]),

      {
        // This is an old video that should be replaced.
        link: '/cache',
        title: 'Caching and CDN',
        children: [
          simpleLink('/object-cache', 'Object Cache', [
            simpleLink('/object-cache/cli', 'CLI'),
            simpleLink('/object-cache/drupal', 'Drupal'),
            simpleLink('/object-cache/errors', 'Errors'),
            simpleLink('/object-cache/faq', 'FAQ'),
            simpleLink('/object-cache/remove', 'remove'),
            simpleLink('/object-cache/wordpress', 'WordPress'),
            simpleLink(
              '/object-cache/wordpress-deprecated',
              'WordPress deprecated',
            ),
            simpleLink('/apcu', 'APCu'),
          ]),

          getGuideDirectory('guides/global-cdn', 'Global CDN'),
          getGuideDirectory('guides/agcdn'),
          simpleLink('/clear-caches', 'Manage Cache', [
            // Think about the order of this section
            simpleLink('/clear-caches', 'Clearing Caches'),
            // find the wp version of this next one, and un-guidify it
            simpleLink('/drupal-cache', 'Configure Drupal Cache'),
            simpleLink('/caching-advanced-topics', 'Advanced Topics'),
            simpleLink('/cookies', 'Cookies'),
            simpleLink('/pantheon_stripped', 'utm_source URL Parameter'),
            simpleLink('/cache-control', 'Bypass Cache'),
          ]),

          simpleLink('/drupal-cloudfront', 'Stacking CDNs', [
            // Move to a "stacked CDN section."
            simpleLink('/drupal-cloudfront'),
            // delete this guide? asking tsc's
            getGuideDirectory('guides/fastly-pantheon'),
          ]),
        ],
      },
      getGuideDirectory('guides/mariadb-mysql', 'Database'),

      simpleLink('/guides/filesystem', 'Filesystem', [
        getGuideDirectory('guides/filesystem', 'Pantheon Filesystem'),
        simpleLink('/drupal-s3', 'Offloading files to S3 for Drupal'),
        // Todo, pull out the equivalent WordPress page.
        simpleLink(
          '/guides/wordpress-developer/wordpress-s3?double-menu',
          'Offloading files to S3 for WordPress',
        ),
      ]),

      simpleLink('/solr', 'Solr Search', [
        simpleLink('/solr', 'Pantheon Search'),
        getGuideDirectory('guides/solr-drupal', 'Drupal'),
        simpleLink('/opensolr', 'Open Solr'),
      ]),
      getGuideDirectory('guides/redirect', 'Redirects'),

      simpleLink('/develop-drupal', 'Drupal', [
        simpleLink('/develop-drupal', 'Overview'),
        simpleLink('/supported-drupal', 'Supported Drupal Versions'),
        simpleLink('/modules', 'Pantheon Modules'),
        simpleLink('/drupal-launch-check', 'Status Report'),
        // This is another page that felt necessary in the early days of D8.
        simpleLink(
          '/drupal-configuration-management',
          'Configuration Management Workflow',
        ),
        simpleLink('/services-yml', 'Services Files'),
        simpleLink('/drupal-cron', 'Drupal Cron'),
        // Check if this page is referenced from hermes.
        simpleLink('/drupal-caching-views', 'Views Caching'),
        // Recommendations are potentially out of date (empty upstream instead of IC)
        simpleLink(
          '/drupal-from-dist',
          'Create a Drupal Site Using a Drupal Distribution',
        ),
        simpleLink('/drupal-broken-links', 'Fix Broken Links'),
        // This page should be converted into an article.
        simpleLink('/cloud-optimization', 'Optimizing for the Cloud'),
      ]),
      simpleLink('/develop-wordpress', 'WordPress', [
        simpleLink('/develop-wordpress', 'Overview'),
        // Todo: reconcile these 2:
        getGuideDirectory('guides/wordpress-pantheon', 'WordPress on Pantheon'),
        // Todo: relocate the aws s3 page to webinfra filesystem submenu
        getGuideDirectory('guides/wordpress-developer'),
        getGuideDirectory('guides/wordpress-configurations'),
        getGuideDirectory('guides/multisite', 'WordPress Multisite'),
        getGuideDirectory('guides/woocommerce', 'WooCommerce'),
        // Do we need this page?
        simpleLink('/supported-wp', 'Supported WordPress Versions'),
        simpleLink(
          '/optimize-wp-options-table-autoloaded-data',
          'Optimize wp_options Table and Autoloaded Data',
        ),
      ]),
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
          simpleLink(
            '/static-site-empty-upstream',
            'Static Sites on an Empty Upstream',
          ),
        ],
      },
      simpleLink('/addons', 'Performance Add-ons'),
      simpleLink('/integrations', 'Integrations'),
    ],
  };
};

export default webInfrastructure;
