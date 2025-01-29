const path = require(`path`);
const crypto = require('crypto');
const matter = require('gray-matter');
var fs = require('fs-extra');

/*
For additional reference material, see
https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/

The contents of this file define how the source content is converted
into web pages. It is prime for refactoring.
*/

/** This helper function determines what slug a piece of content will use */
const calculateSlug = (node, getNode) => {
  const fileName = getNode(node.parent).name; // Sets the filename from GraphQL
  if (node.frontmatter.permalink) {
    //If the "permalink" frontmatter value is present...
    return node.frontmatter.permalink // return it.
      .replace(':basename', fileName) // If permalink includes ":basename", prepend the filename to the slug
      .replace('docs', ''); // If it includes "docs", remove it. Docs is added by the pathPrefix in gatsby-config.js
  }

  // I'm honestly not sure about this. If Alex isn't around and you need to know, ask Octahedroid.
  if (fileName === undefined) {
    return `${fileName}`;
  }

  // This section creates the changelog slug based on the YYYY-MM-DD-MONTH.md template
  if (getNode(node.parent).absolutePath.includes('changelogs')) {
    // If the file is in the changelogs directory...
    const split = fileName.split('-'); // split the file name where hyphenated...
    return `changelog/${split[0]}/${split[1]}`; // and return a slug of changelog/YYYY/MM
  }
  // This section creates the releasenotes slug based on the YYYY-MM-DD-slug.md template
  if (getNode(node.parent).absolutePath.includes('releasenotes')) {
    // If the file is in the releasenotes directory...
    // split the file name where hyphenated.
    const split = fileName.split('-');
    // set a const to remaining slug based on the keys from split that are not the date.
    const remainingSlug = split.slice(3).join('-');
    return `release-notes/${split[0]}/${split[1]}/${remainingSlug}`; // and return a slug of releasenotes/YYYY/MM/slug
  }

  return `${fileName}`; // Otherwise, as long as there is a filename in GraphQL, use it as the slug.
};

/* This helper function helps determine which template should be applied to a piece of content */
const calculateTemplate = (node, defaultTemplate) => {
  // The functions accepts as arguments a GraphQL node and default template.
  if (
    node.frontmatter &&
    node.frontmatter.layout &&
    node.frontmatter.layout !== null
  ) {
    // If the node has the layout value in frontmatter...
    return node.frontmatter.layout; // use that value.
  }

  return defaultTemplate; // Otherwise, use the default template argument value.
};

/* These helper functions are used to provide multi-page guide pages with the previous
and next pages in the guide, to be used in the construction of the table of contents.
 */
const calculatePrevious = (guide) => {
  // The function accepts as an argument the node of the guide page in question
  if (!guide.previous) {
    // If the page doesn't have a value for the "previous" field in GraphQL
    return null; // return nothing.
  }

  // Also return nothing if  the guide_directory value doesn't exist.
  if (
    guide.node.fields.guide_directory !== guide.previous.fields.guide_directory
  ) {
    return null;
  }
  // Otherwise, return the slug of the page identified as previous by GraphQL. How it determines which one is previous, unclear to me at this time.
  return guide.previous.fields.slug;
};
// Same as above.
const calculateNext = (guide) => {
  if (!guide.next) {
    return null;
  }

  if (guide.node.fields.guide_directory !== guide.next.fields.guide_directory) {
    return null;
  }

  return guide.next.fields.slug;
};

