---
title: Lock Environments with the Dashboard Security Tool
description: Learn how to use the Security tool in the Site Dashboard to keep your work hidden from the public for Drupal or WordPress site development.
tags: [dashboard, security, users]
newtype: doc
categories: [user authentication]
newcms: []
audience: [development]
product: []
integration: []
---

There are occasions while you are working on your site that you would like to keep your progress hidden from the world as you prepare to go live or make updates.

This can be done by putting a username and password on the environment, similar to basic authentication on Apache. Visitors will be prompted to authenticate before the site is served.

<Alert title="Note" type="info">

When a Dev environment is locked, a lock icon will be added to the screenshot of a site on the Your Sites page.

</Alert>

![Lock environment](../images/dashboard/lock-environment.png)

## Password Protect Your Site's Environments

You have the ability to password protect any of the available environments.

1. Select the environment (e.g., <span class="glyphicon glyphicon-wrench"></span> **Dev**).
2. Select <span class="glyphicon glyphicon-keys"></span> **Security**.
3. Select **Locked**.
4. Provide a username and password.
5. Click **Lock Environment**.

If other members of your team on the site need to access the site, they will also be able to view the authentication credentials when they log in to their accounts.

![Credentials](../images/dashboard/environment-access.png)

Now when your page refreshes you will notice that the environment is now "Private". You will also be able to see the credentials needed to access that environment.

You can set a different username and password for each environment. This is important if you only want the Live site publicly viewable, while Dev and Test can be private as you work on your code and content.

To verify that everything is working correctly, visit the URL of the environment that you have made private. You should see an authentication form where you can enter the username and password for that environment to start your session.

![Locked site example](../images/auth-required.png)

<Alert title="Note" type="info">

While locked, environments will not be cached by the [Global CDN](/guides/global-cdn).

</Alert>

### Customize Lock Page
If you'd like to customize the lock page that displays beneath the authentication form, you can add a `locked.html` file in your site's root directory.

## Unlock a Site's Environment
When you are ready to make your environment public again, click **Security** on your Site Dashboard. Next to Environmental Access, click **Public**.
This will clear the credentials you entered and make the web accessible resources available without a basic authentication prompt.

## Scripting Site Locking Operations
Your site may also be locked and unlocked using [Terminus](/terminus).

To lock a site:

```bash
terminus lock:enable <site>:<env> -- user password
```

To unlock a site:

```bash
terminus lock:disable <site>:<env>
```

### Pass Credentials Using CI Scripting 

If you are using CI scripting, you must configure your CI tool to pass the username and password on every request to allow tests to run in a locked site environment. Configuration steps will vary depending on your chosen CI tool. To help you get started, we've included a CI authentication example:

```bash
{"base_url" : "https://<username>:<password>@'$TERMINUS_ENV'-'$TERMINUS_SITE'.pantheonsite.io/"}
```
  * Replace `<username>` with your selected username.
  * Replace `<password>` with your configured password.

## Troubleshooting

### Authentication Prompt Appears in Environments Where It's Not Enabled

If you see an authentication prompt for a different environment (for example, a Dev site authentication prompt on the Test environment), you likely have assets, such as images, loading from a locked environment. Inspect your page source code and search for the locked environment's URL (e.g `dev-yoursite.pantheonsite.io`), then replace that with the correct URL for the current environment.

### Drupal HTTP Authentication Module

The [HTTP Basic Authentication](https://www.drupal.org/docs/8/core/modules/basic_auth) core module (Drupal 8) and [Basic HTTP Authentication](https://www.drupal.org/project/basic_auth) contrib module (Drupal 7) conflict with [Pantheon's Security tool](/security/#password-protect-your-site%27s-environments) if both are enabled. We recommend using Pantheon's Security tool within the Site Dashboard on target environments, or the module to restrict access, not both.

Sites that have the environment locked on Pantheon in addition to enabling the module will experience 403 errors. You can resolve these errors by unlocking the environment in the Site Dashboard, clearing cache, then disabling the module in Drupal's admin interface. Once you've disabled the module you can safely lock the environment on Pantheon.

Alternatively, you can resolve 403 errors by using [Terminus](/terminus) to disable the module:

For Drupal 7, run:

```bash
terminus remote:drush <site>:<env> -- pm-disable basic_auth -y
```
