import React from 'react';
import { StaticQuery, graphql } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import { MDXProvider } from "@mdx-js/react"

const Partial = (props) => (

  <StaticQuery
    query={graphql`
      query {
        allDocs: allMdx(
          filter: {
            fileAbsolutePath: {regex: "/partials/"}, parent: {}
          }, 
          sort: {fields: fileAbsolutePath}) {
          edges {
            node {
              code {
                body
              }
              parent {
                ... on File {
                  relativePath
                }
              }
            }
          }
        }
      }
    `}

    render={data => {

      const { node } = data.allDocs.edges.find(
        edge => edge.node.parent.relativePath === props.file
      )

      if (!node) {
        return null
      }

      return <>
          <MDXProvider>
            <MDXRenderer>{node.code.body}</MDXRenderer>
          </MDXProvider>
        </>
    }}
  />
)

export default Partial