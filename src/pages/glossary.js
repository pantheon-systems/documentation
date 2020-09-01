import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../layout/layout"
import SEO from "../layout/seo"
import ReactMarkdown from "react-markdown"
import TOC from "../components/toc"
import HeaderBody from "../components/headerBody"

{
  /* @TODO Convert to a React Component */
}
const previewFlexPanelItem = {
  flex: "1 46%",
  margin: "0px 0px 15px 15px",
  color: "#333",
}




const Glossary = ({data: {bodies}}) => {

  let allDefs = [];

  bodies.edges.map(({node}) => {
    //const allDefs = node.fileInfo.childMdx.rawBody.match(/(<dt>.+?<\/dt>)\n\n(<dd>.+?<\/dd>)/gim)
    const matches = node.fileInfo.childMdx.rawBody.match(/<dt>(.+?)<\/dt>\n\n<dd>\n\n(.+?)\n\n<\/dd>/gim)
    //console.log("Match Title: ", node.frontmatter.title) // For Debugging
    //console.log("match: ", matches) // For Debugging
    if (matches && matches.length) {
      matches.forEach(term => {
        allDefs.push({
          from: node.frontmatter.title,
          slug: node.fields.slug,
          title: term.match(/<dt>(.*?)<\/dt>/)[1],
          definition: term.match(/<dd>\n\n(.*?)\n\n<\/dd>/)[1],
        });
      })
    }
  })

  console.log("allDefs:", allDefs) // For Debugging

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
                  {allDefs.map(({from, slug, title, definition}) => 
                    <>
                    <div key={title}>
                      <dt key={`${title}-term`}><h2>{title}</h2></dt>
                      <dd key={`${title}-definition`}>
                      <ReactMarkdown source={definition} />
                      </dd>
                      <br />

                      {from.length > 0 ? (
                      <>Excerpt from: <Link key={`${title}-reference`} to={slug}>{from}</Link></>
                      ): null
                      }

                    <br />
                    <hr />
                    </div>
                    </>
                    )}
              </div>
            </article>
            <TOC title="Contents" />
          </div>
        </main>
      </Layout>
    </>
  );
};


export default Glossary

export const pageQuery = graphql`
  {
    bodies: allMdx(filter: {frontmatter: {changelog: {ne: true}, title: {ne: "Style Guide"}}, fileInfo: {childMdx: {rawBody: {regex: "/<dt>/"}}}}) {
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
