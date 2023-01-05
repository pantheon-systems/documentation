---
title: Get Support
subtitle: Copy cURL Data
description: Learn how to copy cURL data in the browser.
contenttype: [guide]
categories: [help]
newcms: [--]
audience: [agency, business, development, marketing, sysadmin]
product: [--]
integration: [--]
tags: [updates, continuous-integration, composer, workflow]
type: guide
showtoc: true
permalink: docs/guides/support/curl
anchorid: curl
contributors: [whitneymeredith]
---

This section provides information on how to get cURL data to help the Support team provide more customized help.

cURL allows you to reproduce a browser-based operation. cURL data shows all headers, switches, and data sent to the browser when the request was made.

You can copy cURL data from your browser and paste it into your preferred text editor to review the request data in detail and share it with the Support team. Optionally, you can append `-H "pantheon-debug: 1" -H "fastly-debug: 1" --http1.1 -s -D - -o /dev/null`
 to the copied curl command to get more detailed debug data.

Tab