import { getGuideDirectory, simpleLink } from './../helpers';

const dnsProviders = () => {
  return {
    link: '/asdfasdf',
    title: 'Pages to Delete or reconsider',
    children: [
      simpleLink('/workshops'),


      // This is a really small page.
      simpleLink('/add-site-clone'),
      simpleLink('/supported-wp'),
      simpleLink('/cygwin-windows'),
      simpleLink('/faq', "FAQ"),

      // This page is already deleted in the main branch.
      simpleLink('/guides/wordpress-composer/pre-ga'),
      simpleLink('/wordpress', "WordPress changelog"),
      // Deprecated
      simpleLink('/crisis-response-upstream'),
      simpleLink('/static-site-empty-upstream'),
      simpleLink('/static-site-empty-upstream-demo'),

      // This page is pretty empty
      simpleLink('/overview'),

       // minimal landing page
      simpleLink('/addons'),
      // Maybe we should keep some of these landing listing and just have
      // no sidebar for them.
      simpleLink('/guides'),
      simpleLink('/guides/security'),
      simpleLink('/products'),

      // This page is a bit short. It is also a duplicate of /guides/getstarted/signup
      simpleLink('/sign-up', "Sign Up for Pantheon"),
      // This duplicates /guides/getstarted/addsite
      simpleLink('/add-site', "Adding a Site"),
      // Non-dupe content on this page should be moved to /guides/getstarted/addsite
      simpleLink('/add-site-dashboard', "Add a site"),

      // Has unsupported "product" upstreams Panopoly and OpenAtrium
      simpleLink('/start-state'),




      // @todo, this page seems like it should be an article.
      simpleLink('/cloud-optimization'),

      // This is a page about the move from Rackspace to Google Cloud
      simpleLink('/platform-upgrade'),




      simpleLink('/certificate-bundles'),


    ]
  }

};

export default dnsProviders;
