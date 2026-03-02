---
title: "PHP JIT compilation support now available"
published_date: "2026-03-02"
categories: [new-feature, infrastructure, action-required]
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

Any value other than `off`, `low`, or `high` will result in a validation error and the commit will be rejected.

## JIT Memory Allocation by Plan

The amount of memory allocated to the JIT buffer (`opcache.jit_buffer_size`) depends on both the selected JIT level and your site's plan tier:

| Plan Tier       | Low JIT Buffer | High JIT Buffer |
| --------------- | -------------- | --------------- |
| Elite           | 32MB           | 128MB           |
| Performance M/L | 32MB           | 128MB           |
| Performance S   | 32MB           | 64MB            |

## Requirements

- **PHP 8.3 or higher**
- **[PHP Runtime Generation 2](/php-runtime-generation-2)**

## Testing and Known Issues

Pantheon supports JIT mode `1205` (tracing JIT), which provides the best balance of performance and stability for web workloads.

<Alert title="Warning" type="danger">

JIT compilation can cause unexpected behavior on some sites, including **white screen errors** and **fatal memory exhaustion** (runtime errors such as `PHP Fatal error: Allowed memory size of X bytes exhausted`). Some third-party plugins, modules, and libraries may not be fully compatible with JIT. You must verify that your site's dependencies are JIT-compatible and thoroughly test in a Dev or Multidev environment before enabling JIT on your Live environment.

</Alert>

## How to Disable JIT

If you encounter issues after enabling JIT, set the value back to `off` or remove the `php_jit` key from your `pantheon.yml` file:

```yaml:title=pantheon.yml
php_jit: off
```

Commit and push the change. JIT will be disabled.
