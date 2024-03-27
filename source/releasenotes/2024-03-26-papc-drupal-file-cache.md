---
title: Pantheon Advanced Page Cache Drupal File Caching Improvements
published_date: "2024-03-26"
categories: [new-feature, drupal, tools-apis, modules]
---
The [Pantheon Advanced Page Cache Module](https://www.drupal.org/project/pantheon_advanced_page_cache) has received an update in the 2.2.0 release which resolves [Issue #3337669](https://www.drupal.org/project/pantheon_advanced_page_cache/issues/3337669) and provides some additional enhancements. Now, when any file is updated inside the Drupal File system, that file will have its edge cache cleared immediately and new content will be shown.

Some Technical Details:

- The cache clearing is specifically triggered by any action which invokes the [update file hook](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Entity%21entity.api.php/function/hook_entity_update/10). 

- If the file is an image, all image styles will also have their edge cache entry cleared.
