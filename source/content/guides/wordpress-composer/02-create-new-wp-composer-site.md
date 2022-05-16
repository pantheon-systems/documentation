---
title: WordPress with Composer on Pantheon
subtitle: Create a Composer-managed WordPress Site 
description: Learn how to create a Composer-managed WordPress sit on Pantheon.
categories: [develop]
tags: [wordpress]
layout: guide
showtoc: true
permalink: docs/guides/wordpress-composer/create-new--wp-composer-site
anchorid: create-new-wp-composer-site
---

This section provides steps for creating a new Composer-managed WordPress site on Pantheon. You can review the Pantheon-maintained [WordPress Composer Repo](https://github.com/pantheon-systems/wordpress-composer/) for more details regarding this process.

1. [Spin up a new WordPress site](/create-sites) on Pantheon. 

    - You will be redirected to the site's dashboard when the spin-up process is complete. 

1. Click the link under the site's name to access the Dev environment.

1. Run the WordPress installer.

    - How about the WordPress database config screen? No need to worry about database connection information in the WordPress database config screen. This is taken care of in the background. The only step that you need to complete is the site information and the installation process will be complete.

1. Review the `wp-config.php` in the Pantheon-maintained [Wordpress Composer Repo](https://github.com/pantheon-systems/wordpress-composer/#3-run-the-wordpress-installer) to get an understanding of the PHP configuration.