---
contenttype: [partial]
categories: [decoupled]
cms: [--]
product: [decoupled]
integration: [--]
tags: [--]
reviewed: ""
---

Surrogate keys enable more flexible purging because cached responses include metadata. Surrogate keys allow you to tag responses with specific identifiers. For example, you can use the Surrogate-Key header to tag content with a key term. You can then selectively purge requests tagged with the key term.

Your CDN is forced to request a new version of your content when you purge cached content. This ensures that visitors to your site see your latest content changes.