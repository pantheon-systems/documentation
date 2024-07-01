import CertificationItems from './submenus/certification';
import getGuideDirectory from './getGuideDirectory';

const getOmniItems = () => {
  const OmniItems = [
    {
      link: '/get-startedasdf',
      title: 'Get Started',
    },
    {
      link: '/guides/decoupled',
      title: 'Front-End Sites',
      children: [
        getGuideDirectory('guides/decoupled/wp-nextjs-frontend-starters'),
        getGuideDirectory('guides/decoupled/wp-backend-starters'),
      ],
    },
    {
      link: '/certification',
      title: 'WebOps Certification',
      children: CertificationItems,
    },
    {
      link: '/get-started',
      title: 'Get Started',
      children: [
        {
          link: '/get-startasdfasdfed',
          title: 'Get Started More',
        },
        {
          link: '/get-staasdfrted',
          title: 'Get Started More',
        },
      ],
    },
  ];
  return OmniItems;
};

export default getOmniItems;
