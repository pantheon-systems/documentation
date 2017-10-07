---
title: Intro to Git with WordPress
subtitle: Manage Plugins
gitwordpress: true
anchorid: plugins
survey: true
generator: pagination
layout: guide
pagination:
    provider: data.gitwordpresspages
use:
    - gitwordpresspages
permalink: docs/guides/wordpress-git/plugins/
previousurl: guides/wordpress-git/wp-uploads/
editpath: wordpress-git/05-plugins.md
---
Plugins can be easily updated. As long as the site is in SFTP mode on the dashboard, clicking “Update Now” will download and update the plugins code.

![Update Akismet Plugin from WordPress Dashboard](/source/docs/assets/images/guides/git-wordpress/update-plugin.png)

Then I will see the changes and commit them from the site dashboard.


## Moving changes to test and live
We only made changes to our dev environment, so the next step would be to push all of these changes, along with any configuration changes that are stored in the database. These steps are all described here.

## Conclusion
This covered the basics of using Git on Pantheon. Regardless of whether you prefer an FTP client, and IDE, or the command line, Pantheon believes that developers should be able to use the tools that let you work the fastest, without sacrificing quality or security.
