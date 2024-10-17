import { getGuideDirectory, simpleLink } from './../helpers';

const frontEndSites = () => {
  return {
    link: '/guides/decoupled',
    title: 'Front-End Sites and Starter Kits',
    children: [
      getGuideDirectory('guides/decoupled/overview'),
      getGuideDirectory('guides/decoupled/wp-nextjs-frontend-starters'),
      getGuideDirectory('guides/decoupled/wp-backend-starters'),
      getGuideDirectory('guides/decoupled/wp-gatsby-frontend-starters'),
      getGuideDirectory('guides/decoupled/drupal-backend-starters'),
      getGuideDirectory('guides/decoupled/drupal-nextjs-frontend-starters'),
      getGuideDirectory('guides/decoupled/no-starter-kit'),
    ],
  }

};

export default frontEndSites;
