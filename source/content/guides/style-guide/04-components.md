---
title: Style Guide
subtitle: Components
description: Using components to format and add functionality to documentation.
contributors: [wordsmither]
reviewed: "2023-06-09" 
showtoc: true
permalink: docs/guides/style-guide/formatting
contenttype: [guide]
innav: [false]
categories: [help]
cms: [--]
audience: [--]
product: [--]
integration: [--]
---

Our site uses "components" to standardize formatting (such as callouts) or add functionality (such as downloading files).

## Callouts

There are several types of callouts commonly used in our docs:

### Notes

<Example>

<Alert title="Note" type="info" >

Notes should identify important pieces of information the reader shouldn't miss.

</Alert>

<hr className="source-code" /> <br/>

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

<hr className="source-code" /> <br/>

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

![Incorrect vanity domain A record required DNS value](../images/dashboard/wrong-vanity-aname-dns.png)

</Alert>

<Alert title="Correct DNS Configuration" type="success" icon="check">

![Correct vanity domain A record required DNS value](../images/dashboard/correct-a-aaaa-dns.png)

</Alert>

<hr className="source-code" /> <br/>

```html
<Alert title="Incorrect DNS Configuration" type="danger" icon="remove">

![Incorrect vanity domain A record required DNS value](../images/dashboard/wrong-vanity-aname-dns.png)

</Alert>

<Alert title="Correct DNS Configuration" type="success" icon="check">

![Correct vanity domain A record required DNS value](../images/dashboard/correct-a-aaaa-dns.png)

</Alert>

```

</Example>


## Cards

Use cards to visually display a list of items, with links to more information.

<Alert title="Note" type="info" >

`CardGroup/Card` is intended for Terminus guide use only.  Instead, use `ProductGroup/Product`

</Alert>

<Example>

![Cards](../../../images/sg-cards.png)


<hr className="source-code" /> <br/>

```markdown
<ProductGroup>

  <Product title={"Visual Regression Testing (VRT) and Automatic Updates with Autopilot"} link={"/autopilot"}>

  Automate finding, testing, and applying WordPress and Drupal updates. 

  </Product>

  <Product title={"Quicksilver Webhooks"} link={"/guides/quicksilver/hooks"}>

  Use our [Quicksilver Webhooks repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/webhook) for a generic Webhook implementation.

  </Product>

</ProductGroup>
```


</Example>

## Check

Simple green checkmark.  Replaces `<span style="color:green">✔</span>`

<Example>

<Check/>

<hr className="source-code" /> <br/>

```markdown
<Check/>
```

</Example>



## DNS

Creates a bulleted list of links to all DNS Provider docs stored in `source/content/dns-providers`, which do *not* have `draft: true` frontmatter. 

<Example>

<DNSProviderDocs />


<hr className="source-code" /> <br/>

```markdown
<DNSProviderDocs />
```

</Example>


## File Downloads

Creates a link to a downloadable file.  Files must be stored in `source/scripts`.

<Example>

<Download file="pantheon-backup-to-s3.sh" />

<hr className="source-code" /> <br/>

```markdown
<Download file="pantheon-backup-to-s3.sh" />
```

</Example>


## Icons

```
<Icon icon={"more-windows"} text={"Sites:"}/>
```

[Font Awesome Web Application Icons](https://www.w3schools.com/icons/fontawesome_icons_webapp.asp)



## Panels/Accordions

Use panels for extraneous but useful information such as troubleshooting sections or pro tips that would be distracting or can be skipped over by a large portion of readers. This is primarily used in an effort to promote readability of a page.

<Example>

<Accordion title="Panel Title" id="example-panel" icon="wrench">

### Panel Content Header 

This Panel contains additional context, or advanced instructions.

</Accordion>

<hr className="source-code" /> <br/>

```html
<Accordion title="Panel Title" id="example-panel" icon="wrench">

### Panel Content Header

This Panel contains additional context, or advanced instructions.

</Accordion>
```

</Example>


## Tabs

When working on a document that will cover steps for multiple CMSs, use tabs when possible to condense instructions that need duplication for the different applications.

Note that `active={true}` is required for each first or default tab. Without it, the tabs will still load, but will appear broken until the reader clicks on a tab.

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

<hr className="source-code" /> <br/>

````markdown
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
````

</Example>

## Tooltips

Tooltips are a great way to add additional information without cluttering up a section. For example, you can define jargon and even link out to an external resource without being distracting to the reader:

<Example>

Given two new sites with slugs <Popover title="Slugs" content="Generally, Slugs are URL friendly descriptions for a post or a page in WordPress. In the context of WordPress Multisite, a slug is a URL friendly description for a network site." /> `first-site` and `second-site`, each configuration will result in the following URLs:

* Subdirectories: `example.com/first-site` and `example.com/second-site`.
* Subdomains: `first-site.example.com` and `second-site.example.com`.

<hr className="source-code" /> <br/>

```markdown
Given two new sites with slugs <Popover title="Slugs" content="Generally, are URL friendly descriptions for a post or a page in WordPress. In the context of WordPress Multisite, a slug is a URL friendly description for a network site." /> `first-site` and `second-site`, each configuration will result in the following URLs:

* Subdirectories: `example.com/first-site` and `example.com/second-site`.
* Subdomains: `first-site.example.com` and `second-site.example.com`.
```

</Example>

## YouTube Videos

Embeds a YouTube video using the video ID.

<Example>

<Youtube src="b1lNrZL0xxM" title="Pantheon Custom Upstreams" />

<hr className="source-code" /> <br/>

```markdown
<Youtube src="b1lNrZL0xxM" title="Pantheon Custom Upstreams" />
```

</Example>
