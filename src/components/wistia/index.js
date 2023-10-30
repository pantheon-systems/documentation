import React from "react"
import "./style.css"
import { is } from "date-fns/locale"
/*
This component creates an embedded Wistia videos.

PARAMETERS:
src="wistiaHashID"
*/

const Wistia = ({ src }) => {
  // Check if window is defined before adding scripts.
  const isBrowser = typeof window !== "undefined"

  if (isBrowser) {
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
  }

  return (
    // Return the iframe, wrapped in a div.
    <div className="wistia_container">
      <div className="wistia_responsive_padding">
        <div className="wistia_responsive_wrapper">
          <div
            className={
              "wistia_embed wistia_async_" +
              `${src}` +
              " seo=true videoFoam=true"
            }
          >
            <div className="wistia_swatch">
              <img
                src={
                  "https://fast.wistia.com/embed/medias/" + `${src}` + "/swatch"
                }
                alt=""
                aria-hidden="true"
                onload="this.parentNode.style.opacity=1;"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wistia
