---
title: Search API Pantheon 8.4.1 now available
published_date: "2026-03-06"
categories: [action-required, drupal]
---

Pantheon's Solr search Drupal module, `search_api_pantheon`, has been updated with two new releases — [8.4.0](https://www.drupal.org/project/search_api_pantheon/releases/8.4.0) and [8.4.1](https://www.drupal.org/project/search_api_pantheon/releases/8.4.1). These releases include significant architectural improvements and enhanced developer experience.

**We recommend upgrading directly to 8.4.1.**

## What's Changed in 8.4.0

- License updated to GPL-2.0+ to align with Drupal Core standards.
- Major code refactoring resulting in a 60% reduction in code length.
- Simplified service architecture for better maintainability.
- Removed unnecessary overrides for Guzzle, Endpoint, and the Solarium client.
- Improved local development experience. Server connector configuration fields are now editable in local environments and automatically overridden when deployed to Pantheon.
- Drush commands automatically use the first enabled server with the Pantheon connector. The server_id argument is no longer needed or accepted.
  - For more details, see the diagnostic commands section in README.md: https://git.drupalcode.org/project/search_api_pantheon/-/blob/8.4.x/README.md#diagnostic-commands

**Dependency Updates:**
- Removed direct dependencies on guzzlehttp/guzzle, symfony/finder, symfony/yaml, and other packages now provided transitively through search_api_solr (these dependencies are still available but come through search_api_solr instead).
  - **Impact:** No action required unless custom code directly uses these services
- Removed kint-php/kint dependency.

## What's Changed in 8.4.1

- Restored the `search_api_pantheon_admin` submodule (removed in 8.4.0) as an obsolete module to support smooth upgrades from earlier versions.

## Action Required

1. **Back up your database** before proceeding with the upgrade.
2. **Test thoroughly** in a non-production environment before deploying to your live site.

## Pantheon Search Server Migration

Since version 8.3.0, the default server ID is `pantheon_search`. New installations use this automatically. Existing sites upgrading from earlier versions can migrate from `pantheon_solr8` to `pantheon_search` via an update hook.

If you proceed with migration, the update hook will update the server ID from `pantheon_solr8` to `pantheon_search`, reassign all indexes to the new server, and flag content for reindexing.

After running database updates (`drush updb`), reindex your content:

```bash
drush search-api:index
```

**To opt out of migration** and continue using `pantheon_solr8`, add this to your settings.php before running database updates:

```php
$settings['default_search_server'] = 'pantheon_solr8';
```

## Upgrade Instructions

For detailed installation and upgrade instructions, please refer to:
- [README.md](https://git.drupalcode.org/project/search_api_pantheon/-/blob/8.4.x/README.md)
- [CHANGELOG.txt](https://git.drupalcode.org/project/search_api_pantheon/-/blob/8.4.x/CHANGELOG.txt)

## Important: Version Support

**Version 8.4.x is now the only maintained version; support for 8.3.x and 8.2.x has been discontinued.**
