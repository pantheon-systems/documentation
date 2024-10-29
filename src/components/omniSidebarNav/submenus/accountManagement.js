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
      simpleLink('/enterprise-billing-center', 'Enterprise Billing Center'),
      simpleLink('/tax-exempt-status', 'Tax Exempt Status'),
      getGuideDirectory('guides/account-mgmt/workspace-sites-teams'),
      getGuideDirectory('guides/enterprise-billing-center'),
      getGuideDirectory('guides/sso'),
      simpleLink('/ldap-and-ldaps', 'LDAP and LDAPS'),
      getGuideDirectory('guides/wordpress-google-sso', 'WP SAML Auth'),
      // @todo, TOC doesn't work on this page. And this page should probably be combined with guides/custom-upstream
      simpleLink('/custom-upstreams', 'Custom Upstreams', [
        getGuideDirectory('guides/custom-upstream'),
        getGuideDirectory('guides/autopilot-custom-upstream'),
        simpleLink('/unwind-drupal-multisite'),
      ]),
      getGuideDirectory('guides/autopilot', 'Autopilot Guide'),
      simpleLink('/billing', 'Billing'),
    ],
  };
};

export default accountManagement;
