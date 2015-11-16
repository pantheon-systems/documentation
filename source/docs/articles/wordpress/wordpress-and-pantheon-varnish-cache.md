---
title: WordPress and Pantheon's Varnish Servers
description: Detailed information on understanding the interactions of WordPress Pantheon's Varnish edge caching servers.
category:
  - developing
  - WordPress
  - cache
  - Varnish
keywords: wordpress, cache, caching, varnish
---
While WordPress Core does come with object caching, it does not include any direct user interface (UI) to control that functionality. On Pantheon, all WordPress sites include a plugin called Pantheon Cache which not only includes a simple UI for administering the site cache, it also has programatic functionality for selectively clearing the Pantheon Varnish caching for individual pages and paths. In this article, we're going to go over some of the details about how these pieces all fit together.

<h4>Pantheon Cache Administration</h4>
In order to access the Pantheon Cache administration, log into your WordPress admin and navigate to /wp-admin/options-general.php?page=pantheon-cache. Once there, you will see the following:

![pantheon wordpress cache admin](/source/docs/assets/images/wp-pantheon-cache-ui.png)

The options are straight forward:

1.) Set the page cache expiration time via the HTML TTL header. The default value is 600 seconds. For no page caching, set this to 0. This is not recommended for Live environments! Pantheon's Varnish servers obey the page TTL header. If it's set to 0, it will not cache the page.
2.) Clear the site cache. Clicking this button clears the Varnish cache for every page and path on the site. This can be useful during development, and should be used with caution on a Live site.

<h4>Programatically Using Pantheon Cache Functions</h4>
Within the pantheon-cache.php file that houses the Pantheon Cache plugin code, there are three functions that can be useful to developers. You can call them from within your own custom code using various WordPress hooks, such as [save_post()](https://codex.wordpress.org/Plugin_API/Action_Reference/save_post). <b>Please note that at this point in time Pantheon does implement [limit on the number of paths](https://github.com/pantheon-systems/WordPress/issues/24) that can be cleared in a single call to 10.</b>

<b>flush_site</b>
Flushes the site cache for the entire site. This achieves the same end result as the "Clear Site Cache" button on the Pantheon Cache administration page.

<code>
/**
	 * Clear the cache for the entire site.
	 *
	 * @return void
	 */
	public function flush_site()
</code>

<b>clean_post_cache</b>
Flushes the cache for an individual post, which is identified by the $post_id. The optional $include_homepage argument can also be passed, but if not the default value is "true".

<code>
  /**
	 * Clear the cache for a post.
	 *
	 * @param  int $post_id A post ID to clean.
	 * @return void
	 */
	public function clean_post_cache( $post_id, $include_homepage = true )
</code>

<b>clean_term_cache</b>
Flushes the cache for an individual term or terms, which are passed in an array, or for a complete Taxonomy, which is passed via a single taxonomy ID.
<code>
  /**
	 * Clear the cache for a given term or terms and taxonomy.
	 *
	 * @param int|array $ids Single or list of Term IDs.
	 * @param string $taxonomy Can be empty and will assume tt_ids, else will use for context.
	 * @return void
	 */
	public function clean_term_cache( $term_ids, $taxonomy )
</code>
