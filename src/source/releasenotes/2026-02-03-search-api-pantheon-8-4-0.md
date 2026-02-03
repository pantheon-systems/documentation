---
title: Search API Pantheon 8.4.0 is now available
published_date: "2026-02-03"
categories: [action-required, drupal]
---

This is a major cleanup release with significant architectural improvements and enhanced developer experience.

## What's Changed

- License updated from MIT to GNU General Public License v2.0 or later (GPL-2.0+)
- Major code refactoring resulting in a 60% reduction in code length.
- Simplified service architecture for better maintainability.
- Removed unnecessary overrides for Guzzle, Endpoint, and the Solarium client.

**Dependency Updates:**
- Removed direct dependencies on guzzlehttp/guzzle, symfony/finder, symfony/yaml, and other packages now provided transitively through search_api_solr (these dependencies are still available but come through search_api_solr instead).
  - **Impact:** No action required unless custom code directly uses these services
- Removed kint-php/kint dependency.

**Feature Changes:**
- Removed the search_api_pantheon_admin submodule. Its sole functionality (posting the schema) is already provided by the `drush search-api-pantheon:postSchema` command.
- Improved local development experience. Server connector configuration fields are now editable in local environments and automatically overridden when deployed to Pantheon.
- Drush commands automatically use the first enabled server with the Pantheon connector. The server_id argument is no longer needed or accepted.
  - For more details, see the diagnostic commands section in README.md: https://git.drupalcode.org/project/search_api_pantheon/-/blob/8.4.x/README.md#diagnostic-commands

## Action Required Before Upgrading

1. **Back up your database** before proceeding with the upgrade.

2. **Uninstall the search_api_pantheon_admin submodule** (if installed):
   ```bash
   drush pm:uninstall search_api_pantheon_admin
   ```

3. **Test thoroughly** in a non-production environment before deploying to your live site.

##  Pantheon Search Server Migration

Since version 8.3.0, the default server Id is `pantheon_search`. New installations use this automatically. Existing sites upgrading from versions earlier than 8.3.x can migrate from `pantheon_solr8` via an update hook.

If you proceed with migration, the update hook will update the server id from `pantheon_solr8` to `pantheon_search`, reassign all indexes to the new server, and flag content for reindexing.

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
