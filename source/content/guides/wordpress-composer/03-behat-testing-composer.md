---
title: WordPress with Composer on Pantheon
subtitle: Use Behat Testing with Your Composer-managed WordPress Site 
description: Learn how to use Behat testing with your Composer-based WordPress site. 
categories: [develop]
tags: [wordpress]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/wordpress-composer/behat-testing-composer
anchorid: behat-testing-composer
---

This section provides information on how to use Behat testing with your Composer-based WordPress site.

Behat testing uses `.ci/test/behat` and `tests/behat`. [Behat](https://behat.org/en/latest/) is an acceptance/end-to-end testing framework written in PHP. It facilitates testing the fully-built WordPress site on Pantheon. [WordHat](https://wordhat.info/) is used to help integrate Behat and WordPress.

- `.ci/test/behat/initialize` deletes any existing WordPress user from Behat testing and creates a backup of the environment to be tested.

- `.ci/test/behat/run` sets the `BEHAT_PARAMS` environment variable with dynamic information necessary for Behat and configures it to use [WP-CLI](https://wp-cli.org/) via [Terminus](/terminus). This script also creates the necessary WordPress user, starts headless Chrome, and runs Behat.

- `.ci/test/behat/cleanup` restores the previously made database backup, deletes the WordPress user created for Behat testing, and saves screenshots taken by Behat.

- `tests/behat/behat-pantheon.yml` runs tests against the Pantheon site.

- `tests/behat/tests/behat/features` stores Behat `.feature` extension test files. 

1. Store all `.feature` extension test files in the `tests/behat/tests/behat/features` directory.

    - The example tests must be replaced with project-specific tests.

        - `tests/behat/tests/behat/features/visit-homepage.feature` is a Behat test file that visits the homepage and verifies a `200` response.

        - `tests/behat/tests/behat/features/admin-login.feature` is a Behat test file that logs into the WordPress dashboard as an administrator and verifies access to new user creation.

        - `tests/behat/tests/behat/features/admin-login.feature` is a Behat test file that logs into the WordPress dashboard as an administrator, updates the `blogname` and `blogdescription` settings, clears the Pantheon cache, visits the home page, and verifies how the updated blog name and description appear.


## More Resources

- [Automate Testing with Behat](/guides/behat)