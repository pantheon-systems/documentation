import { simpleLink, getGuideDirectory } from './../helpers';

/**
 * Array of of links specific to the Certification section of the sidebar.
 * @type {Array<Object>}
 */
const CertificationItems = () => {
  return {
    // @todo, implement sidebar on landing pages.
    link: '/certification',
    title: 'Education',
    children: [
      simpleLink('/certification/about', 'WebOps Certification', [
        {
          link: '/certification/about',
          title: 'About the Certification Program',
        },
        {
          link: '/certification/exam',
          title: 'Taking the Exam',
        },
        {
          link: '/certification/study-guide',
          title: 'Study Guide',
          children: [
            {
              link: '/certification/study-guide',
              title: 'Introduction',
            },
            {
              link: '/certification/study-guide/webops',
              title: 'Chapter 1: WebOps',
            },
            {
              link: '/certification/study-guide/platform',
              title: 'Chapter 2: Pantheon Platform',
            },
            {
              link: '/certification/study-guide/create',
              title: 'Chapter 3: Site Creation',
            },
            {
              link: '/certification/study-guide/cdn',
              title: 'Chapter 4: Content Delivery Network',
            },
            {
              link: '/certification/study-guide/cms',
              title: 'Chapter 5: CMS Infrastructure',
            },
            {
              link: '/certification/study-guide/deploy',
              title: 'Chapter 6: The Deployment Pipeline',
            },
            {
              link: '/certification/study-guide/people',
              title: 'Chapter 7: Connecting People',
            },
            {
              link: '/certification/study-guide/extend',
              title: 'Chapter 8: Extend with CLI and Hooks',
            },
            {
              link: '/certification/study-guide/automate',
              title: 'Chapter 9: Additional Automation',
            },
            {
              link: '/certification/study-guide/custom-upstreams',
              title: 'Chapter 10: Custom Upstreams',
            },
          ],
        },
        {
          link: 'https://certification.pantheon.io/',
          title: 'Certification Directory',
        },
      ]),
      simpleLink('/guides/wordpress-git', 'Tutorials', [
        getGuideDirectory('guides/wordpress-git', 'WordPress and Git'),
        simpleLink('/pivotal-tracker', 'Pivotal Tracker'),
        simpleLink('/pingdom-uptime-check', 'Pingdom Uptime Check'),

        // @todo, this page is in two menus
        simpleLink(
          '/rerouting-outbound-email',
          'Rerouting Outbound Email',
        ),
        // This is in two menus. It should probably be in just this one.
        simpleLink('/behat', 'Behat'),
        simpleLink(
          '/drupal-advanced-page-cache',
          'Drupal Advanced Page Cache',
        ),
      ]),
      simpleLink('https://learning.pantheon.io', 'Pantheon Learning'),
    ],
  };
};

export default CertificationItems;
