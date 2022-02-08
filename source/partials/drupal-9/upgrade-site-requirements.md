You must confirm that your site meets the following requirements before you continue:

- Make sure that your site has the [Pantheon drops-8 repo](https://github.com/pantheon-systems/drops-8) in its Upstream.

  ### Use Terminus to Confirm the drops-8 Upstream

  Run `terminus site:info $SITE` to find the site's `Framework`. The result should be `drupal8` and `Upstream` value should include `https://github.com/pantheon-systems/drops-8.git`.

  This example shows a shortened version of the output:

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

  - The site can not be set to use an empty Upstream.

- The site does not use a nested docroot.

   - The process outlined in this guide will not work if the site repository has a `/web` folder at its root.

   - See [Serving Sites from the Web Subdirectory](/nested-docroot) for information about nested docroots.

- The site does not use another package and library manager like [Ludwig](https://www.drupal.org/project/ludwig).
