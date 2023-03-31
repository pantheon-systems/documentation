const config = require('./config');

const pageQuery = /* GraphQL */`{

    allDocs: allMdx(
        filter: {
          fields: {
            slug: {regex: "/^((?!guides|changelog|partials).)*$/"}
          },
          fileAbsolutePath: { regex: "/content/"}
          frontmatter: { draft: {ne: true}}
        }
    ) {
      edges {
        node {
          objectID: id
          fields {
            slug
          }
          headings {
            value
          }
          frontmatter {
            title
            description
          }
          excerpt(pruneLength: 50000)
        }
      }
    }

    allGuides: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/guides/"}
        frontmatter: { draft: {ne: true}}
      }
      sort: { fields: [fileAbsolutePath], order: ASC }
    ) {
      edges {
        node {
          objectID: id
          fields {
            slug
          }
          headings {
            value
          }
          frontmatter {
            title
            description
          }
          excerpt(pruneLength: 50000)
        }
      }
    }

    allChangelogs: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/changelogs/"}
        frontmatter: { draft: {ne: true}}
      },
      sort: { fields: [fileAbsolutePath], order: DESC }
    ) {
      edges {
        node {
          objectID: id
          fields {
            slug
          }
          headings {
            value
          }
          frontmatter {
            title
            description
          }
          excerpt(pruneLength: 50000)
        }
      }
    }
  }`;
  
const flatten = arr =>
  arr.map(({ node: { frontmatter, fields, ...rest } }) => ({
    ...frontmatter,
    ...fields,
    ...rest,
  }));

const settings = { attributesToSnippet: [`excerpt:20`] };

const indexName = config.search ? config.search.indexName : '';

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => flatten(data.pages.edges),
    indexName: `${indexName}`,
    settings,
  },
];

module.exports = queries;
