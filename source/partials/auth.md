## Authenticating

### SSH Keys

Pantheon does not provide access to a shell environment over SSH. These directions allow you to have passwordless access if you configure Git, SFTP, or Drush to use SSH keys.

You should load your public SSH key into your account to take full advantage of Pantheon. SSH keys are a best practice for authentication, allowing you more security than a simple password. You only have to configure this once, no matter how many sites you work on. Refer to [Generate and Add SSH Keys](/ssh-keys) for more information.

### Dashboard Credentials

Use your **Pantheon Dashboard** login password if you are prompted for a password when connecting to the platform.

<Alert title="Note" type="info">

If you login via social login (Connect with Google) or Single-Sign On (SSO) and you'd like to authenticate using a password, logout and visit [https://dashboard.pantheon.io/reset-password](https://dashboard.pantheon.io/reset-password) to add a password to your account.

</Alert>

<<<<<<< HEAD
Larger agencies with multiple developers using password authentication to login may see access issues across the organization. We strongly recommend using SSH keys to avoid potential authentication failures. See [Professional Workspaces](/guides/account-mgmt/workspace-sites-teams/workspaces) more information.
=======
Larger agencies with multiple developers using password authentication to login may see access issues across the workspace. We strongly recommend using SSH keys to avoid potential authentication failures. Refer to [Pantheon Workspaces FAQs](/organization-faq#why-do-login-attempts-fail-for-all-users-across-my-organization-simultaneously?) more information.
>>>>>>> 59932ef6499548bef1d203b3498cd4f595289dc7
