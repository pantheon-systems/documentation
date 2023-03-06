---
title: Using Opensolr With Pantheon Sites
description: Learn how to create and configure Opensolr with Solr for advanced search indexing features for your Drupal sites.
tags: [modules, solr]
contributors: [joa-pan, carolynshannon]
reviewed: "2022-02-28"
contenttype: [doc]
innav: [true]
categories: [search]
cms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [--]
---

## Overview

Apache Solr is a system for indexing and searching site content. Pantheon provides [Apache Solr](/solr) as a service that works well for the majority of sites on the platform. No permission or action is required from Pantheon to use Solr.
<Partial file="solr-version.md" />

However, if you are looking for additional features for more advanced use cases, you may want to consider an external Solr service.

The [Opensolr](https://www.opensolr.com/) service offers a number of features including:

- Smart full-text search
- Faceting
- Similarity search
- PDF and document search with opensolr Tika
- JTS Polygonal geo-spatial search
- REST-like API

This document covers Opensolr configuration for Drupal sites. For WordPress-Opensolr integration, see Opensolr's [WPSolr Integration](https://opensolr.com/faq/view/wpsolr) tutorial.

## Before You Begin

This doc assumes that you have already enabled:

* **Drupal 7** - the [Apache Solr Search](https://www.drupal.org/project/apachesolr) module
* **Drupal (Latest Version)**  - the [Search API Solr](https://www.drupal.org/project/search_api_solr) module using Composer which is required by Search API Solr to manage dependencies. 

## Create a New Index

1. Register at [Opensolr.com](https://www.opensolr.com/) and log in to your Opensolr account.
1. Click **My Indexes** to display the drop-down menu.
1. Click **Add New**. 

The _Select Your Opensolr Environemnt_ page is displayed and you can either choose an existing environment or request a new environment. 

## Set Up the Index

To create your index:
1. From the **Version** list on the left navigation panel, select the environment's Solr version.
1. Select your preferred region.
1. Enter a name for your index in the **Index Name** field. The name must be unique and cannot already exist.
1. After filling out the appropriate fields, click **Add Index** to create your index. 

You will then see a card on your dashboard for your index. Click on the index name to go to the Overview page for your index. From this page, copy the following information before moving forward:

* **Port**
* **Path**
* **Hostname**
* **Connection URL**


## Configure the Solr Module

### Configure Drupal’s Apache Solr Module (Drupal 7) 

1. Set configuration options in the Apache Solr module, to get your index working with a Drupal site. You can access the Apache Solr Settings page by appending the following to your site’s URL:

  ```none
  admin/config/search/apachesolr/settings/solr/edit?destination=admin/config/search/apachesolr/settings/solr
  ```
2. Provide the following information to configure Apache Solr:
  * **ServerURL:** Paste the Connection URL from Opensolr.
  * **Description:** Briefly describe your index.
  
3. Click **Save** when you are finished.

<Alert title="Warning" type="danger">
A schema must be pushed in each environment (Dev/Test/Live).
</Alert>

### Test Your New Solr Connection

Now that you have created the index and configured the ApacheSolr Drupal module to point to the new index, test the connection and ensure Apache Solr can communicate with the Opensolr index.

1. Go to `admin/config/search/apachesolr/settings` 
1. Click on your index.
1. To test the connection, click **Test Connection**.

If Drupal returns a message such as “Your site has contacted the Apache Solr server”, you have successfully set up your index. If not, go back and retry the configuration steps detailed above.


## Configure Drupal’s Search API Solr and Search API Opensolr modules (Drupal Latest Version)

### Setup OpenSolr connection in Search API OpenSolr 

Navigate to the OpenSolrConfig Form 
Enter you Opensolr API credentials in the fed s under the OpenSolr tabYou will need a login name and secret key for . A secret key in the drop-down after you set it up.
(admin/config/search/search-api/opensolr)


To setup a secret key API Key needs to be retrieved from Opensolr dashboard

![Screenshot 2023-02-16 at 1 02 25 PM](https://user-images.githubusercontent.com/10537340/219476891-cc4a4803-9cd8-4580-8312-b3b1cc24b500.png)

<Alert title="Warning" type="danger">
Warning:

Do not click on "Generate a New API Key" on OpenSolr dahsboard (see screenshot). It does not confirm the action and immediatly changes the API key for the account which would impact all the indexes therefore all the environments (including prod).
If you clicked on it, you need add the newly generated API key to the secret key storage.
</Alert>

### Setting up OpenSolr server in Drupal’s Search API Solr:

You need to create a new server by going to the Search API Configuration page (/admin/config/search/search-api) and clicking on Add server.
If you've successfully established connection to OpenSolr through the step above (Setup OpenSolr connection in Search API OpenSolr), when you pick Solr as a backend, and then OpenSolr with Basic Auth as the authentication method, you will automatically get a dropdown menu of all your existing indexes on OpenSolr. 
### Setting up OpenSolr index in Drupal’s Search API Solr:
As a last configuration step you need to set up an index in Drupal. You can do that through the Search API Configuration page (/admin/config/search/search-api).
### Test Your New Solr Connection
Now that you created the server and index and configured the Search API OpenSolr and Search API Solr  Drupal module, test the connection and make sure your site can communicate with the Opensolr index.

Go to `/admin/config/search/search-api` and click on your index. If the indexing works, your connection is successful!

## Customize Your Configuration

If you'd like to create custom configurations or manually edit your index, synonyms list, stopwords, etc., you can do so by clicking on the **Configuration** icon on your Opensolr Search Index's Tools page, then selecting the configuration file you wish to edit.

![Opensolr configuration file editor page](../images/opensolr-config-files-editor.jpg)

## More Resources

- [Drupal ApacheSolr Module](https://drupal.org/project/apachesolr) 
- [Drupal Search API Solr Module](https://www.drupal.org/project/search_api_solr) 
- [Drupal Search API Opensolr Module](https://www.drupal.org/project/search_api_opensolr) 
- [WPSolr Integration](https://opensolr.com/faq/view/wpsolr)
- [Opensolr](https://www.opensolr.com/)
- [Opensolr Support](https://www.opensolr.com/faq)
- [FAQ](/faq)
