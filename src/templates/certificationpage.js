import React from 'react';
import { graphql } from 'gatsby';
import { SidebarLayout } from '@pantheon-systems/pds-toolkit-react';
import GuideLayout from '../layout/GuideLayout';
import SEO from '../layout/seo';
import SearchBar from '../layout/SearchBar';
import HeaderBody from '../components/headerBody';
import OmniSidebarNav from '../components/omniSidebarNav';
import GetFeedback from '../components/getFeedback';
import NavButtons from '../components/navButtons';
import TOC from '../components/toc';
import MdxWrapper from '../components/mdxWrapper';

class CertificationTemplate extends React.Component {
  render() {
    const node = this.props.data.mdx;
    const isoDate = this.props.data.date;
    const ifCommandsDate =
      node.fields.slug == '/terminus/commands'
        ? this.props.data.terminusReleasesJson.published_at
        : node.frontmatter.reviewed;
    const ifCommandsISO =
      node.fields.slug == '/terminus/commands'
        ? this.props.data.jsonISO.published_at
        : isoDate.frontmatter.reviewed;

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
          authors={node.frontmatter.contributors}
          image={'/images/default-thumb-cert.png'}
          reviewed={ifCommandsISO}
          type={node.frontmatter.type}
        />
        <OmniSidebarNav
          slot="guide-menu"
          activePage={node.fields.slug}
          submenuPathToUse="/learning"
        />

        <ContentLayoutType slot="guide-content">
          <SearchBar slot="content" page="default" />

          <main
            slot="content"
            id="docs-main"
            tabIndex="-1"
            className="certification terminus"
          >
            <article className="doc guide-doc-body">
              <HeaderBody
                title={node.frontmatter.title}
                subtitle={node.frontmatter.subtitle}
                description={node.frontmatter.description}
                slug={node.fields.slug}
                contributors={node.frontmatter.contributors}
                featured={node.frontmatter.featuredcontributor}
                editPath={node.fields.editPath}
                reviewDate={ifCommandsDate}
                isoDate={ifCommandsISO}
              />

              <MdxWrapper mdx={node.body} />
              <NavButtons
                prev={node.frontmatter.previousurl}
                next={node.frontmatter.nexturl}
              />
            </article>
          </main>
          {hasTOC && <TOC slot="sidebar" title="Contents" />}
        </ContentLayoutType>

        <GetFeedback formId="tfYOGoE7" page={'/' + node.fields.slug} />
      </GuideLayout>
    );
  }
}

export default CertificationTemplate;

export const pageQuery = graphql`
  query TerminusPageBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      fields {
        slug
        editPath
      }
      frontmatter {
        title
        subtitle
        description
        showtoc
        contributors {
          yamlId
          name
          twitter
        }
        reviewed(formatString: "MMMM DD, YYYY")
        type
        previousurl
        nexturl
      }
      fileAbsolutePath
    }
    date: mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        reviewed
      }
    }
    terminusReleasesJson {
      published_at(formatString: "MMMM DD, YYYY")
    }
    jsonISO: terminusReleasesJson {
      published_at(formatString: "YYYY-MM-DD")
    }
  }
`;
