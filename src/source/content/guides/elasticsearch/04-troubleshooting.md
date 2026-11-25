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
reviewed: "2026-11-24"
---

## Troubleshooting

### ElasticPress cannot connect to the host

- Verify that Elasticsearch has been activated in the Pantheon Dashboard or via Terminus.
- Check the ElasticPress Status Report for connection errors and details.
- Use the ElasticPress WP-CLI command `wp elasticpress status` to check connectivity from the command line (`terminus wp <site>.<env> -- elasticpress status`).

### Search results are outdated or missing content

- Run a full index sync from the ElasticPress dashboard or via WP-CLI (`terminus wp <site>.<env> -- elasticpress sync`).
- If you recently published or updated content, allow a moment for the sync to complete before testing.

### Site performance has not improved after enabling Elasticsearch

- Ensure ElasticPress features are actually enabled under **ElasticPress > Features** in WordPress admin.
- Check that `ep_integrate` is not set to `false` on your critical queries.
- Use the ElasticPress Status Report (under **ElasticPress > Status Report**) to verify that queries are being routed to Elasticsearch.

### Instant Results returns "Search template not found"

The Instant Results feature requires a stored search template on ElasticPress.io. This template is separate from your index mappings and synced content.

- **Verify the template exists:** Run `terminus wp <site>.<env> -- elasticpress get-search-template`. If it returns `null`, the template is missing.
- **Push the template:** Run `terminus wp <site>.<env> -- elasticpress put-search-template`, then verify again with `get-search-template`.
- **If `put-search-template` reports success but `get-search-template` still returns `null`:** The **Search** feature ("Post Search & Filter") is likely not active. Instant Results depends on it to generate the template. Enable it first: `terminus wp <site>.<env> -- elasticpress activate-feature search`, then retry `put-search-template`.
- **The template is automatically pushed** at the end of `sync` and `sync --setup`, but only if both the **Instant Results** and **Search** features are active. If the Search feature is inactive, the template body will be empty and the push will silently fail.

### Document sync fails with "pipeline does not exist"

When you sync a file with the Documents feature, you may see an error such as `pipeline with id [...] does not exist`. ElasticPress creates the ingest pipeline once, when you activate the Documents feature. If that request fails, the feature stays active without the pipeline, and every file sync after that fails.

- **Recreate the pipeline:** Turn the feature off and on again, then sync your files. You do not need to reindex your whole site.

  ```bash
  terminus wp <site>.<env> -- elasticpress deactivate-feature documents
  terminus wp <site>.<env> -- elasticpress activate-feature documents
  terminus wp <site>.<env> -- elasticpress sync --post-type=attachment --show-errors
  ```

- **Check whether the pipeline exists:** Get your index name with `elasticpress get-indices`, then run `terminus wp <site>.<env> -- elasticpress request "_ingest/pipeline/<index-name>-attachment" --pretty`. A result of `{}` means the pipeline is missing.
- **Check `wp-config.php`:** Remove any `EP_HOST`, `EP_INDEX_PREFIX`, or `EP_CREDENTIALS` definitions. When Elasticsearch is active, Pantheon defines these before `wp-config.php` loads, so a second definition only logs an "already defined" warning. If Elasticsearch is not active on the environment, your definitions apply. They can point ElasticPress at a different ElasticPress.io subscription that rejects requests. After you remove them, re-enable Elasticsearch by following the [setup steps](/guides/pantheon-search/elasticsearch/setup-config).

### Plugin activation errors

- Ensure you are running a supported version of WordPress and PHP.
- Deactivate other search plugins that may conflict with ElasticPress.

### Query returns "current license is non-compliant"

A query that returns an HTTP 403 with `current license is non-compliant for [feature]` uses an Elasticsearch feature that requires an Enterprise license, such as Reciprocal Rank Fusion (RRF) or the linear retriever.

Pantheon offers Elasticsearch powered by ElasticPress.io on the Basic license tier. There is no Enterprise tier or upgrade path. Use a query that doesn't depend on the Enterprise-only feature, or bring your own Elasticsearch cluster. See [Do I get all the features of ElasticPress?](#do-i-get-all-the-features-of-elasticpress).

## Frequently Asked Questions

### Do I have to pay extra for Elasticsearch?

Access to Elasticsearch is included for sites on Performance plans and above.

Activating Elasticsearch is a self-serve operation, similar to how Solr or Redis are enabled on Pantheon.

<Partial file="pantheon-search-table.md" />

### What plugin do I use?

Use the open-source [ElasticPress](https://wordpress.org/plugins/elasticpress/) plugin from WordPress.org. Pantheon does not require a custom plugin — ElasticPress is the standard WordPress integration for Elasticsearch.

### Can I use Solr and Elasticsearch at the same time?

Yes. Solr can be enabled at the same time as Elasticsearch to support migration. However, it is not recommended to actively use both in production simultaneously.

### Do I get a dedicated Elasticsearch instance?

Pantheon uses shared Elasticsearch clusters.

### Do I get all the features of ElasticPress?

Most ElasticPress features work on Pantheon. Pantheon offers Elasticsearch powered by [ElasticPress.io](https://www.elasticpress.io/), a hosted search service, on the Basic license tier. Features that require an Elasticsearch Enterprise license, such as Reciprocal Rank Fusion (RRF) and the linear retriever, are not available.

Pantheon does not offer an Elasticsearch Enterprise tier or an upgrade path to one. To use Enterprise-only features, you must bring your own Elasticsearch cluster, which requires configuring the ElasticPress plugin to connect to it instead of the Pantheon-provided ElasticPress.io host.

### Does Pantheon support Reciprocal Rank Fusion (RRF) or the linear retriever?

No. Both features require an Elasticsearch Enterprise license, and Pantheon's Elasticsearch service runs on the Basic license tier. Pantheon does not offer an Elasticsearch Enterprise tier or an upgrade path, and there are no plans to add one at this time. If you need these features, bring your own Elasticsearch cluster and configure ElasticPress to use it.

### Can I use ElasticPress AI features?

Yes, you can use ElasticPress AI features with your own API keys. Pantheon does not provide API keys or built-in AI integration at this time.

### Does each environment get its own Elasticsearch endpoint?

Yes. Every environment on your site — Dev, Test, Live, and Multidevs — receives its own Elasticsearch endpoint. This ensures that indexing and searching in one environment does not affect another.

### Can I query the Elasticsearch API directly?

No. Pantheon does not provide direct access to the Elasticsearch endpoint or cluster, and there is no dashboard for browsing indexed documents. Use ElasticPress WP-CLI commands and the ElasticPress Debugging Add-On instead. See [Inspect Your Index](/guides/pantheon-search/elasticsearch/query-optimization#inspect-your-index).

### Where are the Elasticsearch endpoints hosted?

Pantheon's ElasticPress.io clusters are in the US only. Sites that serve traffic from other regions, such as Europe, can see about 50 to 100 ms of additional latency on search requests. Pantheon does not offer a European cluster at this time. Supporting one would require a new cluster and region-based provisioning, and there is no timeline.

If latency is a concern, you can configure the ElasticPress plugin to connect to your own Elasticsearch cluster instead of the Pantheon-provided host.

