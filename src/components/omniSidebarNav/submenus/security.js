import { getGuideDirectory, simpleLink } from './../helpers';

const security = () => {
  return {
    link: '/guides/security',
    title: 'Security',
    children: [
      getGuideDirectory('guides/secure-development'),

    ],
  };
};

export default security;
