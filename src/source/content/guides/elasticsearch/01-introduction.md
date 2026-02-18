---
title: Pantheon Search
subtitle: Pantheon Search powered by Elasticsearch
navtitle: Introduction
description: Detailed information on using Elasticsearch with your Pantheon WordPress site with ElasticPress.
tags: [elasticsearch,search]
reviewed: "2026-02-10"
contenttype: [doc]
innav: [true]
categories: [search]
cms: [wordpress]
audience: [agency, development]
product: [search]
integration: [--]
permalink: docs/guides/pantheon-search/elasticsearch
editpath: search/01-introduction.md
contributors: [jazzsequence]
showtoc: true
---

Elasticsearch on Pantheon gives WordPress teams a fully managed search service that goes beyond basic site search — offloading database queries, handling traffic spikes, and delivering features like fuzzy matching and autosuggest without the overhead of managing an external provider.

<Partial file="elasticsarch-pre-ga.md" />

## Overview

Pantheon provides integrated Elasticsearch support for WordPress sites through the [ElasticPress](https://wordpress.org/plugins/elasticpress/) plugin. Elasticsearch is a powerful search and query engine that offloads demanding `WP_Query` requests from your database, delivering faster search results, superior search features, and improved overall site performance for your visitors.

By bringing Elasticsearch directly onto the Pantheon platform, you get a fully managed search service without the operational burden of maintaining an external search provider. 

### Which Plans Can Use Elasticsearch?

Elasticsearch is available for WordPress sites on **Performance** and **Elite** site plans. Every environment on your site (Dev, Test, Live, and Multidevs) receives its own Elasticsearch endpoint. Elasticsearch is not available on Sandbox sites.

<Partial file="pantheon-search-table.md" />

### Elasticsearch and Solr

Pantheon also offers [Solr-based search](/solr). You can have both Solr and Elasticsearch activated on a site at the same time, which is useful during migration. However, running both simultaneously in production is not recommended. For new search implementations, Elasticsearch with ElasticPress is the recommended path.

## Known Issues

There are currently a few known issues with the Elasticsearch integration on Pantheon in the Alpha phase. If you find any others, please let the team know in the `#alpha-elasticsearch` channel in the Pantheon Community Slack.

### ElasticPress WP-CLI commands require full URL flag

Currently, when running ElasticPress WP-CLI commands through Terminus, you must include the `--url` flag with your site's URL for the command to work properly. This is due to how ElasticPress detects the host connection and how the Pantheon hostname is read on the platform. For example:

```bash
terminus wp <site>.<env> -- elasticpress sync --url=https://yoursite.com
```

### Elasticsearch instance is not reachable on Pantheon platform domains (`*.pantheonsite.io`)

Currently, if your environment has a Pantheon platform domain (e.g. `<env>-<site>.pantheonsite.io`) and _that is not the domain configured in the Elasticsearch instance_ (during Alpha this is the one that you would have given to the team for the site you are testing on), then requests to the Elasticsearch instance from the site will fail. This is because the Elasticsearch instance is configured to only accept requests from the domain you provided, and the Pantheon platform domain does not match that.

This means that multidev environments are not currently able to connect to the Elasticsearch instance, since they use the Pantheon platform domain, and Dev and Test environments will only work if you have attached a domain to those environments in the Pantheon dashboard (e.g. `dev.yoursite.com`, `test.yoursite.com`).

## Support

During Alpha and Beta, please report any issues or questions to the Pantheon team in the private `#alpha-elasticsearch` channel in the Pantheon Community Slack. To request an invite, [submit this form](https://forms.gle/q5qWS17L9VsH2fkg6).
<!--This is not true yet>For support with Elasticsearch on Pantheon, contact Pantheon Support through the Dashboard. Include details about your site, the environment you're working in, and the specific issue you're encountering.<!-->

For ElasticPress plugin-specific questions, refer to the [ElasticPress documentation](https://www.elasticpress.io/resources/).
