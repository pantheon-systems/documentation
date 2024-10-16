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
      // This page is more about integrating Cloud front. It might belong in integrations.
      simpleLink('/drupal-cloudfront'),
      simpleLink('/drupal-commerce', "Drupal Commerce"),

      // This page probably belongs in a different section.
      simpleLink('/drupal-composer-managed'),
      simpleLink('/drupal-from-dist'),
      // This is another page that felt necessary in the early days of D8.
      simpleLink('/drupal-configuration-management'),
      simpleLink('/drupal-cron'),

      simpleLink('/drupal-launch-check'),
      simpleLink('/drupal-migration'),
      // We have another page on VS Code. Should these be combined?
      simpleLink('/drupal-phpstorm', "Using PHPStorm"),
      simpleLink('/drupal-s3'),
      simpleLink('/drupal-security-patches'),
      simpleLink('/drupal-updates'),
      simpleLink('/unwind-drupal-multisite'),
      simpleLink('/upgrade-drupal-with-ic-to-latest'),



      simpleLink('/switch-drupal-recommended-upstream'),


      simpleLink('/supported-drupal'),
      simpleLink('/services-yml'),
      simpleLink('/modules'),
      simpleLink('/modules-known-issues'),

      simpleLink('/drush'),



    ]
  }

};

export default drupal;
