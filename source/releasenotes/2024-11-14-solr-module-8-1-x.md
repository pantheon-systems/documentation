---
title: Fix to Solr cores incident being tested in Search API Pantheon 8.1.x
published_date: "2024-11-14"
categories: [drupal, action-required]
---


The [development branch](https://github.com/pantheon-systems/search_api_pantheon/tree/8.1.x) of our Drupal module [Search API Pantheon](https://github.com/pantheon-systems/search_api_pantheon/) now contains a likely fix for an [ongoing performance and schema issue with Solr cores](https://status.pantheon.io/incidents/rv8bw0v6rbjy).
We are actively testing this fix.
We will release the next version of the module when we are confident is will resolve most or all issues customers are experiencing.
Teams who have experience Solr core reversions should try the dev branch of Search API Pantheon in a Multidev (or Dev) environment to confirm the fix by following the instructions below.

## Critical fix: Solr core reload functionality

This release addresses a critical issue where Solr cores did not automatically reload after schema updates, leading to schema reversions, search index corruption, and potential site downtime. The update implements automatic core reloading to maintain search index integrity.

### Key fixes already in development branch
* Automatic core reload after schema updates
* Core reload functionality accessible through both UI and Drush commands
* Enhanced error handling during schema updates
* New Drush command search-api-pantheon:postSchema

### Remaining work prior to formally tagg the next release of Search API Pantheon
* Confirm with a larger set of customers that these updates resolves their issues
* Get the pre-existing `drush search-api-solr:reload` command to trigger the new reload functionality

### Installation of development branch

You can switch from the stable release currently (`8.1.10`) to the development branch by running the following command:

``` shell
composer require 'drupal/search_api_pantheon:8.1.x-dev@dev'
```

### Schema updates can be performed via:

After installing the development branch of Search API Pantheon, please perform a schema update to test the automatic core reload functionality within a non-live environment.

Do so via:

* Admin dashboard: `/admin/config/search/search-api/server/pantheon_solr8/pantheon-admin/schema`
* Drush: `drush search-api-pantheon:postSchema`

After performing the schema update, monitor the search functionality to ensure that the core reloads automatically and that the search index remains intact.

Report any issues via the issue queue on the module's [GitHub repository](https://github.com/pantheon-systems/search_api_pantheon/issues)

### Additional follow-up

After these fixes are confirmed in the development branch and `8.1.11` is released, you should you can switch back to the stable releases in Composer by running the following command:

``` shell
composer require 'drupal/search_api_pantheon:^8.1'
```
