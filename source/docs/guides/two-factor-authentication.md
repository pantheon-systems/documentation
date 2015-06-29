---
title: Secure Your Site with Two-Factor Authentication
description: Set up two-factor authentication on your Pantheon Drupal or WordPress site as an added security measure.
category:
  - developing
  - managing
  - drupal
  - wordpress
authors:
  - populist
date: 4/13/2015
image: https.pantheon.io/docs/assets/images/pantheon-fistbump.png
keywords: Drupal, WordPress, security, two-factor auth, 2fa, onelogin, Pantheon
---
Two-factor authentication (TFA) is a security practice that requires users of your website to provide, along with their standard username and password, an additional form of authentication to log in. The two most common methods involve authentication through an SMS message, or a one-time code generated via an application on a user’s mobile phone. More advanced methods such as using a biometric information, location through GPS, or a hardware token are also possible. For more information, see [Multi Factor Authentication in Drupal Watchdog](http://drupalwatchdog.com/volume-2/issue-2/multi-factor-authentication) and [Two Step Authentication on WordPress.org](http://codex.wordpress.org/Two_Step_Authentication).

## Benefits of Two-Factor Authentication

Two-factor authentication is a helpful security practice because it prevents attackers from compromising accounts by requiring an extra authentication method beyond only using a password to log in. This is important because standard password access can be easy to bypass if the user has a simple password that's easy to guess, is observed typing in their password, or has used their password on another site that becomes compromised. By requiring a second form of authentication (especially one tied to a physical device like a mobile phone or a USB key), would-be attackers not only have to compromise a user’s password, but also their mobile phone or physical USB key, which makes the attack much more difficult.

## Set Up Two-Factor Authentication With WordPress (Single Site)

For a single site, there are many different [WordPress plugins for two-factor authentication](https://wordpress.org/plugins/tags/two-factor-authentication) that can provide TFA capabilities to your site. One of the most popular is the [Clef plugin](https://wordpress.org/plugins/wpclef/) which makes it easy to set up two-factor authentication on your WordPress site.

1. Install and activate the [Clef plugin](https://wordpress.org/plugins/wpclef/) on your WordPress site.
2. Download and set up the [Clef mobile app](https://getclef.com/apps/) on either iOS or Android.
3. Use the app on your mobile phone to scan the “wave” provided by Clef to connect your mobile phone to the website.
![TFA Wave Setup](/source/docs/assets/images/tfa-wave-setup.png)
4. Configure the [security settings for the Clef plugin](http://support.getclef.com/article/60-recommended-password-settings-for-clef-wordpress-plugin) to **Disable passwords for Clef users** and create a private **Override URL**, which allows users to log in with their passwords if needed.
5. Log in to your WordPress site by using the Clef mobile app to scan the “wave” provided on the WordPress login form.
![TFA Wave Login](/source/docs/assets/images/tfa-wave-login.png)


## Set Up Two-Factor Authentication With WordPress (Organization)

For an organization-wide solution, there are many different [WordPress plugins for single sign on](https://wordpress.org/plugins/tags/single-sign-on) that can provide TFA capabilities. One of the service options we use internally at Pantheon is OneLogin, which has a [OneLogin WordPress plugin](https://wordpress.org/plugins/onelogin-saml-sso/). '

### OneLogin Instructions

1. Sign up and create a [OneLogin account](https://www.onelogin.com/) for your organization.
2. Install the WordPress SAML 2.0 app connector as part of the OneLogin dashboard. This needs to be done for each WordPress site that is being managed by OneLogin.
3. Edit the OneLogin WordPress app connector to provide the appropriate default values for the Configuration section. Other sections should already be set up correctly.
![TFA OneLogin Config](/source/docs/assets/images/tfa-wp-onelogin-config.png)
4. **(Optional)** Configure the **Authentication Factors** found under Settings for a list of authentication factors you can enable for your different users.
![TFA OneLogin Methods](/source/docs/assets/images/tfa-onelogin-tfa-methods.png)
5. Create user accounts in the Users Administration area of OneLogin, and click **New User**. Make sure that the “Username” and "Email" fields in OneLogin match their WordPress username and email.
![TFA OneLogin New User](/source/docs/assets/images/tfa-onelogin-new-user.png)

### WordPress Instructions

1. Install and activate the [OneLogin plugin](https://wordpress.org/plugins/onelogin-saml-sso/) on your WordPress site.
2. Configure the **Identity Provider Settings** in the SSO/SAML Settings within the WordPress Admin to provide the appropriate values, which are available in the SSO section of the OneLogin Configuration page.
![TFA OneLogin Ident](/source/docs/assets/images/tfa-wp-onelogin-ident.png)
3. Configure the **Attribute** in the SSO/SAML Settings in the WordPress Admin with what is shown in the screenshot; values are case-sensitive.
![TFA OneLogin Attributes](/source/docs/assets/images/tfa-wp-onelogin-attribute.png)
4. Configure the **Customize Actions and Links** in the SSO/SAML Settings within the WordPress Admin to **Prevent local login**. This requires OneLogin as the authentication solution.
![TFA OneLogin Custom Actions](/source/docs/assets/images/tfa-onelogin-custom-actions.png)
5. Now use the OneLogin dashboard to log in to your WordPress site!

## Setting Up Two-Factor Authentication With Drupal (Single Site)

For a single site, there are a few [different Drupal modules](https://groups.drupal.org/node/235938) including the [Two-Factor Authentication module](https://www.drupal.org/project/tfa) that provide the foundation necessary to use two-factor authentication on a Drupal site. In addition to the foundation module, you also will need to use a specific TFA module plugin to implement your preferred TFA method. Several of the common TFA methods such as SMS or Time-Based One Time Password are available in the [TFA Base plugins module](https://www.drupal.org/project/tfa_basic). There are also developer instructions to [write your own TFA plugin](https://www.drupal.org/node/1663240#dev).

1. Install and enable the [TFA module](https://www.drupal.org/project/tfa) and the [TFA Basic plugins module](https://www.drupal.org/project/tfa_basic) on your Drupal site.
2. Download and set up a Time-based One-time Password Algorithm (TOTP) app such as [Authy](https://www.authy.com/users) for either iOS or Android.
3. Configure the TFA module `admin/config/people/tfa` to **Enable TFA**; set **TOTP** as the default validation plugin; add **Recovery Codes** as a fallback plugin; and allow **Trusted Browsers** for your domain.
![TFA Module Settings](/source/docs/assets/images/tfa-drupal-module-settings.png)
4. Go to the Security settings on each user profile you want to use TFA, and click **Enable TFA**.
5. Enter your current password, and view the TFA Setup - Application page.
![TFA setup](/source/docs/assets/images/tfa-drupal-otp-setup.png)
6. Use the app on your mobile phone to scan the QR code to install a new TFA account on your mobile phone.
7. Enter the six digit TFA code on your mobile app for your specific site to complete the setup. You will then be prompted to confirm a trusted browser (which is optional and will skip TFA on that browser in the future), and to write down TFA recovery codes (best practice).
8. Log in to your Drupal site by using the TOTP mobile app to generate a six digit code.
![TFA setup](/source/docs/assets/images/tfa-drupal-login.png)


## Set Up Two-Factor Authentication With Drupal (Organization)

For an organization-wide solution, there are many different [Drupal modules for single sign on](https://groups.drupal.org/node/182004) that can also provide TFA capabilities. One of the service options we use internally at Pantheon is OneLogin, which has a [OneLogin Drupal module](https://www.drupal.org/project/onelogin).

### OneLogin Instructions

1. Sign up and create a [OneLogin account](https://www.onelogin.com/) for your organization.
2. Install the Drupal SAML 2.0 app connector as part of the OneLogin dashboard. This will need to be done for each Drupal site that is being managed by OneLogin.
3. Edit the OneLogin Drupal app connector to provide the appropriate default values for the Configuration section. Other sections should already be set up correctly.
![TFA OneLogin Config](/source/docs/assets/images/tfa-drupal-onelogin-config.png)
4. **(Optional)** Configure the **Authentication Factors** found under Settings for a list of authentication factors you can enable for your different users.
![TFA OneLogin Methods](/source/docs/assets/images/tfa-onelogin-tfa-methods.png)
5. Create user accounts in the Users Administration area in OneLogin, and click **New User**. Make sure that the “Username” and "Email" fields in OneLogin match their Drupal username and email.
![TFA OneLogin New User](/source/docs/assets/images/tfa-onelogin-new-user.png)

### Drupal Instructions

1. Install and enable the GitHub version of the [OneLogin module](https://github.com/onelogin/drupal-saml) on your Drupal site. This module is eventually intended to live on Drupal.org as the [2.x branch of the OneLogin project](https://www.drupal.org/project/onelogin).
2. Set the `$_SERVER['SERVER_PORT']` value in `settings.php` according to [these instructions](/docs/articles/sites/code/server_name-and-server_port). This change is necessary to have SAML use the appropriate ports.   
3. Configure the OneLogin module `admin/config/onelogin_saml` with what is shown in the screenshot; values are case-sensitive.
![TFA OneLogin Options](/source/docs/assets/images/tfa-drupal-onelogin-options.png)
4. Now use the OneLogin dashboard to log in to your Drupal site!

##See Also
- [Security on Pantheon](https://pantheon.io/security)
- [WordPress Two Step Authentication](http://codex.wordpress.org/Two_Step_Authentication)
- [Drupal Modules For Two-Factor Authentication](https://groups.drupal.org/node/235938)
- [Configuring SAML for Pantheon's Dashboard with OneLogin](https://onelogin.zendesk.com/hc/en-us/articles/204356174-Configuring-SAML-for-Pantheon)
