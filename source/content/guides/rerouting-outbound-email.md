---
title: Prevent Spamming During Drupal Debugging and Testing
description: Set up the Drupal reroute_email module on your Pantheon Drupal site.
cms: "Drupal"
categories: [develop]
tags: [workflow, email]
type: guide
permalink: docs/guides/:basename
contributors: [ari]
reviewed: "2021-09-15"
---
If your Drupal site sends outbound emails, you don't want to accidentally spam your users or customers from your Dev or Test environments. Maybe your site has a complex editorial workflow that alerts people when action is required, or maybe you’re redesigning email templates for your drip marketing campaign. Whatever your use case, you’ll want to make sure that you’re not accidentally spamming customers during debugging or quality assurance testing, and you’ll want to add the [Reroute Email](https://www.drupal.org/project/reroute_email) module to your developer toolkit.

If you don't manually change the settings stored in the database, you are at risk of accidentally spamming users during debugging or quality assurance testing.

Reroute Email is easy to setup and the settings persist, even when moving the database between environments. You can install the reroute email and enable it in all environments, and configure it via the [`settings.php`](/guides/php/settings-php) with [environmental variables](/guides/environment-configuration/read-environment-config) to ensure you don't spam users during debugging or testing.

You’ll be able to funnel all development and testing emails to a single inbox and will not have to log in to several email accounts to test your business expectations.

## Installation

You can use [SFTP](/sftp) on Pantheon or the [Drupal UI](/cms-admin/#drupal-admin-interface) to install a module. Alternatively, you can use Git to keep automated backups running on Dev.

For instance, you can use [a start state](/start-state/#import-an-existing-site) and perform a [git clone](/guides/git/git-config) of the Pantheon site.

```bash{promptUser: user}
cd sites
git clone <pantheon git clone ssh connection string>
cd site-name
mkdir sites/all/modules/contrib
```

Add a `contrib` directory to help keep modules organized. You can use Drush to download contrib modules into the directory.

```bash{promptUser: user}
drush dl reroute_email
```

The following line isn’t necessary, but it’s a good idea to use `git status` to understand the state of your local Git repository, especially if you’re new to Git. If you’re just starting with Git, execute `git status` after each step.

```bash{outputLines: 2-8}
git status
On branch master
Your branch is behind 'origin/master' by 3 commits, and can be fast-forwarded.
  (use "git pull" to update your local branch)
Untracked files:
  (use "git add <file>..." to include in what will be committed)

        sites/all/modules/contrib/
```

Use the following command to add the module to Git:

```bash{promptUser: user}
git add sites/all/modules/contrib/reroute_email
```

Commit and push the module to Pantheon.

```bash{promptUser: user}
git commit -m "Add reroute_email module"
git push origin master
```

Now, check your Site Dashboard and you’ll see that the module’s code has been deployed to your Dev environment.

![The dashboard's showing the code was deployed to the Dev environment](../../images/dashboard/verify-reroute-email-dashboard-commits1.png)

## Configuration

If you don’t have a `settings.php` file, copy the `default.settings.php` file.  You can use the following command to copy:

```bash{promptUser: user}
cp sites/default/default.settings.php sites/default/settings.php
```

Using your favorite editor or IDE, open the `settings.php`, and add the following code for Drupal 7:

```php
if (defined('PANTHEON_ENVIRONMENT')) {
  if (PANTHEON_ENVIRONMENT == 'live') {
    // Do not reroute email on Live
    $conf['reroute_email_enable'] = 0;
  }
  else {
    // Reroute email on all Pantheon environments but Live
    $conf['reroute_email_enable'] = 1;
    $conf['reroute_email_address'] = "youremail+qa-" . PANTHEON_ENVIRONMENT . "@example.com";
    $conf['reroute_email_enable_message'] = 1;
  }
}

if (!defined('PANTHEON_ENVIRONMENT')) {
  // Reroute email when site is not on Pantheon (local install)
  $conf['reroute_email_enable'] = 1;
  $conf['reroute_email_address'] = "youremail+qa-local@example.com";
  $conf['reroute_email_enable_message'] = 1;
}
```
  
In order for the snippet to work as intended, the module must be enabled in all environments. The `PANTHEON_ENVIRONMENT` variable changes the reroute email settings based on environment. The configuration in `settings.php` overrides any settings in the Drupal Admin UI.  If your site isn't on Pantheon, look for available [Superglobals](https://secure.php.net/manual/en/language.variables.superglobals.php) to aid in your configuration.


### Stage and Commit settings.php

```bash{promptUser: user}
git add sites/default/settings.php
git commit
```

In order for the `settings.php` configuration to work correctly, the `reroute_email` module must be enabled in all environments.


```none
Configure reroute_email via settings.php

//Intercept all outgoing emails for all environments but Live and reroute to QA email addresses so you never spam customers during testing again!

* Do not reroute email on Live
* Reroute email on all other Pantheon environments
* Reroute email on non-Pantheon environments (local)

Project page: https://www.drupal.org/project/reroute_email
```

Next, push the code to Pantheon.

```bash{promptUser: user}
git push origin master
```

Push the code to Test and Live and enable the module in all environments.
You can do this through the Site Dashboard and the Drupal Admin UI, or by using [Terminus](/terminus) and Drush:

```bash{promptUser: user}
terminus auth:login
terminus drush <site>.test -- en reroute_email -y
terminus env:deploy <site>.test --sync-content --updatedb --note="Initial deploy. Reroute Email demo"
terminus env:clear-cache <site>.test
terminus env:deploy <site>.live --updatedb --note="Initial deploy. Reroute Email demo"
terminus env:clear-cache <site>.live
terminus drush <site>.test -- en reroute_email -y
terminus drush <site>.live -- en reroute_email -y
```

Now the Dev environment’s settings page for the `reroute_email` module (`/admin/config/development/reroute_email`) should display a checked box for **Email Rerouting** and **Show rerouting description in mail body**, as well as the destination email addresses. 

If you don’t see what you’re expecting, review your `settings.php` and ensure the commit is displayed on your Dashboard:

![The dashboard displaying that the code was deployed to the Dev environment](../../images/dashboard/verify-reroute-email-dashboard-commits2.png)

## Go Forth and Test

Now, when Drupal sends out an email from any environment (except Live), it will get rerouted to the email address specified in the `settings.php` file. The `settings.php` will ensure emails are not rerouted on Live. Make sure you’re using a [SMTP gateway](/email/#outgoing-email) on Live to ensure email deliverability.


## Additional Information

[Manage Email Handling for Development or Testing](https://www.drupal.org/node/201981)
