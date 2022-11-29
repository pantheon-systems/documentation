---
contenttype: partial
categories: [cache]
newcms: [drupal]
product: [--]
integration: [module]
tags: [--]
reviewed: ""
---

1. Disable the [Redis Object Cache](https://www.drupal.org/project/redis) module.

1. Delete the Redis configuration from `settings.php`.

1. Commit and deploy these changes to the Live environment.

1. Go to <span class="glyphicons glyphicons-cogwheel"></span> **Settings**, select **Add Ons**, then click **Remove** for Redis.

1. Go to the Site Dashboard, and click <span class="glyphicons glyphicons-cleaning"></span> **Clear Caches**.

