import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { graphql, navigate } from 'gatsby';
import debounce from 'lodash.debounce';
import Mark from 'mark.js';
import { useLocation } from '@reach/router';

import Layout from '../../layout/layout/index.js';
import SEO from '../../layout/seo.js';

import ReleaseNotesPager from '../../components/releaseNotesPager.js';
import ReleaseNotePopoverCategorySelector from '../../components/releaseNotePopoverCategorySelector.js';
import ReleaseNoteTeaser from '../../components/ReleaseNoteTeaser/index.js';

import { releaseNoteCategoryLoader } from '../../data/releaseNoteCategories.js';

import {
  Container,
  FlexContainer,
  Icon,
  Tag,
} from '@pantheon-systems/pds-toolkit-react';

import './style.css';

// Set container width for search and main content.
const containerWidth = 'standard';

const ReleaseNotesListingTemplate = ({ data }) => {
  // Ref to track whether the component is loading for the first time
  const initialLoadRef = useRef(true);

  // Set up state.
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    query: '',
    categories: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [queryStrings, setQueryStrings] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const notesPerPage = 8;
  let totalPagesRef = useRef(0);

  // Ref for storing reference to the search input element
  let queryRef = useRef('');

  // Function to filter releaseNotes
  const filterData = () => {
    // Get all releasenotes.
    const releasenotes = data.allMdx.edges || [];

    // Filter releasenotes based on filters.
    const filterReleaseNotes = (releasenotes) => {
      let newFilteredData = [...releasenotes];

      // If there's a search query, filter the data based on it
      if (filters.query) {
        // Convert the search query to lowercase
        const newQuery = filters.query.toLowerCase();

        // Filter the data to include only items that match the search query
        newFilteredData = newFilteredData.filter((item) => {
          const publishedDate = item.node.frontmatter.published_date;
          const dateOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          };
          const formattedDate = new Date(publishedDate).toLocaleDateString(
            undefined,
            dateOptions,
          );

          // Filter the data to include items where the title, body, or formatted date includes the search query
          return (
            item.node.frontmatter.title.toLowerCase().includes(newQuery) ||
            item.node.rawBody.toLowerCase().includes(newQuery) ||
            formattedDate.toLowerCase().includes(filters.query.toLowerCase())
          );
        });
      }

      // If there are selected categories, filter the data to include only items that belong to at least one of those categories
      if (filters.categories.length > 0) {
        newFilteredData = newFilteredData.filter((item) => {
          const categories = item.node.frontmatter.categories || [];

          // Check if any category of the current item matches any of the selected categories
          return categories.some((category) => {
            return filters.categories.some(
              (filterCategory) => filterCategory.slug === category,
            );
          });
        });
      }

      // If there's no search query and no selected categories, return all release notes
      if (filters.query.length === 0 && filters.categories.length === 0) {
        return releasenotes;
      }

      // Return the filtered data
      return newFilteredData;
    };

    // Get all filtered data
    const allFilteredData = filterReleaseNotes(releasenotes);

    // Filtered data sliced for pagination
    const paginatedFilteredData = allFilteredData.slice(
      (currentPage - 1) * notesPerPage,
      currentPage * notesPerPage,
    );

    // Update the total pages number based on the amount of releaseNotes
    totalPagesRef.current = Math.ceil(allFilteredData.length / notesPerPage);

    // Update state based on filters and pagination.
    setFilteredData(paginatedFilteredData);

    // Mark releasenotes based on query.
    var context = document.querySelector('.docs-release-note-results');
    var markInstance = new Mark(context);
    setTimeout(function () {
      markInstance.unmark({
        done: function () {
          markInstance.mark(filters.query);
        },
      });
    }, 100);
  };

  // Handle search input.
  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setFilters((prevState) => ({ ...prevState, query: newQuery }));
    setCurrentPage(1);
  };

  // Function to remove a category from the filters state when its tag is removed
  const handleRemoveTag = (category) => {
    setFilters((prevState) => ({
      ...prevState,
      categories: [...prevState.categories.filter((item) => item !== category)],
    }));
    setCurrentPage(1);
  };

  // Function to update query strings based on filters and page
  const updateQueryStrings = () => {
    // Build updated query string
    const params = new URLSearchParams();
    filters.categories.forEach((category) => {
      params.append('category', category.slug);
    });

    if (filters.query) {
      params.append('query', filters.query);
    }

    const newQueryStrings = params.toString();
    setQueryStrings(newQueryStrings);
    if (newQueryStrings) {
      navigate(`/release-notes/${currentPage}/?${newQueryStrings}`);
    } else {
      navigate(`/release-notes/${currentPage}/`);
    }
  };

  useEffect(() => {
    filterData();

    // Update query strings in the URL based on the current filters, but only if it's not the initial load
    if (!initialLoadRef.current) {
      updateQueryStrings();
    }
  }, [filters, currentPage]);

  const location = useLocation();

  useEffect(() => {
    // Function to update filters based on URL parameters
    const updateFilters = () => {
      // Get search parameters from the URL
      const searchParams = new URLSearchParams(window.location.search);
      // Extract query and category slugs from search parameters
      const query = searchParams.get('query');
      const pageUrl = parseInt(searchParams.get('page'), 10) || 1;
      const categorySlugs = searchParams.getAll('category');
      // Map category slugs to category objects
      const categories = categorySlugs.map((slug) => ({ slug }));

      // Update filters if the query in URL parameters differs from the current query in state
      if (query !== filters.query) {
        setFilters((prevState) => ({
          query: query || '',
          categories: prevState.categories || [],
        }));
        queryRef.current.value = query;
      }

      // Update filters if categories in URL parameters differ from the current categories in state
      if (JSON.stringify(categories) !== JSON.stringify(filters.categories)) {
        setFilters((prevState) => ({
          query: prevState.query || '',
          categories: categories || [],
        }));
      }
    };

    updateFilters();

    // Set initial load reference to false after the initial update
    initialLoadRef.current = false;
  }, []);

  // Get current page from URL
  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const page = pathSegments[pathSegments.length - 1];
    const pageNumber = parseInt(page, 10);

    if (!isNaN(pageNumber)) {
      setCurrentPage(pageNumber);
    }
  }, [location.pathname]);

  // Debounce search input.
  const debouncedHandleInputChange = debounce(handleInputChange, 300);

  // Preprocess release notes teasers.
  const renderedTeasers = filteredData.map((releasenote, index) => (
    <ReleaseNoteTeaser
      key={index}
      ReleaseNoteData={releasenote.node}
      className="pds-spacing-mar-block-end-5xl"
    />
  ));

  // Render release notes or no results message.
  const noResultsMessage = (
    <p className="pds-spacing-mar-block-end-2xl">
      No results found. Try refining your search terms or explore other
      categories.
    </p>
  );
  const renderedReleaseNotes =
    filteredData.length !== 0 ? renderedTeasers : noResultsMessage;

  // Preprocess intro text.
  const introText = data.releasenotesYaml.introText;

  useLayoutEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Layout containerWidth={containerWidth} excludeSearch footerBorder>
      <SEO
        title="Pantheon release notes"
        description="A summary of changes to the Pantheon Platform"
        image={'/images/default-thumb-changelog.png'}
      />
      <main id="docs-main" tabIndex="-1">
        <Container
          width={containerWidth}
          className="pds-spacing-mar-block-start-3xl"
        >
          <h1>Pantheon release notes</h1>
          <div className="pds-lead-text pds-lead-text--sm">{introText}</div>
          <a
            href="/release-notes/rss.xml"
            target="_blank"
            className="rss-feed-link"
          >
            <Icon className="rss-feed-link-icon" iconName="rss" iconSize="lg" />
            <span>Subscribe to RSS feed</span>
          </a>
          <div
            style={{
              borderBottom: '1px solid var(--pds-color-border-default)',
              paddingBlockEnd: 'var(--pds-spacing-3xl)',
              paddingBlockStart: 'var(--pds-spacing-m)',
            }}
          >
            <div
              className="pds-input-field pds-input-field--text pds-spacing-mar-block-end-xl"
              style={{
                flexGrow: '2',
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
            <FlexContainer
              flexWrap="wrap"
              className="rn-popover-trigger-and-tags"
            >
              <ReleaseNotePopoverCategorySelector
                filters={filters}
                setFilters={setFilters}
                setCurrentPage={setCurrentPage}
                isDisabled={!isLoaded}
              />
              <FlexContainer mobileFlex="same" spacing="narrow" flexWrap="wrap">
                {filters &&
                  filters.categories.map((item) => {
                    return (
                      <Tag
                        key={item.slug}
                        tagLabel={
                          releaseNoteCategoryLoader(item.slug).displayName
                        }
                        tagColor={releaseNoteCategoryLoader(item.slug).color}
                        onRemove={() => handleRemoveTag(item)}
                        isRemovable={true}
                      />
                    );
                  })}
              </FlexContainer>
            </FlexContainer>
          </div>
          <div
            id="doc"
            className="docs-release-note-results pds-spacing-mar-block-start-2xl"
          >
            {renderedReleaseNotes}
          </div>
          <ReleaseNotesPager
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPagesRef={totalPagesRef}
            queryStrings={queryStrings}
            setIsPageLoaded={setIsLoaded}
          />
        </Container>
      </main>
    </Layout>
  );
};

export default ReleaseNotesListingTemplate;

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
`;
