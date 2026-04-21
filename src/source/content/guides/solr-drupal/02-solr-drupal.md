---
title: Apache Solr for Drupal
subtitle: Using Solr 8 and Solr 9 on Drupal
description: Information on using Pantheon Search with Solr 8 and Solr 9 on Drupal, including setup, upgrade, and troubleshooting
contenttype: [guide]
innav: [false]
categories: [search]
cms: [drupal10, drupal11]
audience: [development]
product: [search]
integration: [--]
tags: [solr, search, modules]
contributors: [carolynshannon, joan-ing, jazzsequence, rkunjappan, mehta-asim]
reviewed: "2026-04-21"
showtoc: true
permalink: docs/guides/pantheon-search/solr-drupal/solr-drupal
editpath: solr-drupal/02-solr-drupal.md
---

Pantheon Search gives Drupal web teams a high-performance search index integrated with [Integrated Composer's](/guides/integrated-composer) one-click updates. Pantheon Search supports both Apache Solr 8 and Solr 9. Solr 9 builds on the foundation of Solr 8 with improved performance, more secure defaults, and new search capabilities.

## Solr Features

<TabList>

<Tab title="Solr 9" id="solr9" active={true}>

Solr 9 introduces the following new capabilities for Drupal sites running on Pantheon:

- Six new Snowball stemmers for multilingual sites: Hindi, Indonesian, Nepali, Serbian, Tamil, and Yiddish.
  - Stemmers help Solr understand that "running", "runs", and "runner" are the same word, so your Drupal search index returns relevant results even when visitors use different word forms. Solr 9 adds built-in support for six more languages, making it easier to build accurate search for multilingual Drupal sites without custom configuration.

- Unified highlighter is now the default in Solr 9, improving search result excerpt quality.
  - When Drupal displays search results, Solr generates the snippet of text shown below each result title. Solr 9 produces more accurate snippets that better reflect where the search term actually appears in the content, improving the user experience on Search API-powered results pages.

</Tab>

<Tab title="Solr 8" id="solr8">

Pantheon Search with Solr 8 includes multiple built-in features to make scalable, high-performance search more customizable, including the following:

- Media/rich content type indexing for attachments such as PDFs and Word documents
  - Solr has the ability to store information about document relationships in the index. The stored information can be used for queries and can also return child pages in nested form if the relationship is properly stored in the index.

- Multiple language support
  - Use Solr’s stemming and language identification libraries that allow for the searching of multiple languages using separate fields, the same field (separate Solr cores), or the same field and Solr core.

- Drupal Views integration for building search results pages and custom search forms.

- Partial string search.

</Tab>

</TabList>

For more information, refer to the [Drupal Search API Solr](https://www.drupal.org/project/search_api_solr) documentation.

### Custom Processors

Search API module processors provide a variety of configuration options for your Pantheon Search results, like boosting results based on dates, taxonomy terms, or specific content types, controlling access to content based on permissions, and adding highlighted excerpts to results.

Refer to the [Search API module processors documentation](https://www.drupal.org/docs/8/modules/search-api/getting-started/processors) for details.

## Before You Begin

### Drupal Site Setup

Pantheon Search with Solr can be used on Drupal sites. You can set up a [new Drupal site](/drupal) or visit the [Drupal upgrade and migration](/drupal-migration) guide to create a Drupal site.

### Prepare the Local Environment

Ensure you review our documentation on [Git](/guides/git/git-config), [Composer](/guides/composer), and [Terminus](/terminus), and have them installed and configured on your local machine. Pantheon requires [Composer 2](/guides/integrated-composer/ic-support) at a minimum.

* Mac users can use [Homebrew](https://brew.sh/) to install Git, Composer, and PHP, along with their required dependencies. Restart the shell or terminal environment after entering the following command:

    <TabList>

    <Tab title="Solr 9" id="solr9" active={true}>
      
    ```shell{promptUser:user}
    brew install git composer php@8.1
    ```

    </Tab>

    <Tab title="Solr 8" id="solr8">
      
    ```shell{promptUser:user}
    brew install git composer php@8.1
    ```

    </Tab>

    </TabList>

* Windows users should install the following dependencies:

  * [Composer](https://getcomposer.org/doc/00-intro.md#installation-windows)

  * [Git](https://git-scm.com/download/win)

  * The [XAMPP](https://www.apachefriends.org/index.html) development environment or a similar package might need to be installed to satisfy some dependencies.


### Enable Pantheon Search

Enable Pantheon Search under **Settings** in your Pantheon Site Dashboard. This feature is available for sandbox sites as well as paid plans at the Professional level and above.

<Alert title="Note" type="info">

Each Pantheon environment (Dev, Test, Live, and Multidevs) has its own Solr server. Indexing and searching in one environment does not impact any other environment.

</Alert>

#### Using the Site Dashboard

1. Navigate to the site and environment you would like to configure.

1. Click **Settings**.

1. Click **Add Ons > Apache Solr: Add**.

#### Using Terminus

Enter the following command. Replace `$SITE` with the specified name of the site:

```shell{promptUser:user}
terminus search:enable $SITE
```

<Alert title="Note" type="info">

The `solr:enable` and `solr:disable` commands are deprecated as of [Terminus 4.1.6](https://github.com/pantheon-systems/terminus/releases/tag/4.1.6). Use `search:enable` and `search:disable` instead.

</Alert>

### Configure the Solr Version

Add or update the following in your `pantheon.yml` file before installing the Drupal search module to avoid incompatibilities.

<TabList>

<Tab title="Solr 9" id="solr9" active={true}>


  ```yml:title=pantheon.yml
  search:
    version: 9
  ```

</Tab>

<Tab title="Solr 8" id="solr8">


  ```yml:title=pantheon.yml
  search:
    version: 8
  ```

</Tab>

</TabList>

<Alert title="Note" type="info">

If no search version is specified in `pantheon.yml`, Pantheon defaults to Solr 3. Explicitly set the version to avoid running an outdated Solr version.

</Alert>

Push the changes to `pantheon.yml`. A confirmation message is returned in Git, which is also visible in the Site Dashboard's commit history within **Code** tab. The `pantheon.yml` file follows code through environments as you promote it, enabling the Solr server in each environment automatically.

For more information, refer to the documentation on [Specifying a Solr version](/pantheon-yml#specify-a-solr-version).

### Install the Search API Pantheon Module

Composer automatically installs the following dependencies when you install `drupal/search_api_pantheon`:

- **Solarium** — a Solr client library for PHP.
- **Search API** — Drupal's module for indexing content entities.
- **Search API Solr** — connects Search API to Apache Solr. Version 4.3.x or later is required for Solr 9 compatibility.

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
   
<Alert title="Note" type="info">

   For Solr 9, install the beta release instead:

   ```shell{promptUser:user}
   composer require 'drupal/search_api_pantheon:^8.5@beta' --prefer-dist
   ```

   Version 8.5.x is currently in beta. Test thoroughly on non-production environments and report issues in [the drupal.org issue queue](https://www.drupal.org/project/issues/search_api_pantheon?categories=All).

   </Alert>

1. Run `git status` to verify that only `composer.json` and `composer.lock` were modified.
1. Commit and push the changes. Integrated Composer will take a few moments to install these on your site.

### Enable the Search API Pantheon Module

Navigate to **Admin > Extend** (`/admin/modules`) and enable **Search API Pantheon**. Enabling this module also enables Search API and Search API Solr if they are not already enabled.

You can also enable it from the command line using Terminus and Drush replacing `$ENV` with the environment:

```shell{promptUser:user}
terminus drush $SITE.$ENV -- pm-enable search_api_pantheon
```

### Verify the Installation

Navigate to **Configuration > Search & Metadata > Search API** in the Drupal Admin interface. Confirm that the **Pantheon Search** server and **Primary** index exist and are enabled.

## Configure Pantheon Search

When you enable the Search API Pantheon module, a default **Primary** index is automatically created and linked to the Pantheon Search server. You can use this index or create a custom one.

<Alert title="Note" type="info">

Indices are specific to the Solr core they were created for. Indices cannot be exported or moved once created. You will need to create an index for each environment and ensure content is indexed after creation.

</Alert>

### Using the Default Primary Index

1. Navigate to **Configuration > Search & Metadata > Search API** and select the **Primary** index.
1. Click the **Fields** tab and add the fields you want to search, such as **Title** and **Body**.
1. Click **Save changes**.
1. Post the schema to the Solr server before indexing content:

   ```shell{promptUser:user}
   terminus drush $SITE.$ENV -- search-api-pantheon:postSchema [path]
   ```

   The `[path]` argument is optional. Provide it only if you want to use a custom config set directory. If omitted, the default config set matching the installed Search API Solr version is used.

1. Click **Index now** to populate the index with your content. Content will also be indexed automatically when cron runs.

### Creating a Custom Index

1. Navigate to **Configuration > Search & Metadata > Search API** and click **Add Index**.
1. Give the index a name and select a datasource. If this is your first time using Search API, select **Content** to index your site's nodes.
1. Select **Pantheon Search** as the Server.
1. In the Index Options panel, ensure **Index items immediately** is checked.
1. Click **Save** to add the new index.
1. Click the **Fields** tab and add the fields you want to search.
1. Click **Save changes**.
1. Post the schema to the Solr server before indexing content:

   ```shell{promptUser:user}
   terminus drush $SITE.$ENV -- search-api-pantheon:postSchema [path]
   ```

1. Click **Index now** to populate the index with your content.

## Upgrading from Solr 8 to Solr 9

<Alert title="Beta Release" type="info">

Version 8.5.x of the Search API Pantheon module is currently in beta. Test thoroughly on non-production environments and report issues in [the drupal.org issue queue](https://www.drupal.org/project/issues/search_api_pantheon?categories=All).

</Alert>

<Alert title="Note" type="info">

Switching from Solr 8 to Solr 9 provisions a new Solr core. You must post the schema, clear the index tracker, and reindex all content.

</Alert>

Update the module before switching `pantheon.yml`. This order ensures the correct Solr 9 schema and connector are in place before Pantheon provisions the new Solr 9 server.

1. **Update the module:**

   ```shell{promptUser:user}
   composer require 'drupal/search_api_pantheon:^8.5@beta'
   git add composer.json composer.lock
   git commit -m "Update search_api_pantheon to 8.5.x"
   git push
   ```

2. **Update your `pantheon.yml`:**

   ```yml:title=pantheon.yml
   search:
     version: 9
   ```

   ```shell{promptUser:user}
   git add pantheon.yml
   git commit -m "Switch to Solr 9"
   git push
   ```

3. **Clear the cache:**

   ```shell{promptUser:user}
   terminus drush $SITE.$ENV -- cr
   ```

4. **Post the schema for the new Solr version:**

   ```shell{promptUser:user}
   terminus drush $SITE.$ENV -- search-api-pantheon:postSchema
   ```

5. **Clear the index and reindex content:**

   ```shell{promptUser:user}
   terminus drush $SITE.$ENV -- search-api:clear
   terminus drush $SITE.$ENV -- search-api:index
   ```

6. **Test search functionality** thoroughly on non-production environments. Use `terminus drush $SITE.$ENV -- search-api-pantheon:diagnose` to verify the configuration.

## Rolling Back to Solr 8

For some reason if you need to revert to Solr 8 after upgrading, the `search_api_pantheon` 8.5.x module supports both Solr 8 and Solr 9, so you do not need to downgrade the module version.

1. Change `pantheon.yml` back to `version: 8`:

   ```yml:title=pantheon.yml
   search:
     version: 8
   ```

2. Commit and push the change:

   ```shell{promptUser:user}
   git add pantheon.yml
   git commit -m "Revert to Solr 8"
   git push
   ```

3. **Clear the cache:**

   ```shell{promptUser:user}
   terminus drush $SITE.$ENV -- cr
   ```

4. **Re-post the Solr 8 schema:**

   ```shell{promptUser:user}
   terminus drush $SITE.$ENV -- search-api-pantheon:postSchema
   ```

5. **Clear the index and reindex content:**

   ```shell{promptUser:user}
   terminus drush $SITE.$ENV -- search-api:clear
   terminus drush $SITE.$ENV -- search-api:index
   ```

## Upgrading from 8.4.x to 8.5.x

If you are upgrading from 8.4.x and want to continue using Solr 8, no migration is needed:

1. **Update the module:**

   ```shell{promptUser:user}
   composer require 'drupal/search_api_pantheon:^8.5@beta'
   git add composer.json composer.lock
   git commit -m "Update search_api_pantheon to 8.5.x"
   git push
   ```

2. **Clear the cache:**

   ```shell{promptUser:user}
   terminus drush $SITE.$ENV -- cr
   ```

If you were previously running Search API Solr 4.2.x or earlier, you must also resolve a schema incompatibility. See [Schema incompatibility with Search API Solr 4.3.x](#schema-incompatibility-with-search-api-solr-43x) below.

## Troubleshooting

### Schema incompatibility with Search API Solr 4.3.x

Search API Solr 4.3.x introduced fundamental schema changes that are incompatible with indexes created by 4.2.x or earlier. This affects any site upgrading the module to 4.3.x, regardless of Solr server version. After upgrading, you may encounter the following error:

```
cannot change field "xyz" from index options=DOCS_AND_FREQS_AND_POSITIONS
to inconsistent index options=DOCS_AND_FREQS_AND_POSITIONS_AND_OFFSETS
```

<Alert title="Note" type="info">

If you are upgrading to Solr 9, you can skip the below section. The Solr 9 upgrade process already requires a full reindex, which resolves this incompatibility.

</Alert>

<Alert title="Note" type="info">

Resolving this requires clearing all indexed data and performing a full reindex. Plan for temporary search downtime.

</Alert>

1. **Post the updated schema:**

   ```shell{promptUser:user}
   terminus drush $SITE.$ENV -- search-api-pantheon:postSchema
   ```

2. **Disable and re-enable the Solr server** to clear all tracked index data:

   ```shell{promptUser:user}
   terminus drush $SITE.$ENV -- search-api:server-disable <server_id>
   terminus drush $SITE.$ENV -- search-api:server-enable <server_id>
   ```

   Find your `<server_id>` with `terminus drush $SITE.$ENV -- search-api:server-list`.

3. **Reload the Solr core:**

   ```shell{promptUser:user}
   terminus drush $SITE.$ENV -- search-api-solr:reload <server_id>
   ```

4. **Wait at least 5 minutes**, then verify the schema version has updated:

   ```shell{promptUser:user}
   terminus drush $SITE.$ENV -- search-api-pantheon:diagnose
   ```

   The platform checks for new schemas and issues a core reload within 1-5 minutes.

5. **Re-enable all indexes** (they are automatically disabled when the server is disabled):

   ```shell{promptUser:user}
   terminus drush $SITE.$ENV -- search-api:enable
   ```

6. **Reindex all content:**

   ```shell{promptUser:user}
   terminus drush $SITE.$ENV -- search-api:index
   ```

7. **Verify** search functionality is working as expected.


#### Incorrect Solr Version

This error is indicative of Solr 3 being active when Solr 8 is expected:

```
Server index status - Error while checking server index status: An error occurred while searching, try again later.
```

When running `drush sapi-search` commands, you may also see:

```
Apache Tomcat/7.0.68 - Error report HTTP Status 400
```

This can be fixed by [updating pantheon.yml to use Solr 8](/pantheon-yml#specify-a-solr-version).

#### Diagnose Issues

The diagnose command `drush search-api-pantheon:diagnose` (sapd) checks the Search API install and returns an error for any part that is not working.

The `drush search-api-pantheon:select` (saps) command runs the query against the Solr server. It is recommended that you use `?debug=true` on any Solr page to allow a query to pass.

#### Deploy an Updated `config.zip` to your Solr Server

If the Search API Solr displays the following after the Search module is installed:

> It is advisable to download and deploy an updated `config.zip` to your Solr server.

This message can safely be ignored. It resolves once a search index has been created and the schema files have been posted.

#### Fatal error: Cannot redeclare config_get_config_directory()

This error occurs after installing `search_api_pantheon` for Drupal using Composer. If you receive this error, you should switch to the [Drupal Composer-managed Upstream](https://github.com/pantheon-upstreams/drupal-composer-managed). See [Switch Your Custom Upstream](/guides/custom-upstream/switch-custom-upstream) for instructions on how to do this.
