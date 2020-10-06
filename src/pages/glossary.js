import { Link, graphql } from "gatsby"

import HeaderBody from "../components/headerBody"
import Layout from "../layout/layout"
import Popover from "../components/popover"
import React from "react"
import ReactMarkdown from "react-markdown"
import SEO from "../layout/seo"
import TOC from "../components/toc"

const previewFlexPanelItem = {
  flex: "1 46%",
  margin: "0px 0px 15px 15px",
  color: "#333",
}

class Glossary extends React.Component {

  render () {

    const {
      data: { docsWithDefLists, docsWithDFNs },
    } = this.props
    console.log("docsWithDFNS: ", docsWithDFNs) //For Debugging

    let defLists = []

    docsWithDefLists.edges.map(({ node }) => {
      const matches = node.fileInfo.childMdx.rawBody.match(
        /<dt>(.+?)<\/dt>\n\n<dd>\n\n(.+?)\n\n<\/dd>/gim
      )
      //console.log("Match Title: ", node.frontmatter.title) // For Debugging
      //console.log("match: ", matches) // For Debugging
      if (matches && matches.length) {
        matches.forEach(term => {
          defLists.push({
            from: node.frontmatter.title,
            slug: node.fields.slug,
            title: term.match(/<dt>(.*?)<\/dt>/)[1],
            definition: term.match(/<dd>\n\n(.*?)\n\n<\/dd>/)[1],
            letter: term.match(/<dt>(.*?)<\/dt>/)[1][0].toUpperCase()
          })
        })
      }
    })

    defLists.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1)
    defLists.sort(function(a, b) {
      return a.title[0].localeCompare(b.title[0]);
    });
    //console.log("defLists: ", defLists) // For debugging

    const allDfns = []

    docsWithDFNs.edges.map(({ node }) => {
      const isDfn = node.fileInfo.childMdx.rawBody.match(
        /.*<dfn(?: id=".+?")*>\n*.*\n*<\/dfn>.*\n/gim
      )
      if (isDfn && isDfn.length) {
        isDfn.forEach(def => {
          allDfns.push({
            from: node.frontmatter.title,
            slug: node.fields.slug,
            title: def.match(/<abbr title="(.+?)"/) ? def.match(/<abbr title="(.+?)"/)[1] : def.match(/<dfn(?: id=".+?")*>(.+?)<\/dfn>/)[1],
            definition: def,
            letter: def.match(/<abbr title="(.+?)"/) ? def.match(/<abbr title="(.+?)"/)[1][0] : def.match(/<dfn(?: id=".+?")*>(.+?)<\/dfn>/)[1][0].toUpperCase(),
            id: def.match(/<dfn id=/) ? def.match(/<dfn id="(.+?)"/)[1] : null
          })
        })
      }
    })
    allDfns.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1)
    allDfns.sort(function(a, b) {
      return a.title[0].localeCompare(b.title[0]);
    });
    console.log("allDfns: ", allDfns) //For Debugging

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
                    {allDfns
                      .filter(def => {
                        return (
                          JSON.stringify(def.letter).match(index)
                        )
                      }).length > 0 ?
                        <h2 key={index} className="tocify-item" id={index.toLowerCase()}>
                          {index}
                        </h2>
                      : null
                    }
                    {allDfns
                      .filter(def => {
                        return (
                          def.letter.toUpperCase() === index.toUpperCase()
                        )
                      })
                      .map(({ from, slug, title, definition}) => (
                        <>
                          <section key={title}>
                            <hr />
                            <h3 key={`${title}-header`} id={title.toLowerCase()}>
                              {title.charAt(0).toUpperCase() + title.slice(1)}
                            </h3>

                              <ReactMarkdown skipHtml={true} source={definition} />

                            {from.length > 0 ? (
                              <>
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
  query definitionsInDocs {
    docsWithDefLists: allMdx(
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
    docsWithDFNs: allMdx(
      filter: {
        frontmatter: { changelog: { ne: true }, title: { ne: "Style Guide" } }
        fileInfo: { childMdx: { rawBody: { regex: "/<dfn/" } } }
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
