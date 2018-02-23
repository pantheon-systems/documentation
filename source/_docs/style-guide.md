---
title: Style Guide
description: Formatting rules and guidelines for Pantheon's open-source documentation.
contributors: [alexfornuto, rachelwhitton]
---

All documentation repositories should adhere to a [style guide](https://en.wikipedia.org/wiki/Style_guide){.external}. This document serves to define and detail the style conventions used in Pantheon's Documentation.


## Content Types
The site features two distinct content types; **docs** and **guides**. We define docs as reference materials used to explain the behavior and intended use of Pantheon's platform features and service offerings. Guides are generally paginated and designed to walk the reader through a specific concept or task.

## Voice, Style, and Flow
Some General Rules:

- [Avoid be verbs](http://writing.rocks/to-be-or-not-to-be/).
- Avoid colloquialisms and personal opinions, feelings, or anecdotes. Use an informal but succinct tone.
- Only assume as much knowledge from the reader as specified in the Before You Begin section. Otherwise explain everything.

## Frontmatter
Meta data for a doc or guide is created in a section referred to as frontmatter. It lives at the very top of the file and is wrapped in three dashes.
<div class="style-example" markdown="1">
<h1 style="margin-bottom:10px;margin-top:0px;"class="pio-docs-title">Style Guide</h1>
<p class="article-subhead">Formatting rules and guidelines for Pantheon&#039;s open-source documentation.</p>
<p><small><i class="fa fa-users"></i> Contributors:                                                     <a href="/docs/contributors/alexfornuto" title="alexfornuto">Alex Fornuto</a>,
<a href="/docs/contributors/rachelwhitton" title="rachelwhitton">Rachel Whitton</a>
</small></p>
<hr class="source-code">
```html
---
title: Style Guide
description: Formatting rules and guidelines for Pantheon's open-source documentation.
contributors: [alexfornuto, rachelwhitton]
---
```
</div>

### Early Access
<div class="style-example" markdown="1">
<div id="earlyaccessoutter" class="alert devbar alert-dismissible" role="alert" style="border: 1px solid #B5C0C3;border-radius: 4px;">
 <button type="button" class="close" data-dismiss="alert" aria-label="Close" data-original-title="" title=""><span aria-hidden="true">×</span></button>
 <h3 class="devbar info">Early Access Doc</h3>
 <p class="devbar">The documentation on this page discusses features and options that are not available across the entire platform.</p>
</div>
<h1 style="margin-bottom:10px;margin-top:0px;"class="pio-docs-title">Create a Custom Upstream</h1>
<p class="article-subhead">Connect a remote repository with Pantheon to use as a starting point for new sites.</p>
<hr class="source-code">
```html
---
title: Create a Custom Upstream
description: Connect a remote repository with Pantheon to use as a starting point for new sites.
tags: [tools, workflow]
earlyaccess: true
earlynote: The documentation on this page discusses features and options that are not available across the entire platform.
---
```
</div>

## Before You Begin

This section should outline any steps or services required before starting those in the doc. If there are other docs that should be completed first, list them here.

<div class="style-example" markdown="1">
## Before You Begin {.info}
To get started, you need to activate [New Relic APM Pro](/docs/new-relic/) on Pantheon:

1. Navigate to the **<span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Live** environment in your Site Dashboard, and click **<span class="glyphicons glyphicons-eye-open" aria-hidden="true"></span> New Relic**.
2. Click the **Activate New Relic Pro** button.
3. Use the **<span class="glyphicons glyphicons-new-window-alt" aria-hidden="true"></span> Visit Live Site** and browse your site for a few minutes to generate data in New Relic:

  ![New Relic Enable and Generate Data](/source/docs/assets/images/pagerduty/new-relic-generate-data.png)

<hr class="source-code">
```markdown
## Before You Begin
To get started, you need to activate [New Relic APM Pro](/docs/new-relic/) on Pantheon:

1. Navigate to the **<span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Live** environment in your Site Dashboard, and click **<span class="glyphicons glyphicons-eye-open" aria-hidden="true"></span> New Relic**.
2. Click the **Activate New Relic Pro** button.
3. Use the **<span class="glyphicons glyphicons-new-window-alt" aria-hidden="true"></span> Visit Live Site** and browse your site for a few minutes to generate data in New Relic:

  ![New Relic Enable and Generate Data](/source/docs/assets/images/pagerduty/new-relic-generate-data.png)
```
</div>

### Export Local Environment Variables
Be kind. If you're writing a guide that will use one or more example variables the reader must replace when following along, you should walk them through exporting them to local environment variables.
<div class="style-example" markdown="1">
Export local environment variables to define your site name and Multidev environment to easily copy and paste example commands in the next sections (replace `pantheon-d8-composer-project`):
<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#export-var1">Copy</button>
  <figure><pre id="export-var1"><code class="command bash" data-lang="bash">export SITE=pantheon-d8-composer-project
  export ENV=pr-slogan</code></pre></figure>
</div>
<hr class="source-code">
```html
Export local environment variables to define your site name and Multidev environment to easily copy and paste example commands in the next sections (replace `pantheon-d8-composer-project`):
<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#export-var1">Copy</button>
  <figure><pre id="export-var1"><code class="command bash" data-lang="bash">export SITE=pantheon-d8-composer-project
  export ENV=pr-slogan</code></pre></figure>
</div>
```
</div>


## Typography
### Headings
<div class="style-example" markdown="1">
# Page Title {.info}
## Header {.info}
### Sub Header {.info}
#### FAQs {.info}
<hr class="source-code">
```markdown
# Page Title
## Header
### Sub Header
#### FAQs
```
</div>

### Bold

Bold is used for navigational elements within a given interface:

<div class="style-example" markdown="1">
Go to **Account** > **Secutiry** > **Personal Access Tokens**.
<hr class="source-code">
```markdown
Go to **Account** > **Secutiry** > **Personal Access Tokens**.
```
</div>

Bold is also used when defining new terms, in cases where the [Definition List](#definition-list) doesn't fit:

<div class="style-example" markdown="1">
**Transport Layer Security** (TLS) refers to a set of cryptographic security protocols used to encrypt network traffic.
<hr class="source-code">
```markdown
**Transport Layer Security** (TLS) refers to a set of cryptographic security protocols used to encrypt network traffic.
```
</div>

### Italics
<div class="style-example" markdown="1">
Emphasis should *always* be stressed with italics, and *never* with bold.
<hr class="source-code">
```markdown
Emphasis should *always* be stressed with italics, and *never* with bold.
```
</div>

### Definition List
<div class="style-example" markdown="1">
<dl>
<dt>Term</dt>
<dd>Definition.</dd>
<dt>Another Term</dt>
<dd>Description of the new term.</dd>
</dl>
<hr class="source-code">
```html
<dl>
  <dt>Term</dt>
    <dd>Definition.</dd>
  <dt>Another Term</dt>
    <dd>Description of the new term.</dd>
</dl>
```
</div>
### Hyperlinks
Do not specify a target tab or window for external, or any other links, leaving the viewer the option to open in a new tab.

#### Internal Links
Use relative paths when linking to other pages of the docs site.
<div class="style-example" markdown="1">
[Quick Start](/docs/guides/quickstart/)
<hr class="source-code">
```markdown
[Quick Start](/docs/guides/quickstart/)
```
</div>

#### External Links
<div class="style-example" markdown="1">
[Wikipedia entry on Style guide](https://en.wikipedia.org/wiki/Style_guide){.external}
<hr class="source-code">
```markdown
[Wikipedia entry on Style guide](https://en.wikipedia.org/wiki/Style_guide){.external}
```
</div>

## Code
### Inline
Used for file names, variables, commands, and output, inline within paragraphs:

<div class="style-example" markdown="1">
Inline code styling using backticks, like `$EXAMPLE`.
<hr class="source-code">
```markdown
Inline code styling using backticks, like `$EXAMPLE`.
```
</div>
### Blocks
<div class="style-example" markdown="1">
```php
/**
* Example Comment
*
* To provide additional context for the following
* code, and defining any variables the user must
* manually edit.
**/
if (!function_exists('install_drupal')) {
  $conf['preprocess_css'] = 1;
}
```
<hr class="source-code">
<pre><code class="hljs html">```php
/**
* Example Comment
*
* To provide additional context for the following
* code, and defining any variables the user must
* manually edit.
**/
if (!function_exists('install_drupal')) {
  $conf['preprocess_css'] = 1;
}
```</code></pre>
</div>

### Commands
Use the copy button when you provide a command you expect the reader to execute on their local terminal.
<div class="style-example" markdown="1">
Once the build finishes from the last step, active your new theme and rebuild the cache:

<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-drupal-theme-install">Copy</button>
  <figure><pre id="terminus-drupal-theme-install"><code class="command bash" data-lang="bash">terminus drupal $SITE.$ENV -- theme:install --set-default amazing_theme</code></pre></figure>
</div>
<hr class="source-code">
```html
Once the build finishes from the last step, active your new theme and rebuild the cache:

<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-drupal-theme-install">Copy</button>
  <figure><pre id="terminus-drupal-theme-install"><code class="command bash" data-lang="bash">terminus drupal $SITE.$ENV -- theme:install --set-default amazing_theme</code></pre></figure>
</div>
```
</div>

## Callouts
There are two types of callouts used in our docs, notes and warnings:

### Notes
<div class="style-example" markdown="1">
<div class="alert alert-info" role="alert">
  <h4 class="info">Note</h4>
  <p markdown="1">Notes should identify important pieces of information the reader shouldn't miss.</p>
</div>
<hr class="source-code">
```html
<div class="alert alert-info" role="alert">
  <h4 class="info">Note</h4>
  <p markdown="1">Notes should identify important pieces of information the reader shouldn't miss.</p>
</div>
```
</div>

### Warnings
<div class="style-example" markdown="1">
<div class="alert alert-danger" role="alert">
  <h4 class="info">Warning</h4>
  <p markdown="1">Warnings cover information critical to the reader, and highlight potential dangers, especially those that can cause data loss.</p>
</div>
<hr class="source-code">
```html
<div class="alert alert-danger" role="alert">
  <h4 class="info">Warning</h4>
  <p markdown="1">Warnings cover information critical to the reader, and highlight potential dangers, especially those that can cause data loss.</p>
</div>
```
</div>

## Tabs
When working on a document that will cover steps for multiple CMSs, use tabs when possible to condense instructions that need duplication for the different applications.

<div class="style-example" markdown="1">
<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
    <!-- Active tab -->
    <li id="tab-1-id" role="presentation" class="active"><a href="#tab-1-anchor" aria-controls="tab-1-anchor" role="tab" data-toggle="tab">WordPress</a></li>

    <!-- 2nd Tab Nav -->
    <li id="tab-2-id" role="presentation"><a href="#tab-2-anchor" aria-controls="tab-2-anchor" role="tab" data-toggle="tab">Drupal 8</a></li>

    <!-- 3rd Tab Nav -->
    <li id="tab-3-id" role="presentation"><a href="#tab-3-anchor" aria-controls="tab-3-anchor" role="tab" data-toggle="tab">Drupal 7</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
    <!-- Active pane content -->
    <div role="tabpanel" class="tab-pane active" id="tab-1-anchor" markdown="1">
    Here's our WordPress specific copy, and an example snippet:
    ```php
    /**
     * Some WordPress specific thing
     *
     */
    ```
    </div>

    <!-- 2nd pane content -->
    <div role="tabpanel" class="tab-pane" id="tab-2-anchor" markdown="1">
    Here's our Drupal 8 specific copy, and an example snippet:
    ```php
    /**
     * Some Drupal 8 specific thing
     *
     */
    ```
    </div>

    <!-- 3rd pane content -->
    <div role="tabpanel" class="tab-pane" id="tab-3-anchor" markdown="1">
    Here's our Drupal 7 specific copy, and an example snippet:
    ```php
    /**
     * Some Drupal 7 specific thing
     *
     */
    ```
    </div>
</div>
<hr class="source-code">
```html
<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <!-- Active tab -->
  <li id="tab-1-id" role="presentation" class="active"><a href="#tab-1-anchor" aria-controls="tab-1-anchor" role="tab" data-toggle="tab">WordPress</a></li>

  <!-- 2nd Tab Nav -->
  <li id="tab-2-id" role="presentation"><a href="#tab-2-anchor" aria-controls="tab-2-anchor" role="tab" data-toggle="tab">Drupal 8</a></li>

  <!-- 3rd Tab Nav -->
  <li id="tab-3-id" role="presentation"><a href="#tab-3-anchor" aria-controls="tab-3-anchor" role="tab" data-toggle="tab">Drupal 7</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <!-- Active pane content -->
  <div role="tabpanel" class="tab-pane active" id="tab-1-anchor" markdown="1">
    Here's our WordPress specific copy, and an example snippet:
    ```php
    /**
     * Some WordPress specific thing
     *
     */
    ```
  </div>

  <!-- 2nd pane content -->
  <div role="tabpanel" class="tab-pane" id="tab-2-anchor" markdown="1">
    Here's our Drupal 8 specific copy, and an example snippet:
    ```php
    /**
     * Some Drupal 8 specific thing
     *
     */
    ```
  </div>

  <!-- 3rd pane content -->
  <div role="tabpanel" class="tab-pane" id="tab-3-anchor" markdown="1">
    Here's our Drupal 7 specific copy, and an example snippet:
    ```php
    /**
     * Some Drupal 7 specific thing
     *
     */
    ```
  </div>
</div>
```
</div>


## Screenshots
Submit screenshots without additional markup. Don't use Skitch to add an arrow, for example.

### GUI
Screenshots are used to reference GUI instructions:
<div class="style-example" markdown="1">
![Alt text describing the image](/source/docs/assets/images/dashboard/terminus-cli-code-to-commit-dashboard.png)
<hr class="source-code">
```markdown
![Alt text describing the image](/source/docs/assets/images/dashboard/terminus-cli-code-to-commit-dashboard.png)
```
</div>

### Terminal
Terminal screenshots should only be used to demonstrate intended output:
<div class="style-example" markdown="1">
![Alt text describing the image](/source/docs/assets/images/pr-workflow/composer-require-pathauto.png)
<hr class="source-code">
```markdown
![Alt text describing the image](/source/docs/assets/images/pr-workflow/composer-require-pathauto.png)
```
</div>

## Panels
Use panels for extraneous but useful information such as troubleshooting sections or pro tips that would be distracting or can be skipped over by a large portion of readers. This is primarily used in an effort to promote readability of a page.

<div class="style-example" markdown="1">
<div class="panel panel-drop panel-guide" id="accordion">
  <div class="panel-heading panel-drop-heading">
    <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#unique-anchor">
      <h3 class="info panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-wrench"></span> Panel Title</h3>
    </a>
  </div>
  <div id="unique-anchor" class="collapse" markdown="1" style="padding:10px;">
  ### Panel Content Header {.info}

  Note that the info class is required to keep the content header out of the table of contents.
  </div>
</div>
<hr class="source-code">
```html
<div class="panel panel-drop panel-guide" id="accordion">
  <div class="panel-heading panel-drop-heading">
    <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#unique-anchor">
      <h3 class="info panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-wrench"></span> Panel Title</h3>
    </a>
  </div>
  <div id="unique-anchor" class="collapse" markdown="1" style="padding:10px;">
  ### Panel Content Header {.info}

  Note that the info class is required to keep the content header out of the table of contents.
  </div>
</div>
```
</div>


## See Also

This is the optimal place to provide links to external resources on the subject, or internal docs on common processes to follow after completing those above.

<div class="style-example" markdown="1">
## See Also {.info}
- [An internal link](/docs/guides/)
- [An external link](https://pantheon.io/blog/){.external}
<hr class="source-code">
```markdown
## See Also
- [An internal link](/docs/guides/)
- [An external link](https://pantheon.io/blog/){.external}
```
</div>
