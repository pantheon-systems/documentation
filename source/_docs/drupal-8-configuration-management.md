---
title: Configuration Workflow for Drupal 8 Sites
description: Configure your Drupal site's performance and caching settings to make significant improvements.
tags: [devdrush, workflow]
categories: [drupal8]
---
Managing configuration is an extremely important part of any team website project, but in many cases, this area of the project does not receive as much attention as it deserves. The tools for Drupal 7 do not provide complete coverage of all configuration settings, leading to inconsistencies in configuration handling and inconvenient workarounds. This has led to configuration management becoming a real thorn in the side for many projects.

Pantheon supports the [Drupal 8 Configuration Management system](https://www.drupal.org/documentation/administer/config) and defaults configuration into the `sites/default/config` directory for each Pantheon Drupal 8 site. You can export your configuration into that directory directly using Drush's config-export command or indirectly using Drupal's UI to download the configuration and then use SFTP/Git to place the configuration in `sites/default/config`. For more information on how this all works, check out Matt Cheney and David Strauss' presentation on [Drupal 8 CMI on Managed Workflow at Drupalcon Amsterdam](https://www.youtube.com/watch?v=eg2dtPFyGxs).

<div class="panel panel-drop" id="accordion">
  <div class="panel-heading panel-drop-heading">
    <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#d8-config-video"><h3 class="panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-facetime-video"></span> Watch: Configuration Management in Drupal </h3></a>
  </div>
  <div id="d8-config-video" class="collapse">
    <script src="//fast.wistia.com/embed/medias/oczdbaylm0.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_oczdbaylm0 videoFoam=true" style="height:100%;width:100%">&nbsp;</div></div></div>
  </div>
</div>


## Basic Workflow

1.  With the Development environment in SFTP mode, export your configuration to code:

        drush cex -y

2.  Return to the Dashboard and commit the configuration changes.
3.  Deploy the code to Test.
4.  Import the configuration from code into the test environment database:

        drush cim -y

5.  Test the site.
6.  Deploy the code to Live.
7.  Import the configuration from code into the live environment database:

        drush cim -y

8.  Profit.

Using Terminus, you can complete the above process from the command line.

### Workflow Example

1.  `terminus drush <site>.dev -- cex -y`
2.  `terminus env:commit <site>.dev --message="Export configuration to code"`
3.  `terminus env:deploy <site>.test --sync-content --cc --updatedb --note="Deploy configuration to test"`
4.  `terminus drush <site>.<env> -- cim -y`
5.  `open https://test-mysite.pantheonsite.io`
6.  `terminus env:deploy <site>.live --cc --note="Deploy configuration to live"`
7.  `terminus drush <site>.live -- cim -y`
8.  `open live-mysite.pantheonsite.io`

## Configuration Tools for Drupal 8
With [Drupal 8](https://pantheon.io/drupal-8), much more powerful tools promise to greatly improve this situation. The new configuration management system provides complete and consistent import and export of all configuration settings, and Git already provides facilities for managing parallel work on different branches. When conflicts occur, it is  possible to back out the conflicting changes, take just the version provided in the central repository, or use three-way merge tools such as `kdiff3` to examine and manually resolve each difference. A new Drush project, [config-extra](https://github.com/drush-ops/config-extra), includes a `config-merge` command that streamlines the use of these tools.

## Config Direct Save Module
If you prefer to use a GUI to manage configuration management, try the Config Direct Save Module, available on [Drupal.org](https://www.drupal.org/project/config_direct_save). Activating this module creates a new **Update** menu option under your configuration menu. This module can make backups of configurations (when you check the backup check box) and override the sync (all files with old configuration) by the new configurations (replace all configurations files).

## Drush Config Workflow
Even with tools, a project needs to make a plan to manage the configuration workflow. To help projects get started, Pantheon has set up a public repository called [Drush Config Workflow](https://github.com/pantheon-systems/drush-config-workflow). This repository contains documentation on a couple of different configuration workflows that can be used during different phases of a project.

### Git Configuration
The [Git configuration workflow](https://github.com/pantheon-systems/drush-config-workflow/blob/master/docs/git_workflow.md) describes how to use `config-merge` to export your configuration changes, commit them to Git, push them to the central repository, pull the changes locally, and then merge them with your local development site’s configuration. All of this is done in a single command.

### rsync Configuration
The [rsync configuration workflow](https://github.com/pantheon-systems/drush-config-workflow/blob/master/docs/rsync_workflow.md) allows you to use a similar workflow in situations where you cannot make commits on the remote Drupal site. In these instances, `config-merge` will export changes to a temporary directory and then rsync them to the local system, where they are committed to a temporary branch in Git and then merged with the local configuration changes.

### Three-way Merge
Additionally, the [three-way merge page](https://github.com/pantheon-systems/drush-config-workflow/blob/master/docs/three_way_merge.md) in this repository describes what to do when the `config-merge` tool encounters a conflict, and brings up a three-way merge tool such as [kdiff3](http://kdiff3.sourceforge.net/). This tool can considerably reduce the time needed to comprehend and resolve merge conflicts.

![MySQL Credentials](/source/docs/assets/images/kdiff3-user-field-conflicts.png)

### Installation Script
If you would like to try out any of the example scenarios presented in the repository, there is also a handy installation script that will quickly set up a local environment for you to use. It can be used to either clone a Pantheon site locally, or it can create both sites locally. Instructions on how to use the script are detailed on the [installation page](https://github.com/pantheon-systems/drush-config-workflow/blob/master/INSTALL.md).

## Relocated Configuration Directory
Configuration files can contain sensitive information. Drupal takes some measures to protect the default configuration directory, but the conventional way to secure these files is to locate them outside of the document root so they are not web accessible. Following this convention may help make site configuration easier to manage.
### Before you Begin
- Refer to [Serving Sites from the Web Subdirectory](/docs/nested-docroot/) to enable nested docroot on a new or existing Drupal 8 site.

### Configure and Relocate
After implementing a nested docroot, set a new path (`/config`) for configuration directories by adding the following to `settings.php`:

```php
/**
 * Place the config directory outside of the Drupal root.
 */
$config_directories = array(
  CONFIG_SYNC_DIRECTORY => dirname(DRUPAL_ROOT) . '/config',
);
```

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">Care should be taken to ensure that this code is added after the `settings.pantheon.php` is included; otherwise, the `CONFIG_SYNC_DIRECTORY` will be overwritten with the Pantheon default value. The configuration directory must exist before this variable is changed.</p>
</div>

Relocate the configuration directory for the default location using `git mv`:

```
$ git mv web/sites/default/files/config .
```

For additional details, see [this blog post by Greg Anderson](https://pantheon.io/blog/relocating-drupal-8-configuration-outside-document-root).
