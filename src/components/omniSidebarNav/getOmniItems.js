import CertificationItems from './submenus/certification';
import { getGuideDirectory } from './helpers';

const getOmniItems = () => {
  const OmniItems = [
    {
      link: '/guides/decoupled',
      title: 'Front-End Sites',
      children: [
        getGuideDirectory('guides/decoupled/wp-nextjs-frontend-starters'),
        getGuideDirectory('guides/decoupled/wp-backend-starters'),
        // @todo, add the rest of the front end guides
      ],
    },
    {
      link: '/certification',
      title: 'WebOps Certification',
      children: CertificationItems,
    }
  ];
  return OmniItems;
};

export default getOmniItems;
