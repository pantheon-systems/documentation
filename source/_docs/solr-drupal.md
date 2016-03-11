---
title: Enabling Solr with Drupal
description: Detailed information on using Apache Solr with Drupal.
categories:
    - drupal
    - developing
keywords: apche, apache solr, index, indexing, searching, index and search, indexing and searching, solr, how to enable solr, enable solr, solr api, indexserver solr, solr indexserver, solr api, enable solr search, apachesolr, apache solor search module, solr modules, configure solr,
---
[Apache Solr](/docs/apache-solr) is a system for indexing and searching site content. First, you will need to add the Index Server to your site. From your Dashboard, go to **Settings** > **Add Ons** > **Apache Solr Index Server: Add**.

This will provision Apache Solr containers for every environment for your site. You are now ready to begin integrating with Drupal.

## Installing Solr for Drupal
### 1. Apply Upstream Updates
Use [one-click updates](/docs/applying-upstream-updates) to make sure you are running the latest version of Drupal core.

### 2. Add Apache Solr Search or Search API Solr Search Module

Two contributed modules are supported by Pantheon:

- [​https://drupal.org/project/apachesolr](https://drupal.org/project/apachesolr) - 7.x-1.x and 6.x-1.x
- [https://drupal.org/project/search\_api\_solr](https://drupal.org/project/search_api_solr) - 7.x-1.x

Solr for Drupal 8 is not supported at this time.

For most users, the apachesolr module is the easiest to configure and maintain, and includes functionality like facets and other great features.  

If you rely on highly customized data structures and the apachesolr module is not enough for your needs, search\_api\_solr provides an alternative with a more powerful interface, but is much more complex.  

Choose one or the the other and add it to your codebase. Do not enable or configure it yet.

### 3. Enable the Pantheon Apache Solr Module

<div class="alert alert-info" role="alert">
<h4>Note</h4> If you previously installed the Acquia Solr module and you still have the files present in your codebase, you will need to delete them from your repo before enabling the Pantheon Apache Solr module. If you don't, you may receive an error when attempting to connect to the Solr server.</div>

One of the modules already included in every Pantheon Drupal 7 site is [pantheon\_apachesolr](https://github.com/pantheon-systems/drops-7/tree/master/modules/pantheon/pantheon_apachesolr). This module **must** be enabled and configured in each environment (Dev, Test, Live, and each Multidev) in order to use Pantheon's Apache Solr service. pantheon\_apachesolr is not required if you are using a third-party Solr service.

Once enabled, click **Configure**, or navigate to **Administration** > **Configuration** > **Search and metadata** > **Pantheon Apache Solr**.

 ![Drupal Admin Search and Metadata Solr](/source/assets/images/desk_images/192434.png)
### 4. Post the schema.xml Using the Pantheon Apache Solr Module

The next step is to post the schema.xml, which describes Drupal fields to the Solr search indexer. Posting the schema will activate the Solr server for the site environment. Click **Post schema.xml**.  

 ![Solr configuration schema](/source/assets/images/desk_images/192435.png)  
Choose the appropriate schema for the module that you are using (apachesolr or search\_api\_solr) and Solr version (3.5.0). In the majority of cases, you will want to use 3.x/schema.xml. Do not attempt to use schemas intended for different versions of Solr, because it won't work. When you've made your selection, click **Post schema**.  

<div class="alert alert-info" role="alert">
<h4>Note</h4>
You must post the schema.xml in each environment (Dev, Test, and Live) that you want to use Pantheon's Solr Service in.</div>

### 5. Enable and Configure Your Solr Module

#### Apache Solr Search (apachesolr)

Enable both the **Apache Solr framework** and **Apache Solr Search** modules.
 ![Enable Solr module](/source/assets/images/desk_images/192444.png)
Browse to the main Apache Solr settings screen and you should now see an index is ready for you. You do not need to configure any server settings, but you can still handle your facet and bias settings as per normal:
 ![Configure Solr Settings](/source/assets/images/desk_images/27787.png)

Note that the default connection parameters are correct and do not need changing. After this point, your configuration and settings will be the same as any generic Apache Solr use case.

#### Search API Solr Search (search\_api\_solr)

Three modules are required; [entity](https://drupal.org/project/entity), [search\_api](https://drupal.org/project/search_api) and [search\_api\_solr](https://drupal.org/project/search_api_solr) need to be installed and enabled.  
 ![Enable Solr Search required modules](/source/assets/images/desk_images/192457.png)

## Additional Help

The Pantheon Solr module provides a comprehensive help section that describes a number of key Solr concepts and terms. View it by going to **Administration** > **Help** > **Pantheon Apache Solr**.

## Pantheon Solr Service Status

The Pantheon Solr module provides several interfaces for troubleshooting the health of the service, along with the ability to manually perform queries. These checks are independent of contrib module configurations in order to determine whether the service itself is performing properly, or if there is there is a problem with your site configuration.

### Status

This interface reports what the last schema that was posted to the service and whether the service itself responds to a ping.  

**Administration** > **Configuration** > **Search and metadata** > **Pantheon Apache Solr**
 ![Pantheon Apache Solr status](/source/assets/images/desk_images/192483.png)

### Execute Query

The Pantheon Apache Solr module provides an interface for administrators to send queries directly to the Solr server, independently of any contrib module. This is advanced functionality and is intended for debugging purposes only. Try queries like `/admin/ping` to see the raw server response.

 ![Send query to Solr](/source/assets/images/desk_images/192486.png)

### Drupal Status Report

The Pantheon Apache Solr ​module also adds an item to the Administration > Reports > Status report that performs a similar check to the Status check, independently of contrib module configurations.  
 ![Solr reports](/source/assets/images/desk_images/192484.png)

## Troubleshooting

The following are Pantheon-specific variables that you can check for, depending on the module you are using.  

Keep in mind that newly indexed items have a 2-minute delay until cron has been run or manually indexed before they become available in Solr search.

####apachesolr.module
If you're using the Apache Solr module, you can check for the existence of this variable using [Terminus](https://github.com/pantheon-systems/cl):
```bash
terminus drush "vget apachesolr_service_class"
```
####search_api_solr.module
If you are using search_api_solr.module, you can check it with the command:
```bash
terminus drush "vget search_api_solr_connection_class"
```

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Replace <code>&lt;site&gt;</code> with your site name, and <code>&lt;env&gt;</code> with the environment (Dev, Test, or Live). You can see a list of all your sites by running <code>terminus sites list</code>.</div>

### Error During Search API Solr Installation

If you receive the following error, be sure that you have followed all of the instructions as described in the INSTALL.txt. We can not resolve this for you as it is part of the module setup:
```php
Exception: SolrPhpClient library not found! Please follow the instructions in search_api_solr/INSTALL.txt for installing the Solr search module. in _search_api_solr_solrphpclient_path()
```
### Common Techniques


#### Did you post the schema into all your environments?

It needs to be done for Dev, Test and Live individually. You can do this at `admin/config/search/pantheon`.

#### Re-Index Content

You can do this at `admin/config/search/apachesolr`. This will add any new content that has not yet been indexed to the Solr index (within the provided numbers-per-indexing setting).


## See Also
[Apache Solr on Pantheon](/docs/apache-solr)
