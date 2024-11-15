---
title: Version 8.2.0 of Search API Pantheon module released to address performance and Solr core schema issues
published_date: "2024-11-14"
categories: [drupal, action-required]
---

Version 8.2.0 of our Drupal module [Search API Pantheon](https://github.com/pantheon-systems/search_api_pantheon/) has been released to address [performance and schema issues with Solr cores](https://status.pantheon.io/incidents/rv8bw0v6rbjy).

Update to `8.2.0` and check the behavior of your site in a Dev or Multidev environment prior to deploying to Test or Live environments.

## Critical fix: Solr core reload functionality
This release addresses a critical issue where Solr cores did not automatically reload after schema updates, leading to schema reversions, search index corruption, and potential site downtime.
`8.2.0` implements automatic core reloading to maintain search index integrity.

### Key improvements in 8.2.0
* Automatic core reload after schema updates
* Core reload functionality accessible through both UI and Drush commands
* Enhanced error handling during schema updates

### Updating Search API Pantheon via Composer
Depending on the strictness of your Composer constraints you may get `8.2.0` just by running `composer update`. If you do not, you can specify the version with:

``` shell
composer require 'drupal/search_api_pantheon:^8.2'
```

### Schema updates
After installing `8.2.0` of Search API Pantheon, please perform a schema update within a non-live environment via one of the following methods:

* Admin dashboard: `/admin/config/search/search-api/server/pantheon_solr8/pantheon-admin/schema`
* [Terminus and Drush](https://docs.pantheon.io/terminus/commands/remote-drush): `terminus drush <site>.<env> search-api-pantheon:postSchema [solr-server] [path-to-schema]`

After performing the schema update in the non-live environment, check the search functionality to ensure it is working as expected. If it is, deploy the changes Test and Live environments and repeat the schema update there.

Report any issues to [Pantheon Support](https://pantheon.io/support).
