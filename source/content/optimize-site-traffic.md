---
title: Investigate and Remedy Traffic Events
description: Determine the cause of unexpected traffic and implement a remedy
tags: [billing, logs]
categories: [manage]
contributors: [edwardangert]
searchboost: 150
reviewed: "2020-03-03"
---

The [Traffic Limits and Overages](/traffic-limits) doc explains what Pantheon considers billable traffic as shown in the [Dashboard Metrics](/metrics). This doc introduces some of the methods Pantheon offers to help determine the cause of traffic incidents, to find out if they're intentional, and to help remedy them if they're not.

## Review the nginx Access Log

To get the most information about your site's traffic, review the `nginx-access.log` with [GoAccess](/nginx-access-log). While it may be a somewhat technical process, it provides the most direct information to help identify potential traffic issues.

## WordPress Best Practices

Consult our doc for a list of [WordPress best practices](/wordpress-best-practices), and how to [avoid XML-RPC attacks](/wordpress-best-practices#avoid-xml-rpc-attacks) in particular.

In addition to your other WordPress security practices, help thwart brute force attacks that attempt to access your `wp-admin` dashboard and hyperinflate traffic to your site in the process. Create a separate administrator account with a strong password, then remove the `admin` account, and use a plugin to [limit login attempts](https://wordpress.org/plugins/search/limit+login+attempts/).

## Configure favicon.ico to Serve a Static Image

The CMS tries to serve the favicon file, but if it can’t find one in the defined path, it will attempt to generate one through PHP. While Pantheon does not count static assets against your traffic limit, generating an asset on each request the way favicon is in this case, does. In addition, since Pantheon locks down all directories except the file upload directories (`wp-contents/upload` on WordPress, or `sites/default/files` on Drupal), the CMS can’t save the file back to the path it’s generating.

This issue affects both WordPress and Drupal sites, but the request path will vary between the two platforms. On WordPress, it often appears as a `favicon.ico` file in the root directory. In Drupal (specifically Drupal 8), it shows up as a system path.

|  **CMS**  |           **Path**          |
|:---------:|:---------------------------:|
| WordPress | `/favicon.ico`              |
| Drupal    | `/system/files/favicon.ico` |

**Solution**: Add and commit a static `favicon.ico` into the path that is being requested. Usually the culprit is adding a custom favicon through the active theme for the site through some kind of upload form, and then the icon is deleted or unavailable, which causes the CMS to look for an alternative favicon.

## WordPress: admin-ajax.php Generates Pages Served

Plugins can utilize an Ajax API to make calls to custom functions and filters in the backend.

There are a number of uses for `admin-ajax.php`, and each instance of high usage should be inspected to determine if it is causing an unexpected number of pages served. Some use cases include: fetching the stored counts for when content is shared on social networks; checking if a page or post is currently being worked on (locked); even adding media to a post during the editing process such as using Gutenberg widgets.

Investigate calls to `admin-ajax.php` by looking at what script is calling the path, and what the payload is through browser developer tools. Access developer tools, filter for `admin-ajax`, then refresh the page:

- **Chrome**: Access Developer Tools through the **View** menu, then **Developer**, and **Developer Tools**. Click the **Network** tab, and in **Filter** search for `admin-ajax`
- **Firefox**: Access Web Developer Tools though the **Tools** menu, then **Web Developer**, and **Network**.

In this first image, in the *Initiator* column, we see that these calls are being initiated from `load-scripts.php`. If you click the initiator reference link, you'll see the JavaScript code that is calling it:

![Chrome Developer Tools shows results filtered for admin-ajax.php](../images/browser-dev-tools/devtools-network-admin-ajax.png)

Return to the **Network** tab and click `admin-ajax.php` to see *Headers*, including the payload of what was sent to `admin-ajax`, such as the post data and the action or hook to be run in the WordPress backend:

![Chrome Developer Tools shows Headers tab and Form Data](../images/browser-dev-tools/devtools-network-headers-admin-ajax.png)

Click the Preview tab for the response, which is a list of images if available. The following screenshot shows that, for this specific call, the media window widget was opening to populate a list of images that could be added to the body of a post:

![Chrome Developer Tools shows Headers tab and Form Data](../images/browser-dev-tools/devtools-network-preview-admin-ajax.png)

## DDoS Mitigation

Pantheon doesn't count DDoS towards site traffic and our [Customer Success](https://pantheon.io/docs/support) team is available to assist with identifying a DDoS attempt, and take steps to mitigate it for your site.

### Block IPs in Drupal or WordPress

IPs can be blocked with a PHP snippet in `settings.php` or `wp-config.php` or via Drupal module or WordPress plugin.

#### Use a PHP Snippet to Block IPs

Using a PHP snippet to block IPs offers a key advantage over using a module or plugin: the platform denies the IP before any connections, databases, or most importantly, the CMS are loaded. Additionally, if the site is under an ongoing DDoS attack, PHP can be added to the configuration file even while site performance is being affected.

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
$request_ip_blacklist = [
  '192.0.2.38',
  '192.0.3.125',
  '192.0.67.0/30',
  '192.0.78.0/24',
];

$request_remote_addr = $_SERVER['REMOTE_ADDR'];
// Check if this IP is in blacklist.
if (!$request_ip_forbidden = in_array($request_remote_addr, $request_ip_blacklist)) {
  // Check if this IP is in CIDR black list.
  foreach ($request_ip_blacklist as $_cidr) {
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

<Tab title="Drupal 8" id="d8tab">

In Drupal 8, the [Ban](https://www.drupal.org/docs/8/core/modules/ban/overview) module is not enabled by default in the Standard install profile, but it does come with core.

Enable the module, then navigate to the site's `/admin/config/people/ban` to enter the IP address (for example, `192.0.2.38`).

If the site is slow or unavailable, run the MySQL query below, replacing `192.0.2.38` with the IP to block:

```sql
mysql> INSERT INTO ban_ip (ip) VALUES ('192.0.2.38');
```

</Tab>

<Tab title="WordPress" id="wptab">

Install and use one of the following WordPress plugins:

- [IP Ban](https://wordpress.org/plugins/simple-ip-ban/)
- [WP-Ban](https://wordpress.org/plugins/wp-ban/)

</Tab>

</TabList>

## Advanced Global CDN
[Advanced Global CDN](/advanced-global-cdn) is a custom-configured upgrade to [Pantheon Global CDN](/global-cdn-caching), available through [Pantheon Professional Services](https://pantheon.io/professional-services). Once configured, Advanced Global CDN can serve entire pages and assets from cache, and provide an additional layer of protection against DDoS attempts.
