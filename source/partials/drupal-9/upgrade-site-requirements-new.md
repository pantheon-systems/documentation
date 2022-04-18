You must confirm that your site meets the following requirements before you continue:

- Ensure your site has the [Pantheon drops-8 repo](https://github.com/pantheon-systems/drops-8) in its upstream.

  ### Use Terminus to Confirm the drops-8 Upstream

  Run the command `terminus site:info $SITE` to display the site's basic information and properties.
 
 The following values indicate that a site is using a `drops-8` upstream: 
  * The `Framework` is `drupal8`
  * The `Upstream` includes `https://github.com/pantheon-systems/drops-8.git`
  
  The following is an abridged example of the output for the `terminus site:info $SITE` command, if the site upstream is set to `drop-8`:

  ```bash{outputLines:2-18}
  terminus site:info $SITE
  ------------------ -------------------------------------------------------------------------------------
  ID                 abdc3ea1-fe0b-1234-9c9f-3cxeAA123f88
  Name               anita-drupal
  Label              AnitaDrupal
  Created            2019-12-02 18:28:14
  Framework          drupal8
  ...
  Upstream           8a129104-9d37-4082-aaf8-e6f31154644e: https://github.com/pantheon-systems/drops-8.git
  ...
  ------------------ -------------------------------------------------------------------------------------
  ```

  - The site cannot be set to use an empty upstream.

- The site does not use another package and library manager like [Ludwig](https://www.drupal.org/project/ludwig).
