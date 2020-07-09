import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../layout/layout"
import SEO from "../layout/seo"

{
  /* @TODO Convert to a React Component */
}
const previewFlexPanelItem = {
  flex: "1 46%",
  margin: "0px 0px 15px 15px",
  color: "#333",
}

class WordPressLanding extends React.Component {
  render() {
    const {
      data: { allMdx },
    } = this.props
    console.log(allMdx)
    const categories = [
      ...new Set(
        allMdx.edges.map(page => {
          return page.node.frontmatter.category[0]
        })
      ),
    ]
    //console.log(categories)
    const subPageRegex = new RegExp(".*/.*/.*/.*")
    console.log(
      "regexTest",
      allMdx.edges.map(page =>
        subPageRegex.test(page.node.frontmatter.permalink)
      )
    )

    return (
      <>
        <SEO title="WordPress Docs" />
        <Layout>
          <div style={{ marginTop: "-20px" }} className="container">
            <main className="container doc-content-well" id="docs-main">
              <div className="row">
                <h1 className="title">WordPress Docs</h1>
                <div>
                  {categories &&
                    categories.map(category => {
                      return (
                        <>
                          <h2
                            className="subtitle"
                            id={category}
                            style={{ textTransform: "capitalize" }}
                          >
                            {category.replace("-", " ")}
                          </h2>
                          {allMdx.edges
                            .filter(
                              page =>
                                page.node.frontmatter.category.indexOf(
                                  category
                                ) >= 0
                            )
                            .filter(
                              page =>
                                !subPageRegex.test(
                                  page.node.frontmatter.permalink
                                )
                            )
                            .map(page => {
                              return (
                                <>
                                  <p id="page">
                                    <Link to={page.node.fields.slug}>
                                      {page.node.frontmatter.title}
                                    </Link>
                                  </p>
                                </>
                              )
                            })}
                        </>
                      )
                    })}
                </div>
              </div>
            </main>
          </div>
        </Layout>
      </>
    )
  }
}

export default WordPressLanding

export const pageQuery = graphql`
  {
    allMdx(
      filter: {
        frontmatter: {
          title: { ne: "" }
          changelog: { ne: true }
          cms: { eq: "WordPress" }
        }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            cms
            category
            tags
            permalink
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
