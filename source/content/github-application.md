---
title: GitHub Application
description: Pantheon's GitHub Application handles moving code from single GitHub repositories to individual Pantheon sites.
tags: [continuous-integration, workflow, D8, D9, D10]
contributors: [stevector]
contenttype: [doc]
innav: [true]
categories: [automate, workflows]
cms: [drupal, wordpress]
audience: [development]
product: [terminus]
integration: [--]
reviewed: "2025-04-15"


---



## Limitations of GitHub Application
### Limited to new projects created by the Terminus plugin

Activating the GitHub Application presently runs through a Terminus plugin that creates a new site on Pantheon and a new GitHub repository. The GitHub Application does not yet support retrofitting existing GitHub repositories or Pantheon sites yet. Follow [this issue](https://github.com/pantheon-systems/terminus-repository-plugin/issues/52) in the queue to find out when this limitation is removed.

### No On Server Development  (SFTP Mode)

New sites made with the GitHub Application do not support "[SFTP Mode](/guides/sftp)" which allows version controlled files to be altered via SFTP or simply by the CMS changing files, as is common with operations like "drush config-export." We know this limitation will stop some teams from using this application and [we are seeking feedback on how important it is to support this style of working when using 3rd party repositories](https://roadmap.pantheon.io/c/115-github-gitlab-and-bitbucket-integration).

### No dashboard representation of Git commit log

_Todo: explain this. Maybe add a screenshot_


