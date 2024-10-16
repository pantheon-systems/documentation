import { getGuideDirectory, simpleLink } from './../helpers';

const getStarted = () => {
  return {

    link: '/get-started',
    title: 'Get Started',
    children: [
      // This page is a bit short. It is also a duplicate of /guides/getstarted/signup
      simpleLink('/sign-up', "Sign Up for Pantheon"),
      getGuideDirectory('guides/getstarted'),
      // This page is kind of a landing page? Should it be in this menu?
      simpleLink('/required-reading', "Required Reading"),
      simpleLink('/dashboard', "Dashboard", [
        simpleLink('/site-dashboard', "Site Dashboard"),
        simpleLink('/personal-settings', "Personal Settings"),
        simpleLink('/add-site', "Adding a Site"),
        simpleLink('/add-site-custom-upstream', "Adding a Site with a Custom Upstream"),
        // Why is this page different from /add-site
        simpleLink('/add-site-dashboard', "Add a site"),
      ]),
      getGuideDirectory('guides/launch', 'Launch'),
      // Move to Infra? Or the WordPress Menu?
      getGuideDirectory('guides/wordpress-pantheon', 'WordPress on Pantheon'),







    ],
  }
};

export default getStarted;
