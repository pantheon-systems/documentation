---
title: Enabling Solr for WordPress
description: Detailed information on using Apache Solr with WordPress.
category:
    - wordpress
    - developing
keywords: apche, apache solr, index, indexing, searching, index and search, indexing and searching, solr, how to enable solr, enable solr, solr api, indexserver solr, solr indexserver, solr api, enable solr search, apachesolr, apache solor search module, solr modules, configure solr,
---
[Apache Solr](/docs/articles/sites/apache-solr) is a system for indexing and searching site content. First, you will need to add the Index Server to your site. From your Dashboard, go to **Settings** > **Add Ons** > **Apache Solr Index Server: Add**.

This will provision Apache Solr containers for every environment for your site. You are now ready to begin integrating with WordPress.

## Solr Search for WordPress
Pantheon supports and maintains [Solr Search for WordPress (Solr Power)](https://wordpress.org/plugins/solr-power/).  This plugin replaces the [default search mechanism](https://codex.wordpress.org/Class_Reference/WP_Query#Search_Parameter) within WordPress while preserving the familiar integration methods within themes and widgets.


## Install and Configure Plugin
1. [Set the connection mode to SFTP](/docs/articles/sites/code/developing-directly-with-sftp-mode) for the Dev or Multidev environment via the Pantheon Dashboard or with [Terminus](/docs/articles/local/cli/):
 ```bash
 terminus site set-connection-mode --site=<site> --env=dev --mode=sftp
 ```

2. Install and activate the [Solr Search for WordPress (Solr Power)](https://wordpress.org/plugins/solr-power/) plugin on the Dev or Multidev environment using the WordPress Dashboard or with Terminus:
 ```bash
 terminus wp 'plugin install --activate solr-power' --site=<site> --env=dev
 ```
 Upon activation, the plugin will generate and send a `schema.xml` document to the Solr server.
3. From the WordPress Dashboard, navigate to **Settings** > **Solr Options**. You should see your site's Solr Server details within the **Info** tab.
4. Select the **Indexing** tab to customize content indexed on Solr. Click **Save Changes** after making modifications.
 <div class="alert alert-info">
 <h4>Note</h4> You can exclude pages or posts from being indexed by providing the numeric ID of the item (comma separated).
 </div>
5. Select the **Actions** tab and index your site's posts, pages, and/or attachments on Solr by clicking all that apply:
 - **Load All post(s)**
 - **Load All page(s)**
 - **Load All attachment(s)**
6. Use the **Query** tab to search for words and/or phrases to validate Solr's indexing configuration.

Deploy the plugin to the site's Live environment after validation and testing. The `schema.xml` file must be resent to Solr when deploying the plugin to another environment. Select **Repost schema.xml** from the **Actions** tab, then validate expected results.
### Optimize Index
For details, see [Optimize command](http://solarium.readthedocs.org/en/stable/queries/update-query/building-an-update-query/optimize-command/).

## Known Issues/Limitations
This plugin is under active development on [GitHub](https://github.com/pantheon-systems/solr-power). Use the issue queue for status updates and support. Pull requests are also welcome!
### Automatic Re-Indexing
Solr is updated automatically when a post is modified, published, or deleted. If modifications to the indexing options have been saved within the **Indexing** tab, the site must be indexed again within the **Actions** tab.
### Deploy to Test and Live
The `schema.xml` file is not automatically sent to Solr when deploying from one environment to another. Once you have deployed to the Test and/or Live environment, log into the environment's URL and navigate to **Settings** > **Solr Options** > **Actions**. Select **Repost schema.xml** and re-index your site by selecting all that apply:

- **Load All post(s)**
- **Load All page(s)**
- **Load All attachment(s)**
### Custom Fields
The plugin does not currently index custom fields as expected, check [this issue](https://github.com/pantheon-systems/solr-power/issues/51) for progress updates.
### Custom Post Types
Future development work may allow for indexing custom post types, however they are not yet supported. Pull requests are welcome!
