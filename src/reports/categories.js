import React, { useState } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Layout from "../layout/layout"
import showdown from "showdown"

const converter = new showdown.Converter()


class DashboardImages extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            allSchemaYaml (filter: {tag: {eq: "categories"}}){
              edges {
                node {
                  tag
                  description
                  valid_values
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

              {}
                    {yamlfile.map((category, i) => {
                      return(
                        <li key={i}>{category.node.tag}
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

export default DashboardImages

/* .filter(doc => {
                return doc.title.indexOf(search) >= 0
              })*/
