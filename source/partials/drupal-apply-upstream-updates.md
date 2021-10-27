[Update the site](/core-updates) to the latest [Pantheon Drops 8](https://github.com/pantheon-systems/drops-8) Upstream and apply all available updates.

1. Use Terminus to list all available updates:

  ```bash{outputLines:2}
  terminus upstream:updates:list $SITE
  [warning] There are no available updates for this site.
  ```

1. If any updates are available, apply them using the command line or via the [Pantheon Dashboard](/core-updates#apply-upstream-updates-via-the-site-dashboard):

  ```bash{promptUser: user}
  terminus upstream:updates:apply $SITE.dev --updatedb
  ```
