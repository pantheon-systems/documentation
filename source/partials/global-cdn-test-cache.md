---
contenttype: [partial]
categories: [cache]
newcms: [--]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

<TabList>

<Tab title="Via Command Line" id="cli" active={true}>

1. Examine the headers through the command line:

  ```bash{outputLines: 2-20}
  curl --head https://pantheon.io/docs
  HTTP/2 301
  content-type: text/html
  location: https://pantheon.io/docs/
  server: nginx
  strict-transport-security: max-age=31622400
  x-pantheon-styx-hostname: styx-fe2-a-5d96768699-vcdvh
  x-styx-req-id: b7b8d4d2-04d9-11ec-a467-9a05fab906d1
  cache-control: public, max-age=86400
  date: Tue, 24 Aug 2021 15:30:21 GMT
  x-served-by: cache-mdw17379-MDW, cache-ewr18124-EWR
  x-cache: HIT, HIT
  x-cache-hits: 1, 1
  x-timer: S1629819022.932985,VS0,VE1
  pantheon-trace-id: be58e6a03a904fbfa64515ee136ffd34
  vary: Cookie, Cookie
  age: 9654
  accept-ranges: bytes
  via: 1.1 varnish, 1.1 varnish
  content-length: 162
  ```

  Note the result for `age` or `max-age`.

1. Navigate to the site's **Dev** environment and set the site to **Maintenance Mode**.

1. Clear the cache from either the Advanced Page Cache module or [from the Dashboard](/clear-caches#pantheon-dashboard).

1. cURL the site headers filtered for stale cache in a terminal:

  ```bash{promptUser: user}
  curl --head https://pantheon.io/docs | grep PContext-Resp-Is-Stale
  ```

  If the response headers include `PContext-Resp-Is-Stale`, the page has been successfully served from stale cache.

</Tab>

<Tab title="Via Web Browser" id="web-browser">

1. Navigate to the page using [Firefox](https://developer.mozilla.org/en-US/docs/Tools) or [Chrome](https://developer.chrome.com/docs/devtools/), and in the browser's developer tools open the **Network** tab.

1. Find the response headers for the page or asset.

1. Go to the site's **Dev** environment and set the site to **Maintenance Mode**.

1. Clear the cache from either the Advanced Page Cache module or [from the Dashboard](/clear-caches#pantheon-dashboard).

1. Go back to the page and Developer Tools, then refresh the page for the newest header responses.

  If the result includes `PContext-Resp-Is-Stale`, the page has been successfully served from stale cache.

</Tab>

</TabList>
