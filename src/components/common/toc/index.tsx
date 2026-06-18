"use client";
import React, { useState, useEffect } from "react";
import tocbot from "tocbot";
// Extend Window interface to include tocbot

export const TOC = ({ title }: { title: string }) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      const settings = {
        tocSelector: ".toc-placeholder",
        contentSelector: ".doc, .terminus",
        orderedList: false,
        headingSelector: "h2:not(.toc-ignore), h3:not(.toc-ignore)",
        ignoreSelector: ".panel-title",
        hasInnerContainers: true,
        extraListClasses: "nav nav-list",
        listItemClass: "tocify-item",
      };

      if (tocbot) {
        const tabPaneHeaders = document.querySelectorAll(
          ".tab-pane h2, .tab-pane h3"
        );
        tabPaneHeaders.forEach((header) => header.classList.add("toc-ignore"));

        tocbot.init(settings);
      }

      setInitialized(true);
    }
  }, [initialized]);

  return (
    <div className="sticky-wrapper">
      <nav aria-labelledby="toc-nav" className="toc-container sticky-toc">
        <div id="toc" className="tocbot">
          <h2 id="toc-nav" className="visually-hidden">
            {title || "Table of Contents"}
          </h2>
          <div className="toc-placeholder" />
        </div>
      </nav>
    </div>
  );
};
