---
title: Non-Standard Files Locations
description: Learn how to address non-standard file locations from within the Pantheon filesystem.
tags: [debugfiles]
categories: []
---
## Standard File Path
Pantheon provides one location for files that are part of your sites content, like those that are managed through Drupal upload forms, e.g. user profile pictures: `/sites/default/files`. For Drupal sites, this is the *only* location you can use for files that are uploaded as part of your application. For WordPress sites, `/wp-content/uploads` is the only acceptable location for files. All other locations are considered part of your codebase, and under version control.

## Manage Non-Standard File Paths
### Move Files
If you are importing a site that has files in another location, manually move the files into the standard location (`/sites/default/files` for Drupal and `wp-content/uploads` for WordPress).

### Symlinks
If your site relies on code that expects to find files at non-standard locations (e.g., `/content/`), create a **symlink** to the standard location as a workaround:

<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <!-- Active tab -->
  <li id="tab-1-id" role="presentation" class="active"><a href="#tab-1-anchor" aria-controls="tab-1-anchor" role="tab" data-toggle="tab">WordPress</a></li>

  <!-- 2nd Tab Nav -->
  <li id="tab-2-id" role="presentation"><a href="#tab-2-anchor" aria-controls="tab-2-anchor" role="tab" data-toggle="tab">Drupal</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <!-- Active pane content -->
  <div role="tabpanel" class="tab-pane active" id="tab-1-anchor" markdown="1">
    If you haven't done so already, [clone your Pantheon site repository](/docs/git/#clone-your-site-codebase), then navigate to the project's root directory and execute the following commands:

  ```bash
  ln -s ./wp-content/uploads ./content
  git add content
  git commit files -m "adding legacy files location symlink"
  git push origin master
  ```
  </div>

  <!-- 2nd pane content -->
  <div role="tabpanel" class="tab-pane" id="tab-2-anchor" markdown="1">
    If you haven't done so already, [clone your Pantheon site repository](/docs/git/#clone-your-site-codebase), then navigate to the project's root directory and execute the following commands:

  ```bash
  ln -s ./sites/default/files ./content
  git add content
  git commit files -m "adding legacy files location symlink"
  git push origin master
  ```
  </div>
</div>

Symlinks are committed to version control and part of the codebase. Your legacy file paths should now work as expected. As long as the path you've chosen for your symlink does not conflict with a future core update to your application, this link will persist indefinitely. Consider opening an issue on the plugin or module's project page citing non-standard file paths when observed.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>Adding a symlink for a legacy directory path will not work with private files. If you have a private files use case, migrate the file paths and drop references to the legacy location.</p></div>
