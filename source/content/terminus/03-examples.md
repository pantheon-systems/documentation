---
title: Terminus Guide
subtitle: Get Started
description: Learn how to apply updates, deploy code, switch upstreams, and install Drush and WP-CLI with Terminus.
terminuspage: true
type: terminuspage
layout: terminuspage
categories: [develop]
tags: [reference, cli, local, terminus, workflow]
permalink: docs/terminus/examples
anchorid: examples
---

This section provides information on how to apply updates, deploy code, switch upstreams, and install Drush and WP-CLI with Terminus, as well as information on command structure and automatic site and environment detection.

## Understand Commands

### Basic Format

The basic format of a Terminus command is:

```bash{promptUser: user}
terminus command:subcommand <site>.<env>
```

### More Information Command

You can find more information on any command:

```bash{promptUser: user}
terminus command:subcommand -h
```

### List of Commands

You can get a list of all available commands:

```bash{promptUser: user}
terminus list
```

### site.env

Terminus command structure typically includes `<site>.<env>` in order to determine the target site and environment to execute against. Note that the `<>` symbols are part of the example, and should not to be included in your commands. For example, running the `env:clear-cache` command for the Live environment of a site labeled "Your Awesome Site":

![terminus env:clear-cache your-awesome-site.live](../../images/terminus-example-cc.png)

<Accordion title="Learn More" id="identify-site" icon="lightbulb">

**Site Label**
Human readable, such as `Your Awesome Site`, entered during site creation and displayed in the Site Dashboard.

**Site Name**
Machine readable, such as `your-awesome-site`, either derived automatically by the platform from the site label or uniquely defined during site creation via Terminus. This value is used to construct [platform domains](/guides/domains).

**Environment Name**
Machine readable, such as `dev`, `test`, `live`, or `bug123`, which refers to the target site environment on Pantheon.

You can also find your site's machine name using the Terminus command `site:info`, and the [site UUID](/guides/account-mgmt/workspace-sites-teams/workspaces#retrieve-the-workspace-uuid). For example:

![terminus site:info e9ad4349-621e-4be6-9f94-f9646069d9e7 --field name](../../images/terminus-examples-field-name.png)

</Accordion>

### Automatic Site and Environment Detection

Terminus automatically detects the site and environment if a `<site>.<env>` parameter is not provided to a command that requests one. Terminus detects and operates from the local copy and current branch of the Pantheon site checked out at the current working directory.

```bash
git clone ssh://codeserver.dev.UUID@codeserver.dev.UUID.drush.in:2222/~/repository.git mysite
cd mysite
terminus env:info
```

The example above is equivalent to `terminus env:info mysite.dev`.

### Drush and WP-CLI

