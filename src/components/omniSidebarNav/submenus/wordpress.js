import { getGuideDirectory, simpleLink } from './../helpers';

const wordpress = () => {
  return {
    // @todo This page is not a good landing page.
    link: '/wordpress',
    title: 'WordPress',
    children: [

      simpleLink('/develop-wordpress'),

      getGuideDirectory('guides/wordpress-developer'),
      getGuideDirectory('guides/wordpress-configurations'),

      simpleLink('/symlinks-assumed-write-access'),

      getGuideDirectory('guides/woocommerce', "WooCommerce"),
      getGuideDirectory('guides/multisite', "WordPress Multisite"),
      simpleLink('/wordpress-known-issues'),
    ]
  }

};

export default wordpress;
