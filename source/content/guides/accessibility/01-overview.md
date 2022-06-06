---
title: Accessibility Guide
subtitle: Overview
description: How to extend your site's reach with accessibility planning, fixes, and reporting.
categories: [optimize]
tags: [accessibility, workflow, SEO]
contributors: [carolyn-shannon, wordsmither]
reviewed: "2022-06-01"
layout: guide
permalink: docs/guides/accessibility
anchorid: accessibility
editpath: accessibility/01-overview.md
---

<dfn id="acc">Web accessibility</dfn> means that websites, tools, and technologies are designed and developed so that people with disabilities can use them.  It includes all disabilities that affect access to the Web, including auditory, cognitive, physical, and more.

This guide provides an overview of how to optimize your website for accessibility, using tools and techniques integrated with the Pantheon WebOps workflow. 

This guide will help you improve the experience for severyone who uses your site, future-proof its content, and build a sustainable accessibility practice across your WebOps teams. It will also help you identify areas where you may wish to use professional accessibility services and partners.

## Key Concepts

If Web Accessibility is new to you, these concepts can help you on your journey.

### Types of Disabilities

The [<dfn id="adalong">American with Disabilities Act</dfn> (<dfn id="ada">ADA</dfn>)](https://adata.org/faq/what-definition-disability-under-ada), defines a person with a disability as a person who has a physical or mental impairment that substantially limits one or more major life activity. This includes people who have a record of such an impairment, even if they do not currently have a disability. It also includes individuals who do not have a disability but are regarded as having a disability. The ADA also makes it unlawful to discriminate against a person based on that person’s association with a person with a disability.

Disabilities can be divided into the following categories:

- Visual: color blindness, low vision, blindness
- Cognitive, learning and neurological: autism spectrum disorder, mental health, perceptual disabilities
- Auditory: hard of hearing, deafness
- Physical: amputation, paralysis, repetitive stress injury
- Speech: muteness, stuttering

This is by no means an exhaustive list. You can find more details on each from this excellent article from [Yale University](https://usability.yale.edu/web-accessibility/articles/types-disabilities).

### Web Content Accessibility Guidelines

The World Wide Web Consortium's (W3C) [<dfn id="wacc">Web Content Accessibility Guidelines (WCAG)</dfn>](https://www.w3.org/WAI/standards-guidelines/wcag/) are an internationally accepted standard for website accessibility. WCAG documents provide detailed explanations and examples on how to make web content more accessible to people with disabilities. The current standard most used is [WCAG 2.1](https://www.w3.org/TR/WCAG21/); [WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/) is scheduled to be published in 2021. 

### Principles of Accessibility and Success Criteria

The [WCAG principles](https://www.w3.org/TR/WCAG20/#guidelines) that structure accessibility guidelines aim for information and user interface components to be Perceivable, Operable, Understandable, and Robust (POUR). 

For each guideline, there are testable success criteria at [three levels](https://www.w3.org/WAI/WCAG21/Understanding/conformance#levels): A (essential), AA (ideal), and AAA (high-level support. 

### WAI-ARIA for rich internet applications 

[<dfn id="waiaria">WAI-ARIA 1.1</dfn>](https://www.w3.org/TR/wai-aria-practices-1.1/) provides additional guidance for dynamic content and advanced user interface controls developed with HTML, JavaScript, and related technologies. It provides insights on ARIA roles, states, and properties to make custom widgets accessible, usable, and interoperable with assistive technologies and to those who rely on keyboard navigation.

[Dequeue](https://www.deque.com/blog/top-5-rules-of-aria/) has good guidance on how to use ARIA effectively to improve the accessibility of web application controls, offering specific guidance for [React](https://www.deque.com/blog/debunking-the-myth-accessibility-and-react/) and [Angular](https://www.deque.com/blog/angular-and-accessibility-issues-and-strategies/) development. 

### Semantic HTML

Using Semantic HTML regions and logical header order in page construction are best practices that significantly improve the operability and navigation of a site or application. 

### HTML Controls and ARIA Roles

Use native HTML elements (such as `<button>` rather than `<div role="button">`) whenever possible, to simplify development. HTML elements have built-in handlers for receiving focus and activation that ensure they will work for those relying on keyboard navigation without additional scripting.

### User Experience, Digital Accessibility, and SEO

Making a website fast is no longer enough to achieve the top spots on search results pages. Great user experience matters. Google's [Core Web Vitals](https://web.dev/learn-web-vitals/), the scoring system that is part of Google's page ranking calculations, shift search engine optimization (SEO) to focus on multiple factors (including page speed) that contribute to great user experience. So removing barriers to use is key to SEO.

### Inclusive Design

<dfn id="incdes">Inclusive Design</dfn> is a methodology that considers the full range of human diversity, with respect to ability, language, culture, and more.  It's intent is to create products whose experiences serve as many people as possible, including those with disabilities.

### a11y

<dfn id="a11y">a11y</dfn> stands for "accessibility". Use of this term on the internet helps to identify content related specifically to digital accessibility.

