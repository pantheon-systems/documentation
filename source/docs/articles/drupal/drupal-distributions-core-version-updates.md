---
title: Drupal Distributions - Core Version Updates
description: Learn to pull core updates for when repository maintainers are too slow.
keywords: upstream, core, core update, core updates, upstream updates, manually pull updates, manually update, manually update upstream, pull upstream updates, pull core updates
---
Core updates for alternate distributions (Open Atrium, Commerce Kickstart, etc.) are serviced by the maintainer, but for the times in which those updates have not been pushed you can pull them into your site manually. For the security of your site, it is always best practice to run the most up to date version of Drupal core.

## Communicate
It's important to relay the need for updating core to distribution maintainers, even if you plan on manually pulling in core version updates. First, file an issue in the queue of your distribution and reach out to a maintainer. Even better - submit a Pull Request for the update.

## Pulling Core
Navigate to the directory of your site's code repository on your local machine, then run the following commands to pull core version updates from our Drupal 7 repository:
```
git pull git://github.com/pantheon-systems/drops-7.git master
git add .
git commit -m “Update to Drupal 7.33. http://link-to-release-notes”
git push origin master
```
After testing to ensure the updates did not negatively impact your site, deploy the updates to Test and Live.
## See Also
- [Managing Upstreams](/docs/articles/organizations/managing-upstreams/)
- [Applying Upstream Updates](/docs/articles/sites/code/applying-upstream-updates)
- [Undo Git Commits](/docs/articles/sites/code/applying-upstream-updates)
