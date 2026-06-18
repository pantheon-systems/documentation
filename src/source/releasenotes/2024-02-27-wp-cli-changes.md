---
title: WP-CLI Pantheon wrapper changes
published_date: "2024-02-27"
categories: [wordpress,action-required]
---

We've recently modified the Pantheon wrapper around the WP-CLI executable to solve a number of interrelated issues that customers may have previously been experiencing and/or using workarounds to solve. We recommend reviewing your site's logs and resolve any PHP notices or warnings.

<h3>Problem</h3>

* Our WP-CLI wrapper included a hard-coded `--url` flag for all `wp` commands run on the platform (via Terminus, e.g. `terminus remote:wp` or `terminus wp`, or internal workflows that relied on WP-CLI like flushing cache or viewing the Status page in the dashboard).
* For WordPress Multisites, the hard-coded `--url` flag pointed to the Pantheon platform domain (`*.pantheonsite.io`) instead of the actual domain of the site resulting in errors and the command failing unless executed manually (via Terminus with the correct `--url` flag attached).

<h3>Solution</h3>

* We have implemented a solution that checks if a site is a WordPress Multisite. If so, we remove the hard-coded `--url` flag, allowing WP-CLI to operate normally.
* This change does not affect workflows that are properly passing the `--url` flag to WP-CLI commands via terminus (e.g. `terminus wp <site>.<env> -- plugin list --url=<url>`). Any WP-CLI flags passed after the `--` in the `terminus wp` command will be passed through to and interpreted by WP-CLI.
* This change means that many sites that were previously unable to view their full Status page will now be able to do so, and flushing site cache via the button in the Pantheon dashboard on sites that previously were unable to or had errors in doing so should now work as expected. Any other workflows or processes that relied on WP-CLI will also benefit from this change.

<h3>Recommended action</h3>
This change may also expose PHP notices and warnings that were previously being hidden due to WP-CLI failing commands. We recommend reviewing your site's logs and working to resolve any PHP notices or warnings that you see.
