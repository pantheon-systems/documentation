---
title: Apache Solr for Drupal
subtitle: How to use Solr 8 on Drupal 9
description: Guide to getting started with Pantheon Search Solr 8 on Drupal 9
cms: "Drupal 9"
categories: [integrate]
tags: [solr, search, modules]
contributors: [carolynshannon],[joa-pan]
reviewed: "2021-10-25"
layout: guide
showtoc: true
permalink: docs/guides/solr-drupal/solr-drupal-9
anchorid: solr-drupal
editpath: solr-drupal/02-solr-drupal-9.md
---

Pantheon Search with Solr 8 gives Drupal 9 web teams a high-performance search index integrated with [Integrated Composer's](/integrated-composer) one-click updates.

<Partial file="pantheon-search-status.md" />


## Solr 8 Features

Pantheon Search with Solr 8 includes multiple built-in features to make scalable, high-performance search more customizable, including the following:

- Media/rich content type indexing for content such as PDFs and Word documents
  - Solr has the ability to store information about document relationships in the index. The stored information can be used for queries and can also return child pages in nested form if the relationship is properly stored in the index.

- Multiple language support
  - Use Solr’s stemming and language identification libraries that allows for the searching of multiple languages using separate fields, the same field (separate Solr cores), or the same field and Solr core.

- Drupal Views integration for building search results pages and custom search forms

For more information on Solr 8 features, refer to the [Drupal Search API Solr](https://www.drupal.org/project/search_api_solr) documentation.

### Custom Processors

Search API module processors provide a variety of configuration options for your Pantheon Search results, like boosting results based on dates, taxonomy terms, or specific content types, controlling access to content based on permissions, and adding highlighted excerpts to results.

See the [Search API module processors documentation](https://www.drupal.org/docs/8/modules/search-api/getting-started/processors) for details.


## Before You Begin

### Drupal 9 Site Setup
Pantheon Search for Drupal 9 starts with an existing Pantheon Drupal 9 site. Set up a [new Drupal 9 site](/drupal-9) or visit the [Drupal 9 upgrade and migration](/guides/drupal-9-migration) guide to get your Drupal 9 site set up.

### Prepare the Local Environment
Review our documentation on [Git](/git), [Composer](/composer), and [Terminus](/terminus), and have them installed and configured on your local machine. Pantheon requires [Composer 2](/integrated-composer#pantheon-supports-composer-2) at a minimum.

- Mac users can use [Homebrew](https://brew.sh/) to install Git, Composer, and PHP 7.4, along with their required dependencies. Restart the shell or terminal environment after entering the following command:
  ```
  brew install git composer php@7.4
  ```
- Windows users can install [Composer](https://getcomposer.org/doc/00-intro.md#installation-windows) and [Git](https://git-scm.com/download/win), and may need to install the [XAMPP](https://www.apachefriends.org/index.html) development environment or a similar package to satisfy some dependencies. 

### Pantheon Environments
Each Pantheon environment (Dev, Test, Live, and Multidevs) has its own Solr server. Indexing and searching in one environment does not impact any other environment.


## Enable Access to Pantheon Search
As a Limited Availability participant, your will need to manually enable access to Solr 8 for your site, for each environment in which you wish to create an index (Dev, Test, Live, and Multidevs).

### Enable at the Site Level
You must enable Pantheon Search at the site level and add the Apache Solr Index Server. This can be done by using either the Terminus CLI or through the Site Dashboard. 

#### Using Terminus
Enter the following command: 
```
solr:enable <site_name>
```
Replace `<site_name>` with the specified name of the site. 

#### Using the Site Dashboard
To enable at the Site level follow the following steps:

1. Navigate to the site and environment you would like to configure. 
1. Click **Settings**.
1. Click **Add Ons > Apache Solr Index Server: Add**.


### Configure the Version
After enabling the Apache Solr Index Server, configure the `pantheon.yml` for the platform environment. Before you install the Drupal search module, you need to specify the Solr version in the `pantheon.yml` to avoid incompatibilities. Currently, Solr 8 is only supported for Drupal 9 sites. Specify Solr 8 as the search version for Drupal 9 sites by adding the following to `pantheon.yml`: 

```
search:
  version: 8
```
After you push the changes to `pantheon.yml`, a confirmation message indicating the file has successfully updated is returned in Git. The platform may take a few minutes to update, especially if you use Pantheon’s Integrated Composer to update your site modules. For more information, refer to the documentation on [Specifying a Solr version](/pantheon-yml#specify-a-solr-version)


#### Verify `pantheon.yml` is Properly Configured
After setting up the Drupal 9 site using the Dev site, you can verify that your environment is configured correctly.

1. Navigate to **Reports > Status report** 
1. Click **More Info** to identify the PHP version. This will lead you to the PHP Info page. 
1. Scroll to the “Environment Variables” section of the PHP Info page. 

The configured Solr environment will have several `PANTHEON_INDEX_*` variables, one of which will be `PANTHEON_INDEX_PORT`. If Solr 8 is configured correctly, the `PANTHEON_INDEX_PORT` value will be `443`. If any other value is displayed, your site is still configured to use Solr 3.


## Install and Enable the Search API Pantheon Module
To installl and enable the Search API Pantheon Module the access to Solr 8 must be enabled and `pantheon.yml` should be configured to use the Solr 8 version. 

### Dependencies
The dependencies will automatically be installed by Composer as part of the Search API Pantheon Module `pantheon-systems/search_api_pantheon`.
By entering the commands specified in the "Install the Search Module" section, you install the following dependencies:

- Solarium is a Solr client library for PHP and is not Drupal-specific. 

- Search API is Drupal's module for indexing content entities.

- Search API Solr makes search API work with Apache Solr. Composer manaages which version

- Guzzle version 6 is standard with Drupal Core 8 or 9.

### Install the  Search Module
To install the Search API Pantheon module, switch to your local machine. 

1. Clone the Git repository for the desired environment from the Pantheon Site Dashboard.
1. Enter the following commandin the terminal to run `composer install`:
   ```
   composer install
   ```
1. Enter the  the Add the Search API Pantheon module as a required dependency:
   ```
   composer require pantheon-systems/search_api_pantheon ^8 --prefer-dist
   ```
   
1. You should now have the Search API Pantheon module installed along with its dependencies. You can run `git status` to check for changed files.
1. Commit and push the changes.

#### Enable Pantheon Search
To enable the `search_api_pantheon` and `search_api_pantheon_admin` modules from the command line using Terminus and Drush, enter the following command: 
 ```
 terminus drush {SiteName}.{env} -- pm-enable search_api_pantheon search_api_pantheon_admin
 ```
You may also enable the modules from the site’s Extend page located in `/admin/modules`.


## Configure Pantheon Search

### Add Search Index
You should add “Search API Solr Admin” to the list of modules to enable. Once the modules are enabled, navigate to **Configuration > Search & Metadata > Search API** within Drupal’s Admin interface. The server labeled Pantheon Search should be displayed, and the status should indicate the server has been enabled. 

1. Click **Add Index** to configure a new search index.
2. Give the index a name, and select the datasources that should be indexed. For each datasource enabled, select the desired bundles, languages, and options.
3. Select **Pantheon Search** as the Server.  
4. In the Index Options panel, check **Index items immediately**.
5. Click **Save** to add the new index.

The Index status page should indicate that the newly created index was successfully saved.
























