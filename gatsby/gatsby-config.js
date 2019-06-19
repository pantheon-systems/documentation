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
    terminus: {
      version: "2.0.1",
    },
  },
  mapping: {
    "Mdx.frontmatter.contributors": "ContributorYaml",
  },
  plugins: [
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/../source/data`,
        name: `data`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/../source/scripts`,
        name: `scripts`,
      },
    },
     {
     resolve: `gatsby-source-filesystem`,
     options: {
       path: `${__dirname}/../source/docs/assets/images`,
       name: `images`,
     },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/../source/content`,
        name: `content`,
      },
    },
    `gatsby-transformer-yaml`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-embed-markdown",
            options: {
              directory: `${__dirname}/../source/partials`,
              resolve: `gatsby-remark-prismjs`,
              options: {
                classPrefix: "language-",
                inlineCodeMarker: null,
                aliases: {},
            },

            },
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
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              // height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true //Optional: Disable insertion of <style> border: 0
            }
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
              showCaptions: true,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: null,
              rel: "nofollow noopener noreferrer external",
            },
          },
          `gatsby-remark-slug`,
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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING,
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
}
