import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const DNSProviderDocs = () => {
  const pages = useStaticQuery(
    graphql`
      {
        allMdx(
          filter: { fileInfo: { absolutePath: { regex: "/.dns-providers./" } } }
          sort: { fields: frontmatter___title, order: ASC }
        ) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              provider
            }
          }
        }
      }
    `
  )

  return (
    <>
      <ul>
        {pages.allMdx.nodes.map((page, i) => {
          return (
              <li key={i}>
                <Link to={page.fields.slug} title={page.frontmatter.provider}>
                  {page.frontmatter.provider}
                </Link>
              </li>
          )
        })}
      </ul>
    </>
  )
}

export default DNSProviderDocs
