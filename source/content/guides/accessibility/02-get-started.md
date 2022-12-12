---
title: Optimize Your Site for Accessibility
subtitle: Getting Started
description: How to integrate accessibility into new site builds, and audit existing sites.
contenttype: [guide]
categories: [--]
newcms: [--]
audience: [marketing, development]
product: [--]
integration: [--]
tags: [accessibility, workflow, SEO]
contributors: [wordsmither]
reviewed: "2022-06-01"
layout: guide
showtoc: true
permalink: docs/guides/accessibility/get-started
anchorid: accessibility/get-started
editpath: accessibility/02-get-started.md
---

Making your site accessible doesn't just happen - you have to lay the groundwork and constantly assess your site.

## Identify WCAG Conformance Targets

Start by identifying your target level of conformance to the Web Content Accessibility Guidelines. There are three levels of compliance:
- Level A: the most basic features
- Level AA: covers the largest and most common barriers 
- Level AAA: the highest and most complex level 

The generally accepted target for accessibility is the latest version of [Web Content Accessibility Guidelines (WCAG) Level AA](https://www.w3.org/WAI/standards-guidelines/wcag/). This may already be the standard specified in your organizational policy, or it may be the legal requirement for your website.

## Build Compliant Sites

The start of a new site build is the easiest time to build a sustainably accessible site. To do so:

- Include accessibility in your site's brief and mission.
- Include accessibility tools and training in the project budget.
- Ensure everyone on the team is trained in basic usability principles, and that your UX Design team has substantial expertise in the area.
- Develop a color and architecture strategy up front - this can minimize accessibility issues down the line.
- Perform user testing early in the design process.
- Review and identify accessibility issues before launching your site.

## Make an Existing Site Compliant

To optimize an existing site for accessibility: 

1. Assess the site.

   There are a number of tools available to help create an inventory and assessment of the conformance of your existing site pages to WCAG guidelines. The [Web Accessibility Initiative](https://www.w3.org/WAI/test-evaluate/preliminary/) has a number of resources to help with this process.


2. Prioritize the changes you will make to maximize impact.

   Factors to consider when prioritizing fixes include:
   - Impact on users with disabilities: how much does the issue impact users?  Will they be unable to perform key tasks? 
   - Location of issue: is it on a high-traffic page?
   - Ease and speed of repair: is the fix easy, or will it require significant time and resources?
   - Repeating issues: Issues that turn up repeatedly can indicate issues with the underlying architecture, such as common code or templates. Fixing these underlying issues can significantly improve your test results.

3. Determine how you will test changes.

   Here are some testing options:
   - Choose an automated testing tool. Refer to the [Tools](/guides/accessibility/resources) section of this guide for suggestions.
   - While automated testing tools are useful, they can't cover all scenarios.  Therefore, manual testing is an important part of any testing plan. At the very least, manual testing should include both keyboard and screen reader testing. Stanford University offers a [helpful guide and downloadable checklist](https://uit.stanford.edu/accessibility/testing/manual-checks) to aid in manual testing.
   - Consider implementing a user testing program. User testing can not only be an effective tool in your accessibility arsenal, it is a terrific tool to assess the overall effectiveness of your site.  

## Maintain Compliance

Ensuring that your site is accessible is an ongoing job. After you have done the initial assessment, consider integrating accessibility into your development process. To do so:

- Train your entire project team on web accessibility.
- Implement testing tools that can be used during the development process. While there are free tools available to developers, consider investing in tools that reduce false positives and support agile development cycles.