---
contenttype: [partial]
categories: [search]
cms: [--]
product: [search]
integration: [--]
tags: [--]
reviewed: ""
---

1. Disable the [Apache Solr Search](https://www.drupal.org/project/apachesolr),[Search API Solr Search](https://www.drupal.org/project/search_api_solr), and the [Pantheon Apache Solr](https://github.com/pantheon-systems/drops-7/tree/master/modules/pantheon/pantheon_apachesolr) modules.

1. Delete all schema configurations from `settings.php`.

1. Commit and deploy these changes to the Live environment.

1. Go to **<Icon icon="gear" /> Settings**, click **Add Ons**, and then click **Remove** for Solr.
