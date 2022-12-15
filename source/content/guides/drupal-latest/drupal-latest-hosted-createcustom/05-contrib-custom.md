---
title: Migrate a Custom Upstream to Drupal:latest
subtitle: Add Contrib and Custom Code
description: 
cms: "Drupal:latest"
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither, michellecolon-pantheon]
layout: guide
showtoc: true
permalink: docs/guides/drupal-latest-hosted-createcustom/contrib-custom
anchorid: contrib-custom
editpath: drupal-latest/drupal-latest-hosted-createcustom/05-contrib-custom.md
reviewed: "2022-12-12"
contenttype: [guide]
categories: [migrate, git]
newcms: [drupal, drupal8, drupal9, drupal10]
audience: [development]
product: [dashboard, custom-upstreams]
integration: [--]
---

This section describes how to replicate your selection of contributed modules and themes, and any custom modules or themes your development team has created in your new project structure.

<Accordion title="Optional Upstream Audit" id="optional-audit" icon="wrench">

[[ Drops 8 is deprecated. Not sure what to do here. -t ]]

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

    echo 'Updating site list now with site urls from the custom Drupal:latest Upstream.'
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

<Partial file="drupal-latest/custom-modules-themes.md" />
