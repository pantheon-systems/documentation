---
title: Edge Integrations
subtitle: Introduction
description: A modern approach to audience-based content personalization.
categories: [develop]
tags: [collaborate, composer, continuous-integrations, webops, workflow]
contributors: [michellecolon-pantheon, jazzsequence, jspellman814]
type: guide
layout: guide
showtoc: true
anchorid: edge-integrations
permalink: docs/guides/edge-integrations/
editpath: edge-integrations/01-introduction.md
reviewed: "2022-03-23"
---

This guide is made to facilitate the onboarding process for developers who are implementing content personalization via Pantheon's [Advanced Global CDN](/guides/professional-services/advanced-global-cdn) into their own Drupal or WordPress website. 

## What Is Edge Integrations? (Pilot)

Edge Integrations is a Software Development Kit (SDK) that allows users to personalize WordPress and Drupal. Pantheon's approach leverages tight integration between the CMS and our Global CDN with Edge Computing capabilities to deliver the right content to the right audience directly, and with fewer moving parts. 

### How Does Edge Integrations Work?

Edge Integrations uses configuration at the "edge" or the CDN to enable personalization options for Geolocation or Interests. This is done by using HTTP vary headers that tell the CDN to return cached variations of content based on values identified by the user browsing the site.

## Is Edge Integrations Right for You?

The benefits of Edge Integrations:

- Unified Experience
	- You can improve productivity by using existing content, style guides, media, and CMS integrations. No need to manage assets in multiple places.

- Performance-forward
	- Improve credibility with a fast, seamless customer experience, and distribute personalized content across dozens of global and US points of presence.

- Cost-effective
	- Increase business impact by instrumenting and measuring success with your current analytics products. No need for new segmentation tooling.

- Geographic targeting
	- Based on the location of the visitor, the site can deliver a different homepage — for example, Canadian visitors might see poutine, whereas US visitors would see pizza.

- Interest fingerprinting
	- Repeated engagement with types of content — e.g. looking at multiple vegan recipes - will create a specific Interest-based cache, which will reorganize a landing page to highlight content that matches the visitor's interest.

There are many more ways to leverage content variation to identify valuable audience segments or variants. Contact your Account Manager to learn more about Edge Integrations and get started.

## Glossary

<dl>

<dt>Vary Header</dt>

<dd>

The cache layer stores and registers content variants utilizing the [vary header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary). The Vary HTTP response header describes the parts of the request message, aside from the method and URL, that influenced the content of the response it occurs in. It’s a key concept in the process of *content negotiation*. In HTTP, content negotiation is the mechanism that is used for serving different representations of a resource (for example, a WordPress Post or Drupal node) to the same URI to help the user agent specify which representation is best suited for the user (e.g. document language, personalization blocks, content-encoding, version of the content).

Example: `Vary: <header-name>, <header-name>`

- `<header-name>` corresponds to the personalization property or condition

</dd>

<dt>Segmentation (Drupal)</dt>

<dd>

Each segment corresponds to a different value within the personalization property/condition.

Example: `US` `CA` `ES` `UK` 

- Used within the Geolocation condition, where each segment is a country. 

- Within the Interest condition, we may have segments that correspond to particular terms in the Interest taxonomy vocabulary. 

Every segment is defined through the Smart Content module UI, and is connected to the block content that will show up when the condition is met and the user is placed within the segment. For example, when the user is in Canada, the condition for the Geolocation is met and the user is placed into a `CA` segment. Then, blocks that respond to the `CA` segment will be rendered instead of generic blocks.

The combination of rendered segmented blocks creates a page variant that is later on stored inside the AGCDN cache and shown to the user without the need for CMS engagement.

</dd>

</dl>

## Additional Resources

Support for Edge Integrations is available through the Pantheon Community slack channel `#edge-integrations`. If you're not already a member, [join the community here](https://slackin.pantheon.io/)!
