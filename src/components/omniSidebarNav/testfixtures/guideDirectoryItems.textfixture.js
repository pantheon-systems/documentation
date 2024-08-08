/**
 * A data fixture for used to test getGuideDirectory().
 */
const guideDirectoryItems = {
  link: '/guides/decoupled/wp-backend-starters',
  title: 'WordPress Backend Starter for Front-End Sites',
  children: [
    {
      link: '/guides/decoupled/wp-backend-starters',
      title: 'Introduction',
    },
    {
      link: '/guides/decoupled/wp-backend-starters/create',
      title: 'Create a New Project',
    },
    {
      link: '/guides/decoupled/wp-backend-starters/caching',
      title: 'Caching Recommendations',
    },
    {
      link: '/guides/decoupled/wp-backend-starters/manage-settings',
      title: 'Manage Settings',
    },
    {
      link: '/guides/decoupled/wp-backend-starters/build-hooks',
      title: 'Build Hooks',
    },
  ],
};

export default guideDirectoryItems;
