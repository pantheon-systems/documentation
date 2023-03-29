---
title: Drupal + Next.js Frontend Starter for Front-End Sites
subtitle: Purge Surrogate Key-based Cache
description: Learn how to purge surrogate key-based cache.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/drupal-nextjs-frontend-starters/caching
anchorid: caching
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

Cache settings are configured out-of-the-box for you, but there are circumstances in which you might need to make your own configurations, for example, your CMS is not on Pantheon but your frontend is on Pantheon.

## How it Works

You should be familiar with the concept of surrogate key-based caching and
purging. Refer to [Fastly's documentation](https://docs.fastly.com/en/guides/working-with-surrogate-keys) for more information on working with surrogate keys.

The `PantheonDrupalState` class from the `@pantheon-systems/drupal-kit` npm
package includes an adapted fetch method that adds the `Pantheon-SKey` header
to each request sent to Drupal. Responses from Drupal contain the
`Surrogate-Key` header. You can use these keys to instruct your frontend to purge content from a cache when the content in Drupal changes.

### Ensure Headers are Set on Custom Routes

1. Make sure the Drupal backend has the [Pantheon Advanced Page Cache](https://www.drupal.org/project/pantheon_advanced_page_cache) module installed and configured.

1. Create an instance of `PantheonDrupalState` imported from `@pantheon-systems/drupal-kit` in your application.

1. Use the fetch methods available (refer to `drupal-kit` for more information). The `Surrogate-Key` header should be set automatically if Drupal is configured correctly.

1. Pass the `context.res` from `getServerSideProps` into the `PantheonDrupalState` fetch method so that the headers are added to the outgoing response.