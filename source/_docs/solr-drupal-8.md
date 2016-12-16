---
title: Enable Solr on Drupal 8
description: Enable Solr on Drupal 8
tags: [develop]
categories: [develop]
contributors: [peter-pantheon]
---
[Apache Solr](/docs/solr) is a system for indexing and searching site content that is an alternative to the database-based Drupal core search. In Drupal when you enable Solr search it typically replaces Drupal core search entirely and Drupal core search will be disabled. 

On Pantheon the Solr server version is Solr 3.6.1 for Drupal 7 and Drupal 8. There are plans to upgrade Drupal 8 to Solr 4.x in the near future.

## Retrospective Information Regarding Solr Search Modules for D7

Solr for Drupal 7 had two flavors of Solr modules to use. There was 1.) Search API flavor which employed the Search API Solr Search module and 2.) Apache Solr flavor which employed the Apache Solr Search module. In Drupal 8 only the Search API and  Search API Solr Search modules are available. (Apache Solr Search module is deprecated in D8.)  


## Enabling Solr for Drupal 8

First, add Solr for Pantheon to your site. From your Dashboard, go to **Settings** > **Add Ons** > **Solr: Add**.

This will provision Solr server index containers for every environment for your site. 


### 1. Apply Upstream Updates
Use [one-click updates](/docs/upstream-updates) to make sure you are running the latest version of Drupal core.

### 2. Install the Search API Pantheon Module Using Composer

Two contributed modules are supported by Pantheon that interface with Pantheon's Apache Solr service (you only need to install one of these modules):

- [​https://www.drupal.org/project/search_api_pantheon](https://www.drupal.org/project/search_api_pantheon) - 8.x

Do not enable or configure it yet.

### 3. Enable the Pantheon Apache Solr Module

<div class="alert alert-info" role="alert">
<h3 class="info">Note</h3><p>If you previously installed the Acquia Solr module and you still have the files present in your codebase, you will need to delete them from your repo before enabling the Pantheon Apache Solr module. If you don't, you may receive an error when attempting to connect to the Solr server.</p></div>

The [Pantheon Apache Solr](https://github.com/pantheon-systems/drops-7/tree/master/modules/pantheon/pantheon_apachesolr) module is included within all Drupal 7 sites on Pantheon. This module **must** be enabled and configured in each environment (Dev, Test, Live, and each Multidev) in order to use Pantheon's Apache Solr service. The Pantheon Apache Solr module is not required if you are using a third-party Solr service.

**The Pantheon Apache Solr module requires that you enable the core Search module** to have administrator permission granted for "Administer search". You will not be able to post `schema.xml` if the core Search module is disabled.

Once enabled, click **Configure**, or navigate to **Administration** > **Configuration** > **Search and metadata** > **Pantheon Apache Solr**.

 ![Drupal Admin Search and Metadata Solr](/source/docs/assets/images/solr-search-metadata.png)
### 4. Post the schema.xml Using the Pantheon Apache Solr Module

The next step is to post the `schema.xml`, which describes Drupal fields to the Solr search indexer. Posting the schema will activate the Solr server for the site environment. Click **Post schema.xml**.  

![Solr configuration schema](/source/docs/assets/images/solr-config-schema.png)  

Choose the appropriate schema for the module that you are using (apachesolr or search_api_solr). In the majority of cases, you will want to use `3.x/schema.xml`. Do not attempt to use schemas intended for different versions of Solr, because it won't work. When you've made your selection, click **Post schema**.  

Place the following within `settings.php` to configure schema across all Pantheon environments (optional):
```php
if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
 // set schema for apachesolr OR set schema for search_api_solr (uncomment the line you need)
 // $conf['pantheon_apachesolr_schema'] = 'sites/all/modules/apachesolr/solr-conf/solr-3.x/schema.xml';
 // $conf['pantheon_apachesolr_schema'] = 'sites/all/modules/search_api_solr/solr-conf/solr-3.x/schema.xml';
 // or if you have a contrib folder for modules use
 // $conf['pantheon_apachesolr_schema'] = 'sites/all/modules/contrib/apachesolr/solr-conf/solr-3.x/schema.xml';
 // $conf['pantheon_apachesolr_schema'] = 'sites/all/modules/contrib/search_api_solr/solr-conf/solr-3.x/schema.xml';
}
```

<div class="alert alert-info" role="alert">
<h3 class="info">Note</h3>
<p>You must post the <code>schema.xml</code> in each environment (Dev, Test, Live, and each Multidev) that you want to use Pantheon's Solr Service in.</p></div>

### 5. Enable and Configure Your Solr Module

You should have installed only one of these modules and will need to enable only one.

#### Enabling Apache Solr Search (apachesolr)

Enable both the **Apache Solr framework** and **Apache Solr Search** modules.
 ![Enable Solr module](/source/docs/assets/images/enable-solr-module.png)

Browse to the main Apache Solr settings screen and you should now see an index is ready for you. You do not need to configure any server settings, but you can still handle your facet and bias settings as per normal:
 ![Configure Solr Settings](/source/docs/assets/images/apache-solr-module-config.png)

Note that the default connection parameters are correct and do not need changing. After this point, your configuration and settings will be the same as any generic Apache Solr use case.

#### Enabling Search API Solr Search (search\_api\_solr)

Three modules are required; [entity](https://drupal.org/project/entity), [search\_api](https://drupal.org/project/search_api) and [search\_api\_solr](https://drupal.org/project/search_api_solr) need to be installed and enabled.  
 ![Enable Solr Search required modules](/source/docs/assets/images/enable-solr-required.png)

## Additional Help

The Pantheon Solr module provides a comprehensive help section that describes a number of key Solr concepts and terms. View it by going to **Administration** > **Help** > **Pantheon Apache Solr**.

## Pantheon Solr Service Status

The Pantheon Solr module provides several interfaces for troubleshooting the health of the service, along with the ability to manually perform queries. These checks are independent of contrib module configurations in order to determine whether the service itself is performing properly, or if there is there is a problem with your site configuration.

### Status

This interface reports what the last schema that was posted to the service and whether the service itself responds to a ping.  

**Administration** > **Configuration** > **Search and metadata** > **Pantheon Apache Solr**

![Pantheon Apache Solr status](/source/docs/assets/images/solr-status.png)

### Execute Query

The Pantheon Apache Solr module provides an interface for administrators to send queries directly to the Solr server, independently of any contrib module. This is advanced functionality and is intended for debugging purposes only. Try queries like `/admin/ping` to see the raw server response.

 ![Send query to Solr](/source/docs/assets/images/solr-execute-query.png)

### Drupal Status Report

The Pantheon Apache Solr ​module also adds an item to the Administration > Reports > Status report that performs a similar check to the Status check, independently of contrib module configurations.  
 ![Solr reports](/source/docs/assets/images/solr-reports.png)

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

### Error During Search API Solr Installation

If you receive the following error, be sure that you have followed all of the instructions as described in the INSTALL.txt. We can not resolve this for you as it is part of the module setup:
```php
Exception: SolrPhpClient library not found! Please follow the instructions in search_api_solr/INSTALL.txt for installing the Solr search module. in _search_api_solr_solrphpclient_path()
```
### Common Techniques


#### Did you post the schema into all your environments?

It needs to be done for Dev, Test, and Live individually. You can do this at `admin/config/search/pantheon`.

#### Re-Index Content

You can do this at `admin/config/search/apachesolr`. This will add any new content that has not yet been indexed to the Solr index (within the provided numbers-per-indexing setting).


## See Also
[Apache Solr on Pantheon](/docs/solr)

