---
title: What is the "pantheon_api.module"
description: Learn how to incorporate pantheon_api.module, Pantheon's internal API modules, on your Drupal sites.
category:
  - getting-started
  - developing
keywords: pantheon_api.module, pantheon api module, api, module, modules, api modules, pantheon api, use pantheon apis, use pantheon api, how to use pantheon api modules
---
Pantheon supplies a few modules with all sites to provide better integration with the platform. There is a module dedicated to serving the ApacheSolr use-case, and there is the general `pantheon_api.module`.

This module is extremely light-weight and efficient. It provides general methods your site needs to access aspects of the internal Pantheon API. This is necessary for clearing caches from our reverse-proxy/edge cache, as well as provisioning new Solr cores and other features.

The code for the API module is available within our upstream repositories:

- [Drupal 6](https://github.com/pantheon-systems/drops-6/tree/master/modules/pantheon)
- [Drupal 7](https://github.com/pantheon-systems/drops-7/tree/master/modules/pantheon)

It should always be enabled for all sites on Pantheon, and should not cause adverse effects if you export the site locally or to another environment.

Please feel free to contact us if you have any concerns with this module.
