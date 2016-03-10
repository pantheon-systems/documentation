---
title: Your Site Code on Pantheon
description: Learn how to work with your site's code on the Pantheon Dashboard.
keywords: code, commit, sftp, development, how to connect, connection information, wp-admin, admin, administrator, codebase, repository, upstream
---
The Code tool within the Pantheon Dashboard on any environment allows you to interact with your site's code and review the commit log.

## Pantheon Git Repository
Your site's code repository includes your entire codebase, including core Drupal or WordPress, and any contributed modules, plugins, themes, installation profiles, libraries, etc. It does not include the `~files/` directory (e.g. `sites/default/files` or `wp-content/uploads`) and should not contain any other static assets that you do not want tracked in version control.

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

<div class="alert alert-info"><h4>Note</h4>The <code>sites/default/files</code> directory is represented in your code repository as a symbolic link to the Pantheon environment's <code>~/files</code> directory.</div>

### WordPress Code Structure

WordPress site code repositories are clones of one our [WordPress upstream](https://github.com/pantheon-systems/wordpress), and consist of the following files and directories:

```nohighlight
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

<div class="alert alert-info"><h4>Note</h4>The <code>wp-content/uploads</code> directory is represented in your code repository as a symbolic link to the Pantheon environment's <code>~/files</code> directory.</div>

## Navigate the Code Tool
You can set the site's [connection mode](/docs/getting-started/#interact-with-your-code) and access [connection information](/docs/developing-directly-with-sftp-mode#sftp-connection-information) from within the Dev environment's Code tool. This is also where all changes to the site's codebase (located in the `/code` directory) are committed.
![Code Workflow Dev SFTP Commit](/source/assets/images/interface-dev-code-sftp-commit.png)

You can also view the diff output for each individual file:

![Diff output](/source/assets/images/diff-screen.png)

### Upstream Updates
The Dev environment provides [one-click updates](/docs/applying-upstream-updates/) for your site's upstream. Updates will appear in the Code tool once they are committed to the upstream repository.
  <dl>
    <dt>Upstream</dt>
      <dd>A code repository that serves as a common package for your web application.</dd><br>
    <dt>Repository</dt>
      <dd>Centralized location of code intended for distribution.</dd>
  </dl>

<div class="alert alert-info" role="alert">
<h4>Note</h4>
The Test and Live environments do not have write access to code outside of the deployment process.</div>

## Development
Get started by learning more about the [Pantheon workflow](/docs/using-the-pantheon-workflow/) and [environment configuration](/docs/reading-pantheon-environment-configuration/). Then, dive in to [developing directly with SFTP mode](/docs/developing-directly-with-sftp-mode/) and [explore more ways](/docs/more-ways-of-managing-code-in-sftp-mode/) of utilizing built-in admin tools.
### `.gitignore`
Pantheon provides a default `.gitignore` file in the base of each site's code repository and in `sites/default/files`. You can use this file to exclude directories from version control and backups.

##Performance
There are a lot of tools at your disposal when it comes to fine tuning dynamic sites. Resolve issues by [debugging slow performance](/docs/debugging-slow-performance/) and utilizing the [PHP slow log](/docs/php-slow-log/).

Learn how to use [bots and indexing](/docs/bots-and-indexing/) in a way that does not negatively impact performance. You can also incorporate external Solr services with [IndexDepot](/docs/using-indexdepot-with-pantheon-sites/).

##See Also
- [Hot Fixes](/docs/hot-fixes/)
- [What is the "pantheon_api.module"](/docs/what-is-the-pantheon_api-module)
- [Email on Pantheon](/docs/email/)
- [Redirect Incoming Requests](/docs/redirect-incoming-requests/)
- [SERVER_NAME and SERVER_PORT on Pantheon](/docs/server_name-and-server_port/)
- [LDAP and LDAPS](/docs/ldap-and-ldaps/)
- [Pantheon Enterprise Gateway](/docs/pantheon-enterprise-gateway/)
- [SSO and Identity Federation on Pantheon](/docs/sso-and-identity-federation/)
