---
contenttype: [partial]
categories: [cache]
cms: [wordpress]
product: [--]
integration: [plugins]
tags: [--]
draft: true
reviewed: ""
---

1. Uninstall the [WP Redis](https://wordpress.org/plugins/wp-redis/) or Object Cache Pro plugin. 

1. Delete the `wp-content/object-cache.php` file.

1. Commit and deploy these changes to the Live environment.

1. Go to <span class="glyphicons glyphicons-cogwheel"></span> **Settings**, select **Add Ons**, then click the **Remove** button for Redis.

1. Go to the Site Dashboard, and click <span class="glyphicons glyphicons-cleaning"></span> **Clear Caches**.

