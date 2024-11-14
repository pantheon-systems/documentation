---
title: Search API Pantheon 8.1.x release
published_date: "2024-11-14"
categories: [drupal, action-required]
---

## Critical fix: Solr core reload functionality

This release addresses a critical issue where Solr cores did not automatically reload after schema updates, leading to schema reversions, search index corruption, and potential site downtime. The update implements automatic core reloading to maintain search index integrity.

### Impact of previous behavior

* Unexpected schema reversions causing search functionality to break
* Search index corruption requiring manual intervention
* Site downtime due to failed search integrations
* Loss of custom schema configurations
* Potential data loss in search indexes

### Key changes
* Automatic core reload after schema updates
* Core reload functionality accessible through both UI and Drush commands
* Enhanced error handling during schema updates
* New Drush command search-api-pantheon:postSchema

### Installation

``` shell
composer require 'drupal/search_api_pantheon:8.1.x-dev@dev'
```

### Schema updates can be performed via:
* Admin dashboard: `/admin/config/search/search-api/server/pantheon_solr8/pantheon-admin/schema`
* Drush: `drush search-api-pantheon:postSchema`

### Known limitations

* The `drush search-api-solr:reload` command does not yet trigger the new reload functionality
* This is a pre-release version while we continue testing and stability improvements

### Recommendations

* Immediate upgrade recommended for sites experiencing schema reversion issues
* Test the update in a non-production environment first
* Monitor search functionality after schema updates
* Report any issues via the issue queue on the [official github repository](https://github.com/pantheon-systems/search_api_pantheon/issues)
