import { getGuideDirectory, simpleLink } from './../helpers';

const wordpress = () => {
  return {
    // @todo This page is not a good landing page.
    link: '/wordpress',
    title: 'WordPress',
    children: [

      simpleLink('/develop-wordpress', 'Developing with WordPress'),

      getGuideDirectory('guides/wordpress-developer'),
      getGuideDirectory('guides/wordpress-configurations'),

      simpleLink('/symlinks-assumed-write-access', 'Symlinks and plugins that assume write access'),


      simpleLink('/wordpress-known-issues', 'WordPress Known Issues'),
      simpleLink('/plugins-known-issues', 'Plugins and Themes with Known Issues'),
      simpleLink('/optimize-wp-options-table-autoloaded-data', 'Optimize wp_options Table and Autoloaded Data'),
      simpleLink('/guides/wordpress-composer/pre-ga'),
      getGuideDirectory('guides/woocommerce', "WooCommerce"),
      getGuideDirectory('guides/multisite', "WordPress Multisite"),
    ]
  }

};

export default wordpress;
