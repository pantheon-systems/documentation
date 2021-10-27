1. Disable the [Search API Solr Search](https://www.drupal.org/project/search_api_solr), [Search API](https://www.drupal.org/project/search_api), and [Pantheon Apache Solr](https://www.drupal.org/project/search_api_pantheon) modules.
1. Delete all schema configurations from `settings.php`.
1. Commit and deploy code changes to the Live environment.
1. Go to **<span class="glyphicons glyphicons-cogwheel"></span> Settings** &gt; **Add Ons** and click **Remove** for Solr.
