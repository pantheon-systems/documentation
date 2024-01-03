import { graphql } from "gatsby"

export const releaseNoteFragment = graphql`
   fragment theReleaseNoteFields on Mdx {
  id
  body
      fields {
        slug
      }
      frontmatter {
        title,
        published_date,
        categories
      }
}`
