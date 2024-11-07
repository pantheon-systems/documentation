import { getGuideDirectory, simpleLink } from './../helpers';

const support = () => {
  return {
    link: '/guides/support',
    title: 'Support and Troubleshooting',
    children: [
      getGuideDirectory('guides/support', 'Support'),
      getGuideDirectory('guides/professional-services'),
      // Todo: relocate this to the support guide
      simpleLink('/oss-support-levels', 'Open Source Support Levels'),
      simpleLink('/basic-troubleshooting', 'Troubleshooting', [
        simpleLink('/modules-known-issues', 'Known Issues', [
          simpleLink('/modules-known-issues', 'Drupal Modules Known Issues'),
          simpleLink('/wordpress-known-issues', 'WordPress Known Issues'),
          simpleLink(
            '/plugins-known-issues',
            'WordPress Plugins and Themes with Known Issues',
          ),
          simpleLink(
            '/symlinks-assumed-write-access',
            'Symlinks and plugins that assume write access',
          ),
        ]),

        simpleLink('/basic-troubleshooting', 'Basic Troubleshooting'),
        simpleLink('/timeouts', 'Timeouts on Pantheon'),
        simpleLink('/debug-connections', 'Debugging Connectivity Issues'),
        getGuideDirectory('guides/errors-and-server-responses'),
        getGuideDirectory(
          'guides/disaster-recovery',
          'Disaster Recovery Playbook',
        ),
        simpleLink('/newrelic', 'New Relic', [
          getGuideDirectory(
            'guides/new-relic',
            'New Relic Performance Monitoring',
          ),
          getGuideDirectory('guides/pagerduty', 'Incident Management'),
        ]),
        simpleLink('/pingdom-uptime-check', 'Pingdom Uptime Check'),
        simpleLink('/mime-types', 'MIME Types'),
        simpleLink('/http-to-https', 'Switching Sites from HTTP to HTTPS'),
        // @todo, this page is not loading??
        simpleLink('/debug-slow-performance', 'Debugging Slow Performance'),
        simpleLink('/debug-cache', 'Debugging Caching'),
        simpleLink('/bots-and-indexing', 'Bots and Indexing on Pantheon'),
        // Should could move to the education menu.
        getGuideDirectory('guides/frontend-performance'),
        simpleLink(
          '/load-and-performance-testing',
          'Load and Performance Testing',
        ),
        simpleLink(
          '/load-testing-with-blazemeter',
          'Load Testing Drupal and WordPress with BlazeMeter',
        ),
        simpleLink(
          '/modules-plugins-known-issues',
          'Modules and plugins with known issues',
        ),
        simpleLink('/resetting-passwords', 'Resetting Passwords'),
      ]),
    ],
  };
};

export default support;
