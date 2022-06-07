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

## Tables

**Layout tables** (such a tables that are used to give the effect of columns) are not considered best practice by the The World Wide Consortium, as they reduce accessibility across multiple different interfaces and devices. Layout tables are complex, and this can be difficult for screen readers to comprehend, therefore complicating accessibility. In an attempt to separate content and structure from the physical presentation of a website, do not include tables as part of your plan for layout with your new site.

**Data tables** are still appropriate for presenting information in two dimensions.

See [Deque University's Tables](https://dequeuniversity.com/checklists/web/tables) page for more information.

## Links

Don’t use the `title` attribute in links, as it is not read aloud by screen readers. Instead, make the anchor text relevant and descriptive (ie don’t use “click here”).

## HTML

### Semantic HTML

Using Semantic HTML regions and logical header order in page construction are best practices that significantly improve the operability and navigation of a site or application. 

### HTML Controls and ARIA Roles

Use native HTML elements (such as `<button>` rather than `<div role="button">`) whenever possible, to simplify development. HTML elements have built-in handlers for receiving focus and activation that ensure they will work for those relying on keyboard navigation without additional scripting.

## Media

### Alternative Text Descriptions

The `alt` attribute describes the appearance or function of an image, and is presented as alternate text for an image if the image cannot be displayed.  The [Alt text decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/) helps determine when you should use alternative text.

- Non-decorative images: use `alt="description of the image"` attributes for all non-decorative images. 

- Decorative images: Include an empty `alt=""` attribute. Alternatively, you can use `aria-hidden="true"`. For example: `<img src='/img/mybackgroundimage.png' alt="" aria-hidden="true" />`

See [Alt Text for Images - Examples & 2020 Best Practices - Moz](https://moz.com/learn/seo/alt-text) for more information.

### Subtitles, Captions, and Transcripts

- Subtitles translate the speech on-screen to text. They are generally designed for viewers who can hear but do not understand the language in the video.
- Captions transcribe both speech and additional audio cues like “knock on the door.” They are designed for viewers who cannot hear the audio in the video.  Note: automatic captions are not sufficient to meet accessibility requirements. 
- Basic transcripts relay the spoken dialogue within the video. They are used by people who are deaf, hearing-impaired or have difficulty processing auditory information.
- Descriptive transcripts include all the audio and visual information a non-disabled user would get form watching the video. They are specifically designed for people who are both deaf and blind.

### Safer Digital Animations and GIFs

The choices we make around animation in our work, and in what we share, directly impacts how our work affects people with motion sensitivities. Knowing what kinds of motion are potentially triggering, and how we can mitigate them, empowers us to create experiences that are safe for our audience and won’t cause unintended harm. 

Applying inclusive design principles to the animations and transitions we use, on websites, images, presentations, and even icons removes barriers to those users interacting with your content, and can significantly improve the experience for many others.

For web page and application designs, add user controls that permit user to reduce motion or turn it off completely. Controls and applications that do this make use of the CSS media feature prefers-reduced-motion, and automatically provide a reduced motion alternative (or turn motion off). 

However, GIFs and animated emojis are generally not impacted by reduced motion media query-based controls, so some additional steps are needed. There are several strategies for pausing GIF animations. 

- Use the media queries, and for reduced motion, substitute a still image for those who prefer reduced motion. 

- Use a button to control the animation. Chris Coyier has a good write-up on [progressive enhancement for accessible GIFs](https://css-tricks.com/gifs-and-prefers-reduced-motion/) using the `<picture>` element for React.

- For community messaging (such as Slack or Discord), consider restricting the use of animated GIFs and custom emojis, and add posting guidelines to help inform content creators.

## Color and Contrast

[Section <dfn id="508">508</dfn>](https://www.section508.gov/), which aligns with WCAG 2.0 Level AA, sets a legal standard for the contrast level necessary between text and its background. The baseline AA contrast standard is 4.5:1 for most text and 3:1 for large text (19px+ bold or 24px+ normal text). 

The [US Web Design System (USWDS)](https://designsystem.digital.gov/) guidelines offer the following advice:

- Color contrast helps colorblindness and color perception.

- Avoiding pure black text on white helps dyslexia, Irlen Syndrome, light sensitivity, and autism.

- The best combination is the max color contrast of white/light text on black/dark background which seems to visually work well for all.

## Inclusive Language

Words are powerful. The stories we tell build connection; the tutorials and presentations we author empower others with knowledge. Words are one of the primary ways we both connect and help one another. 

But even with the best of intentions, our choices in words may exclude folks. Terms and phrases may have an origin or make a reference of which we’re not aware, and can be harmful to others. Other phrases may present a reading level barrier for those from different backgrounds.

When creating content, the work of inclusive writing and editing means reviewing our work for examples of language that may exclude folks by testing, using inclusive language linting tools and readability scoring tools, and then copy editing to include alternatives.

Here are some resources to help you write using inclusive language.

- [Pantheon’s Inclusive Language Guide](https://pantheon.io/docs/inclusive-language) aims to support our community and contributors in using more inclusive language.
    
- [Hubspot: How to use and promote inclusive language at your organization](https://blog.hubspot.com/marketing/inclusive-language)
    
- [Association for Experimental Education: Inclusive and accessible virtual presentations](https://www.aee.org/assets/Enews/2018/Feb/Inclusive-Accessible-Virtual-Meetings.pdf)
    
- [American College Personnel Association: Inclusive language for presenters](https://www.youtube.com/watch?v=vTqrSMrVW3w)
  
- [National Center on Disability and Journalism: Disability Language Style Guide](https://ncdj.org/style-guide/)