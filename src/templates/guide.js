import React from 'react';
import { graphql } from 'gatsby';
import GuideLayout from '../layout/GuideLayout';
import SEO from '../layout/seo';
import SearchBar from '../layout/SearchBar';
import HeaderBody from '../components/headerBody';
import OmniSidebarNav from '../components/omniSidebarNav';
import { SidebarLayout } from '@pantheon-systems/pds-toolkit-react';
import NavButtons from '../components/navButtons';
import TOC from '../components/toc';
import MdxWrapper from '../components/mdxWrapper';

class GuideTemplate extends React.Component {
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
    const isoDate = this.props.data.date;
    const items = this.props.data.allMdx.edges.map((item) => {
      return {
        id: item.node.id,
        link: item.node.fields.slug,
        title: item.node.frontmatter.subtitle,
      };
    });

    // Preprocess content region layout if has TOC or not.
    const hasTOC = node.frontmatter.showtoc;
    const ContainerDiv = ({ children }) => (
      <div className="content-wrapper">{children}</div>
    );
    const ContentLayoutType = hasTOC ? SidebarLayout : ContainerDiv;

    return (
      <GuideLayout>
        <SEO
          slot="seo"
          title={node.frontmatter.subtitle + ' | ' + node.frontmatter.title}
          description={node.frontmatter.description || node.excerpt}
          keywords={node.frontmatter.tags}
          authors={node.frontmatter.contributors}
          image={'/images/assets/terminus-thumbLarge.png'}
          reviewed={isoDate.frontmatter.reviewed}
          type={node.frontmatter.type}
        />

        <OmniSidebarNav
          slot="guide-menu"
          activePage={node.fields.slug}
          fallbackTitle={node.frontmatter.title}
          fallbackItems={items}
        />

        <ContentLayoutType slot="guide-content">
          <SearchBar slot="content" page="default" />
          <main slot="content" id="docs-main" tabIndex="-1">
            <article className="doc guide-doc-body pds-spacing-pad-block-end-2xl">
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
              />
              <MdxWrapper mdx={node.body} />
            </article>
          </main>
          <NavButtons
            prev={this.props.pageContext.previous}
            next={this.props.pageContext.next}
          />

          {hasTOC && <TOC slot="sidebar" title="Contents" />}
        </ContentLayoutType>
      </GuideLayout>
    );
  }
}

export default GuideTemplate;

export const pageQuery = graphql`
  query GuidePageBySlug($slug: String!, $guide_directory: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      fields {
        slug
        guide_directory
        editPath
      }
      frontmatter {
        title
        subtitle
        description
        showtoc
        editpath
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
    allMdx(
      filter: {
        fileAbsolutePath: { ne: null }
        fields: { guide_directory: { eq: $guide_directory } }
        frontmatter: { draft: { ne: true } }
      }
      sort: { fields: [fileAbsolutePath], order: ASC }
    ) {
      edges {
        node {
          id
          fields {
            slug
            guide_directory
          }
          frontmatter {
            subtitle
          }
        }
      }
    }
  }
`;
