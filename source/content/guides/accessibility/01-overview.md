---
title: Accessibility Guide
subtitle: Overview
description: How to extend your site's reach with accessibility planning, fixes, and reporting.
categories: [optimize]
tags: [accessibility, workflow, SEO]
contributors: [carolyn-shannon]
reviewed: "2020-12-14"
layout: guide
permalink: docs/guides/accessibility
anchorid: accessibility
editpath: accessibility/01-overview.md
---

This guide provides an overview of how to optimize your website for accessibility, using tools and techniques integrated with the Pantheon WebOps workflow. 

This guide will help you improve the experience for everyone who uses your site, future-proof its content, and build a sustainable accessibility practice across your WebOps teams. It will also help you identify areas where you may wish to use professional accessibility services and partners.

## Web Content Accessibility Guidelines

The World Wide Web Consortium's (W3C) [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/) are an internationally accepted standard for website accessibility. WCAG documents provide detailed explanations and examples on how to make web content more accessible to people with disabilities. The current standard most used is [WCAG 2.1](https://www.w3.org/TR/WCAG21/); [WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/) is scheduled to be published in 2021. 

### Principles of accessibility and success criteria

The [WCAG principles](https://www.w3.org/TR/WCAG20/#guidelines) that structure accessibility guidelines aim for information and user interface components to be Perceivable, Operable, Understandable, and Robust (POUR). 

For each guideline, there are testable success criteria at [three levels](https://www.w3.org/WAI/WCAG21/Understanding/conformance#levels): A (essential), AA (ideal), and AAA (high-level support. 

### WAI-ARIA for rich internet applications 

[WAI-ARIA 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/) provides additional guidance for dynamic content and advanced user interface controls developed with HTML, JavaScript, and related technologies. It provides insights on ARIA roles, states, and properties to make custom widgets accessible, usable, and interoperable with assistive technologies and to those who rely on keyboard navigation.

[Dequeue](https://www.deque.com/blog/top-5-rules-of-aria/) has good guidance on how to use ARIA effectively to improve the accessibility of web application controls, offering specific guidance for [React](https://www.deque.com/blog/debunking-the-myth-accessibility-and-react/) and [Angular](https://www.deque.com/blog/angular-and-accessibility-issues-and-strategies/) development. 

### Semantic HTML

Using Semantic HTML regions and logical header order in page construction are best practices that significantly improve the operability and navigation of a site or application. 

### HTML controls and ARIA roles

Use native HTML elements (such as `<button>` rather than `<div role="button">`) whenever possible, to simplify development. HTML elements have built-in handlers for receiving focus and activation that ensure they will work for those relying on keyboard navigation without additional scripting.

## User experience, digital accessibility, and SEO

Making a website fast is no longer enough to achieve the top spots on search results pages. Great user experience matters. Google's [Core Web Vitals](https://web.dev/learn-web-vitals/), the scoring system that is part of Google's page ranking calculations, shift search engine optimization (SEO) to focus on multiple factors (including page speed) that contribute to great user experience. So removing barriers to use is key to SEO.

## Where to start



## Creating accessible websites and web applications

The start of a new site design is the easiest time to build a sustainably accessible site. 

## Planning and executing fixes to existing sites

To optimize an existing site for accessibility, 

1. begin with an assessment of the assets and pages on the site, 

1. identify the WCAG conformance target, 

1. determine how you will test changes, and 

1. create a plan to prioritize the changes you will make to maximize impact.

### Inventory and assess site pages

There are a number of tools available to help create an inventory and assessment of the conformance of your existing site pages to WCAG guidelines.

### WCAG conformance targets

Identify your target level of conformance to Web Content Accessibility Guidelines.

