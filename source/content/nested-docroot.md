---
title: Serving Sites from the Web Subdirectory
description: Learn how to create a nested docroot to serve your Pantheon site from.
categories: [platform]
tags: [code, site, terminus, workflow]
contributors:
 - ataylorme
---

The docroot is the directory from which your site is served. On Pantheon, this defaults to the root directory of the site's codebase (`code`). Specifying `web_docroot: true` in your [pantheon.yml](/pantheon-yml/#site-local-configurations-pantheonyml) file or in the [pantheon.upstream.yml](/pantheon-yml/#custom-upstream-configurations-pantheonupstreamyml) file in your upstream allows you to serve site files from the `web` subdirectory of your site's code repository on all Pantheon environments (e.g. `code/web`).

<Alert title="Warning" type="danger">

Changing the settings of the `web_docroot` property will prevent you from updating your site via one-click Dashboard updates. To continue to use one-click updates, switch to a [Custom Upstream](/custom-upstream) that has the `web_docroot` property set in the `pantheon.upstream.yml` file.

</Alert>

## Advantages and Use Cases
While URLs are limited to the web docroot, PHP is not. Using a nested docroot allows you to put PHP files for use in your web application one level above the web docroot so they are accessible via PHP but not from the web.

This is especially useful for third party dependencies, such as those installed and managed via [Composer](/composer).

## Disable One-click Updates
If you wish to stop using One-click Dashboard updates on a particular site, and instead intend to update your site with Composer, switch the site's upstream to an empty repository using [Terminus](/terminus):

<TabList>

<Tab title="Drupal 7" id="d7-set-upstream" active={true}>

```bash
terminus site:upstream:set <site> empty-7
```

</Tab>

<Tab title="Drupal 8" id="d8-set-upstream">

```bash
terminus site:upstream:set <site> empty
```

</Tab>

<Tab title="WordPress" id="wp-set-upstream">

```bash
terminus site:upstream:set <site> empty-wordpress
```

</Tab>

</TabList>

## Enable Nested Docroot

Enable nested docroot by adjusting your site's `pantheon.yml` file. Below we recommend using Git, but you can also use SFTP to set up your site.

1. Set the Dev environment's connection mode to Git from within the Site Dashboard or via [Terminus](/terminus):

 ```bash{promptUser: user}
 terminus connection:set <site>.<env> git
 ```

