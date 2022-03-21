---
title: Edge Integrations
subtitle: Analytics
description: Integrate Edge Integrations with Google Tag Manager.
categories: [develop]
tags: [collaborate, composer, continuous-integrations, webops, workflow]
contributors: [michellecolon-pantheon, jazzsequence, jspellman814]
type: guide
layout: guide
showtoc: true
anchorid: analytics
permalink: docs/guides/edge-integrations/analytics/
editpath: edge-integrations/05-analytics.md
reviewed: "2022-03-09"
---

Pantheon’s Edge Integrations offers advanced and powerful features for content personalization. At this time, 3 key primary features are supported: Geo, Interest and Role. These features allow us to serve different content to each user at given URLs. Google Analytics won’t differentiate between the personalized versions of a page unless we instruct it otherwise. This documentation aims to help you enhance your configuration to track personalization experiences via Google Tag Manager.

## Requirements

* Access to your site’s Google Analytics and Tag Manager accounts, and basic knowledge of these products. 
* You have the Smart CDN module enabled and a personalization use case active and working on your Pantheon-hosted, Advanced Global CDN-enabled website. 

Personalization strategy and implementation are outside the scope of this documentation. Refer to our [Introduction](https://pantheon.io/docs/guides/edge-integrations/introduction/) guide for more information.

### Before  You Begin

Consider the desired goals and objectives for your users. Define success for your organization and how you want to measure it. Do your personalization tactics aim to convert your users to sign up for your newsletter, download a whitepaper, or achieve some other goal? You may already have tracking in place to measure against these key performance indicators; we will be extending them here. 
