import { getGuideDirectory, simpleLink } from './../helpers';

const webInfrastructure = () => {
  return {
    link: '/platform',
      title: 'Web Infrastructure',
        children: [

          simpleLink('/application-containers', "Application Containers", [



            getGuideDirectory('guides/php'),


            // These pages could be folded into the "Environment configuration" section.
            simpleLink('/server_name-and-server_port', "Configuration", [

              simpleLink('/server_name-and-server_port', "Server Name and Server Port"),
              simpleLink('/date-and-time'),
              simpleLink('/outgoing-ips'),
              // Given the warning on this page, we should consider removing it.
              simpleLink('/client-ip'),
            ]),



            getGuideDirectory('guides/environment-configuration'),
            getGuideDirectory('guides/logs-pantheon', 'Environment Log files'),
            // @todo, should this page be an article?
            simpleLink('/horizontal-scalability'),
            simpleLink('/multizone-failover'),

            // Should this be nested somewhere else?
            simpleLink('/regions', "Global Regions and Data Residency"),
            // remove PhantomJS stuff?
            simpleLink('/external-libraries', "External Libraries", [
              simpleLink('/clamav', "ClamAV"),
            ]),
          ]),
          simpleLink('/email', 'Email', [
            simpleLink('/sendgrid', 'SendGrid'),
            simpleLink('/rerouting-outbound-email', "Rerouting outbound email during development"),
          ]),

          {
            // This is an old video that should be replaced.
            link: '/cache',
            title: 'Caching and CDN',
            children: [
              getGuideDirectory('guides/global-cdn', 'Global CDN'),
              getGuideDirectory('guides/agcdn'),
              simpleLink('/cache-control', "Cache Control Headers",[
                // Think about the order of this section
                simpleLink('/caching-advanced-topics', "Advanced Topics"),
                simpleLink('/debug-cache', "Debugging Caching"),
                simpleLink('/clear-caches', "Clearing Caches"),
                simpleLink('/cookies', "Cookies"),
                simpleLink('/pantheon_stripped'),
              ]),
              simpleLink('/custom-certificates', "Custom Certificates"),
              simpleLink('/apcu'),
              // delete this guide?
              getGuideDirectory('guides/fastly-pantheon'),

              getGuideDirectory('guides/edge-integrations', 'Edge Integrations'),
              simpleLink('/object-cache', 'Object Cache', [

                simpleLink('/object-cache/cli', 'CLI'),
                simpleLink('/object-cache/drupal', 'Drupal'),
                simpleLink('/object-cache/errors', 'Errors'),
                simpleLink('/object-cache/faq', 'FAQ'),
                simpleLink('/object-cache/remove', 'remove'),
                simpleLink('/object-cache/wordpress', 'WordPress'),
                simpleLink('/object-cache/wordpress-deprecated', 'WordPress deprecated'),
              ]),
            ]
          },
          getGuideDirectory('guides/filesystem', 'Filesystem'),
          getGuideDirectory('guides/backups'),
          // this is a landing page that could hold others.
          simpleLink('/troubleshoot', "Troubleshooting", [
            simpleLink('/basic-troubleshooting'),
            simpleLink('/timeouts'),
            simpleLink('/debug-connections'),
            getGuideDirectory('guides/errors-and-server-responses'),
            getGuideDirectory('guides/disaster-recovery', 'Disaster Recovery Playbook'),
            simpleLink('/mime-types'),
            simpleLink('/http-to-https'),
            // @todo, this page is not loading??
            simpleLink('/debug-slow-performance'),
            simpleLink('/bots-and-indexing'),
            simpleLink('/load-and-performance-testing'),
            simpleLink('/load-testing-with-blazemeter'),
            simpleLink('/modules-plugins-known-issues', "Modules and plugins with known issues"),
          ]),
          simpleLink('/pantheon-yml', "pantheon.yml File", [
            simpleLink('/nested-docroot', "Nested Docroot"),
            simpleLink('/pantheon-yml-overview', "Pantheon.yml Overview (Delete?)"),
          ]),



          simpleLink('/solr', "Search", [

            getGuideDirectory('guides/solr-drupal'),
            simpleLink('/opensolr', "Open Solr"),
          ]),

          getGuideDirectory('guides/redirect'),
          getGuideDirectory('guides/mariadb-mysql'),
          getGuideDirectory('guides/platform-considerations'),
          getGuideDirectory('guides/frontend-performance'),
          // This page is oddly short.
          simpleLink('/single-application-sites', "One app per site"),

          // This landing page could go elsewhere
          simpleLink('/performance', "Performance Consideration"),

          // This page could use a refresh
          simpleLink('/headless', "Running a Headless CMS"),

        ],
    }

};

export default webInfrastructure;
