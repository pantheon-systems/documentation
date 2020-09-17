const dotenv = require("dotenv")

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
})

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: `/docs`,
  siteMetadata: {
    title: `Pantheon Docs`,
    description: `Information for building, launching, and running dynamic sites on the Pantheon Website Management Platform`,
    siteUrl: `https://pantheon.io/`,
    social: {
      twitter: `getpantheon`,
    },
  },
  mapping: {
    "Mdx.frontmatter.contributors": "ContributorYaml",
  },
  plugins: [
    {
      resolve: `gatsby-transformer-yaml-full`,
      options: {
        plugins: [
          `gatsby-yaml-full-markdown`,
        ],
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GTM_ID,
        includeInDevelopment: false,
        defaultDataLayer: { },
      }
    },
    {
      resolve: "gatsby-plugin-segment-js",
      options: {
        prodKey: process.env.SEGMENT_KEY,
        devKey: process.env.SEGMENT_KEY,
        trackPage: false,
      },
    },
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
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destignationDir: f => `scripts/${f.name}`,
            },
          },
        ],
      },
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
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              prompt: {
                user: "user",
                host: "localhost",
              },
            },
          },
        ]
      },
    },
    ...(process.env.NODE_ENV === 'development' ? [
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/reports`,
      },
    }, ] : []),
    {
      resolve: `gatsby-plugin-manifest`,
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
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-grid-tables",
          },
          {
            resolve: "gatsby-remark-github",
            options: {
              marker: 'GITHUB-EMBED',
              insertEllipsisComments: true,
              ellipsisPhrase: '...',
              useCache: true,
              cacheKey: 'gatsby-remark-github-v1',
              token: process.env.GITHUB_API,
            }
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: {}
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1035,
              // sizeByPixelDensity: true,
              markdownCaptions: true,
              showCaptions: false,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-code-titles`,
            options: {
              className: `gatsby-remark-code-title`,
            },
          },
          `gatsby-remark-static-images`,
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
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

