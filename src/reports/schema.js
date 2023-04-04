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
                  type
                  required
                  multi
                  valid_values {
                    group
                    values
                  }
                }
              }
            }
          }
        `}
        render={(data) => {
          const yamlfile = data.allSchemaYaml.edges

          return (
            <Layout>
              <div style={{ padding: "20px" }}>
              <h1>Schema</h1>
              <ul>
                {yamlfile.map((tag, i) => {
                  return (
                    <li key={i}><a href={"#" + tag.node.tag}>
                      {tag.node.tag}
                      </a></li>
                  )
                })}
                </ul>
                {yamlfile.map((tag, i) => {
                  return (
                    <h2 key={i}><a id={tag.node.tag}> 
                      {tag.node.tag}
                      <p>{tag.node.description}</p>
                      <ul>
                        <li>Type: {tag.node.type}</li>
                        <li>Required: {tag.node.required}</li>
                        <li>Multiple values allowed: {tag.node.multi}</li>
                        <li>
                          Valid Values:
                          <ul>
                          {tag.node.valid_values.map((groups, i) => {
                              if (groups.group === "None")
                              return (
                                  <div>
                                    {groups.values.map((value, i) => {
                                      return <li key={i}>{value}</li>
                                    })}
                                  </div>
                              )
                              if (groups.group !== "None")
                              return (
                                <li key={i}>
                                  {groups.group}
                                  <ul>
                                    {groups.values.map((value, i) => {
                                      return <li key={i}>{value}</li>
                                    })}
                                  </ul>
                                </li>
                              )
                            })}
                          </ul>
                        </li>
                      </ul>
                      </a></h2>
                  )
                })}
              </div>
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
