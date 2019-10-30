---
title: Using OpenSolr With Pantheon Sites
description: Learn how to create and configure IndexDepot with Solr for advanced indexing features for your Drupal or WordPress sites.
tags: [siteintegrations]
categories: []
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

<Alert title="Note" type="info">

This article assumes that you have already enabled:
- **Drupal 7** the ApacheSolr module
- **Drupal 8** the Search API Solr Search module

</Alert>

## Create a New Index

1. After you have signed up at opensolr.com, log in and click **My Indexes**.
2. Click **Add New**.

## Set Up the Index

To create your index, you’ll need to select the environment's SOLR version and Region, then choose an index name for your index. 

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


<tablist>
<Tab title="Drupal 7" id="d7-3">

## Configure Drupal’s ApacheSolr Module

To get your index working with a Drupal site, set some configuration options in the ApacheSolr module. You can quickly reach the ApacheSolr settings page by appending the following to your site’s URL:

```
admin/config/search/apachesolr/settings/solr/edit?destination=admin/config/search/apachesolr/settings/solr
```

Provide two items to the ApacheSolr configuration:
**ServerURL:** Paste the Connection URL from OpenSolr here.
**Description:** Briefly describe your index here.

When you’ve finished, click **Save**.

<Alert title="Warning" type="danger">

A schema must be pushed in each environment (Dev/Test/Live).

</Alert>

## Test Your New Solr Connection

Now that you created the index and configured the ApacheSolr Drupal module to point to the new index, test the connection and make sure ApacheSolr can communicate with the OpenSolr index.

Go to `admin/config/search/apachesolr/settings` and click on your index.

To test the connection, simply click **Test Connection**.

If Drupal returns a success message like **“Your site has contacted the Apache Solr server”**, you have successfully set up your Index. If not, go back and complete the configuration steps above.
</tab>

<Tab title="Drupal 8" id="d8-2">

## Configure Drupal’s Search API Module

To get your index working with a Drupal 8 site, set some configuration options in the Search API module. You can quickly reach the Search API settings page by appending the following to your site’s URL:

```
admin/config/search/search-api/add-server?destination=admin/config/search/search-api
```

Provide these items to the Search API Search configuration:
**Server Name:** Enter the name for the server; including the name OpenSolr is a helpful hint here.
**Solr Connector:** If you enabled HTTP Auth in OpenSolr, choose Basic Auth. If you disabled it, choose Standard.
**HTTP protocol:** HTTPS
**Solr host:** Hostname from your OpenSolr connection info page.
**Solr port:** Port copied from your OpenSolr connection info page.
**Solr path:** /solr
**Solr core:** The name you gave your Solr core on the OpenSolr connection info page.

<Alert title="Note" type="info">

If you chose **Basic Auth**, you will see a section for HTTP Basic Authentication. Enter the username and password values from your OpenSolr Index Security page.

</Alert> 

Leave everything else with default values provided and click **Save**.
On the resulting Search API server configuration page, you should see messages indicating the Server and Core connections were successful:

<img src="msg-config-success.png" alt="Solr and Core connections success message for Drupal 8" \>

## Add Search API Solr Configuration Files to OpenSolr

Your OpenSolr server now needs the schema.xml and other configuration files. 

sNavigate to the Search API Solr module's solr-conf directory to locate the folder containing configuration files for the Solr version you chose when setting up your OpenSolr index.
Create a zip archive of the files.
Go to the opensolr instnce, click on the "config files uploader" tab.
Upload the zip archive.


<Alert title="Warning" type="danger">

A schema must be pushed in each environment (Dev/Test/Live).

</Alert>

## Add Search Index and Fields

Now that you created the server connection, add an index by visiting admin/config/search/search-api and clicking on the **Add index** button and providing information about your index:
**Index name**: The displayed name you wish to give the index.
**Datasources**: In this section, check the boxes corresponding to the entities you want indexed and available for searching. Configure each Datasource selected to indicate which items should be included in the index.
**Server**: Select the OpenSolr server you just configured.

When you have finished, click **Save**.

Next, add the fields your index should include for indexing. Click on the **Fields** tab for your search index, and then click the **Add fields** button. Select the fields to include in your index. When you have finished, be sure to click **Save changes**.


</tab>
</tablist>

## Customize Your Configuration

If you'd like to create custom configurations or manually edit your index, synonyms list, stopwords, etc., you can do so by clicking on the **Edit Configuration Files** icon on the Search Indexes page.

## Resources

- [Drupal ApacheSolr Module](https://drupal.org/project/apachesolr) 
- [WPSolr Integration](https://opensolr.com/faq/view/wpsolr)
- [OpenSolr](https://www.opensolr.com/)
- [OpenSolr Support](https://www.opensolr.com/faq)
- [FAQ](/faq)
