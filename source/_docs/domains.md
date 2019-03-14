---
title: Platform and Custom Domains
description: Work with platform domains or connect custom domains in the Site Dashboard, then redirect requests via PHP to standardize traffic on HTTPS and a primary domain.
tags: [redirects, variables, dns]
categories: []
searchboost: 150
use:
    - docs_tags
---
A domain name is the web address or URL used to visit your site. The Domain Name System (DNS) resolves human-readable names like `www.example.com` into machine-readable IP addresses like 127.0.0.1. All Pantheon sites are accessible via platform domains, and you can easily connect your own custom domain to paid sites.

<div class="enablement">
  <h4 class="info" markdown="1">[Get DevOps Training](https://pantheon.io/agencies/learn-pantheon?docs){.external}</h4>
  <p>Optimize your dev team and streamline internal workflows. Pantheon delivers custom workshops to help development teams master our platform and improve their internal DevOps.</p>
</div>

## Platform Domains
Pantheon issues platform domains for all environments. Each environment (Dev, Test, Live, each Multidev) is accessible via the platform domain, matching the following patterns:

- dev-site-name.pantheonsite.io
- test-site-name.pantheonsite.io
- live-site-name.pantheonsite.io
- multidev-env-site-name.pantheonsite.io

All platform domains are available over HTTPS. Redirecting to HTTPS during development and testing is a good best practice to ensure you are ready to go live with HTTPS. See [Redirect to HTTPS](/docs/redirects/#redirect-to-https) for more information.

### robots.txt
Pantheon serves a default robots.txt that disallows crawlers on platform domains (`/*.pantheonsite.io`, `/*.pantheon.io`, `/*.gotpantheon.com`, and `/*.sites.my-agency.com`). Crawlers are allowed on the Live environment for requests served with a custom domain (e.g., `www.example.com`). If you attempt to access your Live environment with a platform domain, even if you have a domain associated with the environment, the default robots.txt will be served.

Pantheon does not allow crawlers on Dev, Test, or Multidev environments. Adding a custom domain to an environment other than Live will not permit crawlers to that environment.

## Custom Domains
If you don't already own a domain name, register one with a third-party provider. Pantheon is not a domain registrar, but we've created documentation for several popular DNS managers:

<div class="panel panel-drop panel-guide" id="accordion">
  <div class="panel-heading panel-drop-heading">
    <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#host-specific2"><h3 class="info panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-info-sign"></span> DNS Host-Specific Instructions</h3></a>
  </div>
  <div id="host-specific2" class="collapse" style="padding:10px;">
    <ul class="top-docs top-docs-2col docs-2col-panel">
      {% for doc in data.docs_tags.providers %}
        {% if (doc.meta.type != "video") and (doc.meta.type != "guide") and (doc.meta.type != "terminuspage")%}
          <li><a href="{{ doc.url }}">{{ doc.provider }}</a></li>
        {% endif %}
      {% endfor %}
    </ul>
  </div>
</div>

Connect your custom domain on the Site Dashboard, and point DNS at Pantheon to trigger [automated HTTPS provisioning](/docs/https/).

{% include("content/tables/custom-domains-limit.html") %}

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p markdown="1">Add all domains (example.com and www.example.com are different domains!) you want to resolve to Pantheon within the Site Dashboard, for each respective environment, as described in [Launch Essentials](/docs/guides/launch/). Automatic resolution of domains and wildcards are not supported.</p></div>

### Add a Custom Domain

{% include("content/secure-only-tlds.html")%}

1. From your site dashboard, for the environment you want the domain to point to (usually Live), click on the <em class="fa fa-home"></em>**Domains / HTTPS** tab.

2. If no domains have been added yet, click **Connect Live Domain**:

    ![Adding a first domain to the Site Dashboard](/source/docs/assets/images/dashboard/add-first-domain.png)
    
   If one (or more) domains have already been added, click **Connect Domain**:
   
    ![Adding an additional domain to the Site Dashboard](/source/docs/assets/images/dashboard/add-additional-domains.png)

3. Enter the domain you'd like to add in the "Enter domain to connect" field, then click **Connect Domain**:

    ![Adding a domain to the Site Dashboard](/source/docs/assets/images/dashboard/connect-custom-domain.png)

4. After adding your domain, you'll be automatically taken to the domain's "Details" page where you will see both the current DNS records detected (the "Detected Values"), as well as the values to be added at your DNS host ("Required Values"):

    ![Custom domain Details page](/source/docs/assets/images/dashboard/details-page.png)

5. Add the values to your DNS management service. For more details, see [Introduction to Domain Name Services](/docs/dns/).

## Primary Domain
Pantheon uses the term **primary domain** to refer to a single domain used to serve all traffic from a site. For example, configuring `www.example.com` as the primary domain means that requests to `example.com` (or any other domain connected to the environment) all get redirected to `www.example.com`. This assumes that you have added **both** `example.com` and `www.example.com` to the Site Dashboard.

Redirecting all traffic to a primary domain is a best practice for SEO since it avoids duplicate content. It also prevents session strangeness, where a user can be logged in to one domain but logged out of other domains at the same time, and it can make it easier to measure and monitor website traffic.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">Redirects must be managed via PHP, since `.htaccess` is ignored. For details, see [Configure Redirects](/docs/redirects/#php-vs-htaccess).</p>
</div>

### Redirect to HTTPS and the Primary Domain
It's a best practice for SEO and security to standardize all traffic on HTTPS and choose a primary domain. Configure redirects to the primary domain with HTTPS in [`settings.php`](/docs/settings-php/) or [`wp-config.php`](/docs/wp-config-php/):

{% include("redirects.twig")%}

For more redirect scenarios, see [Configure Redirects](/docs/redirects).

## Vanity Domains for Organizations
Pantheon Partners, Strategic Partners, Enterprise accounts, Resellers, and OEM Partners have the ability to provision a custom vanity domain for each environment on every site running on the platform, in addition to the default platform domain (`pantheonsite.io`).

For details, see [Vanity Domains](/docs/vanity-domains/).

## Troubleshooting
### Failed cache clears, search and replace, or Drush and WP-CLI operations
All redirect logic should include the `php_sapi_name() != "cli"` conditional statement to see if WordPress or Drupal is running via the command line. Drush and WP-CLI are used by the platform for operations like cache clearing and search and replace, so it is important to only redirect web requests, otherwise the redirect will kill the PHP process before Drush or WP-CLI is executed, resulting in a silent failure:

```bash
[notice] Command: site.env -- 'drush <command>' [Exit: 1]
[error]
```


### Infinite Redirect Loops
#### HTTP_X_FORWARDED_PROTO
Errors referencing too many redirects may be a result of using the ` $_SERVER['HTTP_X_FORWARDED_PROTO']` variable within redirect logic located in your site's `wp-config.php` or `settings.php` file.

Resolve this error by replacing the offending redirect logic with the [recommended code samples in the above section](#redirect-to-https-and-the-primary-domain) and for your specific use case.

#### Modules and Plugins
Modules and plugins that support managing redirects in the Site Admin interface can produce redirect errors when repeating or conflicting with redirects managed via PHP in your site's configuration file. Some examples include:

WordPress plugins: Redirection, Quick Page/Post Redirect, Safe Redirect Manager, Simple 301 Redirects

Drupal modules: Language (when using URL detection), Securepages, Redirect

When troubleshooting a redirect loop, you may want to deactivate any module or plugin that may be providing its own redirect logic.

### Mixed-mode Browser Warnings
Replace `http://` in the site's database and configure your CMS to assume users are visiting via HTTPS and the site’s primary domain. Templates for example should reference HTTPS in absolute CSS and Javascript sources, even when accessed with HTTP.

{% include("content/cname-workaround.html")%}

### Test Domain Names Before DNS
You can modify your local `hosts` file to validate domain-specific settings before DNS is in place.

{% include("content/hosts-file.html")%}


## See Also
- [Configure Redirects](/docs/redirects)
- [Launch Essentials](/docs/guides/launch/)
- [Relaunch Existing Pantheon Site](/docs/relaunch/)
