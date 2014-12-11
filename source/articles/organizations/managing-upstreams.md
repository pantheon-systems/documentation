---
title: Managing Upstreams
description: Merge updates to core, extensions, and themes.
category:
  - getting-started


---

Once you have a distribution running on Pantheon, keep it and its downstream sites up-to-date by merging in updates to core, extensions, and themes.

## Merging Core Releases

Upstream maintainers bear the responsibility of updating Drupal and WordPress core for their users each time the project releases a new version. Upstreams that are not kept up-to-date with core security updates of either framework will be removed from the platform. To do so: cd to your local, current copy of the remote upstream repo, checkout an update branch, and pull down the latest changes from our core upstream repository with

`git pull git://github.com/pantheon-systems/wordpress.git master`

or

`git pull git://github.com/pantheon-systems/drops-6.git master`

or

`git pull git://github.com/pantheon-systems/drops-7.git master`

Push those changes to the upstream remote

`cd upstreams/my_drupal_upstream`

`git pull git://github.com/pantheon-systems/drops-7.git master`

`git commit -m “Update to Drupal 7.33. http://link-to-release-notes” git push origin update`

## Adding or Updating Custom Code

Follow your organization’s process for managing Git repositories. Do not merge into the branch Pantheon is programmed to pull updates from, without testing first.

## Testing Your Updates

Using the testing site created when you submitted your site, test your updates for new installs and upgrades.

## Update Release Branching Strategy

We encourage you to use a continuous integration server, like Jenkins, Travis-CI, or Circle-CI, to automate this process

1. Merge upstream updates into an update branch.
2. Pull the remote repository into the local clone of your testing site.
3. Checkout the updates branch.
4. Push the updates branch to Pantheon.
5. Create a cloud development environment for the branch.
6. Wipe the database and files from the update branch.
7. Run acceptance tests for a new-site spinup use case.
8. Merge the code into dev.
9. Wipe the dev environment’s database and files.
10. Test the code update installation process, and existing spinup code update case.
11. Copy content from live and deploy code to Test.
12. Test the code against test content for the existing site update case.
13. Deploy the code to Live.
14. Test your code against a live testing site (distribution demo site - pro plan?), ensuring that modules work in an environment with more than one application container.

## Deploy Updates to Downstream Sites

1. Prepare release notes.
2. merge your pull request into the branch, providing a descriptive commit message. The message can follow the pattern: “Upstream release version, release notes http://link-to-release-notes”.

After you have merged an update, all sites that use the distribution will be given the option to apply updates on their site dashboard at #dev/code. It typically takes up to an hour for the update to be detected. Use your browser’s hard refresh if the updates do not appear after the first hour (cmd+shift+R on OSX, shift+f5 on Windows).
