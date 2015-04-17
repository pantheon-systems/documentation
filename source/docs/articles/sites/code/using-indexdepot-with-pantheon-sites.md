---
title: Using IndexDepot With Pantheon Sites
description: Create and configure IndexDepot and Solr.
category:
  - developing
---

## Overview

Apache Solr is a system for indexing and searching site content. Pantheon provides Apache Solr v3.5 as a service that works well for the majority of sites on the platform. No permission or action is required from Pantheon to use Solr.

However, If you are looking for additional features for more advanced use cases, you may want to consider an external Solr service.  



The [IndexDepot](https://www.indexdepot.com/en/) service offers a number of features including:

- Smart full-text search
- Faceting
- Similarity search
- Highlighting
- Geo-search
- REST-like API

**Note:** This article assumes that you have already enabled the ApacheSolr module.

## Create a New Index

Once you have signed-up at indexdepot.com, login and click **Search Indexes**.

![](/source/docs/assets/images/desk_images/272823.png)

Next, click **Create new index**.

![](/source/docs/assets/images/desk_images/272825.png)

## Set Up the Index

To create your index, you’ll need to supply some information about it:

![](/source/docs/assets/images/desk_images/272830.png)  
 ![](/source/docs/assets/images/desk_images/272831.png)

**Indexname:**  What you would like to call your index.  
**Description:**  A brief description to be displayed in human language.  
**Website:**  The URL of the website you will be indexing.  
**Environment:**  The environment to which the index applies. For example, the index I have created applies to the development environment of my site.  
**Server type:** For our purposes, we will be using Apache Solr. IndexDepot also supports Elasticsearch.  
**Template:** Different applications require different templates. I am indexing a Drupal 7 site, so I’ve selected the template for Drupal 7.  
**\*Force SSL:** If your site uses https, you’ll need to force SSL. I am not indexing a site using SSL for this documentation.

After filling out the appropriate fields, click **Save** to create your index.

After the index has been saved, you will be provided with an Index URI and a Host-Configuration (the host-configuration is simply a breakdown of the URI.

**Note:** Copy the URI before moving forward

![](/source/docs/assets/images/desk_images/272832.png)

 

## Configure Drupal’s ApacheSolr Module

To get your index working with our Drupal site, we need to set some configuration options in the ApacheSolr module.

You can quickly reach the ApacheSolr settings page by appending the following to your site’s URL:

```
admin/config/search/apachesolr/settings/solr/edit?destination=admin/config/search/apachesolr/settings/solr
```

Here we need to provide two items to the ApacheSolr configuration:  
**ServerURL:** Paste the Index URI from IndexDepot here.  
**Description:** Briefly describe your index here.

![](/source/docs/assets/images/desk_images/272833.png)

When you’ve finished, click **Save**.

**Note**: A schema must be pushed in each environment (Dev/Test/Live).

## Test Your New Solr Connection

Now that we’ve created our index and configured our ApacheSolr Drupal module to point to our new index, we’ll want to test the connection and make sure ApacheSolr can communicate with the IndexDepot Solr index.

Head to `admin/config/search/apachesolr/settings` and click on your index.

![](/source/docs/assets/images/desk_images/272843.png)

To test the connection, simply click **Test Connection**.

If Drupal returns a success message like **“Your site has contacted the Apache Solr server”**, you have successfully setup your Index.

If not, you’ll want to retrace the steps in this document to make sure that you’ve done each and every one.

## Customize Your Configuration

If you'd like to create custom configurations or manually edit your index, synonyms list, stopwords, etc., you may do so by clicking on the **Edit Configuration Files** icon on the Search Indexes page. See example below:

 ![](/source/docs/assets/images/desk_images/275362.png)

This will present you with a page where you can edit and add files:

 ![](/source/docs/assets/images/desk_images/275363.png)​
## Resources

- [ApacheSolr Module](https://drupal.org/project/apachesolr) 
- [IndexDepot](https://www.indexdepot.com/en)
- [IndexDepot Support](https://www.indexdepot.com/en/faq)
- [FAQ](/docs/articles/frequently-asked-questions)
