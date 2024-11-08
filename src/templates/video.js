import React from 'react';
import GuideLayout from '../layout/GuideLayout';

import { graphql } from 'gatsby';
import SearchBar from '../layout/SearchBar';

import HeaderBody from '../components/headerBody';
import SEO from '../layout/seo';
import { Container } from '@pantheon-systems/pds-toolkit-react';
import MdxWrapper from '../components/mdxWrapper';
import OmniSidebarNav from '../components/omniSidebarNav';

// Set container width for search and main content.
const containerWidth = 'standard';

class VideoTemplate extends React.Component {
  componentDidMount() {
    $('[data-toggle=popover]').popover({
      trigger: 'click',
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
    const node = this.props.data.mdx;

    const ContainerDiv = ({ children }) => (
      <div className="content-wrapper">{children}</div>
    );
    const ContentLayoutType = ContainerDiv;

    return (
      <GuideLayout footerBorder>
        <SEO
          // @todo, make sure all updated templates have this slot
          slot="seo"
          title={node.frontmatter.title}
          description={node.frontmatter.description || node.excerpt}
          authors={node.frontmatter.contributors}
          image={'/images/assets/default-thumb-doc.png'}
          type={node.frontmatter.type}
        />
        <OmniSidebarNav slot="guide-menu" activePage={node.fields.slug} />
        <ContentLayoutType slot="guide-content">
          <main id="docs-main" tabIndex="-1">
            <Container width={containerWidth} className="docs-video">
              <SearchBar slot="content" page="default" />

              <HeaderBody
                title={node.frontmatter.title}
                subtitle={node.frontmatter.subtitle}
                description={node.frontmatter.description}
                slug={node.fields.slug}
                contributors={node.frontmatter.contributors}
                featured={node.frontmatter.featuredcontributor}
              />

              <article className="pds-spacing-mar-block-end-4xl">
                <MdxWrapper mdx={node.body} />
              </article>
            </Container>
          </main>
        </ContentLayoutType>
      </GuideLayout>
    );
  }
}

export default VideoTemplate;

export const pageQuery = graphql`
  query VideoBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      fields {
        slug
      }
      frontmatter {
        title
        description
        contributors {
          yamlId
          name
          twitter
          bio
          avatar
          url
        }
        featuredcontributor
        type
      }
      fileAbsolutePath
    }
  }
`;
