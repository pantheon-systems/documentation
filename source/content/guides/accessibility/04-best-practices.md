---
title: Optimize Your Site for Accessibility
subtitle: Best Practices
description: Best practices when building an accessible site.
tags: [accessibility, workflow, SEO]
contributors: [carolyn-shannon, wordsmither]
reviewed: "2022-06-01"
layout: guide
showtoc: true
permalink: docs/guides/accessibility/best-practices
anchorid: accessibility/best-practices
editpath: accessibility/04-best-practices.md
contenttype: guide
categories: [optimize]
newcms: [drupal, drupal7, drupal8, drupal9, drupal10, wordpress]
audience: [agency, business, development]
product: []
integration: []
---

This section provides an overview of accessibility best practices.

## Tables

- **Layout tables** (tables that are used to give the effect of columns) are not considered best practice by the The World Wide Consortium, as they reduce accessibility across multiple different interfaces and devices. Layout tables can be difficult for screen readers to comprehend, therefore complicating accessibility.  Although layout tables may seem easier to implement, the impact to accessibility and to overall site usage is considerable, and they should be avoided at all costs. 

- **Data tables** are still appropriate for presenting information in two dimensions.

Refer to [Deque University's Tables](https://dequeuniversity.com/checklists/web/tables) page for more information.

## Links

Don’t use the `title` attribute in links, as it is not read aloud by screen readers. Instead, make the anchor text relevant and descriptive (for example, don’t use “click here”). Refer to this article on [writing hyperlinks](https://www.nngroup.com/articles/writing-links/) from Nielsen Norman Group for more information.

## HTML

### Semantic HTML

Using Semantic HTML regions and logical heading order in page construction are best practices that significantly improve the operability and navigation of a site or application. 

### HTML Controls and ARIA Roles

Use native HTML elements such as `<button>` (rather than `<div role="button">`) whenever possible, to simplify development. HTML elements have built-in handlers for receiving focus and activation that ensure they will work for those relying on keyboard navigation without additional scripting.

## Media

### Alternative Text Descriptions

The `alt` attribute describes the appearance or function of an image, and is presented as alternate text for an image if the image cannot be displayed. The [Alt text decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/) helps determine when you should use alternative text.

- Non-decorative images: use `alt="description of the image"` attributes for all non-decorative images. 

- Decorative images: Include an empty `alt=""` attribute. Or, you can use `aria-hidden="true"`. For example: `<img src='/img/mybackgroundimage.png' alt="" aria-hidden="true" />`

Refer to [Alt Text](https://moz.com/learn/seo/alt-text) from Moz for more information.

### Video Subtitles, Captions, and Transcripts

- Subtitles translate the speech on-screen to text. They are generally designed for viewers who can hear but do not understand the language in the video.
- Captions transcribe both speech and additional audio cues like “knock on the door.” They are designed for viewers who cannot hear the audio in the video.  
- Basic transcripts relay the spoken dialogue within the video. They are used by people who are deaf, hearing-impaired or have difficulty processing auditory information.
- Descriptive transcripts include all the audio and visual information a non-disabled user would get from watching the video. They are specifically designed for people who are both deaf and blind.

<Alert title="Note" type="info" >

Automatic captions and transcripts are not sufficient to meet accessibility requirements. 

</Alert>

### Safer Digital Animations and GIFs

The choices you make around animation directly impacts how your site affects people with motion sensitivities. Knowing what kinds of motion are potentially triggering, and how we can mitigate them, allows you to create experiences that are safe for your audience and won’t cause unintended harm. 

Applying inclusive design principles to the animations and transitions we use, on websites, images, presentations, and even icons, removes barriers to those users interacting with your content, and can significantly improve the experience for many others.

For web page and application designs, add user controls that allow users to reduce motion or turn it off completely. Controls and applications that do this make use of the CSS media feature `prefers-reduced-motion`, and automatically provide a reduced motion alternative (or turn motion off). 

However, GIFs and animated emojis are generally not impacted by reduced motion media query-based controls, so some additional steps are needed. 

- Use the media queries, and for reduced motion, substitute a still image for those who prefer reduced motion. 

- Use a button to control the animation. Chris Coyier has a good write-up on [progressive enhancement for accessible GIFs](https://css-tricks.com/gifs-and-prefers-reduced-motion/) using the `<picture>` element for React.

## Color and Contrast

<p>[<dfn id="508">Section 508</dfn>](https://www.section508.gov/), which aligns with WCAG 2.0 Level AA, sets a legal standard for the contrast level necessary between text and its background. The baseline AA contrast standard is 4.5:1 for most text and 3:1 for large text (19px+ bold or 24px+ normal text).</p>

The [US Web Design System (USWDS)](https://designsystem.digital.gov/) guidelines offer the following advice:

- Color contrast helps colorblindness and color perception.

- Avoiding pure black text on white helps those with dyslexia, Irlen Syndrome, light sensitivity, and autism.

- The best combination is the max color contrast of white/light text on black/dark background, which seems to visually work well for all.

## Inclusive Language

Even with the best of intentions, choices in words may exclude visitors. Terms and phrases may have an origin or make a reference of which you're not aware, and can be harmful to others. Or, phrases may present a reading level barrier for those from different backgrounds.

When creating content, review it for examples of language that may exclude your visitors by testing, using inclusive language linting and readability scoring tools, and then copy editing to include alternatives.

Refer to the [Resources](/guides/accessibility/resources#inclusive-language) page in this guide to help you write using inclusive language.