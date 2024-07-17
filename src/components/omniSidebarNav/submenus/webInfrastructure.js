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

          // @todo, should this page be an article?
          simpleLink('/horizontal-scalability'),

          simpleLink('/application-containers'),
          simpleLink('/apcu'),
          getGuideDirectory('guides/php'),
          getGuideDirectory('guides/logs-pantheon', 'Log files'),
          getGuideDirectory('guides/filesystem', 'Filesystem'),
          getGuideDirectory('guides/global-cdn', 'Global CDN'),
          getGuideDirectory('guides/agcdn'),
          simpleLink('/custom-certificates'),

          simpleLink('/outgoing-ips'),
          simpleLink('/server_name-and-server_port'),

          simpleLink('/multizone-failover'),



          simpleLink('/performance'),
          simpleLink('/load-and-performance-testing'),
          simpleLink('/load-testing-with-blazemeter'),


          // remove PhantomJS stuff?
          simpleLink('/external-libraries'),



          simpleLink('/resetting-passwords'),


          // drupal
          simpleLink('/clamav'),

          simpleLink('/clear-caches'),
          simpleLink('/cookies'),
          simpleLink('/client-ip'),


          // delete this guide?
          getGuideDirectory('guides/fastly-pantheon'),
          // This page could use a refresh
          simpleLink('/headless'),
          getGuideDirectory('guides/backups'),
          getGuideDirectory('guides/disaster-recovery', 'Disaster Recovery Playbook'),
          getGuideDirectory('guides/edge-integrations', 'Edge Integrations'),
          getGuideDirectory('guides/errors-and-server-responses'),
          getGuideDirectory('guides/environment-configuration'),

          // this is a landing page that could hold others.
          simpleLink('/troubleshoot'),
          simpleLink('/debug-connections'),



          // This page might fit better in migrate and Upgrade
          // since it is about reformatting a codebase.
          simpleLink('/nested-docroot'),


          simpleLink('/pantheon-yml'),
          simpleLink('/pantheon-yml-overview'),

          simpleLink('/opensolr'),
          simpleLink('/solr'),
          getGuideDirectory('guides/solr-drupal'),
          getGuideDirectory('guides/redirect'),
          getGuideDirectory('guides/mariadb-mysql'),
          getGuideDirectory('guides/platform-considerations'),
          getGuideDirectory('guides/frontend-performance'),





          simpleLink('/single-application-sites'),




        ],
    }

};

export default webInfrastructure;
