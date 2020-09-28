---
title: Basic Troubleshooting
description: Common first-step practices to troubleshoot misbehaving sites.
categories: [wordpress, drupal]
contributors: [alexfornuto, eabquina, carlalberto]
reviewed: "2020-08-26"
---

This page is a collection of common troubleshooting tactics, curated from our Customer Success Engineers and the Pantheon community. These procedures can help you solve issues your site may have, or at the very least rule out potential causes.

Like all pages in this project, this is a living document. Please feel free to [add](https://github.com/pantheon-systems/documentation/edit/main/source/content/basic-troubleshooting.md) your expertise to the page to help others.

## Standard Troubleshooting

These sections cover basic principles of troubleshooting, and apply to most issues.

### Reproduce the issue

If you're fielding a bug report from an end-user, you'll likely need to be able to reproduce the issue yourself in order to find the cause. For example, if a user reports that they’re unable to sign up for an account, try signing up for an account yourself to get a better idea of what exactly occurs.

### Check your logs for errors and warnings

Live sites do not show errors by default, but you can spot them by reviewing your PHP error log, or in Drupal, checking your watchdog log if the core dblog module is enabled.

In some cases, you may also run into the notorious “White screen of death” (WSOD), in which nothing prints to the screen at all. Similarly, in Drupal, you may see the cryptic “This website has encountered an unexpected error” message. If this happens, check your logs.

If you’re not sure if what you see in the log is coming from the problem at hand, you can try to reproduce the problem, then check your logs again.

If you’re handling a report of a problem from someone else and can’t reproduce it yourself, ask them what time the problem occurred so that you can compare that report to timestamps in the error log. Keep in mind that you may have to convert timezones depending on where your users are.

#### Search online for errors

PHP errors coming from Drupal or WordPress code tend to not be specific to Pantheon, so a good first step on these if you’re not clear what the error means is to just search for it in your favorite search engine.

Odds are, someone else has run into the same problem and reported it in forums on wordpress.org or the issue queues on Drupal.org, and it’s possible that someone has posted a solution or workaround.

### Update the problem theme, module or plugin

If you’ve narrowed the problem down to a specific module or plugin and you’re running an outdated version, try updating it first. The new release may include a fix for the issue, but even if it doesn’t, you’ll need to be running the newest version to report an issue.

### Clear caches

Sometimes your CMS may encounter issues due to cached data that ends up in an odd state.

Clear your site cache using the Pantheon Dashboard, or with Terminus.

Clear Redis using the Redis CLI.

### Investigate recent changes

Site problems may feel random, but they’re all triggered by _something_. Was there a recent code change? A plugin update? A configuration edit? Rolling things back can be a good first step to troubleshoot, even if it seems unlikely to be related.

We recommend rolling back either the code or database versus a full restore in most cases. You can do this using Terminus.

If there haven’t been any code or config changes lately, an uptick in site traffic or the type of traffic you’re serving (e.g, uncached versus cached) may be the trigger. To see if this is the case, check your nginx access logs.

### Narrow down the cause

Some issues don’t give you clear errors or a trace back to the exact place things go wrong. In that case, you may want to try the “process of elimination” style of debugging on your Dev or multidev environment:

- Disable modules/plugins one by one
- Switch the theme to a Twenty\* (WordPress) or Bartik (Drupal)

Continue doing this until the problem no longer comes up.

### Use advanced debugging tools

More complex issues with code may necessitate using debugging tools beyond your server or application logs.

- Recreate the issue locally.
- For WordPress, enable WP_DEBUG & WP_DEBUG_LOG in wp-config.php. Then use the debug.log file to find warnings and errors.
- Use Xdebug to set application breakpoints and dig into stack traces.

## Pantheon Dashboard

In general, if the Pantheon Dashboard stops responding, the first step is to refresh the page. But note that doing so after executing a change may cause that process to be run twice (CONFIRM WITH PRODUCT). The next step is to log out and back in to the Site Dashboard. If the problem persists, [contact support](/support/)

### Check status.pantheon.io

If Pantheon is experiencing a platform issue that impacts sites, we post updates on our status page. You can subscribe to status updates on that page if you’d like, or follow @PantheonStatus on Twitter.

### HTTPS Issues

When resolving issues with Pantheon's [HTTPS](/https/) certificates, a good first step is to remove and re-add the domain, which will restart the certificate provisioning process.

### Code Changes

If changes to your code don't appear to be showing:

- Check that there isn't a `.gitignore` that may be ignoring those files:

  ```bash{promptUser: user}
  git check-ignore -v path/to/file)
  ```

Check composer dependencies as well. When a composer package has a `.gitignore` or a `.git/` folder in it, the platform is going to ignore the files in that folder.

### Conflicts

See [Apply Upstream Updates Manually from the Command Line to Resolve Merge Conflicst](/core-updates#apply-upstream-updates-manually-from-the-command-line-to-resolve-merge-conflicts) in our [WordPress and Drupal Core Updates](/core-updates) page for more information on core update conflicts. Note, deleted `README.txt` files can cause dashboard conflicts.

For conflicts introduced by other code merges (like from Multidev environments), see [Resolve Git Merge Conflicts](git-resolve-merge-conflicts)

## WordPress

### White Screen of Death (WSOD)

The **WSOD** is a frustrating issue on WordPress sites, since it provides no useful information on the cause. The first place you should look for information is the [log files](/logs/). See [PHP Errors and Exceptions](https://pantheon.io/docs/php-errors) for more information on the type of errors you may find.

### Disable All Plugins

If your WordPress site exhibits unwanted behavior and you're not sure of the cause, try disabling all your plugins. If the behavior stops, turn the plugins back on one by one, checking after each one to identify the culprit.

### Disable Plugins Incrementally

### Switch Theme to Default Theme

Some themes can cause potential conflicts with Wordpress core, especially after core or plugin updates. To rule out the issue being your theme, switch to a default theme such as Twenty Nineteen.

### Unexpected 404s

There are times the permalink structure in Wordpress is not updated properly, leading to 404 errors. Go to **Settings** > **Permalinks** in your Wordpress Dashboard and click **Save Changes**.

Check that the Wordpress Address and Site Address are properly configured in your Wordpress Dashboard. These can also be overwritten in your wp-config.php file:

```bash
define('WP_HOME', 'https://example.com');
define('WP_SITEURL', 'https://example.com');
```

### Error: Cookies are blocked or not supported by your browser.

You must enable cookies for WordPress users to log in to their admin interface. You may need to add this to your `wp-config.php` file:

```php:title=wp-config.php
define('COOKIE_DOMAIN', $_SERVER['HTTP_HOST'] );
```

## Drupal 7

Are you a Drupal 7 wizard? [Help us expand this section](https://github.com/pantheon-systems/documentation/edit/main/source/content/basic-troubleshooting.md).

## Drupal 8

### UnmetDependenciesException when installing Drupal 8

Sometimes when installing Drupal 8, users may see the following error:

![A screenshot of a common Drupal 8 installation error](../images/drupal-8-install-error.png)

This is apparently cause bu a dirty cookie cache in the web browser. Users have reported success by re-installing in private or incognito mode in their browser.

See the [UnmetDependenciesException when installing Drupal 8](https://www.drupal.org/project/drupal/issues/2594351) issue for more information.

Are you a Drupal 8 wizard? [Help us expand this section](https://github.com/pantheon-systems/documentation/edit/main/source/content/basic-troubleshooting.md)


### Displaying Error Messages

```php
$config['system.logging']['error_level'] = 'verbose';
```

### Debugging With Drush

```bash
drush rr
```
