---
title: Setting and Clearing Custom Cache Tags in Drupal 8
description: Learn how to use Views Cache Tags module along with custom code to control Pantheon Advanced Page Cache.
tags: []
categories: []
type: guide
image:
permalink: docs/guides/:basename/
contributors:
  - stevector
  - dwayne
  - davidneedham
---

## Introduction

[Pantheon Advanced Page Cache module](https://www.drupal.org/project/pantheon_advanced_page_cache) is a bridge between [Drupal cache metadata](https://www.drupal.org/docs/8/api/cache-api/cache-api) and the [Pantheon Global CDN](https://pantheon.io/docs/global-cdn/).

Just by turning on this module your Drupal site will start emitting the HTTP headers necessary to make the Pantheon Global CDN aware of data underlying the response. Then, when the underlying data changes (nodes and taxonomy terms are updated, user permissions changed) this module will clear only the relevant pages from the edge cache.

This module has no configuration settings of its own, just enable it and it will pass along information already present in Drupal 8 to the Global CDN.

To take finer grain control of how Drupal is handling it's cache data (in ways that will interact with both the Global CDN and internal Drupal caches) this guide will show you how to use a mix of custom code and [Views Custom Cache Tags](https://www.drupal.org/project/views_custom_cache_tag) to set and clear your own custom tags.

## Setting up a new Drupal site


To follow along with this guide it is best to start use the dev environment of a newly created Drupal 8 site. You could use a pre-existing Drupal 8 site but some of the details would change.

1. To allow for easy copy/pasting, we will set a command line variable for the machine name of the new Drupal 8 site that we are about to make. This name needs to be unique among all Pantheon sites so you will need to pick something other than "cache-tags-demo".

  ```
  export TERMINUS_SITE=cache-tags-demo
  ```

2. Start by making a new Drupal 8 site. This command will create the Pantheon infrastructure for your new site but not install Drupal to the database. That step will come next.

  ```
  terminus site:create $TERMINUS_SITE $TERMINUS_SITE "Drupal 8"
  ```

3. Now we will install Drupal.

  ```
  terminus drush $TERMINUS_SITE.dev -- site-install -y
  ```


4. Performing that step results in a a change to `settings.php`. You could commit this change in the Pantheon Dashboard, but we’ll do that from the command line.

  ```
  terminus env:commit $TERMINUS_SITE.dev --message="Installing Drupal" --force
  ```

5. Now we will add and enable the Pantheon Advanced Page Cache Module which is responsible for sending cache metadata to the Pantheon Global CDN.
  ```
  terminus drush $TERMINUS_SITE.dev -- dl pantheon_advanced_page_cache
  ```

  ```
  terminus drush $TERMINUS_SITE.dev -- en pantheon_advanced_page_cache -y
  ```

6. Let's now commit the code that was just added.

  ```
  terminus env:commit $TERMINUS_SITE.dev --message="Adding Pantheon Advanced Page Cache." --force
  ```

7. Log in to your newly created site. This command will give you a one-time log-in link for the admin user.

  ```
  terminus drush $TERMINUS_SITE.dev -- user-login
  ```

8. Now we will turn on full page caching and then clear caches. We could do that from our Drupal site at `/admin/config/development/performance`.

  ![Drual 8 admin screen for Performance](/source/docs/assets/images/guides/drupal-8-advanced-page-cache/img1-config-dev-performance.png
)

  We could also make those same changes using Drush.

  ```
  terminus drush $TERMINUS_SITE.dev -- cset system.performance cache.page.max_age 600 -y
  ```

  ```
  terminus drush $TERMINUS_SITE.dev -- cr
  ```

## Understanding Pantheon Advanced Page Cache and the HTTP Headers that control caching

Now we are getting to the part where we will actually look at HTTP Headers.

1. Make a new article node complete with at least one taxonomy term in the tag field.

  ![node/add/article](/source/docs/assets/images/guides/drupal-8-advanced-page-cache/img2-node-add-article.png)

2. In an another browser (or a perhaps a [Chrome incognito window](https://support.google.com/chrome/answer/95464)), open the article you just created.  In Chrome, you can right click on the page and click “Inspect” to open the developer tools. From there, click on the "Network" tab to see the HTTP requests that this page made. You will need to refresh the page to see a complete list of network requests.

  The first request in the list is the initial HTML response. All of the subsequent requests for assets like CSS and images happen after this first HTML response kicks things off.

  By clicking on the first request we can see more detailed information like the HTTP headers.  

  ![node/add/article](/source/docs/assets/images/guides/drupal-8-advanced-page-cache/img4-node-1-dev-console.png)

3. That information is also visible on the command line with `curl -I`.

  ```
  curl -I http://dev-$TERMINUS_SITE.pantheonsite.io/node/1
  HTTP/2 200
  date: Thu, 11 Jan 2018 17:05:01 GMT
  cache-control: max-age=600, public
  content-language: en
  content-type: text/html; charset=UTF-8
  etag: W/"1515689631"
  expires: Sun, 19 Nov 1978 05:00:00 GMT
  last-modified: Thu, 11 Jan 2018 16:53:51 GMT
  link: </node/1>; rel="canonical"
  link: </node/1>; rel="shortlink"
  link: </node/1>; rel="revision"
  server: nginx
  surrogate-key-raw: block_view config:block.block.bartik_account_menu config:block.block.bartik_branding config:block.block.bartik_breadcrumbs config:block.block.bartik_content config:block.block.bartik_footer config:block.block.bartik_help config:block.block.bartik_local_actions config:block.block.bartik_local_tasks config:block.block.bartik_main_menu config:block.block.bartik_messages config:block.block.bartik_page_title config:block.block.bartik_powered config:block.block.bartik_search config:block.block.bartik_tools config:block_emit_list config:color.theme.bartik config:search.settings config:system.menu.account config:system.menu.footer config:system.menu.main config:system.menu.tools config:system.site config:user.role.anonymous http_response node:1 node_view rendered taxonomy_term:1 user:0 user:1 user_view
  x-content-type-options: nosniff
  x-drupal-cache: HIT
  x-drupal-dynamic-cache: MISS
  x-frame-options: SAMEORIGIN
  x-generator: Drupal 8 (https://www.drupal.org)
  x-pantheon-styx-hostname: styx-fe3-b-3174343232-r3qrq
  x-styx-req-id: styx-d1a4bdde194dbd2b07eeac64d3ac75bb
  x-ua-compatible: IE=edge
  accept-ranges: bytes
  via: 1.1 varnish
  age: 0
  x-served-by: cache-mdw17331-MDW
  x-cache: MISS
  x-cache-hits: 0
  x-timer: S1515690301.238914,VS0,VE48
  vary: Accept-Encoding, Cookie, Cookie
  x-robots-tag: noindex
  content-length: 10497
  ```

  For the rest of the guide, as we make content changes and inspect the changing HTTP headers, we will just reference `curl -I` output because  in Chrome Developer tools has a lot of additional information that would distract from our purpose. But if you are more comfortable in the browser, you can continue using that incognito window.

  For a walk through of how some of these different headers change caching behavior, see [our Frontend Performance Guide](https://pantheon.io/docs/guides/frontend-performance/)

  The two headers we care about most are `Surrogate-Key-Raw` and `Age`.

  The `Surrogate-Key-Raw` header tell us all of the Drupal elements that comprise the page. Most critically, we see `node:1` and `taxonomy_term:1`. This tells us that this page contained renderings of those two entities.

  The `Age` header tells us the number of seconds that the page has been cached. If you curl again you should see the age number go up.

  ```
  curl -I http://dev-$TERMINUS_SITE.pantheonsite.io/node/1
  surrogate-key-raw: block_view config:block.block.bartik_account_menu config:block.block.bartik_branding config:block.block.bartik_breadcrumbs config:block.block.bartik_content config:block.block.bartik_footer config:block.block.bartik_help config:block.block.bartik_local_actions config:block.block.bartik_local_tasks config:block.block.bartik_main_menu config:block.block.bartik_messages config:block.block.bartik_page_title config:block.block.bartik_powered config:block.block.bartik_search config:block.block.bartik_tools config:block_emit_list config:color.theme.bartik config:search.settings config:system.menu.account config:system.menu.footer config:system.menu.main config:system.menu.tools config:system.site config:user.role.anonymous http_response node:1 node_view rendered taxonomy_term:1 user:0 user:1 user_view
  age: 40
  ```
  From this point on, we will show many more curl commands and their output; but the output will be trimmed to show only the relevant portions.

4. Now let's look at some of the headers on the listing page for the taxonomy term we made (`/taxonomy/term/1`):

   ![Drupal 8 taxonomy screen](/source/docs/assets/images/guides/drupal-8-advanced-page-cache/img5-taxonomy-term-1.png)

   ```
   curl -I http://dev-$TERMINUS_SITE.pantheonsite.io/taxonomy/term/1
   Surrogate-Key-Raw: block_view config:block.block.bartik_account_menu config:block.block.bartik_branding config:block.block.bartik_breadcrumbs config:block.block.bartik_content config:block.block.bartik_footer config:block.block.bartik_help config:block.block.bartik_local_actions config:block.block.bartik_local_tasks config:block.block.bartik_main_menu config:block.block.bartik_messages config:block.block.bartik_page_title config:block.block.bartik_powered config:block.block.bartik_search config:block.block.bartik_tools config:block_emit_list config:color.theme.bartik config:search.settings config:system.menu.account config:system.menu.footer config:system.menu.main config:system.menu.tools config:system.site config:user.role.anonymous config:views.view.taxonomy_term http_response node:1 node_emit_list node_view rendered taxonomy_term:1 taxonomy_term_view user:1 user_view
   Age: 0
   ```

  Again we see `node:1` and `taxonomy_term:1` and because this is the first time we have requested the listing page from curl, we see an age of 0, meaning the response wasn't cached.

5. Curl again and the age will go up.

  ```
  curl -I http://dev-$TERMINUS_SITE.pantheonsite.io/taxonomy/term/1
  age: 15
  ```

6. Let's now make a page node (`/node/add/page`).

   ![Drupal 8 node add page](/source/docs/assets/images/guides/drupal-8-advanced-page-cache/img6-node-add-page-2.png)

7. And look at its headers.

  ```
  curl -I http://dev-$TERMINUS_SITE.pantheonsite.io/node/2
  surrogate-key-raw: block_view config:block.block.bartik_account_menu config:block.block.bartik_branding config:block.block.bartik_breadcrumbs config:block.block.bartik_content config:block.block.bartik_footer config:block.block.bartik_help config:block.block.bartik_local_actions config:block.block.bartik_local_tasks config:block.block.bartik_main_menu config:block.block.bartik_messages config:block.block.bartik_page_title config:block.block.bartik_powered config:block.block.bartik_search config:block.block.bartik_tools config:block_emit_list config:color.theme.bartik config:search.settings config:system.menu.account config:system.menu.footer config:system.menu.main config:system.menu.tools config:system.site config:user.role.anonymous http_response node:2 node_view rendered user:0 user:1
  age: 0
  ```

8. The age will go up if you curl again.

  ```
  curl -I http://dev-$TERMINUS_SITE.pantheonsite.io/node/2
  age: 18
  ```

9. Now what if our article node, Node 1, were saved again? What caching behavior do we want across these three pages: `/node/1`, `/node/2`, and `/taxonomy/term/1`? Load up the edit screen but don't save yet (`node/1/edit`).

  ![Node edit form](/source/docs/assets/images/guides/drupal-8-advanced-page-cache/img7-node-edit-admin.png)

10. Check the age on our three pages.

  ```
  curl -I http://dev-$TERMINUS_SITE.pantheonsite.io/node/1
  age: 267
  ```

  ```
  curl -I http://dev-$TERMINUS_SITE.pantheonsite.io/taxonomy/term/1
  age: 256
  ```

  ```
  curl -I http://dev-$TERMINUS_SITE.pantheonsite.io/node/2
  age: 165
  ```

11. Now click the button to save node 1 in your browser. And then curl those three pages again.

  ```
  curl -I http://dev-$TERMINUS_SITE.pantheonsite.io/node/1
  age: 0
  ```

  ```
  curl -I http://dev-$TERMINUS_SITE.pantheonsite.io/taxonomy/term/1
  age: 0
  ```

  ```
  curl -I http://dev-$TERMINUS_SITE.pantheonsite.io/node/2
  age: 246
  ```

  The pages that contained a rendering of Node 1 were cleared. Node 2's page was not.

## Limitations of out of the box behavior

What if we added a new node that used taxonomy term 1? We would want the listing page for term 1 to be cleared. But is it?

1. Try adding a new article and use the same taxonomy term.

  ![Node add form](/source/docs/assets/images/guides/drupal-8-advanced-page-cache/img8-node-add-article.png)

2. And curl the taxonomy listing page.

  ```
  curl -I http://dev-$TERMINUS_SITE.pantheonsite.io/taxonomy/term/1
  Age: 60
  ```

  Our taxonomy listing was not cleared. In order to clear the taxonomy term when a new node is added that uses that term, we will need to write a little bit of custom code.

## Clearing an existing cache tag with custom code

In this section we are going to add a custom module that uses a hook to clear the cache tag for all taxonomy terms.


1. To start, let's connect to our Dev environment via [SFTP](https://pantheon.io/docs/sftp/).

2. Open `code/modules` and create a new directory called `custom_cache_tags`. Open that folder.

  ![SFTP Client](/source/docs/assets/images/guides/drupal-8-advanced-page-cache/img9-sftp-client.png)

3. Create a new file named `custom_cache_tags.info.yml` and add the following:

  ```
  name: Custom Cache Tags
  type: module
  description: 'Customized cache tag clearing'
  core: 8.x
  ```

4. Create a new file named `custom_cache_tags.module` and add the following:

  ```
  <?php
  /**
  * @file
  * Contains custom_cache_tags.module.
  */

  use Drupal\Core\Cache\Cache;
  use Drupal\node\NodeInterface;

  /**
  * Implements hook_node_insert().
  */
  function custom_cache_tags_node_insert(NodeInterface $node) {
    custom_cache_tags_invalidate_all_terms_referenced_by_node($node);
  }

  /**
   * Invalidate the cache for all taxonomy terms referenced by a node.
   *
   *
   */
  function custom_cache_tags_invalidate_all_terms_referenced_by_node(NodeInterface $node) {

    // This code is copied and adapted from taxonomy_build_node_index().
    // Only act upon published nodes where this revision is the default
    // Because only such nodes would appear in the taxonomy listing.
    if ($node->isPublished() && $node->isDefaultRevision()) {
      // Collect a unique list of all the term IDs from all node fields.
      $tid_all = [];
      $entity_reference_class = 'Drupal\Core\Field\Plugin\Field\FieldType\EntityReferenceItem';
      foreach ($node->getFieldDefinitions() as $field) {
        $field_name = $field->getName();
        $class = $field->getItemDefinition()->getClass();
        $is_entity_reference_class = ($class === $entity_reference_class) || is_subclass_of($class, $entity_reference_class);
        if ($is_entity_reference_class && $field->getSetting('target_type') == 'taxonomy_term') {
          foreach ($node->getTranslationLanguages() as $language) {
            foreach ($node->getTranslation($language->getId())->$field_name as $item) {
              if (!$item->isEmpty()) {
                $tid_all[$item->target_id] = $item->target_id;
              }
            }
          }
        }
      }
      // Insert index entries for all the node's terms.
      if (!empty($tid_all)) {
        foreach ($tid_all as $tid) {
          $cache_tag = 'taxonomy_term:' . $tid;
          Cache::invalidateTags(array($cache_tag));
        }
      }
    }
  }
  ```

  This code clears all references to every taxonomy term referenced by a new published node.

5. Enable our new custom module and commit your code. Lastly, clear all caches so that the new hook you added is detected by Drupal.

  ```
  terminus drush $TERMINUS_SITE.dev -- en custom_cache_tags -y
  ```

  ```
  terminus env:commit $TERMINUS_SITE.dev --message="Add custom_cache_tags" --force
  ```

  ```
  terminus drush $TERMINUS_SITE.dev -- cr
  ```

6. Now whenever we add content, the referenced taxonomy term pages are automatically cleared. To test, let's check on the age of our taxonomy listing again by curling a few times.

  ```
  curl -I http://dev-$TERMINUS_SITE.pantheonsite.io/taxonomy/term/1
  Age: 0
  ```

  ```
  curl -I http://dev-$TERMINUS_SITE.pantheonsite.io/taxonomy/term/1
  Age: 5
  ```

7. Once we add another article that references term 1, that age should reset to zero. Make the new article node and use the same taxonomy term.

  ![Node add form](/source/docs/assets/images/guides/drupal-8-advanced-page-cache/img10-node-add-article2.png)

8. And curl again.

  ```
  curl -I http://dev-$TERMINUS_SITE.pantheonsite.io/taxonomy/term/1
  Age: 0
  ```

  The age of 0 tells us that adding the new node cleared the cache.

## Setting a custom cache tag with Views Custom Cache Tags module.

The code we added clears all references to each taxonomy term every time a node is added that references the term. Clearing caches that broadly might be too aggressive if we are just concerned about listings of our taxonomy term. We can be more targeted in our clearing by adding a module that will set a more specific tag.

1. Let’s start by downloading and enabling the [Views Custom Cache Tags](https://www.drupal.org/project/views_custom_cache_tag) module.

  ```
  terminus drush $TERMINUS_SITE.dev -- dl views_custom_cache_tag
  ```

  ```
  terminus drush $TERMINUS_SITE.dev -- en views_custom_cache_tag -y
  ```

2. Commit your code changes.

  ```
  terminus env:commit $TERMINUS_SITE.dev --message="adding views_custom_cache_tag"  --force
  ```

3. Edit the View that controls taxonomy terms (`admin/structure/views/view/taxonomy_term`) and change the cache settings from "Tag based" to “Custom Tag based". You may have to expand the Advanced column.

  ![Views edit screen](/source/docs/assets/images/guides/drupal-8-advanced-page-cache/img11-view-taxonomy-term.png)

4. For the custom tag, use `{% verbatim %}taxonomy-listing:{{ raw_arguments.tid }}{% endverbatim %}`. Save the View.

 ![Views caching config form](/source/docs/assets/images/guides/drupal-8-advanced-page-cache/img12-page-caching-option.png)

5. Now, to see the change, we may need to clear all caches.

  ```
  terminus drush $TERMINUS_SITE.dev -- cr
  ```

6. And curl the listing page a few times again.

  ```
  curl -I http://dev-$TERMINUS_SITE.pantheonsite.io/taxonomy/term/1
  Surrogate-Key-Raw: block_view config:block.block.bartik_account_menu config:block.block.bartik_branding config:block.block.bartik_breadcrumbs config:block.block.bartik_content config:block.block.bartik_footer config:block.block.bartik_help config:block.block.bartik_local_actions config:block.block.bartik_local_tasks config:block.block.bartik_main_menu config:block.block.bartik_messages config:block.block.bartik_page_title config:block.block.bartik_powered config:block.block.bartik_search config:block.block.bartik_tools config:block_emit_list config:color.theme.bartik config:search.settings config:system.menu.account config:system.menu.footer config:system.menu.main config:system.menu.tools config:system.site config:user.role.anonymous config:views.view.taxonomy_term http_response node:1 node:3 node:4 node:5 node:6 node_view rendered taxonomy-listing:1 taxonomy_term:1 taxonomy_term_view user:1 user_view
  Age: 8
  ```
7. Finally, let's alter our custom written code so that our new tag, `taxonomy-listing:1` gets cleared when a new node is added that references term 1. Change the code in `custom_cache_tags.module` from

  ```
  $cache_tag = 'taxonomy_term:' . $tid;
  ```

  to

  ```
  $cache_tag = 'taxonomy-listing:' . $tid;
  ```

8. Again check that adding a new article clears your taxonomy listing page.

  ![Node add form](/source/docs/assets/images/guides/drupal-8-advanced-page-cache/img13-node-add-article-3.png)
  ```
  curl -I http://dev-$TERMINUS_SITE.pantheonsite.io/taxonomy/term/1
  Age: 0
  ```

## Additional Resources.

Where you set and clear tags will vary greatly based on the needs of your site.
See the [Drupal.org documentation for how you can set cache metadata directly on render arrays](https://www.drupal.org/docs/8/api/render-api/cacheability-of-render-arrays). You can also read this blog post from Aaron Wolfe of Capellic on [Pantheon Advanced Page Cache in Drupal 7](https://capellic.com/2017/11/28/using-pantheon-advanced-page-cache-in-drupal-7/).
