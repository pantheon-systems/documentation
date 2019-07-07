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
              id
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

      console.table(props.file)

      // console.table(data)

      const { node } = data.allDocs.edges.find(
        edge => edge.node.parent.relativePath === props.file
      )

      console.log(node);

      if (!node) {
        return null
      }

      // if (!node.hasOwnProperty('code')) {
      //   return null
      // }

      // if (!node.code.hasOwnProperty('body')) {
      //   return null
      // }

      // console.log(node.code.body);

      return <>
          <MDXProvider>
            <MDXRenderer>{node.code.body}</MDXRenderer>
          </MDXProvider>
        </>
    }}
  />
)

export default Partial