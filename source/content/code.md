---
title: Your Site Code on Pantheon
description: Learn how to work with your site's code on the Pantheon Dashboard.
tags: [git, dashboard]
categories: []
---
The Code tool within the Pantheon Dashboard on any environment allows you to interact with your site's code and review the commit log.

## Pantheon Git Repository
Your site's code repository includes your entire codebase, including core Drupal or WordPress, and any contributed modules, plugins, themes, installation profiles, libraries, etc. It does not include the `files/` directory (e.g. `sites/default/files` or `wp-content/uploads`) and should not contain any other static assets that you do not want tracked in version control.

### Drupal Code Structure

Drupal site code repositories are clones of one of our Drupal upstreams: [Drops-7](https://github.com/pantheon-systems/drops-7), or [Drops-8](https://github.com/pantheon-systems/drops-8), and consist of the following files and directories:

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


<Alert title="Note" type="info">

The `sites/default/files` directory is represented in your code repository as a symbolic link to the Pantheon environment's `files/` directory.

</Alert>

### WordPress Code Structure

WordPress site code repositories are clones of one our [WordPress upstream](https://github.com/pantheon-systems/wordpress), and consist of the following files and directories:

```
├── index.php
├── wp-activate.php
├── wp-config.php
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

<Alert title="Note" type="info">

The `wp-content/uploads` directory is represented in your code repository as a symbolic link to the Pantheon environment's `files/` directory.

</Alert>

## Managing Permissions
Permissions should be managed in the Dev environment via SFTP exclusively, as [Git only pays attention to the executable bit](https://git-scm.com/docs/user-manual.html).

## Navigate the Code Tool
You can set the site's connection mode to [git](/docs/git/) or [SFTP](/docs/sftp/) and access [connection information](/docs/sftp#sftp-connection-information) from within the Dev environment's Code tool. This is also where all changes to the site's codebase (located in the `/code` directory) are committed.
![Code Workflow Dev SFTP Commit](../docs/assets/images/dashboard/interface-dev-code-sftp-commit.png)

You can also view the diff output for each individual file:

![Diff output](../docs/assets/images/dashboard/diff-screen.png)

### Upstream Updates
The Dev environment provides [one-click updates](/docs/core-updates/) for your site's upstream. Updates will appear in the Code tool once they are committed to the upstream repository.

  <DefList>
  <Definition name="Upstream">
  A code repository that serves as a common package for your web application.
  </Definition>
  <Definition name="Repository">
  Centralized location of code intended for distribution.
  </Definition>
  </DefList>

<Alert title="Note" type="info">

The Test and Live environments do not have write access to code outside of the deployment process.

</Alert>

## Development
Get started by learning more about the [Pantheon workflow](/docs/pantheon-workflow/) and [environment configuration](/docs/read-environment-config/). Then, dive in to [developing directly with SFTP mode](/docs/sftp/) and [explore more ways](/docs/cms-admin/) of utilizing built-in admin tools.

### .gitignore
Pantheon provides default `.gitignore` files in the base of each site's code repository. It includes the path `sites/default/files` for Drupal sites, and `wp-contents/uploads` for WordPress sites. You can use this file to exclude directories from version control and backups.

## Performance
There are a lot of tools at your disposal when it comes to fine tuning dynamic sites. Resolve issues by [debugging slow performance](/docs/debug-slow-performance/) and utilizing the [PHP slow log](/docs/php-slow-log/).

Learn how to use [bots and indexing](/docs/bots-and-indexing/) in a way that does not negatively impact performance. You can also incorporate external Solr services with [IndexDepot](/docs/indexdepot/).

## See Also
- [Hot Fixes](/docs/hotfixes/)
- [What is the "pantheon_api.module"](/docs/modules#pantheon-module-drupal-7)
- [Email on Pantheon](/docs/email/)
- [Platform and Custom Domains](/docs/domains/)
- [SERVER_NAME and SERVER_PORT on Pantheon](/docs/server_name-and-server_port/)
- [LDAP and LDAPS](/docs/ldap-and-ldaps/)
- [Pantheon Enterprise Gateway](/docs/pantheon-enterprise-gateway/)
- [SSO and Identity Federation on Pantheon](/docs/sso/)
