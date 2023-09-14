import React from "react"
import { Link, graphql } from "gatsby"
import Helmet from "react-helmet"
import Layout from "../layout/layout"

import CallToAction from "../layout/call-to-action"
import ChangelogPreview from "../layout/changelog-preview"
import SEO from "../layout/seo"

import ThreeColumnLinks from "../pds-middleware/ThreeColumnLinks"
import TopicsGrid from "../pds-middleware/TopicsGrid"

class Index extends React.Component {
  render() {
    const {
      data: { homeYaml, allMdx },
    } = this.props
    return (
      <Layout>
        <SEO
          title="Pantheon Docs"
          description="Information for building, launching, and running dynamic sites on the Pantheon Website Management Platform"
          image={"/images/assets/default-thumb-doc.png"}
        />
        <main className="pds-container pds-container--wide" id="docs-main">
          {/* <h1>{homeYaml.title}</h1> */}
          {/*
          <CallToAction
            title={homeYaml.call_to_action.title}
            subTitle={homeYaml.call_to_action.sub_title}
            url={homeYaml.call_to_action.url}
            type={homeYaml.call_to_action.type}
          /> */}

          <h2 className="pds-spacing-mar-block-end-2xl">
            {homeYaml.topics.title}
          </h2>
          <TopicsGrid topics={homeYaml.topics.tiles} />

          <h2 className="pds-spacing-mar-block-start-6xl pds-spacing-mar-block-end-2xl">
            {homeYaml.three_column_links.title}
          </h2>
          <ThreeColumnLinks links={homeYaml.three_column_links.links} />

          <ChangelogPreview
            title={homeYaml.changelog_preview.title}
            url={homeYaml.changelog_preview.url}
            changelogs={allMdx.edges}
          />
          <Helmet title="Pantheon Docs" titleTemplate={`%s`}>
            <meta
              name="msvalidate.01"
              content="9A4A4920CF12D3347BFF74AD7E92D154"
            />
          </Helmet>
        </main>
      </Layout>
    )
  }
}

export default Index

export const pageQuery = graphql`
  {
    homeYaml {
      title
      call_to_action {
        title
        sub_title
        url
        type
      }
      topics {
        title
        tiles {
          headingText
          summary
          imageSrc
          url
        }
      }
      three_column_links {
        title
        links {
          text
          url
        }
      }
      changelog_preview {
        title
        url
      }
    }

    allMdx(
      filter: {
        fileAbsolutePath: { regex: "/changelogs/" }
        frontmatter: { draft: { ne: true } }
      }
      sort: { fields: [fileAbsolutePath], order: DESC }
      limit: 4
    ) {
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
            markdownBody {
              childMdx {
                body
              }
            }
          }
        }
      }
    }
  }
`
