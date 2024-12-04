import { getGuideDirectory, simpleLink } from './../helpers';

const pagesToDeleteorReconsider = () => {
  return {
    link: '/platform-upgrade',
    title: 'Pages to Delete or reconsider',
    children: [
      // Deprecated
      // simpleLink('/crisis-response-upstream', 'Deprecated or archived pages', [
      // This should be deprecated/archived see https://github.com/pantheon-systems/documentation/pull/9251
      // Follow up task will be to add the following to a deprecated submenu
      // getGuideDirectory('guides/edge-integrations', 'Edge Integrations'),
      // simpleLink('/drupal-updates', 'Drupal Updates'),
      // simpleLink('/crisis-response-upstream'),
      // simpleLink('/lockr'),
      // ]),
      // --- ^^ Everything above still needs to be reviewed ^^ ---
      // Things to add to new PR:
      // simpleLink('/drupal-10', 'Drupal 10'), // to /supported-drupal
      // simpleLink('/headless', 'Running a Headless CMS'), // to /guides/decoupled
      // simpleLink('/cygwin-windows'), // to /guides/local-development/cygwin-windows
      // getGuideDirectory(
      //   'guides/migrate/manual-d8-composer-to-d8',
      //   'Manual d8 to d8',
      // ), // to https://docs.pantheon.io/guides/drupal-unhosted-composer/troubleshooting
    ],
  };
};

export default pagesToDeleteorReconsider;
