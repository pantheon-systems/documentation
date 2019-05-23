const path = require(`path`)
const crypto = require("crypto")

const calculateSlug = (node, getNode) => {
  const fileName = getNode(node.parent).name

  if (node.frontmatter.permalink) {
    return node.frontmatter.permalink
      .replace(":basename", fileName)
      .replace(/.$/, "")
  }

  return `docs/${fileName}`
}

const calculateTemplate = (node, defaultTemplate) => {
  if (node.frontmatter !== undefined && node.frontmatter.layout !== null) {
    return node.frontmatter.layout
  }

  return defaultTemplate
}

const digest = str =>
  crypto
    .createHash("md5")
    .update(str)
    .digest("hex")

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
  const { createNode, createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const slug = calculateSlug(node, getNode)
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })
  }
  if (node.internal.type === `ReleasesJson`) {
    createNodeField({
      name: `original_id`,
      node,
      value: parseInt(node.id),
    })

    const textNode = {
      id: `${node.id}-MarkdownBody`,
      parent: node.id,
      dir: path.resolve("./"),
      internal: {
        type: `${node.internal.type}MarkdownBody`,
        mediaType: "text/markdown",
        content: node.body,
        contentDigest: digest(node.body),
      },
    }

    createNode(textNode)

    createNodeField({
      node,
      name: "markdownBody___NODE",
      value: textNode.id,
    })
  }
}
