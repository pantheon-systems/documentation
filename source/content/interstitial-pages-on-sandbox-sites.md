---
title: Interstitial Pages on Sandbox Sites
description: Visiting a page on a sandbox site will pop up a message informing the visitor that the site is not live.
contenttype: [doc]
innav: [true]
categories: [security]
cms: [--]
audience: [development]
product: [--]
integration: [--]
tags: [security]
reviewed: "2025-05-01"
---

In addition to the setting HTTP headers to discourage indexing of non-live environments, Pantheon also displays an interstitial page when a visitor attempts to access a sandbox site created after May 6th, 2025. This page informs the visitor that the site is not live and provides a link to the live site.

We show this message as a means of clarifying for visitors that the site is not live and to prevent confusion.
This message also discourages abuse of the sandbox sites for spam or other malicious purposes.

After clicking through this page, a cookie is set in the browser to prevent the interstitial page from showing again for the same visitor to the same environment for 24 hours.

_todo: add screenshot_

These pages will show in all environments (Multidev, Dev, Test, and Live) for sandbox sites that have not convert to a paid plan.
Once a site is on a paid plan, this message will no longer show on any environment.

## Circumventing the Interstitial Page with an HTTP Header during automated testing

If you are using a testing tool that requires access to the sandbox site, you can add an HTTP header of `Deterrence-Bypass` to your request to bypass the interstitial page.

For example, if you are testing a site with Playwright, you can add the following to your test script:

```javascript
await page.setExtraHTTPHeaders({
  'Deterrence-Bypass': 'true',
});
```
