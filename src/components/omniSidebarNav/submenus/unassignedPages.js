import { getGuideDirectory, simpleLink } from './../helpers';

const unassignedPages = () => {
  return {
    link: '/asdfasdfasdf',
    title: 'Unassigned',
    children: [

      simpleLink('/automate'),


      simpleLink('/certificate-bundles'),

      // drupal
      simpleLink('/clamav'),

      simpleLink('/clear-caches'),
      simpleLink('/cookies'),
      simpleLink('/client-ip'),

      // @todo, this page is not loading??
      simpleLink('/cloud-optimization'),



      simpleLink('/composer'),
      simpleLink('/composer-convert'),
      simpleLink('/composer-convert-from-empty'),

      simpleLink('/content-staging'),
      simpleLink('/continuous-integration'),


      simpleLink('/crisis-response-upstream'),
      simpleLink('/dashboard'),
      simpleLink('/site-dashboard'),






      // remove PhantomJS stuff?
      simpleLink('/external-libraries'),



      simpleLink('/guides'),
      simpleLink('/guides/account-mgmt'),
      simpleLink('/guides/security'),
      simpleLink('/guides/wordpress-composer/pre-ga'),
      simpleLink('/integrations'),
      simpleLink('/load-and-performance-testing'),
      simpleLink('/load-testing-with-blazemeter'),






      simpleLink('/optimize-wp-options-table-autoloaded-data'),
      simpleLink('/oss-support-levels'),
      simpleLink('/overview'),


      simpleLink('/partial-composer'),
      simpleLink('/personal-settings'),
      simpleLink('/pivotal-tracker'),

      simpleLink('/platform-upgrade'),
      simpleLink('/products'),
      simpleLink('/relaunch'),
      simpleLink('/required-reading'),
      simpleLink('/rerouting-outbound-email'),
      simpleLink('/resetting-passwords'),
      simpleLink('/sendgrid'),
      simpleLink('/sign-up'),
      simpleLink('/single-application-sites'),
      simpleLink('/start-state'),
      simpleLink('/static-site-empty-upstream'),
      simpleLink('/static-site-empty-upstream-demo'),


      simpleLink('/tax-exempt-status'),



      simpleLink('/workflow-logs'),





      simpleLink('/addons'),
      simpleLink('/'),
      simpleLink('/add-site'),
      simpleLink('/add-site-custom-upstream'),
      simpleLink('/add-site-dashboard'),





    ],
  }

};

export default unassignedPages;
