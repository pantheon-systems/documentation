import React from "react"
import "./style.css"
/*
This component creates an embedded Wistia videos.

PARAMETERS:
src="wistiaHashID"
*/

const Wistia = (props) => {
  //Construct our component as a function

  const src = props.src

  const script2 = document.createElement("script")
  script2.setAttribute(
    "src",
    "https://fast.wistia.com/embed/medias/" + `${src}` + ".jsonp"
  )
  script2.setAttribute("async", true)

  document.body.appendChild(script2)


  const script = document.createElement("script")
  script.setAttribute(
    "src",
    `https://fast.wistia.com/assets/external/E-v1.js`
  )
  script.setAttribute("async", true)

  document.body.appendChild(script)

  return (
    // Return the iframe, wrapped in a div.
    <div class="wistia_responsive_padding">
      <div class="wistia_responsive_wrapper">
        <div class={'wistia_embed wistia_async_' + `${src}` + " seo=true videoFoam=true"}>
          <div class="wistia_swatch">
            <img src={"https://fast.wistia.com/embed/medias/" + `${src}` + "/swatch"} alt="" aria-hidden="true" onload="this.parentNode.style.opacity=1;" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wistia
