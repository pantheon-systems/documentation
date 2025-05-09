import React, { useState, useEffect } from 'react';
import './style.css';

const TOC = ({ title }) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      const windowGlobal = typeof window !== 'undefined' && window;

      const settings = {
        tocSelector: '.toc-placeholder',
        contentSelector: '.doc, .terminus',
        orderedList: false,
        headingSelector: 'h2:not(.toc-ignore), h3:not(.toc-ignore)',
        ignoreSelector: '.panel-title',
        hasInnerContainers: true,
        extraListClasses: 'nav nav-list',
        listItemClass: 'tocify-item',
      };

      if (windowGlobal && windowGlobal.tocbot) {
        const tabPaneHeaders = document.querySelectorAll(
          '.tab-pane h2, .tab-pane h3',
        );
        tabPaneHeaders.forEach((header) => header.classList.add('toc-ignore'));

        windowGlobal.tocbot.init(settings);
      }

      setInitialized(true);
    }
  }, [initialized]);

  return (
    <div className="sticky-wrapper">
      <nav aria-labelledby="toc-nav" className="toc-container sticky-toc">
        <div id="toc" className="tocbot">
          <h2 id="toc-nav" className="visually-hidden">
            {title || 'Table of Contents'}
          </h2>
          <div className="toc-placeholder" />
        </div>
      </nav>
    </div>
  );
};

export default TOC;
