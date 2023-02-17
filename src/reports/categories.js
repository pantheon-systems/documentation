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
            allSchemaYaml(filter: {tag: {eq: "categories"}}) {
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
            allMdx (
              filter: {
                frontmatter: { 
                  title: { ne: "" }
                  innav: { eq: true}
                }
                fields: { slug: { regex: "/^((?!changelog).)*$/" } }
              }
              sort: {fields: fileInfo___relativePath, order: ASC}
            ) {
              edges {
                node {
                  fileInfo {
                    relativePath
                    sourceInstanceName
                    id
                  }
                  frontmatter {
                    title
                    subtitle
                    categories
                  }
                  fields {
                    slug
                  }
                }
              }
            }
                    }
        `}
        render={data => {
          const yamlfile = data.allSchemaYaml.edges
          const pages = data.allMdx.edges
          let printedGuides = []
          let printedOverview = []
          let printedTerminus = []

          return (
            <Layout>
              <h1>Category Tree</h1>
                  {yamlfile.map((heading, i) => {
                    return(
                        <ul>
                        {heading.node.valid_values.map((groups, i) => {
                            return (
                              <li key={i}>
                                {groups.group}
                                  <ul>
                                    {groups.values.map((value, i) => {
                                        return (
                                          <li key={i}>
                                            {value}
                                            <ul>
                                            {pages.filter(page => {
                                              const categories = page.node.frontmatter.categories
                                              return (
                                                categories.indexOf(value) >= 0
                                              )
                                              })
                                              .map((page) => {
                                                // Guides URLs are already absolute urls.
                                                if (/^\/guides\/.*$/.test(page.node.fields.slug)) {
                                                  const result = /^(\/guides\/[A-Za-z0-9\-\_]+)\/?.*$/.exec(page.node.fields.slug)
                                                  // Use printedGuides to avoid showing the same guide twice.
                                                  if (printedGuides.indexOf(result[1]) === -1) {
                                                    printedGuides.push(result[1])
                                                    return (
                                                      <li key={page.node.id}>
                                                        <Link to={`${result[1]}`}>
                                                          {page.node.frontmatter.title}
                                                        </Link>
                                                      </li>
                                                    )
                                                  }
                                                } 
                                                else {
                                                  if (/^\/overview\/.*$/.test(page.node.fields.slug)) {
                                                  const result = /^(\/overview\/[A-Za-z0-9\-\_]+)\/?.*$/.exec(page.node.fields.slug)
                                                  // Use printedOverview to avoid showing the same guide twice.
                                                  if (printedOverview.indexOf(result[1]) === -1) {
                                                    printedOverview.push(result[1])
                                                    return (
                                                      <li key={page.node.id}>
                                                        <Link to={`${result[1]}`}>
                                                          {page.node.frontmatter.title}
                                                        </Link>
                                                      </li>
                                                    )
                                                  } }
                                                  else {
                                                    if (/^\/terminus\/.*$/.test(page.node.fields.slug)) {
                                                    const result = /^(\/terminus\/[A-Za-z0-9\-\_]+)\/?.*$/.exec(page.node.fields.slug)
                                                    // Use printedTerminus to avoid showing the same guide twice. - not working
                                                    if (printedTerminus.indexOf(result[1]) === -1) {
                                                      printedTerminus.push(result[1])
                                                      return (
                                                        <li key={page.node.id}>
                                                          <Link to={`${result[1]}`}>
                                                            {page.node.frontmatter.title}
                                                          </Link>
                                                        </li>
                                                      )
                                                    } }
                                                  else {
                                                    return (
                                                    <li key={page.node.id}>
                                                      <Link to={`/${page.node.fields.slug}`}>
                                                        {page.node.frontmatter.title}
                                                      </Link>
                                                    </li>
                                                    )
                                                  }
                                                }}
                                              })
                                            }

                                            </ul>
                                          </li>
                                        )
                                      })}
                                  </ul>
                              </li>
                            )
                          })
                        }
                        </ul>
                    )
                  })}
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
