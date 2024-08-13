---
title: WordPress Developer's Guide
subtitle: Avoid WordPress Login Attacks
description: Learn how to avoid WordPress login attacks.
contenttype: [guide]
innav: [false]
categories: [security]
cms: [wordpress]
audience: [development]
product: [--]
integration: [--]
tags: [workflow, security, composer]
reviewed: "2022-05-16"
showtoc: true
permalink: docs/guides/wordpress-developer/wordpress-login-attacks
---

This section provides information on how to avoid WordPress login attacks.

## Avoid WordPress Login Attacks

`wp-login.php` is the primary WordPress login path and is subject to abuse by bots or other spammers, similar to [XML-RPC](#avoid-xml-rpc-attacks).

There are a few recommended actions you can take to protect yourself against login abuse.

### Change the Admin Account Name

We strongly recommend that you change your admin account name. Many attacks assume the default name, `admin`.

1. Create a new user with administrator rights.

1. Log in with the new username, and then delete the `admin` user.

### Change the wp-login.php Path

1. Use a plugin like [WPS Hide Login](https://wordpress.org/plugins/wps-hide-login/) to change the login path from `wp-login.php` to any path you choose, such as `/login` or `/admin`.

1. [Redirect](/guides/redirect/advanced#redirect-one-path-to-another) all traffic from `wp-login.php` to the homepage or to another page like a `404`.

### Enforce Complex Passwords

WordPress suggests password complexity guidelines when you create a user and password, but it does not enforce password rules.

1. Install a plugin like [Better Passwords](https://wordpress.org/plugins/better-passwords/).

1. Set a minimum password length in the plugin and alert users if they try to use a password that has been collected in a known data breach.

### Disable "Anyone Can Register"

Some attackers or lost visitors might try to create an account via the login page. This feature should be disabled.

1. Navigate to you WordPress admin page.

1. Select the **Settings** tab and uncheck **Anyone can register** on the **Membership** line.

### Add Multi-factor Authentication (MFA)

Two Factor Authentication (2FA) and Multi-factor Authentication (MFA) are added layers of protection to ensure the security of your accounts beyond a username and password. Multi-factor refers to the capability to have more than two factors of authentication (for example: password, SMS, and email verification).

Use one of the many [Two-Factor Authentication](https://wordpress.org/plugins/tags/two-factor-authentication/) plugins to protect logins to your WordPress site.

### Use Single Sign-On (SSO)

SSO often includes or requires [MFA](#add-multi-factor-authentication-mfa) to help secure your site. Some workspaces use an Identity Provider (IdP) for [Single Sign-On](/guides/sso/sso-organizations), including, Google Workspace and Microsoft AzureAD.

1. Use your IdP's SSO as the login authority for your WordPress site.

1. Optional. Use plugins, such as [WP SAML Auth](https://wordpress.org/plugins/wp-saml-auth/) or [MiniOrange](https://plugins.miniorange.com/wordpress), to simplify the SSO integration with your IdP.

### Block the `/users` REST Endpoint for Unauthenticated Users

The WordPress REST API endpoint at `/wp-json/wp/v2/users` shows a full list of all usernames on a WordPress site and associated metadata for users who have at least one published post in a public post type. While this information is available elsewhere, it can occasionally be prudent to disallow access to this list of users to unauthenticated users. Note: this should not _replace_ any of the other methods of avoiding attacks described above. Good site security should involve more than simply hiding the list of users on a site (especially when that information is already available, for example, in the site's HTML markup).

Refer to the [WordPress Best Practices](/guides/wordpress-developer/wordpress-best-practices#option-2-block-only-the-users-wordpress-rest-endpoint) doc for a code snippet that you can use to block anonymous access to `/users`.

## More Resources

- [Using WP SAML Auth with Google Apps](/guides/wordpress-google-sso/)
- [WordPress Security](/guides/wordpress-pantheon/wp-security)
- [Secure Development on Pantheon](/guides/secure-development)
