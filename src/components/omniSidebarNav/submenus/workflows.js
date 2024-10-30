import { getGuideDirectory, simpleLink } from './../helpers';

const workflows = () => {
  return {
    link: '/pantheon-workflow',
    title: 'Development Workflows',
    children: [
      simpleLink('/pantheon-workflow', 'Deployment Pipeline on Pantheon', [
        getGuideDirectory('guides/multidev'),
        simpleLink('/connection-modes', 'Connection Modes'),
        getGuideDirectory('guides/sftp', 'SFTP'),
        getGuideDirectory('guides/git', 'Git'),
        simpleLink('/core-updates', 'Core Updates'),

        simpleLink('/hotfixes', 'Hotfixes'),
      ]),
      getGuideDirectory('guides/integrated-composer'),

      // This page is pretty short given the size of the topic.
      simpleLink('/continuous-integration', 'Continuous Integration', [
        getGuideDirectory('guides/build-tools', 'Build Tools'),
        simpleLink('/deploybot', 'DeployBot'),
        simpleLink('/jenkins', 'Jenkins'),
        simpleLink('/behat', 'Behat Testing'),
      ]),

      simpleLink('/content-staging', 'Content Staging'),
      simpleLink('/workflow-logs', 'Workflow Logs'),
      getGuideDirectory('guides/quicksilver', 'Quicksilver Workflow Hooks'),
      // Maybe make this a separate category for local development
      getGuideDirectory('guides/local-development', 'Local Development'),
      simpleLink('/visual-studio-code', 'Visual Studio Code'),
      simpleLink('/drupal-phpstorm', 'Using PHPStorm'),
    ],
  };
};

export default workflows;
