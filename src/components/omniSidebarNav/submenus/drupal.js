import { getGuideDirectory, simpleLink } from './../helpers';

const drupal = () => {
  return {
    link: '/drupal',
    title: 'Drupal',
    children: [
      simpleLink('/drupal-10'),
      simpleLink('/drupal-advanced-page-cache'),
      simpleLink('/drupal-broken-links'),
      simpleLink('/drupal-cache'),
      simpleLink('/drupal-caching-views'),
      simpleLink('/drupal-cloudfront'),
      simpleLink('/drupal-commerce'),
      simpleLink('/drupal-composer-managed'),
      simpleLink('/drupal-configuration-management'),
      simpleLink('/drupal-cron'),
      simpleLink('/drupal-from-dist'),
      simpleLink('/drupal-launch-check'),
      simpleLink('/drupal-migration'),
      simpleLink('/drupal-phpstorm'),
      simpleLink('/drupal-s3'),
      simpleLink('/drupal-security-patches'),
      simpleLink('/drupal-to-build-tools'),
      simpleLink('/drupal-updates'),
      simpleLink('/unwind-drupal-multisite'),
      simpleLink('/upgrade-drupal-with-ic-to-latest'),


      simpleLink('/switch-drupal-recommended-upstream'),


    ]
  }

};

export default drupal;
