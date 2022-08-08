---
title: Pantheon Autopilot
subtitle: Apply Updates
description: descriptions
categories: [automate]
tags: [iterate, autopilot, testing, webops]
type: guide
layout: guide
showtoc: true
anchorid: apply-updates
permalink: docs/guides/autopilot/apply-updates/
editpath: autopilot/04-apply-updates.md
---

Autopilot updates and visually tests a copy of your site on a [Multidev](/guides/multidev) so it can detect issues before it tries to apply updates.

Autopilot can manage updates for any site that can [apply updates via the Site Dashboard](/core-updates#apply-upstream-updates-via-the-site-dashboard).

## Apply Available Updates

1. Navigate to the **Autopilot Status** screen, and then click **Queue Updates**.

    - You can also apply updates from the site list on the **<i className="fa fa-robot"></i> Autopilot** page. Navigate to the **Actions** <i className="fa fa-chevron-down fa-w-14"></i> drop-down menu next to each site name, and then click **Start Applying Updates**.

    - The platform adds the request to a queue, and will apply updates and deploy them to the chosen environments as quickly as possible, depending on current platform load.

1. Track the update status from the site's Autopilot **Activity** page.

### Autopilot and Drupal

Drupal base directories must exist for an Autopilot action (including updates) to succeed. You can [add a `.gitkeep` file](#autopilot-updates-fail-on-drupal-sites-with-no-config-directory) to each basic directory to ensure they exist. Basic Drupal directories with their default values are:

`$settings['file_temp_path'] = 'sites/default/temp';   // default values`
`$settings['file_public_path']  = 'sites/default/files';`
`$settings['file_private_path']  = 'sites/default/private';`
`$settings['config_sync_directory'] = 'sites/default/config';`

### Autopilot and Drupal 9 with Integrated Composer

Autopilot can manage updates for Pantheon Sites using the Pantheon-supported [Drupal 9](/drupal-9) Upstream with [Integrated Composer](/guides/integrated-composer).

## Autopilot Apply Updates Troubleshooting

### Autopilot updates fail on Drupal sites with no config directory

Autopilot updates will fail if you are have drops8, no exported / config directory, or the directory is not set in the main `settings.php` file and version-managed.

You must add a directory to the repository with a single `.gitkeep` file stored inside to successfully apply Autopilot updates. This creates the directory for the filesystem to use for updates. 

1. Run the command below to create the directory:

    ```bash{promptUser: user}
    git mkdir sites/default/config 
    ```

1. Run the command below to create the `.gitkeep` ﬁle:

    ```bash{promptUser: user}
    git touch sites/default/config/.gitkeep 
    ```
 
1. Run the add command to add `sites/default/config/.gitkeep` 

1. Commit and push your changes.

## More Resources

- [Autopilot FAQ](/guides/autopilot/autopilot-faq/)

- [Autopilot for Custom Upstreams](/guides/autopilot-custom-upstream)