---
title: Session and Cookie Handling
description: Details about configuring settings for session expiration and cookies.
categories:
  - developing
  - drupal
keywords: drupal, session expiration, cookie lifetime, session,
---
Pantheon allows developers to control the length of sessions. There are two pieces; the lifetime of the cookie and the lifetime of the session itself.  

The cookie lifetime is configured using the PHP setting [session.cookie\_lifetime](http://www.php.net/manual/en/session.configuration.php#ini.session.cookie-lifetime). If set to 0, the cookie is deleted when the user closes their browser. Set to 2,000,000 seconds in Drupal's default.settings.php and in Pantheon's PHP configuration.  
Drupal's [session garbage collection](https://api.drupal.org/api/drupal/includes%21session.inc/function/_drupal_session_garbage_collection/7) uses the PHP setting [session.gc\_maxlifetime](http://www.php.net/manual/en/session.configuration.php#ini.session.gc-maxlifetime) when deleting expired sessions from the sessions database table. Set to 200,000 seconds in Drupal's default.settings.php and in Pantheon's PHP configuration.  
For additional details and examples on how to set cookie lifetimes and garbage collection manually, see ​​the [documentation within default.settings.php](https://github.com/pantheon-systems/drops-7/blob/master/sites/default/default.settings.php#L289).
