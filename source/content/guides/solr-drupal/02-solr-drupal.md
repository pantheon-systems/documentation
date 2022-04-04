---
title: Apache Solr for Drupal
subtitle: Using Solr 8 on Drupal 
description: Information on using Pantheon Search with Solr 8 on Drupal 8 or Drupal 9
cms: "Drupal 9"
categories: [integrate]
tags: [solr, search, modules]
contributors: [carolynshannon, joa-pan]
reviewed: "2021-11-10"
layout: guide
showtoc: true
permalink: docs/guides/solr-drupal/solr-drupal-9
anchorid: solr-drupal
editpath: solr-drupal/02-solr-drupal.md
---

Pantheon Search with Solr 8 gives Drupal 8 or Drupal 9 web teams a high-performance search index integrated with [Integrated Composer's](/guides/integrated-composer) one-click updates.

<Partial file="pantheon-search-status.md" />

## Solr 8 Features

Pantheon Search with Solr 8 includes multiple built-in features to make scalable, high-performance search more customizable, including the following:

- Media/rich content type indexing for attachments such as PDFs and Word documents
  - Solr has the ability to store information about document relationships in the index. The stored information can be used for queries and can also return child pages in nested form if the relationship is properly stored in the index.

- Multiple language support
  - Use Solr’s stemming and language identification libraries that allow for the searching of multiple languages using separate fields, the same field (separate Solr cores), or the same field and Solr core.

- Drupal Views integration for building search results pages and custom search forms.

- Partial string search.

For more information on Solr 8 features, refer to the [Drupal Search API Solr](https://www.drupal.org/project/search_api_solr) documentation.

### Custom Processors

Search API module processors provide a variety of configuration options for your Pantheon Search results, like boosting results based on dates, taxonomy terms, or specific content types, controlling access to content based on permissions, and adding highlighted excerpts to results.

Refer to the [Search API module processors documentation](https://www.drupal.org/docs/8/modules/search-api/getting-started/processors) for details.

## Before You Begin

### Drupal Site Setup

Pantheon Search with Solr 8 can be used on Drupal 8 or Drupal 9 sites. You can set up a [new Drupal 9 site](/drupal-9) or visit the [Drupal 9 upgrade and migration](/guides/drupal-9-migration) guide to create a Drupal 9 site.

### Prepare the Local Environment

Review our documentation on [Git](/git), [Composer](/guides/composer), and [Terminus](/terminus), and have them installed and configured on your local machine. Pantheon requires [Composer 2](/guides/integrated-composer#pantheon-supports-composer-2) at a minimum.

- Mac users can use [Homebrew](https://brew.sh/) to install Git, Composer, and PHP 7.4, along with their required dependencies. Restart the shell or terminal environment after entering the following command:

  ```shell{promptUser:user}
  brew install git composer php@7.4
  ```

- Windows users can install [Composer](https://getcomposer.org/doc/00-intro.md#installation-windows) and [Git](https://git-scm.com/download/win), and may need to install the [XAMPP](https://www.apachefriends.org/index.html) development environment or a similar package to satisfy some dependencies.

### Pantheon Environments

Each Pantheon environment (Dev, Test, Live, and Multidevs) has its own Solr server. Indexing and searching in one environment does not impact any other environment.

## Enable Access to Pantheon Search

As a Limited Availability participant, your will need to manually enable access to Solr 8 for your site, for each environment in which you would like to create an index (Dev, Test, Live, and Multidevs).

### Enable at the Site Level

You must enable Pantheon Search at the site level and add the Apache Solr Index Server. This can be done by using either the Terminus CLI or through the Site Dashboard.

#### Using Terminus

Enter the following command. Replace `$SITE` with the specified name of the site:

```shell{promptUser:user}
terminus solr:enable $SITE
```

#### Using the Site Dashboard

To enable at the Site level follow the following steps:

1. Navigate to the site and environment you would like to configure.

1. Click **Settings**.

1. Click **Add Ons > Apache Solr Index Server: Add**.

### Configure the Version

After you enable the Apache Solr Index Server, configure the `pantheon.yml` for the platform environment. Before you install the Drupal search module, specify the Solr version in the `pantheon.yml` to avoid incompatibilities.

Currently, Solr 8 is supported for Drupal 8 and Drupal 9 sites.

Specify Solr 8 as the search version for Drupal 8 or Drupal 9 sites by adding the following to `pantheon.yml`:

```yml:title=pantheon.yml
search:
  version: 8
```

After you push the changes to `pantheon.yml`, a confirmation message indicating the file has successfully updated is returned in Git. The platform may take a few minutes to update, especially if you use Pantheon’s [Integrated Composer](/guides/integrated-composer) to update your site modules.

For more information, refer to the documentation on [Specifying a Solr version](/pantheon-yml#specify-a-solr-version)

#### Verify `pantheon.yml` is Properly Configured

After you specify the Solr 8 version in the Dev environment of your Drupal 8 or Drupal 9 site, verify that the environment is configured to use Solr 8.

1. Navigate to **Reports > Status report**
1. Click **More Info** to identify the PHP version. This will lead you to the PHP Info page.
1. Scroll to the “Environment Variables” section of the PHP Info page.

The configured Solr environment will have several `PANTHEON_INDEX_*` variables, one of which will be `PANTHEON_INDEX_PORT`. If Solr 8 is configured correctly, the `PANTHEON_INDEX_PORT` value will be `443`. If any other value is displayed, your site is still configured to use Solr 3.

## Install and Enable the Search API Pantheon Module

To install and enable the Search API Pantheon Module, access to Solr 8 must be enabled and `pantheon.yml` should be configured to use the Solr 8 version as described in the steps above.

### Dependencies

Composer automatically installs dependencies as part of the Search API Pantheon Module `pantheon-systems/search_api_pantheon:^8@beta`.

The commands specified in the next section install the following dependencies:

- Solarium is a Solr client library for PHP and is not Drupal-specific.

- Search API is Drupal's module for indexing content entities.

- Search API Solr makes search API work with Apache Solr. Composer manages which version will be installed.

- Guzzle version 6 is standard with Drupal Core 8 or 9.

### Install the Search Module

To install the Search API Pantheon module, switch to your local machine.

1. Clone the Git repository for the desired environment from the Pantheon Site Dashboard.
1. Enter the following command in the terminal to run `composer install`:

   ```shell{promptUser:user}
   composer install
   ```

1. Add the Search API Pantheon module as a required dependency:

   ```shell{promptUser:user}
  composer require pantheon-systems/search_api_pantheon:^8@beta --prefer-dist
   ```

1. You should now have the Search API Pantheon module installed along with its dependencies. You can run `git status` to verify that only `composer.json` and `composer.lock` were modified.
1. Commit and push the changes, Integrated Composer will take a few moments to install these on your site.

#### Enable Pantheon Search

To enable the `search_api_pantheon:^8@beta` and `search_api_pantheon_admin` modules from the command line using Terminus and Drush, enter the following command, replacing `$ENV` with the environment:

```shell{promptUser:user}
terminus drush $SITE.$ENV -- pm-enable search_api_pantheon:^8@beta search_api_pantheon_admin
```

You may also enable the modules from the site’s Extend page located in `/admin/modules`.

## Configure Pantheon Search

### Add Search Index

Enable the **Search API Solr Admin** module.

Navigate to **Configuration > Search & Metadata > Search API** within Drupal’s Admin interface. The server labeled Pantheon Search should be displayed, and the status should indicate the server has been enabled.

1. Click **Add Index** to configure a new search index.
1. Give the index a name, and select the datasources that should be indexed. For each datasource enabled, select the desired bundles, languages, and options.
1. Select **Pantheon Search** as the Server.
1. In the Index Options panel, ensure **Index items immediately** is checked.
1. Click **Save** to add the new index.

The Index status page should indicate that the newly created index was successfully saved.

### Add Fields to the Index

To add fields to your new index, click the **Fields** tab, then click **Add fields**. When you are finished, click **Save changes**.

### Index Content

If your site contains content, click **Index now** on the **View** tab of your Index’s Overview page to begin indexing existing content.

Click **Search API** to return to the Search API overview page located in `admin/config/search/search-api`. Both the server and index you just created should be displayed on the page.

### Post the Schema

Click on the server’s name to view the server. The **View** tab displays server connection information, schema version, and indices.
To save and post the schema information, select the **Pantheon Search Admin** tab. To access the **Pantheon Search Admin** tab, the **Execute Pantheon Search admin task** permission must be enabled for the user.

Click **Post Solr Schema** to send your custom schema to the Solr 8 server. The server responds with a `200 - OK` status for each schema file posted.


## Uninstall Core Search

If the default Drupal core Search module is still enabled for your site, you might want to uninstall it for performance reasons. Navigate to `admin/modules/uninstall` to uninstall the module.

## Scope of Support

Limited Availability allows Pantheon customers to set up Pantheon Search with Solr 8 on Drupal 8 or Drupal 9, and take advantage of the features of the service. During the Limited Availability term, Pantheon will provide guidance and troubleshooting support in connection with questions and issues arising from the general installation and configuration of Pantheon Search with Solr 8 on Drupal 8 or Drupal 9.

Pantheon supports the installation and configuration of Pantheon Search with Solr 8 on supported Drupal site configurations on the platform. Support includes usage of workflows as defined in this documentation as well as support for the following features:

- Full-text search.
- Attachments/PDF search.
- Multilingual support.
- Categorization based on indexed terms and faceting.

While there are limits to the scope of support, Pantheon's Customer Success Engineers can provide recommendations and suggestions for using Pantheon Search with Solr 8 on Drupal 8 or Drupal 9.

Technical Support for Pantheon Search with Solr 8 on Drupal in Limited Availability does not include:

- Debugging custom applications and code.
- Customization of solutions, templates, or tools; including unsupported software functionality.
- Issues specific to third-party add-ons or customer-developed code.
- Consultation on administration, configuration, performance, or security.

Upgrading from Solr 3.6 is currently outside the scope of support. Existing Solr 3.6 users should recreate configuration and indexing on a fresh installation of Pantheon Search with Solr 8 on a Drupal 8 or Drupal 9 site.

## Troubleshooting Pantheon Search with Solr 8 for Drupal 

### Deploy an Updated `config.zip` to your Solr Server

If the Search API Solr displays the following after the Search module is installed:

> It is advisable to download and deploy an updated `config.zip` to your Solr server.

This message can safely be ignored. It resolves once a search index has been created and the schema files have been posted.

### Running Composer with a Lenient Endpoint

If you are using the Lenient endpoint, you may encounter an error when running Composer that resembles the following text:

> Package drupal/search_api_pantheon exists in composer repo (https://packages.drupal.org/8) and composer repo (https://packages.drupal.org/lenient) which has a higher repository priority. The packages with higher priority do not match your constraint and are therefore not installable. See https://getcomposer.org/repoprio for details and assistance.

This occurs because both repos contain a package called `drupal/search_api_pantheon`, and Composer cannot discern which package is being requested. 

Change the `repositories` definition by adding a definition for the Lenient repo in the site's `packages.json` file with an explicit `exclude` argument:

```
"repositories": {
    "lenient": {
        "type": "composer",
        "url": "https://packages.drupal.org/lenient",
        "exclude": [
            "drupal/search_api_pantheon"
        ]
    },
    "drupal": {
        "type": "composer",
        "url": "https://packages.drupal.org/8"
    }
}
```
