import React from "react"
import { useStaticQuery } from "gatsby"
import Partial from "./partial"
import propTypes from "prop-types"
import withLocation from "./withLocation"
import { graphql } from "gatsby"

const ResourceSelector = ({ search }) => {
  //console.log("Search = ", search) //DEBUGGING
  const searchValues = Object.values(search)
  const resources = useStaticQuery(
    graphql`
      query ResourcePartials {
        allMdx(filter: {fileAbsolutePath: {regex: "/.additionalResources./"}}) {
          edges {
            node {
              id
              fields {
                slug
              }
            }
          }
        }
      }`
  )
  //console.log("Array from GraphQL: ", resources) //DEBUGGING
  //console.log("Mapping: ", resources.allMdx.edges.filter( entry => { return (entry.node.fields.slug.includes(searchValues[0]))})) //DEBUGGING

  return (
    <>
      {searchValues.length && resources.allMdx.edges.filter( entry => { return (entry.node.fields.slug.includes(searchValues[0]))}).length ? (
        searchValues.map((value, key) => {
          return <Partial key={key} file={`additionalResources/${value}.md`} />
        })
      ) : (
        <Partial file={`additionalResources/null.md`} />
      )}
    </>
  )
}

ResourceSelector.propTypes = {
  search: propTypes.object,
}

export default withLocation(ResourceSelector)
