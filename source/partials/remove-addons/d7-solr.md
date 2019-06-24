1. Disable the [Apache Solr Search](https://www.drupal.org/project/apachesolr),[Search API Solr Search](https://www.drupal.org/project/search_api_solr), and the [Pantheon Apache Solr](https://github.com/pantheon-systems/drops-7/tree/master/modules/pantheon/pantheon_apachesolr) modules.
1. Delete all schema configurations from <code>settings.php</code>.
1. Commit and deploy code changes to the Live environment.
1. Go to <strong><span class="glyphicons glyphicons-cogwheel"></span> Settings</strong> &gt; <strong>Add Ons</strong> and click the <strong>Remove</strong> button for Solr.
