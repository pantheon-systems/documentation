---
title: Create a Basic WordPress Site with Composer on Pantheon
subtitle: Create a Basic Composer-managed WordPress Site 
description: Learn how to create a Composer-managed WordPress site on Pantheon.
categories: [develop]
tags: [wordpress]
contributors: [whitneymeredith]
reviewed: "2021-08-05"
layout: guide
showtoc: true
permalink: docs/guides/wordpress-composer/create-new-basic-wp-composer-site
anchorid: create-new-basic-wp-composer-site
---

This section provides steps for creating a new Composer-managed WordPress site on Pantheon. You can review the Pantheon-maintained [WordPress Composer Repo](https://github.com/pantheon-systems/wordpress-composer/) for more details regarding this process.

1. [Spin up a new WordPress site](/create-sites) on Pantheon. 

    - You will be redirected to the site's dashboard when the spin-up process is complete. 

1. Click the link under the site's name to access the **Dev** environment.

1. Run the WordPress installer.

    - You don't need to worry about database connection information in the WordPress database config screen. The details listed here are taken care of in the background. The only step that you need to complete is the site information to finish the installation process.

1. Review the `wp-config.php` in the Pantheon-maintained [Wordpress Composer Repo](https://github.com/pantheon-systems/wordpress-composer/#3-run-the-wordpress-installer) to get an understanding of the PHP configuration.