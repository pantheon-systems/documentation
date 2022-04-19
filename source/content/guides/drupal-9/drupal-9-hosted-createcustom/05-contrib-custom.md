---
title: Migrate a Site That Was Created with a Custom Upstream to Drupal 9
subtitle: Add Contrib and Custom Code
description: 
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-hosted-createcustom/contrib-custom
anchorid: contrib-custom
editpath: drupal-9/drupal-9-hosted-createcustom/05-contrib-custom.md
---
This section describes how to replicate your selection of contributed modules and themes, and any custom modules or themes your development team has created in your new project structure.

<Accordion title="Optional Upstream Audit" id="optional-audit" icon="wrench">

If you would like to audit your upstream's customizations, compare it with the `drops-8` upstream.

Access the list of differences by adding the `drops-8` upstream as a second remote and use Git to compare the branches:

1. Change directories back to the `master` branch:

   ```bash{promptUser:user}
   cd master
   ```

2. Add `drops-8` as a second remote:

   ```bash{promptUser:user}
   git remote add drops-8 https://github.com/pantheon-systems/drops-8.git && git fetch drops-8
   ```

3. Return a list of the differing files:

   ```bash{promptUser:user}
   git diff --stat drops-8/master
   ```

4. Run `git diff` for different lines within a specific file:

   ```bash{promptUser:user}
   git diff drops-8/master $FILENAME
   ```

Compare the differences and note the ones that you will need to reapply to the Integrated Composer codebase.

</Accordion>

## Modules

On the `composerify` branch, make a list of the modules that will need to be re-added:

- **If you know that all the sites have the same contrib and custom modules**, get the list of modules from a single representative site. You will need this list in next steps:

  ```bash{promptUser:user}
  terminus drush $SITE.dev  -- pm-list --type=module --no-core --status=enabled
  ```

- **If you do not know whether the sites have the same contrib and custom modules installed**, audit the modules across all sites and compile a unified list:

  <Accordion title="Audit Contrib and Custom Modules" id="audit-contrib-custom-modules" icon="wrench">

  1. To audit modules on all sites, create a new file called `audit_site_modules.sh` with the following content:

    ```bash:title=audit_site_modules.sh
    #!/usr/bin/env bash

    echo 'Updating site list now with site urls from the custom Drupal 8 Upstream.'
    SITES=$(terminus site:list --upstream=a2457b48-2c68-4d01-b471-7ae1337c9320 --field=Name)

    for site in $SITES
    do
      echo "---------- $site -----------"
      terminus drush $site.dev  -- pm-list --type=module --no-core --status=enabled
      echo "----------------------------"
      echo
    done | tee d8_upstream_sites_modules.txt

    for site in $SITES
    do
      echo "---------- $site -----------"
      terminus drush $site.dev  -- pm-list --type=theme --no-core --status=enabled
      echo "----------------------------"
      echo
    done | tee d8_upstream_sites_themes.txt
      ```
    
  1. Make the script executable:

      ```bash{promptUser:user}
      chmod +x audit_site_modules.sh
      ```
    
  1. Run the script:

      ```bash{promptUser:user}
      ./audit_site_modules.sh
      ```

      - This creates two new files in the same folder:

        - `d8_upstream_sites_modules.txt`: list of **modules** from each site
        - `d8_upstream_sites_themes.txt`: list of **themes** from each site

  1. Go through these files and build a list of modules and themes you'll need to add to the codebase.

  </Accordion>

## Contrib Modules and Themes

1. In your terminal, from the `composerify` branch, `cd` to `upstream-configuration`:

  ```bash{promptUser:user}
  cd upstream-configuration
  ```

2. For each contrib module and theme in the list you've gathered

    1. Add the package and version with Composer. If the version starts with `8.x-`, remove that and only include the version number after `8.x-`.

      For example, if the version is `8.x-3.2`, use the version number `3.2`:

      ```bash{promptUser:user}
      composer require drupal/MODULE_NAME:^VERSION --no-update
      ```

    2. Confirm that only `composer.json` has been modified:

       ```bash{promptUser:user}
       git status
       ```

       - If anything other than `composer.json` has been modified, add the modified file to `.gitignore`.

    3. Commit the change:

      ```bash{promptUser:user}
      git commit -am "Adding MODULE_NAME"
      ```

## Custom Modules and Themes

<Partial file="drupal-9/custom-modules-themes.md" />

Commit your changes as needed.
