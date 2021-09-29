import { Link, graphql } from "gatsby"

import HeaderBody from "../components/headerBody"
import Layout from "../layout/layout"
import Popover from "../components/popover"
import React from "react"
import SEO from "../layout/seo"
import TOC from "../components/toc"
import showdown from "showdown"

const converter = new showdown.Converter()

const previewFlexPanelItem = {
  flex: "1 46%",
  margin: "0px 0px 15px 15px",
  color: "#333",
}

class Glossary extends React.Component {
  render() {
    const {
      data: { docsWithDefLists, docsWithDFNs },
    } = this.props
    //console.log("docsWithDefLists: ", docsWithDefLists) //For Debugging
    //console.log("docsWithDFNs", docsWithDFNs)

    let defLists = []

    docsWithDefLists.edges.map(({ node }) => {
      const matches = node.rawBody.match(
        /<dt>(.+?)<\/dt>\n\n\s*<dd>\n\n(.+?)\n\n\s*<\/dd>/gim
      )
      //console.log("Match Title: ", node.frontmatter.title) // For Debugging
      //console.log("match: ", matches) // For Debugging
      if (matches && matches.length) {
        matches.forEach(term => {
          //console.log("slug: ", node.fields.slug, "slice: ", node.fields.slug.slice(0, 1)),
          defLists.push({
            title: term.match(/<dt>(.*?)<\/dt>/)[1],
            from: node.frontmatter.title,
            slug: node.fields.slug.slice(0, 1) === "/" ? node.fields.slug.slice(1) : node.fields.slug,
            definition: term.match(/<dd>\n\n\s*(.*?)\n\n\s*<\/dd>/)[1],
            letter: term.match(/<dt>(.*?)<\/dt>/)[1][0].toUpperCase(),
          })
        })
      }
    })

//    defLists.sort((a, b) =>
//      a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
//    )
//    defLists.sort(function(a, b) {
//      return a.title[0].localeCompare(b.title[0])
//    })
    //console.log("defLists: ", defLists) // For debugging

    let allDfns = []

    docsWithDFNs.edges.map(({ node }) => {
      //console.log("rawBody: ", node.rawBody) //For Debugging
      const isDfn = node.rawBody.match(
        /\n.+?<dfn id="(.+?)">(.+?)<\/dfn>.+?\n/g
      )
      //console.log("isDfn", isDfn) //For Debugging
      if (isDfn && isDfn.length) {
        isDfn.forEach(def => {
          //console.log("slug: ", node.fields.slug, "slice: ", node.fields.slug.slice(0, 1)),
          allDfns.push({
            title: def.match(/\n.+?<dfn id="(.+?)">(.+?)<\/dfn>.+?\n/)[2],
            from: node.frontmatter.title,
            slug: node.fields.slug.slice(0, 1) === "/" ? node.fields.slug.slice(1) : node.fields.slug,
            definition: def,
            letter: def
              .match(/\n.+?<dfn id="(.+?)">(.+?)<\/dfn>.+?\n/)[1][0]
              .toUpperCase(),
            id: def.match(/\n.+?<dfn id="(.+?)">(.+?)<\/dfn>.+?\n/)[1],
          })
        })
      }
    })
//    allDfns.sort((a, b) =>
//      a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
//    )
//    allDfns.sort(function(a, b) {
//      return a.title[0].localeCompare(b.title[0])
//    })
    //console.log("allDfns: ", allDfns) //For Debugging

    const allDefs = allDfns.concat(defLists)
    allDefs.sort((a, b) =>
      a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
    )
    //console.log("allDefs: ", allDefs) //For Debugging

    const letters = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ]

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
                  This page dynamically displays all defined terms in the
                  Pantheon Documentation project.
                  {letters.map(index => (
                    <>
                      {allDefs.filter(def => {
                        return JSON.stringify(def.letter).match(index)
                      }).length > 0 ? (
                        <Link to={`#${index.toLowerCase()}`}>
                          <h2
                            key={index}
                            className="tocify-item"
                            id={index.toLowerCase()}
                          >
                            {index}
                          </h2>
                        </Link>
                      ) : null}
                      {allDefs
                        .filter(def => {
                          //console.log("Now rendering ", def.title, def) //For Debugging
                          return (
                            def.letter.toUpperCase() === index.toUpperCase()
                          )
                        })
                        .map(({ from, slug, title, definition }) => (
                          <>
                            <section key={title.replace(/ +/g, '-')}>
                              <hr />
                              <Link to={`#${title.toLowerCase().replace(/ +/g, '-')}`}>
                                <h3
                                  key={`${title.replace(/ +/g, '-')}-header`}
                                  id={title.toLowerCase().replace(/ +/g, '-')}
                                  name={title.toLowerCase().replace(/ +/g, '-')}
                                  className="glossary-term"
                                >
                                  {title.charAt(0).toUpperCase() + title.slice(1)}
                                </h3>
                              </Link>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: converter.makeHtml(definition).replace(/<a href="\/(.+?)">/g, "<a href=/docs/$1>")
                                }}
                              />
                              {from.length > 0 ? (
                                <>
                                  Excerpt from:{" "}
                                  <Link
                                    key={`${title}-reference`}
                                    to={`/${slug}`}
                                  >
                                    {from}
                                  </Link>
                                </>
                              ) : null}
                              <br />
                            </section>
                          </>
                        ))}
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
  query DocsWithDefinitions {
    docsWithDFNs: allMdx(
      filter: {
        frontmatter: { changelog: { ne: true }, title: { ne: "Style Guide" } }
        rawBody: { regex: "/dfn/" }
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
          rawBody
        }
      }
    }
    docsWithDefLists: allMdx(
      filter: {
        frontmatter: { changelog: { ne: true }, title: { ne: "Style Guide" } }
        rawBody: { regex: "/<dt/" }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
          }
          rawBody
          fields {
            slug
          }
        }
      }
    }
  }
`
