---
title: Running Drupal 8 on Pantheon
description: Important information about installing and running Drupal 8 on your Pantheon site.
category:
    - drupal
keywords: drupal, drupal 8
---

## Installing Drupal 8 on Pantheon

Pantheon currently provides Drupal 8 as a one-click installation through our [Drupal 8 Installation Page](https://dashboard.pantheon.io/products/drupal8/spinup). After the installation, you will have a Drupal 8 site on Pantheon that will show up in your Dashboard and can be used with the [Pantheon development workflow](https://pantheon.io/docs/articles/sites/code/using-the-pantheon-workflow/).

## Updating Drupal 8 on Pantheon

Pantheon provides core updates to Drupal 8 using our Dashboard [upstream update process](https://pantheon.io/docs/articles/sites/code/applying-upstream-updates/). Please do not attempt to update Drupal 8 yourself, but instead wait for our Dashboard to give you the option to update Drupal 8 core with a single click:
![Drupal 8 Installation Page](/source/docs/assets/images/drupal8-updates.png)

If you have done no modification to Drupal 8 core, this process will work automatically. However, if you have made modifications (including applying patches from Drupal.org) you may run into conflicts. A good best practice is to remove any patches you have applied to Drupal 8 prior to updating and then reapply them after updating if they are still needed.


## Troubleshooting Problems with Drupal 8 on Pantheon

If you run into any problems with your Drupal 8 site, follow these steps:

1. Search the existing [Drupal issue queue](https://www.drupal.org/project/issues/drupal) for existing issues related to your problem. Pay special attention to the beta version to which issues correspond, as well as its current status to help narrow down your problem.
2. Search the existing [Pantheon Drupal 8 issue queue](https://github.com/pantheon-systems/drops-8/issues) for known issues running Drupal 8 on Pantheon. These are issues that only happen on Pantheon, but are not issues in other contexts (local development, simplytest.me, other hosting providers).
3. Attempt to debug the issue yourself using your own developer smarts and information you learned by searching the issue queues and other information sources (Google, Stack Overflow, etc).
4. Report your issue to the appropriate queue depending on if the problem is related to Drupal 8 generally ([Drupal issue queue](https://www.drupal.org/project/issues/drupal)) or is specific to Pantheon ([Pantheon issue queue](https://github.com/pantheon-systems/drops-8/issues)).
5. Monitor the issue you filed, test any available patches, and provide feedback as appropriate.

## Using Drush with Drupal 8 on Pantheon

Pantheon currently supports using Drush with Drupal 8 on Pantheon. In order to use Drush, you need to use Drush 7.x which can be [installed with Composer by following these instructions](http://docs.drush.org/en/master/install/). Afterwards, you can connect to your sites using the standard process of [using Drush on Pantheon](https://pantheon.io/docs/articles/local/drupal-drush-command-line-utility/). Take note that many Drush commands have changed in Drupal 8 and you should consult the [latest Drush 7 documentation](http://drushcommands.com/drush-7x) for more information.

## Using Drupal 8 Configuration Management on Pantheon

Pantheon supports the [Drupal 8 Configuration Management system](https://www.drupal.org/documentation/administer/config) and defaults configuration into the `sites/default/config` directory for each Pantheon Drupal 8 site. You can export your configuration into that directory directly using Drush's config-export command or indirectly using Drupal's UI to download the configuration and then use SFTP/Git to place the configuration in `sites/default/config`. For more information on how this all works, check out Matt Cheney and David Strauss' presentation on [Drupal 8 CMI on Managed Workflow at Drupalcon Amsterdam](https://amsterdam2014.drupal.org/session/drupal-8-cmi-managed-workflow).
