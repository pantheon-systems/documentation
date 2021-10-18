---
title: Convert a Custom Upstream to Integrated Composer
description: Convert a non-composer-managed D8-based custom upstream to Integrated Composer
type: guide
permalink: docs/guides/:basename
cms: "Drupal"
tags: [composer, workflow]
categories: [develop]
contributors: [namespacebrian]
reviewed: "2021-10-13"
---

This process is quite similar to the [Upgrade Pantheon Drupal 8 Sites to Drupal 9 With Integrated Composer](/docs/guides/drupal-9-migration/upgrade-to-d9) guide, except that we're staying on Drupal 8--to defer the Drupal 9 upgrade to later--and with some special considerations for custom upstreams.

We will replace the entire file structure with the code from Integrated Composer's upstream, then re-add your contrib and custom code to the new codebase.

## New Branch With Integrated Composer Code

1. Create a local clone of custom upstream repository, using the SSH URL, and change directory into the cloned repository.
  ```bash{promptUser:user}
  git clone <ssh_url>
  ```
1. Add Integrated Composer upstream as a second remote and fetch:
  ```bash{promptUser:user}
  git remote add ic https://github.com/pantheon-upstreams/drupal-project.git && git fetch ic
  ```
1. Create a new `composerify` branch to work in:
   ```bash{promptUser:user}
   git checkout -b composerify
   ```
1. On the `composerify` branch, run `git rm -rf *` and commit "Removing all files" - this is because we're going to completely replace the file structure and re-add customizations:
   ```bash{promptUser:user}
    git rm -rf * && git commit -m "Removing all files"
    ``` 
1. Add and commit files from integrated-composer upstream:
   ```bash{promptUser:user}
   git checkout ic/master .
   ```
   ```bash{promptUser:user}
   git add .
   ```
    ```bash{promptUser:user}
     git commit -m "Add and commit Integrated Composer files"
   ```
1. Navigate to `upstream-configuration/composer.json` in your text editor and change the `drupal/core-recommended` version to only Drupal 8, and commit: 
  ```bash{promptUser:user}
    "drupal/core-recommended": "^8.8"
  ```
  ```bash{promptUser:user}
    git commit -a -m "Setting Drupal core version to ^8.8"
  ```

## Add in Your Contrib and Custom Code

This process the same as in the [Add in the Custom and Contrib Code Needed to Run Your Site](https://pantheon.io/docs/guides/drupal-9-migration/upgrade-to-d9#contributed-code) section of the main Drupal 9 migration document.

If you want to audit your upstream's customizations, you may do so by comparing it with the drops-8 upstream. You can see the differences by adding the drops-8 upstream as a second remote and using `git diff` to compare the branches:
1. Add drops-8 as a second remote:
   ```bash{promptUser:user}
   git remote add drops-8 https://github.com/pantheon-systems/drops-8.git && git fetch drops-8
   ```
  * For a list of the differing files, use: `git diff --stat drops-8/master`
  * For different lines within a specific file, use: `git diff drops-8/master <file>`

Assess the differences and note the ones that you will need to reapply to the Integrated Composer codebase.

### Modules

1.  Get a list of the modules that will need to be re-added.
    - **If you know that all the sites have the same contrib and custom modules**, you can get the list of modules from a single representative site:
    `terminus drush <SITE_NAME>.dev  -- pm-list --type=module --no-core --status=enabled`
    - **If the sites have different modules installed**, you'll need to audit the modules across all sites and compile a unified list.
2. Audit modules on all sites - create and run this bash script:
      - Create a new file called `audit_site_modules.sh` with the following content:
      ```bash{promptUser:user}
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
      - Make it executable: `chmod +x audit_site_modules.sh`
      - Run it: `./audit_site_modules.sh`
      - It will create two new files in the same folder:
        - `d8_upstream_sites_modules.txt` - list of **modules** from each site
        - `d8_upstream_sites_themes.txt` - list of **themes** from each site
        - Go through these files and build a list of modules and themes you'll need to add to the codebase.

### Contrib Modules and Themes

1. In your terminal, change the current directory to the `upstream-configuration`: 
  ```bash{promptUser:user}
  cd upstream-configuration
  ```

1. For the each contrib module & theme in the list you've gathered, add each module with `composer require drupal/MODULE_NAME:^VERSION --no-update` and commit:
  ```bash{promptUser:user}
  composer require drupal/MODULE_NAME:^VERSION --no-update  
  ```

### Custom Modules and Themes

For custom modules and themes, the process is the same as the main Upgrade to Drupal 9 document:

  Modules:

  ```bash{promptUser:user}
  git checkout master modules/custom
  git mv modules/custom web/modules/
  git commit -m "Copy custom modules"
  ```

  Themes:

  ```bash{promptUser:user}
  git checkout master themes/custom
  git mv themes/custom web/themes/
  git commit -m "Copy custom themes"
  ```

  Follow suit with any other custom code you need to carry over.

## Individual Site Customizations

If your child sites contain site-specific code, you'll want to audit those differences from each site. Examples of site-specific code are: site-specific redirects, and custom modules only present on a specific site.
1. Clone site repository
1. Add your custom upstream as a second remote and fetch:
  ```bash{promptUser:user}
  git remote add upstream <upstream's git URL> && git fetch upstream`
  ```
1. Run a `git diff` of your sites code against the upstream:
  ```bash{promptUser:user}
  git diff upstream/master
  ```
  1. Take note of the differences, you will need to reapply these after applying the changes from the upstream.

## Final Deployment

Merge the "composerify" branch on the custom upstream onto the master branch.
