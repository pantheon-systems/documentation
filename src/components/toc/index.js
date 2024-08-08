import React, { useState, useEffect } from "react"
import "./style.css"

const TOC = ({ title }) => {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (!initialized) {
      const windowGlobal = typeof window !== "undefined" && window

      const settings = {
        tocSelector: ".toc-placeholder",
        contentSelector: ".doc, .terminus",
        orderedList: false,
        headingSelector: "h2:not(.toc-ignore), h3:not(.toc-ignore)",
        ignoreSelector: ".panel-title",
        hasInnerContainers: true,
        extraListClasses: "nav nav-list",
        listItemClass: "tocify-item",
      }

      if (windowGlobal && windowGlobal.tocbot) {
        jQuery(".tab-pane h2, .tab-pane h3").addClass("toc-ignore")
        windowGlobal.tocbot.init(settings)
      }

      setInitialized(true)
    }
  })

  return (
    <nav aria-labelledby="toc-nav" className="toc-container">
      <div id="toc" className="tocbot">
        <h2 id="toc-nav" className="visually-hidden">
          {title || "Table of Contents"}
        </h2>
        <div className="toc-placeholder" />
      </div>
    </nav>
  )
}

export default TOC
