---
title: Spider Traps and AI Scraping Bots
description: Information on why bots get into loops indexing content, the impact on sites, and how to mitigate it.
reviewed: "2025-05-28"
tags: [measure, traffic]
contenttype: [doc]
showtoc: true
innav: [true]
categories: [optimize]
cms: [wordpress, drupal]
audience: [development]
product: [--]
integration: [--]
---

With the rapid adoption of AI and Large Language Model (LLM) technologies, websites are increasingly targeted by sophisticated web crawlers designed to gather content for AI training datasets. Unlike conventional bots, these newer crawlers often:

* Disregard `robots.txt` directives.
* Ignore HTML attributes such as `rel="nofollow"` and `noindex`.
* Conceal their activities by mimicking regular browser and OS user agents.
* Originate from numerous, varied IP addresses, complicating traditional blocking techniques.

These advanced crawlers can significantly affect your site’s performance and stability.

## Understanding Spider Traps

A spider trap typically arises on sites utilizing dynamic content features like a search with filters. Each unique combination of search filters generates a distinct URL. Bots traversing these links can inadvertently trigger an exponential crawl, potentially generating hundreds of thousands of variations. This can lead to:

* Increased server load due to the high volume of uncached, resource-intensive requests.
* Performance degradation affecting real users.
* Potential downtime due to overwhelming system resources.

For a broader overview of bots on the platform, including how to identify them in logs and how Pantheon handles indexing, refer to [Bots and Indexing on Pantheon](/bots-and-indexing).

## Strategies for Managing Spider Traps and Unwanted Crawlers

Pantheon recommends several strategies for effectively handling spider traps and problematic AI-driven crawlers:

* **Drupal Solutions:** Utilize dedicated modules like [Facet Bot Blocker](https://www.drupal.org/project/facet_bot_blocker), designed specifically to detect and block excessive crawler activity around faceted searches.
* **Edge Solutions:** Pantheon’s [Advanced Global CDN](/guides/agcdn) customers can set up specific rules to monitor and limit traffic patterns typical of bot activity.
* **External Security Measures:** Employ external Web Application Firewalls (WAF) to detect and manage bot traffic through sophisticated rule sets. For example, Cloudflare users might implement rules to detect and mitigate traffic patterns associated with spider traps.
* **Monitoring and Log Analysis:** Regularly review your [server logs](/guides/logs-pantheon) and [site traffic](/guides/account-mgmt/traffic) to identify abnormal spikes or patterns indicative of bot traffic.
* **Use of Robots.txt and Nofollow Attributes:** For well-behaved bots, such as major search engines (Google, Bing, etc.), ensure you use clear `robots.txt` directives and the `nofollow` attribute on links that should not be indexed. This can effectively reduce unnecessary crawling and indexing by compliant bots.

By adopting these targeted measures, Pantheon administrators can effectively minimize the impact of unwanted crawler traffic, protecting performance and ensuring stability for legitimate users.