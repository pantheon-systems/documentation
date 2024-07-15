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




      simpleLink('/doc-template'),


      simpleLink('/external-libraries'),



      simpleLink('/guides'),
      simpleLink('/guides/account-mgmt'),
      simpleLink('/guides/security'),
      simpleLink('/guides/wordpress-composer/pre-ga'),
      simpleLink('/integrations'),
      simpleLink('/jenkins'),
      simpleLink('/load-and-performance-testing'),
      simpleLink('/load-testing-with-blazemeter'),






      simpleLink('/optimize-wp-options-table-autoloaded-data'),
      simpleLink('/oss-support-levels'),
      simpleLink('/overview'),


      simpleLink('/partial-composer'),
      simpleLink('/performance'),
      simpleLink('/personal-settings'),
      simpleLink('/pingdom-uptime-check'),
      simpleLink('/pivotal-tracker'),

      simpleLink('/platform-upgrade'),
      simpleLink('/plugins-known-issues'),
      simpleLink('/products'),
      simpleLink('/relaunch'),
      simpleLink('/required-reading'),
      simpleLink('/rerouting-outbound-email'),
      simpleLink('/resetting-passwords'),
      simpleLink('/sendgrid'),
      simpleLink('/server_name-and-server_port'),
      simpleLink('/sign-up'),
      simpleLink('/single-application-sites'),
      simpleLink('/start-state'),
      simpleLink('/static-site-empty-upstream'),
      simpleLink('/static-site-empty-upstream-demo'),


      simpleLink('/tax-exempt-status'),



      simpleLink('/workflow-logs'),

      // about docs
      simpleLink('/code-of-conduct'),
      simpleLink('/contribute'),
      simpleLink('/pantheon-community'),
      simpleLink('/trainers'),
      simpleLink('/style-guide'),
      simpleLink('/faq'),
      simpleLink('/glossary/'),
      simpleLink('/search/'),
      simpleLink('/inclusive-language'),





      simpleLink('/addons'),
      simpleLink('/'),
      simpleLink('/add-site'),
      simpleLink('/add-site-custom-upstream'),
      simpleLink('/add-site-dashboard'),





    ],
  }

};

export default unassignedPages;
