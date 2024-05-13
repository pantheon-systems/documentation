import React from "react"
import "./style.css"
import { is } from "date-fns/locale"
/*
This component creates embedded Wistia videos.

PARAMETERS:
src="wistiavideoID"
*/

const Wistia = ({ src }) => {
  // Check if window is defined before adding scripts.
  const isBrowser = typeof window !== "undefined"

  if (isBrowser) {
    const wistia_embed_video_id = document.createElement("script")

    wistia_embed_video_id.setAttribute(
      "src",
      "https://fast.wistia.com/embed/medias/" + `${src}` + ".jsonp"
    )
    wistia_embed_video_id.setAttribute("async", true)

    document.body.appendChild(wistia_embed_video_id)

    const wistia_embed_external_js = document.createElement("script")
    wistia_embed_external_js.setAttribute(
      "src",
      `https://fast.wistia.com/assets/external/E-v1.js`
    )
    wistia_embed_external_js.setAttribute("async", true)

    document.body.appendChild(wistia_embed_external_js)
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
