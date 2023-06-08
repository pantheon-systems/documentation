---
title: Style Guide
subtitle: Markdown
description: Markdown standards.
contributors: [wordsmither]
reviewed: "2022-11-01" 
showtoc: true
permalink: docs/guides/style-guide/markdown
contenttype: [guide]
innav: [false]
categories: [help]
cms: [--]
audience: [--]
product: [--]
integration: [--]
---

All documentation uses Markdown to render headings and typographic elements like bold and italic. Note that a newline is required between HTML elements and content, so the Markdown renderer knows to format the content.

## Headings

Give heading levels a meaningful hierarchy to ensure accessible navigation and structure.

<Example>

<h1 class="toc-ignore">Page Title</h1>

<h2 class="toc-ignore">Header</h2>

<h3 class="toc-ignore">Sub Header</h3>

<h4 class="toc-ignore">Section not listed on TOC</h4>

<hr className="source-code" /> <br/>

```markdown
---
title: Page Title
---

## Header

### Sub Header
#### Section not listed on TOC
```

</Example>

## Bold

Bold is used for navigational elements within a given interface:

<Example>

Go to **Account** > **Security** > **Personal Access Tokens**.

<hr className="source-code" /> <br/>

```markdown
Go to **Account** > **Security** > **Personal Access Tokens**.
```

</Example>

## Italics

<Example>

Emphasis should *always* be stressed with italics, and *never* with bold.

<hr className="source-code" /> <br/>

```markdown
Emphasis should *always* be stressed with italics, and *never* with bold.
```

</Example>

## Definitions

<Example>

A <dfn id="dfn">dfn</dfn> tag is used to indicate that a paragraph is defining a new term.
New terms should only be defined once throughout the docs, and then cross-referenced.
Definitions and Definition Lists are automatically added to the [Glossary](/glossary).

<hr className="source-code" /> <br/>

```html
A <dfn id="dfn">dfn</dfn> tag is used to indicate that a paragraph is defining a new term.
New terms should only be defined once throughout the doc, and then cross-referenced.
Definitions and Definition Lists are automatically added to the [Glossary](/glossary).
```

</Example>

## Hyperlinks

Do not specify a target tab or window for external, or any other links, leaving the viewer the option to open in a new tab.

### Internal Links

Use relative paths when linking to other pages of the docs site.

<Example>

[Quick Start](/guides/quickstart)

<hr className="source-code" /> <br/>

```markdown
[Quick Start](/guides/quickstart)
```

</Example>

### External Links

<Example>

[Wikipedia entry on Style guide](https://en.wikipedia.org/wiki/Style_guide)

<hr className="source-code" /> <br/>

```markdown
[Wikipedia entry on Style guide](https://en.wikipedia.org/wiki/Style_guide)
```

</Example>

## Line Breaks and Spaces

  - Line breaks between components including between

    - the YAML and the content

    - headings and content

    - list items (sometimes - check the preview to see if more space would help)

- No trailing spaces.

- Each MD file ends with a blank line

- Spaces, not tabs! Each tab is two spaces or four sometimes
