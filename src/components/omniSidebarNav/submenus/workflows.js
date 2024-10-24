import { getGuideDirectory, simpleLink } from './../helpers';

const workflows = () => {
  return {
    link: '/develop',
    title: 'Development workflows',
    children: [
      simpleLink('/pantheon-workflow', "Code Workflow"),
      getGuideDirectory('guides/git', "Git"),
      simpleLink('/hotfixes', "Hotfixes"),
      getGuideDirectory('guides/multidev'),
      // This page has a redirect on the live site??
      simpleLink('/sftp'),
      simpleLink('/core-updates', "Core Updates"),
      // This page is pretty short given the size of the topic.
      simpleLink('/continuous-integration', "Continuous Integration"),
      getGuideDirectory('guides/integrated-composer'),
      simpleLink('/composer'),
      simpleLink('/composer-convert'),
      simpleLink('/composer-convert-from-empty'),
      simpleLink('/partial-composer'),
      simpleLink('/customer-scheduled-cron-jobs', "Scheduled Cron Jobs"),
      simpleLink('/connection-modes', "Connection Modes", [
        getGuideDirectory('guides/sftp', 'SFTP'),

      ]),
      // Todo, combine these into with guides/new-relic
      simpleLink('/newrelic', "New Relic"),
      getGuideDirectory('guides/new-relic', 'New Relic Performance Monitoring'),
      getGuideDirectory('guides/wordpress-composer', 'WordPress and Composer'),

      simpleLink('/workflow-logs', "Workflow Logs"),
      getGuideDirectory('guides/quicksilver', 'Quicksilver Workflow Hooks'),
      getGuideDirectory('guides/local-development', 'Local Development'),
      // maybe move this to a "tutorial" section
      getGuideDirectory('guides/wordpress-git', 'WordPress and Git'),
      getGuideDirectory('guides/build-tools', "Build Tools"),
    ],
  }

};

export default workflows;
