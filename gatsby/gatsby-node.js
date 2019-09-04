const path = require(`path`)
const crypto = require("crypto")
const matter = require('gray-matter');

const calculateSlug = (node, getNode) => {
  const fileName = getNode(node.parent).name
  if (node.frontmatter.permalink) {
    return node.frontmatter.permalink
      .replace(":basename", fileName)
      .replace("docs", "")
      .replace(/.$/, "")
  }

  if (fileName === undefined) {
    return `${fileName}`
  }

  if (getNode(node.parent).absolutePath.includes("changelogs")) {
    const split = fileName.split('-');
    return `changelog/${split[0]}/${split[1]}`
  }

  return `${fileName}`
}

const calculateTemplate = (node, defaultTemplate) => {
  if (node.frontmatter && node.frontmatter.layout && node.frontmatter.layout !== null) {
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
          fields: {
            slug: {regex: "/^((?!guides|changelog|partials).)*$/"}
          },
          fileAbsolutePath: { regex: "/content/"}
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
          fileAbsolutePath: { regex: "/guides/"}
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

      allChangelogs: allMdx(
        filter: {
          fileAbsolutePath: { regex: "/changelogs/"}
        },
        sort: { fields: [fileAbsolutePath], order: DESC }
      ) {
        edges {

          previous {
            fields {
              slug
            }
          }

          node {
            id
            frontmatter {
              title
            }
            fields {
              slug
            }
          }

          next {
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

    // Create changelog pages.
    const changelogs = result.data.allChangelogs.edges
    changelogs.forEach(changelog => {
      const previous = changelog.previous ? changelog.previous.fields.slug || null : null
      const next = changelog.next ? changelog.next.fields.slug || null : null
      const template = calculateTemplate(changelog.node, "changelog")
      createPage({
        path: changelog.node.fields.slug,
        component: path.resolve(`./src/templates/${template}.js`),
        context: {
          slug: changelog.node.fields.slug,
          next: previous,
          previous: next
        },
      })
    })

    // Create changelog pagination.
    const postsPerPage = 6
    const numPages = Math.ceil(changelogs.length / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
      const currentPage = i + 1;
      const next = currentPage === 1 ? null : (currentPage === 2 ? `/changelog/` : `/changelog/page/${currentPage - 1}`);
      const previous = currentPage < numPages ? `/changelog/page/${currentPage + 1}` : null;
      createPage({
        path: i === 0 ? `/changelog/` : `/changelog/page/${i + 1}`,
        component: path.resolve("./src/templates/changelogs.js"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage,
          previous,
          next
        },
      })
    })

    // Create contributor pages.
    const contributors = result.data.allContributorYaml.edges
    contributors.forEach(contributor => {
      createPage({
        path: `contributors/${contributor.node.id}`,
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
        path: topic.node.path,
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
      value: slug
    })

    if (slug.includes("guides/")) {
      if (getNode(node.parent).relativeDirectory !== 'guides') {
        // Add guide_directory field
        createNodeField({
          name: `guide_directory`,
          node,
          value: `${getNode(node.parent).relativeDirectory}`,
        })
      }
    }

    if (slug.includes("changelog/")) {
      const content = matter(node.internal.content, { excerpt: true } );
      const excerpt = content.excerpt || "---";

      createNodeField({
        name: `excerpt`,
        node,
        value: excerpt,
      })

      const textNode = {
        id: `${node.id}-MarkdownBody`,
        parent: node.id,
        dir: path.resolve("./"),
        internal: {
          type: `${node.internal.type}MarkdownBody`,
          mediaType: "text/markdown",
          content: excerpt,
          contentDigest: digest(excerpt),
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
