---
title: Get Support
subtitle: Copy cURL Data
description: Learn how to copy cURL data in the browser.
contenttype: [guide]
innav: [false]
categories: [help]
cms: [--]
audience: [agency, business, development, marketing, sysadmin]
product: [--]
integration: [--]
tags: [updates, continuous-integration, composer, workflow]
type: guide
permalink: docs/guides/support/curl
contributors: [whitneymeredith]
---

This section provides information on how to get cURL data to help the Support team provide more customized help.

cURL allows you to reproduce a browser-based operation. cURL data shows all headers, switches, and data sent to the browser when a request was made.

You can copy cURL data from your browser and paste it into your preferred text editor to review the request data in detail and share it with the Support team. Optionally, you can append `-H "pantheon-debug: 1" -H "fastly-debug: 1" --http1.1 -s -D - -o /dev/null` to the copied cURL command to get more detailed debug data.

### How Do I Copy cURL Data?

<TabList>

<Tab title="Chrome" id="chrome" active={true}>

1. Click **More Tools** and then select **Developer Tools**.

   - Refer to [Google Chrome's official documentation](https://developer.chrome.com/docs/devtools/open/) for more options.

1. Click the **Network** tab.

1. Right-click the entry you want to get cURL data for, select **Copy**, and then select **Copy as cURL**.

</Tab>

<Tab title="Firefox" id="firefox">

1. Click **More tools** and then select **Web Developer Tools**.

1. Click the **Network** tab.

1. Right-click the entry you want to get cURL data for, select **Copy Value**, and then select **Copy as cURL**.

</Tab>

<Tab title="Edge" id="edge">

1. Click **More Tools** and then select **Developer Tools**.

1. Click the **Network** tab.

1. Right-click the entry you want to get cURL data for, select **Copy**, and then select **Copy as cURL**.

</Tab>

<Tab title="Safari" id="safari">

1. Open **Web Inspector** in Safari.

1. Click the **Network** tab.

1. Click the **Filter** menu and change the settings from **All** to **XHR/Fetch**.

1. Right-click the entry you want to get cURL data for and then select **Copy as cURL**.

</Tab>

</TabList>

## More Resources

- [Advanced cURLs for Site Migration](/guides/launch/advanced-curls/)
- [Fastly on Pantheon](/guides/fastly-pantheon)