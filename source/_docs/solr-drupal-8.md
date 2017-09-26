---
title: Enabling Solr on Drupal 8
description: Detailed information on using Apache Solr with Drupal 8.
tags: [addons, siteintegrations]
categories: [drupal8]
contributors: [peter-pantheon]
---
[Apache Solr](/docs/solr) is a system for indexing and searching site content.

<div class="enablement">
  <h4 class="info" markdown="1">[Get DevOps Training](https://pantheon.io/agencies/learn-pantheon?docs){.external}</h4>
  <p>Learn how to configure Solr with help from our experts. Pantheon delivers custom workshops to help development teams master the platform and improve internal DevOps.</p>
</div>

## Before You Begin
Be sure that you:

* Enable Solr in the Pantheon Site Dashboard: **Settings** > **Add Ons** > **Apache Solr Index Server: Add**.
* Install [Composer](https://getcomposer.org/){.external}
* Create a Composer managed site on Pantheon following the [Build Tools](/docs/guides/build-tools/) guide

<div class="alert alert-danger">
<h4 class="info">Warning</h4>
<p markdown="1">Solr on Drupal 8 requires a Composer managed workflow, as described in our [Build Tools](/docs/guides/build-tools/) guide. Since one module relies on [Solarium](http://www.solarium-project.org/){.external}, an external library, in addition to Composer's autoloader, we cannot support non-Composer workflows for Solr on Drupal 8. For details, see [this Drupal.org issue](https://www.drupal.org/node/2858750){.external}.</p>
</div>

## Install Solr on Drupal 8

### Install the Search API Pantheon Module

1. Navigate to the project's root directory on your local, then checkout a new branch from master:

    ```
    git checkout -b solr master
    ```

2.  Add the Search API Pantheon module as a required dependency:

    ```
    composer require "drupal/search_api_pantheon ~1.0" --prefer-dist
    ```

3.  You should now have the Search API Pantheon module installed along with it's dependencies. Run `git status` to make sure you see the expected result (only two files modified). Commit the changes to `composer.json` and `composer.lock` and push to GitHub:

    ```
    git commit -am "Require drupal/search_api_pantheon ~1.0"
    git push origin solr
    ```

    ![Require search API output](/source/docs/assets/images/composer-require-search_api_pantheon.png)


4.  Return to GitHub and compare your feature branch against `master`. The remaining sections should be completed on the Multidev environment created as part of the PR's build process. Once configured, export the code and deploy as described in [Build Tools](/docs/guides/build-tools/).

## Configure Solr
To configure the connection with Pantheon, set the [connection mode](/docs/sftp/#sftp-mode) to SFTP and complete the following on the Multidev environment:

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
terminus drush <site>.solr -- config-export -y
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
