import React from "react"
import { Link, graphql } from "gatsby"
import Helmet from "react-helmet"
import Layout from "../layout/layout"
import SEO from "../layout/seo"

import ChangelogList from "../pds-middleware/ChangelogList"
import LinksList from "../pds-middleware/LinksList"
import CallToAction from "../pds-middleware/CallToAction"
import TopicsGrid from "../pds-middleware/TopicsGrid"

import { CTASlice, TwoItemLayout } from "@pantheon-systems/pds-toolkit-react"

// Content for CTA
const primaryCTA = {
  text: "Learn Pantheon",
  url: "https://pantheon.io/learn-pantheon?docs",
}

const secondaryCTA = {
  text: "Office Hours",
  url: "https://pantheon.io/developers/office-hours?docs",
}

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
        <main className="pds-container" id="docs-main">
          <CallToAction
            title={homeYaml.title}
            subTitle={homeYaml.call_to_action.subtitle}
            url={homeYaml.call_to_action.url}
            linkText={homeYaml.call_to_action.linkText}
            imageSrc={homeYaml.call_to_action.imageSrc}
          />

          <h2 className="pds-spacing-mar-block-start-xl pds-spacing-mar-block-end-2xl">
            {homeYaml.topics.title}
          </h2>
          <TopicsGrid topics={homeYaml.topics.tiles} />

          <TwoItemLayout
            layoutVariant="equal"
            className="pds-spacing-mar-block-start-6xl"
          >
            <div slot="first-item">
              <h2 className="pds-spacing-mar-block-end-2xl">
                {homeYaml.three_column_links.title}
              </h2>
              <LinksList links={homeYaml.three_column_links.links} />
            </div>

            <div slot="second-item">
              <h2 className="pds-spacing-mar-block-end-2xl">
                {homeYaml.changelog_preview.title}
              </h2>
              <ChangelogList
                url={homeYaml.changelog_preview.url}
                changelogs={allMdx.edges}
              />
            </div>
          </TwoItemLayout>

          <Helmet title="Pantheon Docs" titleTemplate={`%s`}>
            <meta
              name="msvalidate.01"
              content="9A4A4920CF12D3347BFF74AD7E92D154"
            />
          </Helmet>
        </main>
        <CTASlice
          backgroundColor="secondary"
          containerWidth="wide"
          headingText="Got questions? We've got answers!"
          primaryLink={primaryCTA}
          secondaryLink={secondaryCTA}
          className="pre-footer-slice"
        />
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
        subtitle
        url
        linkText
        imageSrc
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
