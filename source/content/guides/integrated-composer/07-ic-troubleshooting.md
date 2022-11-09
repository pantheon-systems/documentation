---
title: Integrated Composer
subtitle: Troubleshoot Integrated Composer
description: Learn how to troubleshoot Integrated Composer issues.
tags: [composer, workflow]
categories: [get-started]
contributors: [ari, edwardangert]
reviewed: "2022-04-28"
layout: guide
showtoc: true
permalink: docs/guides/integrated-composer/ic-troubleshooting
anchorid: ic-troubleshooting
---

This section provides information on troubleshooting common Integrated Composer errors and issues.

## Troubleshooting Code Syncs, Upstream Updates, and Redirect Errors

### Site-local Drush Is Required for Drupal 9 Sites

Do not remove `drush/drush` from `composer.json`. If it's removed, `terminus drush` commands will fail with errors related to Twig.

### Build Step Affected Files That Are Not Ignored by Git

Some users have encountered an error when Git recognizes an unexpected change in `composer.json`:

```bash
The build step affected files that are not ignored by git:
+ echo M composer.json M composer.lock
M composer.json M composer.lock
+ exit 1
```

To resolve this error:

1. Add an empty new line to the end of `composer.json`:

  ```shell
  echo "" >> composer.json
  ```

1. Commit and push the changes

### View the Output of the Commit Log First

If you encounter an error during a code sync or if the site is missing files that should be added by Integrated Composer, the Build Log may contain information that can help you troubleshoot:

1. Navigate to **Code** in the **Dev** tab of your Site Dashboard.

1. Navigate to the **Commit Log** section, find the most recent commit, and click **View Log** to view the Composer command that was run and the output that was given by that command.

### Dashboard Workflow Shows an Error During Sync Code or Deploying to a New Environment

If there is an error in the output, it may be due to an error in the site's `composer.json` or `composer.lock` file, or there may be an issue with a Composer library the site uses.

To resolve this issue, examine the error in the log. It may be a syntax or parse error of the JSON files, or some sort of error loading a library via Composer. You can also try running the same command on your local Git checkout of the site's code and see if you can update the `composer.json` and `composer.lock` files to run the command successfully.

### Creating a New Multidev or Deploying to an Environment Results in an Empty Site

You must manually allow any plugin that acts on the code base of your site in your  `composer.json` file. This is a Composer 2.2 requirement introduced on July 1, 2022 that provides an additional layer of security. Sites that were working previously will have builds that fail because of this new requirement. Failed builds can arise as a broken environment or as unreflected code changes after a commit.

