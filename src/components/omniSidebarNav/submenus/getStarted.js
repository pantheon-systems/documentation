import { getGuideDirectory, simpleLink } from './../helpers';

const getStarted = () => {
  return {
    // @todo, implement sidebar on landing pages.
    link: '/get-started',
    title: 'Get Started',
    children: [
      getGuideDirectory('guides/getstarted'),
      // This page is kind of a landing page? Should it be in this menu?
      simpleLink('/required-reading', "Required Reading"),
      simpleLink('/dashboard', "Dashboard", [
        simpleLink('/site-dashboard', "Site Dashboard"),
        simpleLink('/personal-settings', "Personal Settings"),
        simpleLink('/add-site-custom-upstream', "Adding a Site with a Custom Upstream"),
      ]),
    ],
  }
};

export default getStarted;
