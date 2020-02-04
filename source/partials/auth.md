## Authenticating
### SSH Keys
To take full advantage of Pantheon, you should load your public SSH key into your account. SSH keys are a best practice for authentication, allowing you more security than a simple password. You will only need to do this once, no matter how many sites you work on. For more details, see [Generate and Add SSH Keys](/ssh-keys).

<Alert title="Note" type="info">

Pantheon does not provide access to a shell environment over SSH. These directions allow you to have passwordless access if you configure Git, SFTP, or Drush to use SSH keys.

</Alert>

### Dashboard Credentials
If you are prompted for a password when connecting to the platform, use your **Pantheon Dashboard** login password to gain access.

<Alert title="Note" type="info">

If you login via social login (Connect with Google) or Single-Sign On (SSO) and you'd like to authenticate using a password, logout and visit [https://dashboard.pantheon.io/reset-password](https://dashboard.pantheon.io/reset-password) to add a password to your account.

</Alert>

Larger agencies with multiple developers using password authentication who login frequently may see access issues across the organization. To avoid potential authentication failures, we strongly recommend using SSH keys. For details, see [Pantheon Organizations FAQs](/organization-faq#why-do-login-attempts-fail-for-all-users-across-my-organization-simultaneously?).

