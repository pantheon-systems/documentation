---
title: Environment-Specific Configurations for Drupal 8
description: Manage verbose debugging options and system performance settings per environment on Pantheon using our service configuration files and Drupal 8's configuration override system.
tags: [variables, workflow]
categories: [drupal8]
contributors: [peter-pantheon, rachelwhitton]
---
The following instructions enable Twig debugging and set development-friendly performance options across Pantheon's pre-production environments (Dev & Multidevs). This approach prevents debugging output and potentially harmful performance settings from being deployed to staging and production environments (Test and Live).

## Enable Twig Debugging on Dev & Multidevs
Pantheon handles the inclusion of service configuration files for pre-production and production environments [within our Drupal 8 upstream](https://github.com/pantheon-systems/drops-8/blob/master/sites/default/settings.pantheon.php#L31-L48). The [default file provided](https://github.com/pantheon-systems/drops-8/blob/master/sites/default/default.services.pantheon.preproduction.yml) has everything you need, so enabling Twig debugging is simple:

1. If you haven't done so already, clone the site's codebase using the [Git command string provided on the Site Dashboard](/docs/git/#clone-your-site-codebase) or via [Terminus](/docs/terminus):

 ```bash
 `terminus connection:info <site>.dev --fields='Git Command' --format=string`
 ```

2. Navigate to the site's docroot and rename the existing default service file for pre-production environments:

 ```
 mv sites/default/default.services.pantheon.preproduction.yml sites/default/services.pantheon.preproduction.yml
 ```

3. Stage, commit, and push your changes to Pantheon:

 ```
 git commit -am "Create pre-production service config file and enable Twig debug"
 git push -u origin master
 ```

4. Clear caches on Dev within the Site Dashboard or via [Terminus](/docs/terminus):

 ```
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


For more information on Pantheon's service configuration files for Drupal, refer to [Creating a services.yml File for Drupal 8](/docs/services-yml).


## Enable Cacheability Debugging on Dev & Multidevs
1. Add the [`sites/default/services.pantheon.preproduction.yml`](https://github.com/pantheon-systems/drops-8/blob/master/sites/default/default.services.pantheon.preproduction.yml) file to your project if you have not done so already.

 This service file is used to manage settings across Pantheon's development environments, like Dev and Multidevs. Settings in this file are not applied to production environments, like Test and Live.

2. Enable Drupal 8's [CacheableResponseInterface](https://www.drupal.org/docs/8/api/responses/cacheableresponseinterface#debugging) to help debug cache by setting the `http.response.debug_cacheability_headers` parameter to `true`:

    ```yaml
    parameter:
     http.response.debug_cacheability_headers: true
    ```

3. Stage, commit, and push your changes to Pantheon:

  ```
  git commit -am "Pre-production enable cacheability debug service"
  git push
  ```

4. Verify service setting and debug cache behavior by inspecting response headers on a development environment URL. If enabled, cacheable responses will return `X-Drupal-Cache-Tags` and `X-Drupal-Cache-Contexts` headers such as:

  ```bash
  $ curl -I http://dev-cacheability-headers.pantheonsite.io/ | grep -E 'X-Drupal-Cache-Context|X-Drupal-Cache-Tags'
  X-Drupal-Cache-Contexts: languages:language_interface route theme url.path.parent url.query_args url.site user.node_grants:view user.permissions user.roles:authenticated
  X-Drupal-Cache-Tags: block_view config:block.block.bartik_account_menu config:block.block.bartik_branding config:block.block.bartik_breadcrumbs config:block.block.bartik_content config:block.block.bartik_footer config:block.block.bartik_help config:block.block.bartik_local_actions config:block.block.bartik_local_tasks config:block.block.bartik_main_menu config:block.block.bartik_messages config:block.block.bartik_page_title config:block.block.bartik_powered config:block.block.bartik_search config:block.block.bartik_tools config:block_list config:color.theme.bartik config:search.settings config:system.menu.account config:system.menu.footer config:system.menu.main config:system.menu.tools config:system.site config:user.role.anonymous config:views.view.frontpage http_response node_list rendered
  ```

For more information on Pantheon's service configuration files for Drupal, refer to [Creating a services.yml File for Drupal 8](/docs/services-yml).


### Troubleshoot 503 Response: Header Overflow
Responses with HTTP headers that exceed 10k return 503 Header Overflow errors. If you get this error after enabling cacheability debugging, disable it in the appropriate service file (e.g. `sites/default/services.pantheon.preproduction.yml`):

```yaml
parameter:
  http.response.debug_cacheability_headers: false
```

This issue can be caused by a number of scenarios related to cache tags, such as many fields on a content type causing Drupal to generate really long HTTP headers. For more information on cache tags, see [Cache tags](https://www.drupal.org/docs/8/api/cache-api/cache-tags).

## Override System Performance Settings Per Environment

1. Use the `PANTHEON_ENVIRONMENT` constant and Drupal 8's override system within `settings.php` to enforce performance configurations based on the current Pantheon server environment:

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

2. Stage, commit, and push your changes to Pantheon:

 ```
 git commit -am "Override system performance configurations per env"
 git push
 ```


<ol start="3"><li>Verify overridden configurations for each config.name on the Dev environment within the Drupal UI using the Configuration Manager core module (<code>/admin/config/development/configuration/single/export</code>) or via <a href="/docs/terminus">Terminus</a>:
<pre><code>terminus drush &lt;site&gt;.&lt;env&gt; -- config-get system.performance --include-overidden
terminus drush &lt;site&gt;.&lt;env&gt; -- config-get system.logging --include-overidden
terminus drush &lt;site&gt;.&lt;env&gt; -- config-get views.settings --include-overidden
</code></pre>
<div class="alert alert-info">
<h4 class="info">Note</h4>
<p>Overridden configurations are not shown within Drupal's admin interface; this behavior is intentional. For details, see <a href="https://www.drupal.org/docs/8/api/configuration-api/configuration-override-system">Configuration override system</a>.</p>
</div>
</li></ol>

4. Deploy to Test and verify desired configurations are present. If everything looks good, deploy to Live.


## Inclusions and Loading Order of Settings and Services Files

<table class="table  table-bordered table-responsive">
  <thead>
    <tr>
      <th>Settings File</th>
      <th>Inclusions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>settings.php</td>
      <td>services.yml <a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-title="Requires Manual Creation" data-content="Does not exist within Pantheon's upstream by default but is included if found on all Pantheon environments."><em class="fa fa-info-circle"></em></a><br>settings.pantheon.php<br>settings.local.php <a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-title=".gitignore" data-content="Excluded from version control via .gitignore within Pantheon's Drupal 8 upstream. It is not loaded by default on any Pantheon environment but is included if found on local environments."><em class="fa fa-info-circle"></em></a></td>
    </tr>
    <tr>
      <td>settings.pantheon.php</td>
      <td>services.pantheon.preproduction.yml<a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-title="Requires Manual Creation" data-content="Does not exist within Pantheon's upstream by default but is included if found on Dev and Multidev Pantheon environments."><em class="fa fa-info-circle"></em></a></br>services.pantheon.production.yml<a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-title="Requires Manual Creation" data-content="Does not exist within Pantheon's upstream by default but is included if found on Test and Live Pantheon environments."><em class="fa fa-info-circle"></em></a><br>
    </tr>
    <tr>
      <td>settings.local.php <a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-title=".gitignore" data-content="Excluded from version control via .gitignore within Pantheon's Drupal 8 upstream. It is not loaded by default on any Pantheon environment but is included if found on local environments."><em class="fa fa-info-circle"></em></a></td>
      <td>development.services.yml <a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-title=".gitignore" data-content="Excluded from version control via .gitignore within Pantheon's Drupal 8 upstream. It is not included by default on any Pantheon environment."><em class="fa fa-info-circle"></em></a></td>
    </tr>
  </tbody>
</table>


## See Also

- [Debugging Twig templates](https://www.drupal.org/docs/8/theming/twig/debugging-twig-templates)
- [Debugging compiled Twig templates](https://www.drupal.org/docs/8/theming/twig/debugging-compiled-twig-templates)
- [Locating Template Files with Debugging](https://www.drupal.org/docs/8/theming/twig/locating-template-files-with-debugging)
- [Configuration Override System](https://www.drupal.org/docs/8/api/configuration-api/configuration-override-system)
