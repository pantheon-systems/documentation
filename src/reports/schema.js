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
            render={data => {
                const yamlfile = data.allSchemaYaml.edges
                
                return (
                    <Layout>
                    <h1>Schema</h1>
                    <div style={{ padding: "20px" }}>
                    {yamlfile.map((tag, i) => {
                        return(
                            <h2 key={i}>
                            {tag.node.tag}
                            <p>{tag.node.description}</p>
                            <ul>
                            <li>Type: {tag.node.type}</li>
                            <li>Required: {tag.node.required}</li>
                            <li>Multiple values allowed: {tag.node.multiple}</li>
                            <li>Valid Values:
                            <ul>
                            {tag.node.valid_values.map((groups, i) => {
                                return (
                                    <li key={i}>
                                    {groups.group}
                                    <ul>
                                    {groups.values.map((value, i) => {
                                        return (
                                            <li key={i}>
                                            {value}
                                            </li>
                                            )
                                        })}
                                        </ul>
                                        </li>
                                        )
                                    })
                                }
                                </ul>
                                </li>
                                </ul>
                                </h2>
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