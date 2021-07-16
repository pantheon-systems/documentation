This is an example of a partial.

It's reusable content so that editors can maintain a single source of information that can be included in multiple docs.

Keep the following in mind when using a partial:

- Check for existing partials first. Don't recreate existing content. Check the [partials directory](https://github.com/pantheon-systems/documentation/tree/main/source/partials) in the GitHub repo.
- Exclude the heading. Use the context of the referring doc to introduce the content.
- Use links to headings that will work in any doc. Use `[Frontmatter](/style-guide#frontmatter)` instead of `[Frontmatter](#frontmatter)`.
- Note that if you include an image within a partial in a subdirectory, it requires another set of `../` to escape the directory.
   - So an image referenced from a partial in `source/partials/autopilot/` would be `../../images/autopilot/image.png`.
