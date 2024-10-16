import { getGuideDirectory, simpleLink } from './../helpers';

const wordpress = () => {
  return {
    // @todo This page is not a good landing page.
    // @todo, rename this url to /wordpress after the existing /wordpress is deleted.
    link: '/develop-wordpress',
    title: 'Using WordPress with Pantheon',
    children: [
      getGuideDirectory('guides/wordpress-pantheon', 'WordPress on Pantheon'),
      getGuideDirectory('guides/wordpress-developer'),
      getGuideDirectory('guides/wordpress-configurations'),
      simpleLink('/symlinks-assumed-write-access', 'Symlinks and plugins that assume write access'),
      getGuideDirectory('guides/multisite', "WordPress Multisite"),
      getGuideDirectory('guides/woocommerce', "WooCommerce"),
      simpleLink('/wordpress-known-issues', 'WordPress Known Issues', [
        // @todo: add installing from third party sources doc here
        simpleLink('/plugins-known-issues', 'Plugins and Themes with Known Issues'),
        simpleLink('/optimize-wp-options-table-autoloaded-data', 'Optimize wp_options Table and Autoloaded Data'),
      ]),
    ]
  }

};

export default wordpress;
