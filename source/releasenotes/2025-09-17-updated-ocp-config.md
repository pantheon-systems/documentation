---
title: New Object Cache Pro recommended config constant (2.0)
published_date: "2025-09-17"
categories: [wordpress, performance, action-required]
---

For sites using [Object Cache Pro](/object-cache/wordpress), a new recommended config constant, Pantheon OCP Config Version 2.0, is now available.

[View the new config constant here.](/object-cache/wordpress#wp_redis_config-constant)

## Action Required

You may choose to manually replace the `WP_REDIS_CONFIG` constant in your `wp-config-ocp.php` or re-run `terminus install:run <site>.<environment> ocp` to apply the changes.