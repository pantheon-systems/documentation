---
title: Style Guide
description: Formatting rules and guidelines for Pantheon's open-source documentation.
contributors: [alexfornuto, rachelwhitton]
---

All documentation repositories should adhere to a [style guide](https://en.wikipedia.org/wiki/Style_guide). This document serves to define and detail the style conventions used in Pantheon's Documentation.


## Content Types
The site features two distinct content types; **docs** and **guides**. We define docs as reference materials used to explain the behavior and intended use of Pantheon's platform features and service offerings. Guides are generally paginated and designed to walk the reader through a specific concept or task.

## Voice, Style, and Flow
Some General Rules:

- [Avoid be verbs](http://writing.rocks/to-be-or-not-to-be/).
- Avoid colloquialisms and personal opinions, feelings, or anecdotes. Use an informal but succinct tone.
- Only assume as much knowledge from the reader as specified in the Before You Begin section. Otherwise explain everything.

## Frontmatter
Meta data for a doc or guide is created in a section referred to as frontmatter. It lives at the very top of the file and is wrapped in three dashes.

<Example>

<h1 className="toc-ignore">Style Guide</h1>

<p className="article-subhead">Formatting rules and guidelines for Pantheon&#039;s open-source documentation.
</p>

<p>
<small>
<i className="fa fa-users"></i> Contributors:                                                     <a href="/docs/contributors/alexfornuto" title="alexfornuto">Alex Fornuto</a>, &nbsp;
<a href="/docs/contributors/rachelwhitton" title="rachelwhitton">Rachel Whitton</a>
</small>

</p>

<hr className="source-code" />

```html
---
title: Style Guide
description: Formatting rules and guidelines for Pantheon's open-source documentation.
contributors: [alexfornuto, rachelwhitton]
---
```

</Example>

## Before You Begin

This section should outline any steps or services required before starting those in the doc. If there are other docs that should be completed first, list them here.

Of particular note, any documentation that uses Terminus should reference it in this section, and link to the [Terminus Manual](/terminus/).

<Example>

## Before You Begin
Be sure that you have:

- An existing WordPress site on Pantheon, or [create](https://dashboard.pantheon.io/sites/create) one.
- A [local clone](/git/#clone-your-site-codebase) of your code repository.
- An account with [Amazon Web Services (AWS)](https://aws.amazon.com/s3/). Amazon offers [free access](https://aws.amazon.com/free/) to most of their services for the first year.
- [Terminus](/terminus) installed on your local computer.

<hr className="source-code" />

```markdown
## Before You Begin

Be sure that you have:

- An existing WordPress site on Pantheon, or [create](https://dashboard.pantheon.io/sites/create) one.
- A [local clone](/git/#clone-your-site-codebase) of your code repository.
- An account with [Amazon Web Services (AWS)](https://aws.amazon.com/s3/). Amazon offers [free access](https://aws.amazon.com/free/) to most of their services for the first year.
- [Terminus](/terminus) installed on your local computer.
```

</Example>

### Export Local Environment Variables
Be kind. If you're writing a guide that will use one or more example variables the reader must replace when following along, you should walk them through exporting them to local environment variables. See the [Variables](#variables) section below for more details.


## Typography
### Headings

<Example>

# Page Title

## Header

### Sub Header

#### Section not listed on TOC

<hr className="source-code" />

```markdown
# Page Title
## Header
### Sub Header
#### Section not listed on TOC
```

</Example>

### Bold

Bold is used for navigational elements within a given interface:

<Example>

Go to **Account** > **Security** > **Personal Access Tokens**.

<hr className="source-code" />

```markdown
Go to **Account** > **Security** > **Personal Access Tokens**.
```

</Example>

Bold is also used when defining new terms, in cases where the [Definition List](#definition-list) doesn't fit:

<Example>

**Transport Layer Security** (TLS) refers to a set of cryptographic security protocols used to encrypt network traffic.

<hr className="source-code" />

```markdown
**Transport Layer Security** (TLS) refers to a set of cryptographic security protocols used to encrypt network traffic.
```

</Example>

### Italics

<Example>

Emphasis should *always* be stressed with italics, and *never* with bold.

<hr className="source-code" />

```markdown
Emphasis should *always* be stressed with italics, and *never* with bold.
```

</Example>

### Definition List

<Example>

<dl>
<dt>Term</dt>
<dd>Definition.</dd>
<dt>Another Term</dt>
<dd>Description of the new term.</dd>
</dl>

<hr className="source-code" />

```html
<dl>

<dt>Term</dt>

<dd>Definition.</dd>

<dt>Another Term</dt>

<dd>Description of the new term.</dd>

</dl>
```

</Example>

### Hyperlinks
Do not specify a target tab or window for external, or any other links, leaving the viewer the option to open in a new tab.

#### Internal Links
Use relative paths when linking to other pages of the docs site.

<Example>

[Quick Start](/guides/quickstart/)

<hr className="source-code" />

```markdown
[Quick Start](/guides/quickstart/)
```

</Example>

#### External Links

<Example>

[Wikipedia entry on Style guide](https://en.wikipedia.org/wiki/Style_guide)

<hr className="source-code" />

```markdown
[Wikipedia entry on Style guide](https://en.wikipedia.org/wiki/Style_guide)
```

</Example>

## Code
### Inline
Used for file names, variables, commands, and output, inline within paragraphs:

<Example>

Inline code styling using backticks, like `$EXAMPLE`.

<hr className="source-code" />

```markdown
Inline code styling using backticks, like `$EXAMPLE`.
```

</Example>

### Blocks

<Example>

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

<hr className="source-code" />

<pre><code className="php">
```php
# This is a Windows-friendly symlink
require_once WP_CONTENT_DIR . '/plugins/wp-redis/object-cache.php';
```
</code></pre>

</Example>

### Variables

When writing multi-step processes, repeated variables and constants should be defined before providing the first set of commands. If the doc has a "Before You Begin" section, define varables here. Provide them using the callout below, and follow common conventions (lowercase for variables, uppercase for constants).

<Example>

<Alert title="Exports" type="export">

This process uses [Terminus](/terminus/) extensively. Before we begin, set the variables `$site` and `$env` in your terminal session to match your site name and the Dev environment:

```bash
export site=yoursitename
export env=dev
```

</Alert>

<hr className="source-code" />

<pre><code className="html"><Alert title="Exports" type="export">

This process uses [Terminus](/terminus/) extensively. Before we begin, set the variables `$site` and `$env` in your terminal session to match your site name and the Dev environment:

```bash
export site=yoursitename
export env=dev
```

</Alert></code></pre>

</Example>

## Callouts
There are two types of callouts used in our docs, notes and warnings:

### Notes

<Example>

<Alert title="Note" type="info" >

Notes should identify important pieces of information the reader shouldn't miss.

</Alert>

<hr className="source-code" />

```html
<Alert title="Note"  type="info" >

Notes should identify important pieces of information the reader shouldn't miss.

</Alert>
```

</Example>

### Warnings

<Example>

<Alert title="Warning" type="danger" >

Warnings cover information critical to the reader and highlight potential dangers, especially those that can cause data loss.

</Alert>

<hr className="source-code" />

```html
<Alert title="Warning" type="danger" >

Warnings cover information critical to the reader and highlight potential dangers, especially those that can cause data loss.

</Alert>
```

</Example>

### Success
Success callouts are used infrequently, usually in guides with specific end results expected. Use success callouts to differentiate between two binary results.

<Example>

<Alert title="Incorrect DNS Configuration" type="danger" icon="remove">

![Incorrect vanity domain CNAME required DNS value](../images/dashboard/wrong-vanity-cname-dns.png)

</Alert>

<Alert title="Correct DNS Configuration" type="success" icon="check">

![Correct vanity domain CNAME required DNS value](../images/dashboard/correct-vanity-cname-dns.png)

</Alert>

<hr className="source-code" />

```html
<Alert title="Incorrect DNS Configuration" type="danger" icon="remove">

![Incorrect vanity domain CNAME required DNS value](../images/dashboard/wrong-vanity-cname-dns.png)

</Alert>

<Alert title="Correct DNS Configuration" type="success" icon="check">

![Correct vanity domain CNAME required DNS value](../images/dashboard/correct-vanity-cname-dns.png)

</Alert>

```

</Example>

## Tabs
When working on a document that will cover steps for multiple CMSs, use tabs when possible to condense instructions that need duplication for the different applications.

<Example>

<TabList>

<Tab title="WordPress" id="wp-example" active={true}>

Here's our WordPress specific copy, and an example snippet:

```php
/**
  * Some WordPress specific thing
  *
  */

Code goes here.
```

</Tab>

<Tab title="Drupal 8" id="d8-example">

Here's our Drupal 8 specific copy, and an example snippet:

```php
/**
  * Some Drupal 8 specific thing
  *
  */

Some code.
```

</Tab>

<Tab title="Drupal 7" id="d7-example">

Here's our Drupal 7 specific copy, and an example snippet:

```php
/**
  * Some Drupal 7 specific thing
  *
  */

Some code.
```

</Tab>

</TabList>

<hr className="source-code" />

    <TabList>
    
    <Tab title="WordPress" id="wp-example" active={true}>
    
    Here's our WordPress specific copy, and an example snippet:
    
    ```php
    /**
      * Some WordPress specific thing
      *
      */
 
    Some code.
    ```
    
    </Tab>
    
    <Tab title="Drupal 8" id="d8-example">
    
    Here's our Drupal 8 specific copy, and an example snippet:
    
    ```php
    /**
      * Some Drupal 8 specific thing
      *
      */

    Some code.
    ```
    
    </Tab>
    
    <Tab title="Drupal 7" id="d7-example">
    
    Here's our Drupal 7 specific copy, and an example snippet:
    
    ```php
    /**
      * Some Drupal 7 specific thing
      *
      */

    Some code.
    ```
    
    </Tab>
    
    </TabList>

</Example>


## Screenshots
Submit screenshots without additional markup. Don't use Skitch to add an arrow, for example.

### GUI
Screenshots are used to reference GUI instructions:

<Example>

![Alt text describing the image](../images/dashboard/terminus-cli-code-to-commit-dashboard.png)

<hr className="source-code" />

```markdown
![Alt text describing the image](../images/dashboard/terminus-cli-code-to-commit-dashboard.png)
```

</Example>

### Terminal
Terminal screenshots should only be used to demonstrate intended output:

<Example>

![Alt text describing the image](../images/pr-workflow/composer-require-pathauto.png)

<hr className="source-code" />

```markdown
![Alt text describing the image](../images/pr-workflow/composer-require-pathauto.png)
```

</Example>

## Error Messages
Document error messages verbatim as H3s within a **Troubleshooting** section. Using the exact copy of the error message helps to improve SEO, and making the header an H3 allows the section to be linkable within the table of contents for easy sharing.

<Example>

### RedisException: Redis server went away
The following error occurs when Redis has not been enabled within the Site Dashboard:

```
RedisException: Redis server went away in Redis->setOption() (line 28 of /srv/bindings/xxxxxxxx/code/sites/all/modules/redis/lib/Redis/Client/PhpRedis.php).
```

Enable Redis via the Pantheon Site Dashboard by going to **Settings** > **Add Ons** > **Add** > **Redis**. It may take a few minutes to provision the service.

<hr className="source-code" />

```markdown
### RedisException: Redis server went away
The following error occurs when Redis has not been enabled within the Site Dashboard:

 ```
 RedisException: Redis server went away in Redis->setOption() (line 28 of /srv/bindings/xxxxxxxx/code/sites/all/modules/redis/lib/Redis/Client/PhpRedis.php).
 ```

Enable Redis via the Pantheon Site Dashboard by going to **Settings** > **Add Ons** > **Add** > **Redis**. It may take a few minutes to provision the service.
```

</Example>


## Panels
Use panels for extraneous but useful information such as troubleshooting sections or pro tips that would be distracting or can be skipped over by a large portion of readers. This is primarily used in an effort to promote readability of a page.

<Example>

<Accordion title="Panel Title" id="example-panel" icon="wrench">

### Panel Content Header 

This Panel contains additional context, or advanced instructions.

</Accordion>

<hr className="source-code" />

```html
<Accordion title="Panel Title" id="example-panel" icon="wrench">

### Panel Content Header 

This Panel contains additional context, or advanced instructions.

</Accordion>
```

</Example>

## Tables
You can use markdown tables to describe availability based on service levels before providing instructions on how to enable or use a given feature. For example:

<Example>

## Enable Redis 
All plans except for a Basic plan can use Redis. Redis is available to Sandbox site plans for developmental purposes, but Redis will not be available going live on a Basic plan.

| Plans         | Redis Support <Popover content="Available across all environments, including Multidevs." /> |
| ------------- | -------------------------------------- |
| Sandbox       | <span style="color:green">✔</span> |
| Basic         | <span style="color:red">❌</span>  |
| Performance   | <span style="color:green">✔</span> |
| Elite         | <span style="color:green">✔</span> |

<hr className="source-code" />

```markdown
## Enable Redis
All plans except for a Basic plan can use Redis. Redis is available to Sandbox site plans for developmental purposes, but Redis will not be available going live on a Basic plan.

| Plans         | Redis Support <Popover content="Available across all environments, including Multidevs." /> |
| ------------- | -------------------------------------- |
| Sandbox       | <span style="color:green">✔</span> |
| Basic         | <span style="color:red">❌</span>  |
| Performance   | <span style="color:green">✔</span> |
| Elite         | <span style="color:green">✔</span> |
```

</Example>

Use ✓ to indicate yes and `❌` to indicate no.

## Tooltips

Tooltips are a great way to add additional information without cluttering up a section. For example, you can define jargon and even link out to an external resource without being distracting to the reader:

<Example>

Given two new sites with slugs <Popover title="Slugs" content="Generally, Slugs are URL friendly descriptions for a post or a page in WordPress. In the context of WordPress Site Networks, a slug is a URL friendly description for a network site." /> `first-site` and `second-site`, each configuration will result in the following URLs:

* Subdirectories: `example.com/first-site` and `example.com/second-site`.
* Subdomains: `first-site.example.com` and `second-site.example.com`.

<hr className="source-code" />

```markdown
Given two new sites with slugs <Popover title="Slugs" content="Generally, are URL friendly descriptions for a post or a page in WordPress. In the context of WordPress Site Networks, a slug is a URL friendly description for a network site." /> `first-site` and `second-site`, each configuration will result in the following URLs:

* Subdirectories: `example.com/first-site` and `example.com/second-site`.
* Subdomains: `first-site.example.com` and `second-site.example.com`.
```

</Example>

## See Also

This is the optimal place to provide links to external resources on the subject, or internal docs on common processes to follow after completing those above.

<Example>

## See Also 
- [An internal link](/guides/)
- [An external link](https://pantheon.io/blog/)

<hr className="source-code" />

```markdown
## See Also
- [An internal link](/guides/)
- [An external link](https://pantheon.io/blog/)
```

</Example>
