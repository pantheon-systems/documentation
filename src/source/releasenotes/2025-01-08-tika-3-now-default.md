---
title: "Tika 3.x is now the default for new sites"
published_date: "2025-01-08"
categories: [infrastructure, drupal]
---
New sites created on the Pantheon platform now default to Tika 3.x. Previously, new sites defaulted to Tika 1.x.

This change only affects newly created sites. Existing sites will continue to use their current Tika version and are not impacted by this update.

## Overriding the default

If you need to use Tika 1.x for a new site, you can explicitly set the version in your `pantheon.yml` file:

```yaml:title=pantheon.yml
tika_version: 1
```

However, [Tika 1.x will be removed on January 19, 2026](/release-notes/2025/10/tika1x-eol). We recommend testing your site with Tika 3.x and migrating before this date.

## More information

- [Apache Tika on Pantheon](/external-libraries#apache-tika)
- [Tika 3.2 now available](/release-notes/2025/08/tika-3-2-available)
- [Tika 1.x end of life](/release-notes/2025/10/tika1x-eol)
