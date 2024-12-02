import { getGuideDirectory, simpleLink } from './../helpers';

const support = () => {
  return {
    link: '/support',
    title: 'Support and Troubleshooting',
    children: [
      simpleLink('/support', 'Overview'),
      getGuideDirectory('guides/support', 'Support'),
      simpleLink('/oss-support-levels', 'Open Source Support Levels'),
      getGuideDirectory(
        'guides/disaster-recovery',
        'Disaster Recovery Playbook',
      ),
      getGuideDirectory('guides/professional-services'),
      // Todo: relocate this to the support guide

      simpleLink('/basic-troubleshooting', 'Troubleshooting Errors', [
        simpleLink('/basic-troubleshooting', 'Basic Troubleshooting'),
        simpleLink('/modules-plugins-known-issues', 'Known Issues', [
          // @todo, combine some of these pages.
          simpleLink(
            '/modules-plugins-known-issues',
            'Modules and plugins with known issues',
          ),
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
        simpleLink('/timeouts', 'Timeouts and Errors', [
          simpleLink('/timeouts', 'Timeouts on Pantheon'),
          getGuideDirectory('guides/errors-and-server-responses'),
          simpleLink('/debug-connections', 'Debugging Connectivity Issues'),
        ]),
        simpleLink('/mime-types', 'MIME Types'),
        simpleLink('/resetting-passwords', 'Resetting Passwords'),
      ]),
      simpleLink('/debug-slow-performance', 'Troubleshooting Performance', [
        simpleLink('/debug-slow-performance', 'Debugging Slow Performance'),
        simpleLink('/debug-cache', 'Debugging Caching'),
        getGuideDirectory(
          'guides/new-relic',
          'New Relic Performance Monitoring',
        ),

        // Should could move to the education menu.
        getGuideDirectory(
          'guides/frontend-performance',
          'Front End Performance',
        ),
        simpleLink(
          '/load-and-performance-testing',
          'Load and Performance Testing',
          [
            simpleLink(
              '/load-testing-with-blazemeter',
              'Load Testing Drupal and WordPress with BlazeMeter',
            ),
            simpleLink('/bots-and-indexing', 'Bots and Indexing on Pantheon'),
          ],
        ),
      ]),

      simpleLink('/drupal-migration', 'Upgrading major versions of Drupal', [
        simpleLink('/drupal-migration', 'Upgrades and migrations'),
        getGuideDirectory(
          'guides/drupal/drupal-hosted-md',
          'Using Multidev to Upgrade Drupal',
        ),

        getGuideDirectory(
          'guides/drupal/drupal-hosted',
          'Upgrading without Multidev',
        ),
        getGuideDirectory(
          'guides/drupal/drupal-hosted-createempty-md',
          'Upgrading within an empty upstream',
        ),

        getGuideDirectory(
          'guides/drupal/drupal-hosted-createdashboard-set8',
          'Upgrade using a new site instance',
        ),

        getGuideDirectory(
          'guides/drupal/drupal-hosted-createcustom',
          'Custom Upstreams',
        ),
        getGuideDirectory(
          'guides/drupal/drupal-hosted-btworkflow',
          'Convert a Site to Build Tools',
        ),
        getGuideDirectory(
          'guides/drupal/drupal-hosted-createbt',
          'Updating a Site with Build Tools',
        ),
        simpleLink(
          '/switch-drupal-recommended-upstream',
          'Switch from Drupal to Drupal Composer Managed Upstream',
        ),
        simpleLink(
          '/drupal-to-build-tools',
          'Migrate a Composer-based Drupal Site to a Build Tools Site',
        ),
      ]),
    ],
  };
};

export default support;
