import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../layout/layout"
import SEO from "../layout/seo"
import ReleaseNoteTeaser from "../components/releaseNoteTeaser.js"
// import { releaseNotePseudoQueryFields } from "../data/fragments.js"


import {
  Container,
  Icon,
} from "@pantheon-systems/pds-toolkit-react"

// Set container width for search and main content.
const containerWidth = "standard"

class ReleaseNotesListingTemplate extends React.Component {
  componentDidMount() {
    $("[data-toggle=popover]").popover({
      trigger: "click",
    })

    $("body").on("click", function (e) {
      $('[data-toggle="popover"]').each(function () {
        if (
          !$(this).is(e.target) &&
          $(this).has(e.target).length === 0 &&
          $(".popover").has(e.target).length === 0
        ) {
          $(this).popover("hide")
        }
      })
    })

    $("body").keyup(function (e) {
      $('[data-toggle="popover"]').each(function () {
        if (event.which === 27) {
          $(this).popover("hide")
        }
      })
    })
  }

  render() {
    const releasenotes = this.props.data.allMdx.edges
    return (
      <Layout containerWidth={containerWidth} footerBorder>
        <SEO
          title="Pantheon Release Notes"
          description="A summary of changes to the Pantheon Platform"
          image={"assets/images/default-thumb-doc.png"}
        />
        <main id="docs-main" tabindex="-1">
          <Container width={containerWidth}>
            <h1>Pantheon Release Notes</h1>
            <hr />
            <div id="doc" className="doc changelog__content">
              <div id="pds-toc-source">
                <div className="pds-spacing-mar-block-start-s pds-spacing-mar-block-end-2xl">
                  {releasenotes.map((releasenote) => (
                    <React.Fragment key={releasenote.id}>
                      <ReleaseNoteTeaser key={releasenote.id} ReleaseNoteData={releasenote.node} />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </main>
      </Layout>
    )
  }
}

export default ReleaseNotesListingTemplate

export const pageQuery = graphql`


query releasenotes {
    allMdx(
      filter: {
        fileAbsolutePath: { regex: "/releasenotes/" }
      }
      sort: { fields: [fileAbsolutePath], order: DESC }
    ) {
      edges {
        node {
          id
          body
          frontmatter {
            title,
            published_date,
            categories,
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
