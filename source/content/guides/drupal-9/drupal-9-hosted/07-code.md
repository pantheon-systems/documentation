---
title: Migrate a Drupal 8 Site to Drupal 9
subtitle: Migrate the Code
description: 
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-9-hosted/code
anchorid: code
editpath: hosted/07-code.md
reviewed: "2021-03-31"
---

1. From the local Drupal 9 site's directory, use Terminus to retrieve the D8 site's Git URL:

  ```bash{promptUser: user}
  terminus connection:info $D8_SITE.dev --field=git_url
  ```

1. Add the Drupal 8 site as a remote repository called `existing-8`. Use the URL retrieved in the previous step:

  ```bash{promptUser: user}
  git remote add existing-8 ssh://codeserver.dev.xxxx@codeserver.dev.xxxx.drush.in:2222/~/repository.git
  git fetch existing-8
  ```

1. Copy over exported configuration from the original site. From your D9 site, run the following commands:

   <Partial file="drupal-9/copy-exported-config.md" />

1. Compare your current `pantheon.yml` file with the new D9 `pantheon.upstream.yml`:

  ```bash{promptUser: user}
  git diff existing-8/master:pantheon.yml pantheon.upstream.yml
  ```

1. If you have customizations in your D8 site's `pantheon.yml` that you want to keep for D9 (e.g., a Quicksilver script or site-specific protected web paths), copy `pantheon.yml` over:

  ```bash{promptUser: user}
  git checkout existing-8/master -- pantheon.yml
  git commit -m "Update pantheon.yml."
  ```

1. Copy over any Quicksilver scripts referenced in `pantheon.yml`:

  <TabList>

  <Tab title="With Nested Docroot" id="code-docroot" active={true}>

    ```bash{promptUser: user}
    git checkout existing-8/master -- private/scripts
    git commit -m "Add Quicksilver scripts."
    ```

  </Tab>

  <Tab title="Without Nested Docroot" id="code-nodocroot">

    ```bash{promptUser: user}
    git checkout existing-8/master -- private/scripts
    git commit -m "Add Quicksilver scripts."
    ```

  </Tab>

  </TabList>

1. List contrib modules and themes on your D8 site:

  ```bash{promptUser: user}
  terminus drush $D8_SITE.dev pm:projectinfo -- --fields=name,version --format=table
  ```

  The command `pm:projectinfo` assumes Drush 8. If you encounter an issue with this command, [verify and configure the Drush version](/guides/drush/drush-versions) before you continue.

1. Use Composer on your D9 site to add these there:

  ```bash{promptUser: user}
  composer require drupal/ctools:^3.4 drupal/redirect:^1.6 drupal/token:^1.7
  git add composer.*
  git commit -m "Add contrib projects."
  ```

1. Copy over any custom modules or themes from your D8 site:

   <Partial file="drupal-9/custom-modules-themes-no-docroot.md" />

1. Check `settings.php` for any customizations to copy over:

   <Partial file="drupal-9/custom-settings-no-docroot.md" />

1. Copy your files and database from your D8 site to the D9 site:

    ```bash{promptUser: user}
    terminus site:clone $D8_SITE.live $D9_SITE.dev --no-code --no-destination-backup --no-source-backup
    ```
    <Alert type="info" title="Note">
    
     The Site Clone plugin must be installed to use the `terminus site:clone` command. Visit <https://github.com/pantheon-systems/terminus-site-clone-plugin> for details on installing the Site Clone plugin.
     
    </Alert>
  
1. Push the D9 codebase from your local machine up to Pantheon:

    ```bash{promptUser: user}
    terminus connection:set $D9_SITE.dev git
    git push origin master
   ```

1. Run database updates:

    ```bash{promptUser: user}
    terminus drush $D9_SITE.dev -- updatedb
    ```
