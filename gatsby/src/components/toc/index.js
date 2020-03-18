import React, { useState, useEffect } from "react"
import './style.css';

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
        jQuery('.tab-pane h2, .tab-pane h3').addClass('toc-ignore')
        windowGlobal.tocbot.init(settings)
      }

      setInitialized(true)
    }
  })

  return (
    <nav aria-labelledby="toc-nav" className="col-md-3 pio-docs-sidebar hidden-print hidden-xs hidden-sm affix-top">
    <div id="toc" className="tocbot">
      <h4 id="toc-nav">{title || "Table of Contents"}</h4>
      <div className="toc-placeholder" />
    </div>
    </nav>
  )
}

export default TOC
