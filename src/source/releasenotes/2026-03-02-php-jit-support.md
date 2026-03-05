---
title: "PHP JIT compilation support now available"
published_date: "2026-03-02"
categories: [new-feature, infrastructure]
---

You can now enable PHP's JIT (Just-In-Time) compiler on Pantheon. JIT compiles PHP bytecode into native machine code at runtime, which can improve performance for CPU-intensive workloads. JIT support is available for sites running **PHP 8.3 or higher** on [PHP Runtime Generation 2](/php-runtime-generation-2).

## Configuration

Add the `php_jit` key to your site's `pantheon.yml` file to control the JIT compilation level:

```yaml:title=pantheon.yml
api_version: 1
php_jit: low
```

The following values are accepted:

| Value  | Description                              |
| ------ | ---------------------------------------- |
| `off`  | JIT is disabled (default)                |
| `low`  | JIT enabled with a smaller memory buffer |
| `high` | JIT enabled with a larger memory buffer  |

A `low` allocation is a good starting point for most sites, offering a performance boost with minimal memory overhead. Choose `high` if your site runs CPU-intensive operations (such as complex calculations, image processing, or heavy data transformations) and would benefit from caching more compiled code in memory.

For full details on memory allocation by plan, requirements, testing considerations, and how to disable JIT, refer to the [PHP JIT guide](/guides/php/php-jit).
