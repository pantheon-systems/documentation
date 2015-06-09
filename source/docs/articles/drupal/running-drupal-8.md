---
title: Running Drupal 8 on Pantheon
description: Important information about installing and running Drupal 8 on your Pantheon site.
category:
    - drupal
keywords: drupal, drupal 8
---

Drupal 8 is currently in the "beta phase" of development in the [Drupal Core Release Cycle](https://www.drupal.org/core/release-cycle). During this phase, Drupal core developers work to improve the codebase with a specific eye on resolving all of the "critical" issues and tasks in the [Drupal issue queue](https://www.drupal.org/project/issues/drupal). Once all of the "critical" issues are completed, then the first release candidate of Drupal 8 will be available. A full release of Drupal 8 will be made once no new "critical" issues are found in a two week period. Follow the progress on the [Drupal 8 Release Countdown](https://drupalreleasedate.com/) which estimates when the Drupal 8.0 release will happen.

## Installing Drupal 8 on Pantheon

Pantheon currently provides the latest Drupal 8 beta as a one click install through our [Drupal 8 Spinup Page](https://dashboard.pantheon.io/products/drupal8/spinup):<br />
![Drupal 8 Spinup Page](/source/docs/assets/images/drupal8-spinup.png)
After following that spinup page, Pantheon developers will have a Drupal 8 site on Pantheon that will show up in their Dashboards and can be used with the [Pantheon development workflow](https://pantheon.io/docs/articles/sites/code/using-the-pantheon-workflow/).

## Updating Drupal 8 on Pantheon

Pantheon provides core updates to Drupal 8 using our [dashboard upstream update process](https://pantheon.io/docs/articles/sites/code/applying-upstream-updates/). Please do not attempt to update Drupal 8 yourself, but instead wait for our Dashboard to give you the option to update Drupal 8 core with a single click:
![Drupal 8 Spinup Page](/source/docs/assets/images/drupal8-updates.png)
If you have done no modification to Drupal 8 core, this process will work automatically. However, if you have made modifications (including applying patches from Drupal.org) you may run into conflicts. A good best practice is to remove any patches you have applied to Drupal 8 prior to updating and then reapply them after updating if they are still needed.


## Troubleshooting Problems with Drupal 8 on Pantheon

Since Drupal 8 is currently in a "beta" state, there are a number of known issues spread across the different functional parts of Drupal 8 which may pose problems for developers creating Drupal 8 sites. If you run into a problem with your Drupal 8 site, please follow these steps:

1. Search the existing [Drupal issue queue](https://www.drupal.org/project/issues/drupal) for existing issues related to your problem. Pay special attention to the beta version to which issue corresponds as well as its current status to help narrow down your problem.
2. Search the existing [Pantheon Drupal 8 issue queue](https://github.com/pantheon-systems/drops-8/issues) for known issues running Drupal 8 on Pantheon. These are issues that only happen on Pantheon, but are not issues in other contexts (local development, simplytest.me, other hosting providers).
3. Attempt to debug the issue yourself using your own developer smarts and information you learned by searching the issue queues and other information sources (Google, Stack Overflow, etc).
4. Report your issue to the appropriate queue depending on if the problem is related to Drupal 8 generally ([Drupal issue queue](https://www.drupal.org/project/issues/drupal)) or is specific to Pantheon ([Pantheon issue queue](https://github.com/pantheon-systems/drops-8/issues)).
5. Monitor the issue you filed, test any available patches, provide feedback as appropriate, and watch for the next beta release. Each week many issues are fixed and new beta releases contain lots of fixes that may help your problem!

## Using Drush with Drupal 8 on Pantheon

Pantheon currently supports using Drush with Drupal 8 on Pantheon. In order to use Drush, you need to be using Drush 7.x which can be [installed with Composer by following these instructions](http://docs.drush.org/en/master/install/). Afterwards, developers can connect to their sites using the standard process of [using Drush on Pantheon](https://pantheon.io/docs/articles/local/drush-command-line-utility/). Take note that many Drush commands have changed in Drupal 8 and developers should consult the [latest Drush 7 documentation](http://drushcommands.com/drush-7x) for more information.

## Using Drupal 8 Configuration Management on Pantheon

Pantheon supports the [Drupal 8 Configuration Management system](https://www.drupal.org/documentation/administer/config) and defaults configuration into the sites/default/config directory for each Pantheon Drupal 8 site. Developers can export their configuration into that directory directly using Drush's config-export command or indirectly using Drupal's UI to download the configuration and then using SFTP/Git to place the configuration in sites/default/config. For more information on how this all works, check out Matt Cheney and David Strauss' presentation on [Drupal 8 CMI on Managed Workflow at Drupalcon Amsterdam](https://amsterdam2014.drupal.org/session/drupal-8-cmi-managed-workflow).

## Going Live with Drupal 8

Pantheon currently does not recommend running customer sites in production with Drupal 8. However, if you are doing a community or educational project with Drupal 8 that you would like to go live please [contact us for a free live Drupal 8 site](https://pantheon.io/free-website-management-platform-beyond-hosting).
