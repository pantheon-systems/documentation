---
title: Optimize Your Site for Accessibility
subtitle: Best Practices
description: Best practices when building an accessible site.
categories: [optimize]
tags: [accessibility, workflow, SEO]
contributors: [carolyn-shannon, wordsmither]
reviewed: "2022-06-01"
layout: guide
showtoc: true
permalink: docs/guides/accessibility/best-practices
anchorid: accessibility/best-practices
editpath: accessibility/04-best-practices.md
---

This section provides an overview of the tools and techniques to improve your website's accessibility.

## Alternative text descriptions

Alt text (alternative text attributes) within HTML code describes the appearance of an image on a page. 

Adding alt text to images ensures a description of the image is available whenever an image containing content can't be seen. This is crucial to users of assistive devices (like screen readers), to users with slow connection speeds, and to search engine crawlers when indexing an image. It's easy to do, and improves both user experience and page SEO.

Decorative images, and There are a number of excellent resources on how to write good alt text, including guides by [Mozilla](https://moz.com/learn/seo/alt-text), [](), and [](). Keep it short, describe the meaning the image intends to convey rather than what's in the image. 

When adding alt text for form buttons that use an image as a "submit" button, describe the function of the button as well, for example "submit sign up form". 

### Media captions, transcripts

Media captions and transcripts.

## Color and contrast

Section 508, which aligns with WCAG 2.0 Level AA, sets a legal standard for the contrast level necessary between text and its background. The baseline AA contrast standard is 4.5:1 for most text and 3:1 for large text (19px+ bold or 24px+ normal text). 

US Web Design System (USWDS) guidelines note:

Section 508 AA+ color contrast helps colorblindness and color perception.

Avoiding pure black text on white helps dyslexia, Irlen Syndrome, light sensitivity, and autism.

Best combination is the max color contrast of white/light text on black/dark background which seems to visually work well for all.



## Avoid tables

The World Wide Consortium no longer considers tables used in layout to be a good practice, for the sake of accessibility across multiple different interfaces and devices. Layout tables are complex, and this can be difficult for screen readers to comprehend, therefore complicating accessibility. In an attempt to separate content and structure from the physical presentation of a website, do not include tables as part of your plan for layout with your new site.



## Alt text for the <image> tag

The required alt attribute describes the appearance or function of an image, and is presented as alternate text for an image if the image cannot be displayed.  [Alt text decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/) helps determine when you should use alternative text.

## Just say ‘no’ to the Title Attribute

Don’t use the title attribute. The title attribute is not read aloud by screen readers. Instead, make the anchor text relevant and descriptive (ie don’t use “click here”).

SEO: Alt attributes provide better image context/descriptions to search engine crawlers, helping them to index an image properly.

Non-decorative images: use alt="[description of the image]" attributes for all non-decorative images. 

Decorative images: Include an empty alt="" attribute is preferred. Bonus points if you can add aria-hidden="true" as well. 

e.g. <img src='/img/mybackgroundimage.png' alt="" aria-hidden="true" />

Length: many screen readers cut off at 125 characters

More info: [Alt Text for Images - Examples & 2020 Best Practices - Moz]((https://moz.com/learn/seo/alt-text) 

## Safer Digital Animations and GIFs

The choices we make around animation in our work, and in what we share, directly impacts how our work affects people with motion sensitivities. Knowing what kinds of motion are potentially triggering, and how we can mitigate them, empowers us to create experiences that are safe for our audience and won’t cause unintended harm. 

Applying inclusive design principles to the animations and transitions we use, on websites, images, presentations, and even icons removes barriers to those users interacting with your content, and can significantly improve the experience for many others.

For web page and application designs, add user controls that permit user to reduce motion or turn it off completely.

Controls and applications that do this make use of the CSS media feature prefers-reduced-motion, and automatically provide a reduced motion alternative (or turn motion off). 

In general, GIFs and animated emojis are not impacted by reduced motion media query-based controls, so some additional steps are needed. There are several strategies for pausing GIF animations. 

Use the media query, and for reduced motion substitute a still image for those who prefer reduced motion. 

Use a button to control the animation. Chris Coyier has a good write-up on [progressive enhancement for accessible GIFs](https://css-tricks.com/gifs-and-prefers-reduced-motion/) using the <picture> element for React.

For community messaging use (eg Slack, Discord), consider restricting the use of animated GIFs and custom emojis, and add posting guidelines to help inform content creators.

## Inclusive Content

Words are powerful. The stories we tell build connection; the tutorials and presentations we author empower others with knowledge. Words are one of the primary ways we both connect and help one another. 

But even with the best of intentions, our choices in words may exclude folks. Terms and phrases may have an origin or make a reference of which we’re not aware, and can be harmful to others. Other phrases may present a reading level barrier for those from different backgrounds.

When creating content, the work of inclusive writing and editing means reviewing our work for examples of language that may exclude folks by testing, using inclusive language linting tools and readability scoring tools, and then copy editing to include alternatives.

