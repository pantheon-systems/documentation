import { getGuideDirectory, simpleLink } from './../helpers';

const workflows = () => {
  return {
    link: '/develop',
    title: 'Development Workflows',
    children: [
      simpleLink('/develop', 'Overview'),
      // TODO: Report for Submenus and children lists that do not start with a sublink
      simpleLink('/pantheon-workflow', 'Deployment Pipeline on Pantheon', [
        simpleLink('/pantheon-workflow', 'Pantheon Workflow'),
        simpleLink('/start-state', 'Start States'),
        getGuideDirectory('guides/multidev'),
        getGuideDirectory('guides/environment-configuration'),
        simpleLink('/connection-modes', 'Connection Modes'),
        getGuideDirectory('guides/sftp', 'SFTP'),
        getGuideDirectory('guides/git', 'Git'),
        simpleLink('/core-updates', 'Core Updates'),
        simpleLink('/workflow-logs', 'Workflow Logs'),
        simpleLink('/content-staging', 'Content Staging'),
      ]),

      simpleLink('/guides/integrated-composer', 'Integrated Composer', [
        getGuideDirectory(
          'guides/integrated-composer',
          'Using Integrated Composer',
        ),
        // "a Standard Drupal Site" is now an out of date phrase.
        simpleLink('/composer-convert', 'Convert to Integrated Composer'),
        simpleLink(
          '/composer-convert-from-empty',
          'Convert from an Empty Repository',
        ),
        simpleLink(
          '/upgrade-drupal-with-ic-to-latest',
          'Upgrade a Drupal Site',
        ),
      ]),
      // This page is pretty short given the size of the topic.
      simpleLink('/automate', 'Automation & CI', [
        simpleLink('/automate', 'Overview'),
        simpleLink('/continuous-integration', 'CI Solutions'),
        getGuideDirectory('guides/build-tools', 'Build Tools'),
        simpleLink('/deploybot', 'DeployBot'),
        simpleLink('/jenkins', 'Jenkins'),
        simpleLink('/behat', 'Behat Testing'),
      ]),
      getGuideDirectory('guides/quicksilver', 'Quicksilver Workflow Hooks'),
      getGuideDirectory('guides/backups'),
      // Maybe make this a separate category for local development
      getGuideDirectory('guides/local-development', 'Local Development'),
      simpleLink('/content-publisher', 'Content Publisher'),
    ],
  };
};

export default workflows;