Read more about this security requirement in [Composer's Documentation](https://getcomposer.org/doc/06-config.md#allow-plugins).

You might see one of the following issues:

- `Fatal error: Cannot redeclare format_size() (previously declared in /code/web/core/includes/common.inc:137) in /code/vendor/drupal/core/includes/common.inc on line 137`

- Pantheon error page with “No code” or “No site detected” on newly initialized environments

- `Fatal error: Cannot redeclare drupal_get_filename() (previously declared in /code/vendor/drupal/core/includes/bootstrap.inc:164) in /code/web/core/includes/bootstrap.inc on line 164`

Follow the steps below to resolve the issue:

1. Clone the site to your local computer and ensure that Composer 2.2 or later is installed locally.

1. Run `composer install` and complete the interactive prompts to allow plugins.

   - The prompts will look like this:

    ```bash{outputLines:2-5}
    composer install
    composer/installers contains a Composer plugin which is currently not in your allow-plugins config. See https://getcomposer.org/allow-plugins
    Do you trust "composer/installers" to execute code and wish to enable it now? (writes "allow-plugins" to composer.json) [y,n,d,?] y
    cweagans/composer-patches contains a Composer plugin which is currently not in your allow-plugins config. See https://getcomposer.org/allow-plugins
    Do you trust "cweagans/composer-patches" to execute code and wish to enable it now? (writes "allow-plugins" to composer.json) [y,n,d,?]
    ```

1. Commit and push the code up to your site.

### Upstream Updates Cannot Be Applied

When you click **Apply Updates**, the process completes with the error, `Something went wrong when applying updates. View log.` Click **View log** to view the output of the log:

```bash
We were not able to perform the merge safely. See the Applying Upstream Updates doc (https://pantheon.io/docs/core-updates) for further debugging tips. Conflicts: [
  "CONFLICT (content): Merge conflict in composer.json"
]
```

**Issue 1:** The site might use a [Custom Upstream](/guides/custom-upstream).

**Solution 1:** Copy the Upstream URL and then follow **Solution 2**:

1. Navigate to the Site Dashboard, and click the **Dev** tab.

1. Click **Settings**, then click **About site**.

1. Copy the **Upstream** URL and use it instead of the Pantheon Upstream URL in **Solution 2**.

**Issue 2:** The upstream updates and your Composer changes to the site are in a conflict that cannot be automatically merged by Git.

- We do not recommend using **Auto-resolve updates** in this case since it will cause your changes to the site's `composer.json` file to be lost.

**Solution 2:**

Merge the changes manually:

1. Create a [local Git clone](/local-development#get-the-code) of the Pantheon site repository.

1. Merge in the upstream changes:

   ```bash{promptUser: user}
   git remote add upstream <upstream_url> && git fetch upstream
   git merge upstream/master
   ```

   - You will get a message that there are conflicts in `composer.json` that cannot be merged automatically:

      ```bash
      Auto-merging composer.json
      CONFLICT (content): Merge conflict in composer.json

      Automatic merge failed; fix conflicts and then commit the result.
      ```

1. [Resolve the conflict](/guides/git/resolve-merge-conflicts/#resolve-content-conflicts) and follow the instructions to commit the merged changes.

1. Run `composer install` on your local branch to verify that the `composer.json` parses correctly, and that the correct libraries are installed or updated. If the command fails, then the merge was not made correctly and the error message may point to how `composer.json` needs to change.

1. Push the changes to Pantheon. Integrated Composer will run again with the updated `composer.json`.

### Changes Lost During Direct Upload or Commit

Do not commit module/plugin or theme files directly to your site when in Git mode. You also should not upload module/plugin or theme files directly to your site when in SFTP mode. Direct commits and uploads will be lost because the `.gitignore` file in your upstream repository has several defined paths, which causes files in those directories to be ignored. These directories are:

<TabList>

<Tab title="Drupal" id="drupal-gitignore" active={true}>

```none:title=code/web/sites
code/web/
└─ core/
└─ drush/Commands/contrib/
└─ libraries/
└─ modules/contrib/
└─ private/scripts/quicksilver
└─ profiles/contrib/
└─ sites/*/files/
└─ sites/*/private/
└─ themes/contrib/
```

See the `.gitignore` file for Drupal [here](https://github.com/pantheon-upstreams/drupal-composer-managed/blob/main/.gitignore).

The `contrib` folders are where community contributed modules, profiles, and themes reside.
The `custom` folders, which are not ignored, are where modules, profiles, and themes created by you reside.

</Tab>

<Tab title="WordPress" id="wp-gitignore">

```none:title=code/web/
code/web/wp-content/
└─ mu-plugins/
└─ plugins/
└─ themes/
```

See the `.gitignore` file for WordPress [here](https://github.com/pantheon-upstreams/wordpress-project/blob/master/.gitignore). 

</Tab>

</TabList>

Refer to [Add a Dependency to an Individual Site](/guides/integrated-composer/dependencies) to add a module/plugin or theme as a dependency to your site.  

### Changes Lost During Upstream Updates

When **Auto-Resolve Updates** is selected and the `composer.json` contents are changed in the upstream, all changes the site's developers made to `composer.json` will be removed if Git cannot automatically merge the changes.

There are two potential solutions to resolve this issue: 

- If you have a copy of the `composer.json` file from before the updates were applied, add the changes from that file back to the updated `composer.json` file.

- Remove the upstream updates by [undoing the commits](/guides/git/undo-commits#revert-a-prior-commit-on-pantheon-that-has-been-deployed) or [restoring from a backup](/guides/environment-configuration/restore-environment-backup) made before the updates were merged. Then do the merge manually as described in [Upstream Updates Cannot Be Applied](#upstream-updates-cannot-be-applied).

### Issues using `wikimedia/composer-merge-plugin`

Use of the `wikimedia/composer-merge-plugin` is deprecated within [Drupal](https://www.drupal.org/node/3069730).

When using Pantheon's Integrated Composer, this plugin often tries to run a `composer update` during the `composer install`, which is not allowed and will cause errors. We recommend removing `composer-merge-plugin` from your Composer toolchain.

### Patches containing binary diffs fail in Pantheon

If your site contains a binary patch, such as https://www.drupal.org/files/issues/2020-06-27/2340699-110.patch, the Composer build step will fail. This is because [cweagans/composer-patches](https://github.com/cweagans/composer-patches) use the patch utility to apply patches. The most recent version of this utility does not support binary patches and fails when deployed.

A workaround for this issue is to reconfigure the patch to exclude the binary contents in it.

<Partial file="configure-wp-site-networks-with-integrated-composer.md" />

### GrumPHP breaks Integrated Composer when using Lando or other local development commands

[GrumPHP](https://github.com/phpro/grumphp) is a code quality tool that installs into Git hooks via a Composer plugin. The hook runs whatever tasks you specify in your `grumphp.yml` file, including unit tests, code sniffing, etc., and allows or prevents a commit as needed.

You can use both GrumPHP and a containerized local dev environment (such as Lando or Docksal). However, if you choose to run GrumPHP within that environment by changing the command triggered by GrumPHP on commit in your `grumphp.yml` file shown in the example below, you may encounter a build fail.

  ```bash{promptUser: user}
    grumphp:
     git_hook_variables:
      EXEC_GRUMPHP_COMMAND: 'lando php'
  ```

The build fails because GrumPHP runs in Integrated Composer. Composer installs GrumPHP, then Integrated Composer tries to make a commit, GrumPHP tries to run Lando (or another containerized local dev environment) PHP and then fails because Lando doesn't exist in Pantheon's build environment.

**Solution**

The solution is to set `EXEC_GRUMPHP_COMMAND` to run a script that tests for the needed dependencies and only runs the GrumPHP tasks if all dependencies are found. For example:

```bash{promptUser: user}
  grumphp:
   git_hook_variables:
    EXEC_GRUMPHP_COMMAND: '.scripts/grumphp.sh' # YOUR SCRIPT NAME HERE
  ```

Lando script example:

  ```bash{promptUser: user}
  #!/bin/sh
  if command -v lando &> /dev/null
  then
    lando php "$@"
  fi
  ```

The test in the script can be whatever is needed in your particular case. The example below tests for the existence of the `PANTHEON_ENVIRONMENT` env var:

```bash{promptUser: user}
#!/bin/sh
if [ -z "$PANTHEON_ENVIRONMENT" ]  &> /dev/null
then
  lando php "$@"
fi
```

## More Resources

- [Integrated Composer FAQ](/guides/integrated-composer/ic-faq)
