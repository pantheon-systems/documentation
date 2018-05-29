---
title: Platform and Custom Domains  
description: Work with platform domains or connect custom domains in the Site Dashboard, then redirect requests via PHP to standardize traffic on HTTPS and a primary domain.
tags: [redirects, variables, dns]
categories: []
searchboost: 150
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

All platform domains are available over HTTPS. Redirecting to HTTPS during development and testing is a good best practice to ensure you are ready to go live with HTTPS.

### robots.txt
Pantheon serves a default robots.txt that disallows crawlers on platform domains (`/*.pantheonsite.io`, `/*.pantheon.io`, `/*.gotpantheon.com`, and `/*.sites.my-agency.com`). Crawlers are allowed on the Live environment for requests served with a custom domain (e.g., `www.example.com`). If you attempt to access your Live environment with a platform domain, even if you have a domain associated with the environment, the default robots.txt will be served.

Pantheon does not allow crawlers on Dev, Test, or Multidev environments. Adding a custom domain to an environment other than Live will not permit crawlers to that environment.

## Custom Domains
If you don't already own a domain name, register one with a third-party provider. Pantheon is not a domain registrar. Connect your custom domain on the Site Dashboard, and point DNS at Pantheon to trigger [automated HTTPS provisioning](/docs/https/).

{% include("content/tables/custom-domains-limit.html") %}

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p markdown="1">Add all domains (example.com and www.example.com are different domains!) you want to resolve to Pantheon within the Site Dashboard, for each respective environment, as described in [Launch Essentials](/docs/guides/launch/). Automatic resolution of domains and wildcards are not supported.</p></div>

### Configure DNS
A custom domain requires specific DNS configurations to handle requests for your Pantheon site. We recommend configuring the following record types wherever you host DNS services for the domain:

- CNAME
- A
- AAAA (2)

Some DNS service providers do not support AAAA records, which are used to map IPv6 addresses. IPv6 offers security benefits and performance gains, especially for mobile users. This is largely because the new protocol is capable of carrying larger packets, resulting in fewer roundtrips per request. We strongly recommend transferring DNS services to a provider that supports IPv6 in order to take advantage of these benefits.

Some DNS service providers require expanded AAAA records. You can retrieve the expanded version for each AAAA record by using the [IPv6 conversion tool](http://ipv6-literal.com/){.external} and copying the "IPv6 longest" result.

For details on what values to use when configuring DNS, refer to [Launch Essentials](/docs/guides/launch/configure-dns/).

#### Nameservers
Pantheon does not host DNS zones or provide nameserver records. Many other platforms and hosting providers offer DNS servers and while it's convenient, it's often inflexible. Providers that offer nameservers usually build other features (like HTTPS) in a way that will only work for customers who use the provided nameservers. This approach is fine until it interferes with more advanced deployments.

<div class="panel panel-drop panel-guide" id="accordion">
  <div class="panel-heading panel-drop-heading">
    <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#nameservers-drop">
      <h3 class="info panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-lightbulb"></span> Learn More</h3>
    </a>
  </div>
  <div id="nameservers-drop" class="collapse" markdown="1" style="padding:10px;">
  Pantheon is built to support advanced website deployment needs, and that means allowing site owners to use the DNS provider of their choice. If Pantheon required specific nameservers, it would interfere with these major use cases (among others):

  * **Large organizations and institutions with Information Technology departments that operate or configure DNS.** If Pantheon required use of particular DNS servers, it would intefere with the ability to use Pantheon for the organization's websites.
  * **Digitally signing DNS records using a system like [DNSSec](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions){.external}.** While it would be technically possible for Pantheon to host records signed offline, it's much easier for interested organizations to operate their own DNS or choose a provider that supports the desired signing methods.
  * **Uncommon record types.** If Pantheon required use of specific nameservers, it's unlikely that all of the desired record types would be available, particularly legacy ones.
  * **Programmatic updates.** Such use cases include domain control validation for obtaining certificates and automated responses to security events. Different DNS services support different update APIs, and it's unlikely Pantheon would ever be able to support them all.

  If your site doesn't have these advanced needs, there are free and inexpensive options outside of Pantheon. We recommend considering your domain registrar's DNS services, [Amazon Route 53](https://aws.amazon.com/route53/){.external}, [Google Cloud DNS](https://cloud.google.com/dns/){.external}, or [Cloudflare](https://woorkup.com/cloudflare-dns/){.external}.
  </div>
</div>

## Primary Domain
Pantheon uses the term **primary domain** to refer to a single domain used to serve all traffic from a site. For example, configuring `www.example.com` as the primary domain means that requests to `example.com` (or any other domain connected to the environment) all get redirected to `www.example.com`.

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
[notice] Command: <site>.<env> -- 'drush <command>' [Exit: 1]
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

### CNAME Record Workaround
If your domain's DNS configuration relies on an existing MX or TXT record that intentionally disallows CNAME records, you'll need to use A and AAAA records to configure DNS for subdomains (e.g., `www.example.com`) instead of CNAMEs.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">Replace `live-example.pantheonsite.io` in the following URLs with the target environment's [platform domain](#platform-domains).</p>
</div>

1. Identify required A record value by querying the target environment's platform domain using a free online tool, such as [https://www.whatsmydns.net/#A/live-example.pantheonsite.io](https://www.whatsmydns.net/#A/live-example.pantheonsite.io){.external}

2. Do the same for the required AAAA values. For example,  [https://www.whatsmydns.net/#AAAA/live-example.pantheonsite.io](https://www.whatsmydns.net/#AAAA/live-example.pantheonsite.io){.external}

3. Log in to your DNS host and create two AAAA records and one A record for the desired subdomain (e.g., `www`) using the values returned in the steps above.

## See Also
- [Configure Redirects](/docs/redirects)
- [Launch Essentials](/docs/guides/launch/)
- [Relaunch Existing Pantheon Site](/docs/relaunch/)
