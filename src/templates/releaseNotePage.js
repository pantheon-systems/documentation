import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../layout/layout';
import SEO from '../layout/seo';
import ReleaseNoteCategories from '../components/ReleaseNoteCategories';
import MdxWrapper from '../components/mdxWrapper.js';
import PublishedDate from '../components/PublishedDate';
import { Container, Icon } from '@pantheon-systems/pds-toolkit-react';
import {
  headline2,
  headline3,
  headline4,
} from '../components/releaseHeadlines';

const customShortcodes = {
  h1: headline2,
  h2: headline3,
  h3: headline4,
};

// Set container width for search and main content.
const containerWidth = 'standard';

class ReleaseNoteTemplate extends React.Component {
  render() {
    const node = this.props.data.mdx;

    return (
      <Layout containerWidth={containerWidth} excludeSearch footerBorder>
        <SEO
          title={node.frontmatter.title}
          description={node.frontmatter.description || node.excerpt}
          authors={node.frontmatter.contributors}
          image={'/images/default-thumb-changelog.png'}
        />
        <main id="docs-main" tabIndex="-1">
          <Container
            width={containerWidth}
            className="pds-spacing-mar-block-start-3xl"
          >
            <div className="pds-overline-text pds-overline-text--lg pds-spacing-mar-block-end-xs">
              <Link to="/release-notes" className="pds-spacing-mar-block-end-m">
                Pantheon Release Notes
              </Link>
            </div>
            <h1 className="pds-spacing-mar-block-end-l">
              {node.frontmatter.title}
            </h1>
            <ReleaseNoteCategories
              categories={node.frontmatter.categories}
              displayType="page"
              className="pds-spacing-mar-block-end-xl"
            />

            <article className="pds-spacing-pad-block-end-xl">
              <div id="doc" className="doc changelog__content">
                <div className="pds-spacing-mar-block-start-s pds-spacing-mar-block-end-2xl">
                  <PublishedDate
                    dateString={node.frontmatter.published_date}
                    className="pds-spacing-mar-block-end-m"
                  />
                  <MdxWrapper
                    mdx={node.body}
                    customShortcodes={customShortcodes}
                  />
                </div>
              </div>

              <div className="pds-spacing-mar-block-4xl">
                <a
                  href="/release-notes/rss.xml"
                  target="_blank"
                  className="rss-feed-link"
                >
                  <Icon
                    className="rss-feed-link-icon"
                    iconName="rss"
                    iconSize="lg"
                  />
                  <span>Subscribe to RSS feed</span>
                </a>
              </div>
            </article>
          </Container>
        </main>
      </Layout>
    );
  }
}

export default ReleaseNoteTemplate;

export const pageQuery = graphql`
  query ReleaseNoteBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      ...theReleaseNoteFields
    }
  }
`;
