---
title: Migrate a Drupal 8 Site to Drupal 9
subtitle: Create the Drupal 9 Site
description: 
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
permalink: docs/guides/drupal-9-hosted/create-site
anchorid: create-site
editpath: hosted/05-create-site.md
---

1. Create a new Drupal 9 Integrated Composer site from the Upstream using the: [Create Your Pantheon Site](https://dashboard.pantheon.io/sites/create?upstream_id=897fdf15-992e-4fa1-beab-89e2b5027e03) page. On the this page:

   - Enter a name for the site.

   - Choose an Organization if applicable.

   - Choose a region for the site. Click **Continue**.

   After you click **Continue**, it will take several minutes for the platform to configure everything.

1. In the **<span class="glyphicons glyphicons-wrench"></span> Dev** tab on the Dashboard, set the site's Development Mode to [SFTP](/sftp#sftp-mode).

1. In the Dev tab, click **Visit Development Site** and follow the prompts to complete the CMS installation.

1. Return to the Dev tab, set the site's **Development Mode** to Git, and [clone the site locally](/local-development#get-the-code).

1. In your local terminal, from the project root directory, run `composer install`.

<Accordion title="If your existing site has modules incompatible with MariaDB 10.4" id="consider-confirm-mariadb">

<Partial file="drupal-9/drupal-9-mariadb-considerations.md" />

<Partial file="confirm-db-upgrade-workflow.md" />

</Accordion>

## Set Drupal Core Version

Set the Drupal core version, to ensure the site remains on Drupal 8 for now:

  ```bash{promptUser:user}
  composer require --no-update drupal/core-recommended:^8.9
  composer require --dev drupal/core-dev:^8.9
  git add composer.*
  git commit -m "Remain on Drupal 8"
  ```
