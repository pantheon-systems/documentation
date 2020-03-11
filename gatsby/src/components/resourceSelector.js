import React from "react"
import Partial from "./partial"
import { Location } from "@reach/router"
import queryString from "query-string"

const ResourceSelector = () => {
  const params = location.search ? queryString.parse(location.search) : {}

  //console.log("Params = ", params) //DEBUGGING
  //console.log("Params Object Keys: ", Object.keys(params)) //DEBUGGING

  return (
    <>
      {Object.values(params).map((value, key) => {
        return <Partial key={key} file={`additionalResources/${value}.md`} />
      })}
    </>
  )
}

export default ResourceSelector
