---
title: Testing WordPress Core Development Versions
description: Learn how to test WordPress core updates using nightly builds of the current release or bleeding edge.
tags: [workflow]
categories: [wordpress]
---
Pantheon provides [one-click updates](/docs/upstream-updates/) for WordPress core within the Site Dashboard for officially launched versions once they have been merged into our [upstream](https://github.com/pantheon-systems/WordPress). You can test development versions of WordPress by updating through the WordPress Dashboard or via Git.

<div class="alert alert-danger">
<h4 class="info">Warning</h4>
<p>Development versions and beta releases are not supported and should not be run on live sites. Testing should be done on a <a href="/docs/multidev/">Multidev</a> environment or within an isolated local environment on a branch other than master.</p>
</div>

## Update Core within WordPress Dashboard
1. If working on a Multidev environment, set the connection mode to SFTP within the [Pantheon Site Dashboard](/docs/sftp/) or with [Terminus](/docs/terminus):

 ```
 terminus connection:set <site>.<env> sftp
 ```

2. Install and activate the [WordPress Beta Tester](https://wordpress.org/plugins/wordpress-beta-tester/) plugin within the WordPress Dashboard or with Terminus:

 ```
 terminus wp <site>.<env> -- plugin install wordpress-beta-tester --activate --yes
 ```

3. Go to **Tools** > **WordPress Beta Tester** and select the update stream you want to use, then click **Save**:
  - [Point release nightlies](https://wordpress.org/download/nightly/): This contains the work that is occurring on a branch in preparation for a x.x.x point release. This should also be fairly stable but will be available before the branch is ready for beta.
  - [Bleeding edge nightlies](https://wordpress.org/download/beta) (Choose this option to test 4.5 beta releases): This is the bleeding edge development code which may be unstable at times.


4. Go to **Dashboard** > **Updates** and click **Update Now**.
5. Verify the WordPress version using `terminus wp <site>.<env> -- core version` or check the bottom of any WordPress Dashboard page:

  > You are using a development version (4.5-beta1-36808). Cool! Please stay updated.

6. Review configuration changes within the provided `wp-config-sample.php` file and add desired changes to `wp-config.php` for testing.


## Update Core Manually with Git
1. If working on a Multidev environment, set the connection mode to Git within the Pantheon Site Dashboard or with [Terminus](/docs/terminus):

 ```
 terminus connection:set <site>.<env> git
 ```

2. From within the [local clone of your site's code repository](/docs/git/#clone-your-site-codebase):

 ```
 git checkout -b "wpcore"
 git remote add WordPress git://github.com/WordPress/WordPress.git
 git fetch WordPress
 ```
3. Determine which update stream you want to use:
    - [Point release nightlies](https://wordpress.org/download/nightly/):
     Run `git tag` to identify the latest development tag (currently 4.4.2), then merge:

     ```
     git merge --squash -s recursive -X theirs tags/4.4.2
     ```
    - [Bleeding edge nightlies](https://wordpress.org/download/beta) (Choose this option to test 4.5 beta releases):

     ```
     git merge --squash -s recursive -X theirs WordPress/master
     ```

4. Review `wp-config-sample.php` and edit `wp-config.php` with any additions you want to test.

5. For sites with Multidev, you can push the local branch to Pantheon once you've staged and committed the changes:

 ```
 git commit -am "Update WordPress core to 4.4.2 development version"
 git push origin wpcore
 ```

Create the Multidev from within the Site Dashboard by selecting **Multidev** > **Git Branches** > **Create Environment** next to the `wpcore` branch name.

## Troubleshooting

### Database Update Required
WordPress sometimes includes database schema changes in major releases. When you update WordPress to the latest version, you might see a notification in the WordPress dashboard to update the database. Update as instructed or via [terminus <site>.<env> 'wp core update-db'](/docs/terminus).
