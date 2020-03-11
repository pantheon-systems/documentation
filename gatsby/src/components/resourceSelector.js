import React from "react"
import Partial from "./partial"
import PropTypes from "prop-types"
import withLocation from "./withLocation"

const ResourceSelector = ({ search }) => {
  //console.log("Search = ", search) //DEBUGGING

  return (
    <>
      {search[0] ? Object.values(search).map((value, key) => {
        return <Partial key={key} file={`additionalResources/${value}.md`} />
      }) :
        <Partial file={`additionalResources/null.md`} />
      }
    </>
  )
}

ResourceSelector.PropTypes = {
  search: PropTypes.object,
}

export default withLocation(ResourceSelector)
