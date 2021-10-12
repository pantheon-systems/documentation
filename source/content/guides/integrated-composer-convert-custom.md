---
title: Convert a Custom Upstream to Integrated Composer
description: Convert a non-composer-managed D8-based custom upstream to Integrated Composer
type: guide
permalink: docs/guides/:basename
cms: "Drupal"
tags: [composer, workflow]
categories: [develop]
contributors: [namespacebrian]
reviewed: "2021-10-11"
---

This process is quite similar to the [Upgrade Pantheon Drupal 8 Sites to Drupal 9 With Integrated Composer](/docs/guides/drupal-9-migration/upgrade-to-d9) guide, except that we're staying on Drupal 8--to defer the Drupal 9 upgrade to do later--and with some special considerations for custom upstreams.

We will be replacing the entire file structure with the Integrated Composer upstream's code, then re-adding your contrib and custom code to the new codebase.



- Create a local clone of custom upstream repo
- ("Tips" section?) You may wish to audit your upstream's customizations by comparing it with the drops-8 upstream
  - You can see your custom upstream's differences adding the drops-8 upstream as a second remote and using `git diff` to compare the branches
    - Add drops-8 as a second remote `git remote add drops-8 https://github.com/pantheon-systems/drops-8.git && git fetch drops-8`
    - For a list of files which differ `git diff --stat drops-8/master`
    - For different lines in a specific file `git diff drops-8/master <file>`
  - Assess the differences and note the ones that you will need to re-apply to the integrated composer codebase

- Add integrated composer upstream as a second remote & fetch - `git remote add ic git@github.com:pantheon-upstreams/drupal-project.git && git fetch ic`
- Create a new `composerify` branch for working in: `git checkout -b composerify`
- (on 'composerify' branch) `git rm -rf *` and commit "Removing all files" - `git commit -m "Removing all files"` - this is because we're going to completely replace the file structure and re-add customizations
- Add and commit files from integrated-composer upstream: `git checkout ic .`  `git commit -m "Add and commit Integrated Composer files"`
- Edit `upstream-configuration/composer.json` and change the `drupal/core-recommended` version to only Drupal 8: `"drupal/core-recommended": "^8.8"`


- Add in your contrib and custom code
  - This process the same as in the [Add in the Custom and Contrib Code Needed to Run Your Site](https://pantheon.io/docs/guides/drupal-9-migration/upgrade-to-d9#contributed-code) section of the main Drupal 9 migration document.
  - Modules
    - Get a list of modules which will need to be re-added
      - If you know that all the sites have the same contrib and custom modules, you can get the list of modules from a single representative site:
        `terminus drush <SITE_NAME>.dev  -- pm-list --type=module --no-core --status=enabled`
      - If the sites have different modules installed, you'll need to audit the modules across all sites and compile a unified list
        - Audit modules on all sites - create and run this bash script
          - Create a new file called `audit_site_modules.sh` with the following content:
          ```
            #!/usr/bin/env bash

            echo 'Updating site list now with site urls from the custom Drupal 8 Upstream.'
            SITES=$(terminus site:list --upstream=a2457b48-2c68-4d01-b471-7ae1337c9320 --field=Name)

            #IFS=$'\n' # make newlines the only separator

            for site in $SITES
            do
              echo "$site"
              echo '-----------------'
              terminus drush $site.dev  -- pm-list --type=module --no-core --status=enabled
              echo '-----------------'
              echo
            done | tee d8_upstream_sites_modules.txt
          ```
          - Make it executable: `chmod +x audit_site_modules.sh`
          - Run it: `./audit_site_modules.sh`
          - It will create a new file in the same folder called `d8_upstream_sites_modules.txt` with the list of modules from each site

    - For contrib modules & themes, add each module with `composer require drupal/MODULE_NAME:^VERSION --no-update` and commit
    - For custom modules & themes, the process is the same as the main Upgrade to Drupal 9 document:

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


If your child sites contain site-specific code, you'll want to audit those differences from each site
- clone site repo
- add your custom upstream as a second remote and fetch: `git remote add upstream <upstream's git URL> && git fetch upstream`
- git diff your sites code against the upstream: `git diff upstream/master`
  - take note of the differences, you will need to re-apply these after applying the changes from the upstream


You can test the integrated composer update on each site by cloning the site's code, adding the upstream as a second remote, and creating a multidev with the new code from the upstream
- Clone site's code
- Add upstream as a second remote and fetch: `git remote add upstream <upstream's git URL> && git fetch upstream`
- Create a new composerify branch `git checkout -b composerify`
- Merge the changes from the upstream `git merge upstream/composerify`
- Push new branch up: `git push --set-upstream origin composerify`
- Create a new multidev with terminus: `terminus multidev:create <SITE_NAME>.dev composerify`
- Push a new commit with a trivial change, to get the build step to run - it doesn't run the first time `pantheon.yml` is pushed with `build_step: true`
- Always clear cache after a push: `terminus drush <SITE_NAME>.composerify cr`
- If you are encountering errors, it can be helpful to see recent watchdog messages: `terminus drush <SITE_NAME>.composerify ws`


