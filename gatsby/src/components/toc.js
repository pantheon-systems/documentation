import React, { useState, useEffect } from "react"

const TOC = ({ title }) => {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (!initialized) {
      const windowGlobal = typeof window !== "undefined" && window

      const settings = {
        tocSelector: ".toc-placeholder",
        contentSelector: "#doc",
        orderedList: false,
        headingSelector: "h2, h3",
        ignoreSelector: ".panel-title",
        hasInnerContainers: true,
        extraListClasses: "nav nav-list",
        listItemClass: "tocify-item",
      }

      if (windowGlobal && windowGlobal.tocbot) {
        windowGlobal.tocbot.init(settings)
      }

      setInitialized(true)
    }
  })

  return (
    <div id="toc" className="tocbot">
      <h4>{title || "Table of Contents"}</h4>
      <div className="toc-placeholder" />
    </div>
  )
}

export default TOC
