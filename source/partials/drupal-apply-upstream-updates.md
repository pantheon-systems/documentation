---
contenttype: partial
categories: [migrate]
newcms: [drupal]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

[Update the site](/core-updates) to the latest [Pantheon Drops 8](https://github.com/pantheon-systems/drops-8) Upstream and apply all available updates.

1. Use Terminus to list all available updates:

  ```bash{outputLines:2}
  terminus upstream:updates:list $SITE.dev
  [warning] There are no available updates for this site.
  ```

1. Apply any available updates using the command line or the [Pantheon Dashboard](/core-updates#apply-upstream-updates-via-the-site-dashboard):

  ```bash{promptUser: user}
  terminus upstream:updates:apply $SITE.dev --updatedb
  ```
