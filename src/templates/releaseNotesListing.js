import React, { useEffect, useState, useRef } from "react"
import { graphql } from "gatsby"
import debounce from "lodash.debounce"
import Mark from "mark.js"

import Layout from "../layout/layout"
import SEO from "../layout/seo"
import ReleaseNoteTeaser from "../components/ReleaseNoteTeaser"
import ReleaseNotePopoverCategorySelector from "../components/releaseNotePopoverCategorySelector.js"

import { activeReleaseNoteCategories } from "../data/releaseNoteCategories"
import { releaseNoteCategoryLoader } from "../data/releaseNoteCategories.js"

import {
  Container,
  FlexContainer,
  Icon,
  Tag,
} from "@pantheon-systems/pds-toolkit-react"

// Set container width for search and main content.
const containerWidth = "standard"

const ReleaseNotesListingTemplate = ({ data }) => {
  const allReleasenotes = data.allMdx.edges
  const emptyQuery = ""

  // Get the active categories data.
  const activeCategories = JSON.parse(activeReleaseNoteCategories())

  // Set up state.
  const [filteredData, setFilteredData] = useState([])
  const [filters, setFilters] = useState({
    query: '',
    categories: []
  })

  let queryRef = useRef('')

  const filterData = () => {
    // Get all releasenotes.
    const releasenotes = data.allMdx.edges || []

    // Filter releasenotes based on filters.
    const filterReleaseNotes = (releasenotes) => {
      let newFilteredData = [...releasenotes]

      if(filters.query){
        const newQuery = filters.query.toLowerCase()

        newFilteredData = newFilteredData.filter(item => {
          const publishedDate = item.node.frontmatter.published_date
          const dateOptions = { year: "numeric", month: "long", day: "numeric" }
          const formattedDate = new Date(publishedDate).toLocaleDateString(
            undefined,
            dateOptions
          )

          return (
            item.node.frontmatter.title.toLowerCase().includes(newQuery) ||
            item.node.rawBody.toLowerCase().includes(newQuery) ||
            formattedDate.toLowerCase().includes(filters.query.toLowerCase())
          )
        })
      }

      if(filters.categories.length > 0){
        newFilteredData = newFilteredData.filter(item => {
          return item.node.frontmatter.categories.some(category => {
            return filters.categories.some(filterCategory => filterCategory.slug === category)
          })
        })
      }

      if(filters.query.length===0 && filters.categories.length === 0){
        return releasenotes
      }

      return newFilteredData
    }

    // Update state based on filters.
    setFilteredData(filterReleaseNotes(releasenotes))

    // Mark releasenotes based on query.
    var context = document.querySelector(".docs-release-note-results")
    var markInstance = new Mark(context)
    setTimeout(function () {
      markInstance.unmark({
        done: function () {
          markInstance.mark(filters.query)
        },
      })
    }, 100)
  }

  // Handle search input.
  const handleInputChange = (event) => {
    const newQuery = event.target.value
    setFilters( prevState => ({ ...prevState, query: newQuery }))
  }

  const handleRemoveTag = (category) => {
    setFilters(prevState => ({...prevState, categories:[...prevState.categories.filter(item => item !== category )]}))
  }

  useEffect(() => {
    filterData()

    const updateQueryStrings = () => {
      // Build updated query string
      const params = new URLSearchParams()
      filters.categories.forEach(category => {
        params.append('category', category.slug)
      })

      // Get current URL and add query string
      const currentUrl = window.location.href.split('?')[0]

      // Add '?' and params only if filters are selected
      const newUrl = filters.categories.length > 0 ? currentUrl + '?' + params.toString() : currentUrl

      // Update URL
      window.history.replaceState({}, '', newUrl)
    }

    updateQueryStrings()

  },[filters])

  useEffect(() => {
    const updateFilters = () => {
      const searchParams = new URLSearchParams(window.location.search)
      const query = searchParams.get('query')
      const categorySlugs = searchParams.getAll('category')
      const categories = categorySlugs.map(slug => ({slug}))

      if( query !== filters.query ){
        setFilters( prevState => (
          {
            query: query || '',
            categories: prevState.categories || []
          }
        ))
        queryRef.current.value = query
      }

      if( JSON.stringify(categories) !== JSON.stringify(filters.categories) ) {
        setFilters( prevState => (
          {
            query: prevState.query || '',
            categories: categories || []
          }
        ))
      }
    }

    updateFilters()
  },[])

  // Debounce search input.
  const debouncedHandleInputChange = debounce(handleInputChange, 300)

  // Preprocess release notes teasers.
  const renderedTeasers = filteredData.map((releasenote, index) => (
    <ReleaseNoteTeaser
      key={index}
      ReleaseNoteData={releasenote.node}
      className="pds-spacing-mar-block-end-5xl"
    />
  ))

  // Render release notes or no results message.
  const noResultsMessage = (
    <p className="pds-spacing-mar-block-end-2xl">
      No results found. Try refining your search terms or explore other
      categories.
    </p>
  )
  const renderedReleaseNotes =
    filteredData.length !== 0 ? renderedTeasers : noResultsMessage

  // Preprocess intro text.
  const introText = data.releasenotesYaml.introText

  return (
    <Layout containerWidth={containerWidth} excludeSearch footerBorder>
      <SEO
        title="Pantheon release notes"
        description="A summary of changes to the Pantheon Platform"
        image={"assets/images/default-thumb-doc.png"}
      />
      <main id="docs-main" tabIndex="-1">
        <Container
          width={containerWidth}
          className="pds-spacing-mar-block-start-3xl"
        >
          <h1>Pantheon release notes</h1>
          <div className="pds-lead-text pds-lead-text--sm">{introText}</div>
          <div
            style={{
              borderBottom: "1px solid var(--pds-color-border-default)",
              paddingBlockEnd: "var(--pds-spacing-3xl)",
              paddingBlockStart: "var(--pds-spacing-m)",
            }}
          >
            <div
              className="pds-input-field__input-wrapper pds-spacing-mar-block-end-xl"
              style={{
                flexGrow: "2",
              }}
            >
              <div className="pds-input-field__decorators">
                <Icon iconName="barsFilter" />
              </div>
              <input
                type="search"
                aria-label="Filter by text"
                placeholder="Filter by text"
                ref={queryRef}
                id="release-note-filter"
                className="pds-input-field__input"
                onChange={debouncedHandleInputChange}
              />
            </div>
            <FlexContainer alignItems='center' flexWrap='wrap' >
              <ReleaseNotePopoverCategorySelector filters={filters} setFilters={setFilters} />
              {
                filters && filters.categories.map(item => {
                  return (
                    <Tag
                      key={item.slug}
                      tagLabel={releaseNoteCategoryLoader(item.slug).displayName}
                      tagColor={releaseNoteCategoryLoader(item.slug).color}
                      onRemove={() => handleRemoveTag(item)}
                      isRemovable={true}
                    />
                  )
                })
              }
            </FlexContainer>
          </div>
          <div
            id="doc"
            className="docs-release-note-results pds-spacing-mar-block-start-2xl"
          >
            {renderedReleaseNotes}
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
    releasenotesYaml {
      introText
    }
  }
`
