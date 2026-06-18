---
contenttype: [partial]
categories: [cache]
cms: [drupal]
product: [--]
integration: [module]
tags: [--]
reviewed: ""
---

1. Disable the [Redis](https://www.drupal.org/project/redis) contrib module.

1. Delete the Redis configuration from `settings.php`.

1. Commit and deploy these changes to the Live environment.

1. Go to <Icon icon="gear" /> **Settings**, select **Add Ons**, then click **Remove** for Redis.

1. Go to the Site Dashboard, and click <Icon icon="cleaning" /> **Clear Caches**.
