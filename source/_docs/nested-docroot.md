---
title: Serving Sites from the Web Subdirectory
description: Learn how to create an nested docroot to serve your Pantheon site from.
tags: [pantheonyml, workflow]
categories: []
contributors:
 - ataylorme
---

The docroot is the directory from which your site is served. On Pantheon, this defaults to the root directory of the site's codebase. Specifying `web_docroot: true` in your [pantheon.yml](/docs/pantheon-yml) file allows you to serve site files from the `web` subdirectory of your site's code repository on all Pantheon environments.

### Advantages and Use Cases
While URLs are limited to the web docroot, PHP is not. Using a nested docroot allows you to put PHP files for use in your web application one level above the web docroot so they are accessible via PHP but not from the web.

This is especially useful for third party dependencies, such as those installed and managed via [Composer](https://getcomposer.org/).

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>One-click Dashboard updates are not compatible with the nested <code>web</code> docroot, and you'll need to manually maintain core updates. We recommend using a <a href="https://pantheon.io/docs/custom-upstream/">Custom Upstream</a>.</p>
</div>

## One-Time Setup

Below we recommend using Git, but you can also use SFTP to set your site up for nested docroot.

### Define Nested Docroot in pantheon.yml
1. Set the Dev environment's connection mode to Git from within the Site Dashboard or via [Terminus](/docs/terminus):

 ```
 $ terminus connection:set <site>.<env> git
 ```

2. [Clone the site's codebase](/docs/git/#clone-your-site-codebase), if you haven't already.
3. Create a `pantheon.yml` file if it doesn't already exist.
4. Add the line `web_docroot: true` to the top level of the YAML file, typically after `api_version`. For example:
  ```
    api_version: 1

    web_docroot: true
  ```

5. Add, commit, and push the `pantheon.yml` file with Git.

### Create a New Site with a Nested Docroot
If your site utilizes a [Custom Upstream](/docs/custom-upstream/) with a `pantheon.yml` file that enables nested docroot and the CMS code is in a web subdirectory, you are good to go! Otherwise, create a new site and follow the steps below.

### Convert an Existing Site to Use a Nested Docroot


You'll need to move the CMS code into the `web` subdirectory, either manually or by using one of the commands below:

<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#d7" aria-controls="d7" role="tab" data-toggle="tab">Drupal 7</a></li>
  <li role="presentation"><a href="#d8" aria-controls="d8" role="tab" data-toggle="tab">Drupal 8</a></li>
  <li role="presentation"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="d7">
  <pre><code class="bash hljs">
  mkdir -p web && git mv -k $(find . -type f -maxdepth 1 | grep -v pantheon.yml) includes/ misc/ modules/ profiles/ scripts/ sites/ themes/ web
  </code></pre>
  </div>
  <div role="tabpanel" class="tab-pane" id="d8">
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

The idea here is that `find . -type f -maxdepth 1` finds all files at the document root, including the "dot" files, but skips all of the directories. We list the directories in Drupal/WordPress core out specifically, so that any user-defined directories stay behind. This may or may not produce the correct results, depending on what files you or your team has added. Please verify file relocation with `git status` after using one of these commands before committing and pushing.


## Troubleshooting

#### Quicksilver Script Location
If you are using a Quicksilver platform hook with the type `webphp`, make sure that the path to the script is relative to the `web` docroot and not the project root.

For example, if your `pantheon.yml` has a script location definition of `private/scripts/my_quicksilver_script.php`, the file needs to be located at `web/private/scripts/my_quicksilver_script.php`. This is because `webphp` scripts are run with Nginx, which is serving from the nested docroot.

#### Can I specify a subdirectory other than web?

The directory name is not configurable, but you can [create a symlink](/docs/assuming-write-access/#create-a-symbolic-link) from some other directory to `web`.
