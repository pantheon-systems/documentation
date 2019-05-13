const path = require(`path`);

const calculateSlug = (node, getNode) => {
  const fileName = getNode(node.parent).name;

  if (node.frontmatter.permalink) {
    return node.frontmatter.permalink.replace(":basename", fileName);
  }

  return fileName;
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        components: path.resolve(__dirname, 'src/components'),
      },
    },
  });
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(`
      {
        allDocs: allMdx(filter: {fields: {slug: {regex: "/^((?!guides).)*$/"}}}) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create doc pages.
    const docs = result.data.allDocs.edges
    docs.forEach((doc) => {
      createPage({
        path: `/docs/${doc.node.fields.slug}`,
        component: path.resolve(`./src/templates/doc.js`),
        context: {
          slug: doc.node.fields.slug
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const slug = calculateSlug(node, getNode);
    createNodeField({
      name: `slug`,
      node,
      value: slug
    });
  }
}
