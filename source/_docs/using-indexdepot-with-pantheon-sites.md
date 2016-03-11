---
title: Using IndexDepot With Pantheon Sites
description: Learn how to create and configure IndexDepot with Solr for advanced indexing features for your Drupal or WordPress sites.
categories:
  - developing
keywords: indexdepot, index, index depot, solr, indexing, site content, full-text search, full text search, similarity search, highlight index, highlighting indexing, geo-search, geo search, additional indexing, additional index features, custom index
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

<div class="alert alert-info" role="alert">
<h4>Note</h4>
This article assumes that you have already enabled the ApacheSolr module.</div>

## Create a New Index

1. After you have signed up at indexdepot.com, log in and click **Search Indexes**.
2. Click **Create new index**.

## Set Up the Index

To create your index, you’ll need to supply some information about it:

**Indexname:**  What you would like to call your index.  
**Description:**  A brief description to be displayed in human language.  
**Website:**  The URL of the website you are indexing.  
**Environment:**  The environment to which the index applies.  
**Server type:**  Apache Solr or Elasticsearch.  
**Template:** Select the appropriate template.  
**\*Force SSL:** If your site uses HTTPS, you’ll need to force SSL.

After filling out the appropriate fields, click **Save** to create your index. You will then receive an Index URI and a Host-Configuration (the host-configuration is simply a breakdown of the URI).

**Note:** Copy the URI before moving forward.

## Configure Drupal’s ApacheSolr Module

To get your index working with a Drupal site, set some configuration options in the ApacheSolr module. You can quickly reach the ApacheSolr settings page by appending the following to your site’s URL:

```
admin/config/search/apachesolr/settings/solr/edit?destination=admin/config/search/apachesolr/settings/solr
```

Provide two items to the ApacheSolr configuration:  
**ServerURL:** Paste the Index URI from IndexDepot here.  
**Description:** Briefly describe your index here.

When you’ve finished, click **Save**.

<div class="alert alert-warning" role="alert">
<h4>Note</h4>
A schema must be pushed in each environment (Dev/Test/Live).</div>

## Test Your New Solr Connection

Now that you created the index and configured the ApacheSolr Drupal module to point to the new index, test the connection and make sure ApacheSolr can communicate with the IndexDepot Solr index.

Go to `admin/config/search/apachesolr/settings` and click on your index.

To test the connection, simply click **Test Connection**.

If Drupal returns a success message like **“Your site has contacted the Apache Solr server”**, you have successfully set up your Index. If not, go back and complete the configuration steps above.

## Customize Your Configuration

If you'd like to create custom configurations or manually edit your index, synonyms list, stopwords, etc., you can do so by clicking on the **Edit Configuration Files** icon on the Search Indexes page.

## Resources

- [ApacheSolr Module](https://drupal.org/project/apachesolr) 
- [IndexDepot](https://www.indexdepot.com/en/)
- [IndexDepot Support](https://www.indexdepot.com/en/faq)
- [FAQ](/docs/frequently-asked-questions)
