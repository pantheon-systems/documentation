---
contenttype: [partial]
categories: [cache]
cms: [--]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

<TabList>

<Tab title="Via Command Line" id="cli" active={true}>

1. Examine the headers through the command line:

  ```bash{outputLines: 2-20}
  curl --head https://docs.pantheon.io
  HTTP/2 200
  content-type: text/html
  age: 2808
  cache-control: public, maxage=60
  expires: Thu, 21 Sep 2023 21:39:51 GMT
  last-modified: Thu, 21 Sep 2023 19:04:09 GMT
  via: 1.1 varnish, 1.1 varnish
  strict-transport-security: max-age=300
  date: Thu, 21 Sep 2023 21:26:39 GMT
  x-served-by: cache-bfi-krnt7300115-BFI, cache-bfi-krnt7300115-BFI
  x-cache: MISS, MISS
  x-cache-hits: 0, 0
  x-timer: S1695331600.573858,VS0,VE60
  ```

  Note the result for `age` or `max-age`.

1. Navigate to the site's **Dev** environment and set the site to **Maintenance Mode**.

1. Clear the cache from either the Advanced Page Cache module or [from the Dashboard](/clear-caches#pantheon-dashboard).

1. cURL the site headers filtered for stale cache in a terminal:

  ```bash{promptUser: user}
  curl --head https://docs.pantheon.io | grep PContext-Resp-Is-Stale
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
