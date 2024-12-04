import { getGuideDirectory, simpleLink } from './../helpers';

const accountManagement = () => {
  return {
    link: '/guides/account-mgmt',
    title: 'Manage Accounts and Workspaces',
    children: [
      simpleLink('/guides/account-mgmt', 'Overview', [
        getGuideDirectory('guides/account-mgmt/account'),
        getGuideDirectory('guides/account-mgmt/billing'),
        getGuideDirectory('guides/enterprise-billing-center'),
        getGuideDirectory('guides/account-mgmt/plans'),
        getGuideDirectory('guides/account-mgmt/traffic'),
        // Consider relocating this next one as a Q in the Plans FAQ page:
        simpleLink('/tax-exempt-status', 'Tax Exempt Status'),
        // @todo, make a new page listing all
      ]),
      simpleLink('/guides/sso', 'Single Sign-On', [
        getGuideDirectory('guides/sso'),
        simpleLink('/ldap-and-ldaps', 'LDAP and LDAPS'),
        getGuideDirectory('guides/wordpress-google-sso', 'WP SAML Auth'),
      ]),
      simpleLink(
        '/guides/account-mgmt/workspace-sites-teams',
        'Portfolio Governance',
        [
          getGuideDirectory('guides/account-mgmt/workspace-sites-teams'),
          getGuideDirectory('guides/custom-upstream'),
          getGuideDirectory('guides/autopilot', 'Autopilot Guide'),
          // Consider consolidating this next one with the one above
          getGuideDirectory('guides/autopilot-custom-upstream'),
        ],
      ),
    ],
  };
};

export default accountManagement;
