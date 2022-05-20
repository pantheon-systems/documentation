---
title: Create a Basic WordPress Site with Composer on Pantheon
subtitle: Create a Basic Composer-managed WordPress Site 
description: Learn how to create a basic Composer-managed WordPress site on Pantheon.
categories: [develop]
tags: [wordpress]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/wordpress-composer/create-new-basic-wp-composer-site
anchorid: create-new-basic-wp-composer-site
---

This section provides steps for creating a new [Composer](/guides/composer)-managed WordPress site on Pantheon. This process creates a basic WordPress site. Visit the [Create an Advanced Composer-managed WordPress Site](/guides/wordpress-composer/create-wp-site-composer-ci-auto-test) section of this guide if you want to create a Composer-managed site that uses Continuous Integration and automated testing.

 You can review the Pantheon-maintained [WordPress Composer Repo](https://github.com/pantheon-systems/wordpress-composer/) for more details on the basic Composer-managed WordPress site creation process.

1. [Spin up a new WordPress site](/create-sites) on Pantheon. 

    - You will be redirected to the site's dashboard when the spin-up process is complete. 

1. Click the link under the site's name to access the **Dev** environment.

1. Run the WordPress installer.

    - You don't need to worry about database connection information in the WordPress database config screen. The details listed here are taken care of in the background. The only step that you need to complete is the site information to finish the installation process.

1. Review the `wp-config.php` in the Pantheon-maintained [Wordpress Composer Repo](https://github.com/pantheon-systems/wordpress-composer/#3-run-the-wordpress-installer) to get an understanding of the PHP configuration.