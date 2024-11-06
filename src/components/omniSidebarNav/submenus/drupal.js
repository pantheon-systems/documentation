import { getGuideDirectory, simpleLink } from './../helpers';

const drupal = () => {
  return {
    link: '/drupal',
    title: 'Drupal',
    children: [
      simpleLink('/supported-drupal', 'Drupal on Pantheon', [
        simpleLink('/supported-drupal', 'Supported Drupal Versions'),
        simpleLink('/modules', 'Pantheon Modules'),
        simpleLink('/drupal-launch-check', 'Status Report'),
        // This is another page that felt necessary in the early days of D8.
        simpleLink(
          '/drupal-configuration-management',
          'Configuration Management Workflow',
        ),
        simpleLink('/services-yml', 'Services Files'),
        simpleLink('/drupal-cron', 'Drupal Cron'),
        // Check if this page is referenced from hermes.
        simpleLink('/drupal-caching-views', 'Views Caching'),
        // Recommendations are potentially out of date (empty upstream instead of IC)
        simpleLink(
          '/drupal-from-dist',
          'Create a Drupal Site Using a Drupal Distribution',
        ),
      ]),
    ],
  };
};

export default drupal;
