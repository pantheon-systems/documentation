import { graphql } from "gatsby"

export const somefields = graphql`
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


export const releaseNotedFraggy = graphql`
  fragment releaseNotedFraggy on Mdx {
    id
  }`

