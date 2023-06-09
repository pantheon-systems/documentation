---
title: Style Guide
subtitle: Markdown
description: Markdown standards.
contributors: [wordsmither]
reviewed: "2023-06-09" 
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

## Bold

Bold is used for navigational elements within a given interface:

<Example>

Go to **Account** > **Security** > **Personal Access Tokens**.

<hr className="source-code" /> <br/>

```markdown
Go to **Account** > **Security** > **Personal Access Tokens**.
```

</Example>

## Code Samples

### Export Local Environment Variables

Be kind. If you're writing a guide that will use one or more example variables the reader must replace when following along, you should walk them through exporting them to local environment variables. See [Variables](/guides/style-guide/style#variables) for more details.

### Inline

Used for file names, variables, commands, and output, inline within paragraphs:

<Example>

Inline code styling using backticks, like `$EXAMPLE`.

<hr className="source-code" /> <br/>

```markdown
Inline code styling using backticks, like `$EXAMPLE`.
```

</Example>

### Blocks

<Example>

```php
if (!function_exists('install_drupal')) {
  $conf['preprocess_css'] = 1;
}
```

<hr className="source-code" /> <br/>

````markdown
```php
if (!function_exists('install_drupal')) {
  $conf['preprocess_css'] = 1;
```

````

</Example>

### File Excerpts

