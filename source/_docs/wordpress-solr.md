---
title: Enabling Solr for WordPress
description: Detailed information on using Apache Solr with WordPress.
tags: [addons]
categories: [wordpress]
---
[Apache Solr](/docs/solr) is a system for indexing and searching site content. Currently, all plans except for a Personal plan can use Solr.

First, you will need to add the Index Server to your site. From your Dashboard, go to **Settings** > **Add Ons** > **Apache Solr Index Server: Add**. This will provision Apache Solr containers for every environment for your site. You are now ready to begin integrating with WordPress.

## Solr Search for WordPress

Pantheon supports and maintains [Solr Search for WordPress (Solr Power)](https://wordpress.org/plugins/solr-power/).  This plugin replaces the [default search mechanism](https://codex.wordpress.org/Class_Reference/WP_Query#Search_Parameter) within WordPress while preserving the familiar integration methods within themes and widgets.


## Install and Configure Plugin

1. [Set the connection mode to SFTP](/docs/sftp) for the Dev or Multidev environment via the Pantheon Dashboard or with [Terminus](/docs/terminus/):
 ```bash
 terminus connection:set <site>.<env> sftp
 ```

2. Install and activate the [Solr Search for WordPress (Solr Power)](https://wordpress.org/plugins/solr-power/) plugin on the Dev or Multidev environment using the WordPress Dashboard or with Terminus:

 ```bash
 terminus wp <site>.<env> -- plugin install --activate solr-power
 ```
3. From the WordPress Dashboard, navigate to **Solr Options** (previously under **Settings**). You should see your site's Solr Server details within the **Info** tab.

4. Select **Indexing Options** from the navigation bar and configure desired indexing options for Solr. Click **Save Changes** after making modifications.

    <div class="alert alert-info">
    <h4 class="info">Note</h4><p markdown="1">You can exclude pages or posts from being indexed by providing the numeric ID of the item (comma separated) in the **Excludes Posts or Pages** field.</p>
    </div>

5. Index all publicly queryable post types by navigating to the **Actions** tab and clicking **Execute** next to **Index Searchable Post Types**, or via Terminus:

 ```bash
 terminus wp <site>.<env> -- solr index
 ```

6. Deploy the plugin to the site's Test and Live environments after validation and testing.

### Optimize Index

For details, see the [Optimize command](http://solarium.readthedocs.org/en/stable/queries/update-query/building-an-update-query/optimize-command/) document.

### Schema.xml
Upon activation of the plugin on the Dev or Multidev environment, a default [`schema.xml`](https://github.com/pantheon-systems/solr-power/blob/master/schema.xml) document is automatically sent to the Solr server. The `schema.xml` file is submitted automatically when deploying the plugin to another environment on Pantheon.

You can set a custom `schema.xml` by uploading it to the `/wp-content/uploads/solr-for-wordpress-on-pantheon/` directory using SFTP. Then, from the plugin's **Actions** tab, look for **Repost schema.xml** and click on **Execute**.

<div class="alert alert-info">
<h4 class="info">Note</h4><p markdown="1"> Custom `schema.xml` files exist outside of version control, and must be uploaded to each environment seperately.</p>
</div>

## Known Issues/Limitations
This plugin is under active development on [GitHub](https://github.com/pantheon-systems/solr-power). Use the issue queue for status updates and support. Pull requests are also welcome!

### Re-Indexing
New, deleted, and modified posts and pages are automatically added to the Solr index. However, if you modify the indexing options within **Settings** > **Solr Options** > **Indexing**, you must manually re-index the site on the **Actions** tab.

### Enable Solr for AJAX and WordPress Dashboard
Use the `solr_allow_ajax` and the `solr_allow_admin` filters to allow Solr to work with AJAX and within the WordPress Dashboard.
