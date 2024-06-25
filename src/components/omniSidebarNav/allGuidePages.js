import React from "react"
import { useStaticQuery, graphql } from "gatsby"



const TheGuides = () => {

  const AllTheGuides = useStaticQuery(
    graphql`
      {
        allGuides: allMdx(
      filter: {
        fileAbsolutePath: { ne: null }
        fields: {guide_directory: {regex: "/^(?=guides\/).*$/i" }},
        frontmatter: { draft: { ne: true } }
      }
      sort: { fields: [fileAbsolutePath], order: ASC }
    ) {
      edges {
        node {
          id
          fields {
            slug
            guide_directory
          }
          frontmatter {
            title
            subtitle
          }
        }
      }
    }
      }
    `
  );


  return AllTheGuides;
}

export default TheGuides;
