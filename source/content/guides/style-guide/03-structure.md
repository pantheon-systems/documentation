---
title: Style Guide
subtitle: Structure
description: Content structure.
contributors: [wordsmither]
showtoc: true
permalink: docs/guides/style-guide/structure
contenttype: [guide]
innav: [false]
categories: [help]
cms: [--]
audience: [--]
product: [--]
integration: [--]
---

## Content Types

The site features two distinct content types; **docs** and **guides**. We define docs as reference materials used to explain the behavior and intended use of Pantheon's platform features and service offerings. Guides are paginated and designed to walk the reader through a complex feature/product or to provide a collected resource of related topics in one location.

## Frontmatter

Meta data for a doc or guide is created in a section referred to as frontmatter. It lives at the very top of the file and is wrapped in three dashes.

<Example>

<h1 className="toc-ignore">Style Guide</h1>

<p className="article-subhead">Formatting rules and guidelines for Pantheon&#039;s open-source documentation.
</p>

<p>
<small>
<i className="fa fa-users"></i> Contributors:                                                     <a href="/contributors/alexfornuto" title="alexfornuto">Alex Fornuto</a>, &nbsp;
<a href="/contributors/rachelwhitton" title="rachelwhitton">Rachel Whitton</a>
</small>

</p>

<hr className="source-code" /> <br/>

```html
---
title: Style Guide
description: Formatting rules and guidelines for Pantheon's open-source documentation.
contributors: [alexfornuto, rachelwhitton]
---
```

</Example>

To see the values currently used in our documentation, [install our repository locally](https://github.com/pantheon-systems/documentation), then run one of the following reports:

- Docs: [List of all docs and tags](http://localhost:8000/metadata); [Searchable list of all docs and tags](http://localhost:8000/metadata-search).

- Partials: [List of all partials and tags](http://localhost:8000/partials); [Searchable list of all partials and tags](http://localhost:8000/partials-search).

<Accordion title="Frontmatter Values" id="frontmatter-values" icon="list-alt">

<dl>

<dt><code>title</code></dt>
<dd>The title of the content.</dd>

<dt><code>description</code></dt>
<dd>A brief description displayed under the title.</dd>

<dt><code>contributors</code></dt>
<dd>

An array of IDs for contributors to the content. The ID must correspond to an entry in [contributor.yaml](https://github.com/pantheon-systems/documentation/blob/main/source/data/contributor.yaml).

</dd>

<dt><code>reviewed</code></dt>
<dd>The last date when the content was updated or reviewed for accuracy.</dd>

<dt><code>tags</code></dt>
<dd>An array of tags used by our search engine to quickly identify the primary topics found in the content.</dd>

<dt><code>category</code></dt>
<dd>A value corresponding to the content's position in the site architecture and (sometimes) corresponding category landing page.</dd>

<dt><code>contenttype</code></dt>
<dd>

The content type for this content. Defaults to `doc`.

</dd>

<dt><code>subtitle</code></dt>
<dd>Used in multipage guides to define a title for that page of the guide.</dd>

<dt><code>cms</code></dt>

<dd>

An array of values for each CMS and version to which the content applies

</dd>

</dl>

</Accordion>

## Before You Begin Sections

This section should outline any steps or services required before starting those in the doc. If there are other docs that should be completed first, list them here.

Of particular note, any documentation that uses Terminus should reference it in this section, and link to the [Terminus Guide](/terminus) .

<Example>

<h2 class="toc-ignore">Before You Begin</h2>

Be sure that you have:

- An existing WordPress site on Pantheon, or [create](https://dashboard.pantheon.io/sites/create) one.
- A [local clone](/guides/git/git-config#clone-your-site-codebase) of your code repository.
- An account with [Amazon Web Services (AWS)](https://aws.amazon.com/s3/). Amazon offers [free access](https://aws.amazon.com/free/) to most of their services for the first year.
- [Terminus](/terminus) installed on your local computer.

<hr className="source-code" /> <br/>

```markdown
## Before You Begin

Be sure that you have:

- An existing WordPress site on Pantheon, or [create](https://dashboard.pantheon.io/sites/create) one.
- A [local clone](/guides/git/git-config#clone-your-site-codebase) of your code repository.
- An account with [Amazon Web Services (AWS)](https://aws.amazon.com/s3/). Amazon offers [free access](https://aws.amazon.com/free/) to most of their services for the first year.
- [Terminus](/terminus) installed on your local computer.
```

</Example>
## More Resources Section

This is the optimal place to provide links to external resources on the subject, or internal docs on common processes to follow after completing those above.

<Example>

<h2 className="toc-ignore"> See Also</h2>

- [An internal link](/guides)
- [An external link](https://pantheon.io/blog/)

<hr className="source-code" /> <br/>

```markdown
## More Resources

- [An internal link](/guides)
- [An external link](https://pantheon.io/blog/)
```

</Example>

## Reusable Content/Partials

Create reusable content in a separate Markdown file that can be included within sections of other docs. These are called **partials**.

Place the Markdown file within the `source/partials/` directory, in its own directory if it is feature-specific.

<Alert title="Warning" type="danger" >

Partial file names must not duplicate the names of files in the source/content directory.

</Alert>

Partials use all of the same Markdown, style, and HTML as needed and outlined on this page, but do not require frontmatter. They can be included as their own paragraphs and sections as well as in lists as a step or bullet point.

After you create the file, include it in the doc:

<Example>

<Partial file="partial-example.md" />

<hr className="source-code" /> <br/>

```markdown
<Partial file="partial-example.md" />
```

</Example>

To find partials to reuse, [run this report](http://localhost:8000/partials-search) (requires a [local build of gatsby](https://github.com/pantheon-systems/documentation#readme)).  The report can be filtered by metadata tags, and includes an excerpt of each partial.
