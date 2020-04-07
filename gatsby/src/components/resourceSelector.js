import React from "react"
import Partial from "./partial"
import PropTypes from "prop-types"
import withLocation from "./withLocation"

const ResourceSelector = ({ search }) => {
  //console.log("Search = ", search) //DEBUGGING
  const searchValues = Object.values(search)
  const isThere = (path) => {
    try {
      return require(`../../../source/partials/additionalResources/${path}.md`)
    } catch (err) {
      return null;
    }
  }
  return (
    <>
      {searchValues.length && isThere(searchValues[0]) ? (
        searchValues.map((value, key) => {
          return <Partial key={key} file={`additionalResources/${value}.md`} />
        })
      ) : (
        <Partial file={`additionalResources/null.md`} />
      )}
    </>
  )
}

ResourceSelector.PropTypes = {
  search: PropTypes.object,
}

export default withLocation(ResourceSelector)
