import { getGuideDirectory, simpleLink } from './../helpers';

const wordpress = () => {
  return {
    // @todo This page is not a good landing page.
    // @todo, rename this url to /wordpress after the existing /wordpress is deleted.
    link: '/develop-wordpress',
    title: 'Using WordPress with Pantheon',
    children: [
      // Todo: reconcile these 2:
      getGuideDirectory('guides/wordpress-pantheon', 'WordPress on Pantheon'),
      // Todo: relocate the aws s3 page to webinfra filesystem submenu
      getGuideDirectory('guides/wordpress-developer'),

      getGuideDirectory('guides/wordpress-configurations'),
      getGuideDirectory('guides/multisite', 'WordPress Multisite'),
      getGuideDirectory('guides/woocommerce', 'WooCommerce'),
      // @todo: add installing from third party sources doc here
    ],
  };
};

export default wordpress;
