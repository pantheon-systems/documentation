import { useStaticQuery, graphql } from 'gatsby';

const allGuides = () => {
  const AllTheGuides = useStaticQuery(
    graphql`
      {
        allGuides: allMdx(
          filter: {
            fileAbsolutePath: { ne: null }
            fields: { guide_directory: { ne: null } }
            frontmatter: { draft: { ne: true } }
          }
          sort: { fields: [fileAbsolutePath], order: ASC }
        ) {
          edges {
            node {
              fields {
                slug
                guide_directory
              }
              frontmatter {
                title
                subtitle
              }
            }
          }
        }
      }
    `,
  );

  return AllTheGuides;
};

export default allGuides;
