---
title: Require HTTPS with the HSTS Header
description: Enforce HTTPS communications on supported browsers using the HTTP Strict Transport Security header.
tags: [security]
---
After you have required HTTPS for all pages by adding the [necessary redirect](/docs/domains/#redirect-to-https-and-the-primary-domain), set the HTTP Strict Transport Security (HSTS) header to standardize all client connections on HTTPS and prevent use of HTTP.

## Configure HSTS Headers
The HTTP Strict-Transport-Security response header (often abbreviated as **HSTS**) is a website security feature that tells browsers to only communicate using HTTPS, instead of HTTP.

Not only does this header help you get an A+ SSL rating from [SSL Labs](https://www.ssllabs.com/ssltest/){.external}, it will help protect your website against protocol downgrade attacks and cookie hijacking.
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


## Configure Attributes
Once you've enabled the module or plugin, you should immediately configure the `strict-transport-security` header attributes as appropriate for your site. There are three attributes to configure for the strict-transport-security header:

<dl>
  <dt>max-age=&lt;expire-time&gt;</dt>
  <dd>The time, in seconds, that the browser should remember that this site is only to be accessed using HTTPS.</dd>
  <dt>includeSubDomains</dt>
  <dd>Optional, but usually advisable. If this optional parameter is specified, this HSTS rule applies to all of your site's subdomains as well.</dd>
  <dt><code>preload</code></dt>
  <dd>Optional, Not part of the specification. A list of domains that get Strict Transport Security enabled automatically, baked into the browser.</dd>
</dl>

How you configure or include these attributes raises the rigor of the security that your HSTS effort provides. As an example, this is the `strict-transport-security` header as used by `whitehouse.gov`:

```http
Strict-Transport-Security: max-age=31536000;includeSubdomains;preload
```

## See Also
For additional details on this header, see:

 - [HTTP Strict Transport Security Cheat Sheet](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security_Cheat_Sheet){.external}
 - [The CIO Council](https://https.cio.gov/hsts/){.external} overview on HSTS.
