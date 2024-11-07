const dotenv = require('dotenv');

// load environment specific configurations.
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

// Gatsby Configuration, Options, and Plugins
module.exports = {
  // Puts build artifacts in a subdirectory, and updates all local links
  pathPrefix: `/`,
  // Reusable global information
  siteMetadata: {
    title: `Pantheon Docs`,
    description: `Information for building, launching, and running dynamic sites on the Pantheon Website Management Platform`,
    siteUrl: `https://docs.pantheon.io/`,
    social: {
      twitter: `getpantheon`,
    },
  },
  // Creates a shorthand for Contributor data in GraphQL
  mapping: {
    'Mdx.frontmatter.contributors': 'ContributorYaml',
  },
  plugins: [
    `gatsby-transformer-yaml`,
    `gatsby-plugin-image`,
    {
      // Handles inserting the GTM js blob into the site
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: 'GTM-MDF545G', // process.env.GTM_ID_NEW,
        //testing includeInDevelopment: false,
        defaultDataLayer: {},
      },
    },
    {
      // Handles inserting the Segment js blob into the site
      resolve: 'gatsby-plugin-segment-js',
      options: {
        prodKey: 'lEIpoQHx3G5Jqsy3GmjcPS357D4AlwlA',
        devKey: 'kDdX1dpmsAWuUn8zb1QDJR8YGbWJjKoj',
        trackPage: false,
        trackPageOnlyIfReady: true,
        customSnippet:
          '!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="${writeKey}";;analytics.SNIPPET_VERSION="4.15.3";analytics.load("${writeKey}");analytics.ready(function() {window.dataLayer.push({"event": "segment_analytics_loaded"});});analytics.page();}}();',
      },
    },
    // Each instance of `gatsby-source-filesystem` tells Gatsby to look in a different directory for source files.
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/source/content/partials`,
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
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/source/releasenotescategories`,
        name: `releasenotescategories`,
      },
    },
    {
      // Converts Markdown into HTML
      resolve: `gatsby-transformer-remark`, // https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/
      options: {
        plugins: [
          // Takes additional plugins
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              // Moves downloadable scripts to a subdirectory in the build artifact
              destignationDir: (f) => `scripts/${f.name}`, // destignationDir is defined in gatsby-node.js
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
        path: `${__dirname}/source/releasenotes`,
        name: `releasenotes`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/source/content/iframeembeds`,
        name: `iframeembeds`,
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
    ...(process.env.NODE_ENV === 'development'
      ? [
          {
            resolve: `gatsby-plugin-page-creator`,
            options: {
              path: `${__dirname}/src/reports`,
            },
          },
        ]
      : []),
    // ...? Just read the page, I dunno.
    {
      resolve: `gatsby-plugin-manifest`, // https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/
      options: {
        name: `Pantheon Documentation`,
        short_name: `Docs`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#EFD01B`,
        display: `standalone`,
        icon: `src/layout/favicon.ico`,
      },
    },
    // Consumes JSON files into GraphQL
    `gatsby-transformer-json`, // https://www.gatsbyjs.com/plugins/gatsby-transformer-json/
    {
      // Allows for React components within the Markdown files.
      resolve: `gatsby-plugin-mdx`, // https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            // Allows for more complex tables
            resolve: 'gatsby-remark-grid-tables', // https://www.gatsbyjs.com/plugins/gatsby-remark-grid-tables/
          },
          {
            // Required so the custom Youtube component can create iframes that work with Gatsby
            resolve: 'gatsby-remark-responsive-iframe', // https://www.gatsbyjs.com/plugins/gatsby-remark-responsive-iframe/
          },
          {
            // Self-explanatory
            resolve: 'gatsby-remark-images', // https://www.gatsbyjs.com/plugins/gatsby-remark-images/
            options: {
              maxWidth: 1035,
              // sizeByPixelDensity: true,
              markdownCaptions: true,
              showCaptions: false,
              linkImagesToOriginal: false,
            },
          },
          {
            // Adds titles to code blocks... obvi
            resolve: `gatsby-remark-code-titles`, // https://www.gatsbyjs.com/plugins/gatsby-remark-code-titles/
            options: {
              className: `gatsby-remark-code-title`, // Defines the CSS class it uses, for custom styling
            },
          },
          `gatsby-remark-static-images`,
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: 'Table of Contents',
              tight: true,
              ordered: false,
              fromHeading: 2,
              toHeading: 3,
              className: 'table-of-contents',
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: `<svg xmlns="http://www.w3.org/2000/svg" height="0.75em" viewBox="0 0 576 512"><path d="M0 256C0 167.6 71.6 96 160 96h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H160c-53 0-96 43-96 96s43 96 96 96h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H160C71.6 416 0 344.4 0 256zm576 0c0 88.4-71.6 160-160 160H352c-17.7 0-32-14.3-32-32s14.3-32 32-32h64c53 0 96-43 96-96s-43-96-96-96H352c-17.7 0-32-14.3-32-32s14.3-32 32-32h64c88.4 0 160 71.6 160 160zM192 224H384c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>`,
              className: `docs-header-anchor`,
              maintainCase: false,
              removeAccents: true,
              isIconAfterHeader: true,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              noInlineHighlight: true,
              aliases: {},
              prompt: {
                user: 'user',
                host: 'localhost',
              },
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener external',
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-sitemap',
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map((edge) => {
                const url = new URL(
                  edge.node.fields.slug,
                  site.siteMetadata.siteUrl,
                ).toString();
                // Simple hash function to turn a string into a numeric value
                // https://chatgpt.com/share/69aeb001-e00f-41b9-98a4-816aa6a0330d
                function hashCode(str) {
                  let hash = 0;
                  for (let i = 0; i < str.length; i++) {
                    const char = str.charCodeAt(i);
                    hash = (hash << 5) - hash + char;
                    hash |= 0; // Convert to 32bit integer
                  }
                  return Math.abs(hash);
                }

                // Generate time based on title hash
                function getSeededTime(title) {
                  const hash = hashCode(title);

                  const hours = (hash % 24).toString().padStart(2, '0');
                  const minutes = (hash % 60).toString().padStart(2, '0');
                  const seconds = ((hash >> 8) % 60)
                    .toString()
                    .padStart(2, '0'); // Shift for more variance

                  return `${hours}:${minutes}:${seconds}`;
                }

                return {
                  title: edge.node.frontmatter.title,
                  description: edge.node.excerpt,
                  date: `${edge.node.frontmatter.published_date}T${getSeededTime(edge.node.frontmatter.title)}Z`,
                  url: url,
                  guid: edge.node.id,
                };
              });
            },
            query: `
              {
                allMdx(
                  filter: { fileAbsolutePath: { regex: "/releasenotes/" } }
                  sort: { order: DESC, fields: [fileAbsolutePath] }
                ) {
                  edges {
                    node {
                      rawBody
                      excerpt
                      id
                      fields { slug }
                      frontmatter {
                        title
                        published_date
                      }
                    }
                  }
                }
              }
            `,
            output: '/release-notes/rss.xml',
            title: 'Pantheon release notes RSS feed',
            description:
              'Stay updated with the latest releases and enhancements.',
            site_url: 'docs.pantheon.io/release-notes',
          },
        ],
      },
    },
  ],
};
