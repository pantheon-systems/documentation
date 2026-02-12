---
title: Pantheon Advanced Page Cache 2.3.3 for Drupal now available
published_date: "2025-07-11"
categories: [drupal, modules]
---

The latest update to the [Pantheon Advanced Page Cache](https://www.drupal.org/project/pantheon_advanced_page_cache) Drupal module focuses on improving the functionality of the surrogate key header limit in your local development environment.

## Key Update 

**Surrogate Key Header Limit Adjustment**: To prevent oversized response headers and enhance the ease of work in your local environment, developers now have the ability to override the surrogate key header limit. 

By default, the limit is set to 25,000 bytes. It can be adjusted by adding the following line to your site's `settings.php` file:

```php
$config['pantheon_advanced_page_cache.settings']['surrogate_key_header_limit'] = 1000;
```

Please note that the maximum value for this setting is capped at 25,000 bytes. Adjust the value as needed to suit your local development requirements.