---
title: Locking Your Site
description: Learn how to keep your Drupal or WordPress site hidden from the public for development or updates.
tags: [security]
categories: []
---
There are occasions you are working on a site and want to keep your progress hidden from the world as you prepare to go live or make updates.

This can be done by putting a username and password on the environment similar to basic authentication on Apache. If a request for a resource on your environment is received and the site is private, the requesting client will have to supply the authentication credentials you set in order to access the site.

## Password Protect Your Site's Environments

1. Select the environment (e.g. Dev), and click **Security**.
2. Click **Locked**.
3. Choose a username and password, and click **Lock Environment**.

![Lock environment](/source/docs/assets/images/dashboard/lock-environment.png)
If other members of your team on the site need to access the site, they can view the authentication credentials when they log in to their accounts.
![Credentials](/source/docs/assets/images/dashboard/environment-access.png)
When your page refreshes, you will notice that the environment is now private. You can also see the credentials needed to access that environment.

You can set a different username and password for each environment. This is important if you only want the live site publicly viewable, while Dev and Test can be private as you work on your code and content.

To verify that everything is working correctly, visit the URL of the environment that you have made private. You should see an authentication form where you can enter the username and password for that environment to start your session.
 ![Example of locked site](/source/docs/assets/images/auth-required.png)

### Troubleshoot
The [HTTP Basic Authentication](https://www.drupal.org/docs/8/core/modules/basic_auth) core module (Drupal 8) and [Basic HTTP Authentication](https://www.drupal.org/project/basic_auth) contrib module (Drupal 7) conflict with [Pantheon's Security tool](/docs/security/#password-protect-your-site%27s-environments) if both are enabled. We recommend using Pantheon's Security tool within the Site Dashboard on target environments, or the module to restrict access, not both.

Sites that have the environment locked on Pantheon in addition to enabling the module will experience 403 errors. You can resolve these errors by unlocking the environment in the Site Dashboard, clearing cache, then disabling the module in Drupal's admin interface. Once you've disabled the module you can safely lock the environment on Pantheon.

Alternatively, you can resolve 403 errors by using [Terminus](/docs/terminus) to disable the module:

<ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#d8" aria-controls="d8" role="tab" data-toggle="tab">Drupal 8</a></li>
  <li role="presentation"><a href="#d7" aria-controls="d7" role="tab" data-toggle="tab">Drupal 7</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="d8">
    <pre><code class="bash hljs">terminus remote:drush &lt;site&gt;.&lt;env&gt; -- pm-uninstall basic_auth -y</code></pre>
  </div>
  <div role="tabpanel" class="tab-pane" id="d7">
    <pre><code class="bash hljs">terminus remote:drush &lt;site&gt;.&lt;env&gt; -- pm-disable basic_auth -y</code></pre>
  </div>
</div>

## Unlock a Site's Environment

When you are ready to make your environment public again, click **Public** on the Security page. This will clear the credentials you entered and make web accessible resources available without a basic authentication prompt.