const digest = (str) =>
  str != null
    ? crypto.createHash('md5').update(str).digest('hex')
    : crypto.createHash('md5').update(' ').digest('hex');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  actions.createFieldExtension({
    name: `defaultFalse`,
    extend() {
      return {
        resolve(source, args, context, info) {
          if (source[info.fieldName] == null) {
            return false;
          }
          return source[info.fieldName];
        },
      };
    },
  });

  actions.createTypes(`
    type Mdx implements Node {
      fileInfo: File @link(from: "parent"),
      frontmatter: Frontmatter
    }
    type Frontmatter {
      draft: Boolean @defaultFalse
    }
  `);
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allDocs: allMdx(
        filter: {
          fileAbsolutePath: {
            regex: "/content(?!/(partials|changelog|guides|releasenotes|iframeembeds)/)/"
          }
          frontmatter: { draft: { ne: true } }
        }
      ) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              title
              layout
              permalink
              draft
            }
            fields {
              slug
            }
          }
        }
      }

      allGuides: allMdx(
        filter: {
          fileAbsolutePath: { regex: "/guides/" }
          frontmatter: { draft: { ne: true } }
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
              draft
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

      allIframeEmbeds: allMdx(
        limit: 10
        filter: { fileAbsolutePath: { regex: "/iframeembeds/" } }
      ) {
        edges {
          node {
            slug
            body
          }
        }
      }

      allReleaseNotes: allMdx(
        filter: { fileAbsolutePath: { regex: "/releasenotes/" } }
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
              categories
              published_date
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

      allChangelogs: allMdx(
        filter: {
          fileAbsolutePath: { regex: "/changelogs/" }
          frontmatter: { draft: { ne: true } }
        }
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
            yamlId
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
      dataJson {
        commands {
          description
          help
          name
          usage
        }
      }
      releasenotescategoriesJson {
        categories {
          slug
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    // Create doc pages.
    const docs = result.data.allDocs.edges;
    docs.forEach((doc) => {
      const template = calculateTemplate(doc.node, 'doc');
      createPage({
        path: doc.node.fields.slug,
        component: path.resolve(`./src/templates/${template}.js`),
        context: {
          slug: doc.node.fields.slug,
        },
      });
    });

    // Create guide pages.
    const guides = result.data.allGuides.edges;
    guides.forEach((guide) => {
      if (guide.node.fields.guide_directory !== null) {
        const previous = calculatePrevious(guide);
        const next = calculateNext(guide);
        const template = calculateTemplate(guide.node, 'guide');
        createPage({
          path: guide.node.fields.slug,
          component: path.resolve(`./src/templates/${template}.js`),
          context: {
            slug: guide.node.fields.slug,
            guide_directory: guide.node.fields.guide_directory,
            previous,
            next,
          },
        });
      } else {
        const template = calculateTemplate(guide.node, 'doc');
        createPage({
          path: guide.node.fields.slug,
          component: path.resolve(`./src/templates/${template}.js`),
          context: {
            slug: guide.node.fields.slug,
          },
        });
      }
    });

    // Create changelog pages.
    const changelogs = result.data.allChangelogs.edges;
    changelogs.forEach((changelog) => {
      const previous = changelog.previous
        ? changelog.previous.fields.slug || null
        : null;
      const next = changelog.next ? changelog.next.fields.slug || null : null;
      const template = calculateTemplate(changelog.node, 'changelog');
      createPage({
        path: changelog.node.fields.slug,
        component: path.resolve(`./src/templates/${template}.js`),
        context: {
          slug: changelog.node.fields.slug,
          next: previous,
          previous: next,
        },
      });
    });

    // Create changelog pagination.
    const postsPerPage = 6;
    const numPages = Math.ceil(changelogs.length / postsPerPage);
    Array.from({ length: numPages }).forEach((_, i) => {
      const currentPage = i + 1;
      const next =
        currentPage === 1
          ? null
          : currentPage === 2
            ? `/changelog/`
            : `/changelog/page/${currentPage - 1}`;
      const previous =
        currentPage < numPages ? `/changelog/page/${currentPage + 1}` : null;
      createPage({
        path: i === 0 ? `/changelog/` : `/changelog/page/${i + 1}`,
        component: path.resolve('./src/templates/changelogs.js'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage,
          previous,
          next,
        },
      });
    });

    // Create Terminus Command pages
    const terminusCommands = result.data.dataJson.commands;
    terminusCommands.forEach((command) => {
      const slugRegExp = /:/g;
      const slug = command.name.replace(slugRegExp, '-');
      createPage({
        path: `terminus/commands/${slug}`,
        component: path.resolve(`./src/templates/terminusCommand.js`),
        context: {
          slug: slug,
          name: command.name,
        },
      });
    });

    // Create release notes without pagination. At a later date, we may want to add pagination.
    // And can reused the code above.
    createPage({
      path: `/release-notes/`,
      component: path.resolve('./src/templates/releaseNotesListing/index.js'),
    });

    // Create release notes pages for pagination.
    const releaseNotesPostsPerPage = 8;
    const releaseNotesNumPages = Math.ceil(
      result.data.allReleaseNotes.edges.length / releaseNotesPostsPerPage,
    );

    Array.from({ length: releaseNotesNumPages }).forEach((_, i) => {
      const path2 = `/release-notes/${i + 1}/`;
      createPage({
        path: path2,
        component: path.resolve('./src/templates/releaseNotesListing/index.js'),
        context: {
          limit: releaseNotesPostsPerPage,
          skip: i * releaseNotesPostsPerPage,
          numPages: releaseNotesNumPages,
          i,
        },
      });
    });

    // terminusCommands.forEach(command => {
    //   const slugRegExp = /:/g
    //   const slug = command.name.replace(slugRegExp, "-")
    //   createPage({
    //     path: `terminus/commands/${slug}`,
    //     component: path.resolve(`./src/templates/terminusCommand.js`),
    //     context: {
    //       slug: slug,
    //       name: command.name
    //     }
    //   })
    // })

    // Create each release note page.
    const releaseNotes = result.data.allReleaseNotes.edges;
    releaseNotes.forEach((releaseNote) => {
      const template = calculateTemplate(releaseNote.node, 'releaseNotePage');
      createPage({
        path: releaseNote.node.fields.slug,
        component: path.resolve(`./src/templates/${template}.js`),
        context: {
          slug: releaseNote.node.fields.slug,
        },
      });
    });

    // Create iframeembed page
    const iframeEmbeds = result.data.allIframeEmbeds.edges;
    iframeEmbeds.forEach((iframeEmbed) => {
      // There's an odd bug where the slug value is inconsistent, even for the same file
      // across different gatsby builds. This is a workaround.
      // if the slug does not contain "iframeembeds" the add it
      if (!iframeEmbed.node.slug.includes('iframeembeds')) {
        iframeEmbed.node.slug = `iframeembeds/${iframeEmbed.node.slug}`;
      }

      createPage({
        path: `${iframeEmbed.node.slug}`,
        component: path.resolve(`./src/templates/iframeembed.js`),
        context: {
          slug: iframeEmbed.node.slug,
          body: iframeEmbed.node.body,
        },
      });
    });

    // Create contributor pages.
    const contributors = result.data.allContributorYaml.edges;
    contributors.forEach((contributor) => {
      createPage({
        path: `contributors/${contributor.node.yamlId}`,
        component: path.resolve(`./src/templates/contributor.js`),
        context: {
          id: contributor.node.yamlId,
        },
      });
    });

    // Create topics pages.
    const topics = result.data.allLandingsYaml.edges;
    topics.forEach((topic) => {
      createPage({
        path: topic.node.path,
        component: path.resolve(`./src/templates/landing.js`),
        context: {
          id: topic.node.id,
        },
      });
    });

    return null;
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNode, createNodeField } = actions;

  if (node.internal.owner === 'gatsby-transformer-yaml') {
    Object.keys(node).forEach((item) => {
      if (!item.endsWith('Markdown')) {
        return;
      }
      const textNode = {
        id: `${node.id}-${item}`,
        parent: node.id,
        dir: path.resolve('./'),
        internal: {
          type: `${node.internal.type}${item}`,
          mediaType: 'text/markdown',
          content: node[item],
          contentDigest: digest(node[item]),
        },
      };
      createNode(textNode);
      createNodeField({
        node,
        name: `${item}___NODE`,
        value: textNode.id,
      });
    });
  }

  // MDX content
  if (node.internal.type === `Mdx`) {
    const sourceInstanceName = getNode(node.parent).sourceInstanceName;
    if (sourceInstanceName === 'content') {
      const editPath = `source/content/${getNode(node.parent).relativePath}`;
      // Add editPath field
      createNodeField({
        name: `editPath`,
        node,
        value: editPath,
      });
    }

    // Add slug field
    const slug = calculateSlug(node, getNode);
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    });

    if (slug.includes('guides/')) {
      if (getNode(node.parent).relativeDirectory !== 'guides') {
        // Add guide_directory field
        createNodeField({
          name: `guide_directory`,
          node,
          value: `${getNode(node.parent).relativeDirectory}`,
        });
      }
    }

    if (
      sourceInstanceName === 'changelogs' ||
      sourceInstanceName === 'releasenotes'
    ) {
      const content = matter(node.internal.content, {
        excerpt: true,
        excerpt_separator: '<!-- excerpt -->',
      });
      const excerpt = content.excerpt || '';

      createNodeField({
        name: `excerpt`,
        node,
        value: excerpt,
      });

      const textNode = {
        id: `${node.id}-MarkdownBody`,
        parent: node.id,
        dir: path.resolve('./'),
        internal: {
          type: `${node.internal.type}MarkdownBody`,
          mediaType: 'text/markdown',
          content: excerpt,
          contentDigest: digest(excerpt),
        },
      };
      createNode(textNode);

      // Create markdownBody___NODE field
      createNodeField({
        node,
        name: 'markdownBody___NODE',
        value: textNode.id,
      });
    }
  }

  // Releases and Changelog Content
  var nodeString = node.internal.type.toString();
  var isReleaseJson = nodeString.includes('ReleasesJson');
  if (isReleaseJson && !nodeString.includes('MarkdownBody')) {
    //console.log("Creating markdownBody for ", node.internal.type.toString()) // For debugging
    // Add original_id as int to filter using GraphQL
    createNodeField({
      name: `original_id`,
      node,
      value: parseInt(node.id),
    });

    // Add text/markdown node children to Release and Changelog nodes
    const textNode = {
      id: `${node.id}-MarkdownBody`,
      parent: node.id,
      dir: path.resolve('./'),
      internal: {
        type: `${node.internal.type}MarkdownBody`,
        mediaType: 'text/markdown',
        content: node.body || '',
        contentDigest: digest(node.body),
      },
    };
    createNode(textNode);

    // Create markdownBody___NODE field
    createNodeField({
      node,
      name: 'markdownBody___NODE',
      value: textNode.id,
    });
  }
};

// This block moves script files from source to the public (build artifact) directory.
exports.onPreBootstrap = () => {
  const scriptsCopyFrom = `${__dirname}//source/scripts`;
  const scriptsCopyTo = `${__dirname}/public/scripts`;

  fs.copySync(scriptsCopyFrom, scriptsCopyTo);
};

/* This block is for debugging purposes. It writes the paths of all pages to a file.
exports.onPostBuild = async ({ graphql, getNodes }) => {
  // Fetch all pages created by Gatsby
  const pages = getNodes().filter((node) => node.internal.type === 'SitePage');

  //console.log('pages', pages);
  //loop over pages and log the path
  const pagePaths = pages.map((page) => page.path);
  console.log('pagePaths', pagePaths);
  pages.forEach((page) => {
    console.log('path', page.path);
  });

  // const exceptions = ['https://certification.pantheon.io/', '/404.html'];
  // const OmniItems = getOmniItems();
  // const menuReport = calculateNumberOfPathsInMenu(pagePaths, OmniItems, exceptions);
  // console.log('menuReport', menuReport);

  fs.writeFile(
    'all-written-paths.txt',
    JSON.stringify(pagePaths, null, 2),
    (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    },
  );

  // // Read the menu links from your menu file (assuming it's a JSON file)
  // const menuFilePath = path.resolve(__dirname, 'src/data/menu.json');
  // const menuData = JSON.parse(fs.readFileSync(menuFilePath, 'utf-8'));

  // // Extract the paths from the menu links
  // const menuLinks = menuData.map(item => item.path);

  // // Check how many pages are in the menu
  // const pagesInMenu = pages.filter(page => menuLinks.includes(page.path));

  // console.log(`Total Pages Created by Gatsby: ${pages.length}`);
  // console.log(`Total Pages in Menu: ${pagesInMenu.length}`);
};
*/

/* todo Should there be an error thrown if a release note category is set that is not allowed? */
/* todo, infer published date from file name. And throw an error if there are files that don't follow the pattern. */
