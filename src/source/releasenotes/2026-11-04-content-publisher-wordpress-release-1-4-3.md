---
title: "Pantheon Content Publisher 1.4.3 for WordPress now available"
published_date: "2026-11-04"
published_at: "2026-11-04T18:52:39Z"
categories: [content-publisher, wordpress, plugins]
description: "Version 1.4.3 of the Pantheon Content Publisher WordPress plugin is now available."
---

Version 1.4.3 of the [Pantheon Content Publisher](https://wordpress.org/plugins/pantheon-content-publisher/) WordPress plugin is now available.

## What's new?

* **Fix** — Stop embedded videos reloading and flickering in the real-time preview on every live update. [#282](https://github.com/pantheon-systems/pantheon-content-publisher-wordpress/pull/282)
* **Fix** — Send no-cache headers on the signed preview redirect and on any URL carrying preview parameters, so CDN and page caches cannot serve an expired preview link. [#283](https://github.com/pantheon-systems/pantheon-content-publisher-wordpress/pull/283)
* **Fix** — Keep every Smart Component (not only Media Embed) on the page in the real-time preview after the first live update. [#284](https://github.com/pantheon-systems/pantheon-content-publisher-wordpress/pull/284)
* **Fix** — Show an error instead of the last-synced post when the real-time preview cannot fetch the document from Content Publisher. [#285](https://github.com/pantheon-systems/pantheon-content-publisher-wordpress/pull/285)

Update to 1.4.3 from the WordPress dashboard under **Plugins > Installed Plugins**, or download it from the [WordPress Plugin Repository](https://wordpress.org/plugins/pantheon-content-publisher/).

For more details, see the [plugin changelog](https://github.com/pantheon-systems/pantheon-content-publisher-wordpress/releases).
