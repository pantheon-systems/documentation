---
title: Serving Sites from the `web` Subdirectory
description: Learn how to create an nested docroot to serve your Pantheon site from.
categories: [developing,sites]
tags: [platform,code]
keywords: Composer, docroot
contributors:
 - ataylorme
---

The docroot is the directory from which your site is served. On Pantheon, this defaults to the root directory of the site's codebase. Specifying `web_root: true` in your [pantheon.yml](/docs/pantheon-yml) file allows you to serve site files from the `web` subdirectory of your site's code repository.

### Advantages and Use Cases
While URLs are limited to the web docroot, PHP is not. Using a nested docroot allows you to put PHP files for use in your web application one level above the web docroot so they are accessible via PHP but not from the web.

This is especially useful for third party dependencies, such as those installed and managed via [Composer](https://getcomposer.org/).

Any non-web scripts, such as [Pantheon Quicksilver scripts](https://github.com/pantheon-systems/quicksilver-examples), should be kept outside of the docroot as well.

## One-time setup

Below we recommend using Git, but you can also use SFTP to set your site up for nested docroot.

### Define Nested Docroot in pantheon.yml

- Clone your website locally with Git. For details, see [Starting with Git](https://pantheon.io/docs/git/).
- Create a `pantheon.yml` file if it doesn't already exist.
- Add the line `web_docroot: true` to the top level of the YAML file, typically after `api_version`, for example:
  ```
    api_version: 1

    web_root: true
  ```

- Add, commit, and push the `pantheon.yml` file with Git.

### Create a new site with a nested docroot

If your custom upstream has a `pantheon.yml` that enables nested docroot and the CMS code is in a `web` subdirectory then you should be good to go!

### Converting an existing site to use a nested docroot


You'll need to move CMS code into the `web` subdirectory. Get started with the one-liners below:

<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#d7" aria-controls="d7" role="tab" data-toggle="tab">Drupal 7</a></li>
  <li role="presentation"><a href="#d8" aria-controls="d8" role="tab" data-toggle="tab">Drupal 8</a></li>
  <li role="presentation"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <div role="tabpanel" class="tab-pane" id="d7">
  <pre><code class="bash hljs">
  mkdir -p web && git mv -k $(find . -type f -maxdepth 1 | grep -v pantheon.yml) includes/ misc/ modules/ profiles/ scripts/ sites/ themes/ web
  </code></pre>
  </div>
  <div role="tabpanel" class="tab-pane active" id="d8">
  <pre><code class="bash hljs">
  mkdir web && git mv -k $(find . -type f -maxdepth 1 | grep -v pantheon.yml) core drush modules profiles sites themes vendor web
  </code></pre>
  </div>
  <div role="tabpanel" class="tab-pane" id="wp">
  <pre><code class="bash hljs">
  mkdir web && git mv -k $(find . -type f -maxdepth 1  | grep -v pantheon.yml) wp-includes wp-content wp-admin web
  </code></pre>
  </div>
</div>

Of course, if you'd prefer to move the CMS code manually instead of using the one-liners above, you may do so.

The idea here is that `find . -type f -maxdepth` finds all files at the document root, including the "dot" files, but skips all of the directories. We list the directories in Drupal/WordPress core out specifically, so that any user-defined directories stay behind. This may or may not produce the correct results, depending on what files you or your team has added. Please verify file relocation with `git status` after using one of these commands before committing and pushing.



## Troubleshooting

## Quicksilver Script Location
If you are using a Quicksilver platform hook with the type `webphp`, make sure that the path to the script is relative to the `web` docroot and not the project root.

For example, if your `pantheon.yml` has a script location definition of `private/scripts/my_quicksilver_script.php` the file needs to be located at `web/private/scripts/my_quicksilver_script.php`. This is because `webphp` scripts are run with Nginx, which is serving from the nested docroot.

## Can I specify a subdirectory other than `web`?

The directory name is not configurable, but, you can [create a symlink](/docs/assuming-write-access/#create-a-symbolic-link) from some other directory to `web`.
