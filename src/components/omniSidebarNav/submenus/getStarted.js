import { getGuideDirectory, simpleLink } from './../helpers';

const getStarted = () => {
  return {

    link: '/get-started',
    title: 'Get Started',
    children: [
      getGuideDirectory('guides/getstarted'),
      simpleLink('/required-reading'),

      getGuideDirectory('guides/launch', 'Launch'),
      // Move to Infra?
      getGuideDirectory('guides/wordpress-pantheon', 'WordPress on Pantheon'),

      simpleLink('/dashboard'),
      simpleLink('/site-dashboard'),
      simpleLink('/personal-settings'),
      simpleLink('/add-site'),
      simpleLink('/add-site-custom-upstream'),
      simpleLink('/add-site-dashboard'),
      simpleLink('/sign-up'),


    ],
  }
};

export default getStarted;
