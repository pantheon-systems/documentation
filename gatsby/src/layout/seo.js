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

function SEO({ description, lang, meta, keywords, title, authors, image }) {
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
  const metaImage = image || "/assets/images/default-thumb-doc.png"
  const authorList = authors ? Array.from(authors) : []

  const titleProps = title ? {
    title: `${title}`,
    titleTemplate: `%s | ${site.siteMetadata.title}`
  } : {
    title: site.siteMetadata.title
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}

      {...titleProps}

      meta={[
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
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
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
    />
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
