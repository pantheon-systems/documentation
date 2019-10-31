---
title: Using OpenSolr With Pantheon Sites
description: Learn how to create and configure OpenSolr with Solr for advanced search indexing features for your Drupal or WordPress sites.
tags: [solr,opensolr,search,Drupal,WordPress]
categories: [integration]
---
## Overview

Apache Solr is a system for indexing and searching site content. Pantheon provides Apache Solr v3.6 as a service that works well for the majority of sites on the platform. No permission or action is required from Pantheon to use Solr.

However, If you are looking for additional features for more advanced use cases, you may want to consider an external Solr service.

The [OpenSolr](https://www.opensolr.com/) service offers a number of features including:

- Smart full-text search
- Faceting
- Similarity search
- PDF and document search with opensolr Tika
- JTS Polygonal geo-spatial search
- REST-like API

This article covers OpenSolr configuration for Drupal sites. For WordPress-OpenSolr integration, see the [WPSolr Integration](https://opensolr.com/faq/view/wpsolr) tutorial.

<Alert title="Note" type="info">

This article assumes that you have already enabled:
- **Drupal 7** the ApacheSolr module
- **Drupal 8** the Search API Solr Search module

</Alert>

## Create a New Index

After you have signed up at [OpenSolr.com](https://www.opensolr.com/), log in and click **My Indexes**, then click **Add New**.

![Add new OpenSolr index](../images/opensolr-index-add.png)

## Set Up the Index

To create your index, 

1. select the environment's SOLR version (Search API Solr module supports Solr 4.x, 5.x, and 6.x)
2. select your preferred region, then 
3. choose a name for your index. 

After filling out the appropriate fields, click **Add Index** to create your index. You will then see a card on your dashboard for your index. Click on the index name to go to the overview page for your index. From this page, copy the following information before moving forward:

1. **Port**
2. **Path**
3. **Hostname**
2. **Connection URL**

## Set up Index Security

If you are using Drupal 8 and the Search API module, you will need to next setup (or disable) HTTP auth for your OpenSolr servers. To do this:

1. Click the Security link in the left column of the OpenSolr dashboard.
2. To configure, enter a username and password, then click **Save**. Write it down, as you will need to enter this auth username and password on the Drupal Search API Add Server form.
3. To remove HTTP Auth, Click **Remove HTTP Auth**


<TabList>

<Tab title="Drupal 7" id="d7-3" active={true}>

## Configure Drupal’s ApacheSolr Module

To get your index working with a Drupal site, set some configuration options in the ApacheSolr module. You can quickly reach the ApacheSolr settings page by appending the following to your site’s URL:

```
admin/config/search/apachesolr/settings/solr/edit?destination=admin/config/search/apachesolr/settings/solr
```

Provide two items to the ApacheSolr configuration:

1. **ServerURL:** Paste the Connection URL from OpenSolr here.
2. **Description:** Briefly describe your index here.

When you’ve finished, click **Save**.

<Alert title="Warning" type="danger">

A schema must be pushed in each environment (Dev/Test/Live).

</Alert>

## Test Your New Solr Connection

Now that you created the index and configured the ApacheSolr Drupal module to point to the new index, test the connection and make sure ApacheSolr can communicate with the OpenSolr index.

Go to `admin/config/search/apachesolr/settings` and click on your index.

To test the connection, simply click **Test Connection**.

If Drupal returns a success message like **“Your site has contacted the Apache Solr server”**, you have successfully set up your Index. If not, go back and complete the configuration steps above.
</Tab>

<Tab title="Drupal 8" id="d8-2">

## Configure Drupal’s Search API Module

To get your index working with a Drupal 8 site, set some configuration options in the Search API module. You can quickly reach the Search API settings page by appending the following to your site’s URL:

```
admin/config/search/search-api/add-server?destination=admin/config/search/search-api
```

Provide these items to the Search API Search configuration:

1. **Server Name:** Enter the name for the server; including the name OpenSolr is a helpful hint here.
2. **Solr Connector:** If you enabled HTTP Auth in OpenSolr, choose Basic Auth. If you disabled it, choose Standard.
3. **HTTP protocol:** HTTPS
4. **Solr host:** Hostname from your OpenSolr connection info page.
5. **Solr port:** Port copied from your OpenSolr connection info page.
6. **Solr path:** /solr
7. **Solr core:** The name you gave your Solr core on the OpenSolr connection info page.

<Alert title="Note" type="info">

If you chose **Basic Auth**, you will see a section for HTTP Basic Authentication. Enter the username and password values from your OpenSolr Index Security page.

</Alert> 

Leave everything else with default values provided and click **Save**.
On the resulting Search API server configuration page, you should see messages indicating the Server and Core connections were successful:

![Solr and Core connections success message for Drupal 8](../images/msg-config-success.png)

## Add Search API Solr Configuration Files to OpenSolr

Your OpenSolr server now needs the Search API Solr schema.xml and other configuration files. These are located in the search_api_solr/solr_conf, in a sub-directory according to the Solr version you are using on OpenSolr. 

1. Create a zip archive of the files in your Solr version's directory.
2. Go to the OpenSolr instance, and click on the "Configuration" tab.
3. Upload the zip archive.

## Add Search Index and Fields

Now that you created the server connection, add an index by visiting `admin/config/search/search-api` and clicking on the **Add index** button and providing information about your index:

1. **Index name**: The displayed name you wish to give the index.
2. **Datasources**: In this section, check the boxes corresponding to the entities you want indexed and available for searching. Configure each Datasource selected to indicate which items should be included in the index.
3. **Server**: Select the OpenSolr server you just configured.

When you have finished, click **Save**.

Next, add the fields your index should include for indexing. Click on the **Fields** tab for your search index, and then click the **Add fields** button. Select the fields to include in your index. When you have finished, be sure to click **Save changes**.

</Tab>

</TabList>

## Customize Your Configuration

If you'd like to create custom configurations or manually edit your index, synonyms list, stopwords, etc., you can do so by clicking on the **Configuration** icon on your OpenSolr Search Index's Tools page, then selecting the configuration file you wish to edit.

![OpenSolr configuration file editor page](../images/opensolr-config-files-editor.png)

## Resources

- [Drupal ApacheSolr Module](https://drupal.org/project/apachesolr) 
- [WPSolr Integration](https://opensolr.com/faq/view/wpsolr)
- [OpenSolr](https://www.opensolr.com/)
- [OpenSolr Support](https://www.opensolr.com/faq)
- [FAQ](/faq)
