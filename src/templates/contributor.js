import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../layout/layout';
import SEO from '../layout/seo';
import ContributorLink from '../components/ContributorLink';

import { Container, TwoItemLayout } from '@pantheon-systems/pds-toolkit-react';

const links = [
  {
    property: 'url',
    icon: 'user',
  },
  {
    property: 'github',
    icon: 'github',
  },
  {
    property: 'drupal',
    icon: 'drupal',
  },
  {
    property: 'wordpress',
    icon: 'wordpress',
  },
  {
    property: 'twitter',
    icon: 'twitter',
  },
  {
    property: 'linkedin',
    icon: 'linkedin',
  },
];

// Set container width for search and main content.
const containerWidth = 'standard';

class ContributorTemplate extends React.Component {
  render() {
    const contributor = this.props.data.contributorYaml;

    // console.log(contributor)

    return (
      <Layout containerWidth={containerWidth} footerBorder>
        <SEO title={contributor.name} />
        <title>{contributor.name}</title>
        <main id="docs-main" tabIndex="-1">
          <Container width={containerWidth} className="docs-contributor">
            <div className="article">
              <TwoItemLayout layoutVariant="one-third-start">
                <div slot="first-item" className="docs-contributor__image">
                  <img
                    alt="Author photo"
                    typeof="foaf:Image"
                    src={contributor.avatar}
                    width="540"
                    height="540"
                  />
                </div>

                <div slot="second-item" className="docs-contributor__header">
                  <h1>{contributor.name}</h1>
                  <div className="docs-contributor__social">
                    {links.map((link, i) => {
                      const url = contributor.hasOwnProperty(link.property)
                        ? contributor[link.property]
                        : null;
                      if (url !== null) {
                        return (
                          <ContributorLink key={i} url={url} icon={link.icon} />
                        );
                      }
                    })}
                  </div>
                </div>

                <div
                  slot="second-item"
                  className="docs-contributor__contributions"
                >
                  <h2>
                    <a
                      href={`https://github.com/pantheon-systems/documentation/commits?author=${contributor.yamlId}`}
                    >
                      See contributions on GitHub
                    </a>
                  </h2>
                </div>
              </TwoItemLayout>
            </div>
          </Container>
        </main>
      </Layout>
    );
  }
}

export default ContributorTemplate;

export const pageQuery = graphql`
  query ContributorById($id: String!) {
    contributorYaml(yamlId: { eq: $id }) {
      name
      avatar
      yamlId
      url
      github
      drupal
      wordpress
      twitter
      linkedin
    }

    allDocs: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { ne: null }
        frontmatter: {
          contributors: { eq: $id }
          draft: { ne: true }
          innav: { eq: true }
        }
      }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            permalink
          }
          fileAbsolutePath
        }
      }
    }
    relativePath: allFile(filter: { relativePath: { ne: "null" } }) {
      edges {
        node {
          relativePath
          publicURL
        }
      }
    }
  }
`;
