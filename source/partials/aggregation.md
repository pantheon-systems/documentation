---
contenttype: [partial]
categories: [cache]
newcms: [drupal]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

Pantheon uses HTTP/2 which allows files to download in parallel. This can *potentially* make aggregation unnecessary for your site. Aggregation depends on several factors, including:

- File sizes
- Number of files
- End users' browsers

We recommend that you keep aggregation enabled if you aren't familiar with how aggregation factors apply to your site. 