Pantheon supports [Drush (Drupal)](https://drushcommands.com/) and [WP-CLI (WordPress)](https://developer.wordpress.org/cli/commands/) commands remotely against a target site environment through Terminus. This is often faster and easier than leveraging such tools via local installations.

1. Use the [basic command structure described above](#command-structure).

  The commands to invoke Drush and WP-CLI are:
   - `remote:drush`
   - `remote:wp`

1. Include `--` followed by the Drush or WP-CLI command and all arguments. For example:

  ![terminus remote:wp your-awesome-site.dev --plugin activate debug-bar](../../images/terminus-wp-cli-example.png)

Refer to [Drupal Drush Command-Line Utility](/guides/drush) and [Use WP-CLI On The Pantheon Platform](/guides/wp-cli) for more information.

## Apply Updates

You can quickly apply updates from the command line with Terminus, including updates to:

- Core
- Contributed modules
- Themes
- Plugins

### Upstream Updates (Core)

Pantheon maintains upstream updates for [WordPress](https://github.com/pantheon-systems/WordPress) and [Drupal 7](https://github.com/pantheon-systems/drops-7). Updates can be applied after they have been merged into the upstream and become available for a site.

<Alert title="Note"  type="info" >

Refer to [Upstream Updates](/core-updates#apply-upstream-updates-manually-from-the-command-line-to-resolve-merge-conflicts) for instructions on how to resolve merge conflicts.

</Alert>

1. List available upstream updates:

  ```bash{promptUser: user}
  terminus upstream:updates:list my-site
  ```

  If the environment's connection mode is currently set to SFTP with uncommitted work you want to keep, commit before proceeding:

  ```bash{promptUser: user}
  terminus env:commit my-site.dev --message="My code changes"
  ```

  <Alert title="Warning" type="danger" >

  The following command will permanently delete all uncommitted SFTP changes. Commit your work before proceeding if you want to keep SFTP changes.

  </Alert>

1. Set the environment's connection mode to Git to pull updates into the site from Pantheon's upstream:

  ```bash{promptUser: user}
  terminus connection:set my-site.dev git
  ```

1. Apply available upstream updates for WordPress and Drupal core from the command line with Terminus:

  ```bash{promptUser: user}
  terminus upstream:updates:apply my-site
  ```

### Module, Theme, and Plugin Updates

Apply updates to all contributed modules, themes, and plugins via Terminus by setting the environment's connection mode to SFTP and invoking [Drush](/guides/drush) (Drupal) or [WP-CLI](/guides/wp-cli) (WordPress) update commands. You can then use Terminus to commit updates to a development environment on Pantheon.

<TabList>

<Tab title="Drupal" id="drupaltab" active={true}>

1. Set the Dev environment's connection mode to SFTP:

  ```bash{promptUser: user}
  terminus connection:set my-site.dev sftp
  ```

1. Apply updates to all contrib projects:

  ```bash{promptUser: user}
  terminus drush my-site.dev -- pm-updatecode --no-core
  ```

1. Commit contrib updates to the Dev environment:

  ```bash{promptUser: user}
  terminus env:commit my-site.dev --message="Update all contrib projects"
  ```

</Tab>

<Tab title="WordPress" id="wptab">

1. Set the Dev environment's connection mode to SFTP:

  ```bash{promptUser: user}
  terminus connection:set my-site.dev sftp
  ```

1. Apply updates to all plugins:

  ```bash{promptUser: user}
  terminus wp my-site.dev -- plugin update --all
  ```

1. Apply updates to all themes:

  ```bash{promptUser: user}
  terminus wp my-site.dev -- theme update --all
  ```

1. Commit plugin and theme updates to the Dev environment:

  ```bash{promptUser: user}
  terminus env:commit my-site.dev --message="Update all plugins and themes"
  ```

</Tab>

</TabList>

### Mass Update

Terminus supports third-party plugins that extend functionality by adding new commands. The following example demonstrates the [Mass Update](https://github.com/pantheon-systems/terminus-mass-update) plugin to apply upstream updates (core updates) in bulk. Refer to the [Plugins](/terminus/plugins) section for instructions on how to install Terminus plugins.

1. Install the [Mass Update](https://github.com/pantheon-systems/terminus-mass-update) plugin, then use the `--dry-run` option to review available upstream updates without applying them:

  ```bash{promptUser: user}
  terminus site:list --format=list | terminus site:mass-update:apply --accept-upstream --updatedb --dry-run
  ```

  The output should be similar to this:

  ```bash
  [notice] Found 3 sites.
  [notice] Fetching the list of available updates for each site...
  [notice] 3 sites need updates.
  [warning] Cannot apply updates to novasoft-drupal because the dev environment is not in git mode.
  [DRY RUN] Applying 2 updates to jessiem-drupal7
  [DRY RUN] Applying 10 updates to superb-central
  ```

1. Resolve warning messages shown in the `--dry-run` output by setting the connection mode to Git for each applicable site:

  <Alert title="Warning" type="danger" >

  The following command will permanently delete all uncommitted SFTP changes. Commit your work before continuing if you want to keep SFTP changes.

  </Alert>

  ```bash{promptUser: user}
  terminus connection:set my-site.dev git
  ```

1. Review the output and then apply the mass update by removing the `--dry-run` option:

  ```bash{promptUser: user}
  terminus site:list --format=list | terminus site:mass-update:apply --accept-upstream --updatedb
  ```

## Deploy Code

You can use Terminus to test a new set of changes by deploying code from development environments up to the Test environment while pulling the database and files down from Live.

1. Run the command below to deploy the code:

  ```bash{promptUser: user}
  terminus env:deploy my-site.test --sync-content --note="Deploy core and contrib updates"
  ```

1. Clear the site after each deployment:

  ```bash{promptUser: user}
  terminus env:clear-cache <site>.test
  ```

1. Test the changes, and then use Terminus to deploy code from Test up to Live:

  ```bash{promptUser: user}
  terminus env:deploy my-site.live --note="Deploy core and contrib updates" 
  ```

1. Clear the site after each deployment:

  ```bash{promptUser: user}
  terminus env:clear-cache <site>.live
  ```

## Reset Dev Environment to Live

There are a few scenarios where it may be useful to reset your Dev environment (codebase, files, and database) to your Live state:

- Development work that is not ready to go live has been committed directly to the Dev environment, blocking the deployment pipeline for other work ready to be deployed. After preserving work in progress on a local branch or on a [Multidev](/guides/multidev) environment,you can unblock deploys by resetting the Dev environment to reflect the Live environment state.

- Code changes were force-pushed or incorrectly merged into the Dev environment creating a large or complex Git history that you wish to undo.

- The state of the Dev environment is stale or out of date with the Live environment with many unneeded changes you want to abandon.

- The Dev environment has been seriously corrupted and you would like to cleanly reset it to Live.

Follow the steps below to reset Dev to Live.

1. Clone the site's codebase to your local machine if you have not done so already (replace `awesome-site` with your site name):

  ```bash{promptUser: user}
  terminus connection:info awesome-site.dev --fields='Git Command' --format=string
  ```

1. Automate the procedure for resetting Dev to Live by downloading the following bash script:

  <Download file="reset-dev-to-live.sh" />

  GITHUB-EMBED https://github.com/pantheon-systems/documentation/blob/main/source/scripts/reset-dev-to-live.sh.txt bash GITHUB-EMBED

1. Execute the script from the command line within the root directory of your site's codebase:

  ```bash{promptUser: user}
  sh /PATH/TO/SCRIPT/reset-dev-to-live.sh
  ```

The Site Dashboard will open when the reset procedure completes.

## Switch Upstreams

Every site has an assigned upstream to deliver [one-click updates](/core-updates) in the Pantheon Site Dashboard. Terminus can be used to manage this site-level configuration. There are a few scenarios where it may be useful to change a site's upstream:

- Convert existing sites from a default framework to a [Custom Upstream](/guides/custom-upstream).
- Convert existing sites from one Custom Upstream to another, for reasons such as:
  - Repository has been migrated from Bitbucket to Github, or vice versa.
  - Code has been refactored and moved to a new repository.
- Set an empty upstream to disable one-click updates for sites managed by Composer.

1. Run the command below to see all available upstreams:

  ```bash{promptUser: user}
  terminus upstream:list
  ```

  If your organization has a [Custom Upstream](/guides/custom-upstream), you can use Terminus to switch existing sites over to the common codebase:

  ```bash{promptUser: user}
  terminus site:upstream:set my-site "My Custom Upstream"
  ```

1. Use any valid identifier (upstream name, upstream machine name, upstream UUID) returned in `terminus upstream:list` to set a new upstream. For example, the upstream name "My Custom Upstream" is used above.

  As a safeguard, Terminus will prevent a framework switch such as moving from Drupal to WordPress or vice versa.

  <Alert title="Note"  type="info" >

  Refer to [Serving Sites from the Web Subdirectory](/nested-docroot/) to set an empty upstream for Composer-managed sites.

  </Alert>

1. Apply updates to the site to bring in the new codebase after setting the upstream. Refer to the [example usage above](#applying-updates) for information on how to apply updates.

## Troubleshoot Upstreams

### Terminus Error: Permission to change the upstream of this site

If you encounter this error when setting a site's upstream:

```bash{outputLines: 2}
terminus site:upstream:set $SITE $UPSTREAM
 [error]  You do not have permission to change the upstream of this site.
```

1. Confirm that the authenticated user account has the correct [site-level permissions](/guides/account-mgmt/workspace-sites-teams/teams#site-level-permissions).

1. Check the currently authenticated user:

```bash{promptUser: user}
terminus auth:whoami
```

## More Resources

- [WordPress and Drupal Core Updates](/core-updates)
- [Custom Upstreams](/guides/custom-upstream)