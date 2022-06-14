---
title: Best Practices for Maintaining Custom Upstreams
subtitle: Learn About Custom Upstream Best Practices
description: Detailed information on how to maintain Custom Upstreams and distribute updates downstream.
categories: [develop]
tags: [git, upstreams, workflow]
layout: guide
showtoc: true
permalink: docs/guides/custom-upstream/maintain-custom-upstream
anchorid: maintain-custom-upstream
---

Maintainers of [Custom Upstreams](/custom-upstream) bear the responsibility of pulling in core updates from Pantheon. Regardless of update type, always test changes before you distribute them to your sites. We recommend the following workflow to maintain Custom Upstreams on Pantheon. In this example, we will be updating core.

<Alert title="Note" type="info">

Failure to run the most up-to-date version of core based on upstreams maintained by Pantheon ([WordPress](https://github.com/pantheon-systems/wordpress), [Drupal 7](https://github.com/pantheon-systems/drops-7), and [Drupal 8](https://github.com/pantheon-systems/drops-8)) may cause incompatibilities with the platform (e.g. clear cache button, launch checks, cron, etc.).

</Alert>

## Before You Begin
Follow the procedure to [create a custom upstream](/create-custom-upstream) so that you have:

- A repository for your Custom Upstream hosted with your preferred provider (GitLab, Bitbucket, etc)
- A local clone of that repository, which tracks Pantheon's upstream as a remote
- Pantheon's core code merged into your Custom Upstream repository
- Your Custom Upstream repository connected to Pantheon
- [Terminus](/terminus)

## Create a Test Site on Pantheon
This test site will be used later for evaluating the Custom Upstream changes we will make in the next section.

1. From your User Dashboard, click **Create New Site**.
2. Name your site.
3. Select your organization from the dropdown menu.
4. Click **Create Site**.
5. Select the desired repository from the Custom Upstream options.
6. Click **Visit your Pantheon Dashboard**.
7. Click **Visit Development Site** and complete the installation process for the selected framework.

## Test and Release Pantheon Core Updates

1. From your local clone of your Custom Upstream repository, add Pantheon's Upstream as a [remote](https://git-scm.com/docs/git-remote) if you haven't done so already:

  <TabList>

  <Tab title="WordPress" id="wp1" active={true}>

  ```git
  git remote add pantheon-wordpress https://github.com/pantheon-systems/WordPress.git
  ```

  </Tab>

  <Tab title="Drupal 7" id="d71">

  ```git
  git remote add pantheon-drops-7 https://github.com/pantheon-systems/drops-7.git
  ```

  </Tab>

  </TabList>

2. We will also add the test site you created above as a remote to your Custom Upstream. To do that, we first need to grab the test site's repository URL on Pantheon using [Terminus](/terminus). Replace `<site>` with your site name:

    ```bash
    terminus connection:info <site>.dev --field=git_url
    ```

3. Replace `<git_url>` in the following command to add your new test site as a [remote](https://git-scm.com/docs/git-remote):

    ```git
    git remote add pantheon-test <git_url>
    ```


4. Checkout a new branch:

    ```git
    git checkout -b core-update
    ```

  It's important to use feature branches when applying and testing updates. Updates applied on the master branch and pushed to the remote repository on GitHub or Bitbucket become available to individual sites downstream. Using a feature branch gives us a chance to reveal issues before distributing updates.

5. Pull down Pantheon's core updates from the appropriate upstream:

  <TabList>

  <Tab title="WordPress" id="wp" active={true}>

  ```git
  git fetch pantheon-wordpress
  git merge pantheon-wordpress/master
  ```

  </Tab>

  <Tab title="Drupal 7" id="d7">

  ```git
  git fetch pantheon-drops-7
  git merge pantheon-drops-7/master
  ```

  </Tab>

  </TabList>

6. Push to your new test site on Pantheon:

  ```git
  git push pantheon-test core-update
  ```

7. Back on the Site Dashboard for your test site, navigate to the Multidev overview tab and click **Git Branches**.

8. Click the **Create Environment** button next to the `core-update` branch.

9. Use this new Multidev environment to evaluate your `core-update` branch. When you're ready to release, merge the branch into master and push to your remote repository on GitHub or Bitbucket:

  ```git
  git checkout master
  git merge --no-ff core-update
  git push origin master
  ```

  This assumes you are using the default remote destination (`origin`) for your Custom Upstream repository that's hosted with your preferred provider.

Updates will become available to sites downstream as one-click updates within an hour of being pushed to the remote repository on sites running the Custom Upstream within your Organization. You can apply the updates on each site individually within the Site Dashboard, or you can apply updates in bulk using [Terminus](/terminus) and the [Mass Update](/terminus/examples/#mass-update) plugin. For more details, see [WordPress and Drupal Core Updates](/core-updates).

<Alert title="Warning" type="danger">

Custom Upstreams must not contain the tags `pantheon_test_n` or `pantheon_live_n`. Pantheon site level repositories use these tags to deploy code to Test and Live environments.

</Alert>

## Delete Custom Upstream
An Upstream cannot be deleted if there are sites using it.

1. From the Organization Dashboard, navigate to **Upstreams**.

1. Click **Settings** next to the Upstream you want to delete.

1. Under **Source**, click the **Delete Upstream** button:

  ![Delete Upstream Button](../images/dashboard/delete-upstream.png)

## Tips and Tricks

### Use the Pantheon Workflow
To fully test core updates, create content on your test site and use the standard [Pantheon workflow](/pantheon-workflow) to push up to your Test and Live environments. Checkout [our guide](/guides/drupal-commandline/#managing-content-configuration-and-code-across-environments) for an example of generating content from the command line.

### Sample a Few Sites
For agencies that manage large portfolios, we suggest picking a few sample sites with varying functionality and design to test updates on a [Multidev](/multidev) environment. Once things look good, release the update to all.

### Upstream Configuration File
Use the `pantheon.upstream.yml` file when working with Custom Upstreams to set default values for advanced site configurations to be used downstream. For details, see [Pantheon YAML Configuration Files](/pantheon-yml).

### Redirects
We normally suggest [PHP redirects](/redirects) be placed into `wp-config.php` for WordPress and `settings.php` for Drupal. If you are using a Custom Upstream, any customizations to these files will be lost with each update. It will also be hard to implement site-specific configurations added on these files.

Since this file is shared on all environments, including Multidevs, you can use a `require_once` statement to point to an external file, separate from the Custom Upstream and unique to each site, that loads all the redirects or customizations:

```php
if ( file_exists( dirname( __FILE__ ) . '/redirects.php' ) && isset( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {
  require_once( dirname( __FILE__ ) . '/redirects.php' );
}
```

Remember that this file is not included in the Custom Upstream and needs to exist uniquely on each site. You can then expand the conditional statement to load on specific environments using the FAQ section in the [wp-config-php doc](/wp-config-php#how-can-i-write-logic-based-on-the-pantheon-server-environment).

For WordPress sites, another option is to store redirects in an [MU-Plugin](/mu-plugin).