File excerpts are [code blocks](#blocks) with a file name specified after the syntax as `:title=FILENAME`:

<Example>

```git:title=.gitignore
# WordPress #
############
wp-config-local.php
wp-cli.local.yml
wp-content/uploads
wp-content/blogs.dir/
wp-content/upgrade/
```


<hr class="source-code" /> <br />

````markdown
```git:title=.gitignore
# WordPress #
############
wp-config-local.php
wp-cli.local.yml
wp-content/uploads
wp-content/blogs.dir/
wp-content/upgrade/
```
````

</Example>

### Shell Prompts

You can also define a single line code block as a command:

<Example>

```bash{promptUser: user}
mkdir -p ~/repos/mdx-slug
```

<hr className="source-code" /> <br/>

````markdown
```bash{promptUser: user}
mkdir -p ~/repos/mdx-slug
```
````

</Example>

Or define which lines are output:

<Example>

```bash{outputLines:2-6}
ls  -1 ~/repos
documentation
i3lock-color
i3lock-fancy
j4-dmenu-desktop
mdx-slug
```

<hr className="source-code" /> <br/>

````markdown
```bash{outputLines:2-6}
ls  -1 ~/repos
documentation
i3lock-color
i3lock-fancy
j4-dmenu-desktop
mdx-slug
```
````

</Example>

### Line Highlighting
You can highlight a specific line in a code block the reader should focus on with `//highlight-line`, or a group with `//highlight-start` and `//highlight-end`:

<Example>

```bash{outputLines: 2-20}
curl -I dev.mysite.com
HTTP/1.1 200 OK
X-Pantheon-Styx-Hostname: styx1a
server: nginx/1.0.15
content-type: text/html; charset=utf-8
x-drupal-cache: MISS
//highlight-start
set-cookie: SESSf60876d132c0913e5fc728eec7f71e38=M1Sr0bxLbbgYmbg1EW7N8sGF4anrKP1np25EkYta-ZU; expires=Wed, 19-Dec-2012 22:04:58 GMT; path=/; domain=.dev.mysite.com; HttpOnly
Cache-Control: no-cache, must-revalidate, max-age=0
//highlight-end
last-modified: Mon, 26 Nov 2012 18:31:30 +0000
expires: Sun, 19 Nov 1978 05:00:00 GMT
x-pantheon-endpoint: c18646dd-aa2b-4faa-a4e3-d71ec3a5ce43
Date: Mon, 26 Nov 2012 18:31:38 GMT
X-Varnish: 486741958
Age: 0 //highlight-line
Via: 1.1 varnish
Connection: keep-alive
X-Pantheon-Edge-Server: 108.166.58.245
Vary: Accept-Encoding, Cookie
```

<hr class="source-code" /> <br />

````none
```bash{outputLines: 2-20}
curl -I dev.mysite.com
HTTP/1.1 200 OK
X-Pantheon-Styx-Hostname: styx1a
server: nginx/1.0.15
content-type: text/html; charset=utf-8
x-drupal-cache: MISS
//highlight-start
set-cookie: SESSf60876d132c0913e5fc728eec7f71e38=M1Sr0bxLbbgYmbg1EW7N8sGF4anrKP1np25EkYta-ZU; expires=Wed, 19-Dec-2012 22:04:58 GMT; path=/; domain=.dev.mysite.com; HttpOnly
Cache-Control: no-cache, must-revalidate, max-age=0
//highlight-end
last-modified: Mon, 26 Nov 2012 18:31:30 +0000
expires: Sun, 19 Nov 1978 05:00:00 GMT
x-pantheon-endpoint: c18646dd-aa2b-4faa-a4e3-d71ec3a5ce43
Date: Mon, 26 Nov 2012 18:31:38 GMT
X-Varnish: 486741958
Age: 0 //highlight-line
Via: 1.1 varnish
Connection: keep-alive
X-Pantheon-Edge-Server: 108.166.58.245
Vary: Accept-Encoding, Cookie
```
````

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

## Italics

<Example>

Emphasis should *always* be stressed with italics, and *never* with bold.

<hr className="source-code" /> <br/>

```markdown
Emphasis should *always* be stressed with italics, and *never* with bold.
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

## Tables

You can use markdown tables to describe availability based on service levels before providing instructions on how to enable or use a given feature. For example:

<Example>

<h2 class="toc-ignore">Enable Redis</h2>

All plans except for a Basic plan can use Redis. Redis is available to Sandbox site plans for developmental purposes, but Redis will not be available going live on a Basic plan.

| Plans         | Redis Support <Popover content="Available across all environments, including Multidevs." /> |
| ------------- | -------------------------------------- |
| Sandbox       | <span style="color:green">✔</span> |
| Basic         | ❌  |
| Performance   | <span style="color:green">✔</span> |
| Elite         | <span style="color:green">✔</span> |

<hr className="source-code" /> <br/>

```markdown
## Enable Redis

All plans except for a Basic plan can use Redis. Redis is available to Sandbox site plans for developmental purposes, but Redis will not be available going live on a Basic plan.

| Plans         | Redis Support <Popover content="Available across all environments, including Multidevs." /> |
| ------------- | -------------------------------------- |
| Sandbox       | <span style="color:green">✔</span> |
| Basic         | ❌  |
| Performance   | <span style="color:green">✔</span> |
| Elite         | <span style="color:green">✔</span> |
```

</Example>

Use ✓ to indicate yes and `❌` to indicate no.

Visit the [Markdown Tables Generator](https://www.tablesgenerator.com/markdown_tables) for help with creating nice-looking and well-formatted tables.

### Advanced Tables

Standard markdown tables don't allow for cells to span multiple rows or columns, but by using the [gatsby-remark-grid-tables](https://www.gatsbyjs.org/packages/gatsby-remark-grid-tables/) plugin, we can overcome this limitation:

<Example>

+-----------------+--------------+-------------+--------------+------------------------+
| **Environment** | **Severity** | **Browser** | **Watchdog** | **logs/php-error.log** |
+-----------------+--------------+-------------+--------------+------------------------+
|                 | notice       | **✓**       | **✓**        |                        |
|                 +--------------+-------------+--------------+------------------------+
| Dev             | warning      | **✓**       | **✓**        |                        |
|                 +--------------+-------------+--------------+------------------------+
|                 | error        | **✓**       |              |  **✓**                 |
+-----------------+--------------+-------------+--------------+------------------------+
|                 | notice       |             | **✓**        |                        |
+                 +--------------+-------------+--------------+------------------------+
| Test            | warning      |             | **✓**        |                        |
|                 +--------------+-------------+--------------+------------------------+
|                 | error        | **✓**       |              |  **✓**                 |
+-----------------+--------------+-------------+--------------+------------------------+
|                 | notice       |             | **✓**        |                        |
+                 +--------------+-------------+--------------+------------------------+
| Live            | warning      |             | **✓**        |                        |
|                 +--------------+-------------+--------------+------------------------+
|                 | error        |             |              |  **✓**                 |
+-----------------+--------------+-------------+--------------+------------------------+

<hr className="source-code" /> <br/>

````markdown
+-----------------+--------------+-------------+--------------+------------------------+
| **Environment** | **Severity** | **Browser** | **Watchdog** | **logs/php-error.log** |
+-----------------+--------------+-------------+--------------+------------------------+
|                 | notice       | **✓**       | **✓**        |                        |
|                 +--------------+-------------+--------------+------------------------+
| Dev             | warning      | **✓**       | **✓**        |                        |
|                 +--------------+-------------+--------------+------------------------+
|                 | error        | **✓**       |              |  **✓**                 |
+-----------------+--------------+-------------+--------------+------------------------+
|                 | notice       |             | **✓**        |                        |
+                 +--------------+-------------+--------------+------------------------+
| Test            | warning      |             | **✓**        |                        |
|                 +--------------+-------------+--------------+------------------------+
|                 | error        | **✓**       |              |  **✓**                 |
+-----------------+--------------+-------------+--------------+------------------------+
|                 | notice       |             | **✓**        |                        |
+                 +--------------+-------------+--------------+------------------------+
| Live            | warning      |             | **✓**        |                        |
|                 +--------------+-------------+--------------+------------------------+
|                 | error        |             |              |  **✓**                 |
+-----------------+--------------+-------------+--------------+------------------------+
````

</Example>
