import { useStaticQuery, graphql } from 'gatsby';

const getAllGuidePages = () => {
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

function getChildrenForGuideDirectory(AllTheGuides, guideDirectory) {
  const ChildItems = [];
  for (let item of AllTheGuides) {
    if (item.node.fields.guide_directory === guideDirectory) {
      ChildItems.push({
        link: item.node.fields.slug,
        title: item.node.frontmatter.subtitle,
      });
    }
  }
  return ChildItems;
}

function getTitleForGuideDirectory(AllTheGuides, guideDirectory) {
  for (let item of AllTheGuides) {
    if (item.node.fields.slug === '/' + guideDirectory) {
      return item.node.frontmatter.title;
    }
  }
}

const getGuideDirectory = (guideDirectory) => {
  const AllGuides = getAllGuidePages();
  return {
    link: '/' + guideDirectory,
    title: getTitleForGuideDirectory(AllGuides.allGuides.edges, guideDirectory),
    children: getChildrenForGuideDirectory(
      AllGuides.allGuides.edges,
      guideDirectory,
    ),
  };
};

export default getGuideDirectory;
