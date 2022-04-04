---
title: Integrated Composer
description: Learn how to deploy a site with Integrated Composer
type: guide
permalink: docs/guides/:basename
tags: [composer, workflow]
categories: [get-started]
contributors: [ari, edwardangert]
reviewed: "2021-08-30"
---

Integrated Composer is a Pantheon platform feature that extends Composer <Popover content="A widely-used PHP dependency and package manager that provides an alternative, more modern way to manage the external (non-core) code used by a WordPress or Drupal site." /> functionality to WordPress and Drupal's core files, and treats them as a managed dependency. Integrated Composer enables one-click updates from the Dashboard for upstream updates and Composer dependencies on your Composer-managed Pantheon site.

## Get Started With Integrated Composer

### Drupal 9 with Integrated Composer

- Follow the [Drupal 9](/drupal-9) doc to create a new Drupal 9 site with Integrated Composer built in.

- To upgrade or migrate an existing site to Drupal 9 with Integrated Composer, visit the [Migrate to Drupal 9](/guides/drupal-9-migration) guide.

- To convert an existing Drupal 8 site to a Composer-managed site with Integrated Composer, visit the [Composer Convert](/guides/composer-convert) doc.

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

Upstream refers to the source code that is hosted in the Pantheon code repository and includes the core code for [Drupal](https://github.com/pantheon-upstreams/drupal-recommended), [WordPress](https://github.com/pantheon-upstreams/wordpress-project), and some customizations for the Pantheon platform.

### Upstream and Site Structure

<Partial file="ic-upstream-structure.md" />

### How to Add Dependencies to Your Upstream

1. Clone the Git repository from the Pantheon site's Dashboard.

1. Change into the Upstream's configuration directory:

   - Drupal:

    ```bash{promptUser: user}
    cd upstream-configuration
    ```

   - WordPress:

    ```bash{promptUser: user}
    cd upstream-config 
    ```

1. Run `composer require` for each dependency:

    ```bash{promptUser: user}
    composer require drupal/pkg-name --no-update
    ```

     - `--no-update` tells Composer to disable automatic updates of the dependency. This makes Composer faster when adding dependencies to the Upstream as shown here.
     - `--no-update` should not be included when adding dependencies to a site.

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

Some packages are not compatible with Composer 2. If you encounter a build error that instructs you to contact [Support](/guides/support/contact-support), validate the package version's compatibility locally first, and check Drupal's [Preparing your site for Composer 2](https://www.drupal.org/docs/develop/using-composer/preparing-your-site-for-composer-2#s-composer-plugins) documentation for packages that have already been identified.

### Pantheon's Scope of Support for Composer

<Partial file="composer-support-scope.md"/>

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
   git remote add upstream <upstream_url> && git fetch upstream
   git merge upstream/master
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

### Changes Lost During Direct Upload or Commit 

Do not commit module/plugin or theme files directly to your site when in Git mode. You also should not upload module/plugin or theme files directly to your site when in SFTP mode. Direct commits and uploads will be lost because the `.gitignore` file in your upstream repository has several defined paths, which causes files in those directories to be ignored.  These directories are:
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
See the `.gitignore` file for Drupal [here](https://github.com/pantheon-upstreams/drupal-recommended/blob/master/.gitignore).

The `contrib` folders are where community contributed modules, profiles, and themes would reside.
The `custom` folders, which are not ignored, are where modules, profiles, and themes created by you would reside.
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

See the section [Add a Dependency to an Individual Site](#add-a-dependency-to-an-individual-site) above to add module/plugin or theme as a dependency to your site.  

### Changes Lost During Upstream Updates

When **Auto-Resolve Updates** is selected and the `composer.json` contents are changed in the upstream, all changes the site's developers made to `composer.json` will be removed if Git cannot automatically merge the changes.

To resolve, there are two potential solutions:

- If you have a copy of the `composer.json` from before the updates were applied, add the changes from that file back to the updated `composer.json` file.

- Remove the upstream updates by [undoing the commits](/undo-commits#revert-a-prior-commit-on-pantheon-that-has-been-deployed) or [restoring from a backup](/restore-environment-backup) made before the updates were merged. Then do the merge manually as described in [Upstream Updates Cannot Be Applied](#upstream-updates-cannot-be-applied).

### Issues using `wikimedia/composer-merge-plugin`

Use of the `wikimedia/composer-merge-plugin` is deprecated within [Drupal](https://www.drupal.org/node/3069730).

When using Pantheon's Integrated Composer, this plugin often tries to run a "composer update" during the "composer install," which is not allowed and will cause errors. We recommend removing `composer-merge-plugin` from your Composer toolchain.

### Patches containing binary diffs fail in Pantheon

If your site contains a binary patch, such as https://www.drupal.org/files/issues/2020-06-27/2340699-110.patch, the Composer build step will fail. This is because [cweagans/composer-patches](https://github.com/cweagans/composer-patches) use the patch utility to apply patches. The most recent version of this utility does not support binary patches and fails when deployed.

A workaround for this issue, is to reconfigure the patch to exclude the binary contents in it.

<Partial file="configure-wp-site-networks-with-integrated-composer.md" />

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

Contrib modules added by Integrated Composer from the now deprecated [Drupal Project](https://github.com/pantheon-upstreams/drupal-project/blob/master/composer.json#L29) upstream are placed in the `/modules/composer` directory in case a site already has non-Composer-managed modules in the standard `/modules/contrib` directory. If your site does not fall into this category, it is safe to rename the `composer` directory back to the standard `contrib` and alter the installer path to match. 

We recommend upgrading to the [Drupal Recommended Project](https://github.com/pantheon-upstreams/drupal-recommended/blob/master/composer.json#L50), which installs modules to the standard `contrib` directory. This `/modules/contrib` directory is added by default to the `.gitignore` file which tells Git to ignore files generated by Composer. You can manually add packages and make commits up to the repository by modifying the `.gitignore` file with the following exception:

```bash
!/web/modules/contrib/my-non-composer-module
```

<Alert title="Note"  type="info" >

 All modules will be overwritten by Integrated Composer if you don't add the exception code above. Don't manually add modules with the `.gitignore` exception if they are included in your `composer.json` file as this can create a conflict that causes Integrated Composer to fail.

 </Alert>

### What features are planned for Integrated Composer on Pantheon?

Pantheon's devs are working hard to make the Integrated Composer experience on Pantheon better.

Features that are still in development:

- Integrated Composer and [Build Tools](/guides/build-tools)
