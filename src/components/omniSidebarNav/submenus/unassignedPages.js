import { simpleLink, getGuideDirectory } from './../helpers';

const unassignedPages = () => {
  return {
    link: '/lockr',
    title: 'Unassigned',
    children: [


      simpleLink('/lockr'),












      // Do these pages exist?
      // simpleLink('/guides/wordpress-composer'),
      // simpleLink('/guides/wordpress-composer/create-wp-site-composer-ci-auto-test'),
      // simpleLink('/guides/wordpress-composer/wordpress-composer-managed'),
      // simpleLink('/guides/wordpress-composer/wordpress-ic'),
    ],
  };
};

export default unassignedPages;
