---
title: Pantheon Dashboard Code Tool
description: Learn how to work with your site's code on Pantheon's Dashboard code tool.
keywords: code, commit, sftp, development, how to connect, connection information, wp-admin, admin, administrator, codebase, repository, upstream
---
The Code tool within the Pantheon Dashboard on any environment allows you to interact with your site's code and review the commit log.
## Navigate the Code Tool
You can set the site's [connection mode](/docs/articles/getting-started/#interact-with-your-code) and access [connection information](/docs/articles/sites/code/developing-directly-with-sftp-mode/#sftp-connection-information) from within the Dev environment's Code tool. This is also where all changes to the site's codebase (located in the `/code` directory) are committed.
![Code Workflow Dev SFTP Commit](/source/docs/assets/images/interface-dev-code-sftp-commit.png)
The Dev environment also provides [one-click updates](/docs/articles/sites/code/applying-upstream-updates/) for your site's upstream. Updates will appear in the Code tool once they are committed to the upstream repository.
  <dl>
    <dt>Upstream</dt>
      <dd>A code repository that serves as a common package for your web application.</dd>
    <dt>Repository</dt>
      <dd>Centralized location of code intended for distribution.</dd>
  </dl>

<div class="alert alert-info" role="alert">
<h4>Note</h4>
The Test and Live environments do not have write access to code outside of the deployment process.</div>

## Development
Get started by learning more about the [Pantheon workflow](/docs/articles/sites/code/using-the-pantheon-workflow/) and [environment configuration](/docs/articles/sites/code/reading-pantheon-environment-configuration/). Then, dive in to [developing directly with SFTP mode](/docs/articles/sites/code/developing-directly-with-sftp-mode/) and [explore more ways](/docs/articles/sites/code/more-ways-of-managing-code-in-sftp-mode/) of utilizing built-in admin tools.
### `.gitignore`
Pantheon provides a default `.gitignore` file in the base of each site's code repository and in `sites/default/files`. You can use this file to exclude directories from version control and backups.

##Performance
There are a lot of tools at your disposal when it comes to fine tuning dynamic sites. Resolve issues by [debugging slow performance](/docs/articles/sites/code/debugging-slow-performance/) and utilizing the [PHP slow log](/docs/articles/sites/logs/php-slow-log/).

Learn how to use [bots and indexing](/docs/articles/sites/code/bots-and-indexing/) in a way that does not negatively impact performance. You can also incorporate external Solr services with [IndexDepot](/docs/articles/sites/code/using-indexdepot-with-pantheon-sites/).

##See Also
- [Hot Fixes](/docs/articles/sites/code/hot-fixes/)
- [What is the "pantheon_api.module"](/docs/articles/sites/code/what-is-the-pantheon_api-module)
- [Email on Pantheon](/docs/articles/sites/code/email/)
- [Redirect Incoming Requests](/docs/articles/sites/code/redirect-incoming-requests/)
- [SERVER_NAME and SERVER_PORT on Pantheon](/docs/articles/sites/code/server_name-and-server_port/)
- [LDAP and LDAPS](/docs/articles/sites/code/ldap-and-ldaps/)
- [Pantheon Enterprise Gateway](/docs/articles/sites/code/pantheon-enterprise-gateway/)
- [SSO and Identity Federation on Pantheon](/docs/articles/sites/code/sso-and-identity-federation/)
