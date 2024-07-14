import { getGuideDirectory, simpleLink } from './../helpers';

const webInfrastructure = () => {
  return {
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
    }

};

export default webInfrastructure;
