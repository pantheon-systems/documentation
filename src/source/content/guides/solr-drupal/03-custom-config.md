---
title: Apache Solr for Drupal
subtitle: Customize Solr Config
description: Steps for how to apply customized Solr configuration on Pantheon.
contenttype: [guide]
innav: [false]
categories: [search]
cms: [drupal11]
audience: [development]
product: [search]
integration: [--]
tags: [solr, search, modules]
reviewed: "2026-03-31"
showtoc: true
permalink: docs/guides/pantheon-search/solr-drupal/custom-config
editpath: solr-drupal/03-custom-config.md
---
## Before you begin

Ensure you have [installed the Search API Pantheon module](/guides/solr-drupal/solr-drupal#install-the-search-module) before proceeding.

## Apply Custom Solr Configurations

There are instances where you may want to edit the configuration file like `schema.xml` or `synonyms.txt` to customize the search results. The [Search API Solr](https://www.drupal.org/project/search_api_solr) module provides these configuration files via a [jump-start config set](https://git.drupalcode.org/project/search_api_solr/-/tree/4.x/jump-start/solr8/config-set?ref_type=heads). 

1. Copy the `config-set` folder to a new directory inside `/code` (e.g. `/code/solr/config`). 
  
  ```bash{promptUser: user}
  cp -r web/modules/contrib/search_api_solr/jump-start/solr8/config-set ./solr/config
  ```

  <Alert title="Note" type="info">

  Relocating these files outside of the `web/modules/contrib/search_api_solr` path ensures your custom configurations will not be overwritten by future module updates.

  </Alert>

1. Edit the necessary file (e.g.`synonyms_en.txt`) or any configuration files you want to customize.
  
  (Optional) Modify the [Solr Schema version name](https://git.drupalcode.org/project/search_api_solr/-/blob/4.x/jump-start/solr8/config-set/schema.xml?ref_type=heads#L52), so there is a differentiator to your custom configuration from the default (e.g., `drupal-4.3.5-solr-8.x-1-YOUR-CUSTOM-IDENTIFIER`).

1. Commit the changes, it is recommended to test this in a multidev environment.

1. Post the custom schema to the Solr server using the Drush command with the path to your custom config set:

    ```shell{promptUser:user}
    terminus drush $SITE.$ENV -- search-api-pantheon:postSchema /code/solr/config
    ```


1. Pantheon's platform checks for updated Solr configurations every 5 minutes. Wait 5 minutes to ensure your new custom configuration has been detected and applied by the platform before proceeding to the next step.

1. After making sure the site uses the new Solr configuration, go to `/admin/config/search/search-api` and select your index, then click **Rebuild tracking information** and then click **Index now**.

### Reloading Solr Core

Reloading Solr Core would be helpful if synonyms or other Solr config that you've recently posted isn't reflecting even after reindexing your site.
Enable the module `search_api_solr_admin` and then execute the Drush command to reload the Solr server.

#### Using Drush

```shell{promptUser:user}
terminus drush $SITE.$ENV -- en search_api_solr_admin
terminus drush $SITE.$ENV -- solr-reload [SOLR-SERVER-ID]
```

#### Using the Drupal Admin UI

1. Go to `/admin/modules`
1. Enable `Search API Solr Admin`
1. Go to `/admin/config/search/search-api`
1. Click the server you want to reload
1. You'll be able to see the `Reload Core` button and you can simply click and confirm to reload
1. Reindex the site to apply any changes
