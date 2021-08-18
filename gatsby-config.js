const dotenv = require("dotenv")

// load environment specific configurations.
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
})
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

// Gatsby Configuration, Options, and Plugins
module.exports = {
  // Puts build artifacts in a subdirectory, and updates all local links
  pathPrefix: `/docs`,
  // Reusable global information
  siteMetadata: {
    title: `Pantheon Docs`,
    description: `Information for building, launching, and running dynamic sites on the Pantheon Website Management Platform`,
    siteUrl: `https://pantheon.io/`,
    social: {
      twitter: `getpantheon`,
    },
  },
  // Creates a shorthand for Contributor data in GraphQL
  mapping: {
    "Mdx.frontmatter.contributors": "ContributorYaml",
  },
  plugins: [
    `gatsby-transformer-yaml`,
    // Supports SCSS stylesheets. Prime to be removed with a CSS refactor
    `gatsby-plugin-sass`, //https://www.gatsbyjs.com/plugins/gatsby-plugin-sass/
    { // Handles inserting the GTM js blob into the site
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GTM_ID,
        includeInDevelopment: false,
        defaultDataLayer: { },
      }
    },
    { // Handles inserting the Segment js blob into the site
      resolve: "gatsby-plugin-segment-js",
      options: {
        prodKey: process.env.SEGMENT_KEY,
        devKey: process.env.SEGMENT_KEY,
        trackPage: false,
      },
    },
    // Each instance of `gatsby-source-filesystem` tells Gatsby to look in a different directory for source files.
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/source/partials`,
        name: `partials`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/source/data`,
        name: `data`,
      },
    },
    { // Converts Markdown into HTML
      resolve: `gatsby-transformer-remark`, // https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/
      options: {
        plugins: [ // Takes additional plugins
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              // Moves downloadable scripts to a subdirectory in the build artifact
              destignationDir: f => `scripts/${f.name}`, // destignationDir is defined in gatsby-node.js
            },
          },
        ],
      },
        // Honestly not sure why this is here.
        path: `${__dirname}/source/scripts`,
        name: `scripts`,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/source/images`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/source/changelogs`,
        name: `changelogs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/source/content`,
        name: `content`,
      },
    },
    // When running Gatsby develop, creates reporting pages
    ...(process.env.NODE_ENV === 'development' ? [
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/reports`,
      },
    }, ] : []),
    // ...? Just read the page, I dunno.
    {
      resolve: `gatsby-plugin-manifest`, // https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/
      options: {
        name: `Pantheon Documentation`,
        short_name: `Docs`,
        start_url: `/docs/`,
        background_color: `#FFFFFF`,
        theme_color: `#EFD01B`,
        display: `standalone`,
        icon: `src/layout/favicon.ico`,
      },
    },
    // Consumes JSON files into GraphQL
    `gatsby-transformer-json`, // https://www.gatsbyjs.com/plugins/gatsby-transformer-json/
    { // Allows for React components within the Markdown files.
      resolve: `gatsby-plugin-mdx`, // https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          { // Allows for more complex tables
            resolve: "gatsby-remark-grid-tables", // https://www.gatsbyjs.com/plugins/gatsby-remark-grid-tables/
          },
          { // Used to create code snippets from files on GitHub
            resolve: "gatsby-remark-github", // https://www.gatsbyjs.com/plugins/gatsby-remark-github/
            options: {
              marker: 'GITHUB-EMBED',
              insertEllipsisComments: true,
              ellipsisPhrase: '...',
              useCache: true,
              cacheKey: 'gatsby-remark-github-v1',
              token: process.env.GITHUB_API,
            }
          },
          { // Required so the custom Youtube component can create iframes that work with Gatsby
            resolve: "gatsby-remark-responsive-iframe", // https://www.gatsbyjs.com/plugins/gatsby-remark-responsive-iframe/
          },
          { // Self-explanatory
            resolve: "gatsby-remark-images", // https://www.gatsbyjs.com/plugins/gatsby-remark-images/
            options: {
              maxWidth: 1035,
              // sizeByPixelDensity: true,
              markdownCaptions: true,
              showCaptions: false,
              linkImagesToOriginal: false,
            },
          },
          { // Adds titles to code blocks... obvi
            resolve: `gatsby-remark-code-titles`, // https://www.gatsbyjs.com/plugins/gatsby-remark-code-titles/
            options: {
              className: `gatsby-remark-code-title`, // Defines the CSS class it uses, for custom styling
            },
          },
          `gatsby-remark-static-images`,
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              noInlineHighlight: true,
              aliases: {},
              prompt: {
                user: "user",
                host: "localhost",
              },
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: null,
              rel: "nofollow noopener external",
            },
          },
          `gatsby-remark-heading-slug`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Open Sans"],
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-sitemap',
    },
    `gatsby-plugin-fontawesome-css`,
  ],
}

