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
        filter: {
          fields: { slug: { regex: "/^((?!guides).)*$/" } }
          fileAbsolutePath: { ne: null }
        }
      ) {
        edges {
          node {
            fileAbsolutePath
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

      allContributorYaml {
        edges {
          node {
            id
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

    // Create contributor pages.
    const contributors = result.data.allContributorYaml.edges
    contributors.forEach(contributor => {
      createPage({
        path: `docs/contributors/${contributor.node.id}`,
        component: path.resolve(`./src/templates/contributor.js`),
        context: {
          id: contributor.node.id,
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNode, createNodeField } = actions
  // MDX content
  if (node.internal.type === `Mdx`) {
    // Add slug fields
    const slug = calculateSlug(node, getNode)
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })

    // Add contributors field to filter using GraphQL
    createNodeField({
      name: `contributors`,
      node,
      value: node.frontmatter.contributors,
    })
  }

  // Releases Content
  if (node.internal.type === `ReleasesJson`) {
    // Add original_id as int to filter using GraphQL
    createNodeField({
      name: `original_id`,
      node,
      value: parseInt(node.id),
    })

    // Add text/markdown node children to Release node
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

    // Create markdownBody___NODE field
    createNodeField({
      node,
      name: "markdownBody___NODE",
      value: textNode.id,
    })
  }
}
