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

### 1. Add Solr for Pantheon to your site
From your Dashboard, go to **Settings** > **Add Ons** > **Solr: Add**.

This will provision Solr server index containers for every environment for your site. 

### 2. Apply Upstream Updates
Use [one-click updates](/docs/upstream-updates) to make sure you are running the latest version of Drupal core.

### 3. Install the Search API Pantheon Module Using Composer

[Search API Pantheon](https://www.drupal.org/project/search_api_pantheon) is a contributed module supported by Pantheon that interfaces with Pantheon's Solr service. This module may be in beta, but you can use it.

Composer is the best way to install this module because this module relies on [Solarium](http://www.solarium-project.org/). Solarium is a Solr client library for PHP and is not Drupal-specific. First, register Drupal.org as a provider of Composer packages. This command should be run locally from the root directory of your Drupal 8 git repository.

```
composer config repositories.drupal composer https://packages.drupal.org/8
```

Next, require this module.

```
composer require "drupal/search_api_pantheon ~1.0" --prefer-dist
```

You should now have this module along with Search API, Search API Solr, and Solarium. Commit the changes and push your repository to Pantheon. Be sure not to commit `search_api_pantheon` as a git submodule. One way to do that is by removing the `.git` repository that may have come with it through Composer.

```
rm -r modules/search_api_pantheon/.git
```

### 4. Setting Up Solr

See the [Drupal.org for complete documentation on Search API](https://www.drupal.org/node/1250878). To configure the connection with Pantheon, do the following steps on your Dev environment (or a Multidev):
* **Enable Solr on your Pantheon site**
  * Under "Settings" in your Pantheon site dashboard, enable Solr as an add on. This feature is available for sandbox sites as well as paid plans at the Professional level and above.
* **Enable the modules**
  * Go to `admin/modules` and enable "Search API Pantheon." Doing so will also enable Search API and Search API Solr if they are not already enabled.
* **OPTIONAL: Disable Drupal Core's search module**
  * If you are using Search API, then you probably will not be using Drupal Core's Search module. Uninstall it to save some confusion in the further configuration steps: `admin/modules/uninstall`.
* **Configure a Search API server**
  * Go to `/admin/config/search/search-api/add-server`
  * Enter "Pantheon" as the server name. (You can name the server anything you want but using something like "Pantheon" is a good way to remember where the connection goes.)
  * Under "Backend", select "Solr".
  * Under "Solr Connector", select "Pantheon".
  * Having selected "Pantheon", you will then be presented with additional options. Choose the Solr schema file you wish to use. Search API Solr module provides an option for each version of Solr (4, 5, and 6). You can customize schema files by copying these examples to your own custom module and editing them. If you are just getting started, we recommend selecting the file for Solr 4.
  * Hit the Save button to save the configuration.
* **Use the server with an index**
  The following steps are not Pantheon-specific. This module only alters the the configuration of Search API servers. To use a server, you next need to create an index.
  * Go to `admin/config/search/search-api/add-index`.
  * Name your index and choose a data source. If this is your first time using Search API, start by selecting "Content" as a data source. That option will index the articles, basic pages, and other node types you have configured.
  * Select "Pantheon" as the server.
  * Save the index.
  * For this index to be useable, you will also need to configure fields to be searched. Select the "fields" tab and choose fields to be included in the index. You may want to index many fields. "Title" is a good field to start with.
  * After adding fields the configuration, make sure the index is full by clicking "Index now" or by running cron.
* **Search the Index**
  * To actually search your index you will need a module like [Search API Pages](https://www.drupal.org/project/search_api_page) which allows for the configuration of search forms on their own pages. Search API Pages will not have been downloaded by using `composer require` on Search API Pantheon. You can download it separately.
* **Export your changes**
  * It is a best practice in Drupal 8 to export your changes to `yml` files. Using Terminus while in SFTP mode, you can run `terminus --env=dev drush "config-export -y"` to export the configuration changes you have made. Once committed, these changes can be deployed out to Test and Live environments.


### Solr versions and schemas.

Currently, the version of Solr on Pantheon is Solr 3. Officially, the lowest supported version of Solr in Search API Solr is Solr 4. [Pantheon will soon offer a higher version of Solr](https://www.drupal.org/node/2775595). Until then, you can use the schema for Solr 4 that Search API Pantheon provides.

### Pantheon environments

Each Pantheon environment (Dev, Test, Live, and Multidevs) has its own Solr server. So indexing and searching in one environment does not impact any other environment. This also means that the schema file has to be posted to each environment's Solr server. Do to so, resave the search API server. [Before this module is released as a Beta, reposting will be done automatically.](https://www.drupal.org/node/2775549)

