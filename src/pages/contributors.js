import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../layout/layout"
import SEO from "../layout/seo"

import { AvatarTileList, Container } from "@pantheon-systems/pds-toolkit-react"

// Set container width for search and main content.
const containerWidth = "narrow"

class Contributors extends React.Component {
  render() {
    const {
      data: { allContributorYaml },
    } = this.props

    let contributorsList = []

    allContributorYaml.edges.map(({ node }) => {
      console.log(node)
      contributorsList.push({
        image: node.avatar,
        alt: "",
        name: node.name,
        title: node.bio,
        linkContent: (
          <Link to={`/contributors/${node.yamlId}`} title={node.id}></Link>
        ),
      })
    })

    return (
      <Layout containerWidth={containerWidth}>
        <SEO title="Contributors" />
        <main id="docs-main">
          <Container width={containerWidth} className="docs-contributors">
            <h1 className="title">Contributors</h1>
            <AvatarTileList listItems={contributorsList} />
          </Container>
        </main>
      </Layout>
    )
  }
}

export default Contributors

export const pageQuery = graphql`
  {
    allContributorYaml {
      edges {
        node {
          yamlId
          avatar
          name
          bio
        }
      }
    }
  }
`
