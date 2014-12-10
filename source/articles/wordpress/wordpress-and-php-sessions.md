---
title: WordPress and PHP Sessions
description: Understand the behaviors of WordPress and PHP sessions.
category:
  - developing
filename: source/_guides/wordpress-and-php-sessions.md
---

WordPress Core [does not use sessions](http://wordpress.org/support/topic/how-does-wordpress-handle-sessions-and-session-variables?replies=7). All "user state" is managed via cookies. This is a Core design decision.

However, some plugins or themes will use `session_start()` or PHP's `$_SESSION` superglobal. On Pantheon, support for sessions requires an [additional plugin](https://wordpress.org/plugins/wp-native-php-sessions) which we maintain.

## Troubleshooting Plugins

Prior to installing our sessions plugin, you might see the following error:

`Warning: session_start(): user session functions not defined`

Plugins with session-using code are relying on PHP's default session manager, which is temporary files on local disk. Pantheon does not support this because it will not work properly in our distributed environment.

If `$_SESSIONs` are necessary for your application, you should [install our native PHP session handling plugin](https://wordpress.org/plugins/wp-native-php-sessions). Once enabled, your functionality will "just work".

## Sessions and Scalability

Starting a session for _every_ user is an application anti-pattern. Serving pages to users with sessions cannot be done out of a cache, so creating a session for every visitor inherently makes your application unscalable.

Our plugin provides an admin screen to see how many sessions have been started. You can also examine the headers being sent by your website. If you start a new incognito window and see a "PHPSESS" cookie being sent in response to a request for your site, you have some over-eager sessions code.

Command line users can use this quick snippit to test:

`curl -Is https://www.getpantheon.com|grep PHPSESS|wc -l`

Obviously you should substitute your site url in there, but the desired output is "0" (zero).

If your site is overly agressively starting sessions, you should search through the codebase for references to `session_start()` or `$_SESSION` to see where it is happening and develop a workaround. If the code is in a community plugin, open an issue on wordpress.org to alert the author to the problem and share your solution.
