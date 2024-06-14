---
title: Environment Configuration
subtitle: Environment-Specific Configurations for Drupal
description: Manage verbose debugging options and system performance settings per environment on Pantheon using our service configuration files and Drupal's configuration override system.
tags: [workflow, D8, D9, D10]
contributors: [peter-pantheon, rachelwhitton]
showtoc: true
permalink: docs/guides/environment-configuration/environment-specific-config-drupal
contenttype: [guide]
innav: [false]
categories: [config]
cms: [drupal9]
audience: [development]
product: [--]
integration: [--]
reviewed: "2022-12-13"
---

This section provides information on how to manage verbose debugging options and system performance settings for individual environments.

The following instructions enable Twig debugging and set development-friendly performance options across Pantheon's pre-production environments (Dev & Multidevs). This approach prevents debugging output and potentially harmful performance settings from being deployed to staging and production environments (Test and Live).

## Enable Twig Debugging on Dev & Multidevs
Pantheon handles the inclusion of service configuration files. The [default file provided](https://github.com/pantheon-upstreams/drupal-composer-managed/tree/main/web/sites/default) has everything you need, so enabling Twig debugging is simple:

1. Clone the site's codebase using the [Git command string provided on the Site Dashboard](/guides/git/git-config#clone-your-site-codebase) or via [Terminus](/terminus) if you haven't done so already.

 ```bash{promptUser: user}
 terminus connection:info <site>.dev --fields='Git Command' --format=string
 ```

1. Navigate to the site's docroot and rename the existing default service file for pre-production environments:

 ```bash{promptUser: user}
 mv sites/default/default.services.pantheon.preproduction.yml sites/default/services.pantheon.preproduction.yml
 ```

1. Stage, commit, and push your changes to Pantheon:

 ```bash{promptUser: user}
 git commit -am "Create pre-production service config file and enable Twig debug"
 git push -u origin master
 ```

1. Clear caches on Dev within the Site Dashboard or via [Terminus](/terminus):

 ```bash{promptUser: user}
 terminus env:clear-cache <site>.<env>
 ```

5. Verify configuration by inspecting the page source on the Dev environment's URL. You should see markup similar to the following:

 ```html
 <!-- THEME DEBUG -->
 <!-- THEME HOOK: 'page' -->
 <!-- FILE NAME SUGGESTIONS:
   * page--front.html.twig
   * page--.html.twig
   x page.html.twig
 -->
 <!-- BEGIN OUTPUT from 'core/themes/bartik/templates/page.html.twig' -->
  <div id="page-wrapper">
    <div id="page">
      <header id="header" class="header" role="banner" aria-label="Site header">
        <div class="section layout-container clearfix">
 ```

Refer to [Creating a services.yml File for Drupal](/services-yml) for more information on Pantheon's service configuration files for Drupal.

## Enable Cacheability Debugging on Dev and Multidevs

1. Add the `sites/default/services.pantheon.preproduction.yml` file to your project if you have not done so already.

    - This service file is used to manage settings across Pantheon's development (Dev and Multidev) environments. Settings in this file are not applied to production (Test and Live) environments.

1. Enable Drupal's [CacheableResponseInterface](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Cache%21CacheableResponseInterface.php/function/CacheableResponseInterface%3A%3AaddCacheableDependency/9.0.x) to help debug your cache by setting the `http.response.debug_cacheability_headers` parameter to `true`:

    ```yaml
    parameter:
     http.response.debug_cacheability_headers: true
    ```

1. Stage, commit, and push your changes to Pantheon:

  ```bash{promptUser: user}
  git commit -am "Pre-production enable cacheability debug service"
  git push
  ```

1. Verify service setting and debug cache behavior by inspecting response headers on a development environment URL. If enabled, cacheable responses will return `X-Drupal-Cache-Tags` and `X-Drupal-Cache-Contexts` headers such as:

  ```bash
  $ curl -I http://dev-cacheability-headers.pantheonsite.io/ | grep -E 'X-Drupal-Cache-Context|X-Drupal-Cache-Tags'
  X-Drupal-Cache-Contexts: languages:language_interface route theme url.path.parent url.query_args url.site user.node_grants:view user.permissions user.roles:authenticated
  X-Drupal-Cache-Tags: block_view config:block.block.bartik_account_menu config:block.block.bartik_branding config:block.block.bartik_breadcrumbs config:block.block.bartik_content config:block.block.bartik_footer config:block.block.bartik_help config:block.block.bartik_local_actions config:block.block.bartik_local_tasks config:block.block.bartik_main_menu config:block.block.bartik_messages config:block.block.bartik_page_title config:block.block.bartik_powered config:block.block.bartik_search config:block.block.bartik_tools config:block_list config:color.theme.bartik config:search.settings config:system.menu.account config:system.menu.footer config:system.menu.main config:system.menu.tools config:system.site config:user.role.anonymous config:views.view.frontpage http_response node_list rendered
  ```

Refer to [Creating a services.yml File for Drupal](/services-yml) for more information on Pantheon's service configuration files for Drupal.

### Troubleshoot 503 Response: Header Overflow

Responses with HTTP headers that exceed 10k return 503 Header Overflow errors. If you get this error after enabling cacheability debugging, disable it in the appropriate service file.

```yaml
parameter:
  http.response.debug_cacheability_headers: false
```

This issue can be caused by a number of scenarios related to cache tags, such as many fields on a content type causing Drupal to generate really long HTTP headers. For more information on cache tags, see [Cache tags](https://www.drupal.org/docs/drupal-apis/cache-api/cache-tags).

## Override System Performance Settings Per Environment

1. Use the `PANTHEON_ENVIRONMENT` constant and Drupal's override system within `settings.php` to enforce performance configurations based on the current Pantheon server environment:

  ```php
  if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
  	 switch($_ENV['PANTHEON_ENVIRONMENT']) {
  		case 'live':
  		case 'test':
          $config['system.performance']['cache']['page']['use_internal'] = TRUE;
          $config['system.performance']['css']['preprocess'] = TRUE;
          $config['system.performance']['css']['gzip'] = TRUE;
          $config['system.performance']['js']['preprocess'] = TRUE;
          $config['system.performance']['js']['gzip'] = TRUE;
          $config['system.performance']['response']['gzip'] = TRUE;
          $config['views.settings']['ui']['show']['sql_query']['enabled'] = FALSE;
          $config['views.settings']['ui']['show']['performance_statistics'] = FALSE;
          $config['system.logging']['error_level'] = 'none';
		  break;
  		case 'dev':
        default :
          $config['system.performance']['cache']['page']['use_internal'] = FALSE;
          $config['system.performance']['css']['preprocess'] = FALSE;
          $config['system.performance']['css']['gzip'] = FALSE;
          $config['system.performance']['js']['preprocess'] = FALSE;
          $config['system.performance']['js']['gzip'] = FALSE;
          $config['system.performance']['response']['gzip'] = FALSE;
          $config['views.settings']['ui']['show']['sql_query']['enabled'] = TRUE;
          $config['views.settings']['ui']['show']['performance_statistics'] = TRUE;
          $config['system.logging']['error_level'] = 'all';
          # $settings['cache']['bins']['render'] = 'cache.backend.null';
          # $settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';
		  break;
    	}
  }
  ```

1. Stage, commit, and push your changes to Pantheon:

    ```bash{promptUser: user}
    git commit -am "Override system performance configurations per env"
    git push
    ```

1. Verify overridden configurations for each config.name on the Dev environment within the Drupal UI using the Configuration Manager core module (`/admin/config/development/configuration/single/export`) or via [Terminus](/terminus):

   ```bash{promptUser: user}
   terminus drush <site>.<env> -- config-get system.performance --include-overridden
   terminus drush <site>.<env> -- config-get system.logging --include-overridden
   terminus drush <site>.<env> -- config-get views.settings --include-overridden
   ```

   <Alert title="Note" type="info">

   Overridden configurations are not shown within Drupal's admin interface; this behavior is intentional.

   </Alert>

1. Deploy to Test and verify desired configurations are present. If everything looks good, deploy to Live.

## Rotate `hash_salt` setting

You can use the Terminus `env:rotate-random-seed` [command](/terminus/commands/env-rotate-random-seed) if you need to change the value for the keys and salts. This command invalidates all one-time login links and forces all users to login again.

## Inclusions and Loading Order of Settings and Services Files

| Settings File         | Inclusions |
|:--------------------- |:---------- |
| `settings.php`          | `services.yml` <Popover title="Requires Manual Creation" content="Does not exist within Pantheon's upstream by default but is included if found on all Pantheon environments." /> <br /> `settings.pantheon.php` <br /> `settings.local.php` <Popover title=".gitignore" content="Excluded from version control via .gitignore within Pantheon's Drupal upstream. It is not loaded by default on any Pantheon environment but is included if found on local environments." /> |
| `settings.pantheon.php` | `services.pantheon.preproduction.yml` <Popover title="Requires Manual Creation" content="Does not exist within Pantheon's upstream by default but is included if found on Dev and Multidev Pantheon environments." /> <br /> `services.pantheon.production.yml` <Popover title="Requires Manual Creation" content="Does not exist within Pantheon's upstream by default but is included if found on Test and Live Pantheon environments." /> <br /> |
| `settings.local.php` <Popover title=".gitignore" content="Excluded from version control via .gitignore within Pantheon's Drupal upstream. It is not loaded by default on any Pantheon environment but is included if found on local environments." /> |  `development.services.yml` <Popover title=".gitignore" content="Excluded from version control via .gitignore within Pantheon's Drupal upstream. It is not included by default on any Pantheon environment." /> |


## More Resources

- [Environment-Specific Configuration for WordPress Sites](/guides/environment-configuration/environment-specific-config)

- [Reading Pantheon Environment Configuration](/guides/environment-configuration/read-environment-config)
