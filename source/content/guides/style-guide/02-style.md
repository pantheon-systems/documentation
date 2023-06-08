---
title: Style Guide
subtitle: Style
description: How we write.
contributors: [wordsmither]
showtoc: true
permalink: docs/guides/style-guide/style
contenttype: [guide]
innav: [false]
categories: [help]
cms: [--]
audience: [--]
product: [--]
integration: [--]
---


## Voice, Style, and Flow

Some General Rules:

- Only assume as much knowledge from the reader as specified in the Before You Begin section. Otherwise explain everything.
- [Avoid be verbs](http://writing.rocks/to-be-or-not-to-be/).
- Avoid personal opinions, feelings, or anecdotes. Use an informal but succinct tone.
- Use [Inclusive Language](/inclusive-language), avoid colloquialisms and hyperbole.
- Use [title case](https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case) for section headings.


## Terminology

- Personal Workspace: a user's personal work area, containing sites/settings specific to that user.
- Professional Workspace: (formerly Organization) a feature set for a collection of users or sites.
- Site Dashboard: the page the user gets when selecting a site from the **Sites** tab in a Workspace
- Supporting Workspace: (formerly Supporting Organization): a Professional Workspace that's been added to a specific site's Team.

## Variables

When writing multi-step processes, repeated variables and constants should be defined before providing the first set of commands. If the doc has a "Before You Begin" section, define varables here. Provide them using the callout below, and follow common conventions (lowercase for variables, uppercase for constants).

<Example>

<Alert title="Exports" type="export">

This process uses [Terminus](/terminus) extensively. Before we begin, set the variables `$site` and `$env` in your terminal session to match your site name and the Dev environment:

```bash{promptUser: user}
export site=yoursitename
export env=dev
```

</Alert>

<hr className="source-code" /> <br/>

````markdown
<Alert title="Exports" type="export">

This process uses [Terminus](/terminus) extensively. Before we begin, set the variables `$site` and `$env` in your terminal session to match your site name and the Dev environment:

```bash{promptUser: user}
export site=yoursitename
export env=dev
```

</Alert>
````

</Example>

## Dummy Text

Documentation IP set: specifically reserved for documentation (Reserved IP addresses):

```
203.0.113.0–203.0.113.255
```

Pantheon

- Organization: Anita Agency

- Site name: Anita Drupal


## Accessibility

Refer our [Accessibility Guide](https://docs.pantheon.io/guides/accessibility) for details.