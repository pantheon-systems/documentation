---
title: "Traffic"
subtitle: Troubleshooting Traffic Events
description: Determine and address the causes of unexpected traffic.
tags: [traffic, plans]
contributors: [wordsmither]
showtoc: true
permalink: docs/guides/account-mgmt/traffic/remedy
editpath: docs/guides/account-mgmt/traffic/05-remedy.md
reviewed: "2024-03-28"
contenttype: [guide]
innav: [false]
categories: [plans]
cms: [--]
audience: [sysadmin]
product: [--]
integration: [--]
---

This section introduces methods Pantheon offers to help troubleshoot traffic incidents and optimize traffic efficiency.

## Review the NGINX Access Log

To get the most information about your site's traffic, review the `nginx-access.log` with [GoAccess](/guides/logs-pantheon/nginx-access-logs). While it may be a somewhat technical process, it provides the most direct information to help identify potential traffic issues.

## WordPress Best Practices

Consult [WordPress best practices](/guides/wordpress-developer/wordpress-best-practices) for a list of best practices you can implement. Pay particular attention to [avoiding XML-RPC attacks](/guides/wordpress-developer/wordpress-best-practices#avoid-xml-rpc-attacks).

In addition to your other WordPress security practices, take steps to block brute force attacks that attempt to access your `wp-admin` dashboard and hyperinflate traffic to your site:

1. Create a separate administrator account with a strong password, then remove the `admin` account.

1. Use a plugin to [limit login attempts](https://wordpress.org/plugins/search/limit+login+attempts/).

1. Protect yourself from `wp-login.php` attacks:

   <Accordion title="How to Avoid WordPress Login Attacks" id="wp-login-attacks" icon="info-sign">

    Similar to [XML-RPC](#avoid-xml-rpc-attacks), the `wp-login.php` path can be subject to abuse by bots or other spammers. Unlike XML-RPC, which is no longer used often, `wp-login.php` is the primary WordPress login.

    There are a few recommended actions you can take to protect yourself against login abuse.

    ### Change the Admin Account Name

    We strongly recommend that you change your admin account name. Many attacks assume the default name, “admin.”  The easiest way to do this is to create a new user with administrator rights, log in with the new username, then delete the admin user.

    ### Change the wp-login.php Path

    Use a plugin like [WPS Hide Login](https://wordpress.org/plugins/wps-hide-login/) to change the login path from `wp-login.php` to any path you choose, such as `/login` or `/admin`. Then [redirect](/guides/redirect/advanced#redirect-one-path-to-another) all traffic from `wp-login.php` to the homepage or to another page like a `404`.

    ### Enforce Complex Passwords

    WordPress suggests password complexity guidelines when you create a user and password, but it does not enforce password rules. Use a plugin like [Better Passwords](https://wordpress.org/plugins/better-passwords/) to set a minimum password length and alert users if they try to use a password that has been collected in a known data breach.

    ### Disable "Anyone Can Register"

    Some attackers or lost visitors might try to create an account via the login page. To disable this, navigate to the **Settings** tab in WordPress admin and uncheck **Anyone can register** on the **Membership** line.

    ### Add Multi-factor Authentication (MFA)

    Two Factor Authentication (2FA) and Multi-factor Authentication (MFA) are added layers of protection to ensure the security of your accounts beyond just a username and password. Multi-factor refers to the capability to have more than two factors of authentication (for example: password, SMS, and email verification). Use one of the many [Two-Factor Authentication](https://wordpress.org/plugins/tags/two-factor-authentication/) plugins to protect logins to your WordPress site.

    ### Use Single Sign-On (SSO)

    If your workspace makes use of an Identity Provider (IdP) such as Google Workspace, Microsoft AzureAD, or others for [Single Sign-On](/guides/sso/sso-organizations), utilize that as the login authority for your WordPress site.

    Some plugins or services can simplify the SSO integration of your IdP, such as [WP SAML Auth](https://wordpress.org/plugins/wp-saml-auth/) or [MiniOrange](https://plugins.miniorange.com/wordpress).

    SSO often includes or requires [MFA](#add-multi-factor-authentication-mfa) as well.

   </Accordion>

1. Add a [honeypot](https://wordpress.org/plugins/search/honeypot/) plugin to attract and ban bad bots.

1. [Restrict Access to Paths Based on IP](/guides/redirect/advanced#restrict-access-to-paths-based-on-ip).

## Configure favicon.ico to Serve a Static Image

Pantheon does not count static assets against your traffic limit. However, if the CMS cannot find a favicon in the defined path, it will attempt to generate one through PHP on each request. Asset generation requests such as these are counted as traffic. In addition, since Pantheon locks down all directories except the file upload directories (`wp-contents/upload` on WordPress, or `sites/default/files` on Drupal), the CMS can’t save the file back to the path it’s generating.

This issue affects both WordPress and Drupal sites, but the request path will vary between the two platforms. On WordPress, it often appears as a `favicon.ico` file in the root directory. In Drupal it shows up as a system path.  To resolve this issue, add and commit a static `favicon.ico` into the path that is being requested

| CMS       | Path**                      |
|-----------|-----------------------------|
| WordPress | `/favicon.ico`              |
| Drupal    | `/system/files/favicon.ico` |


## WordPress: admin-ajax.php Generates Pages Served

Plugins can utilize an Ajax API to make calls to custom functions and filters in the backend.

There are a number of uses for `admin-ajax.php`, and each instance of high usage should be inspected to determine if it is causing an unexpected number of pages served. Some use cases include:

- Fetching the stored counts for when content is shared on social networks
- Checking if a page or post is currently being worked on (locked)
- Adding media to a post during the editing process, such as when using Gutenberg widgets

Investigate calls to `admin-ajax.php` by looking at what script is calling the path, and what the payload is through browser developer tools. Access developer tools, filter for `admin-ajax`, then refresh the page:

- **Chrome**: Access Developer Tools through the **View** menu, then **Developer**, and **Developer Tools**. Click the **Network** tab, and in **Filter** search for `admin-ajax`
- **Firefox**: Access Web Developer Tools though the **Tools** menu, then **Web Developer**, and **Network**.

In this first image, in the *Initiator* column, we see that these calls are being initiated from `load-scripts.php`. If you click the initiator reference link, you'll see the JavaScript code that is calling it:

![Chrome Developer Tools shows results filtered for admin-ajax.php](../../../../images/browser-dev-tools/devtools-network-admin-ajax.png)

Return to the **Network** tab and click `admin-ajax.php` to see *Headers*. These will include the payload of what was sent to `admin-ajax`, such as the post data and the action or hook to be run in the WordPress backend:

![Chrome Developer Tools shows Headers tab and Form Data](../../../../images/browser-dev-tools/devtools-network-headers-admin-ajax.png)

Click the Preview tab for the response, which is a list of images if available. The following screenshot shows that, for this specific call, the media window widget was opening to populate a list of images that could be added to the body of a post:

![Chrome Developer Tools shows Headers tab and Form Data](../../../../images/browser-dev-tools/devtools-network-preview-admin-ajax.png)

## DoS Attack Mitigation

Pantheon doesn't count [denial-of-service (DoS) attacks](https://en.wikipedia.org/wiki/Denial-of-service_attack) towards site traffic under any circumstances. If you do experience a DoS or DDoS (_distributed_ denial-of-service) attack, our [Customer Success](/guides/support/contact-support/) team is available to assist with identifying a DoS attempt, and take steps to mitigate it for your site.

### Block IPs in Drupal or WordPress

IPs can be blocked with a PHP snippet in `settings.php` or `wp-config.php`, via a Drupal module, or WordPress plugin.

While the CMS will block the listed IPs from accessing the content directly, blocked IPs may still be able to access content served by CDN-level cached responses. If you require CDN-level blocking for your site, check out Pantheon's [Advanced Global CDN](/guides/professional-services/advanced-global-cdn) or consider adding a service like [Cloudflare](/cloudflare#option-2-use-cloudflares-cdn-stacked-on-top-of-pantheons-global-cdn).

#### Use a PHP Snippet to Block IPs

Using a PHP snippet to block IPs offers a key advantage over using a module or plugin: the platform denies the IP before any connections, databases, or most importantly, the CMS are loaded. Additionally, if the site is under an ongoing DoS attack, PHP can be added to the configuration file even while site performance is being affected.

To block an IP, add the following to `settings.php` or `wp-config.php`. Remember to replace the example IP (`192.0.2.38`):

```php:title=wp-config.php%20or%20settings.php
if ($_SERVER['REMOTE_ADDR'] == '192.0.2.38') {
  header('HTTP/1.0 403 Forbidden');
  exit;
}
```

To block an IP range, add the following to `settings.php` or `wp-config.php`. Remember to replace the example IP (`192.0.2.38` and others):

```php:title=wp-config.php%20or%20settings.php
// IPv4: Single IPs and CIDR.
// See https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing
$request_ip_blocklist = [
  '192.0.2.38',
  '192.0.3.125',
  '192.0.67.0/30',
  '192.0.78.0/24',
];

$request_remote_addr = $_SERVER['REMOTE_ADDR'];
// Check if this IP is in blocklist.
if (!$request_ip_forbidden = in_array($request_remote_addr, $request_ip_blocklist)) {
  // Check if this IP is in CIDR block list.
  foreach ($request_ip_blocklist as $_cidr) {
    if (strpos($_cidr, '/') !== FALSE) {
      $_ip = ip2long($request_remote_addr);
      list ($_net, $_mask) = explode('/', $_cidr, 2);
      $_ip_net = ip2long($_net);
      $_ip_mask = ~((1 << (32 - $_mask)) - 1);

      if ($request_ip_forbidden = ($_ip & $_ip_mask) == ($_ip_net & $_ip_mask)) {
        break;
      }
    }
  }
}

if ($request_ip_forbidden) {
  header('HTTP/1.0 403 Forbidden');
  exit;
}
```

#### Use a Drupal Module or WordPress Plugin to Block IPs

<TabList>

<Tab title="Drupal 7" id="d7tab" active={true}>

Navigate to the site's `/admin/config/people/ip-blocking` and enter the IP address to block.

If the site is slow or unavailable, run the MySQL query below, replacing `192.0.2.38` with the IP to block:

```sql
mysql> INSERT INTO blocked_ips (ip) VALUES ('192.0.2.38');
```

</Tab>

<Tab title="Drupal 8 or higher" id="drupal8+">

1. Install the [Drupal ban module](https://www.drupal.org/docs/8/core/modules/ban/overview) (it is not enabled by default).

1. Navigate to the site's `/admin/config/people/ban` and enter the IP address to block: `ban_ip`

</Tab>

<Tab title="WordPress" id="wptab">

You can review a [list of plugins on wordpress.org](https://wordpress.org/plugins/) to find the right plugin for your setup. Consult [WordPress Plugins and Themes with Known Issues](/plugins-known-issues) before you install a new plugin.

</Tab>

</TabList>

### Block User Agents in Drupal or WordPress

Browsers include a self-identifying User-Agent HTTP header (called a user agent (UA) string) with each request they make to the server. Similar to the IP blocking methods listed above, you can also target specific unwanted UAs that you may want to block.

While the CMS will block the listed UAs from accessing the content directly, blocked UAs may still be able to access content served by CDN-level cached responses. If you require CDN-level blocking for your site, check out Pantheon's [Advanced Global CDN](/guides/professional-services/advanced-global-cdn) or consider adding a service like [Cloudflare](/cloudflare#option-2-use-cloudflares-cdn-stacked-on-top-of-pantheons-global-cdn).

To block UAs in Drupal or WordPress, [add the UAs to `robots.txt`](/bots-and-indexing#indexing-your-pantheon-site) or with `stripos`.

The `stripos` function implements a case-insensitive match which can be helpful when dealing with mixed bots or crawlers, such as `Curl/dev` vs `curlBot`.

Remember to replace the example UA (`UglyBot`):

```php:title=wp-config.php%20or%20settings.php
// Block a single bot.
if (strpos($_SERVER['HTTP_USER_AGENT'], 'Bork-bot') !== FALSE) {
  header('HTTP/1.0 403 Forbidden');
  exit;
}

// Or block a list of bots.
$user_agents_deny_list = ['Go-http-client', 'gozilla', 'InstallShield.DigitalWizard', 'GT\:\:WWW'];
foreach ($user_agents_deny_list as $agent) {
  if (strpos($_SERVER['HTTP_USER_AGENT'], $agent) !== FALSE) {
    header('HTTP/1.0 403 Forbidden');
    exit;
  }
}
```

## Block autodiscover.xml Requests

To stop `autodiscover.xml` requests that cause 404 errors, you can configure `pantheon.yml` to block requests to `autodiscover.xml`.

Add the `autodiscover.xml` path to the [`protected_web_paths`](/pantheon-yml#protected-web-paths) directive in `pantheon.yml`. This lets you block requests at NGINX web server and will return a 403 Forbidden client error status response code.


## Advanced Protection and Performance With Advanced Global CDN

[Advanced Global CDN](/guides/agcdn) (AGCDN) is a custom-configured upgrade to [Pantheon Global CDN](/guides/global-cdn), available through [Pantheon Professional Services](https://pantheon.io/professional-services). AGCDN provides an additional layer of protection against DoS attempts. [AGCDN with WAF / IO](/guides/agcdn/agcdn-wafio) provides Web Application Firewall (WAF), Image Optimization (IO), and Rate Limiting.

## FAQs

### How Does Traffic Affect Performance?
Each site is provisioned for optimal performance based on the traffic load it is expected to handle. Storage, domains, application memory, application containers and [many other features](/guides/account-mgmt/plans/faq#plan-resources) are set up to handle the traffic expected in each site type. Depending on the type of traffic your site experiences, or if you expect a heavier load of traffic, you may need to [upgrade your plan](/guides/account-mgmt/plans) so that you can continue to expect a site that runs smoothly.
