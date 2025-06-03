---
title: "PHP 5.3 and 5.5 no longer allowed in pantheon.yml"
published_date: "2025-06-03"
categories: [infrastructure, action-required]
---

Starting today, PHP versions less than 5.6 in `pantheon.yml` will be rejected by the platform on git push.

Earlier this year, PHP versions 5.3 and 5.5 [reached end-of-life on the platform](/release-notes/2025/03/php-eol-53-55). While sites configured to use these PHP versions have already been auto-upgraded to use PHP 5.6, the old values have still been allowed in the [`pantheon.yml`](/pantheon-yml) file.

Applying upstream updates on a site configured with an EoL PHP version may fail too.
The workflow logs will report when that failure is due to the PHP version being rejected.
Sites created with custom upstreams using EoL PHP versions may also see failed workflows.

## Action Required

Customers with sites configured for PHP 5.3 or 5.5 should [upgrade the PHP version](/guides/php/php-versions) in `pantheon.yml` to at least PHP 5.6.

Pantheon [currently recommends](/guides/php#supported-php-versions) at least PHP 8.1 for all production sites.
