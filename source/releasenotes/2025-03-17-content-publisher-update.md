---
title: "Introducing Pantheon’s interactive product roadmap"
published_date: "2025-03-17"
categories: [new-feature, content-publisher]
---
We just released a new version of the service (back-end + admin interface + Google Docs add-on + CLI + JS SDK v3.11.2). 

## Auth Tokens Management


Managing tokens for authenticating to the service was confusing as part of it was managed in the CLI and other was in the Content Management UI. The system was also confusing because of unclear terminology and language. We solved that by providing an upgraded Auth Token user interface in the Content Management UI. See the [related documentation page](https://pcc.pantheon.io/docs/authentication-tokens).

## Ingest API

Content Publisher was first made to work with and ingest content from Google Docs but was always thought as an open content integration service to which we could connect other content sources. With this new version of the service, we are releasing an open API that allows developers to programmatically ingest content in Content Publisher, opening the possibility for third parties to develop new 3rd party connectors to our service. Do you want to use Content Publisher from MS Word, Notion, Obsidian or other authoring tool? Now you can make it by developing yourself as an integration! Visit the [documentation for the Ingest API](https://pcc.pantheon.io/docs/api/pantheoncloud/document/12AfF1OfXxp54qDPqM08k3A_KaTIn_acY9-CF2RG36sE) for more information.

## Exclude specific documents from search

Up to now, all documents published in Content Publisher were made available to our Search service available as part of the Delivery API. Simple is beautiful but this was a bit too simple… we learned from beta users that you sometimes need to publish yet exclude specific documents from search. This can now be done very simply using a toggle in the main Content Overview screen of the Content Management UI.

![](https://cdn.prod.pcc.pantheon.io/bXl9A4Dif2o3vA4YetBQ/3yDXZYC6xLKwFnH4I02F)

## Others

This release also brings minor improvements and bug fixes including:
-   Fixing the proper support of superscript in the Google Doc formatting support.
-   Better support of browsers disabling 3rd party cookies in the Preview Editor.
-   Fixing styling of Table of Contents from Google Docs that could be broken in some edge cases.
-   Add a new icon in the Preview Editor for responsive view mode.
-   Better support Google Docs header formatting that could result in design issues.
-   UX improvements to the Smart Component popup
