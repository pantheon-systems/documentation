import React from 'react';
import { graphql } from 'gatsby';
import GuideLayout from '../layout/GuideLayout';
import SEO from '../layout/seo';
import SearchBar from '../layout/SearchBar';
import HeaderBody from '../components/headerBody';
import { SidebarLayout } from '@pantheon-systems/pds-toolkit-react';
import NavButtons from '../components/navButtons';
import TOC from '../components/toc';
import MdxWrapper from '../components/mdxWrapper';
import OmniSidebarNav from '../components/omniSidebarNav';

class GuideTemplate extends React.Component {
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
    let image = '/images/' + node.frontmatter.image;
    if (image === '/images/null') {
      image = '/images/default-thumb-guides.png';
    }

    return (
      <GuideLayout>
        <SEO
          slot="seo"
          title={node.frontmatter.subtitle + ' | ' + node.frontmatter.title}
          description={node.frontmatter.description || node.excerpt}
          keywords={node.frontmatter.tags}
          authors={node.frontmatter.contributors}
          image={image}
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
        image
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
