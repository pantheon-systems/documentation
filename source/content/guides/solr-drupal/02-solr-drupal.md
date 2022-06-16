---
title: Apache Solr for Drupal
subtitle: Using Solr 8 on Drupal 9
description: Information on using Pantheon Search with Solr 8 on Drupal 9
cms: "Drupal 9"
categories: [integrate]
tags: [solr, search, modules]
contributors: [carolynshannon, joa-pan]
reviewed: "2022-05-15"
layout: guide
showtoc: true
permalink: docs/guides/solr-drupal/solr-drupal-9
anchorid: solr-drupal
editpath: solr-drupal/02-solr-drupal.md
---

Pantheon Search with Solr 8 gives Drupal 9 web teams a high-performance search index integrated with [Integrated Composer's](/guides/integrated-composer) one-click updates.


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

Pantheon Search with Solr 8 can be used on Drupal 9 sites. You can set up a [new Drupal 9 site](/drupal-9) or visit the [Drupal 9 upgrade and migration](/drupal-9-migration) guide to create a Drupal 9 site.

### Prepare the Local Environment

Ensure you review our documentation on [Git](/git), [Composer](/guides/composer), and [Terminus](/terminus), and have them installed and configured on your local machine. Pantheon requires [Composer 2](/guides/integrated-composer#pantheon-supports-composer-2) at a minimum.

* Mac users can use [Homebrew](https://brew.sh/) to install Git, Composer, and PHP 7.4, along with their required dependencies. Restart the shell or terminal environment after entering the following command:

    ```shell{promptUser:user}
    brew install git composer php@7.4
    ```

* Windows users should install the following dependencies:
  
  * [Composer](https://getcomposer.org/doc/00-intro.md#installation-windows)
  
  * [Git](https://git-scm.com/download/win)
  
  * The [XAMPP](https://www.apachefriends.org/index.html) development environment or a similar package might need to be installed to satisfy some dependencies.


### Pantheon Environments

Each Pantheon environment (Dev, Test, Live, and Multidevs) has its own Solr server. Indexing and searching in one environment does not impact any other environment.

## Enable Access to Pantheon Search

As a Limited Availability participant, your will need to manually enable access to Solr 8 for your site, for each environment in which you would like to create an index (Dev, Test, Live, and Multidevs).

### Enable at the Site Level

You must enable Pantheon Search at the site-level and add the Apache Solr Index Server. This can be done by using either the Terminus CLI or through the Site Dashboard.

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

You must configure the `pantheon.yml` for the platform environment after you enable the Apache Solr Index Server.

1. Specify the Solr version in the `pantheon.yml` before you install the Drupal search module to avoid incompatibilities.

    - Currently, Solr 8 is supported for Drupal 9 sites. Specify Solr 8 as the search version for Drupal 9 sites by adding the following to `pantheon.yml`:

      ```yml:title=pantheon.yml
      search:
        version: 8
      ```
1. Push the changes to `pantheon.yml`.

   - A confirmation message indicating the file has successfully updated is returned in Git. The platform may take a few minutes to update, especially if you use Pantheon’s [Integrated Composer](/guides/integrated-composer) to update your site modules.

For more information, refer to the documentation on [Specifying a Solr version](/pantheon-yml#specify-a-solr-version)

#### Verify `pantheon.yml` is Configured Correctly

After you specify the Solr 8 version in the Dev environment of your Drupal 9 site, verify that the environment is configured to use Solr 8.

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

You can enable the `search_api_pantheon:^8@beta` and `search_api_pantheon_admin` modules from the command line using Terminus and Drush. 

Enter the following command, replacing `$ENV` with the environment:

    ```shell{promptUser:user}
    terminus drush $SITE.$ENV -- pm-enable search_api_pantheon:^8@beta search_api_pantheon_admin
    ```
    
You might also want to enable the modules from the site’s Extend page located in `/admin/modules`.

## Configure Pantheon Search

### Add Search Index

Enable the Search API Solr Admin module.

Navigate to **Configuration > Search & Metadata > Search API** within Drupal’s Admin interface. The server labeled Pantheon Search should be displayed, and the status should indicate the server has been enabled.

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

1. Click **Index now** on the **View** tab of your index’s Overview page.
1. Click **Search API** to return to the Search API overview page located in `admin/config/search/search-api`. 

Both the server and index you just created should be displayed on the page.

### Post the Schema

1. Click on the server’s name to view the server > select the **View** tab to display the server connection information, schema version, and indices.
1. Select the **Pantheon Search Admin** tab to save and post the schema information. 
1. Enable the **Execute Pantheon Search admin task** permission for users who need access to the **Pantheon Search Admin** tab.
1. Click **Post Solr Schema** to send your custom schema to the Solr 8 server. 
   - The server responds with a `200 - OK` status for each schema file posted.
  
## Troubleshooting Pantheon Search with Solr 8 for Drupal 

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

## Best Practices

* Disable the default search module
  * In Drupal, disabling the core "search" module will help elminiate accidentally basing views on Drupal's default database-driven search.

* Solr server must have the machine name `pantheon_solr8`

* Store rendered output in a single field
  * You always need to make sure to store the rendered output of your content and additional data (such as meta tags) in one single field in the index. This way, it’s a lot easier to search for all the relevant data. It will make your optimizations easier further down the road and it will render your queries a lot smaller & faster.

* Filter HTML code
  * Getting what is indexed as close to plain text as possible will decrease the amount of spurious results in a query.

* Eliminate field label cruft in Drupal
  * Make sure to index this data using as little markup as possible, and get rid of the field labels. You can do this by assigning a specific view mode to each content type.

* Improve relevance with content boosting
  * You can make sure visitors are finding the best content. Apache Solr works with relevance scores to determine where a result should be positioned in relation to all of the other results. In search, boosting a page increases the chance it will show up in a search. For instance: If you're searching for "dinner" you might also want to boost any content with similar tags like "food" and "pizza". Tag-based boosting would increase the relevance scores of tagged items that seem to be related to the query string.

* Do not upgrade indices
  * If you are moving from Solr 3 to Solr 8, delete your index before upgrading as well as .yml files in your config folder. Sorry, it's just too many versions for the upgrade to any way be usable. We've found trying to upgrade the index leads to indices that don't actually store any data and your search results, no matter how many times you re-index will not contain any results. Just delete your index before upgrading. Or if you've already upgraded, delete your index completely and recreate it from scratch. Importing the configs from a .yml file from the old Solr 3 version of this module will end in your calling support and wondering why your index has no search results. Just delete the index, delete the config.yml file and START FROM SCRATCH building an index. Generally speaking, you're more than welcome to ignore our advice if it's working for you, but we've found in our our testing that a solr 3 relies on things that no longer exist in solr 8 and your index will be built on classes that don't exist on the java-based server and, thus, won't retain any data when you try to send a document to index.


