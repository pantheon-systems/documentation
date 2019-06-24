---
title: Terminus Manual
subtitle: Example Usage
description: Review examples of Terminus commands most frequently used by power users.
terminusexample: true
terminuspage: true
showtoc: true
type: terminuspage
layout: terminuspage
nexturl: terminus/commands/
previousurl: terminus/install/
permalink: docs/terminus/:basename/
image: terminus-thumbLarge
searchboost: 100
---

## Command Structure

The basic format of a Terminus command is:

```bash
terminus command:subcommand <site>.<env>
```

For more information on any command you can run:

```bash
terminus command:subcommand -h
```

Or for a list of all available commands:

```bash
terminus list
```

### The `<site>.<env>`

Terminus command structure typically includes `<site>.<env>` in order to determine the target site and environment to execute against. Note that the `<>` symbols are part of the example, not to be included in your commands. For example, running the `env:clear-cache` command for the Live environment of a site labeled "Your Awesome Site":

![terminus env:clear-cache your-awesome-site.live](../../docs/assets/images/terminus-example-cc.png)

<Accordion title="Learn More" id="identify-site" icon="lightbulb">

<DefList>

<Definition title="Site Label">

Human readable, such as "Your Awesome Site", entered during site creation and displayed in the Site Dashboard.

</Definition>

<Definition title="Site Name">

