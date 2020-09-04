import { Link, graphql } from "gatsby"

import HeaderBody from "../components/headerBody"
import Layout from "../layout/layout"
import Popover from "../components/popover"
import React from "react"
import ReactMarkdown from "react-markdown"
import SEO from "../layout/seo"
import TOC from "../components/toc"

{
  /* @TODO Convert to a React Component */
}
const previewFlexPanelItem = {
  flex: "1 46%",
  margin: "0px 0px 15px 15px",
  color: "#333",
}

class Glossary extends React.Component {

  render () {

    const {
      data: { allMdx },
    } = this.props
    //console.log("allMdx: ", allMdx) //For Debugging

    let allDefs = []

    allMdx.edges.map(({ node }) => {
      const matches = node.fileInfo.childMdx.rawBody.match(
        /<dt>(.+?)<\/dt>\n\n<dd>\n\n(.+?)\n\n<\/dd>/gim
      )
      //console.log("Match Title: ", node.frontmatter.title) // For Debugging
      //console.log("match: ", matches) // For Debugging
      if (matches && matches.length) {
        matches.forEach(term => {
          allDefs.push({
            from: node.frontmatter.title,
            slug: node.fields.slug,
            title: term.match(/<dt>(.*?)<\/dt>/)[1],
            definition: term.match(/<dd>\n\n(.*?)\n\n<\/dd>/)[1],
            letter: term.match(/<dt>(.*?)<\/dt>/)[1][0].toUpperCase()
          })
        })
      }
    })

    allDefs.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1)
    allDefs.sort(function(a, b) {
      return a.title[0].localeCompare(b.title[0]);
    });
    //console.log("AllDefs: ", allDefs) // For debugging

    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    return (
      <>
        <Layout>
          <SEO
            title="Glossary"
            description="A collection of terms and definitions through Pantheon's Documentation"
          />
          <main id="doc">
            <div className="container doc-content-well">
              <article className="doc article col-md-9 md-70">
                <HeaderBody
                  title="Glossary"
                  description="A collection of terms and definitions through Pantheon's Documentation"
                />
                <div style={{ marginTop: "15px", marginBottom: "45px" }}>
                  This page dynamically displays all defined terms in the Pantheon Documentation project.

                  {letters.map( index =>(
                    <>
                    <h2 key={index} className="tocify-item" id={index.toLowerCase()}>
                      {index}
                    </h2>

                    {allDefs
                      .filter(def => {
                        return (
                          def.letter.toUpperCase() === index.toUpperCase()
                        )
                      })
                      .map(({ from, slug, title, definition}) => (
                        <>
                          <section key={title}>
                            <hr />
                            <h3 id={title.toLowerCase()}><dt key={`${title}-term`}>
                              {title.charAt(0).toUpperCase() + title.slice(1)}
                            </dt></h3>
                            <dd key={`${title}-definition`}>
                              <ReactMarkdown skipHtml={true} source={definition} />
                            </dd>

                            {from.length > 0 ? (
                              <>
                                <br />
                                Excerpt from:{" "}
                                <Link key={`${title}-reference`} to={`/${slug}`}>
                                  {from}
                                </Link>
                              </>
                            ) : null}
                            <br />
                          </section>
                        </>
                      ))
                    }
                    </>
                  ))}
                </div>
              </article>
              <TOC title="Contents" />
            </div>
          </main>
        </Layout>
      </>
    )
  }
}

export default Glossary

export const pageQuery = graphql`
  {
    allMdx(
      filter: {
        frontmatter: { changelog: { ne: true }, title: { ne: "Style Guide" } }
        fileInfo: { childMdx: { rawBody: { regex: "/<dt>/" } } }
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
          fileInfo {
            childMdx {
              rawBody
            }
          }
        }
      }
    }
  }
`
