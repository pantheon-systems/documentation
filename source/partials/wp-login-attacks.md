Similar to [XML-RPC](#avoid-xml-rpc-attacks), the `wp-login.php` path can be subject to abuse by bots or other spammers. Unlike XML-RPC, which is no longer used often, `wp-login.php` is the primary WordPress login.

There are a few recommended actions you can take to protect yourself against login abuse.

### Change the wp-login.php Path

Use a plugin like [WPS Hide Login](https://wordpress.org/plugins/wps-hide-login/) to change the login path from `wp-login.php` to any path you choose such as `/login` or `/admin`. Then [redirect](/advanced-redirects#redirect-one-path-to-another) all traffic from `wp-login.php` to the homepage or to another page like a `404`.

### Enforce Complex Passwords

WordPress suggests password complexity guidelines when you create a user and password, but it does not enforce password rules. Use a plugin like [Better Passwords](https://wordpress.org/plugins/better-passwords/) to set a minimum password length and alert users if they try to use a password that has been collected in a known data breach.

### Add Multi-factor Authentication (MFA)

Two Factor Authentication (2FA) and Multi-factor Authentication (MFA) are added layers of protection to ensure the security of your accounts beyond just a username and password. Multi-factor refers to the capability to have more than two factors of authentication (for example: password, SMS, and email verification). Use one of the many [Two-Factor Authentication](https://wordpress.org/plugins/tags/two-factor-authentication/) plugins to protect logins to your WordPress site.

### Use Single Sign-On (SSO)

If your organization makes use of an Identity Provider (IdP) such as Google Workspace, Microsoft AzureAD, or others for [Single Sign-On](/sso-organizations), utilize that as the login authority for your WordPress site.

Some plugins or services can simplify the SSO integration of your IdP, such as [WP SAML Auth](https://wordpress.org/plugins/wp-saml-auth/) or [MiniOrange](https://plugins.miniorange.com/wordpress).

SSO often includes or requires [MFA](#add-multi-factor-authentication-mfa) as well.
