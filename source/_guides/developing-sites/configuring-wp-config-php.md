---
title: Configuring wp-config.php
parent_guide:
  - Developing
filename: source/_guides/developing-sites/configuring-wp-config-php.md
---

## Overview

Wordpress configuration is set in wp-config.php, located within your Wordpress site root. When you spin up a Wordpress site, we automatically include this file for you with all the boilerplate you need to get started. Most users will not need to customize this file.

Pantheon uses environment variables to automatically supply configuration settings (e.g. Database credentials) dynamically to wp-config.php - no editing required. However, you are welcome to customize wp-config.php with any customizations you may need for plugins, themes and caching.

**Note:** You should _NEVER_ put the database connection information for a _Pantheon_ database within your wp-config.php. These credentials _will_ change. If you are having connection errors, please ensure you are running the latest version of Wordpress core and have the correct wp-config.php file for Pantheon.

## Local database configuration for development

If you are also developing locally and need to configure WordPress for your desktop environment, we recommend you create a wp-config-local.php file. This will be ignored by Pantheon and should not be tracked by version control by default since it's in the .gitignore file.

### Pantheon's WordPress Config
<script src="https://gist.github.com/joshkoenig/9646205.js"></script>
## How can I write logic based on the Pantheon server environment?

Depending on your use case, there are two possibilities.

For web only actions, like [redirects](/documentation/howto/redirect-incoming-requests/-redirect-incoming-requests), check for the existence of $\_SERVER['PANTHEON\_ENVIRONMENT'] - if it exists, it will contain a string with the current environment (dev, test or live).

<script src="https://gist.github.com/timani/6bd845402c7f8d0939a4.js"></script>

For actions that should take place on both web requests _and_ wp-cli commands (e,g, redis cache configuration), use the constant ​PANTHEON\_ENVIRONMENT. Again, it will contain dev, test or live.

<script src="https://gist.github.com/timani/f5600ecff83399da5069.js"></script>

As an example, here's how you can hard-code your Wordpress debug configuration based on the environment. To learn more, see [Defining variables in a wp-config.php](http://codex.wordpress.org/Editing_wp-config.php).

<script src="https://gist.github.com/timani/3e7f882c5ca49709b4e4.js"></script>
## How can I read the Pantheon environmental configuration, like database credentials?

See  [Reading the Pantheon Environment configuration](/documentation/howto/reading-pantheon-environment-configuration/).

## How do I perform redirection?

See  [Redirect Incoming Requests](/documentation/howto/redirect-incoming-requests/-redirect-incoming-requests).

## Where do I specify database credentials?

You don't have to! Pantheon automatically injects database credentials into the site environment; if you hard code database credentials, you will break the Pantheon workflow.

## Where can I get a copy of a default wp-config.php for Pantheon?

- Pantheon Wordpress -  [https://github.com/wp-ulysses/WordPress/blob/master/wp-config.php](https://github.com/wp-ulysses/WordPress/blob/master/wp-config.php)
- Wordpress Core -   [https://github.com/WordPress/WordPress/blob/master/wp-config-sample.php](https://github.com/WordPress/WordPress/blob/master/wp-config-sample.php)

## Are table prefixes supported?

For information about table prefixes on Pantheon, see [this](/documentation/advanced-topics/importing-an-existing-drupal-site-to-pantheon/-importing-an-existing-site#table-prefixes) article.