Machine readable, such as "your-awesome-site", either derived automatically by the platform from the site label or uniquely defined during site creation via Terminus. This value is used to construct [platform domains](/docs/domains/#platform-domains).

</Definition>

<Definition title="Environment Name">

Machine readable, such as "dev", "test", "live", or "bug123", which refers to the target site environment on Pantheon.

</Definition>

</DefList>

You can also find your site's machine name using the Terminus command `site:info`, and the [site UUID](/docs/sites/#site-uuid). For example:

![terminus site:info e9ad4349-621e-4be6-9f94-f9646069d9e7 --field name](../../docs/assets/images/terminus-examples-field-name.png)

</Accordion>

### Drush and WP-CLI

Pantheon supports running [Drush (Drupal)](https://drushcommands.com/) and [WP-CLI (WordPress)](https://developer.wordpress.org/cli/commands/) commands remotely against a target site environment through Terminus. This is often faster and easier than leveraging such tools via local installations.

Start with the [basic command structure described above](#command-structure). The commands to invoke Drush and WP-CLI are `remote:drush` and `remote:wp`, respectively. Include `--` followed by the Drush or WP-CLI command and all arguments. For example:

![terminus remote:wp your-awesome-site.dev --plugin activate debug-bar](../../docs/assets/images/terminus-wp-cli-example.png)

For more information, see [Drupal Drush Command-Line Utility](/docs/drush/) and [Using WP-CLI On The Pantheon Platform](/docs/wp-cli/).

## Applying Updates

Quickly install updates to core, contributed modules, themes, and plugins from the command line with Terminus.

### Upstream Updates (Core)

Pantheon maintains upstream updates for [WordPress](https://github.com/pantheon-systems/WordPress), [Drupal 8](https://github.com/pantheon-systems/drops-8), and [Drupal 7](https://github.com/pantheon-systems/drops-7). Updates can be applied once they have been merged into the upstream and become available for a site.

<Alert title={"Note"} type={"info"}>

For instructions on how to resolve merge conflicts, see [Upstream
Updates](/docs/core-updates#apply-upstream-updates-manually-from-the-command-line-to-resolve-merge-conflicts)

</Alert>

List available upstream updates:

```bash
  terminus upstream:updates:list my-site
```

If the environment's connection mode is currently set to SFTP with uncommitted work you want to keep, commit now before proceeding:

```bash
  terminus env:commit my-site.dev --message="My code changes"
```

<Alert title={"Warning"} type={"danger"}>

The following command will permanently delete all uncommitted SFTP changes. If you wish to keep SFTP changes, commit your work before proceeding.

</Alert>

Set the environment's connection mode to Git so updates can be pulled into the site from Pantheon's upstream:

```bash
  terminus connection:set my-site.dev git
```

Apply available upstream updates for WordPress and Drupal core from the command line with Terminus:

```bash
  terminus upstream:updates:apply my-site
```

### Module, Theme, and Plugin Updates

Apply updates to all contributed modules, themes, and plugins via Terminus by setting the environment's connection mode to SFTP and invoking [Drush](/docs/drush) (Drupal) or [WP-CLI](/docs/wp-cli) (WordPress) update commands. You can then use Terminus to commit updates to a development environment on Pantheon.

<TabList>

<Tab title={"Drupal"} id={"wptab"} active={true}>

First, set the Dev environment's connection mode to SFTP:

```bash
terminus connection:set my-site.dev sftp
```

Apply updates to all contrib projects:

```bash
terminus drush my-site.dev -- pm-updatecode --no-core
```

Commit contrib updates to the Dev environment:

```bash
  terminus env:commit my-site.dev --message="Update all contrib projects"
```

</Tab>

<Tab title={"WordPress"} id={"drupaltab"}>

First, set the Dev environment's connection mode to SFTP:

```bash
terminus connection:set my-site.dev sftp
```

Apply updates to all plugins:

```bash
terminus wp my-site.dev -- plugin update --all
```

Apply updates to all themes:

```bash
terminus wp my-site.dev -- theme update --all
```

Commit plugin and theme updates to the Dev environment:

```bash
terminus env:commit my-site.dev --message="Update all plugins and themes"
```

</Tab>

</TabList>

### Mass Update

Terminus supports third-party plugins that extend it's functionality by adding new commands. The following example demonstrates usage of the [Mass Update](https://github.com/pantheon-systems/terminus-mass-update) plugin to easily apply upstream updates (core updates) in bulk. For instructions on how to install Terminus plugins, see [Extend with Plugins](/docs/terminus/plugins).

Install the [Mass Update](https://github.com/pantheon-systems/terminus-mass-update) plugin, then use the `--dry-run` option to review available upstream updates without applying them:

```bash
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

Resolve warning messages shown in the `--dry-run` output by setting the connection mode to Git for each applicable site:

<Alert title={"Warning"} type={"danger"}>

The following command will permanently delete all uncommitted SFTP changes. If you wish to keep SFTP changes, commit your work before proceeding.

</Alert>

```bash
terminus connection:set my-site.dev git
```

Review output then apply the mass update by removing the `--dry-run` option:

```bash
terminus site:list --format=list | terminus site:mass-update:apply --accept-upstream --updatedb
```

## Deploying Code

When you're ready to test a new set of changes, use Terminus to deploy code from development environments up to the Test environment while pulling the database and files down from Live:

```bash
terminus env:deploy my-site.test --sync-content --note="Deploy core and contrib updates" --cc
```

After testing changes, use Terminus to deploy code from Test up to Live:

```bash
terminus env:deploy my-site.live --note="Deploy core and contrib updates" --cc
```

## Reset Dev Environment to Live

There are a few scenarios where it may be useful to reset your Dev environment (codebase, files, and database) to the state of Live:

- Development work that is not ready to go live has been committed directly to the Dev environment, blocking the deployment pipeline for other work ready to be deployed. After preserving work in progress on a local branch or on a [Multidev](/docs/multidev) environment you can unblock deploys by resetting the Dev environment to reflect the state of Live.

- Code changes have been force-pushed or incorrectly merged into the Dev environment creating a large or complex Git history that you wish to undo.

- The state of the Dev environment is stale or otherwise massively out of date with the Live environment with many unneeded changes you wish to abandon.

- The Dev environment has been seriously corrupted and you would like to cleanly reset it to Live.

Start by cloning the site's codebase to your local machine if you have not done so already (replace <code>awesome-site</code> with your site name):

```bash
`terminus connection:info awesome-site.dev --fields='Git Command' --format=string`
```

Then automate the procedure for resetting Dev to Live by downloading the following bash script:

<div class="script-file-header">
  reset-dev-to-live.sh
  <a id="downloadLink">
    <button class="btn btn-default btn-download">
      <i class="fa fa-download" aria-hidden="true" /> Download Script
    </button>
  </a>
</div>

```bash
    #!/bin/bash #Authenticate Terminus terminus auth:login #Provide the target
    site name (e.g. your-awesome-site) echo 'Provide the site name (e.g.
    your-awesome-site), then press [ENTER] to reset the Dev environment to
    Live:'; read SITE; #Set the Dev environment's connection mode to Git echo
    "Making sure the environment's connection mode is set to Git..."; terminus
    connection:set \$SITE.dev git #Identify the most recent commit deployed to
    Live and overwrite history on Dev's codebase to reflect Live echo "Rewriting
    history on the Dev environment's codebase..."; git reset --hard `terminus
    env:code-log $SITE.live --format=string | grep -m1 'live' | cut -f 4` #Force
    push to Pantheon to rewrite history on Dev and reset codebase to Live git
    push origin master -f #Clone database and files from Live into Dev echo
    "Importing database and files from Live into Dev..."; terminus
    env:clone-content \$SITE.live dev #Open the Dev environment on the Site
    Dashboard terminus dashboard:view \$SITE.dev
```

Execute the script from the command line within the root directory of your site's codebase to reset Dev to Live:

```bash
sh /PATH/TO/SCRIPT/reset-dev-to-live.sh
```

The Site Dashboard will open once the reset procedure has completed.

## Switch Upstreams

Every site has an upstream assigned in order to deliver [one-click updates](/docs/core-updates/) in the Pantheon Site Dashboard. Terminus can be used to manage this site level configuration. There are a few scenarios where it may be useful to change a site's upstream:

- Convert existing sites from a default framework to a [Custom Upstream](/docs/custom-upstream/).
- Convert existing sites from one Custom Upstream to another, for reasons like:
  - Repository has been migrated from Bitbucket to Github, or vice versa.
  - Code has been refactored and moved to a new repository.
- Set an empty upstream to disable one-click updates for sites managed by Composer.

To see all available upstreams, run:

```bash
terminus upstream:list
```

If your organization has a [Custom Upstream](/docs/custom-upstream/), you can use Terminus to switch existing sites over to the common codebase:

```bash
terminus site:upstream:set my-site "My Custom Upstream"
```

You can use any valid identifier (upstream name, upstream machine name, upstream UUID) returned in `terminus upstream:list` to set a new upstream. For example, the upstream name "My Custom Upstream" is used above.

As a safeguard, Terminus will prevent a framework switch such as moving from Drupal to WordPress or vice versa.

<Alert title={"Note"} type={"info"}>

To set an empty upstream for Composer managed sites, see [Serving Sites from
the Web Subdirectory](/docs/nested-docroot/).

</Alert>

After setting the upstream, you must bring in the new codebase by applying updates to the site. For details on how to apply updates, see the [example usage above](#applying-updates).
