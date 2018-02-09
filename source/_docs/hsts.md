---
title: Require HTTPS with the HSTS Header
description: Enforce HTTPS communications on supported browsers using the HTTP Strict Transport Security header.
tags: [security]
---
After you have required HTTPS for all pages by adding the [necessary redirect](/docs/domains/#redirect-to-https-and-the-primary-domain), set the HTTP Strict Transport Security (HSTS) header to standardize all client connections on HTTPS and prevent use of HTTP.

Not only does this header help you get an A+ SSL rating from [SSL Labs](https://www.ssllabs.com/ssltest/){.external}, it will help protect your website against protocol downgrade attacks and cookie hijacking.

<div class="alert alert-info" role="alert">
  <h4 class="info">Note</h4>
  <p markdown="1">Before adding HSTS to your site, you should review and understand the configuration options that are available. A HSTS header that is configured incompletely or not securely enough diminishes the security protection that HSTS provides.</p>
</div>

## Deploy and Configure a HSTS Header by Module or Plugin
The HTTP Strict-Transport-Security response header (often abbreviated as **HSTS**) is a website security feature that tells browsers to only communicate using HTTPS, instead of HTTP.

<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <!-- Active tab -->
  <li id="tab-1-id" role="presentation" class="active"><a href="#tab-1-anchor" aria-controls="tab-1-anchor" role="tab" data-toggle="tab">WordPress</a></li>
  <!-- 2nd Tab Nav -->
  <li id="tab-2-id" role="presentation"><a href="#tab-2-anchor" aria-controls="tab-2-anchor" role="tab" data-toggle="tab">Drupal 8</a></li>
  <!-- 3rd Tab Nav -->
  <li id="tab-3-id" role="presentation"><a href="#tab-3-anchor" aria-controls="tab-3-anchor" role="tab" data-toggle="tab">Drupal 7</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">

<!-- Active pane content -->
<div role="tabpanel" class="tab-pane active" id="tab-1-anchor" markdown="1">
Install and activate the [LH HSTS](https://wordpress.org/plugins/lh-hsts/){.external} plugin using the WordPress Dashboard (`/wp-admin/plugin-install.php?tab=search&s=lh+hsts`) or with [Terminus](/docs/terminus/):

```bash
terminus remote:wp <site>.<env> -- plugin install lh-hsts --activate
```

Once enabled, the following header will be sent in responses:

```http
Strict-Transport-Security: max-age=15984000; includeSubDomains; preload
```

  <div class="panel panel-drop panel-guide" id="accordion">
  <div class="panel-heading panel-drop-heading">
    <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#unique-anchor">
      <h3 class="info panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-wrench"></span> Troubleshooting</h3>
    </a>
  </div>
  <div id="unique-anchor" class="collapse" markdown="1" style="padding:10px;">
  ### Nested Docroot {.info}

  Site's using our [nested docroot](/docs/nested-docroot/) feature to serve WordPress from a subdirectory will experience a redirect loop upon activation of the LH HSTS plugin:

  ![LH HSTS redirect loop on nested docroot](/source/docs/assets/images/lh-hsts-redirect-loop.png)

  There is an [open issue](https://wordpress.org/support/topic/broken-website-9/){.external} to address the problem with currently no known workaround.

  As an alternative for sites served from a subdirectory, we recommend disabling the LH HSTS plugin and using a custom PHP function <a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-title="Custom PHP Functions" data-content="Best practice would be to write a custom plugin for the following since it is related to the functionality of your site, not it's design or layout. However, you can add the custom function to a Child Theme's function.php file as a quick fix. Keep in mind, managing this functionality within the theme's functions.php file means it will not persist when swapping themes."><em class="fa fa-info-circle"></em></a> to send the HSTS header:

  ```php
  /**
  *
  * Example custom function to add the HSTS header while rendering a response.
  *
  **/
  add_action( 'send_headers', 'add_header_hsts' );
  function add_header_hsts() {
      header('Strict-Transport-Security: max-age=15984000; includeSubDomains; preload');
  }
  ```

  See the [WordPress documentation](https://codex.wordpress.org/Plugin_API/Action_Reference/send_headers){.external} for more details.

  </div>
  </div>

</div>

<!-- 2nd pane content -->
<div role="tabpanel" class="tab-pane" id="tab-2-anchor" markdown="1">
1. Install the [HTTP Strict Transport Security](https://drupal.org/project/hsts){.external} module using the [Drupal interface](https://www.drupal.org/docs/8/extending-drupal-8/installing-modules){.external} or with [Terminus](/docs/terminus/):

    ```bash
    terminus remote:drush <site>.<env> -- pm-enable hsts --yes
    ```

2. Visit the module configuration page (`/admin/config/system/hsts`).
3. Check the **Enable HTTP Strict Transport Security** checkbox, set **Max Age** to at least **1 year** and click **Save Configuration**.

Once installed and configured, the following header will be sent in responses:

```http
strict-transport-security: max-age=31536000
```
</div>

<!-- 3rd pane content -->
<div role="tabpanel" class="tab-pane" id="tab-3-anchor" markdown="1">
1. Install the [HTTP Strict Transport Security](https://drupal.org/project/hsts){.external} module using the [Drupal interface](https://www.drupal.org/docs/7/extending-drupal/installing-modules){.external} or with [Terminus](/docs/terminus):

  ```bash
  terminus remote:drush <site>.<env> -- pm-enable hsts --yes
  ```

2. Visit the module configuration page (`/admin/config/security/hsts`).
3. Check the **Enable HTTP Strict Transport Security** checkbox, set **Max Age** to **15552000** and click **Save Configuration**.

Once installed and configured, the following header will be sent in responses:

```http
strict-transport-security: max-age=15552000
```
</div>

</div>

## HSTS Header Configuration Attributes
Once you've installed the module or plugin you plan to use, you should immediately configure the `strict-transport-security` header attributes as appropriate for your site. There are three attributes you should configure for the `strict-transport-security` header:

<dl>
  <dt>max-age=&lt;expire-time&gt;</dt>
  <dd>The time, in seconds, that the browser should remember that this site is only to be accessed using HTTPS. You might want to set the max-age to as low as 5 minutes or 1 day as you first add and configure the HSTS header so that you can check that your site does not exhibit any unexpected access issues. With a very low max-age you can change the settings quickly until you complete testing. Then you would more optimally set the max-age to 1 year or even two years.</dd>
  <dt>includeSubDomains</dt>
  <dd>Optional, but usually advisable to use this attribute. If this optional parameter is specified, your HSTS header applies to all of your site's subdomains as well. If you do not use the includeSuDomains attribute, your site may still have unintended security issues exposed when users access subdomains of your site.</dd>
  <dt>preload</dt>
  <dd markdown="1">An important to understand, but optional attribute supported by all modern major browsers. Optimally, you should only add the preload attribute after you have tested your site using your HSTS header configured with max-age and includeSubDomains. The preload list is a list of domains baked into browsers that a browser consults before sending a request for a site. If your site is in the preload list, all requests for your site will be sent via HTTPS no matter what the user types into the browser address bar and this will occur even before the browser first ever sees your site's actual HSTS header. [Here is where you add your site to the preload list](https://hstspreload.org/){.external}.</dd>
</dl>

How you configure or include these attributes raises the rigor of the security that your HSTS effort provides. [Here is a great overview of how and why to use the above noted attributes](https://hstspreload.org/){.external}.

Lastly, as an example, this is the strict-transport-security header as it is implemented by the United States `Whitehouse.gov` site (it uses preload, a one-year max-age, and includeSubDomains):

```http
Strict-Transport-Security: max-age=31536000;includeSubdomains;preload
```

## See Also
For additional details on this header, see:

 - [HTTP Strict Transport Security Cheat Sheet](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security_Cheat_Sheet){.external}
 - [The CIO Council](https://https.cio.gov/hsts/){.external} overview on HSTS.
