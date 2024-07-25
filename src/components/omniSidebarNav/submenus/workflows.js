import { getGuideDirectory, simpleLink } from './../helpers';

const workflows = () => {
  return {
    link: '/develop',
    title: 'Development workflows',
    children: [
      simpleLink('/pantheon-workflow', "Code Workflow"),
      getGuideDirectory('guides/git', "Git"),
      simpleLink('/hotfixes'),
      getGuideDirectory('guides/multidev'),
      // This page has a redirect on the live site??
      simpleLink('/sftp'),
      simpleLink('/core-updates'),






      simpleLink('/continuous-integration'),



      simpleLink('/composer'),
      simpleLink('/composer-convert'),
      simpleLink('/composer-convert-from-empty'),
      simpleLink('/partial-composer'),





      simpleLink('/customer-scheduled-cron-jobs'),


      simpleLink('/connection-modes', "Connection Modes", [
        getGuideDirectory('guides/sftp', 'SFTP'),

      ]),

      simpleLink('/newrelic'),
      getGuideDirectory('guides/new-relic', 'New Relic Performance Monitoring'),
      getGuideDirectory('guides/wordpress-composer', 'WordPress and Composer'),
      getGuideDirectory('guides/wp-cli', 'WP-CLI'),
      getGuideDirectory('guides/drush', 'Drush (the Drupal CLI)'),

      simpleLink('/workflow-logs'),


      getGuideDirectory('guides/quicksilver', 'Quicksilver Workflow Hooks'),
      getGuideDirectory('guides/local-development', 'Local Development'),
      // maybe move this to a "tutorial" section
      getGuideDirectory('guides/wordpress-git', 'WordPress and Git'),
      getGuideDirectory('guides/build-tools', "build tools"),
      {
        link: '/asdfasdf',
        title: 'Random Tutorials',
        children: [
          simpleLink('/content-staging', "Content Staging"),

          simpleLink('/behat', "Behat Testing"),
          simpleLink('/visual-studio-code', "Visual Studio Code"),
        ]
      },
    ],
  }

};

export default workflows;
