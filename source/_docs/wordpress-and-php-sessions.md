---
title: WordPress and PHP Sessions
description: Detailed information on understanding the behaviors of WordPress and PHP sessions.
categories:
  - developing
  - WordPress
keywords: wordpress, php sessions, php
---
WordPress Core [does not use sessions](http://wordpress.org/support/topic/how-does-wordpress-handle-sessions-and-session-variables?replies=7). All "user state" is managed via cookies. This is a Core design decision.

However, some plugins or themes will use `session_start()` or PHP's `$_SESSION` superglobal. On Pantheon, support for sessions requires an [additional plugin](https://wordpress.org/plugins/wp-native-php-sessions) which we maintain. Sites that need to utilize PHP Sessions should install this plugin.

<div class="alert alert-danger" role="alert">
<h4>Warning</h4>
Given the variety of implementations, this plugin will not solve all <code>$_SESSION</code> based issues and errors. If you use this plugin and still have issues, modify the code within your theme or plugin that calls <code>$_SESSION</code> to remove this functionality or use an alternative.
</div>

## Troubleshooting Session Errors

Prior to installing our sessions plugin, you might see the following error:

```php
Warning: session_start(): user session functions not defined
```
Plugins with session-using code are relying on PHP's default session manager, which is temporary files on local disk. Pantheon does not support this because it will not work properly in our distributed environment.

### Install WP Native PHP Sessions Plugin
If `$_SESSIONs` are necessary for your application, install the [Pantheon-sessions](https://wordpress.org/plugins/wp-native-php-sessions) plugin:

1. Save the [installation script](https://gist.github.com/greg-1-anderson/dd033d820d0a9d2659e6)  locally within your current $PATH as `add-php-sessions-plugin.php`
2. Make the file executable:

 ```
 chmod +x add-php-sessions-plugin.php
 ```

3. Login with [Terminus](/docs/cli/):

 ```
 terminus auth login
 ```

4. Execute the installation script on your site:

 ```
 add-php-sessions-plugin.php <site>
 ```

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Replace <code>&lt;site&gt;</code> with your Pantheon site name.
</div>

Once enabled, your functionality will "just work". For more information, see [Fix WordPress PHP Session Problems on Pantheon with a Script](https://pantheon.io/blog/fix-wordpress-php-session-problems-pantheon-script).

## Sessions and Scalability

Starting a session for _every_ user is an application anti-pattern. Serving pages to users with sessions cannot be done out of a cache, so creating a session for every visitor inherently makes your application unscalable.

Our plugin provides an admin screen to see how many sessions have been started. You can also examine the headers being sent by your website. If you start a new incognito window and see a "PHPSESS" cookie being sent in response to a request for your site, you have some over-eager sessions code.

Command line users can use this quick snippet to test:
```bash
curl -Is https://www.getpantheon.com|grep PHPSESS|wc -l
```

You should substitute your site URL in there, but the desired output is "0" (zero).

If your site is overly agressively starting sessions, you should search through the codebase for references to `session_start()` or `$_SESSION` to see where it is happening and develop a workaround. If the code is in a community plugin, open an issue on wordpress.org to alert the author to the problem and share your solution.
