---
title: Migrate a Drupal 8 Site to drupal:latest
subtitle: Create the Drupal Site
description: 
cms: "Drupal:latest"
tags: [code, launch, migrate, site, updates, D8, D9, D10]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-latest-hosted/create-site
anchorid: create-site
editpath: hosted/05-create-site.md
reviewed: "2022-12-12"
contenttype: [guide]
categories: [create, migrate]
newcms: [drupal9, drupal10]
audience: [development]
product: [dashboard, composer]
integration: [--]
---

1. Create a new Drupal 9 Integrated Composer site from the Upstream using the: [Create Your Pantheon Site](https://dashboard.pantheon.io/sites/create?upstream_id=897fdf15-992e-4fa1-beab-89e2b5027e03) page. On the this page:

   - Enter a name for the site.

   - Choose a workspace if applicable.

   - Choose a region for the site. Click **Continue**.

   After you click **Continue**, it will take several minutes for the platform to configure everything.

1. In the **<span class="fa fa-wrench"></span> Dev** tab on the Dashboard, set the site's Development Mode to [SFTP](/guides/sftp).

1. In the Dev tab, click **Visit Development Site** and follow the prompts to complete the CMS installation.

1. Return to the Dev tab, set the site's **Development Mode** to Git, and [clone the site locally](/guides/local-development/configuration).

1. In your local terminal, from the project root directory, run `composer install`.

<Accordion title="If your existing site has modules incompatible with MariaDB 10.4" id="consider-confirm-mariadb">

<Partial file="drupal-latest/drupal-latest-mariadb-considerations.md" />

<Partial file="confirm-db-upgrade-workflow.md" />

</Accordion>

## Set Drupal Core Version

Set the Drupal core version to ensure the site remains on Drupal 8 for now:

<Partial file="drupal-latest/core-version-remain-on-d8.md" />
