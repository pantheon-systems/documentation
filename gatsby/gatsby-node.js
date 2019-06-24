const path = require(`path`)
const crypto = require("crypto")

const calculateSlug = (node, getNode) => {
  const fileName = getNode(node.parent).name

  if (node.frontmatter.permalink) {
    return node.frontmatter.permalink
      .replace(":basename", fileName)
      .replace(/.$/, "")
  }

  return `${fileName}`
}

const calculateTemplate = (node, defaultTemplate) => {
  if (node.frontmatter !== undefined && node.frontmatter.layout !== null) {
    return node.frontmatter.layout
  }

  return defaultTemplate
}

const calculatePrevious = (guide) => {
  if (!guide.previous) {
    return null;
  }

  if (guide.node.fields.guide_directory !== guide.previous.fields.guide_directory) {
    return null;
  }

  return guide.previous.fields.slug;
}

const calculateNext = (guide) => {
  if (!guide.next) {
    return null;
  }

  if (guide.node.fields.guide_directory !== guide.next.fields.guide_directory) {
    return null;
  }

  return guide.next.fields.slug;
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
          fileAbsolutePath: { ne: null }
          fields: { slug: { regex: "/^((?!guides).)*$/" } }
        }
      ) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              title
              layout
              permalink
            }
            fields {
              slug
            }
          }
        }
      }

      allGuides: allMdx(
        filter: {
          fileAbsolutePath: { ne: null }
          fields: { slug: { regex: "/guides/" } }
        }
        sort: { fields: [fileAbsolutePath], order: ASC }
      ) {
        edges {
          previous {
            fields {
              slug
              guide_directory
            }
          }
          node {
            frontmatter {
              title
              layout
              permalink
            }
            fields {
              slug
              guide_directory
            }
          }
          next {
            fields {
              slug
              guide_directory
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

      allLandingsYaml {
        edges {
          node {
            id
            path
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

    // Create guide pages.
    const guides = result.data.allGuides.edges
    guides.forEach(guide => {
      if (guide.node.fields.guide_directory !== null) {
        const previous = calculatePrevious(guide);
        const next = calculateNext(guide);
        const template = calculateTemplate(guide.node, "guide")
        createPage({
          path: guide.node.fields.slug,
          component: path.resolve(`./src/templates/${template}.js`),
          context: {
            slug: guide.node.fields.slug,
            guide_directory: guide.node.fields.guide_directory,
            previous,
            next
          },
        })
      } else {
        const template = calculateTemplate(guide.node, "doc")
        createPage({
          path: guide.node.fields.slug,
          component: path.resolve(`./src/templates/${template}.js`),
          context: {
            slug: guide.node.fields.slug,
          },
        })
      }
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

    // Create topics pages.
    const topics = result.data.allLandingsYaml.edges
    topics.forEach(topic => {
      createPage({
        path: `docs/${topic.node.path}`,
        component: path.resolve(`./src/templates/landing.js`),
        context: {
          id: topic.node.id,
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
    // Add slug field
    const slug = calculateSlug(node, getNode)
    createNodeField({
      name: `slug`,
      node,
      value: slug.startsWith("docs")?slug:`docs/${slug}`
    })

    if (slug.includes("docs/guides")) {
      if (getNode(node.parent).relativeDirectory !== 'guides') {
        // Add guide_directory field
        createNodeField({
          name: `guide_directory`,
          node,
          value: `${getNode(node.parent).relativeDirectory}`,
        })
      }
    }
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
