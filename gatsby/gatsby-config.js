const dotenv = require('dotenv');

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  pathPrefix: `/docs`,
  siteMetadata: {
    title: `Pantheon Docs`,
    description: `Information for building, launching, and running dynamic sites on the Pantheon Website Management Platform`,
    siteUrl: process.env.SITE_URL,
    social: {
      twitter: `getpantheon`,
    },
  },
  mapping: {
    'Mdx.frontmatter.contributors': 'ContributorYaml',
  },
  plugins: [
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
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1035,
              sizeByPixelDensity: true,
              showCaptions: true,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow noopener noreferrer external",
            }
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Open Sans']
        }
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
}
