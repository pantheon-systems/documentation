---
title: New Object Cache Pro recommended config constant (2.0)
published_date: "2025-10-29"
categories: [wordpress, performance, action-required]
---

For sites using [Object Cache Pro](/object-cache/wordpress), a new recommended config constant, Pantheon OCP Config Version 2.0, is now available.

The primary change is setting the analytics persist setting to `false` to reduce Redis errors experienced by sites. This will now clear object caching analytics when the cache is flushed.

[View the new config constant here.](/object-cache/wordpress#wp_redis_config-constant)

## Action Required

You may choose to manually replace the `WP_REDIS_CONFIG` constant in your `wp-config-ocp.php` or re-run `terminus install:run <site>.<environment> ocp` to apply the changes.
