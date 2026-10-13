---
title: Next-generation Global CDN
subtitle: "Geolocation"
navtitle: Geolocation
description: Send your site the visitor's location in a Pantheon-Geo request header by setting geolocation_header in pantheon-edge.yml.
tags: [cache, cdn, geolocation]
contributors: [conorbauer, jazzsequence]
showtoc: true
reviewed: "2026-10-13"
permalink: docs/guides/nextgen-gcdn/advanced-edge/geolocation
contenttype: [guide]
innav: [false]
categories: [cache, optimize]
cms: [drupal, wordpress]
audience: [development]
product: [cdn]
integration: [--]
---

Geolocation sends your site the visitor's location, so it can show regional content, set a default currency or language, or apply location-based rules. When Geolocation is on, the edge adds a `Pantheon-Geo` header to each request it sends to your site. Your site doesn't need to call a separate geolocation service.

## Before you begin

Be sure that you have:

- A site on [Next-generation Global CDN](/guides/nextgen-gcdn/setup), in a workspace whose plan includes Geolocation.
- A [local clone](/guides/git/git-config#clone-your-site-codebase) of your site's codebase, so you can add `pantheon-edge.yml`.
- Code in your site that can read a request header, such as a WordPress or Drupal theme or module, or a Next.js route handler.

## Where to configure it

Add `geolocation_header: true` to `pantheon-edge.yml`. Your workspace's plan must include Geolocation. For how the file works and how changes go live, see [Configure features with pantheon-edge.yml](/guides/nextgen-gcdn/advanced-edge#configure-features-with-pantheon-edgeyml).

```yaml:title=pantheon-edge.yml
geolocation_header: true
```

To turn it off, remove the line or set it to `false`, then push.

## What your site receives

Your site receives a single request header, `Pantheon-Geo`, containing `key=value` pairs separated by semicolons, with no spaces:

```text
Pantheon-Geo: country_code=US;continent_code=NA;city=Austin;region=TX;region_name=Texas;postal_code=78701;metro_code=635;latitude=30.26720;longitude=-97.74310;timezone=America/Chicago
```

A visitor in the European Union also gets `is_eu_country=1`:

```text
Pantheon-Geo: country_code=DE;continent_code=EU;city=Berlin;region=BE;region_name=Berlin;postal_code=10115;latitude=52.52000;longitude=13.40500;timezone=Europe/Berlin;is_eu_country=1
```

These values are examples. Actual values depend on the visitor.

## Fields

| Field | Description | Example |
| --- | --- | --- |
| `country_code` | Two-letter country code (ISO 3166-1) | `US` |
| `continent_code` | Two-letter continent code | `NA` |
| `city` | City name | `Austin` |
| `region` | State, province, or region code (the part of the ISO 3166-2 code after the country) | `TX` |
| `region_name` | State, province, or region name | `Texas` |
| `postal_code` | Postal or ZIP code | `78701` |
| `metro_code` | US metro (DMA) code. United States only. | `635` |
| `latitude` | Approximate latitude | `30.26720` |
| `longitude` | Approximate longitude | `-97.74310` |
| `timezone` | Time zone name | `America/Chicago` |
| `is_eu_country` | `1` when the visitor is in a European Union country. Left out otherwise. | `1` |

- Any field the edge can't determine for a visitor is left out. If none can be determined, the header is sent empty.
- A `;` or `=` inside a value is replaced with `-`, so the header can always be split safely.
- Location is based on the visitor's IP address, so it is approximate. City, postal code, and coordinates are less precise than country.

## Reading the header in your code

<TabList>

<Tab title="PHP" id="geo-php" active={true}>

This works for WordPress or Drupal:

```php
<?php
function pantheon_geo(): array {
  $geo = [];
  foreach (explode(';', $_SERVER['HTTP_PANTHEON_GEO'] ?? '') as $pair) {
    if (strpos($pair, '=') === false) {
      continue;
    }
    [$key, $value] = explode('=', $pair, 2);
    $geo[$key] = $value;
  }
  return $geo;
}

$geo = pantheon_geo();
$country = $geo['country_code'] ?? null;
```

</Tab>

<Tab title="JavaScript" id="geo-js">

This example works for frameworks like Next.js:

```javascript
function parsePantheonGeo(raw) {
  const geo = {};
  for (const pair of (raw ?? '').split(';')) {
    const i = pair.indexOf('=');
    if (i > 0) geo[pair.slice(0, i)] = pair.slice(i + 1);
  }
  return geo;
}

// In a Next.js server component or route handler:
// import { headers } from 'next/headers';
// const geo = parsePantheonGeo((await headers()).get('pantheon-geo'));
```

</Tab>

</TabList>

## Caching

The edge cache doesn't separate pages by location. Your site only receives `Pantheon-Geo` on requests that reach it, and a cached page is served to every visitor regardless of where they are.

If a response changes based on the visitor's location, don't let it be cached as a single copy. Otherwise, visitors in one location may see a page that was built for another. You have three options:

- **Don't cache the page.** Mark it as not cacheable (for example, `Cache-Control: private, no-store`). This is the simplest option, but every request reaches your site.
- **Change the page in the browser.** Serve the same cached page to everyone, then use JavaScript to adjust it after it loads. The cached page stays identical for all visitors.
- **Cache one version per location.** Use a [cache-varying cookie](#cache-one-version-per-location) so the edge keeps a separate cached copy for each location group.

### Cache one version per location

Cache-varying cookies are the way to cache location-specific pages. A cookie whose name starts with `STYXKEY` becomes part of the cache key, so the edge keeps a separate cached copy for each value. For the naming rules, see [Cache-varying cookies](/cookies#cache-varying-cookies).

Your site sets the cookie, using the location it reads from `Pantheon-Geo`:

1. A request arrives without the cookie. Your site reads `Pantheon-Geo`, picks a location group, sets the cookie, and renders that version of the page. This response isn't cached, because a response that sets a cookie can't be cached.
2. The browser sends the cookie on later requests. The edge caches and serves a copy for each cookie value, so your site only runs again for a value it hasn't seen.

```php
<?php
// Map only the countries that get different content. Everyone else shares one version.
const GEO_VARIANTS = ['CA' => 'ca', 'GB' => 'gb', 'DE' => 'de'];

$cookie_name = 'STYXKEY_geo';
$allowed = array_merge(array_values(GEO_VARIANTS), ['default']);

if (isset($_COOKIE[$cookie_name]) && in_array($_COOKIE[$cookie_name], $allowed, true)) {
  $variant = $_COOKIE[$cookie_name];
  // Render the page for $variant.
  // Don't set cookies here. A Set-Cookie header keeps the response from being cached.
}
else {
  $country = pantheon_geo()['country_code'] ?? '';
  $variant = GEO_VARIANTS[$country] ?? 'default';
  setcookie($cookie_name, $variant, [
    'expires' => time() + 3600,
    'path' => '/',
    'secure' => true,
    'samesite' => 'Lax',
  ]);
  // Render the page for $variant. This response isn't cached.
}
```

- **Keep the number of values small.** Each distinct cookie value creates a separate cached copy. Use a country or a group of countries, not a city, postal code, or coordinates. A value that is close to unique per visitor makes caching ineffective.
- **Check the cookie value.** Visitors can set cookies themselves, so only trust values from your own list, as the example does.
- **Expect some requests to skip the cache.** Requests that don't keep cookies, such as many bots and command-line tools, never get a cached copy.
- **Set a short lifetime.** A visitor who travels keeps the old value until the cookie expires.

## Security

- If a visitor sends their own `Pantheon-Geo` header, the edge removes it. This happens whether Geolocation is on or off, so the header can't be spoofed.
- The header is only sent to your site. It is never included in the response to the visitor.

## Checking that it works

Send a request with the `Pantheon-Debug: 1` header and look at the `X-Worker` response header. It shows whether Geolocation is on and the value that was sent for your request:

```bash{promptUser: user}
curl -s -o /dev/null -D - -H "Pantheon-Debug: 1" https://www.example.com/ | grep -i x-worker
```

```text
x-worker: ...; Geo: enabled [country_code=US;continent_code=NA;...]
```

## Moving from AGCDN geolocation headers

If your site used geolocation headers on [AGCDN](/guides/agcdn), update your code before you migrate. The header name, format, and available fields are different:

- Geolocation is now one `Pantheon-Geo` header with `key=value` pairs, not a separate header for each value.
- These AGCDN fields aren't available: `area_code`, `country_code3`, `country_name`, `conn_speed`, `conn_type`, proxy details, and `gmt_offset`/`utc_offset`. Use `timezone` in place of the offset fields.
- The visitor's IP address isn't included in the header.
- Location data may differ slightly from AGCDN for some visitors, especially at the city and postal code level.

## Scope

Applies to one site environment. Each environment uses the `pantheon-edge.yml` in its own code.

## More resources

- [Advanced Edge](/guides/nextgen-gcdn/advanced-edge)
- [Rate Limiting](/guides/nextgen-gcdn/advanced-edge/rate-limiting)
- [Cookies](/cookies#cache-varying-cookies)
- [Bypassing Cache with HTTP Headers](/cache-control)
- [Advanced Global CDN](/guides/agcdn)
