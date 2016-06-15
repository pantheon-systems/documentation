---
title: Enabling Solr for WordPress
description: Detailed information on using Apache Solr with WordPress.
categories: [wordpress]
tags: [code]
keywords: apche, apache solr, index, indexing, searching, index and search, indexing and searching, solr, how to enable solr, enable solr, solr api, indexserver solr, solr indexserver, solr api, enable solr search, apachesolr, apache solor search module, solr modules, configure solr,
---
[Apache Solr](/docs/solr) is a system for indexing and searching site content. Currently, all plans except for a Personal plan can use Solr.

First, you will need to add the Index Server to your site. From your Dashboard, go to **Settings** > **Add Ons** > **Apache Solr Index Server: Add**. This will provision Apache Solr containers for every environment for your site. You are now ready to begin integrating with WordPress.

## Solr Search for WordPress
Pantheon supports and maintains [Solr Search for WordPress (Solr Power)](https://wordpress.org/plugins/solr-power/).  This plugin replaces the [default search mechanism](https://codex.wordpress.org/Class_Reference/WP_Query#Search_Parameter) within WordPress while preserving the familiar integration methods within themes and widgets.


## Install and Configure Plugin
1. [Set the connection mode to SFTP](/docs/sftp) for the Dev or Multidev environment via the Pantheon Dashboard or with [Terminus](/docs/terminus/):
 ```bash
 terminus site set-connection-mode --mode=sftp
 ```

2. Install and activate the [Solr Search for WordPress (Solr Power)](https://wordpress.org/plugins/solr-power/) plugin on the Dev or Multidev environment using the WordPress Dashboard or with Terminus:
 ```bash
 terminus wp 'plugin install --activate solr-power --activate'
 ```
3. From the WordPress Dashboard, navigate to **Settings** > **Solr Options**. You should see your site's Solr Server details within the **Info** tab.
4. Select the **Indexing** tab and configure desired indexing options for Solr. Click **Save Changes** after making modifications.
 <div class="alert alert-info">
 <h4>Note</h4> You can exclude pages or posts from being indexed by providing the numeric ID of the item (comma separated).
 </div>
5. Index all publicly queryable post types by navigating to the **Actions** tab and clicking **Execute** next to "Index Searchable Post Types", or via Terminus:

 ```bash
 terminus wp 'solr index'
 ```

6. Use the **Query** tab to quickly validate Solr's indexing configuration. You can also install and activate the [Debug Bar](https://wordpress.org/plugins/debug-bar/) plugin to debug and validate Solr queries (optional):
 ![Debug Bar Solr Search extended menu](/source/docs/assets/images/solr-power-debug-bar-extension.png)
7. Deploy the plugin to the site's Test and Live environments after validation and testing.

### Optimize Index
For details, see the [Optimize command](http://solarium.readthedocs.org/en/stable/queries/update-query/building-an-update-query/optimize-command/) document.

### Schema.xml
Upon activation of the plugin on the Dev or Multidev environment, a default [`schema.xml`](https://github.com/pantheon-systems/solr-power/blob/master/schema.xml) document is automatically sent to the Solr server. The `schema.xml` file is submitted automatically when deploying the plugin to another environment on Pantheon.

You can configure a custom `schema.xml` by uploading it to the `/wp-content/uploads/solr-for-wordpress-on-pantheon/` directory.

## Known Issues/Limitations
This plugin is under active development on [GitHub](https://github.com/pantheon-systems/solr-power). Use the issue queue for status updates and support. Pull requests are also welcome!

### Re-Indexing
New, deleted, and modified posts and pages are automatically added to the Solr index. However, if you modify the indexing options within **Settings** > **Solr Options** > **Indexing**, you must manually re-index the site on the **Actions** tab.

### Enable Solr for AJAX and WordPress Dashboard
Use the `solr_allow_ajax` and the `solr_allow_admin` filters to allow Solr to work with AJAX and within the WordPress Dashboard.
