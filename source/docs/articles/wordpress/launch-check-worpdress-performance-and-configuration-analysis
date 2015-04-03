---
title: Launch Check - WordPress Performance and Configuration Analysis
description: Learn more about the checks we automatically run on your site.
category:
  - WordPress

---

Pantheon provides static site analysis as a service for WordPress sites to make best practice recommendations on site configurations. These reports can be found in the Site Dashboard under the **Status tab**, and are accessible by site team members.

## Overview

Every site is unique, with its own individual configuration, content, audience, and so forth. On Pantheon they're all built with one of two CMS frameworks, Drupal or WordPress, and have the same architectural requirements. Therefore, it's possible to provide recommendations that fit the vast majority of use cases using a technique known as static program analysis by gathering performance & behavior patterns to see how a site works.

This mechanism does not actually perform requests on your site, and in doing so avoids the observer effect. It's non-intrusive, so no installation or configuration is required. Finally, it's completely automated for consistent reports and results.

In short, you get a fast, repeatable report that can help detect common problems and provide introspection into your site.

##How Does it Work?
WP Launch Check is an extension for WP-CLI designed for Pantheon.io customers. While designed initially for the Pantheon dashboard it is intended to be fully usable outside of Pantheon.

To use WP Launch Check from the command line, run ```wp launchcheck <subcommand>``` command.

For more information about WP-CLI, visit their [github page](https://github.com/wp-cli/wp-cli). For more information on WordPress Launch Check, go to the [Github repo](https://github.com/pantheon-systems/wp_launch_check/).


##What Does Launch Check Evaluate?

###Cron

This check verifies that Cron is enabled and what jobs are scheduled. It is enabled by default, but it if has been disabled you'll receive the following  message: "Cron appears to be disabled. Make sure disableo-wp-cron is not defined in your wp-config.php."


###Database

This displays database stats such as the number of rows in the options table, options being auto-loaded, tables using InnoDB storage engine (suggests a query to run if not), transients, and expired transients.


###Probable Exploits
This check will display a list of exploited patterns in code, the file name that has the exploit, line number, and match.

###Object Cache
This tells you if Object Caching and Redis are enabled.

###Plugins
This check lists all your enabled plugins and alerts you when they need to be updated. It also checks for any vulnerabilities.

**Green:** All of your plugins are up-to-date  
**Yellow:** Highlighted plugins need to be updated  
**Red:** Displays all vulnerabilities and unsupported plugins

####Unsupported Plugins
- [WP Super Cache](https://wordpress.org/plugins/wp-super-cache/)
- [W3 Total Cache](https://wordpress.org/plugins/w3-total-cache/)
- [batcache](https://wordpress.org/plugins/batcache/)

###PHP Sessions
Displays the files that references sessions. If any are found, you'll be prompted to install the native PHP sessions plugin.
