---
title: Solr 9 support for Drupal now available in Beta
published_date: "2026-04-21"
categories: [new-feature, drupal]
---

Pantheon Search now supports [Apache Solr 9.10.0](https://solr.apache.org/docs/9_10_0/) as a Beta for Drupal 10 and 11 sites. This is available through `search_api_pantheon` version **8.5.0-beta1**, which supports both Solr 8 and Solr 9.

## What's new?

* Added Solr 9 support.
* Solr 9 brings improved security defaults, the unified highlighter, and other enhancements. See the [major changes in Solr 9](https://solr.apache.org/guide/solr/latest/upgrade-notes/major-changes-in-solr-9.html) for details.
* Bumped [Search API Solr](https://www.drupal.org/project/search_api_solr) version requirement to 4.3.x.

## Getting started with Solr 9 (Beta)

### Upgrading from Solr 8 to Solr 9

1. **Update the module:**

   ```bash
   composer require 'drupal/search_api_pantheon:^8.5@beta'
   ```

   Commit and deploy the changes to your Pantheon environment.

2. **Update your `pantheon.yml`:**

   ```yaml:title=pantheon.yml
   search:
     version: 9
   ```

   Commit and deploy the changes to your Pantheon environment.

3. **Clear the cache:**

   ```bash
   terminus drush <site>.<env> -- cr
   ```

4. **Post the schema for the new Solr version:**

   ```bash
   terminus drush <site>.<env> -- search-api-pantheon:postSchema
   ```

5. **Clear the index and reindex content:**

   ```bash
   terminus drush <site>.<env> -- search-api:clear
   terminus drush <site>.<env> -- search-api:index
   ```

6. **Test search functionality** thoroughly and report any issues in [the drupal.org issue queue](https://www.drupal.org/project/issues/search_api_pantheon?categories=All).

### New installations

To try the Beta with Solr 9 on a new site, set the Solr version in your `pantheon.yml` and install the module:

```yaml:title=pantheon.yml
search:
  version: 9
```

```bash
composer require 'drupal/search_api_pantheon:^8.5@beta'
```

For detailed setup steps, see the [documentation](https://docs.pantheon.io/guides/pantheon-search/solr-drupal/solr-drupal/#first-time-setup).

## What about Solr 8?

Solr 8 (8.11.4) remains fully supported. Existing Solr 8 sites can update to 8.5.x without any configuration changes.

## Older Drupal versions

[Pantheon Search is no longer supported for **Drupal 8-9.3**](/release-notes/2025/07/drupal-8-93-solr-eol) as of December 2, 2025.  

[Solr 3 is no longer supported by **Drupal 9.4+**](https://docs.pantheon.io/release-notes/2025/08/solr-3-drupal-94-eol) as of December 9, 2025. Those sites must use Solr 8 or above.

## Feedback and documentation

Bug reports, feature requests, and feedback should be posted in [the drupal.org issue queue](https://www.drupal.org/project/issues/search_api_pantheon?categories=All). For detailed installation and upgrade  instructions,[Pantheon Search documentation](/guides/pantheon-search/solr-drupal/solr-drupal).
