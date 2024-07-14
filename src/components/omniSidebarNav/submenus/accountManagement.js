import { getGuideDirectory, simpleLink } from './../helpers';

const accountManagement = () => {
  return {
    link: '/manage',
    title: 'Account Management',
    children: [
      getGuideDirectory('guides/account-mgmt/account'),
      getGuideDirectory('guides/account-mgmt/billing'),
      getGuideDirectory('guides/account-mgmt/plans'),
      getGuideDirectory('guides/account-mgmt/traffic'),
      getGuideDirectory('guides/account-mgmt/workspace-sites-teams'),
      getGuideDirectory('guides/enterprise-billing-center'),
      getGuideDirectory('guides/sso'),
      getGuideDirectory('guides/wordpress-google-sso', 'WP SAML Auth'),
      // @todo, this page is oddly short.
      simpleLink('/support'),
      getGuideDirectory('guides/support', 'Support'),
      getGuideDirectory('guides/professional-services'),

      getGuideDirectory('guides/domains'),
      getGuideDirectory('guides/custom-upstream'),
      getGuideDirectory('guides/secure-development'),
      simpleLink('/autopilot', 'Autopilot Overview'),
      getGuideDirectory('guides/autopilot', 'Autopilot Guide'),
      getGuideDirectory('guides/autopilot-custom-upstream'),
      simpleLink('/ssh-keys'),
      simpleLink('/billing'),

    ],
  }

};

export default accountManagement;
