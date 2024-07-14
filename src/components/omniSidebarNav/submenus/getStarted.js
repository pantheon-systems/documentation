import { getGuideDirectory } from './../helpers';

const getStarted = () => {
  return {

    link: '/get-started',
    title: 'Get Started',
    children: [
      getGuideDirectory('guides/getstarted'),
      getGuideDirectory('guides/launch', 'Launch'),
      // Move to Infra?
      getGuideDirectory('guides/wordpress-pantheon', 'WordPress on Pantheon'),
    ],

  }
};

export default getStarted;
