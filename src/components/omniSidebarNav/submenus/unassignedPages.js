import { simpleLink, getGuideDirectory } from './../helpers';

const unassignedPages = () => {
  return {
    link: '/lockr',
    title: 'Unassigned',
    children: [simpleLink('/search'),
      simpleLink('/automate'),
      simpleLink('/composer'),
      simpleLink('/configure-dns'),
      simpleLink('/custom-upstreams'),
      simpleLink('/develop'),
      simpleLink('/develop-wordpress'),
      simpleLink('/drupal'),
      simpleLink('/drush'),
      simpleLink('/get-started'),
      simpleLink('/guides/decoupled'),
      getGuideDirectory('guides/integrated-composer'),
      simpleLink('/guides/wordpress-composer'),
      simpleLink('/guides/integrated-composer/ic-faq'),
      simpleLink('/guides/integrated-composer/one-click-updates'),
      simpleLink('/guides/integrated-composer/private-repo-package'),



      simpleLink('/integrations'),
      simpleLink('/lockr'),
      simpleLink('/manage'),
      simpleLink('/platform'),
      simpleLink('/search/'),
      simpleLink('/sftp'),
      simpleLink('/static-site-empty-upstream-demo'),
      simpleLink('/troubleshoot'),




      // Do these pages exist?
      // simpleLink('/guides/wordpress-composer'),
      // simpleLink('/guides/wordpress-composer/create-wp-site-composer-ci-auto-test'),
      // simpleLink('/guides/wordpress-composer/wordpress-composer-managed'),
      // simpleLink('/guides/wordpress-composer/wordpress-ic'),








    ],
  };
};

export default unassignedPages;
