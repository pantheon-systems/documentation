---
title: WordPress Configurations Guide
subtitle: Use WP Mail SMTP to Send Email with SendGrid
description: Learn how to configure WP Mail SMTP for use with SendGrid.
contributors: [alexfornuto]
categories: [integrate]
tags: [email, plugins]
cms: "WordPress"
reviewed: "2020-11-02"
permalink: docs/guides/wordpress-configurations/sendgrid-wordpress-wp-mail-smtp
anchorid: sendgrid-wordpress-wp-mail-smtp
---

This section provides information on how to configure WP Mail SMTP to work with SendGrid.

[SendGrid](https://sendgrid.com/) is a popular email service, but its [WordPress plugin](https://wordpress.org/plugins/sendgrid-email-delivery-simplified/) has been deprecated as of July 13, 2021.

This guide will cover how to install and configure [WP Mail SMTP](https://wordpress.org/plugins/wp-mail-smtp/) to send emails from your WordPress site using SendGrid. This plugin will ensure that the SMTP host credentials are correctly configured, so that emails are sent successfully.

<Alert title="Note" type="info">

WP Mail SMTP is not the only plugin available to integrate WordPress with SendGrid, nor is it officially endorsed by Pantheon as the preferred method.

</Alert>

## Before You Begin

This guide assumes a pre-existing configuration of:

- A configured WordPress site. Refer to our [Quick Start](/guides/quickstart) guide if you need to set up a new WordPress site on Pantheon.
- A familiarity with the [WebOps workflow](/pantheon-workflow), as steps involve moving code and content between environments.
- A SendGrid account and API key. Follow the steps in [Create a SendGrid Account](/guides/sendgrid/#create-a-sendgrid-account) to create and authenticate an account.
- If your site has access to [Multidev](/guides/multidev), we suggest creating a new Multidev environment to work in. If so, substitute the Multidev name for `dev` in the guide below, unless otherwise noted.

## Install the WP Mail SMTP Plugin

There are several ways to install and manage WordPress plugins on Pantheon. This guide will cover installation from the WordPress Admin Dashboard, and from the command line using [Terminus](/terminus) and [WP-CLI](/guides/wp-cli).

Each method requires first setting your working environment (Dev or a Multidev environment) to [SFTP mode](/sftp#sftp-mode).

### Install from the WordPress Admin Dashboard

1. Navigate to the [Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites), select the Dev (or Multidev) environment, and click the **Site Admin** button. Log in to your WordPress Admin Dashboard.

1. Select **Plugins**, then select **Add New**

  ![The WordPress Admin Dashboard, highlighting the Plugins page and Add New button](../../../images/guides/wp-mail-smtp/add-new-plugin.png)

1. Enter "wp mail smtp" in the search box, locate **WP Mail SMTP by WPForms** and click **Install Now**:

  ![The Add Plugins search view](../../../images/guides/wp-mail-smtp/search-plugins-install.png)

1. Click **Activate** when the installation finishes.

WP Mail SMTP is now installed! You can continue to [Configure WP Mail SMTP for SendGrid](#configure-wp-mail-smtp-for-sendgrid).

### Install with Terminus

<Alert title="Exports" type="export">

When using [Terminus](/terminus), we suggest defining the variables `$site` and `$env` in your terminal session to match your site name and the Dev (or Multidev) environment:

```bash{promptuser: user}
export site=yoursitename
export env=dev #Or a multidev name
```

</Alert>

1. Confirm that the environment is in SFTP mode:

  ```bash{outputLines: 2}
  terminus connection:set $site.$env sftp
  [notice] The connection mode is already set to sftp.
  ```

1. Invoke WP-CLI over Terminus to install and activate WP Mail SMTP:

  ```bash{outputLines: 2-13}
  terminus wp $site.$env -- plugin install --activate wp-mail-smtp
  Warning: Permanently added '[appserver.sendgridsmtp.0e1f236a-....drush.in]:2222,[35.223.224.107]:2222' (RSA) to the list of known hosts.
  Installing WP Mail SMTP by WPForms (2.5.1)
  Warning: Failed to create directory '/.wp-cli/cache/': mkdir(): Read-only file system.
  Downloading installation package from https://downloads.wordpress.org/plugin/wp-mail-smtp.2.5.1.zip...
  Unpacking the package...
  Installing the plugin...
  Plugin installed successfully.
  Activating 'wp-mail-smtp'...
  Plugin 'wp-mail-smtp' activated.
  Success: Installed 1 of 1 plugins.
  [notice] Command: anita-wordpress.sendgridsmtp -- wp plugin install wp-mail-smtp [Exit: 0]
  ```

## Configure WP Mail SMTP for SendGrid

1. Navigate to the WordPress Admin Dashboard's Plugins Page, locate WP Mail SMTP, and click **Settings**.

1. Select the **General** tab, and provide values for "From Email" and "From Name" the **Mail** section. 

1. Select **SendGrid** in the **Mailer** subsection:

  ![The plugins settings page for WP Mail SMTP](../../../images/guides/wp-mail-smtp/plugin-settings.png)

1. Navigate to the next section, then paste in your API key, and then select **Save Settings**.

1. Confirm your settings are correct: select the **Email Test** tab and send a test email to yourself. Be sure to check your spam folder for the test message.

Congratulations, you've configured WP Mail SMTP for SendGrid!

## More Resources

- [WP Mail SMTP Documentation](https://wpmailsmtp.com/docs/)  
- [SendGrid Documentation](https://sendgrid.com/docs/)