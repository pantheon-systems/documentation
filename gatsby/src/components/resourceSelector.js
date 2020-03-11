import React from "react"
import Partial from "./partial"

const ResourceSelector = () => {
  /* DEBUGGING
    console.log ("location Array = ", window.location)
    console.log ("location.search value = ", window.location.search)
    */

  const params = (
    window.location.search.match(new RegExp("([^?=&]+)(=([^&]*))?", "g")) || []
  ).reduce(function(result, each, n, every) {
    let [key, value] = each.split("=")
    result[key] = value
    return result
  }, {})

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
