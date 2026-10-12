---
title: Next-generation Global CDN
subtitle: "Geolocation"
navtitle: Geolocation
description: Send your site the visitor's location in a Pantheon-Geo request header by setting geolocation_header in pantheon-edge.yml.
tags: [cache, cdn, geolocation]
contributors: [conorbauer, jazzsequence]
showtoc: true
reviewed: "2026-10-12"
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

If a response changes based on the visitor's location, mark it as not cacheable (for example, `Cache-Control: private, no-store`). Otherwise, visitors in one location may see a page that was built for another. Location-based changes that happen in the browser, after the page loads, avoid this problem.

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
