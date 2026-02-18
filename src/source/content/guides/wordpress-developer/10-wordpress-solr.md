---
title: WordPress Developer's Guide
subtitle: Enable Solr for WordPress
description: Learn how to use Apache Solr with WordPress on Pantheon.
contenttype: [guide]
innav: [false]
categories: [search]
cms: [wordpress]
audience: [development]
product: [search]
integration: [plugins]
tags: [solr, plugins]
contributors: [cityofoaksdesign, ccharlton]
showtoc: true
permalink: docs/guides/pantheon-search/solr/wordpress-solr
reviewed: "2026-02-18"
---

This section provides information on how to use Apache Solr with your WordPress Pantheon site.

[Apache Solr](/solr) is a system for indexing and searching site content. All plans except for Basic can use Pantheon Solr.

Currently, Pantheon provides Apache Solr v3.6 for WordPress search for all plans except the Basic plan.

<Enablement title="Get WebOps Training" link="https://pantheon.io/learn-pantheon?docs">

Learn how to configure Solr with help from our experts. Pantheon delivers on-demand training to help development teams master the platform and improve internal WebOps.

</Enablement>

## Enable Solr from the Site Dashboard

You must add the Index Server to your site before you can use Solr on WordPress:

1. Navigate to your Dashboard and select **Settings**.

1. Select **Add Ons**, and then click the **Add** button under **Apache Solr Index Server**.

![Enable Solr from The Site Dashboard](../../../images/dashboard/new-dashboard/2024/settings-addons-solr.png)

This provisions Apache Solr containers for every environment of your site. You are now ready to integrate with WordPress.

## Solr Search for WordPress

Pantheon supports and maintains [Solr Search for WordPress (Solr Power)](https://wordpress.org/plugins/solr-power/). This plugin replaces the [default search mechanism](https://codex.wordpress.org/Class_Reference/WP_Query#Search_Parameter) within WordPress while preserving the familiar integration methods within themes and widgets.

This plugin requires PHP version 7.1 or higher. Refer to [Upgrade PHP versions](/guides/php/php-versions) for more information on switching PHP versions.

### Install and Configure the Solr Search for WordPress Plugin

1. Navigate to your Dev or Multidev environment and [set the connection mode to SFTP](/guides/sftp) via the Pantheon Dashboard, or with [Terminus](/terminus):

    ```bash{promptUser: user}
    terminus connection:set <site>.<env> sftp
    ```

1. Install and activate the [Solr Search for WordPress (Solr Power)](https://wordpress.org/plugins/solr-power/) plugin on the Dev or Multidev environment using the WordPress Dashboard, or with Terminus:

    ```bash{promptUser: user}
    terminus wp <site>.<env> -- plugin install --activate solr-power
    ```

    Or for WordPress Multisites:

    ```bash{promptUser: user}
    terminus wp <site>.<env> -- plugin install solr-power --activate-network
    ```

1. Open your WordPress Dashboard, navigate to **Solr Power** (previously under **Settings**), and then select the **Info** tab to see your site's Solr Server details.

1. Select **Indexing Options** from the navigation bar and configure desired indexing options for Solr.

1. Click **Save Changes** after making modifications.

   <Alert title="Note" type="info">

   You can exclude pages or posts from being indexed by providing the numeric ID of the item (comma separated) in the **Excludes Posts or Pages** field.

   </Alert>

1. Navigate to the **Actions** tab and click **Start Index** (next to **Index Searchable Post Types**) to index all publicly queryable post types, or via Terminus:

    ```bash{promptUser: user}
    terminus wp <site>.<env> -- solr index
    ```

    For WordPress Multisites, you must index all your subsites individually:

    ```bash{promptUser: user}
    terminus wp <site>.<env> -- solr index --url=example.pantheonsite.io/subsite
    ```

1. Deploy the plugin to the site's Test and Live environments after validation and testing.

### Set up Front-end AJAX Search Bar

1. Open **Appearance**, select **Widgets**, and then add the Solr Search Widget in your desired widget position.

    ![Solr Widget](../../../images/add-solr-widget.png)

1. Open **Solr Power**, select the **Facet Options** tab, check **AJAX Facet Search Support**, and enter the Div ID in **AJAX Div ID (displays search results)**, such as `primary`.

    ![Solr Settings](../../../images/solr-widget-settings.png)

    Search results appear under **Div ID**. You can use an existing Div ID in the page template, or you can create your own blank element using a unique ID name.

1. Check your desired Facets and save your settings.

1. Test the search functionality before committing the changes.

### Optimize Index

Refer to the [Optimize command](https://solarium.readthedocs.io/en/stable/queries/update-query/building-an-update-query/optimize-command/) document for more information about how you can optimize your index.

### Schema.xml

<Alert title="Note" type="info">

Custom `schema.xml` files exist outside of version control, and must be uploaded to each environment separately.

</Alert>

A default [`schema.xml`](https://github.com/pantheon-systems/solr-power/blob/master/schema.xml) document is automatically sent to the Solr server when you activate the plugin on the Dev or Multidev environment. The `schema.xml` file is submitted automatically when you deploy the plugin to another environment on Pantheon.

You can set a custom `schema.xml`:

1. Upload your custom `schema.xml` to the `/wp-content/uploads/solr-for-wordpress-on-pantheon/` directory using SFTP.

1. Navigate to the plugin's **Actions** tab, select **Repost schema.xml**, and click **Execute**.

## Known Issues/Limitations

This plugin is under active development on [GitHub](https://github.com/pantheon-systems/solr-power). Use the issue queue for status updates and support. Pull requests are also welcome!

### Re-Indexing

New, deleted, and modified posts and pages are automatically added to the Solr index. However, you must re-index the site if you modify the indexing options within **Solr Power**.

Navigate to the **Actions** tab and manually re-index the site.

### Enable Solr for AJAX and WordPress Dashboard

Use the `solr_allow_ajax` and the `solr_allow_admin` filters to allow Solr to work with AJAX and within the WordPress Dashboard.

## Safely Remove Solr

The following code changes are required before Solr can be safely uninstalled and disabled:

<Partial file="remove-addons/wp-solr.md" />

## More Resources

- [Pantheon Search](/solr)
- [Apache Solr for Drupal](/guides/solr-drupal/solr-drupal)
