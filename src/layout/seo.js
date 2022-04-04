/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({
  description,
  lang,
  meta,
  keywords,
  title,
  authors,
  image,
  categories,
  tags,
  reviewed,
  type,
}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const metaImage = image || "/images/assets/default-thumb-doc.png"
  const authorList = authors ? Array.from(authors) : []
  const addSearchCategories = categories
    ? categories.join("/")
    : `other`
  const addSearchType = type ? `type=${type}` : "type=doc"
  const titleProps = title
    ? {
        title: `${title}`,
        titleTemplate: `%s | ${site.siteMetadata.title}`,
      }
    : {
        title: site.siteMetadata.title,
      }

  const tagValues =
    tags && tags.length
      ? {
          property: `og:article:tags`,
          content: `${tags}`,
        }
      : {}

  const reviewtag = reviewed
    ? {
        property: `og:article:modified_time`,
        content: `${reviewed}`,
      }
    : {}

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      {...titleProps}
      defer={false}
      meta={[
        { ...tagValues },
        {
          name: `addsearch-custom-field`,
          content: addSearchType,
        },
        {
          name: `addsearch-category`,
          content: addSearchCategories,
        },
        {
          itemprop: `name`,
          content: `${title} | ${site.siteMetadata.title}`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `og:image`,
          content: `${site.siteMetadata.siteUrl}${metaImage}`,
        },
        {
          itemprop: `image`,
          content: `${site.siteMetadata.siteUrl}${metaImage}`,
        },
        {
          name: `twitter:image`,
          content: `${site.siteMetadata.siteUrl}${metaImage}`,
        },
        {
          itemprop: `description`,
          content: metaDescription,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:type`,
          content: `article`,
        },
        {
          property: `og:article:section`,
          content: `${categories}`,
        },
        { ...reviewtag },
        {
          name: `twitter:site`,
          content: `@${site.siteMetadata.social.twitter}`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:text:description`,
          content: metaDescription,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:site_name`,
          content: site.siteMetadata.title,
        },
      ]
        .concat(
          keywords && keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : {
                name: `keywords`,
                content: 'documentation'
            }
        )
        .concat(
          authorList.map(author => {
            if (author.twitter != null) {
              return {
                name: `twitter:creator`,
                content: `@${author.twitter.toLowerCase()}`,
              }
            }
            return {}
          })
        )
        .concat(meta)}
    >
      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.ATP = window.ATP || [];
              window.ATP.push(function(ATP){
                ATP.init({
                  debug: window.location !== “https://pantheon.io”, // Debug true when not on on prod
                  nav: {
                    'Header Nav': 'pio-docs-nav ul li *',
                    'Side Nav': 'manual-guide-toc',
                    'Misc Nav': '#toc'
                  },
                });
              });
          `,
        }}
      />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  image: PropTypes.string,
}

export default SEO
