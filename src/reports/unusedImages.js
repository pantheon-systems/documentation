import React, { useState, useEffect } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Layout from "../layout/layout"
import Image from "../layout/image"


/*
This report creates a table of every image in /source/images which isn't being used by a piece of content.
It is only visible when running a local development environment, at localhost:8000/unusedImages
*/

const unusedImages = () => {

  //Define the data objects for image and page data
  const [allImgs, setAllImgs] = useState([])
  const [allContent, setAllContent] = useState([])

  // Fetch the data from GraphQL on page load
  useEffect(() => {
    const body = {
      query: `
        query {
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
          allFile(filter: {extension: {regex: "/(jpg|png)/"}, relativeDirectory: {regex: "/(^(?!assets).).+/"}}) {
            edges {
              node {
                relativePath
              }
            }
          }
        }`
    }
    fetch(`http://localhost:8000/___graphql`, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type' : 'application/json',
      },
      method: 'POST',
    })
    .then(response => response.json())
    .then(resultData => {
      setAllImgs(resultData.data.allFile.edges.map(edge => edge.node.relativePath))
      setAllContent(resultData.data.allMdx.edges.map(edge => {
        return (
          {
            name: edge.node.frontmatter.title,
            slug: edge.node.fields.slug,
            body: edge.node.rawBody
          }
        )}
      ))})
    }, [])

  //Create a function which builds an array of image paths where the path is not found in any content piece.
  const findUnusedImages = (imgs, content) => {
    const images = imgs
    const bodies = content.map(c => c.body)
    let nonReferencedImages = images.filter( image => !bodies.some(body => body.includes(image)) )
    return nonReferencedImages
  }
  //console.log(`findImages(): ${findImages(allImgs, allContent)}`)

  const unusedImages = findUnusedImages(allImgs, allContent)
  //console.log(`unusedImages ${typeof unusedImages}: ${JSON.stringify(unusedImages)}`)

  // Create a factory function which returns table rows for each instance in the aforementioned array.
  const unusedImageRow = (image, i) => {
    console.log(i + 1, image)
    return (
      <tr key={i}>
        <td>{i + 1}</td>
        <td><Image path={image} style={{maxWidth: "400px"}}/></td>
        <td>{image}</td>
      </tr>
    )
  }

  // Create the page.
  return(
    <Layout>
      <h1>Images not used in Content</h1>
      <div className="table-responsive">
        <table className="table table-commands table-bordered table-striped">
          <thead>
          <tr><td><strong>Count</strong>: {unusedImages.length}</td></tr>
          <tr>
            <th>Count</th>
            <th>Image Preview</th>
            <th>Filename</th>
          </tr>
          </thead>
          <tbody>
          {unusedImages.map((image, i) => unusedImageRow(image, i))}
          </tbody>
        </table>
      </div>
    </Layout>
  )

}

export default unusedImages