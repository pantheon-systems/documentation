import { getGuideDirectory, simpleLink } from './../helpers';

const terminus = () => {
  return {
    link: '/terminus',
    title: 'Command Line Interface (CLI)',
    children: [
      simpleLink('/terminus', 'Terminus User Manual', [
        simpleLink('/terminus', 'Introduction'),
        simpleLink('/terminus/install', 'Install and Update Terminus'),
        simpleLink('/terminus/examples', 'Get Started'),
        simpleLink('/terminus/commands', 'Command Directory'),
        simpleLink('/terminus/scripting', 'Scripting with Terminus'),
        simpleLink('/terminus/plugins', 'Install Plugins'),
        simpleLink('/terminus/directory', 'Plugin Directory'),
        simpleLink('/terminus/create', 'Create Terminus Plugins'),
        simpleLink('/terminus/configuration', 'Terminus Configuration File'),
        simpleLink(
          '/terminus/supported-terminus',
          'Supported Terminus and PHP Versions',
        ),
        simpleLink('/terminus/updates', 'Terminus Changelog'),
        simpleLink('/terminus/terminus-3-0', 'Terminus 3'),
      ]),
      simpleLink('/machine-tokens', 'Authentication', [
        simpleLink('/machine-tokens', 'Creating and Revoking Machine Tokens'),
        simpleLink('/ssh-keys', 'SSH Keys'),
        simpleLink(
          '/terminus/ci/bitbucket',
          'Authenticate Terminus in a Bitbucket CI Pipeline',
        ),
        simpleLink(
          '/terminus/ci/circleci',
          'Authenticate Terminus in a CircleCI Pipeline',
        ),
        simpleLink(
          '/terminus/ci/github-actions',
          'Authenticate Terminus in a GitHub Actions Pipeline',
        ),
        simpleLink(
          '/terminus/ci/gitlab',
          'Authenticate Terminus in a GitLab Pipeline',
        ),
      ]),
      simpleLink('/customer-scheduled-cron-jobs', 'Scheduled Cron Jobs'),

      getGuideDirectory('guides/wp-cli', 'WP-CLI'),
      getGuideDirectory('guides/drush', 'Drush (the Drupal CLI)'),
    ],
  };
};

export default terminus;
