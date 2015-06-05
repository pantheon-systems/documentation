---
title: Update Core for Site's Using Outdated Versions on Custom Distributions
description: Learn to pull core updates for when repository maintainers of alternate distributions are too slow.
keywords: upstream, core, core update, core updates, upstream updates, manually pull updates, manually update, manually update upstream, pull upstream updates, pull core updates
---
If your site reports a new version update is available and you don't see a [one-click update](/docs/articles/sites/code/applying-upstream-updates/#apply-a-core-update) in your site's dashboard, take a look at the upstream URL (**Settings** >> **About Site**). If the recent commits are less than an hour or two old, wait and try accessing your Pantheon Site Dashboard again to see if one-click upstream update is available. If it's been more than an hour or two and you DO see a recent commit in the upstream, open a support ticket. Otherwise, you should pull the updates into your site manually.

## Prerequisites
Core updates for [distributions](https://www.drupal.org/documentation/build/distributions) (Open Atrium, Commerce Kickstart, etc.) are serviced by the maintainer, but for the times in which those updates have not been pushed you can pull them into your site manually. To start, you'll need a local copy of your site's codebase:

1. Access the site's Dashboard and change the [connection mode](/docs/articles/getting-started/#interact-with-your-code) to Git.
2. Copy the clone command.
 ![Git clone](/docs/assets/images/git_string.png)
3. In a local terminal, type `git clone ` and paste the command.
4. Git will unpackage the code in a directory created using your site name. Use `cd your-site-name` to navigate to the new folder.


## Manually Pulling Core
Navigate to the directory of your site's code repository on your local machine, then run the following commands to pull core version updates for the CMS version in use:
### Drupal 7
```
git pull git://github.com/pantheon-systems/drops-7.git master
git add .
git commit -m “Update to Drupal 7.33. http://link-to-release-notes”
git push origin master
```
### Drupal 6
```
git pull git pull git://github.com/pantheon-systems/drops-6.git master
git add .
git commit -m “Update to Drupal 6 http://link-to-release-notes”
git push origin master
```
### WordPress
```
git pull git://github.com/pantheon-systems/wordpress.git master
git add .
git commit -m “Update WordPress Core http://link-to-release-notes”
git push origin master
```
After testing to ensure everything looks good, deploy the updates to Test and Live. The same method can be applied to updating [modules](https://www.drupal.org/node/1974964).
## Communicate
It's important to relay the need for updating core to distribution maintainers, even if you plan on manually pulling in core version updates. First, file an issue in the queue of your distribution and reach out to a maintainer. Even better - submit a Pull Request for the update.
## See Also
- [Managing Upstreams](/docs/articles/organizations/managing-upstreams/)
- [Applying Upstream Updates](/docs/articles/sites/code/applying-upstream-updates)
- [Undo Git Commits](/docs/articles/sites/code/applying-upstream-updates)
