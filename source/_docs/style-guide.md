---
title: Pantheon Documentation Style Guide.
description: Formatting rules and guidelines for Pantheon's open-source documentation.
---


All documentation repositories should adhere to a [style guide](https://en.wikipedia.org/wiki/Style_guide){.external}. This document serves to define and detail the style conventions used in Pantheon's Documentation.

## Docs versus Guides

Pantheon offers two main types of reference material; **docs** and **guides**. Docs are generally shorter, used to explain concepts and conventions, and help define tools and processes. Guides are longer format, designed to guide the reader through a specific process to an end goal.

## Formatting In Copy

**Copy** is anything that isn't a code block, command, or output snippet. It's text, like this, that describes and instructs the reader.

Start with an introduction to concisely explain the purpose of the document. You can follow that with a **Before You Begin** section, or a definition list of new terms.

### Voice, Style, and Flow

Some General Rules:

 - [Avoid be verbs](http://writing.rocks/to-be-or-not-to-be/)
 - Avoid colloquialisms and personal opinions, feelings, or anecdotes. Use an informal but succinct tone.
 - Only assume as much knowledge from the reader as specified in the Before You Begin section. Otherwise explain everything.


### Example Variables

If your writing a document that will use one or more example variables the reader must replace when following along, you should explicitly define them at the top. For example:


<hr>

Replace all instances of `examplesite` with your site name as it appears on the Pantheon Site Dashboard in the commands below.

<hr>

### New Terms

When defining a single term, you can highlight it in bold text, as we did above in the [Formatting In Copy](#formatting-in-copy) section. For a doc that introduces several new terms or concepts, use a definition list:


<table class="table table-condensed table-bordered">
    <thread class="thread-inverse">
      <tr>
        <th>Markdown</th>
        <th>Rendered</th>
      </tr>
    </thread>
    <tbody>
      <tr markdown="1">
        <td>
```html
<dl>
<dt>Term</dt>
<dd>Definition.</dd>
<dt>Another Term</dt>
<dd>Description of the new term.</dd>
</dl>
```
        </td>
        <td>
        <dl>
        <dt>Term</dt>
        <dd>Definition.</dd>
        <dt>Another Term</dt>
        <dd>Description of the new term.</dd>
        </dl>
      </tr>
    </tbody>
</table>



### Emphasis

Emphasis should *always* be stressed with italics, and *never* with bold.

### Hyperlinks

Barring certain exceptions, links are handled with markdown, in the following format:

```markdown
[Link Text](https://example.com)
```

#### Internal Links

Links to other Pantheon docs are truncated. For example, a link to our [Quick Start](/docs/guides/quickstart/) guide should point to `/docs/guides/quickstart/`.

#### External Links

Links to external resources should have `{.external}` at the end:

```
![Wikipedia entry on Style guide](https://en.wikipedia.org/wiki/Style_guide){.external}
```

Which is rendered as: [Wikipedia entry on Style guide](https://en.wikipedia.org/wiki/Style_guide){.external}

<div class="alert alert-info">
<h4 class="info">Note</h4><p markdown="1">
We do not specify a target tab or window for external, or any other links, leaving the viewer the option to open in a new tab.
</p>
</div>

## Code Snippets, Commands, File Excerpts & Variables


We use specific formatting to differentiate command line arguments, file excerpts, and terminal output.

### Terminal Commands and Output

There are two ways to identify code and/or command line input/output:

1. Inline code excerpts using backticks, `like this`:

        Inline unformatted text, `like this`:

    Which are used for:


    - File names
    - Commands
    - Variables

2. Code fences:

    <table class="table table-condensed table-bordered">
      <thread class="thread-inverse">
        <tr>
          <th>Markdown</th>
          <th>Rendered</th>
        </tr>
      </thread>
      <tbody>
        <tr markdown="1">
          <td>
        <pre><code data-lang="hljs markdown">```bash
    terminus site:create myawesomesite
    ```</code></pre>
          </td>
          <td>
        ```bash
        terminus site:create myawesomesite
        ```
          </td>
        </tr>
      </tbody>
    </table>


Terminal examples should not include bash prompts in the copy. The output of succesful terminal commands, which do not need to be copied or searched, can be included as [screenshots](#screenshots)


#### Syntax Highlighting

When using code fences, you can manually identify the language used within for our lexer to highlight. In the example above I've specified `php`. You can see all supported languages at [highlight.js](https://highlightjs.org/).

#### Comments in Code

Most of the code snippets in our documentation is PHP. Good code is also documented with comments explaining the purpose of the block or snippet. Multiline comments should be encapsulated in a comment block, as shown below:

```php
/*
* This is an example comment, documenting the purpose of
* the code to follow, and defining any variables the user
* must manually edit.
*/
```


## Callouts and Tabs

There are two types of callouts used in our docs, notes and warnings.

### Notes

<table class="table table-condensed table-bordered">
    <thread class="thread-inverse">
      <tr>
        <th>Markdown</th>
        <th>Rendered</th>
      </tr>
    </thread>
    <tbody>
      <tr markdown="1">
        <td>
```
<div class="alert alert-info">
<h4 class="info">Note</h4><p markdown="1">
Notes should identify important pieces of information the reader shouldn't miss.
</p>
</div>
```
        </td>
        <td>
        <div class="alert alert-info">
        <h4 class="info">Note</h4><p markdown="1">
        Notes should identify important pieces of information the reader shouldn't miss.
        </p>
        </div>
      </tr>
    </tbody>
</table>

### Warnings


<table class="table table-condensed table-bordered">
    <thread class="thread-inverse">
      <tr>
        <th>Markdown</th>
        <th>Rendered</th>
      </tr>
    </thread>
    <tbody>
      <tr markdown="1">
        <td>
```
<div class="alert alert-danger" role="alert">
<h4 class="info">Warning</h4><p markdown="1">
Warnings cover information critical to the reader, and highlight potential dangers, especially those that can cause data loss.
</p>
</div>
```
        </td>
        <td>
        <div class="alert alert-danger" role="alert">
        <h4 class="info">Warning</h4>
        <p markdown="1">
        Warnings cover information critical to the reader, and highlight potential dangers, especially those that can cause data loss.
        </p>
        </div>
      </tr>
    </tbody>
</table>


### Tabs

When working on a document that will cover steps for multiple CMSs, use tabs when possible to condense instructions that need duplication for the different applications.

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
    Here's our WordPress specific command:
    ```
    terminus blah blah wordpress
    ```
    </div>

    <!-- 2nd pane content -->
    <div role="tabpanel" class="tab-pane" id="tab-2-anchor" markdown="1">
    Here's our Drupal 8 specific command:
    ```
    terminus yadda yadda drupal-8
    ```
    </div>

    <!-- 3rd pane content -->
    <div role="tabpanel" class="tab-pane" id="tab-3-anchor" markdown="1">
    Here's our Drupal 8 specific command:
    ```
    terminus bloop bleep drupal-7
    ```
    </div>
</div>


## Screenshots

Screenshots are used to reference GUI instructions. Screenshots of terminal commands should *not* be used, only output. Please submit screenshots without lines, circles, arrows, or other callouts added to them.


## Panels

Expandable panels can be used for extraneous but useful information, troubleshooting sections, or any other block of information you want to include, but would be too long or can be skipped over by a large portion of readers. You can use the source of the empty panel below as a template.

<div class="panel panel-drop panel-guide" id="accordion">
  <div class="panel-heading panel-drop-heading">
    <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#unique-anchor"><h3 class="info panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-wrench"></span> Panel Title</h3></a>
  </div>
  <div id="unique-anchor" class="collapse" markdown="1" style="padding:10px;">
  ### Panel Content Header

  Note that the panel content header is also used in the table of contents.

  </div>
</div>

## See Also

If you can, end your doc with links to external resources that the reader can use to improve the reader's comprehension, or to guides on logical next steps in a common development workflow.

 - [An internal guide with a relative link](/docs/get-started)
 - [An external guide with a full URL](http://writing.rocks/)
