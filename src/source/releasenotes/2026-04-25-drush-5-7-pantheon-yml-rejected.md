---
title: "Drush 5 and 7 are no longer accepted in pantheon.yml"
published_date: "2026-04-25"
categories: [action-required, infrastructure, drupal, security]
---

As noted in our [June 2025 release notes](/release-notes/2025/06/drush-5-7-eol), Drush 5 and 7 are no longer available on Pantheon, and `pantheon.yml` files retaining these retired values would eventually cause a `git push` to be rejected. That enforcement is now in effect.

Pantheon now rejects `git push` when `drush_version` is set to `5` or `7` in [`pantheon.yml`](/pantheon-yml). The supported values are `8`, `9`, and `10`.

Validation runs whenever `pantheon.yml` changes are detected on push, including reverts. Sites with `drush_version: 5` or `7` already committed are unaffected until the file is modified. A `git revert` or `git reset` that touches `pantheon.yml` will also trigger validation and be rejected if the retired values are present.

## Action required

Customers with sites configured for Drush 5 or 7 should [upgrade the Drush version](/guides/drush) in `pantheon.yml` to at least Drush 8:

```yaml
drush_version: 8
```

Sites created with custom upstreams using these versions may also encounter errors on upstream updates if `drush_version` is still set to `5` or `7`.
