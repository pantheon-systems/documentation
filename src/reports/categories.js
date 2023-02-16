import React, { useState } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Layout from "../layout/layout"
import showdown from "showdown"

const converter = new showdown.Converter()


class CategoryTree extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            allSchemaYaml {
              edges {
                node {
                  tag
                  description
                  valid_values {
                    group
                    values
                  }
                }
              }
            }
          }
        `}
        render={data => {
          const yamlfile = data.allSchemaYaml.edges

          return (
            <Layout>
              <h1>Category Tree</h1>

              <ul>

                    {yamlfile.map((heading, i) => {
                      return(
                        <li key={i}>
                          {heading.node.tag}
                          <ul>
                          {heading.node.valid_values.map((groups, i) => {
                                      return (
                                        <li key={i}>
                                          {(i ? ", " : "") + groups.group}
                                        </li>
                                      )
                                    })
                                  }
                          </ul>
                        </li>
                      )
                    })}
              </ul>

            </Layout>
          )
        }}
      />
    )
  }
}

export default CategoryTree

/* .filter(doc => {
                return doc.title.indexOf(search) >= 0
              })*/
