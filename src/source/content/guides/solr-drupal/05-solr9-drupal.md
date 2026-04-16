---
title: Apache Solr for Drupal
subtitle: Using Solr 9 on the Latest Version of Drupal
description: Information on using Pantheon Search with Solr 9 on the latest version of Drupal
contenttype: [guide]
innav: [false]
categories: [search]
cms: [drupal10, drupal11]
audience: [development]
product: [search]
integration: [--]
tags: [solr, search, modules]
contributors: [carolynshannon, joan-ing, jazzsequence, rkunjappan, mehta-asim]
reviewed: ""
showtoc: true
permalink: docs/guides/pantheon-search/solr-drupal/solr-drupal
editpath: solr-drupal/05-solr9-drupal.md
---

Pantheon Search with Solr 9 gives the latest version of Drupal web teams a high-performance search index integrated with [Integrated Composer's](/guides/integrated-composer) one-click updates. Solr 9 builds on the foundation of Solr 8 with improved performance, more secure defaults, and new search capabilities such as K-Nearest Neighbors (KNN) vector search.


## Solr 9 Features

Pantheon Search with Solr 9 includes multiple built-in features to make scalable, high-performance search more customizable, including the following:

- K-Nearest Neighbors (KNN) vector search for neural and semantic search use cases.
  - Instead of matching exact keywords, Solr can now find content based on meaning and context. For example, a search for "how to fix an error" can surface content about "troubleshooting" or "debugging" even without those exact words. This is useful for Drupal sites where users search in natural language rather than specific terms.

- Six new Snowball stemmers for multilingual sites: Hindi, Indonesian, Nepali, Serbian, Tamil, and Yiddish.
  - Stemmers help Solr understand that "running", "runs", and "runner" are the same word, so your Drupal search index returns relevant results even when visitors use different word forms. Solr 9 adds built-in support for six more languages, making it easier to build accurate search for multilingual Drupal sites without custom configuration.

- Unified highlighter is now the default in Solr 9, improving search result excerpt quality.
  - When Drupal displays search results, Solr generates the snippet of text shown below each result title. Solr 9 produces more accurate snippets that better reflect where the search term actually appears in the content, improving the user experience on Search API-powered results pages.

For more information on Solr 9 features, refer to the [Drupal Search API Solr](https://www.drupal.org/project/search_api_solr) documentation.

### Custom Processors

Search API module processors provide a variety of configuration options for your Pantheon Search results, like boosting results based on dates, taxonomy terms, or specific content types, controlling access to content based on permissions, and adding highlighted excerpts to results.

Refer to the [Search API module processors documentation](https://www.drupal.org/docs/8/modules/search-api/getting-started/processors) for details.

## Before You Begin

### Drupal Site Setup

Pantheon Search with Solr 9 can be used on Drupal sites. You can set up a [new Drupal site](/drupal) or visit the [Drupal upgrade and migration](/drupal-migration) guide to create a Drupal site.

### Prepare the Local Environment

Ensure you review our documentation on [Git](/guides/git/git-config), [Composer](/guides/composer), and [Terminus](/terminus), and have them installed and configured on your local machine. Pantheon requires [Composer 2](/guides/integrated-composer/ic-support) at a minimum.

* Mac users can use [Homebrew](https://brew.sh/) to install Git, Composer, and PHP, along with their required dependencies. Restart the shell or terminal environment after entering the following command:

    ```shell{promptUser:user}
    brew install git composer php@8.1
    ```

* Windows users should install the following dependencies:

  * [Composer](https://getcomposer.org/doc/00-intro.md#installation-windows)

  * [Git](https://git-scm.com/download/win)

  * The [XAMPP](https://www.apachefriends.org/index.html) development environment or a similar package might need to be installed to satisfy some dependencies.


### Pantheon Environments

Each Pantheon environment (Dev, Test, Live, and Multidevs) has its own Solr server. Indexing and searching in one environment does not impact any other environment.

### Enable at the Site Level

You must enable Pantheon Search at the site-level and add the Apache Solr Index Server. This can be done by using either the Terminus CLI or through the Site Dashboard.

#### Using Terminus

Enter the following command. Replace `$SITE` with the specified name of the site:

```shell{promptUser:user}
terminus search:enable $SITE
```

<Alert title="Note" type="info">

The `solr:enable` and `solr:disable` commands are deprecated as of [Terminus 4.1.6](https://github.com/pantheon-systems/terminus/releases/tag/4.1.6). Use `search:enable` and `search:disable` instead.

</Alert>

#### Using the Site Dashboard

To enable at the Site level follow the following steps:

1. Navigate to the site and environment you would like to configure.

1. Click **Settings**.

1. Click **Add Ons > Apache Solr Index Server: Add**.

### Configure the Version

You must configure the `pantheon.yml` for the platform environment after you enable the Apache Solr Index Server.

1. Specify the Solr version in the `pantheon.yml` before you install the Drupal search module to avoid incompatibilities.

    - Currently, Solr 9 is supported for Drupal sites. Specify Solr 9 as the search version for Drupal sites by adding the following to `pantheon.yml`:

      ```yml:title=pantheon.yml
      search:
        version: 9
      ```

      <Alert title="Note" type="info">

      If no search version is specified in `pantheon.yml`, Pantheon defaults to Solr 3. Explicitly set `version: 9` to avoid running an outdated Solr version.

      </Alert>

1. Push the changes to `pantheon.yml`.

   - A confirmation message indicating the file has successfully updated is returned in Git. The platform may take a few minutes to update, especially if you use Pantheon's [Integrated Composer](/guides/integrated-composer) to update your site modules.

For more information, refer to the documentation on [Specifying a Solr version](/pantheon-yml#specify-a-solr-version)

## Install and Enable the Search API Pantheon Module

To install and enable the Search API Pantheon Module, access to Solr 9 must be enabled and `pantheon.yml` should be configured to use the Solr 9 version as described in the steps above.

### Dependencies

Composer automatically installs dependencies as part of the Search API Pantheon Module `drupal/search_api_pantheon:^8`.

The commands specified in the next section install the following dependencies:

- Solarium is a Solr client library for PHP and is not Drupal-specific.

- Search API is Drupal's module for indexing content entities.

- Search API Solr makes search API work with Apache Solr. Composer manages which version will be installed. Version 4.3.x or later is required for Solr 9 compatibility.

### Install the Search Module

To install the Search API Pantheon module, switch to your local machine.

1. Clone the Git repository for the desired environment from the Pantheon Site Dashboard.
1. Enter the following command in the terminal to run `composer install`:

   ```shell{promptUser:user}
   composer install
   ```
1. Add the Search API Pantheon module as a required dependency:

   ```shell{promptUser:user}
   composer require drupal/search_api_pantheon:^8 --prefer-dist
   ```
1. You should now have the Search API Pantheon module installed along with its dependencies. You can run `git status` to verify that only `composer.json` and `composer.lock` were modified.
1. Commit and push the changes, Integrated Composer will take a few moments to install these on your site.

#### Enable Pantheon Search

You can enable the `search_api_pantheon` module from the command line using Terminus and Drush.

Enter the following command, replacing `$ENV` with the environment:

```shell{promptUser:user}
terminus drush $SITE.$ENV -- pm-enable search_api_pantheon
```

You can also enable the module from the site's Extend page located in `/admin/modules`.

## Configure Pantheon Search

### Add Search Index

Enable the Search API Solr Admin module.

Navigate to **Configuration > Search & Metadata > Search API** within Drupal's Admin interface. The server labeled Pantheon Search should be displayed, and the status should indicate the server has been enabled.

<Alert title="Note" type="info">

When you enable the Search API Pantheon module, a default **Primary** index is automatically created and linked to the Pantheon Search server. You can use this index or create a custom one following the steps below.

</Alert>

1. Click **Add Index** to configure a new search index.
1. Give the index a name, and select the datasources that should be indexed. For each datasource enabled, select the desired bundles, languages, and options.
1. Select **Pantheon Search** as the Server.
1. In the Index Options panel, ensure **Index items immediately** is checked.
1. Click **Save** to add the new index.

The Index status page should indicate that the newly created index was successfully saved.

### Add Fields to the Index

Follow the steps below to add fields to your new index.

1. Click **Fields** > click **Add fields**.
1. Click **Save changes** when you are finished.

### Index Content

Follow the steps below to index existing content.

1. Click **Index now** on the **View** tab of your index's Overview page.
1. Click **Search API** to return to the Search API overview page located in `admin/config/search/search-api`.

Both the server and index you just created should be displayed on the page.

### Post the Schema

Post the schema to the Solr server using the Drush command:

```shell{promptUser:user}
terminus drush $SITE.$ENV -- search-api-pantheon:postSchema [path]
```

The `[path]` argument is optional. Provide it only if you want to use a custom config set directory. If omitted, the default config set matching the installed Search API Solr version is used.

## Upgrading from Solr 8 to Solr 9

If you are upgrading an existing site from Solr 8 to Solr 9, review the following considerations before proceeding.

### Update pantheon.yml

Change the Solr version in your `pantheon.yml` from `8` to `9`:

```yml:title=pantheon.yml
search:
  version: 9
```

Commit and push this change before proceeding with the remaining steps.

### Reindex Your Content

It is strongly recommended that you reindex all content after upgrading to Solr 9. Reindexing is mandatory if your collections were originally created on Solr 7 or older.

1. Navigate to **Configuration > Search & Metadata > Search API** in the Drupal Admin interface.
1. Select your search index.
1. Click **Clear all indexed data** on the **View** tab.
1. Click **Index now** to reindex all content.

### Update the Search API Solr Module

Ensure your `search_api_solr` module is updated to version 4.3.x or later, which includes Solr 9 compatibility:

```shell{promptUser:user}
composer update drupal/search_api_solr --with-dependencies
```

After updating, post a fresh schema to the Solr server:

```shell{promptUser:user}
terminus drush $SITE.$ENV -- search-api-pantheon:postSchema
```

<Alert title="Note" type="info">

Solr 9 requires Java 11 as the minimum Java version and is also tested with Java 17. This requirement is handled by Pantheon's infrastructure and does not require action on your part for Pantheon-hosted sites.

</Alert>

## Troubleshooting Pantheon Search with Solr 9 for Drupal

### Incorrect Solr Version

This error is indicative of an older Solr version being active when Solr 9 is expected:

```
Server index status - Error while checking server index status: An error occurred while searching, try again later.
```

When running `drush sapi-search` commands, you may also see:

```
Apache Tomcat/7.0.68 - Error report HTTP Status 400
```

This can be fixed by [updating pantheon.yml to use Solr 9](/pantheon-yml#specify-a-solr-version).

### LRUCache ClassNotFoundException

If you see errors referencing `solr.search.LRUCache` in Solr logs after upgrading to Solr 9, this is caused by the `LRUCache` Java class being removed in Solr 9.

To resolve this issue:

1. Ensure `search_api_solr` is updated to version 4.3.x or later.
1. Post a fresh schema to the Solr server:

   ```shell{promptUser:user}
   terminus drush $SITE.$ENV -- search-api-pantheon:postSchema
   ```
1. If the issue persists, clear all indexed data and reindex your content.

### Diagnose Issues

The diagnose command `drush search-api-pantheon:diagnose` (sapd) checks the Search API install and returns an error for any part that is not working.

The `drush search-api-pantheon:select` (saps) command runs the query against the Solr server. It is recommended that you use `?debug=true` on any Solr page to allow a query to pass.

### Deploy an Updated `config.zip` to your Solr Server

If the Search API Solr displays the following after the Search module is installed:

> It is advisable to download and deploy an updated `config.zip` to your Solr server.

This message can safely be ignored. It resolves once a search index has been created and the schema files have been posted.

### Running Composer with a Lenient Endpoint

If you are using the Lenient endpoint, you may encounter an error when running Composer that resembles the following text:

> Package drupal/search_api_pantheon exists in composer repo (https://packages.drupal.org/8) and composer repo (https://packages.drupal.org/lenient) which has a higher repository priority. The packages with higher priority do not match your constraint and are therefore not installable. See https://getcomposer.org/repoprio for details and assistance.

This occurs because both repositories contain a package called `drupal/search_api_pantheon`, and Composer cannot discern which package is being requested. Change the `repositories` definition by adding a definition for the Lenient repository in the site's `packages.json` file with an explicit `exclude` argument:

```json:title=packages.json
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

### Fatal error: Cannot redeclare config_get_config_directory()

This error occurs after installing `search_api_pantheon` for Drupal using Composer.  If you receive this error, you should switch to the [Drupal Composer-managed Upstream](https://github.com/pantheon-upstreams/drupal-composer-managed).  See [Switch Your Custom Upstream](/guides/custom-upstream/switch-custom-upstream) for instructions on how to do this.
