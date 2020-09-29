---
title: WordPress and PHP Sessions
description: Detailed information on the behaviors of WordPress and PHP sessions.
cms: "WordPress"
categories: [develop]
tags: [code, users, cookies]
---

WordPress Core [does not use sessions](https://wordpress.org/support/topic/how-does-wordpress-handle-sessions-and-session-variables/?replies=7). All "user state" is managed via cookies. This is a Core design decision.

However, some plugins or themes will use `session_start()` or PHP's `$_SESSION` superglobal. On Pantheon, support for sessions requires the [WordPress Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions) plugin which we maintain. Sites that need to utilize PHP Sessions should install this plugin.

<Alert title="Warning" type="danger">

Given the variety of implementations, this plugin will not solve all `$_SESSION` based issues and errors. If you use this plugin and still have issues, modify the code within your theme or plugin that calls `$_SESSION` to remove this functionality or use an alternative.

</Alert>

## Troubleshooting Session Errors

Prior to installing WordPress Native PHP Sessions, you might see the following error:

```php
Warning: session_start(): user session functions not defined
```

Plugins with session-using code are relying on PHP's default session manager, which is temporary files on local disk. Pantheon does not support this because it will not work properly in our distributed environment.

### Varnish or caching is not working when a plugin or theme that uses `$_SESSIONS` is enabled

Due to how caching and sessions work, sessions need to be uncached to work properly, and it is impossible use cached content when there are sessions in place. It would be best to use a cookie based solution to avoid a performance hit from uncached session pages.

Symptoms of this issue shows when the header is inspected, you will see that the session cookie is always set on every page load:

```http
Set-Cookie: SESS1234XXXXXXXXXXXXXX path=/; domain=.example.pantheonsite.io; HttpOnly
```

The best way to determine which plugin or theme is not allowing caching is to search your site's plugin and theme code for the `session_start()` PHP function:

```bash{promptUser: user}
cd wp-content
grep -rnw . -e 'session_start'
```

Alternatively, you can inspect the headers using `curl -sI example.com` after each of the following steps, until you determine which component is breaking the cache:

1. To check your theme, use your default theme (twentynineteen for example), and check for the cookie.

1. To see if a plugin is breaking the cache, disable the plugins one by one. Do not forget to [clear the cache](/clear-caches) from the Pantheon dashboard every time that you disable a plugin. The first plugin disabled which makes the cache work again is most likely the culprit.

  Note: If you have a local copy of your site, you can search it for plugins that uses `session_start()` or `$_SESSIONS`, and start turning them off first.

1. To check if a 3rd party must-use plugin or drop-in plugin is breaking the cache, temporarily remove the 3rd party must-use plugins and leave only the `Pantheon` and `WP Native PHP Sessions`. There should be no drop-ins in place.

### Install WordPress Native PHP Sessions Plugin

If `$_SESSIONs` are necessary for your application, install the [WordPress Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions) plugin:

1. [Set the connection mode to SFTP](/sftp) for the Dev or Multidev environment via the Pantheon Dashboard or with [Terminus](/terminus):

 ```bash{promptUser: user}
 terminus connection:set <site>.<env> sftp
 ```

1. Install and activate  [WordPress Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions) from within the Dev or Multidev environment's WordPress Dashboard (`/wp-admin/plugin-install.php?tab=search&s=wp+native-php-sessions`) or with Terminus:

 ```bash{promptUser: user}
 terminus wp <site>.<env> -- plugin install wp-native-php-sessions --activate
 ```

1. Deploy the plugin to the Test environment within the Site Dashboard or with Terminus:

 ```bash{promptUser: user}
 terminus env:deploy <site>.test --sync-content --cc --updatedb --note="Install WordPress Native PHP Sessions plugin"
 ```

1. Activate the plugin within the WordPress Dashboard on the Test environment (`/wp-admin/plugins.php`) or with Terminus:

 ```bash{promptUser: user}
 terminus wp <site>.test -- plugin activate wp-native-php-sessions
 ```

1. Deploy the plugin to the Live environment within the Site Dashboard or with Terminus:

 ```bash{promptUser: user}
 terminus env:deploy <site>.live --cc --note="Install WordPress Native PHP Sessions plugin"
 ```

1. Activate the plugin within the WordPress Dashboard on the Live environment (`/wp-admin/plugins.php`) or with Terminus:

 ```bash{promptUser: user}
 terminus wp <site>.live -- plugin activate wp-native-php-sessions
 ```

Once enabled, your functionality will "just work". For more information, see [Fix WordPress PHP Session Problems on Pantheon with a Script](https://pantheon.io/blog/fix-wordpress-php-session-problems-pantheon-script).

## Sessions and Scalability

Starting a session for _every_ user is an application anti-pattern. Serving pages to users with sessions cannot be done out of a cache, so creating a session for every visitor inherently makes your application unscalable.

Our plugin provides an admin screen to see how many sessions have been started. You can also examine the headers being sent by your website. If you start a new incognito window and see a "PHPSESS" cookie being sent in response to a request for your site, you have some over-eager sessions code.

Command line users can use this quick snippet to test:

```bash{promptUser: user}
curl -Is https://www.getpantheon.com | grep PHPSESS|wc -l
```

You should substitute your site URL in there, but the desired output is "0" (zero).

If your site is overly aggressively starting sessions, you should search through the codebase for references to `session_start()` or `$_SESSION` to see where it is happening and develop a workaround. If the code is in a community plugin, open an issue on WordPress.org to alert the author to the problem and share your solution.
