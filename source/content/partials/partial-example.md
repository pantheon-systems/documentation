---
contenttype: [partial]
categories: [--]
cms: [--]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

This is an example of a partial.

It's reusable content so that editors can maintain a single source of information that can be included in multiple docs.

Keep the following in mind when using a partial:

- Check for existing partials first. Don't recreate existing content. Check the [partials directory](https://github.com/pantheon-systems/documentation/tree/main/source/partials) in the GitHub repo.
- Exclude the heading. Use the context of the referring doc to introduce the content.
- Use links to headings that will work in any doc. Use `[Frontmatter](/style-guide#frontmatter)` instead of `[Frontmatter](#frontmatter)`.
- Note that if you include an image within a partial in a subdirectory, the path needs to be relative to the docs referencing the partial.  So if your partial is in the `source/content/partial` folder, but is being referenced from `/source/content/guides/account-mgmt/billing`, you'll need to add additional `../`s to the image tag.
  <Alert title="Tip" type="info" icon="lightbulb">

  If you are using VS Code as your editor, you can create an image tag with the proper path by clicking on the image, dragging to the location in the doc where you want it to appear, then press SHIFT as you drop the image.  If you do this in the document that refers to the partial that will contain the image, you can then cut it and paste it into the partial.

  </Alert>