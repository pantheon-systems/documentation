import { graphql } from "gatsby"

export const asdfasdf = graphql`
   fragment asdfasdfasdfasdf on Mdx {
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
