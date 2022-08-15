---
title: Integrated Composer
subtitle: Add or Remove Individual Site Dependencies
description: Learn how to add or remove an individual site dependency.
tags: [composer, workflow]
categories: [get-started]
contributors: [ari, edwardangert]
reviewed: "2022-04-28"
layout: guide
showtoc: true
permalink: docs/guides/integrated-composer/dependencies
anchorid: dependencies
---

This sections provides information on how to add or remove individual site dependencies.

## Add a Dependency to an Individual Site

1. [Clone the Git repository](/guides/git/git-config#clone-your-site-codebase) from the Pantheon site's dashboard.

1. Run `composer install`:

   ```bash{promptUser: user}
    composer install
   ```

1. Add a new dependency locally:

   ```bash{promptUser: user}
    composer require drupal/pkg-name
   ```

1. Commit `composer.json` and `composer.lock` and push.

   - Pantheon will run Composer, build artifacts, and deploy the changes to your Dev or Multidev environment. You can now deploy the changes from the updated Dev environment to the Test and Live environments.

1. Complete the steps to [commit Dev changes to Test and Live](/pantheon-workflow#combine-code-from-dev-and-content-from-live-in-test) through your Pantheon dashboard or with [Terminus env:deploy](/terminus/commands/env-deploy).


## Remove Individual Site Dependencies

You can remove site dependencies if they are no longer needed. You should use caution when removing individual site dependencies. You can cause problems with your site if you decide you no longer need a module but leave it installed, and then remove site dependencies.

1. Clone the database from Live to all other environments before continuing.

1. Ensure that all modules in the package have been uninstalled. You can uninstall modules in the Drupal admin dashboard, or from the command line with Terminus:

    ```bash
    terminus drush site.live -- pm:uninstall module1 module2
   ```

1. Remove the dependency locally:

   ```bash{promptUser: user}
    composer remove drupal/pkg-name
   ```

1. Commit `composer.json` and `composer.lock` and push.

   - Pantheon will run Composer, generate build artifacts, etc.


## More Resources

- [Manage Some Dependencies with Composer](/guides/partial-composer)

- [Build Tools](/guides/build-tools/)