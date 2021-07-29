---
title: Integrated Composer
description: Learn how to deploy a site with Integrated Composer
tags: [composer, workflow]
categories: [get-started]
contributors: [ari, edwardangert]
reviewed: "2021-05-28"
---

Integrated Composer lets you deploy your site on Pantheon with one-click updates for both upstream commits and [Composer](/composer) dependencies, while still receiving upstream updates.

## Create a New Site With Integrated Composer

### Drupal 9 with Integrated Composer

You can [upgrade from an existing Drupal 8](/guides/drupal-9-migration/upgrade-to-d9) Composer-enabled site to Drupal 9 with Integrated Composer. To upgrade or migrate an existing site to Drupal 9 with Integrated Composer, visit the [Migrate to Drupal 9](/guides/drupal-9-migration) guide.

### WordPress with Integrated Composer

1. [Fork the Pantheon-maintained repository](/create-custom-upstream#create-and-host-the-repository-remotely) from [https://github.com/pantheon-upstreams/wordpress-project](https://github.com/pantheon-upstreams/wordpress-project).

1. [Add a new Custom Upstream](/create-custom-upstream#connect-repository-to-pantheon) on the Pantheon Dashboard.

1. Create a new WordPress site from the Upstream. Do not customize the upstream as yet.

1. In the Dev environment, click **Visit Development Site** and follow the prompts to complete the CMS installation.

1. [Clone the site locally](/local-development#get-the-code) and run `composer install`.


## Add a Dependency to an Individual Site

1. Clone the Git repository from the Pantheon site's dashboard.

1. Run `composer install`:

   ```bash{promptUser: user}
    composer install
   ```
1. Add a new dependency locally:

   ```bash{promptUser: user}
    composer require drupal/pkg-name
   ```

1. Commit `composer.json` and `composer.lock` and push.

   - Pantheon will run Composer, generate build artifacts, and deploy it to your Dev or Multidev environment.

### Remove Individual Site Dependencies

You can remove site dependencies if they are no longer needed. 

1. Remove the dependency locally:

   ```bash{promptUser: user}
    composer remove drupal/pkg-name
   ```

1. Commit `composer.json` and `composer.lock` and push.

   - Pantheon will run Composer, generate build artifacts, etc.

## Apply One-click Updates

1. Navigate to **Code** in the Dev tab of the site's Dashboard.

1. Click **Check Now**. 

1. If updates are available, click **Apply Updates**.


## Upstream

Upstream refers to the source code that is hosted in the [Pantheon code repository](https://github.com/pantheon-upstreams/drupal-project) and includes the core code for Drupal, WordPress, and some customizations for the Pantheon platform.

### Upstream and Site Structure

<Partial file="ic-upstream-structure.md" />

### How to Add Dependencies to Your Upstream

1. Clone the Git repository from the Pantheon site's Dashboard.

1. Change into the `upstream-config` directory:

    ```bash{promptUser: user}
    cd upstream-config
    ```

1. Run:

    ```bash{promptUser: user}
    composer require drupal/pkg-name --no-update
    ```

     -  `--no-update` tells Composer to disable automatic updates of the dependency. This makes Composer faster when adding dependencies to the Upstream as shown here. 
     -  `--no-update` should not be included when adding dependencies to a site.

1. Set or increment the current configuration version:

     - If this is your first time setting the config version:

     Confirm the version:

        ```bash{outputLines:2}
        composer config version
        1.0.0
        ```

     - Increment the config version number when you update dependencies. If you don't increment the version number, Composer will ignore updated dependencies. 
     - Replace `1.0.1` in this example with another number:

       ```bash{promptUser: user}
        composer config version 1.0.1
        ```

1. Commit and push.

## Support

### Pantheon Supports Composer 2

The version of Composer on the platform is Composer 2.

Some packages are not compatible with Composer 2. If you encounter a build error that instructs you to contact [Support](/support), validate the package version's compatibility locally first, and check Drupal's [Preparing your site for Composer 2](https://www.drupal.org/docs/develop/using-composer/preparing-your-site-for-composer-2#s-composer-plugins) documentation for packages that have already been identified.

### Pantheon's Scope of Support for Composer

<Partial file="composer-support-scope.md"/>

## Troubleshooting Code Syncs and Upstream Updates

### View the Output of the Commit Log First

If you encounter an error during a code sync or if the site is missing files that should be added by Integrated Composer, the Build Log may contain information that can help you troubleshoot:

1. Navigate to the **Code** in the **Dev** tab of your Site Dashboard.

1. In the **Commit Log** section, find the most recent commit and click **View Log** to view the Composer command that was run and the output that was given by that command.

### Dashboard Workflow Shows an Error During Sync Code or Deploying to a New Environment

If there is an error in the output, it may be due to an error in the site's `composer.json` or `composer.lock` file, or there may be an issue with a Composer library the site uses.

To resolve, examine the error in the log. It may be a syntax or parse error of the JSON files, or some sort of error loading a library via Composer. You can also try running the same command on your local Git checkout of the site's code and see if you can update the `composer.json` and `composer.lock` files to run the command successfully.

### Upstream Updates Cannot Be Applied

When you click **Apply Updates**, the process completes with the error, `Something went wrong when applying updates. View log.` Click **View log** to view the output of the log:

```bash
We were not able to perform the merge safely. See the Applying Upstream Updates doc (https://pantheon.io/docs/core-updates) for further debugging tips. Conflicts: [
  "CONFLICT (content): Merge conflict in composer.json"
]
```

**Issue 1:** The site might use a [Custom Upstream](/custom-upstream).

**Solution 1:** Copy the Upstream URL and then follow **Solution 2**:

1. From the Site Dashboard, navigate to the Dev environment.

1. Click **Settings**, then **About site**.

1. Copy the **Upstream** URL and use it instead of the Pantheon Upstream URL in **Solution 2**.

**Issue 2:** The upstream updates and your Composer changes to the site, are in a conflict that cannot be automatically merged by Git.

- We do not recommend using **Auto-resolve updates** in this case since it will cause your changes to the site's `composer.json` file to be lost.

**Solution 2:**

Merge the changes manually:

1. Create a [local Git clone](/local-development#get-the-code) of the Pantheon site repository.

1. Merge in the upstream changes:

   ```bash{promptUser: user}
   git pull https://github.com/pantheon-upstreams/drupal-project main
   ```

1. You will get a message that there are conflicts in `composer.json` that cannot be merged automatically:

   ```bash
   Auto-merging composer.json
   CONFLICT (content): Merge conflict in composer.json

   Automatic merge failed; fix conflicts and then commit the result.
   ```

1. [Resolve the conflict](/git-resolve-merge-conflicts#resolve-content-conflicts) and follow the instructions to commit the merged changes.

1. To verify that the merge was successful, run `composer install` on your local branch to verify that the `composer.json` parses correctly, and that the correct libraries are installed or updated. If the command fails, then the merge was not made correctly and the error message may point to how `composer.json` needs to change.

1. Push the changes to Pantheon. Integrated Composer will run again with the updated `composer.json`.

### Changes Lost During Upstream Updates

When **Auto-Resolve Updates** is selected and the `composer.json` contents are changed in the upstream, all changes the site's developers made to `composer.json` will be removed if Git cannot automatically merge the changes.

To resolve, there are two potential solutions:

- If you have a copy of the `composer.json` from before the updates were applied, add the changes from that file back to the updated `composer.json` file.

- Remove the upstream updates by [undoing the commits](/undo-commits#revert-a-prior-commit-on-pantheon-that-has-been-deployed) or [restoring from a backup](/restore-environment-backup) made before the updates were merged. Then do the merge manually as described in [Upstream Updates Cannot Be Applied](#upstream-updates-cannot-be-applied).

## FAQ

### What Composer commands does Pantheon run?

All Composer commands are available through the **Commit Log** in the Site Dashboard's development environment.

### Can I view live logs?

Composer build logs are only available after the task or action completes (or fails).

### How do I view Composer's changes?

Use `git diff` to view changes, excluding `composer.lock`:

```bash{promptUser: user}
git diff d94d1a1179 -- . ':(exclude)composer.lock'
```

Try [composer-lock-diff](https://github.com/davidrjonas/composer-lock-diff) to see what packages have changed after `composer update`.

### Can I use a Composer GUI?

Pantheon does not offer support for Composer GUIs or any conflicts that might be caused by one.

### Why are contrib modules placed in /modules/composer instead of /modules/contrib?

Integrated Composer needs to consider the use case where a site might already have non-Composer-managed modules in the standard `/modules/contrib` directory. To support this, we create the `/modules/composer` directory for modules added by Integrated Composer.

If your site does not fall into this category, it is safe to rename the `composer` directory back to the standard `contrib`.

### What features are planned for Integrated Composer on Pantheon?

Pantheon's devs are working hard to make the Integrated Composer experience on Pantheon better.

Features that are still in development:

- Integrated Composer and [Build Tools](/guides/build-tools)
