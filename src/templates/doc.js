import React from 'react';
import { graphql } from 'gatsby';
import GuideLayout from '../layout/GuideLayout';
import SearchBar from '../layout/SearchBar';

import SEO from '../layout/seo';
import HeaderBody from '../components/headerBody';
import TOC from '../components/toc';
import GetFeedback from '../components/getFeedback';

import { Container, SidebarLayout } from '@pantheon-systems/pds-toolkit-react';

import MdxWrapper from '../components/mdxWrapper';
import OmniSidebarNav from '../components/omniSidebarNav';

// Set container width for search and main content.
const containerWidth = 'standard';

class DocTemplate extends React.Component {
  componentDidMount() {
    $('[data-toggle=popover]').popover({
      trigger: 'click',
      placement: 'right',
    });

    $('body').on('click', function (e) {
      $('[data-toggle="popover"]').each(function () {
        if (
          !$(this).is(e.target) &&
          $(this).has(e.target).length === 0 &&
          $('.popover').has(e.target).length === 0
        ) {
          $(this).popover('hide');
        }
      });
    });

    $('body').keyup(function (e) {
      $('[data-toggle="popover"]').each(function () {
        if (event.which === 27) {
          $(this).popover('hide');
        }
      });
    });
  }

  render() {
    const node = this.props.data.doc;
    const isoDate = this.props.data.date;

    const ContainerDiv = ({ children }) => (
      <div className="content-wrapper">{children}</div>
    );
    const ContentLayoutType = ContainerDiv;

    return (
      <GuideLayout footerBorder>
        <SEO
          slot="seo"
          title={node.frontmatter.title}
          description={node.frontmatter.description || node.excerpt}
          authors={node.frontmatter.contributors}
          image={'/images/assets/default-thumb-doc.png'}
          categories={node.frontmatter.categories}
          keywords={node.frontmatter.tags}
          reviewed={isoDate.frontmatter.reviewed}
          type={node.frontmatter.type}
        />

        <OmniSidebarNav slot="guide-menu" activePage={node.fields.slug} />

        <ContentLayoutType slot="guide-content">
          <main id="docs-main" tabIndex="-1">
            <Container
              width={containerWidth}
              className="pds-spacing-pad-block-end-4xl"
            >
              <SidebarLayout>
                <article slot="content" className="doc article styleguide">

                  <SearchBar slot="content" page="default" />

                  <HeaderBody
                    title={node.frontmatter.title}
                    subtitle={node.frontmatter.subtitle}
                    description={node.frontmatter.description}
                    slug={node.fields.slug}
                    contributors={node.frontmatter.contributors}
                    featured={node.frontmatter.featuredcontributor}
                    editPath={node.fields.editPath}
                    reviewDate={node.frontmatter.reviewed}
                    isoDate={isoDate.frontmatter.reviewed}
                    cms={node.frontmatter.cms}
                  />
                  <div style={{ marginTop: '15px', marginBottom: '45px' }}>
                    <MdxWrapper mdx={node.body} />
                  </div>
                </article>
                <TOC slot="sidebar" title="Contents" />
                <GetFeedback
                  formId="tfYOGoE7"
                  page={node.frontmatter.title}
                  topic={
                    node.frontmatter.categories
                      ? node.frontmatter.categories.toString()
                      : null
                  }
                />
              </SidebarLayout>
            </Container>
          </main>
        </ContentLayoutType>
      </GuideLayout>
    );
  }
}

export default DocTemplate;

export const pageQuery = graphql`
  query DocBySlug($slug: String!) {
    doc: mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      fields {
        slug
        editPath
      }
      frontmatter {
        title
        description
        categories
        cms
        contributors {
          yamlId
          name
          twitter
          bio
          avatar
          url
        }
        featuredcontributor
        reviewed(formatString: "MMMM DD, YYYY")
        showtoc
        tags
        type
      }
      fileAbsolutePath
    }
    date: mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        reviewed
      }
    }
  }
`;
