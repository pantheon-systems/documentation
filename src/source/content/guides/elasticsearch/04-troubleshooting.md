---
title: Pantheon Search
subtitle: Elasticsearch Troubleshooting and Frequently Asked Questions
navtitle: Troubleshooting & FAQs
description: Instructions for troubleshooting Elasticsearch issues with the ElasticPress plugin on your Pantheon WordPress site.
contenttype: [guide]
innav: [true]
categories: [search]
cms: [wordpress, drupal]
audience: [development]
product: [search]
integration: [--]
tags: [solr, elasticsearch, search]
contributors: [jazzsequence, carolynshannon]
showtoc: true
permalink: docs/guides/pantheon-search/elasticsearch/troubleshooting
editpath: search/04-troubleshooting.md
reviewed: "2026-02-11"
---

<Partial file="elasticsarch-pre-ga.md" />

## Troubleshooting

### ElasticPress cannot connect to the host

- Verify that Elasticsearch has been activated in the Pantheon Dashboard or via Terminus.
- If you are in the Beta phase, confirm that the EP constants are properly defined in `wp-config.php`.
- Check the ElasticPress Status Report for connection errors and details.
- Use the ElasticPress WP-CLI command `wp elasticpress status` to check connectivity from the command line (`terminus wp <site>.<env> -- elasticpress status`).

### Search results are outdated or missing content

- Run a full index sync from the ElasticPress dashboard or via WP-CLI (`terminus wp <site>.<env> -- elasticpress sync`).
- If you recently published or updated content, allow a moment for the sync to complete before testing.

### Site performance has not improved after enabling Elasticsearch

- Ensure ElasticPress features are actually enabled under **ElasticPress > Features** in WordPress admin.
- Check that `ep_integrate` is not set to `false` on your critical queries.
- Use the ElasticPress Status Report (under **ElasticPress > Status Report**) to verify that queries are being routed to Elasticsearch.

### Plugin activation errors

- Ensure you are running a supported version of WordPress and PHP.
- Deactivate other search plugins that may conflict with ElasticPress.

## Frequently Asked Questions

### Do I have to pay extra for Elasticsearch?

Access to Elasticsearch is included for sites on Performance plans and above. 

During the Alpha and Beta phases, Elasticsearch must be enabled manually by the Pantheon team. If you are interested in testing Elasticsearch on your site during the Alpha or Beta phases, please get in touch via the Elasticsearch Alpha access form.

<!-- This is not true yet>Activating Elasticsearch is a self-serve operation, similar to how Solr or Redis are enabled on Pantheon.<!-->

<Partial file="pantheon-search-table.md" />

### What plugin do I use?

Use the open-source [ElasticPress](https://wordpress.org/plugins/elasticpress/) plugin from WordPress.org. Pantheon does not require a custom plugin — ElasticPress is the standard WordPress integration for Elasticsearch.

### Can I use Solr and Elasticsearch at the same time?

Yes. Solr can be enabled at the same time as Elasticsearch to support migration. However, it is not recommended to actively use both in production simultaneously.

### Do I get a dedicated Elasticsearch instance?

Pantheon uses shared Elasticsearch clusters. For high-value enterprise sites requiring total isolation, dedicated clusters may be provisioned upon request and approval.

### Do I get all the features of ElasticPress?

Yes. All features available in the ElasticPress plugin are supported on Pantheon's Elasticsearch integration, including features that are specific to ElasticPress.io.

### Can I use ElasticPress AI features?

Yes, you can use ElasticPress AI features with your own API keys. Pantheon does not provide API keys or built-in AI integration at this time.

### Does each environment get its own Elasticsearch endpoint?

Yes. Every environment on your site — Dev, Test, Live, and Multidevs — receives its own Elasticsearch endpoint. This ensures that indexing and searching in one environment does not affect another.

