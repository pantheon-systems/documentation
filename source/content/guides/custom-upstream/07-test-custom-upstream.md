---
title: Test Custom Upstream Changes
subtitle: Test Custom Upstream Changes Before Release
description: Create a test version of your Custom Upstream to review changes.
categories: [develop]
tags: [upstreams, workflow, webops]
layout: guide
showtoc: true
permalink: docs/guides/custom-upstream/test-custom-upstream
contributors: []
reviewed: ""
anchorid: test-custom-upstream
contenttype: guide
categories: [git, test, updates]
newcms: [drupal7, wordpress]
audience: [development]
product: []
integration: []
---

Maintainers of [Custom Upstreams](/guides/custom-upstream) bear the responsibility of pulling in core updates from Pantheon. Regardless of update type, always test changes before you distribute them to your sites. We recommend using the workflow example below to  test and update core.

<Alert title="Note" type="info">

Failure to run the most up-to-date version of core based on upstreams maintained by Pantheon ([WordPress](https://github.com/pantheon-systems/wordpress) and [Drupal 7](https://github.com/pantheon-systems/drops-7) may cause incompatibilities with the platform (for example, the clear cache button, launch checks, cron, and more).

</Alert>

### Use the Pantheon Workflow

Create content on your test site and use the standard [Pantheon workflow](/pantheon-workflow) to push up to your Test and Live environments, and fully test core updates. Checkout [our guide](/guides/drush/drupal-commandline/#managing-content-configuration-and-code-across-environments) for an example of generating content from the command line.

### Sample a Few Sites

We suggest picking a few sample sites with varying functionality and design to test updates on a [Multidev](/guides/multidev) environment or agencies that manage large portfolios. Release the update when things look good on these sites.

## Before You Begin

Follow the procedure to [create a custom upstream](/guides/custom-upstream/create-custom-upstream) and confirm that you have:

- A repository for your Custom Upstream hosted with your preferred provider (GitLab, Bitbucket, etc.)

- A local clone of that repository, which tracks Pantheon's upstream as a remote

- Pantheon's core code merged into your Custom Upstream repository

- Your Custom Upstream repository connected to Pantheon

- [Terminus](/terminus)

## Create a Test Site on Pantheon

This test site will be used later for evaluating Custom Upstream changes.

1. Navigate to your User Dashboard > click **Create New Site**.

1. Name your site.

1. Select your organization from the dropdown menu.

1. Click **Create Site**.

1. Select the desired repository from the Custom Upstream options.

1. Click **Visit your Pantheon Dashboard**.

1. Click **Visit Development Site** and complete the installation process for the selected framework.

<Alert title="Warning" type="danger">

Custom Upstreams cannot contain the tags `pantheon_test_n` or `pantheon_live_n`. Pantheon site level repositories use these tags to deploy code to Test and Live environments.

</Alert>

## Test and Release Pantheon Core Updates

1. Navigate to the local clone of your Custom Upstream repository > add Pantheon's Upstream as a [remote](https://git-scm.com/docs/git-remote) if you haven't done so already:

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

2. Add the test site you created above as a remote to your Custom Upstream by grabbing the test site's repository URL on Pantheon using [Terminus](/terminus). Replace `<site>` with your site name:

    ```bash
    terminus connection:info <site>.dev --field=git_url
    ```

3. Replace `<git_url>` in the following command to add your new test site as a [remote](https://git-scm.com/docs/git-remote):

    ```git
    git remote add pantheon-test <git_url>
    ```


4. Checkout a new branch:

    ```git
    git checkout -b "core-update"
    ```

  It's important to use feature branches when applying and testing updates. Updates applied on the master branch and pushed to the remote repository on GitHub or Bitbucket become available to individual sites downstream. Using a feature branch gives you a chance to reveal issues before distributing updates.

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

7. Return to the Site Dashboard for your test site > navigate to the **Multidev** overview tab > click **Git Branches**.

8. Click the **Create Environment** button next to the `core-update` branch.

9. Use the new Multidev environment to evaluate your `core-update` branch > merge the branch into master > push to your remote repository on GitHub or Bitbucket when you're ready to release:

  ```git
  git checkout master
  git merge --no-ff core-update
  git push origin master
  ```

  The example command above assumes you are using the default remote destination (`origin`) for your Custom Upstream repository that's hosted with your preferred provider.

Updates will become available to sites downstream as one-click updates within an hour of being pushed to the remote repository on sites running the Custom Upstream within your Organization. You can apply the updates on each site individually within the Site Dashboard, or you can apply updates in bulk using [Terminus](/terminus) and the [Mass Update](/terminus/examples/#mass-update) plugin. Review the [WordPress and Drupal Core Updates](/core-updates) documentation for more details.

## More Resources

- [WordPress and Drupal Core Updates](/core-updates)

- [Clear Upstream Cache](/terminus/commands/site-upstream-clear-cache)

- [Autopilot for Custom Upstreams](/guides/autopilot-custom-upstream)

