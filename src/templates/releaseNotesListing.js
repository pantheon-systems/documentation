import React, { useState } from "react"
import { graphql } from "gatsby"
import debounce from "lodash.debounce"

import Layout from "../layout/layout"
import SEO from "../layout/seo"
import ReleaseNoteTeaser from "../components/ReleaseNoteTeaser"
import ReleaseNoteCategorySelector from "../components/releaseNoteCategorySelector.js"
import { releaseNoteFragment } from "../fragments/releaseNote.js"

import {
  Container,
  FlexContainer,
  Icon,
} from "@pantheon-systems/pds-toolkit-react"

// Set container width for search and main content.
const containerWidth = "standard"

const ReleaseNotesListingTemplate = ({ data }) => {
  const allReleasenotes = data.allMdx.edges
  const emptyQuery = ""

  // Set up state.
  const [filteredData, setFilteredData] = useState([])
  const [query, setQuery] = useState(emptyQuery)

  // Handle search input.
  const handleInputChange = (event) => {
    const query = event.target.value

    // Get all releasenotes.
    const releasenotes = data.allMdx.edges || []

    // Filter releasenotes based on query.
    const filteredData = releasenotes.filter((releasenote) => {
      const title = releasenote.node.frontmatter.title
      const rawBody = releasenote.node.rawBody
      const publishedDate = releasenote.node.frontmatter.published_date
      const dateOptions = { year: "numeric", month: "long", day: "numeric" }
      const formattedDate = new Date(publishedDate).toLocaleDateString(
        undefined,
        dateOptions
      )
      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
        rawBody.toLowerCase().includes(query.toLowerCase()) ||
        formattedDate.toLowerCase().includes(query.toLowerCase())
      )
    })

    // Update state based on query.
    setFilteredData(filteredData)
    setQuery(query)
  }

  // Debounce search input.
  const debouncedHandleInputChange = debounce(handleInputChange, 300)

  // If query is empty, show all releasenotes.
  const hasSearchResults = filteredData && query !== emptyQuery
  const releasenotes = hasSearchResults ? filteredData : allReleasenotes

  releasenotes.map((releasenote, index) =>
    console.log(releasenote.node.frontmatter.published_date)
  )

  return (
    <Layout containerWidth={containerWidth} excludeSearch footerBorder>
      <SEO
        title="Pantheon Release Notes"
        description="A summary of changes to the Pantheon Platform"
        image={"assets/images/default-thumb-doc.png"}
      />
      <main id="docs-main" tabIndex="-1">
        <Container
          width={containerWidth}
          className="pds-spacing-mar-block-start-3xl"
        >
          <h1>Pantheon Release Notes</h1>
          <FlexContainer
            style={{
              borderBottom: "1px solid var(--pds-color-border-default)",
              paddingBlockEnd: "var(--pds-spacing-3xl)",
              paddingBlockStart: "var(--pds-spacing-m)",
            }}
          >
            <div
              className="pds-input-field__input-wrapper"
              style={{
                flexGrow: "2",
              }}
            >
              <div class="pds-input-field__decorators">
                <Icon iconName="barsFilter" />
              </div>
              <input
                type="search"
                aria-label="Filter release notes"
                placeholder="Filter release notes"
                id="release-note-filter"
                className="pds-input-field__input"
                onChange={debouncedHandleInputChange}
              />
            </div>
            <ReleaseNoteCategorySelector />
          </FlexContainer>
          <div id="doc" className="pds-spacing-mar-block-start-2xl">
            {releasenotes.map((releasenote, index) => (
              <ReleaseNoteTeaser
                key={index}
                ReleaseNoteData={releasenote.node}
                className="pds-spacing-mar-block-end-5xl"
              />
            ))}
          </div>
        </Container>
      </main>
    </Layout>
  )
}

export default ReleaseNotesListingTemplate

export const pageQuery = graphql`
  query releasenotesListing {
    allMdx(
      filter: { fileAbsolutePath: { regex: "/releasenotes/" } }
      sort: { fields: [fileAbsolutePath], order: DESC }
    ) {
      edges {
        node {
          rawBody
          ... on Mdx {
            ...theReleaseNoteFields
          }
        }
      }
    }
  }
`
