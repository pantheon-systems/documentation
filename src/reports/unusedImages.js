import React, { useState } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Layout from "../layout/layout"
//import newGitHubIssueUrl from "new-github-issue-url"
//import Image from "../layout/image"


/*
This report creates a table of every image in /source/images which isn't being used by a piece of content.
It is only visible when running a local development environment, at localhost:8000/unusedImages
*/

const unusedImages = ({data}) => {
  //console.log(`data: ${JSON.stringify(data)}`) // For Debugging

  //Create an array object of all images in /source/images
  const allImgs = data.allFile.edges.map(edge => edge.node.relativePath)
  //console.log(`allImgs ${typeof(allImgs)}: ${JSON.stringify(allImgs)}`) // For Debugging
  /* Example of the allImgs object:
  ["CC-BY-SA_icon.png",
  "CDN-speedTest-docs-guide.png",
  "Pantheon-doc-logo@2x.png","Pantheon_Color_rev_clear.png",
  "Multisite-risk_2.png",
  "add-solr-widget.png",
  ...
  ]
  */

  //Create a data object of all content (docs, guides, partials)
  const allContent = data.allMdx.edges.map(edge => {
    return (
      {
        name: edge.node.frontmatter.title,
        slug: edge.node.fields.slug,
        body: edge.node.rawBody
      })
  })
  //console.log(`allContent ${typeof allContent}: ${JSON.stringify(allContent)}`) // For Debugging
  /* Example of the allContent object. Note that objects without names are partial files.:
  [
    {
    "name":"",
    "slug":"add-supporting-org",
    "body":"<Alert title=\"Note\" type=\"info\">\n\nBecause Supporting Organizations...."
    },
    {
    "name":"Add a Client Site to Your Organization Dashboard",
    "slug":"add-client-site",
    "body":"---\ntitle: Add a Client Site to Your Organization Dashboard\ndescription: Learn how to..."
    },
  ]
  */

  //Create a function which builds an array of image paths where the path is not found in any content piece.
  const findUnusedImages = (imgs, content) => {
    const images = imgs
    const bodies = content.map(c => c.body)
    let foundImages = images.filter( image => !bodies.some(body => body.includes(image)) )
    return foundImages
  }
  //console.log(`findImages(): ${findImages(allImgs, allContent)}`)

  const unusedImages = findUnusedImages(allImgs, allContent)
  console.log(`unusedImages ${typeof unusedImages}: ${unusedImages}`)

  // Create a factory function which returns table rows for each instance in the aforementioned array.

  // Create the page.
  return(
    <Layout>

    </Layout>
  )

}

// This is the query to GraphQL which fills the {data} object with... data
export const query = graphql`
  query {
    allFile(filter: {extension: {regex: "/(jpg|png)/"} }) {
      edges {
        node {
          relativePath
        }
      }
    }
    allMdx(filter: {rawBody: {regex: "/(jpg|png)/"}}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
          rawBody
        }
      }
    }
  }
`

export default unusedImages