2. [Clone the site's codebase](/git/#clone-your-site-codebase), if you haven't already.
3. Create a `pantheon.yml` file if it doesn't already exist.
4. Add the line `web_docroot: true` to the top level of the YAML file, typically after `api_version`. For example:

  ```yml
    api_version: 1

    web_docroot: true
  ```

5. Add, commit, and push the `pantheon.yml` file with Git.
6. Follow the instructions in either [Create a New Site with a Nested Docroot](#create-a-new-site) or [Convert an Existing Site to Use a Nested Docroot](#convert-an-existing-site) below.

### Create a New Site

If your site utilizes a [Custom Upstream](/custom-upstream) with a `pantheon.upstream.yml` file that enables nested docroot and the CMS code is in a web subdirectory, you are good to go! Otherwise, create a new site and follow the steps below.

### Convert an Existing Site

You'll need to move the CMS code into the `web` subdirectory, either manually or by using one of the commands below.

<TabList>

<Tab title="Drupal 7" id="d7" active={true}>
  The command below uses `find` to select all files at the document root, including "dot" files, but skips all directories and all files explicitly excluded in the `egrep` section. It then lists the specific core directories to move into the nested docroot. This may or may not produce the correct results, depending on what files you or your team has added. You can add files to be excluded in the list after `egrep`, and use the `-n` flag for `git mv` to perform a dry run first.

  [Clone the site's codebase](/git/#clone-your-site-codebase), then execute the following from the project root directory:

  ```bash{promptUser: user}
  mkdir web
  git mv -k $(find . -maxdepth 1 -type f | egrep -v 'pantheon.yml|.gitignore|README.md|pantheon.upstream.yml') includes/ misc/ modules/ profiles/ scripts/ sites/ themes/ index.php web
  ```

  These commands create the `web` subdirectory, then use Git to move required files into the nested docroot.

  Your directory structure should look like this afterwards:

  ```none
  ├── web
    ├── includes
    ├── index.php
    ├── misc
    ├── modules
    ├── profiles
    ├── scripts
    ├── sites
        └── all
            ├── modules
            └── themes
            └── default
            └── settings.php
    └── themes
  ```

</Tab>

<Tab title="Drupal 8" id="d8">

  The command below uses `find` to select all files at the document root, including "dot" files, but skips all directories and all files explicitly excluded in the `egrep` section. It then lists the specific core directories to move into the nested docroot. This may or may not produce the correct results, depending on what files you or your team has added. You can add files to be excluded in the list after `egrep`, and use the `-n` flag for `git mv` to perform a dry run first.

  [Clone the site's codebase](/git/#clone-your-site-codebase), then execute the following from the project root directory:

  ```bash{promptUser: user}
  mkdir web
  git mv -k $(find . -maxdepth 1 -type f | egrep -v 'pantheon.yml|.gitignore|README.md|pantheon.upstream.yml') core drush modules profiles sites themes vendor index.php web
  ```

  These commands create the `web` subdirectory, then use Git to move required files into the nested docroot.

  Your directory structure should look like this afterwards:

  ```none
  ├── web
    ├── core
    ├── drush
    ├── modules
    ├── profiles
    ├── sites
        ├── default
            ├── settings.php
    ├── themes
    ├── vendor
    ├── index.php
  ```

</Tab>

<Tab title="WordPress" id="wp">

  The command below uses `find` to select all files at the document root, including "dot" files, but skips all directories and all files explicitly excluded in the `egrep` section. It then lists the specific core directories to move into the nested docroot. This may or may not produce the correct results, depending on what files you or your team has added. You can add files to be excluded in the list after `egrep`, and use the `-n` flag for `git mv` to perform a dry run first.

  [Clone the site's codebase](/git/#clone-your-site-codebase), then execute the following from the project root directory:

  ```bash
  mkdir web
  git mv -k $(find . -maxdepth 1 -type f | egrep -v 'pantheon.yml|.gitignore|README.md|pantheon.upstream.yml') wp-includes wp-content wp-admin ./*.php web
  ```

  These commands create the `web` subdirectory, then use Git to move required files into the nested docroot.

  Your directory structure should look like this afterwards:

  ```none
  ├── web
    ├── index.php
    ├── wp-activate.php
    ├── wp-config.php
    ├── wp-config-local-sample.php
    ├── wp-config-pantheon.php
    ├── wp-comments-post.php
    ├── wp-blog-header.php
    ├── wp-admin
    ├── wp-cron.php
    ├── wp-load.php
    ├── wp-links-opml.php
    ├── wp-includes
    ├── xmlrpc.php
    ├── wp-trackback.php
    ├── wp-signup.php
    ├── wp-settings.php
    ├── wp-mail.php
    ├── wp-login.php
    ├── wp-content
      ├── index.php
      ├── mu-plugins
      ├── themes
      ├── plugins
  ```

</Tab>

</TabList>

After using one of these commands, verify the new file locations with `git status` before committing and pushing.

## FAQ and Troubleshooting

### Quicksilver Script Location
If you are using a Quicksilver platform hook with the type `webphp`, make sure that the path to the script is relative to the `web` docroot and not the project root.

For example, if your `pantheon.yml` has a script location definition of `private/scripts/my_quicksilver_script.php`, the file needs to be located at `web/private/scripts/my_quicksilver_script.php`. This is because `webphp` scripts are run with Nginx, which is serving from the nested docroot.

### Can I specify a subdirectory other than web?

The directory name is not configurable, but you can [create a symlink](/symlinks-assumed-write-access#create-a-symbolic-link) from some other directory to `web`.

### Can I use Localdev for local development of nested docroot sites?

Yes, Pantheon's [Localdev](/localdev) pulls configuration information from your site's [pantheon.yml](/pantheon-yml/#site-local-configurations-pantheonyml) and [pantheon.upstream.yml](/pantheon-yml/#custom-upstream-configurations-pantheonupstreamyml) files.
