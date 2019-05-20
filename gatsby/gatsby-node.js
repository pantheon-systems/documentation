const path = require(`path`)

const calculateSlug = (node, getNode) => {
  const fileName = getNode(node.parent).name

  if (node.frontmatter.permalink) {
    return node.frontmatter.permalink.replace(":basename", fileName)
  }

  return `/docs/${fileName}`
}

const calculateTemplate = (node, defaultTemplate) => {
  if (node.frontmatter !== undefined && node.frontmatter.layout !== null) {
    return node.frontmatter.layout
  }

  return defaultTemplate
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(`
    {
      allDocs: allMdx(
        filter: { fields: { slug: { regex: "/^((?!guides).)*$/" } } }
      ) {
        edges {
          node {
            frontmatter {
              title
              layout
              permalink
              nexturl
              previousurl
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create doc pages.
    const docs = result.data.allDocs.edges
    docs.forEach(doc => {
      const template = calculateTemplate(doc.node, "doc")
      console.log(template)
      createPage({
        path: doc.node.fields.slug,
        component: path.resolve(`./src/templates/${template}.js`),
        context: {
          slug: doc.node.fields.slug,
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const slug = calculateSlug(node, getNode)
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })
  }
}
