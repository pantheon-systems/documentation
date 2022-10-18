---
title: WordPress on Pantheon Quick Start Guide
subtitle: WordPress Security
description: Keep your WordPress on Pantheon site secure.
categories: [wordpress]
tags: [wordpress, webops]
contributors: [whitneymeredith]
reviewed: "2022-05-18"
layout: guide
showtoc: true
permalink: docs/guides/wordpress-pantheon/wp-security
anchorid: wordpress-pantheon/wp-security
---

This section will cover the basics of securely administering and updating WordPress, recommend plugins that can help enhance your security, and help you close the most often exploited WordPress vulnerabilities.

## Built-in Security Features

Pantheon automatically provides the following security measures:

- [Automated HTTPS](/guides/global-cdn/https)
- [Secure Dev environment](/pantheon-workflow)
- [DDOS and intrusion protection](/guides/agcdn/agcdn-features#osi-layer-3-and-4-ddos-protection--mitigation)
- [Automated backups](/backups)
- [Dashboard Security](/guides/secure-development/security-tool) to lock your environments

### Additional Security

Pantheon provides additional security through the following features:

- [Pantheon Global CDN](/guides/global-cdn)

- [Secure Runtime Access](/guides/secure-development/secure-runtime-access)

- [Lockr](/guides/lockr)

- [Secure Integration](/guides/secure-development/secure-integration)

- [Two factor authentication](/guides/secure-development/two-factor-authentication)

- [Secure Connections to Pantheon Services via TLS or SSH Tunnels](/guides/secure-development/ssh-tunnels)

## Securing WordPress

<Partial file="wp-login-attacks.md" />

## Securely Updating WordPress

WordPress core is the most secure part of the CMS, provided you're running the most recent version. While WordPress is backwards compatible, only the most recent version is fully supported, so it is beneficial to install updates in a timely fashion.

### WordPress Auto-Update Feature Considerations

WordPress has an auto-update feature to help with keeping the core current. However, it requires that your WordPress instance have the permission to write to itself, which is an inherent security risk. Still, it's reasonable to stick with auto updates unless you:

- Manage your own site and have your own version control process.

- Implement your own deployment mechanism— for example, if you have multiple servers to update.

- You feel confident in pushing updates yourself.

If any of the above apply, you should [disable auto-updates](https://make.wordpress.org/core/2013/10/25/the-definitive-guide-to-disabling-auto-updates-in-wordpress-3-7/). If you do, however, it's important to create a process for updates that includes version control and controlled deployments. You can do so as follows:

1. Disable file edits. The background auto-updater requires this permission to operate, but since you're manually updating, you can close this vulnerability. To do so, add this snippet into your wp-config.php:

  ```php:title=wp-config.php
  define('DISALLOW_FILE_EDIT', true);
  ```

1. Disable updates on Test and Live. Updates should be done in the development environment, not directly on your Test or Live sites. This workflow is built into Pantheon. Here's how we code for it in our default wp-config.php:

  ```php:title=wp-config.php
  // FS writes aren't permitted in test or live, so we should let WordPress know to disable relevant UI

  if ( in_array( $\_ENV\['PANTHEON_ENVIRONMENT'], array( 'test', 'live' ) ) && ! defined( 'DISALLOW_FILE_MODS' ) ) :

  define( 'DISALLOW_FILE_MODS', true );

  endif;
  ```

This sets the proper permissions for you to safely build your update process.

### Manual Updates

To perform a manual update procedure, take the following steps:

1. Log into your WordPress admin in a development environment.

1. Update core, themes, and plugins as needed.

1. Check to see if everything is functioning normally. If so, commit changes. If not, troubleshoot.

1. Deploy code to your Test environment, syncing your Live content and settings down to Test.

1. Test the site thoroughly, making sure your content and configuration is fully functional with the new code. If it is working as expected, push to Live. If not, sync back to Dev for more troubleshooting.

### Automatic Updates

Of course, doing manual updates can be a chore, especially if you're managing more than one site. Most organizations that do this use [Custom Upstreams](/guides/custom-upstream) that include favored plugins, custom plugins, a base theme, etc. This allows you to update the shared codebase and then all of the sites that are based on that Upstream will receive updates automatically.

While Custom Upstreams will help, adding automation and scripting will get you even further. The ideal system would detect available updates, deploy them to a testing environment, test them, and produce a report indicating that the site has updates that are ready to go.

Our [Terminus command line tool]( /terminus/) allows you to manage everything you can do in our administrative interface by script. Pair it with [WP-0CLI](/guides/wp-cli/) and add in our [Quicksilver hooks](/guides/quicksilver) to trigger testing, and you're on your way.

[Pixotech has a nice writeup](http://www.pixotech.com/automating-pluginmodule-updates-on-pantheon/) on their process that does this, and our own Andrew Taylor has a [fantastic script for doing all of this plus visual regression testing](https://pantheon.io/blog/automating-security-updates-scalewpio) on Pantheon.

## Top WordPress Security Plugins

These are some of our favorite plugins for helping you move across the security continuum. From promoting better password hygiene to preventing specific types of exploits, these plugins are all worthy additions to your site.

- [iThemes Better Security](https://wordpress.org/plugins/better-wp-security/): Features a whole suite of options for hardening your WordPress site. You can protect login attempts, disable file editing, force secure connections, and more.

- [BulletProof Security](https://wordpress.org/plugins/bulletproof-security/): Like iThemes, this plugin features multiple ways to enhance your security. You can set a timer for idle sessions to logout, control cookies, and more.

- [VaultPress](https://wordpress.org/plugins/vaultpress/): This plugin hooks into a subscription service for backup, security scans, and expert support.

- [Login Lockdown](https://wordpress.org/plugins/login-lockdown/): This plugin limits the number of failed login attempts from specific IP addresses. This simple step can help prevent brute-force attacks.

- [Two-Factor](https://wordpress.org/plugins/two-factor/): Add an extra layer of protection to your logins with Two-Factor Authentication; this plugin makes it easy.

- [Force Strong Passwords](https://wordpress.org/plugins/force-strong-passwords/): Get rid of the ‘Password1234's in your organization. This plugin requires anyone with a predetermined level of privileges to set a strong password.

## Closing WordPress Coding Vulnerabilities

It's possible to take every precaution in keeping your site secure, but to introduce vulnerabilities in the code. There are three common types of attacks that rely on insecure code. It is important to both be aware of these vulnerabilities, and know how to prevent them. If you or anyone on your team write any custom code for WordPress, it's essential to understand- and prevent- these common attacks.

### Cross-Site Scripting (XSS)

XSS attacks are the most common vulnerability, making up nearly half of all vulnerabilities. In an XSS attack, hackers use forms that can accept arbitrary user input as a vehicle to insert malicious code.  

Avoid this attack by validating, escaping, and sanitizing your data. For detailed instructions, [this XSS article](https://www.wordfence.com/learn/how-to-prevent-cross-site-scripting-attacks/) is a great resource.

### SQL Injection

This type of attack also relies on unsanitized data. The attacker attempts to enter SQL commands through an input form on your webpage. These commands can do everything from filling your database with spam to deleting data.

As with XSS attacks, preventing SQL injections is all about proper data hygiene. Your code should check that any data inputted is properly formatted and free of suspicious characters before it's added to the database. [This guide](https://codex.wordpress.org/Validating_Sanitizing_and_Escaping_User_Data) from the WordPress Codex provides a good overview of how to code these security checks.

### Cross-Site Request Forgery (CSRF)

This type of attack uses a trusted user's account to fool your website into accepting malicious code. The attack is possible when a user logs into your website, then navigates away from the site and encounters a forged link. The user clicks the link, which generates a forged request to your site. The user doesn't know what happened, and your site is fooled into thinking the request came from the user.  

WordPress has a built-in function to help stop CSRF attacks called a "nonce,” or "number used once.” The number is an identifier attached to a specific user and session and can be changed at any interval you decide. Any information that looks like it comes from the user, but doesn't include the nonce, will be rejected.  
    
For detailed information on how to generate and use nonces, review the following WordPress documentation:

* [Nonces](https://developer.wordpress.org/plugins/security/nonces/)

* [Using Nonces](https://developer.wordpress.org/themes/theme-security/using-nonces/)
