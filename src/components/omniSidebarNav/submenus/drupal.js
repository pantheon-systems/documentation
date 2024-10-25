import { getGuideDirectory, simpleLink } from './../helpers';

const drupal = () => {
  return {
    link: '/drupal',
    title: 'Drupal',
    children: [
      simpleLink('/develop-drupal'),

      // This page is odd now that D11 is out.
      simpleLink('/drupal-10', 'Drupal 10'),
      // This page might belong in s a tutorial section.
      simpleLink('/drupal-advanced-page-cache'),
      simpleLink('/drupal-broken-links'),

      simpleLink('/drupal-cache'),
      simpleLink('/drupal-caching-views'),

      simpleLink('/drupal-commerce', 'Drupal Commerce'),

      // This page probably belongs in a different section.
      simpleLink('/drupal-composer-managed'),
      simpleLink('/drupal-from-dist'),
      // This is another page that felt necessary in the early days of D8.
      simpleLink('/drupal-configuration-management'),
      simpleLink('/drupal-cron'),

      simpleLink('/drupal-launch-check'),


      simpleLink('/drupal-security-patches'),
      simpleLink('/drupal-updates'),

      simpleLink('/drupal-s3'),
      simpleLink('/drupal-cloudfront'),

      simpleLink('/supported-drupal'),
      simpleLink('/services-yml'),
      simpleLink('/modules'),
      simpleLink('/modules-known-issues'),

      simpleLink('/drush'),
    ],
  };
};

export default drupal;
