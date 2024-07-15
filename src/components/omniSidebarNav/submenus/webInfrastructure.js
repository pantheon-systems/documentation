import { getGuideDirectory, simpleLink } from './../helpers';

const webInfrastructure = () => {
  return {
    link: '/platform',
      title: 'Web Infrastructure',
        children: [
          simpleLink('/regions'),
          simpleLink('/pantheon_stripped'),
          simpleLink('/cache'),
          simpleLink('/cache-control'),
          simpleLink('/caching-advanced-topics'),
          simpleLink('/debug-cache'),
          simpleLink('/http-to-https'),


          // @todo, this page is not loading??
          simpleLink('/debug-slow-performance'),



          simpleLink('/date-and-time'),

          simpleLink('/basic-troubleshooting'),

          simpleLink('/bots-and-indexing'),

          simpleLink('/object-cache', 'Object Cache', [

            simpleLink('/object-cache/cli', 'CLI'),
            simpleLink('/object-cache/drupal', 'Drupal'),
            simpleLink('/object-cache/errors', 'Errors'),
            simpleLink('/object-cache/faq', 'FAQ'),
            simpleLink('/object-cache/remove', 'remove'),
            simpleLink('/object-cache/wordpress', 'WordPress'),
            simpleLink('/object-cache/wordpress-deprecated', 'WordPress deprecated'),
          ]),
          simpleLink('/mime-types'),

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
          simpleLink('/opensolr'),
          simpleLink('/solr'),
          getGuideDirectory('guides/solr-drupal'),
          getGuideDirectory('guides/redirect'),
          getGuideDirectory('guides/mariadb-mysql'),
          getGuideDirectory('guides/platform-considerations'),
          getGuideDirectory('guides/frontend-performance'),
          getGuideDirectory('guides/woocommerce', "WooCommerce"),
          getGuideDirectory('guides/multisite', "WordPress Multisite"),

          simpleLink('/supported-drupal'),
          simpleLink('/services-yml'),
          simpleLink('/modules'),
          simpleLink('/modules-known-issues'),

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




        ],
    }

};

export default webInfrastructure;
