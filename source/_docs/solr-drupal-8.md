---
title: Enabling Solr on Drupal 8
description: Detailed information on using Apache Solr with Drupal 8.
tags: [addons, siteintegrations]
categories: [drupal8]
contributors: [peter-pantheon]
---
[Apache Solr](/docs/solr) is a system for indexing and searching site content. First, you will need to add the Index Server to your site. From your Dashboard, go to **Settings** > **Add Ons** > **Apache Solr Index Server: Add**.

This will provision Apache Solr containers for every environment for your site. You are now ready to begin integrating with Drupal.

<div class="enablement">
  <h4 class="info" markdown="1">[Get DevOps Training](https://pantheon.io/agencies/learn-pantheon?docs){.external}</h4>
  <p>Learn how to configure Solr with help from our experts. Pantheon delivers custom workshops to help development teams master the platform and improve internal DevOps.</p>
</div>

## Install Solr on Drupal 8

### Apply Upstream Updates
Use [one-click updates](/docs/upstream-updates) to make sure you are running the latest version of Drupal core.

### Install the Search API Pantheon Module

[Search API Pantheon](https://www.drupal.org/project/search_api_pantheon) is a contributed module supported by Pantheon that interfaces with Pantheon's Solr service. This module may be in beta, but you can use it.

<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <!-- Active tab -->
  <li id="tab-1-id" role="presentation" class="active"><a href="#tab-1-anchor" aria-controls="tab-1-anchor" role="tab" data-toggle="tab">Manual Install</a></li>

  <!-- 2nd Tab Nav -->
  <li id="tab-2-id" role="presentation"><a href="#tab-2-anchor" aria-controls="tab-2-anchor" role="tab" data-toggle="tab">Composer</a></li>

</ul>

<!-- Tab panes -->
<div class="tab-content">
  <!-- Active pane content -->
  <div role="tabpanel" class="tab-pane active" id="tab-1-anchor" markdown="1">

1.  The Search API Pantheon Module requires the [Solarium](http://www.solarium-project.org/) PHP library. Refer to [Drupal's documentation](https://www.drupal.org/docs/8/modules/libraries-api-8x/installing-an-external-library-that-is-required-by-a-contributed) if you're unfamiliar with adding external libraries to Drupal.

2.  [Install](/docs/cms-admin/#install-a-new-module) the [Search API Pantheon Module](https://www.drupal.org/project/search_api_pantheon) from the Drupal admin interface.

  </div>

  <!-- 2nd pane content -->
  <div role="tabpanel" class="tab-pane" id="tab-2-anchor" markdown="1">
If your site is built using the methodologies described in our [Build Tools](https://pantheon.io/docs/guides/build-tools/) guide, you can use the steps below to add the Search API Pantheon Module and [Solarium](http://www.solarium-project.org/) library to your build dependencies. Solarium is a Solr client library for PHP and is not Drupal-specific.

1.  Run the following command from within the site's root directory to register Drupal.org as a provider of Composer packages:

    ```
    composer config repositories.drupal composer https://packages.drupal.org/8
    ```

2.  Next, require the Search API Pantheon module:

    ```
    composer require "drupal/search_api_pantheon ~1.0" --prefer-dist
    ```

3.  You should now have the Search API Pantheon module installed along with it's dependencies. Commit the changes and push to Pantheon.

    ```
    git add .
    git commit -m "Require drupal/search_api_pantheon ~1.0"
    git push origin master
    ```

  </div>

</div>



## Configure Solr
To configure the connection with Pantheon, set the [site's connection mode](/docs/sftp/#sftp-mode) to SFTP and complete the following on the Dev environment:

### Enable Modules
Enable the Search API Pantheon module via the [Drupal interface](https://www.drupal.org/docs/8/extending-drupal-8/installing-contributed-modules-find-import-enable-configure-drupal-8#enable_your_mod). When prompted, click **Continue** to enable the [Search API](https://www.drupal.org/project/search_api) and [Search API Solr](https://www.drupal.org/project/search_api_solr) modules:


### Disable Drupal Core's Search Module (Optional)
If you are using Search API, then you probably will not be using Drupal Core's Search module. Uninstall the Search core module from `/admin/modules/uninstall` to avoid confusion in further configuration steps.

### Add Search Server
Navigate to  `/admin/config/search/search-api/add-server` and configure the following, then click **Save**:

* Server name: Pantheon
* Backend: Solr
* Solr Connector: Pantheon
* Schema file: modules/search_api_solr/solr-conf/4.x/schema.xml (recommended)


You can name the server anything you want but using something like "Pantheon" is a good way to remember where the connection goes. The Search API module provides schema files for each version of Solr (4, 5, and 6). You can customize schema files by copying these examples to your own custom module and editing them. If you are just getting started, we recommend selecting the file for Solr 4.

### Add Search Index
Navigate to `admin/config/search/search-api/add-index` and name your index, then choose a data source. If this is your first time using Search API, start by selecting **Content** as a data source. This option will index articles, basic pages, and other node types you have configured.

Select **Pantheon** as the server, then click **Save and add fields**. Add fields to be included in the index and click **Done**.

After adding fields the configuration, make sure the index is full by clicking **Index now** or by running cron.

### Export Configuration
It is a best practice in Drupal 8 to export your changes to `yml` files. You can quickly export configuration changes via [Terminus](/docs/terminus):

```
terminus drush <site>.dev -- config-export -y
```

### Search the Index
To actually search your index you will need a module like [Search API Pages](https://www.drupal.org/project/search_api_page), which allows for the configuration of search forms on their own pages.


## Solr Versions and Schemas
Currently, the version of Solr on Pantheon is Apache Solr v3.6. Officially, the lowest supported version of Solr in Search API Solr is Solr 4. [Pantheon will soon offer a higher version of Solr](https://www.drupal.org/node/2775595). Until then, you can use the schema for Solr 4 that Search API Pantheon provides.

## Force Reposting of Schema File on Pantheon Environments
Each Pantheon environment (Dev, Test, Live, and Multidevs) has its own Solr server. So indexing and searching in one environment does not impact any other environment. Currently, the schema file must be reposted to each environment's Solr server. To do so, re-save the search server (e.g. `/admin/config/search/search-api/server/pantheon/edit`).

Before this module is released as a Beta, reposting the schema file will be done automatically. For details, see [https://www.drupal.org/node/2775549](https://www.drupal.org/node/2775549).


## See Also

* [Search API Docs](https://www.drupal.org/node/1250878).
