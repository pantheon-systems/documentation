import { getGuideDirectory, simpleLink } from './../helpers';

const accountManagement = () => {
  return {
    link: '/manage',
    title: 'Account Management',
    children: [
      simpleLink('/guides/account-mgmt'),
      getGuideDirectory('guides/account-mgmt/account'),
      getGuideDirectory('guides/account-mgmt/billing'),
      getGuideDirectory('guides/account-mgmt/plans'),
      getGuideDirectory('guides/account-mgmt/traffic'),
      simpleLink('/agency-tips'),

      simpleLink('/enterprise-billing-center'),

      simpleLink('/tax-exempt-status'),


      // empty page?
      simpleLink('/platform-notifications'),



      getGuideDirectory('guides/account-mgmt/workspace-sites-teams'),
      getGuideDirectory('guides/enterprise-billing-center'),
      simpleLink('/ldap-and-ldaps'),
      getGuideDirectory('guides/sso'),
      getGuideDirectory('guides/wordpress-google-sso', 'WP SAML Auth'),
      // @todo, this page is oddly short.
      simpleLink('/support'),
      getGuideDirectory('guides/support', 'Support'),
      getGuideDirectory('guides/professional-services'),

      getGuideDirectory('guides/domains'),
      // @todo, TOC doesn't work on this page
      simpleLink('/custom-upstreams'),

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
